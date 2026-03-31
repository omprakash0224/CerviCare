import os

MODEL_DIR = os.getenv("MODEL_DIR", "./models")
MODEL_PATH = os.path.join(MODEL_DIR, "voting_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")

THRESHOLD = 0.25
MODEL_VERSION = "v1.0-voting-ensemble"