#!/bin/bash
set -e

# Activate virtual environment
source venv/bin/activate

# Start Ollama server
ollama serve &

# Wait for Ollama server to be ready
sleep 5

python main.py