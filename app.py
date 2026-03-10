import streamlit as st
import requests
import pandas as pd
import plotly.express as px

# Note 1: These imports form the core dependencies. Streamlit provides the UI framework, requests 
# handles HTTP calls to external APIs, pandas structures data, and plotly creates interactive charts.

# --------------------------
# CONFIG
# --------------------------
# Note 2: Streamlit apps begin with set_page_config() to configure metadata (title, icon) and layout.
# The "centered" layout constrains content width, improving mobile readability.
st.set_page_config(
    page_title="AQI Tracker",
    page_icon="🌍",
    layout="centered",
)

# Note 3: API tokens should ideally be stored in environment variables or .env files rather than 
# hardcoded (security best practice). This prevents accidental exposure in version control.
TOKEN = "8d3ef47168669198e75ada3d0ed682e0d169eb85"   # Your WAQI token

# --------------------------
# FUNCTIONS
# --------------------------
# Note 4: This function encapsulates the API call logic, following the Single Responsibility Principle.
# It returns raw JSON, allowing flexibility in how the response is processed downstream.
def get_aqi(city):
    # Note 5: f-strings (formatted string literals, Python 3.6+) offer cleaner string interpolation 
    # than .format() or %. The URL pattern includes city name and API token for authentication.
    url = f"https://api.waqi.info/feed/{city}/?token={TOKEN}"
    response = requests.get(url).json()
    # Note 6: Chaining .json() immediately converts the HTTP response to a Python dictionary.
    # This assumes the API always returns valid JSON; production code should handle exceptions.
    return response

def get_aqi_color(aqi):
    # Note 7: This function maps numeric AQI values to color-coded categories. The nested if-elif 
    # structure defines pollution severity thresholds defined by the EPA AQI scale.
    # Note 8: Functions return tuples (color, description) to allow callers to display both visual 
    # and textual feedback. Returning multiple values is more flexible than global state.
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
    # Note 9: This pattern (if-elif-else) is preferable to nested ternaries or dictionary lookups 
    # when the ranges are non-overlapping and the logic is straightforward.

# --------------------------
# UI
# --------------------------
# Note 10: UI components are rendered sequentially. Streamlit reruns the entire script on every 
# user interaction, so order matters: components appear top-to-bottom on the page.
st.title("🌍 Air Quality Index (AQI) Tracker")
st.write("Track AQI of any city in the world (India, UK, US, etc.) using free WAQI API.")
st.write("Enter 2-letter ISO country code to search")

# Note 11: This function loads a static city dataset and is cached with @st.cache_data.
# Caching prevents re-downloading the JSON file on every app rerun, significantly improving 
# performance when data dependencies are stable.
@st.cache_data
def load_cities():
    url = "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json"
    return requests.get(url).json()

cities = load_cities()

# Note 12: Set comprehensions ({...}) extract unique values efficiently. Here, all distinct 
# countries are collected from the cities list. This pattern is concise and Pythonic.
# Country → City dropdown
country = st.selectbox("Select Country", sorted({c["country"] for c in cities}))
# Note 13: List comprehension [... for c in ...] filters cities by the selected country. 
# The result is passed to sorted() for alphabetical order, improving user experience.
city_list = [c["name"] for c in cities if c["country"] == country]
city = st.selectbox("Select City", sorted(city_list))

