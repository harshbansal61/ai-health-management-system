"""
ML Training Script for AI Medical Symptom Checker
Trains a Random Forest Classifier on the symptom-disease dataset
Run: python ml/train_model.py
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
import json

# ── Paths ──────────────────────────────────────────────────────────────────────
DATASET_PATH = os.path.join(os.path.dirname(__file__), '../../dataset/disease_symptom_dataset.csv')
MODEL_DIR    = os.path.dirname(__file__)

print("=" * 60)
print("  AI Medical Symptom Checker – Model Training")
print("=" * 60)

# ── 1. Load Dataset ────────────────────────────────────────────────────────────
print("\n[1/6] Loading dataset...")
df = pd.read_csv(DATASET_PATH)
df.columns = df.columns.str.strip()

symptom_cols = [c for c in df.columns if c.startswith('Symptom')]

# ── 2. Preprocess ─────────────────────────────────────────────────────────────
print("[2/6] Preprocessing data...")

# Collect all unique symptoms
all_symptoms_set = set()
for _, row in df.iterrows():
    for col in symptom_cols:
        val = str(row[col]).strip()
        if val and val not in ('nan', ''):
            all_symptoms_set.add(val)

all_symptoms = sorted(list(all_symptoms_set))

# Build binary rows
rows = []
for _, row in df.iterrows():
    disease = str(row['Disease']).strip()
    symptoms_present = set()
    for col in symptom_cols:
        val = str(row[col]).strip()
        if val and val not in ('nan', ''):
            symptoms_present.add(val)
    binary_row = {s: (1 if s in symptoms_present else 0) for s in all_symptoms}
    binary_row['Disease'] = disease
    rows.append(binary_row)

data = pd.DataFrame(rows)
X = data[all_symptoms]
y = data['Disease']

print(f"    Dataset shape    : {data.shape}")
print(f"    Unique diseases  : {y.nunique()}")
print(f"    Total symptoms   : {len(all_symptoms)}")

# ── 3. Encode Labels ──────────────────────────────────────────────────────────
print("[3/6] Encoding labels...")
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# ── 4. Train/Test Split (no stratify – dataset too small per class) ────────────
print("[4/6] Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)
print(f"    Train size: {len(X_train)} | Test size: {len(X_test)}")

# ── 5. Train Model ────────────────────────────────────────────────────────────
print("[5/6] Training Random Forest model...")
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    random_state=42,
    n_jobs=-1
)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
acc    = accuracy_score(y_test, y_pred)
print(f"    Accuracy: {acc * 100:.2f}%")

# ── 6. Save Artefacts ─────────────────────────────────────────────────────────
print("[6/6] Saving model artefacts...")
joblib.dump(model,        os.path.join(MODEL_DIR, 'trained_model.pkl'))
joblib.dump(le,           os.path.join(MODEL_DIR, 'label_encoder.pkl'))
joblib.dump(all_symptoms, os.path.join(MODEL_DIR, 'symptoms_list.pkl'))

with open(os.path.join(MODEL_DIR, 'symptoms_list.json'), 'w') as f:
    json.dump(all_symptoms, f, indent=2)

print("    Saved: trained_model.pkl")
print("    Saved: label_encoder.pkl")
print("    Saved: symptoms_list.pkl")
print("    Saved: symptoms_list.json")
print("\n✅ Training complete!\n")
