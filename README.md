# 🌍 Interactive AQI Assistant

A production-ready Air Quality Index (AQI) tracking system that evolved from a static data dashboard into an intelligent, conversational AI assistant. This project demonstrates modern architectural patterns by decoupling frontend interfaces from backend services using the **Model Context Protocol (MCP)** and integrating local Large Language Models (LLMs) for natural language processing.

## 🚀 Version Evolution & Architecture

### Version 1.1 (Legacy Dashboard) - `app.py`
The initial release functioned as a traditional, tightly-coupled data dashboard:
* **UI/UX:** Relied on static dropdown menus for country and city selection.
* **Data Fetching:** Direct, synchronous REST API calls (`requests.get`) embedded within the frontend code.
* **Visualization:** Comprehensive data plotting (Bar, Line, Pie, Scatter, Area) using Plotly.
* **Limitations:** Monolithic script structure, hardcoded API credentials, and rigid user interaction paths.

### Version 2.0 (Current Release) - `app.py` & `aqi_mcp_server.py`
The current release refactors the application to focus on **building scalable production systems** and **secure backend services**.
* **Conversational Interface:** Replaced dropdowns with a natural language chat UI (`st.chat_input`). Users can ask questions like *"What is the AQI in London today?"*
* **Local LLM Intent Parsing:** Integrates Ollama (`gemma3:4b`) to autonomously extract city parameters from unstructured user text, gracefully handling off-topic queries.
* **Model Context Protocol (MCP):** The core architectural shift. API logic is stripped from the frontend and moved to a dedicated, independent backend service (`aqi_mcp_server.py`). 
    * The Streamlit app communicates with the MCP server via `stdio` transport.
    * This separation of concerns creates a robust, secure, and easily extensible tool ecosystem.
* **Security & Environment Management:** Completely eliminated hardcoded secrets. API tokens are now securely loaded via `.env` variables in the backend server.

## 🛠️ Technology Stack
* **Frontend:** Python, Streamlit
* **Backend Integration:** `mcp` (Model Context Protocol), FastMCP
* **AI / NLP:** Ollama (Local LLM - `gemma3:4b`)
* **Data Processing & Visualization:** Pandas, Plotly Express
* **External APIs:** WAQI (World Air Quality Index)

---

## ⚙️ Setup and Installation

### Prerequisites
1. Python 3.9+
2. [Ollama](https://ollama.com/) installed and running locally.
3. A free WAQI API Token from [aqicn.org](https://aqicn.org/data-platform/token/).

### 1. Install Dependencies
```bash
pip install streamlit pandas plotly requests mcp python-dotenv
```
### 2. Configure Environment Variables
Create a .env file in the root directory of the project and add your WAQI API token securely:
```python
WAQI_TOKEN=your_secure_api_token_here
```
### 3. Initialize the Local LLM
Ensure Ollama is running in the background, then pull the required model for intent parsing:
```Bash
ollama run gemma3:4b
```
(You can exit the run prompt once the model is downloaded; the local server runs on localhost:11434)

### 4. Launch the Application
Run the Streamlit frontend. The app will automatically initialize and communicate with the MCP backend server.
```Bash
streamlit run app.py
```
💡 **How It Works (The Request Flow)**
**User Input**: The user types a natural language query in the Streamlit chat.

**Intent Extraction**: The query is sent to the local Ollama LLM, which extracts the target city and formats it into a strict JSON object.

**MCP Tool Execution**: Streamlit acts as an MCP Client, sending a tool execution request (get_aqi) via standard input/output to the FastMCP server.

**Data Retrieval**: The isolated MCP server securely reads the .env token, queries the WAQI API, and returns the payload.

**Rendering**: The frontend receives the JSON payload and dynamically renders a color-coded status box and Plotly bar charts based on the current pollutants.
