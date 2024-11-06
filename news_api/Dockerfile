# Use the existing Ollama image as base
FROM ollama/ollama:latest

# Set working directory
WORKDIR /app

# Install python3, pip, and venv
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*

# Copy main.py and any dependencies needed
COPY main.py /app/
COPY requirements.txt /app/
COPY start_service.sh /app/

# Create a virtual environment and install dependencies
RUN python3 -m venv venv && \
    /app/venv/bin/pip install --upgrade pip setuptools wheel && \
    /app/venv/bin/pip install -r requirements.txt



# Set the entrypoint script
ENTRYPOINT ["./start_service.sh"]