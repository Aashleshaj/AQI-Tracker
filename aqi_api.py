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
