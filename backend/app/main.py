from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Healthful - Heart Disease Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('xgb_clf.joblib')
scaler = joblib.load('scaler.joblib')
imputer = joblib.load('imputer.joblib')
features = joblib.load('features_list.joblib')

class Patient(BaseModel):
    Age: int
    Gender: str
    Weight: float
    Height: float
    BMI: float = None
    Smoking: str
    Alcohol_Intake: str
    Physical_Activity: str
    Diet: str
    Stress_Level: str
    Hypertension: int
    Diabetes: int
    Hyperlipidemia: int
    Family_History: int
    Previous_Heart_Attack: int
    Systolic_BP: int
    Diastolic_BP: int
    Heart_Rate: int
    Blood_Sugar_Fasting: float
    Cholesterol_Total: int

@app.post("/predict")
def predict(patient: Patient):
    gender_map = {'Male':1, 'Female':0}
    smoke_map = {'Never':0, 'Former':1, 'Current':2}
    alc_map = {'None':0, 'Low':1, 'Moderate':2, 'High':3}
    activity_map = {'Sedentary':0, 'Moderate':1, 'Active':2}
    diet_map = {'Unhealthy':0, 'Average':1, 'Healthy':2}
    stress_map = {'Low':0, 'Medium':1, 'High':2}

    d = patient.dict()
    if d.get('BMI') is None:
        d['BMI'] = d['Weight'] / ((d['Height']/100)**2)
    d['Gender'] = gender_map.get(d['Gender'], 0)
    d['Smoking'] = smoke_map.get(d['Smoking'], 0)
    d['Alcohol_Intake'] = alc_map.get(d['Alcohol_Intake'], 0)
    d['Physical_Activity'] = activity_map.get(d['Physical_Activity'], 0)
    d['Diet'] = diet_map.get(d['Diet'], 1)
    d['Stress_Level'] = stress_map.get(d['Stress_Level'], 1)
    d['Pulse_Pressure'] = d['Systolic_BP'] - d['Diastolic_BP']
    d['MAP'] = (d['Systolic_BP'] + 2*d['Diastolic_BP']) / 3

    X = pd.DataFrame([[d.get(c, 0) for c in features]], columns=features)
    X = pd.DataFrame(imputer.transform(X), columns=features)
    X_scaled = scaler.transform(X)
    prob = model.predict_proba(X_scaled)[0,1]
    pred = int(prob > 0.5)
    return {"probability": float(prob), "prediction": pred}
