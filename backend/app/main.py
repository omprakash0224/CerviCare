from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import app.model as model_module   # ✅ IMPORTANT FIX

from .schemas import PatientFeatures
from .predictor import predict_single
from .config import THRESHOLD, MODEL_VERSION

app = FastAPI(
    title="CerviCare ML API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Startup: Load Model into FastAPI State ─────────────────────────────

@app.on_event("startup")
def startup():
    model_module.load_artifacts()

    # ✅ Store inside FastAPI state (BEST PRACTICE)
    app.state.model = model_module.model
    app.state.scaler = model_module.scaler

    print("✅ Model & Scaler stored in app.state")


# ─── Root Endpoint ─────────────────────────────────────────────────────

@app.get("/")
def root():
    return {
        "status": "ok",
        "model_version": MODEL_VERSION,
        "threshold": THRESHOLD
    }


# ─── Health Check ──────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {
        "model_loaded": app.state.model is not None,
        "scaler_loaded": app.state.scaler is not None
    }


# ─── Prediction Endpoint ───────────────────────────────────────────────

@app.post("/predict")
def predict(data: PatientFeatures):

    model = app.state.model
    scaler = app.state.scaler

    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    arr = data.to_array()

    # Scale input
    scaled = scaler.transform(arr)

    # Predict
    prob = float(model.predict_proba(scaled)[0][1])

    # Apply threshold
    prediction = "HIGH RISK" if prob >= THRESHOLD else "LOW RISK"

    # Risk levels
    if prob >= 0.60:
        risk = "critical"
    elif prob >= THRESHOLD:   # 0.25
        risk = "moderate"
    else:
        risk = "low"

    return {
        "probability": round(prob, 4),
        "prediction": prediction,
        "risk_level": risk,
        "threshold": THRESHOLD,
        "model_version": MODEL_VERSION
    }


# ─── Batch Prediction ──────────────────────────────────────────────────

@app.post("/predict/batch")
def predict_batch(data: list[PatientFeatures]):

    model = app.state.model
    scaler = app.state.scaler

    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    results = []

    for item in data:
        arr = item.to_array()
        scaled = scaler.transform(arr)
        prob = float(model.predict_proba(scaled)[0][1])

        prediction = "HIGH RISK" if prob >= THRESHOLD else "LOW RISK"

        if prob >= 0.60:
            risk = "critical"
        elif prob >= THRESHOLD:
            risk = "moderate"
        else:
            risk = "low"

        results.append({
            "probability": round(prob, 4),
            "prediction": prediction,
            "risk": risk
        })

    return results