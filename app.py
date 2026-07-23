import streamlit as st
import pandas as pd
import plotly.express as px
import json
import requests
import asyncio
import sys
import os
import boto3
from dotenv import load_dotenv  # <--- Added import
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# Load environment variables from .env file
load_dotenv()  # <--- Added function call

# --------------------------
# CONFIG
# --------------------------
st.set_page_config(
    page_title="Interactive AQI Tracker",
    page_icon="🌍",
    layout="centered",
)

# --------------------------
# MCP CLIENT FUNCTIONS
# --------------------------
async def fetch_aqi_via_mcp(city: str):
    """Communicates with the local MCP server via stdio transport."""
    server_params = StdioServerParameters(
        command=sys.executable,  
        args=["aqi_mcp_server.py"]
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # Call the tool defined in aqi_mcp_server.py
            result = await session.call_tool(
                "get_aqi",
                arguments={"city": city}
            )

            if result.content and len(result.content) > 0:
                return json.loads(result.content[0].text)
            
            return {"status": "error", "message": "No data returned from MCP tool"}

def get_aqi(city):
    """Synchronous wrapper to run the async MCP call."""
    return asyncio.run(fetch_aqi_via_mcp(city))

# --------------------------
# HELPER FUNCTIONS
# --------------------------
def get_aqi_color(aqi):
    if aqi <= 50:
        return "green", "Good 😄"
    elif aqi <= 100:
        return "yellow", "Moderate 🙂"
    elif aqi <= 150:
        return "orange", "Unhealthy for Sensitive Groups 😕"
    elif aqi <= 200:
        return "red", "Unhealthy 😷"
    elif aqi <= 300:
        return "purple", "Very Unhealthy 🤢"
    else:
        return "maroon", "Hazardous ☠️"

def parse_user_intent(user_text):
    """
    Uses either Amazon Bedrock or Local Ollama based on the LLM_PROVIDER env variable.
    """
    prompt = f"""
    You are a strict Air Quality intent extraction tool. 
    Analyze the user's query and extract the city name ONLY if they are explicitly asking about Air Quality, AQI, or pollution. 
    If they ask about weather, temperature, rain, or ANY other topic, you must reject it.
    
    Examples:
    Query: "What is the AQI in London?" 
    Response: {{"city": "London"}}
    
    Query: "How is the pollution in Mumbai?" 
    Response: {{"city": "Mumbai"}}
    
    Query: "What is the weather in Paris?" 
    Response: {{"error": "I don't have info"}}
    
    Query: "Is it going to rain in Tokyo today?" 
    Response: {{"error": "I don't have info"}}
    
    Query: "Tell me about the history of New York." 
    Response: {{"error": "I don't have info"}}
    
    Current Query: "{user_text}"
    
    Output strictly valid JSON and nothing else.
    """
    
    # Check which provider to use (default to ollama for local dev)
    provider = os.environ.get("LLM_PROVIDER", "ollama").lower()

    if provider == "bedrock":
        try:
            print("Using Amazon Bedrock for intent extraction...")
            # Initialize the Bedrock client
            bedrock = boto3.client(
                service_name="bedrock-runtime",
                region_name=os.environ.get("AWS_REGION", "ap-south-1")
            )
            
            # Call Bedrock (Using Meta Llama 3 8B as default)
            model_id = os.environ.get("BEDROCK_MODEL_ID", "meta.llama3-8b-instruct-v1:0")
            response = bedrock.converse(
                modelId=model_id, 
                messages=[{"role": "user", "content": [{"text": prompt}]}]
            )
            
            # Extract response text
            result_text = response["output"]["message"]["content"][0]["text"]
            return json.loads(result_text.strip())
            
        except Exception as e:
            return {"error": "Failed to process query with Bedrock.", "details": str(e)}
            
    else:
        # Fallback to Ollama logic
        print("Using Ollama for intent extraction...")
        ollama_url = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
        try:
            response = requests.post(
                f"{ollama_url}/api/generate",
                json={
                    "model": os.environ.get("OLLAMA_AQI_MODEL", "gemma3:4b"),
                    "prompt": prompt,
                    "stream": False,
                    "format": "json"
                }
            )
            response_data = response.json()
            return json.loads(response_data["response"])
        except Exception as e:
            return {"error": "Failed to process query with Ollama LLM.", "details": str(e)}

# --------------------------
# UI & CHAT STATE
# --------------------------
st.title("🌍 Interactive AQI Assistant")
st.write("Ask me about the Air Quality Index for any city in the world!")

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# --------------------------
# CHAT INPUT & PROCESSING
# --------------------------
if prompt := st.chat_input("E.g., 'What is the AQI in London today?' or 'How is the pollution in Mumbai?'"):
    
    st.chat_message("user").markdown(prompt)
    st.session_state.messages.append({"role": "user", "content": prompt})

    with st.spinner("Analyzing request..."):
        intent = parse_user_intent(prompt)
        
    with st.chat_message("assistant"):
        if "error" in intent:
            error_msg = f"**{intent['error']}**\n\n*Technical Details: {intent.get('details', 'No details provided')}*"
            st.markdown(error_msg)
            st.session_state.messages.append({"role": "assistant", "content": error_msg})
        
        elif "city" in intent:
            city = intent["city"]
            st.markdown(f"Fetching Air Quality data for **{city.title()}** via MCP...")
            
            data = get_aqi(city)
            
            if data.get("status") == "ok":
                details = data["data"]
                aqi = details.get("aqi")
                
                if not isinstance(aqi, (int, float)):
                    msg = f"I couldn't find a valid monitoring station for '{city}'. Please try a different nearby city."
                    st.markdown(msg)
                    st.session_state.messages.append({"role": "assistant", "content": msg})
                else:
                    aqi_color, aqi_text = get_aqi_color(aqi)
                    result_html = f"""
                    <div style="padding:20px; border-radius:10px; background:{aqi_color}; color:white; text-align:center; margin-bottom: 20px;">
                        <h1 style="margin:0;">AQI: {aqi}</h1>
                        <p style="margin:0; font-size:20px; font-weight:bold;">{aqi_text}</p>
                        <p style="margin:0; font-size:18px;">{details['city']['name']}</p>
                    </div>
                    """
                    st.markdown(result_html, unsafe_allow_html=True)
                    
                    iaqi = details.get("iaqi", {})
                    pollutants = {k: v.get("v") for k, v in iaqi.items()}
                    df = pd.DataFrame(pollutants.items(), columns=["Pollutant", "Value"])
                    df["Value"] = pd.to_numeric(df["Value"], errors="coerce").dropna()
                    
                    if not df.empty:
                        fig = px.bar(df, x="Pollutant", y="Value", title=f"Current Pollutants in {city.title()}", color="Pollutant")
                        st.plotly_chart(fig, use_container_width=True)
                    
                    summary = f"The current AQI for {city.title()} is {aqi} ({aqi_text})."
                    st.session_state.messages.append({"role": "assistant", "content": summary})
            else:
                msg = f"Sorry, I couldn't find air quality data for '{city}'. It might not have a WAQI station."
                st.markdown(msg)
                st.session_state.messages.append({"role": "assistant", "content": msg})