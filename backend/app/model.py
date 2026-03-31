import joblib
from .config import MODEL_PATH, SCALER_PATH
from .logger import logger

model = None
scaler = None

def load_artifacts():
    global model, scaler
    try:
        print("Loading scaler...")
        scaler = joblib.load(SCALER_PATH)

        print("Loading model...")
        model = joblib.load(MODEL_PATH)

        print("✅ Loaded successfully")

    except Exception as e:
        print("❌ ERROR:", str(e))
        raise RuntimeError("Model loading failed")