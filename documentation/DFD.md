# Data Flow Diagram (DFD) – AI Medical Symptom Checker

## Level 0 – Context Diagram

```
                        ┌──────────────────────────────┐
                        │                              │
   [USER] ─────────────►│    AI Medical Symptom        │◄──────── [ADMIN]
          ◄─────────────│       Checker System         │──────────►
                        │                              │
                        └──────────────────────────────┘
                                      │
                                      ▼
                              [External: ML Model]
```

**Inputs from User:** Symptoms selected, login credentials, registration data
**Outputs to User:** Disease prediction, confidence score, PDF report, history
**Inputs from Admin:** Symptom/disease CRUD, user management actions
**Outputs to Admin:** Dashboard stats, user lists, prediction logs

---

## Level 1 – Main Processes

```
USER ──── Register/Login ────► [1.0 Authentication] ──► JWT Token ──► USER

USER ──── Symptoms ──────────► [2.0 Symptom Input]
                                        │
                                        ▼
                               [3.0 ML Prediction Engine]
                                        │
                                   ┌────┴─────┐
                                   │          │
                                   ▼          ▼
                            Disease Name   Confidence
                                   │          │
                                   └────┬─────┘
                                        ▼
                               [4.0 Result Enrichment]
                                (Fetches from DB:
                                 description, severity,
                                 precautions, emergency)
                                        │
                                        ▼
                               [5.0 Save Prediction] ──► PREDICTIONS DB
                                        │
                                        ▼
                              Result Response ──────────► USER

USER ──── View History ──────► [6.0 History Module] ──► PREDICTIONS DB
                                        │
                                        ▼
                              Prediction List ──────────► USER

USER ──── Download PDF ──────► [7.0 Report Generator]
                                        │
                                        ▼
                              PDF File ─────────────────► USER

ADMIN ─── CRUD Operations ──► [8.0 Admin Module]
                                        │
                              ┌─────────┼─────────┐
                              ▼         ▼         ▼
                          SYMPTOMS   DISEASES   USERS
                             DB        DB        DB
```

---

## Level 2 – ML Prediction Process (Process 3.0)

```
Symptoms Input (list of strings)
        │
        ▼
[3.1 Symptom Encoding]
   Convert symptom names to
   binary vector of length N
   (N = total unique symptoms)
        │
        ▼
[3.2 Model Inference]
   Random Forest predict_proba()
   Returns probability for each
   of 41 disease classes
        │
        ▼
[3.3 Result Extraction]
   argmax → Predicted Disease
   max probability → Confidence
   top-5 → Alternatives
        │
        ▼
[3.4 Label Decoding]
   LabelEncoder.inverse_transform()
   Converts integer class → Disease name
        │
        ▼
Prediction Dict (disease, confidence, alternatives)
```

---

## Level 2 – Authentication Process (Process 1.0)

```
[Registration]
User Input (name, email, password)
        │
        ▼
[1.1 Validate Input] ──── Error ──► Error Response
        │
        ▼
[1.2 Check Duplicate Email]
        │
        ▼
[1.3 Hash Password] (bcrypt)
        │
        ▼
[1.4 Save to DB]
        │
        ▼
[1.5 Generate JWT Token]
        │
        ▼
Token + User Data ──────────────► User

[Login]
Email + Password
        │
        ▼
[1.6 Lookup User by Email]
        │
        ▼
[1.7 Verify Password Hash]
        │
        ▼
[1.8 Generate JWT Token]
        │
        ▼
Token + User Data ──────────────► User
```

---

## Data Stores

| Store             | Type          | Contents                          |
|-------------------|---------------|-----------------------------------|
| USERS DB          | SQLite table  | User accounts and roles           |
| SYMPTOMS DB       | SQLite table  | All known symptom names           |
| DISEASES DB       | SQLite table  | Disease metadata + precautions    |
| PREDICTIONS DB    | SQLite table  | User prediction history           |
| ADMIN_LOGS DB     | SQLite table  | Admin action audit trail          |
| ML MODEL FILES    | .pkl files    | Trained Random Forest + Encoders  |
