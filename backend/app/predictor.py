from .model import model, scaler
from .config import THRESHOLD
from .logger import logger

def predict_single(input_array):

    scaled = scaler.transform(input_array)
    prob = float(model.predict_proba(scaled)[0][1])

    pred = "HIGH RISK" if prob >= THRESHOLD else "LOW RISK"

    if prob >= 0.6:
        risk = "critical"
    elif prob >= THRESHOLD:
        risk = "moderate"
    else:
        risk = "low"

    logger.info(f"Prediction: prob={prob:.4f}, risk={risk}")

    return prob, pred, risk