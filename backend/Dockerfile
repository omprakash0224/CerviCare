FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies needed by scikit-learn, xgboost, lightgbm
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies first (for Docker layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and model artifacts
COPY app/ ./app/
COPY models/ ./models/

# Expose port (Render uses $PORT, default to 8000)
EXPOSE 8000

# Run the app — Render injects $PORT at runtime
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
