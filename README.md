# 🌍 Interactive AQI Assistant

A production-ready Air Quality Index (AQI) tracking system that evolved from a static data dashboard into an intelligent, conversational AI assistant. This project demonstrates modern architectural patterns by decoupling frontend interfaces from backend services using the **Model Context Protocol (MCP)** and integrating local Large Language Models (LLMs) for natural language processing.

## 🚀 Version Evolution & Architecture
![AQI Tracker Architecture Flow](data/flowchart.png)

### Version 1.1 (Legacy Dashboard) - `app.py`
The initial release functioned as a traditional, tightly-coupled data dashboard:
* **UI/UX:** Relied on static dropdown menus for country and city selection.
* **Data Fetching:** Direct, synchronous REST API calls (`requests.get`) embedded within the frontend code.
* **Visualization:** Comprehensive data plotting (Bar, Line, Pie, Scatter, Area) using Plotly.
* **Limitations:** Monolithic script structure, hardcoded API credentials, and rigid user interaction paths.

### Version 2.0 (Current Release) - `app.py`, `aqi_mcp_server.py` & Docker
The current release refactors the application to focus on **building scalable production systems**, **secure backend services**, and **containerized deployment**.
* **Conversational Interface:** Replaced dropdowns with a natural language chat UI (`st.chat_input`). Users can ask questions like *"What is the AQI in London today?"*
* **Local LLM Intent Parsing:** Integrates Ollama to autonomously extract city parameters from unstructured user text, gracefully handling off-topic queries.
* **Model Context Protocol (MCP):** The core architectural shift. API logic is stripped from the frontend and moved to a dedicated, independent backend service (`aqi_mcp_server.py`). 
    * The Streamlit app communicates with the MCP server via `stdio` transport.
    * This separation of concerns creates a robust, secure, and easily extensible tool ecosystem.
* **Containerization:** The entire application stack (Streamlit UI, MCP backend, and Ollama LLM) is containerized using Docker and orchestrated via Docker Compose for seamless, reproducible deployments.
* **Security & Environment Management:** Completely eliminated hardcoded secrets. API tokens and model configurations are injected securely via `.env` variables.

## 🛠️ Technology Stack
* **Infrastructure:** Docker, Docker Compose
* **Frontend:** Python (3.13), Streamlit
* **Backend Integration:** `mcp` (Model Context Protocol), FastMCP
* **AI / NLP:** Ollama (Local LLM)
* **Data Processing & Visualization:** Pandas, Plotly Express
* **External APIs:** WAQI (World Air Quality Index)

---

## ⚙️ Docker Setup and Installation

### Prerequisites
1. [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.
2. A free WAQI API Token from [aqicn.org](https://aqicn.org/data-platform/token/).

### 1. Configure Environment Variables
Create a `.env` file in the root directory of the project. This file configures both the application and the Docker Compose services:
```env
# API Key for AQI data
WAQI_TOKEN=your_secure_api_token_here

# LLM Configuration for Docker
OLLAMA_AQI_MODEL=gemma3:4b
```
### 2. Build and Launch the Containers
Start the application stack using Docker Compose. This will build the Python container and start the Ollama service in detached mode:
```bash
docker-compose up --build -d
```
### 3. Initialize the Local LLM
Once the containers are running, you need to pull the required LLM weights into the Ollama container. Run the following command:
```Bash
docker exec -it ollama ollama pull gemma3:4b
```
(Note: The downloaded model weights are persisted in a Docker volume, so you only need to run this command once.)

### 4. Access the Application
Open your web browser and navigate to:
```Bash
http://localhost:8501
```
💡 **How It Works (The Request Flow)**<br>

**User Input**: The user types a natural language query in the Streamlit chat UI.

**Intent Extraction**: The query is sent to the Ollama container via the internal Docker network (http://ollama:11434). The LLM extracts the target city and formats it into a strict JSON object.

**MCP Tool Execution**: Streamlit acts as an MCP Client, sending a tool execution request (get_aqi) via standard input/output to the isolated FastMCP server running in the same container.

**Data Retrieval**: The MCP server securely reads the loaded WAQI token, queries the external API, and returns the payload.

**Rendering**: The frontend receives the JSON payload and dynamically renders a color-coded status box and Plotly bar charts based on the current pollutants.

## CI/CD Pipeline & Deployment Workflow

This project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD). Every push to the `main` branch automatically builds the application and deploys it to an AWS ECS Fargate cluster.

### Docker Image Tagging Convention
Images pushed to Amazon Elastic Container Registry (ECR) use a **sequential versioning strategy** alongside a rolling latest tag:
* **Sequential Version (e.g., `v3`)**: Every successful build is tagged with an incremental version number matching the GitHub Actions run number. This provides a clear, linear history of deployments.
* **`latest`**: The `latest` tag is overwritten on every successful deployment, allowing developers to easily pull the most recent version for local testing.

### Automated Deployment Steps
When a workflow is triggered, the pipeline executes the following steps:

1. **Configure AWS Credentials:** Authenticates with AWS using standard GitHub Action secrets (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`).
2. **Login to Amazon ECR:** Establishes a secure connection to the container registry.
3. **Build & Tag Docker Image:** Compiles the Streamlit application and tags it using the `${{ github.run_number }}` variable (e.g., `aqi-tracker:v4`) and the `latest` tag.
4. **Push to Registry:** Uploads the newly tagged images to Amazon ECR.
5. **Render Task Definition:** Dynamically updates the `task-definition.json` file to point to the new sequential version tag (e.g., `v4`). 
    * *Note: The task definition is configured with a specific Task Role (`AQITrackerTaskRole`) that grants the container permission to invoke Amazon Bedrock models.*
6. **Deploy to Amazon ECS:** Deploys the updated task definition to the Fargate cluster and waits for the new container to stabilize before gracefully draining the old ones.

By strictly deploying the exact sequential version number, we ensure that rollbacks are precise, auto-scaling events are deterministic, and it is always easy to identify which release is running in production.