# Note 14: Streamlit's unsafe_allow_html=True parameter permits embedding custom CSS.
# This practice should be limited to trusted content to avoid XSS vulnerabilities.
# Inline styles customize button appearance: background color, padding, border, and hover effects.
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
# Note 15: Streamlit's st.button() returns True only when clicked. This conditional structure 
# prevents expensive API calls on every rerun—the API is called only when users explicitly click.
if st.button("Check AQI"):
    # Note 16: The response JSON is checked for "status": "ok" to ensure the API call succeeded 
    # before accessing nested keys. Poor API responses can raise KeyError; this guards against it.
    data = get_aqi(city)
    if data["status"] == "ok":
        details = data["data"]
        aqi = details["aqi"]

        # Note 17: Session state (st.session_state) persists variables across reruns, allowing 
        # data from one interaction to be accessed in later ones. Without it, data would be lost 
        # when Streamlit reruns the script after user actions.
        # Store pollutants in session state
        forecast = details.get("forecast", {})
        daily = forecast.get("daily", {})
        # Note 18: The .get() method provides a default value (empty dict here) if a key is missing.
        # This prevents KeyError exceptions when optional fields are absent from the API response.
        pm25_data = daily["pm25"]
        # Note 19: A list comprehension builds a list of dictionaries from forecast data.
        # Each dict maps a date to its average PM2.5 pollution level, simplifying visualization.
        trend = [{"date": item["day"], "pollution": item["avg"]} for item in pm25_data] # use PM25 avg as daily pollution indicator
        df_trend = pd.DataFrame(trend)
        # Note 20: pd.to_datetime() converts string dates to datetime objects. Pandas can then 
        # handle sorting and plotting temporal data correctly.
        df_trend["date"] = pd.to_datetime(df_trend["date"])
        st.session_state.df_trend = df_trend
        
        iaqi = details.get("iaqi", {})
        # Note 21: A dictionary comprehension {k: v...} extracts pollutant names (keys) and values.
        # The v.get("v") safely retrieves the numeric value, defaulting to None if missing.
        pollutants = {k: v.get("v") for k, v in iaqi.items()}
        df = pd.DataFrame(pollutants.items(), columns=["Pollutant", "Value"])
        st.session_state.df = df
        st.session_state.details = details
        st.session_state.aqi = aqi

# --------------------------
# Display AQI and Charts if data exists
# --------------------------
# Note 22: This condition checks that required session state keys exist AND that the dataframe 
# is non-empty (DataFrame.empty returns True for 0-row dataframes). Both checks prevent 
# rendering charts with missing or incomplete data.
if "df" and "df_trend" in st.session_state and not st.session_state.df.empty:
    # Note 23: .copy() creates a shallow copy of the dataframe to avoid SettingWithCopyWarning 
    # when modifying the dataframe later. This is a best practice for chained operations.
    df_trend = st.session_state.df_trend.copy()

    aqi = st.session_state.aqi
    details = st.session_state.details
    df = st.session_state.df.copy()
    # Note 24: pd.to_numeric(..., errors="coerce") converts values to numeric type. The coerce 
    # parameter replaces invalid values with NaN, preventing TypeErrors during arithmetic.
    df["Value"] = pd.to_numeric(df["Value"], errors="coerce")
    # Note 25: .dropna() removes rows with NaN values, ensuring only numeric pollution data 
    # remains for plotting. This prevents matplotlib errors from missing data points.
    df = df.dropna()

    # Note 26: Markdown renders HTML blocks for rich UI. The styling dict uses inline CSS to 
    # apply the background color from get_aqi_color(), creating a visual pollution indicator.
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

    # Note 27: st.selectbox() is a dropdown menu that returns the selected value. Placing it 
    # before the if-elif block allows the user's selection to determine which chart type is rendered.
    # Chart selection
    chart_type = st.selectbox(
        "Select Chart Type",
        ["Bar Chart", "Line Chart", "Pie Chart", "Scatter Plot", "Area Chart"]
    )

    # Note 28: px (plotly.express) is a high-level API for creating interactive charts quickly.
    # Each chart type uses the same data, demonstrating different visualization approaches. 
    # The if-elif pattern avoids rendering all charts at once (wasteful) and produces only 
    # the selected visualization.
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

    # Note 29: st.plotly_chart() embeds an interactive Plotly figure directly in the Streamlit 
    # app. Users can hover, zoom, pan, and download the chart as PNG—all without server calls.
    #SHOW BOTH CHARTS
    st.subheader("📊 Pollutant Chart")
    st.plotly_chart(fig)

    st.subheader("📈 Weekly Pollution Trend")
    st.plotly_chart(fig1)

    # Note 30: Metadata display reinforces the geographic context of the AQI reading. Geo coordinates 
    # and station name help users verify they're viewing data for the intended location.
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