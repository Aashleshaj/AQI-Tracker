import streamlit as st
import requests
import pandas as pd
import plotly.express as px

# --------------------------
# CONFIG
# --------------------------
st.set_page_config(
    page_title="AQI Tracker",
    page_icon="🌍",
    layout="centered",
)

TOKEN = "8d3ef47168669198e75ada3d0ed682e0d169eb85"   # Your WAQI token

# --------------------------
# FUNCTIONS
# --------------------------
def get_aqi(city):
    url = f"https://api.waqi.info/feed/{city}/?token={TOKEN}"
    response = requests.get(url).json()
    return response

def get_aqi_color(aqi):
    if aqi <= 50:
        return "green","Good 😄"
    elif aqi <= 100:
        return "yellow","Moderate 🙂"
    elif aqi <= 150:
        return "orange","Unhealthy for Sensitive Groups 😕"
    elif aqi <= 200:
        return "red","Unhealthy 😷"
    elif aqi <= 300:
        return "purple","Very Unhealthy 🤢"
    else:
        return "maroon","Hazardous ☠️"

# --------------------------
# UI
# --------------------------
st.title("🌍 Air Quality Index (AQI) Tracker")
st.write("Track AQI of any city in the world (India, UK, US, etc.) using free WAQI API.")
st.write("Enter 2-letter ISO country code to search")

# Load city list
@st.cache_data
def load_cities():
    url = "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json"
    return requests.get(url).json()

cities = load_cities()

# Country → City dropdown
country = st.selectbox("Select Country", sorted({c["country"] for c in cities}))
city_list = [c["name"] for c in cities if c["country"] == country]
city = st.selectbox("Select City", sorted(city_list))

# Highlight Check AQI button
st.markdown("""
    <style>
    div.stButton > button:first-child {
        background-color: #ff5722;
        color: white;
        border: 2px solid #e64a19;
        padding: 12px 20px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 10px;
        transition: 0.3s;
    }
    div.stButton > button:first-child:hover {
        background-color: #e64a19;
        border: 2px solid #bf360c;
        color: white;
        transform: scale(1.05);
    }
    </style>
""", unsafe_allow_html=True)

# --------------------------
# Fetch AQI data on button click
# --------------------------
if st.button("Check AQI"):
    data = get_aqi(city)
    if data["status"] == "ok":
        details = data["data"]
        aqi = details["aqi"]

        # Store pollutants in session state
        forecast = details.get("forecast", {})
        daily = forecast.get("daily", {})
        pm25_data = daily["pm25"]
        trend = [{"date": item["day"], "pollution": item["avg"]} for item in pm25_data] # use PM25 avg as daily pollution indicator
        df_trend = pd.DataFrame(trend)
        df_trend["date"] = pd.to_datetime(df_trend["date"])
        st.session_state.df_trend = df_trend
        
        iaqi = details.get("iaqi", {})
        pollutants = {k: v.get("v") for k, v in iaqi.items()}
        df = pd.DataFrame(pollutants.items(), columns=["Pollutant", "Value"])
        st.session_state.df = df
        st.session_state.details = details
        st.session_state.aqi = aqi

# --------------------------
# Display AQI and Charts if data exists
# --------------------------
if "df" and "df_trend" in st.session_state and not st.session_state.df.empty:
   
    df_trend = st.session_state.df_trend.copy()

    aqi = st.session_state.aqi
    details = st.session_state.details
    df = st.session_state.df.copy()
    df["Value"] = pd.to_numeric(df["Value"], errors="coerce")
    df = df.dropna()

    # AQI Box
    st.markdown("## 🌫️ Current Air Quality")
    aqi_color,aqi_text = get_aqi_color(aqi)
    st.markdown(
        f"""
        <div style="padding:20px; border-radius:10px; background:{aqi_color}; color:white; text-align:center;">
            <h1 style="margin:0;">AQI: {aqi}</h1>
            <p style="margin:0; font-size:20px; font-weight:bold;">{aqi_text}</p>
            <p style="margin:0; font-size:18px;">{city.title()}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    # Chart selection
    chart_type = st.selectbox(
        "Select Chart Type",
        ["Bar Chart", "Line Chart", "Pie Chart", "Scatter Plot", "Area Chart"]
    )

    # Plot chart
    if chart_type == "Bar Chart":
        fig = px.bar(df, x="Pollutant", y="Value", title="Pollutant Concentrations")
        fig1 = px.bar(df_trend,x="date",y="pollution",title="Weekly Pollution Trend")
    elif chart_type == "Line Chart":
        fig = px.line(df, x="Pollutant", y="Value", title="Pollutant Trends",markers=True)
        fig1 = px.line(df_trend,x="date",y="pollution",title="Weekly Pollution Trend",markers=True)
    elif chart_type == "Pie Chart":
        fig = px.pie(df, names="Pollutant", values="Value", title="Pollutant Distribution")
        fig1 = px.pie(df_trend, names="date", values="pollution", title="Weekly Pollution Contribution")
    elif chart_type == "Scatter Plot":
        fig = px.scatter(df, x="Pollutant", y="Value", size="Value", title="Pollutant Scatter Graph")
        fig1 = px.scatter(df_trend,x="date",y="pollution",size="pollution",title="Weekly Pollution Trend")
    elif chart_type == "Area Chart":
        fig = px.area(df, x="Pollutant", y="Value", title="Pollutant Area Chart")
        fig1 = px.area(df_trend,x="date",y="pollution",title="Weekly Pollution Trend")

    #SHOW BOTH CHARTS
    st.subheader("📊 Pollutant Chart")
    st.plotly_chart(fig)

    st.subheader("📈 Weekly Pollution Trend")
    st.plotly_chart(fig1)

    # Metadata
    st.markdown("### 📍 Location Info")
    st.write(f"**Latitude:** {details['city']['geo'][0]}")
    st.write(f"**Longitude:** {details['city']['geo'][1]}")
    st.write(f"**Station:** {details['city']['name']}")

    # Optional: Raw JSON
    # with st.expander("See raw data"):
    #     st.json(details)

else:
    st.info("Click 'Check AQI' first to load data.")