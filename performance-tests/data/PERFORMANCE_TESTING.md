# Performance Testing — AQI Tracker

This document describes the non-functional (performance/load) testing suite added to this
project using **Apache JMeter**, covering two components:

1. **Ollama's LLM inference API** (`/api/generate`) — already exposed over HTTP, no code
   changes needed.
2. **A new `/aqi/{city}` HTTP endpoint** wrapping the existing `get_aqi` MCP tool logic —
   added specifically to make it network-reachable for load testing, since the original
   `aqi_mcp_server.py` only communicates over stdio.

It also documents a real bottleneck found in the original `get_aqi` logic (a synchronous,
uncached call to the WAQI API on every request) and the fix applied, with a before/after
comparison methodology.

## Table of contents

- [Part 1 — Code changes](#part-1--code-changes)
- [Part 2 — Building the JMeter test plans](#part-2--building-the-jmeter-test-plans)
- [Part 3 — Baseline vs. fixed comparison](#part-3--baseline-vs-fixed-comparison)
- [Part 4 — CI/CD integration](#part-4--cicd-integration)
- [Part 5 — Results](#part-5--results-fill-in-after-you-run-it)
- [Appendix — Native MCP HTTP transport (stretch goal)](#appendix--native-mcp-http-transport-stretch-goal)
- [Suggested README addition](#suggested-readme-addition)

---

## Part 1 — Code changes

### 1.1 New file: `aqi_api.py`

Start with this **baseline** version — it deliberately mirrors the original `get_aqi` tool's
behavior (synchronous, uncached) so your first load test captures the real "before" numbers.

```python
# aqi_api.py — BASELINE (intentionally uncached, for your first load test run)
import os
import requests
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("WAQI_TOKEN")
MOCK_WAQI = os.getenv("MOCK_WAQI", "false").lower() == "true"

app = FastAPI()

@app.get("/aqi/{city}")
def get_aqi(city: str):
    if MOCK_WAQI:
        # Used during stress/soak tests so we're not hammering the real WAQI API
        return {"status": "ok", "data": {"aqi": 42, "city": {"name": city}}}

    response = requests.get(
        f"https://api.waqi.info/feed/{city}/?token={TOKEN}", timeout=5
    )
    return response.json()
```

Keep this version until you've run your baseline JMeter test (Part 3). Then replace it with
the improved version below and re-run the identical test plan.

```python
# aqi_api.py — IMPROVED (swap in after capturing baseline numbers)
import os
import requests
from fastapi import FastAPI
from dotenv import load_dotenv
from cachetools import TTLCache

load_dotenv()
TOKEN = os.getenv("WAQI_TOKEN")
MOCK_WAQI = os.getenv("MOCK_WAQI", "false").lower() == "true"

app = FastAPI()
cache = TTLCache(maxsize=200, ttl=300)  # 5-min TTL — AQI doesn't change second to second

@app.get("/aqi/{city}")
def get_aqi(city: str):
    if city in cache:
        return cache[city]

    if MOCK_WAQI:
        result = {"status": "ok", "data": {"aqi": 42, "city": {"name": city}}}
    else:
        response = requests.get(
            f"https://api.waqi.info/feed/{city}/?token={TOKEN}", timeout=5
        )
        result = response.json()

    cache[city] = result
    return result
```

### 1.2 New file: `Dockerfile.api`

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements-api.txt .
RUN pip install --no-cache-dir -r requirements-api.txt
COPY aqi_api.py .
COPY .env .
CMD ["uvicorn", "aqi_api:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 1.3 New file: `requirements-api.txt`

```
fastapi
uvicorn[standard]
requests
python-dotenv
cachetools
```

### 1.4 Modify `docker-compose.yml`

Add a new service alongside your existing `ollama` and `aqi-tracker` services:

```yaml
  aqi-api:
    container_name: aqi-api
    build:
      context: .
      dockerfile: Dockerfile.api
    ports:
      - "8000:8000"
    environment:
      - WAQI_TOKEN=${WAQI_TOKEN}
      - MOCK_WAQI=${MOCK_WAQI:-false}
    depends_on:
      - ollama
```

### 1.5 New folder: `performance-tests/`

```
performance-tests/
├── data/
│   ├── cities.csv
│   └── ollama_prompts.csv
├── aqi_api_load_test.jmx        (you'll build this in Part 2)
├── ollama_load_test.jmx         (you'll build this in Part 2)
└── check_thresholds.py
```

**`performance-tests/data/cities.csv`**
```
city
london
beijing
delhi
shanghai
paris
tokyo
```

**`performance-tests/data/ollama_prompts.csv`**
```
query
What is the AQI in London today?
Is it safe to jog outside in Delhi right now?
Compare air quality between Beijing and Tokyo
Should I wear a mask outside in Shanghai today?
```

**`performance-tests/check_thresholds.py`** — a simple CI gate that reads JMeter's `.jtl`
results and fails the build if thresholds are breached:

```python
import csv
import sys

MAX_ERROR_RATE = 0.01   # 1%
MAX_AVG_MS = 800

total = errors = 0
total_time = 0

with open(sys.argv[1]) as f:
    reader = csv.DictReader(f)
    for row in reader:
        total += 1
        total_time += int(row["elapsed"])
        if row["success"] != "true":
            errors += 1

error_rate = errors / total if total else 0
avg_ms = total_time / total if total else 0

print(f"Requests: {total}, Errors: {errors} ({error_rate:.2%}), Avg: {avg_ms:.0f}ms")

if error_rate > MAX_ERROR_RATE or avg_ms > MAX_AVG_MS:
    print("Performance thresholds breached!")
    sys.exit(1)
```

---

## Part 2 — Building the JMeter test plans

Build these in the JMeter GUI, then save as `.jmx` files into `performance-tests/`. Only ever
run actual load in CLI mode (`jmeter -n -t plan.jmx`) — GUI mode skews results and shouldn't
be used for real runs.

### Test plan 1 — `ollama_load_test.jmx`

1. **Thread Group**: right-click Test Plan → *Add → Threads (Users) → Thread Group*
   - Name: `Ollama_LLM_Load`
   - Number of Threads (users): `5`
   - Ramp-up period: `10` seconds
   - Loop Count: `10`
2. **CSV Data Set Config**: right-click the Thread Group → *Add → Config Element → CSV Data Set Config*
   - Filename: `performance-tests/data/ollama_prompts.csv`
   - Variable Names: `query`
   - Recycle on EOF: `True`
3. **HTTP Request sampler**: right-click the Thread Group → *Add → Sampler → HTTP Request*
   - Name: `POST /api/generate`
   - Server Name or IP: `localhost`
   - Port: `11435`
   - Method: `POST`
   - Path: `/api/generate`
   - Body Data (Body Data tab): `{"model": "gemma3:4b", "prompt": "${query}", "stream": false}`
4. **HTTP Header Manager**: right-click the sampler → *Add → Config Element → HTTP Header Manager*
   - Add header: `Content-Type: application/json`
5. **Response Assertion**: right-click the sampler → *Add → Assertions → Response Assertion*
   - Field to test: Response Code
   - Pattern: `200`
6. **Timer**: right-click the Thread Group → *Add → Timer → Gaussian Random Timer*
   - Constant Delay Offset: `300` ms, Deviation: `100`
7. **Listeners**: right-click the Thread Group → *Add → Listener* → add both
   - `View Results Tree` (debugging only — disable before real runs)
   - `Summary Report`

### Test plan 2 — `aqi_api_load_test.jmx`

1. **Thread Group**
   - Name: `AQI_API_Load`
   - Number of Threads (users): `20`
   - Ramp-up period: `20` seconds
   - Loop Count: `20`
2. **CSV Data Set Config**
   - Filename: `performance-tests/data/cities.csv`
   - Variable Names: `city`
   - Recycle on EOF: `True`
3. **HTTP Request sampler**
   - Name: `GET /aqi/{city}`
   - Server Name or IP: `localhost`
   - Port: `8000`
   - Method: `GET`
   - Path: `/aqi/${city}`
4. **Response Assertion**
   - Field to test: Response Code, Pattern: `200`
5. **Timer**: Gaussian Random Timer, Constant Delay Offset: `200` ms, Deviation: `100`
6. **Listeners**: `View Results Tree` (debug only) + `Summary Report`

For the escalating scenarios (smoke / load / stress / soak), duplicate the Thread Group with
different Threads/Ramp-up/Loop Count values, or use the **Concurrency Thread Group** plugin
(Custom Thread Groups plugin pack) for a proper step-up ramp and a soak-test hold duration.

---

## Part 3 — Baseline vs. fixed comparison

1. Deploy with the **baseline** `aqi_api.py` (Part 1.1).
2. Set `MOCK_WAQI=false` for a low-concurrency smoke run first (don't hammer the real WAQI
   API); set `MOCK_WAQI=true` for your actual load/stress/soak runs so you're measuring your
   own service, not WAQI's.
3. Run: `jmeter -n -t performance-tests/aqi_api_load_test.jmx -l baseline-results.jtl -e -o baseline-report/`
4. Record the numbers (Part 5).
5. Swap in the **improved**, cached `aqi_api.py`, rebuild (`docker compose up -d --build aqi-api`).
6. Re-run the identical command against `fixed-results.jtl` / `fixed-report/`.
7. Compare — this before/after delta is the core evidence for your write-up and resume bullet.

---

## Part 4 — CI/CD integration

New file: **`.github/workflows/performance-tests.yml`** (added alongside your existing
workflows in `.github/workflows/`):

```yaml
name: Performance Tests

on:
  workflow_dispatch:
  schedule:
    - cron: '0 3 * * 1'   # weekly, Monday 03:00 UTC

jobs:
  jmeter-load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Start application stack
        run: docker compose up -d --build
        env:
          WAQI_TOKEN: ${{ secrets.WAQI_TOKEN }}
          OLLAMA_AQI_MODEL: gemma3:4b
          MOCK_WAQI: "true"

      - name: Wait for aqi-api to be ready
        run: |
          for i in {1..30}; do
            curl -sf http://localhost:8000/aqi/london && break
            sleep 5
          done

      - name: Set up JMeter
        run: |
          wget -q https://downloads.apache.org/jmeter/binaries/apache-jmeter-5.6.3.tgz
          tar -xzf apache-jmeter-5.6.3.tgz

      - name: Run JMeter test plan
        run: |
          ./apache-jmeter-5.6.3/bin/jmeter -n \
            -t performance-tests/aqi_api_load_test.jmx \
            -l performance-tests/results.jtl \
            -e -o performance-tests/report

      - name: Check thresholds
        run: python3 performance-tests/check_thresholds.py performance-tests/results.jtl

      - name: Upload HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: jmeter-report
          path: performance-tests/report
```

---

## Part 5 — Results (fill in after you run it)

> Replace the placeholders below with your actual measured numbers — don't publish estimated
> or invented figures on your resume or in this doc.

| Metric | Baseline (uncached) | Improved (cached) |
|---|---|---|
| p95 response time | `TODO ms` | `TODO ms` |
| Avg response time | `TODO ms` | `TODO ms` |
| Error rate at peak load | `TODO %` | `TODO %` |
| Max sustainable concurrent users | `TODO` | `TODO` |

**Suggested resume bullet** (fill in your real numbers):
> Extended AQI Tracker with a JMeter-based performance testing suite (smoke, load, stress,
> soak) integrated into GitHub Actions CI/CD; identified an uncached synchronous API-call
> bottleneck, added TTL caching, and reduced p95 latency from `TODO`ms to `TODO`ms at
> `TODO` concurrent users.

---

## Appendix — Native MCP HTTP transport (stretch goal)

Instead of (or in addition to) the FastAPI wrapper, FastMCP's `run()` method supports an
HTTP transport directly — no wrapper file needed:

```python
mcp = FastMCP("AQI_Server", host="0.0.0.0", port=8000)
# ...
if __name__ == "__main__":
    mcp.run(transport="streamable-http")   # served at http://0.0.0.0:8000/mcp
```

This exposes the *actual* MCP protocol over HTTP rather than a plain REST shim, but JMeter
then has to speak MCP's JSON-RPC wire format: send an `initialize` request first, capture the
returned `Mcp-Session-Id` response header (HTTP Header Manager + Regex Extractor), then include
that session header on subsequent `tools/call` requests. This is genuine MCP-protocol load
testing — worth doing as a second phase once the core project above is working, since it's a
much rarer skill to demonstrate than plain REST load testing.

---

## Suggested README addition

Paste this into your existing `README.md`:

```markdown
## Performance Testing

This project includes a JMeter-based non-functional testing suite covering:
- Load/stress/soak testing of the local Ollama LLM inference endpoint
- Load testing of the `/aqi/{city}` API layer, including a documented before/after
  fix for an uncached, blocking external API call bottleneck

See [PERFORMANCE_TESTING.md](./PERFORMANCE_TESTING.md) for full methodology, results,
and how to run the suite yourself, including CI integration via
`.github/workflows/performance-tests.yml`.
```
