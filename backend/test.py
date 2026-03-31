import joblib
import numpy as np

model = joblib.load("models/voting_model.pkl")
scaler = joblib.load("models/scaler.pkl")

# Dummy sample (use real data ideally)
sample = np.array([[30,2,18,1,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]])

scaled = scaler.transform(sample)
prob = model.predict_proba(scaled)

print(prob)