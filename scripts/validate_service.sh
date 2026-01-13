#!/bin/bash

# Basic check to confirm the web app is running on port 8501 (Streamlit default)
sleep 10
curl --fail http://localhost:8501/ || exit 1
