FROM python:3.13-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. COPY dependencies list and install them securely
COPY requirements.txt   .
RUN pip install -r requirements.txt

# 4. COPY the rest of your application code
COPY app.py /app/app.py
COPY aqi_mcp_server.py /app/aqi_mcp_server.py
COPY .env /app/.env

# 5. Expose the port your application will run on (e.g., 8501 for Streamlit)
EXPOSE 8501

# 6. Define the default command to run app
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]