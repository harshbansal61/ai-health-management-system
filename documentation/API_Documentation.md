# API Documentation – AI Medical Symptom Checker

**Base URL:** `http://localhost:5000/api`
**Auth:** Bearer JWT Token in `Authorization` header

---

## Authentication Endpoints

### POST /register
Register a new user.

**Request Body:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "Pass@123" }
```
**Response 201:**
```json
{ "message": "Registration successful", "token": "<jwt>", "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "user" } }
```

---

### POST /login
Login with email and password.

**Request Body:**
```json
{ "email": "john@example.com", "password": "Pass@123" }
```
**Response 200:**
```json
{ "message": "Login successful", "token": "<jwt>", "user": { ... } }
```

---

### GET /profile *(Auth required)*
Get current user profile.

**Response 200:**
```json
{ "id": 1, "name": "John Doe", "email": "john@example.com", "role": "user", "created_at": "2024-01-01T00:00:00" }
```

---

### PUT /profile *(Auth required)*
Update name or password.

**Request Body:**
```json
{ "name": "New Name", "password": "NewPass@123" }
```

---

## Prediction Endpoints

### GET /symptoms
Get list of all symptoms.

**Response 200:**
```json
[ { "id": 1, "symptom_name": "headache", "description": "Headache" }, ... ]
```

---

### GET /diseases
Get list of all diseases with metadata.

**Response 200:**
```json
[ { "id": 1, "disease_name": "Migraine", "description": "...", "precautions": ["Rest","Hydrate"], "severity_level": "MEDIUM", "emergency": false }, ... ]
```

---

### POST /predict *(Auth required)*
Run AI prediction on selected symptoms.

**Request Body:**
```json
{ "symptoms": ["headache", "nausea", "vomiting"] }
```
**Response 200:**
```json
{
  "prediction_id": 42,
  "disease": "Migraine",
  "confidence": 78.5,
  "all_probabilities": [ { "disease": "Migraine", "probability": 78.5 }, ... ],
  "selected_symptoms": ["headache", "nausea", "vomiting"],
  "description": "A neurological condition...",
  "precautions": ["Rest in dark room", "Stay hydrated"],
  "severity_level": "MEDIUM",
  "emergency": false,
  "created_at": "2024-01-01T12:00:00"
}
```

---

### GET /history *(Auth required)*
Get all predictions for the current user.

**Response 200:**
```json
[ { "id": 1, "predicted_disease": "Migraine", "confidence_score": 78.5, "selected_symptoms": [...], "created_at": "..." }, ... ]
```

---

### GET /report/:id *(Auth required)*
Download PDF report for a prediction.

**Response:** Binary PDF file (`application/pdf`)

---

## Admin Endpoints *(Admin role required)*

### GET /admin/stats
Dashboard statistics.

**Response 200:**
```json
{ "total_users": 50, "total_predictions": 200, "total_symptoms": 132, "total_diseases": 41 }
```

---

### GET /admin/users
List all users.

### DELETE /admin/users/:id
Delete a user (non-admin only).

### GET /admin/predictions
All predictions with user info (latest 200).

### GET /admin/symptoms
List all symptoms.

### POST /admin/symptoms
Add a symptom. Body: `{ "symptom_name": "chest_pain", "description": "..." }`

### PUT /admin/symptoms/:id
Update a symptom.

### DELETE /admin/symptoms/:id
Delete a symptom.

### GET /admin/diseases
List all diseases.

### POST /admin/diseases
Add a disease. Body: `{ "disease_name": "...", "description": "...", "precautions": "p1;p2", "severity_level": "HIGH", "emergency": false }`

### PUT /admin/diseases/:id
Update a disease.

### DELETE /admin/diseases/:id
Delete a disease.

### GET /admin/logs
Get admin action logs (latest 100).

---

## Error Responses

| Code | Meaning              |
|------|----------------------|
| 400  | Bad Request          |
| 401  | Unauthorized         |
| 403  | Forbidden            |
| 404  | Not Found            |
| 409  | Conflict (duplicate) |
| 500  | Internal Server Error|

**Error format:**
```json
{ "error": "Description of the error" }
```
