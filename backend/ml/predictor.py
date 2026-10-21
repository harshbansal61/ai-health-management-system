"""
Prediction module – loads trained model and returns disease predictions.
"""

import joblib
import numpy as np
import pandas as pd
import os

_BASE     = os.path.dirname(__file__)
_MODEL    = None
_ENCODER  = None
_SYMPTOMS = None


def _load():
    global _MODEL, _ENCODER, _SYMPTOMS
    if _MODEL is None:
        model_path    = os.path.join(_BASE, 'trained_model.pkl')
        encoder_path  = os.path.join(_BASE, 'label_encoder.pkl')
        symptoms_path = os.path.join(_BASE, 'symptoms_list.pkl')

        if not all(os.path.exists(p) for p in [model_path, encoder_path, symptoms_path]):
            raise FileNotFoundError(
                "Model artefacts not found. "
                "Run: python backend/ml/train_model.py"
            )
        _MODEL    = joblib.load(model_path)
        _ENCODER  = joblib.load(encoder_path)
        _SYMPTOMS = joblib.load(symptoms_path)


def get_all_symptoms() -> list:
    """Return the full list of known symptom names."""
    _load()
    return list(_SYMPTOMS)


def predict(selected_symptoms: list) -> dict:
    """
    Given a list of symptom strings, return prediction dict.
    """
    _load()

    # Build binary DataFrame with proper feature names (matches training)
    input_dict = {s: 0 for s in _SYMPTOMS}
    unknown = []
    for symptom in selected_symptoms:
        sym = symptom.strip().lower().replace(' ', '_')
        if sym in input_dict:
            input_dict[sym] = 1
        else:
            unknown.append(symptom)

    input_df = pd.DataFrame([input_dict], columns=_SYMPTOMS)

    # Predict probabilities
    proba    = _MODEL.predict_proba(input_df)[0]
    top_idx  = int(np.argmax(proba))
    confidence = round(float(proba[top_idx]) * 100, 2)
    disease    = str(_ENCODER.inverse_transform([top_idx])[0])

    # Top-5 alternatives
    top5_idx = np.argsort(proba)[::-1][:5]
    alternatives = [
        {
            'disease':     str(_ENCODER.inverse_transform([i])[0]),
            'probability': round(float(proba[i]) * 100, 2)
        }
        for i in top5_idx
    ]

    return {
        'disease':          disease,
        'confidence':       confidence,
        'all_probabilities': alternatives,
        'unknown_symptoms': unknown,
    }
