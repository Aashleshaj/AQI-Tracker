import csv
import sys
from collections import defaultdict

# Each sampler gets its own budget — LLM inference is inherently much slower
# than a plain JSON API call, so it isn't held to the same bar.
THRESHOLDS = {
    "POST  /api/generate": {"max_error_rate": 0.05, "max_avg_ms": 60000},
    "GET /aqi/{city}":     {"max_error_rate": 0.01, "max_avg_ms": 800},
}
DEFAULT_THRESHOLD = {"max_error_rate": 0.01, "max_avg_ms": 800}


def find_key(fieldnames, target):
    """Case/whitespace-insensitive lookup, since JMeter's exact header
    casing can vary slightly between versions and configs."""
    for name in fieldnames:
        if name and name.strip().lower() == target:
            return name
    return None


with open(sys.argv[1], newline="") as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames or []

    label_key = find_key(fieldnames, "label")
    elapsed_key = find_key(fieldnames, "elapsed")
    success_key = find_key(fieldnames, "success")

    if not all([label_key, elapsed_key, success_key]):
        print("Couldn't find the expected columns in this results file.")
        print(f"Columns found: {fieldnames}")
        print("Expected to find columns matching: label, elapsed, success")
        sys.exit(2)

    stats = defaultdict(lambda: {"total": 0, "errors": 0, "time": 0})
    for row in reader:
        label = row[label_key]
        stats[label]["total"] += 1
        stats[label]["time"] += int(row[elapsed_key])
        if row[success_key].strip().lower() != "true":
            stats[label]["errors"] += 1

breached = False
for label, s in stats.items():
    total = s["total"]
    error_rate = s["errors"] / total if total else 0
    avg_ms = s["time"] / total if total else 0
    limits = THRESHOLDS.get(label, DEFAULT_THRESHOLD)

    print(f"[{label}] Requests: {total}, Errors: {s['errors']} ({error_rate:.2%}), Avg: {avg_ms:.0f}ms")

    if error_rate > limits["max_error_rate"] or avg_ms > limits["max_avg_ms"]:
        print(f"  -> threshold breached for '{label}'")
        breached = True

if breached:
    print("Performance thresholds breached!")
    sys.exit(1)

