import os
import json
from pathlib import Path
import requests
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP

# Force Python to look in the exact same directory as this script
script_dir = Path(__file__).parent
env_path = script_dir / ".env"

# --- DIAGNOSTIC CODE START ---
print("\n=================== DIAGNOSTIC START ===================")
print(f"Current Script Location: {__file__}")
print(f"Looking for .env at: {env_path}")
print(f"Does the .env file exist? {env_path.exists()}")

# Print all files in this directory to see what Windows named it
print("Files found in this directory:")
for file in script_dir.iterdir():
    print(f" - {file.name}")
print("==================== DIAGNOSTIC END ====================\n")
# --- DIAGNOSTIC CODE END ---

# Load with the explicit path
load_dotenv(dotenv_path=env_path)
# load_dotenv()

# 2. Fetch the token securely
TOKEN = os.getenv("WAQI_TOKEN")
if not TOKEN:
    raise ValueError("WAQI_TOKEN environment variable is not set. Check your .env file.")

# Initialize FastMCP server
mcp = FastMCP("AQI_Server")

@mcp.tool()
def get_aqi(city: str) -> str:
    """
    Fetches real-time Air Quality Index (AQI) data for a given city using the WAQI API.
    Returns a JSON-formatted string containing the API response.
    """
    url = f"https://api.waqi.info/feed/{city}/?token={TOKEN}"
    response = requests.get(url)
    
    return json.dumps(response.json())

if __name__ == "__main__":
    mcp.run()