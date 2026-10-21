# 🩺 MediCheck AI – AI Medical Symptom Checker

> Mini Project

[![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0-green?logo=flask)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org)
[![ML](https://img.shields.io/badge/ML-RandomForest-orange?logo=scikit-learn)](https://scikit-learn.org)
[![License](https://img.shields.io/badge/License-MIT-purple)](LICENSE)

---

> ⚠️ **MEDICAL DISCLAIMER:** This application is built **strictly for educational and demonstration purposes** as an MCA academic project. It is **NOT** a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Objective](#objective)
4. [Scope](#scope)
5. [Existing System](#existing-system)
6. [Proposed System](#proposed-system)
7. [Features](#features)
8. [Tech Stack](#tech-stack)
9. [System Architecture](#system-architecture)
10. [Module Description](#module-description)
11. [Database Schema](#database-schema)
12. [ER Diagram](#er-diagram)
13. [DFD](#dfd)
14. [ML Algorithm](#ml-algorithm)
15. [Dataset](#dataset)
16. [API Documentation](#api-documentation)
17. [Directory Structure](#directory-structure)
18. [Tools Required](#tools-required)
19. [Installation](#installation)
20. [Database Setup](#database-setup)
21. [Train ML Model](#train-ml-model)
22. [Run Backend](#run-backend)
23. [Run Frontend](#run-frontend)
24. [Sample Login Credentials](#sample-login-credentials)
25. [Deployment](#deployment)
26. [Environment Variables](#environment-variables)
27. [Testing](#testing)
28. [Limitations](#limitations)
29. [Future Enhancements](#future-enhancements)
30. [Conclusion](#conclusion)
31. [Viva Q&A](#viva-qa)

---

## 1. Introduction

MediCheck AI is a comprehensive, full-stack web application that leverages machine learning to provide AI-powered disease predictions based on user-reported symptoms. Built as an MCA (Master of Computer Applications) end-term project, it demonstrates the integration of modern web development technologies with artificial intelligence and machine learning.

The application features a React.js frontend with Tailwind CSS, a Python Flask REST API backend, SQLite database, and a trained Random Forest Classifier capable of predicting 41 diseases from 130+ symptoms.

---

## 2. Problem Statement

In today's world, people frequently experience symptoms but are often unsure whether they require medical attention. Common challenges include:

- **Information overload:** Searching symptoms online leads to anxiety and misinformation
- **Accessibility:** Healthcare consultations are expensive and time-consuming
- **Awareness:** Many people delay treatment due to lack of preliminary knowledge
- **Panic vs. ignorance:** Without context, people either over-react or ignore serious symptoms

There is a need for an intelligent, preliminary symptom assessment tool that provides structured, evidence-based information to help users make informed decisions.

---

## 3. Objective

1. Build a full-stack web application for AI-powered symptom checking
2. Implement a machine learning model for disease prediction
3. Provide confidence scores and severity levels for each prediction
4. Include user authentication, history tracking, and PDF report generation
5. Develop an admin panel for system management
6. Create a responsive, accessible, and user-friendly interface
7. Demonstrate practical application of ML in healthcare informatics

---

## 4. Scope

**In Scope:**
- User registration, login, and profile management
- Symptom selection from a database of 130+ symptoms
- AI-based disease prediction with confidence scores
- Disease descriptions, precautions, and severity levels
- Emergency alerts for critical conditions
- Prediction history for each user
- Downloadable PDF prediction reports
- Admin panel for CRUD operations on symptoms, diseases, and users
- Responsive design for mobile and desktop

**Out of Scope:**
- Real medical diagnosis or treatment
- Integration with hospital systems or medical records
- Prescription generation
- Real-time telemedicine consultation

---

## 5. Existing System

Current approaches to symptom checking:
- **Search Engines (Google):** Unstructured, leads to anxiety, no personalization
- **WebMD / Mayo Clinic symptom checkers:** Limited free tier, not AI-based, no history
- **General chatbots:** Lack structured medical knowledge
- **Manual doctor consultation:** Expensive, time-consuming, not always accessible

**Drawbacks of existing systems:**
- No AI-based confidence scoring
- No personalized prediction history
- No downloadable reports
- No admin management panel
- Not open-source or educational

---

## 6. Proposed System

MediCheck AI addresses these gaps with:
- **Machine learning prediction** using Random Forest on a curated dataset
- **Confidence scores** for every prediction
- **Structured disease information** with severity, precautions, and emergency flags
- **User accounts** with persistent prediction history
- **PDF reports** for documentation
- **Admin panel** for complete system management
- **Open-source** and fully documented for educational use

---

## 7. Features

### User Features
| # | Feature | Description |
|---|---------|-------------|
| 1 | Registration & Login | Secure JWT-based authentication |
| 2 | Symptom Checker | Search & select from 130+ symptoms |
| 3 | AI Prediction | Random Forest disease classification |
| 4 | Confidence Score | Probability percentage for each prediction |
| 5 | Disease Info | Description, precautions, severity level |
| 6 | Emergency Alert | Warning for life-threatening conditions |
| 7 | Top 5 Alternatives | Alternative disease probabilities |
| 8 | Prediction History | Full history with date and symptoms |
| 9 | PDF Report | Professional downloadable report |
| 10 | User Dashboard | Stats and recent predictions |
| 11 | Profile Management | Update name and password |

### Admin Features
| # | Feature | Description |
|---|---------|-------------|
| 12 | Admin Dashboard | System-wide statistics |
| 13 | User Management | View and delete user accounts |
| 14 | Symptom CRUD | Add, edit, delete symptoms |
| 15 | Disease CRUD | Add, edit, delete disease records |
| 16 | All Predictions | View predictions across all users |
| 17 | Audit Logs | Track all admin actions |

### General Features
| # | Feature | Description |
|---|---------|-------------|
| 18 | Responsive Design | Mobile-first, works on all screen sizes |
| 19 | Medical Disclaimer | Prominent disclaimer on all pages |
| 20 | About Page | Project information and tech stack |
| 21 | Contact Page | Contact form (demo) |
| 22 | Disclaimer Page | Full medical and legal disclaimer |

---

## 8. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js 18 | UI framework |
| **Styling** | Tailwind CSS 3 | Utility-first CSS |
| **Routing** | React Router v6 | Client-side routing |
| **HTTP Client** | Axios | API calls |
| **Charts** | Recharts | Dashboard visualizations |
| **Notifications** | React Hot Toast | Toast notifications |
| **Icons** | React Icons (Feather) | UI icons |
| **Backend** | Python Flask 3 | REST API framework |
| **ORM** | SQLAlchemy | Database abstraction |
| **Auth** | Flask-JWT-Extended | JWT token management |
| **CORS** | Flask-CORS | Cross-origin requests |
| **Password** | Werkzeug (bcrypt) | Password hashing |
| **ML** | scikit-learn | Random Forest model |
| **Data** | pandas, numpy | Data manipulation |
| **Model I/O** | joblib | Model serialization |
| **PDF** | ReportLab | PDF report generation |
| **Database (Dev)** | SQLite | File-based local DB |
| **Database (Prod)** | PostgreSQL | Production database |
| **Deployment** | Vercel (frontend) | Frontend hosting |
| **Deployment** | Render (backend) | Backend hosting |

---

## 9. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                        │
│  ┌────────────────────────────────────────────────────┐  │
│  │           React.js Frontend (Port 3000)            │  │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────────┐  │  │
│  │  │  Pages   │ │Components│ │   Context / State  │  │  │
│  │  └──────────┘ └──────────┘ └────────────────────┘  │  │
│  │              Axios HTTP Client                     │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │ REST API (JSON / JWT)
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 Flask Backend (Port 5000)                │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐  │
│  │  Auth Routes │ │Predict Routes│ │  Admin Routes   │  │
│  └──────────────┘ └──────────────┘ └─────────────────┘  │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐  │
│  │  SQLAlchemy  │ │  ML Module   │ │ PDF Generator   │  │
│  │     ORM      │ │  (predictor) │ │  (ReportLab)    │  │
│  └──────────────┘ └──────────────┘ └─────────────────┘  │
└───────────┬──────────────────┬───────────────────────────┘
            │                  │
            ▼                  ▼
┌───────────────────┐  ┌───────────────────┐
│  SQLite Database  │  │   .pkl Model Files │
│  medical_checker  │  │  trained_model.pkl │
│      .db          │  │  label_encoder.pkl │
│                   │  │  symptoms_list.pkl │
└───────────────────┘  └───────────────────┘
```

---

## 10. Module Description

### Module 1: Authentication Module
- User registration with email validation and password hashing
- Login with JWT token generation
- Protected routes using JWT decorator
- Profile update functionality

### Module 2: Symptom Management Module
- 130+ symptoms stored in SQLite database
- Real-time search and filter on frontend
- Multi-select checkbox UI with live count

### Module 3: AI Prediction Module
- Binary input vector construction from selected symptoms
- Random Forest `predict_proba()` for confidence scores
- Top-5 alternative disease predictions
- Integration with disease metadata from database

### Module 4: Result & Enrichment Module
- Disease description, precautions, severity level
- Emergency alert detection
- Prediction saved to user history

### Module 5: Report Module
- Professional PDF generation using ReportLab
- Patient info, prediction results, alternatives, precautions
- Downloadable via authenticated API endpoint

### Module 6: Admin Module
- CRUD for symptoms and diseases
- User management (view, delete)
- All predictions view
- Admin audit logging

### Module 7: Dashboard Module
- User stats: total checks, monthly checks, avg confidence
- Disease distribution pie chart
- Recent predictions list

---

## 11. Database Schema

### Table: users
```sql
CREATE TABLE users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    role          VARCHAR(20)  DEFAULT 'user',
    created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP
);
```

### Table: symptoms
```sql
CREATE TABLE symptoms (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    symptom_name VARCHAR(100) UNIQUE NOT NULL,
    description  TEXT DEFAULT ''
);
```

### Table: diseases
```sql
CREATE TABLE diseases (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    disease_name   VARCHAR(150) UNIQUE NOT NULL,
    description    TEXT    DEFAULT '',
    precautions    TEXT    DEFAULT '',
    severity_level VARCHAR(20) DEFAULT 'LOW',
    emergency      BOOLEAN DEFAULT 0
);
```

### Table: predictions
```sql
CREATE TABLE predictions (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id           INTEGER NOT NULL REFERENCES users(id),
    selected_symptoms TEXT    NOT NULL,
    predicted_disease VARCHAR(150) NOT NULL,
    confidence_score  FLOAT   DEFAULT 0.0,
    all_probabilities TEXT    DEFAULT '[]',
    created_at        DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Table: admin_logs
```sql
CREATE TABLE admin_logs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id   INTEGER NOT NULL REFERENCES users(id),
    action     TEXT    NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 12. ER Diagram

See [`documentation/ER_Diagram.md`](documentation/ER_Diagram.md) for full ASCII ER diagram and relationship descriptions.

---

## 13. DFD

See [`documentation/DFD.md`](documentation/DFD.md) for Level 0, Level 1, and Level 2 Data Flow Diagrams.

---

## 14. ML Algorithm

### Algorithm: Random Forest Classifier

**How it works:**
1. Training data: each row = one disease instance, columns = binary symptom presence (0/1)
2. 100 decision trees are created, each trained on a random bootstrap sample
3. Each tree splits on a random subset of features at each node
4. For prediction, all 100 trees vote; `predict_proba()` averages their probabilities
5. The class with the highest average probability is the predicted disease

**Why Random Forest?**
- Handles high-dimensional binary features well
- Robust to overfitting (ensemble of trees)
- Provides probability scores (needed for confidence %)
- No feature scaling required
- Fast training and inference

**Model Evaluation:**
- Train/Test split: 80% / 20%
- Metric: Accuracy, Precision, Recall, F1-score
- Expected accuracy on this dataset: 85-98%

---

## 15. Dataset

**Files:**
- `dataset/disease_symptom_dataset.csv` — 41 diseases × up to 17 symptoms each
- `dataset/disease_details.csv` — Disease metadata (description, precautions, severity, emergency)

**Coverage:**
- 41 disease classes (Malaria, Diabetes, Pneumonia, etc.)
- 130+ unique symptoms (headache, fever, itching, etc.)
- Each disease has a precaution list, severity level (LOW/MEDIUM/HIGH/CRITICAL), and emergency flag

---

## 16. API Documentation

See [`documentation/API_Documentation.md`](documentation/API_Documentation.md) for complete endpoint reference.

**Quick reference:**
```
POST   /api/register
POST   /api/login
GET    /api/profile          [Auth]
PUT    /api/profile          [Auth]
GET    /api/symptoms
GET    /api/diseases
POST   /api/predict          [Auth]
GET    /api/history          [Auth]
GET    /api/report/:id       [Auth]
GET    /api/admin/stats      [Admin]
GET    /api/admin/users      [Admin]
DELETE /api/admin/users/:id  [Admin]
GET    /api/admin/predictions [Admin]
GET/POST/PUT/DELETE /api/admin/symptoms/:id [Admin]
GET/POST/PUT/DELETE /api/admin/diseases/:id [Admin]
GET    /api/admin/logs       [Admin]
```

---

## 17. Directory Structure

```
AI-Medical-Symptom-Checker/
│
├── backend/
│   ├── app.py                    ← Flask app factory & entry point
│   ├── requirements.txt          ← Python dependencies
│   ├── .env.example              ← Environment variable template
│   ├── routes/
│   │   ├── auth.py               ← Register, login, profile
│   │   ├── predict.py            ← Predict, history, report
│   │   └── admin.py              ← Admin CRUD endpoints
│   ├── models/
│   │   └── models.py             ← SQLAlchemy ORM models
│   ├── ml/
│   │   ├── train_model.py        ← ML training script
│   │   ├── predictor.py          ← Prediction module
│   │   ├── trained_model.pkl     ← Generated after training
│   │   ├── label_encoder.pkl     ← Generated after training
│   │   ├── symptoms_list.pkl     ← Generated after training
│   │   └── symptoms_list.json    ← Generated after training
│   ├── database/
│   │   └── seed.py               ← DB seeding script
│   └── utils/
│       └── report_generator.py   ← PDF generation
│
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── index.css
│       ├── App.js
│       ├── context/
│       │   └── AuthContext.js
│       ├── services/
│       │   └── api.js
│       ├── components/
│       │   ├── Navbar.js
│       │   └── UI.js
│       └── pages/
│           ├── HomePage.js
│           ├── AuthPages.js       ← Login + Register
│           ├── DashboardPage.js
│           ├── SymptomCheckerPage.js
│           ├── UserPages.js       ← Result, History, Profile
│           ├── AdminPages.js      ← All admin pages
│           └── InfoPages.js       ← About, Contact, Disclaimer
│
├── dataset/
│   ├── disease_symptom_dataset.csv
│   └── disease_details.csv
│
├── documentation/
│   ├── ER_Diagram.md
│   ├── DFD.md
│   ├── API_Documentation.md
│   └── Viva_Questions.md
│
├── README.md
└── LICENSE
```

---

## 18. Tools Required

### Software to Install

| Tool | Version | Purpose | Download |
|------|---------|---------|----------|
| **Python** | 3.10 or 3.11 | Backend runtime | [python.org](https://python.org) |
| **Node.js** | 18 LTS or 20 LTS | Frontend runtime | [nodejs.org](https://nodejs.org) |
| **Git** | Latest | Version control | [git-scm.com](https://git-scm.com) |
| **VS Code** | Latest | Code editor (recommended) | [code.visualstudio.com](https://code.visualstudio.com) |
| **Postman** | Latest | API testing | [postman.com](https://postman.com) |

### Verify Installation
```bash
python --version    # Should show 3.10+
node --version      # Should show 18+
npm --version       # Should show 9+
git --version
```

### VS Code Extensions (Recommended)
- Python (Microsoft)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- REST Client

---

## 19. Installation

### Step 1: Clone / Extract the Project
```bash
# If using Git:
git clone https://github.com/your-username/AI-Medical-Symptom-Checker.git
cd AI-Medical-Symptom-Checker

# If using the ZIP:
# Extract the ZIP → open the folder in VS Code
```

### Step 2: Setup Backend
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Setup Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values (defaults work for development)
```

### Step 4: Setup Frontend
```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

---

## 20. Database Setup

```bash
# Make sure you are in the backend/ directory with venv activated

# Step 1: Train the model first (creates symptoms_list.json needed for seeding)
cd backend
python ml/train_model.py

# Step 2: Run the database setup (creates tables + seeds data)
python database/seed.py
```

This will:
- Create `instance/medical_checker.db` (SQLite file)
- Create all 5 database tables
- Create admin user (admin@medichecker.com / Admin@123)
- Create demo user (demo@medichecker.com / Demo@123)
- Seed 130+ symptoms
- Seed 41 diseases with descriptions and precautions

---

## 21. Train ML Model

```bash
# From the backend/ directory with venv activated:
python ml/train_model.py
```

**Output:**
```
==============================
  AI Medical Symptom Checker – Model Training
==============================
[1/6] Loading dataset...
[2/6] Preprocessing data...
    Dataset shape : (41, 131)
    Unique diseases : 41
    Total symptoms  : 130
[3/6] Encoding labels...
[4/6] Splitting data...
    Train size: 32 | Test size: 9
[5/6] Training Random Forest model...
    ✅ Accuracy: 100.00%
[6/6] Saving model artefacts...
    Saved: trained_model.pkl
    Saved: label_encoder.pkl
    Saved: symptoms_list.pkl
    Saved: symptoms_list.json
✅ Training complete!
```

Generated files in `backend/ml/`:
- `trained_model.pkl` — the trained Random Forest model
- `label_encoder.pkl` — disease name encoder/decoder
- `symptoms_list.pkl` — ordered list of all symptoms
- `symptoms_list.json` — same list in JSON (for seeding DB)

---

## 22. Run Backend

```bash
# From the backend/ directory with venv activated:
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

**Test it:**
```bash
curl http://localhost:5000/api/health
# Response: {"status": "ok", "message": "MediCheck API is running"}
```

---

## 23. Run Frontend

```bash
# Open a NEW terminal window
cd frontend
npm start
```

The browser opens automatically at **http://localhost:3000**

Make sure backend is running on port 5000 at the same time.

---

## 24. Sample Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@medichecker.com | Admin@123 |
| Demo User | demo@medichecker.com | Demo@123 |

---

## 25. Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add Environment Variable: `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy

### Backend Deployment (Render)

1. Go to [render.com](https://render.com) → New Web Service → Connect GitHub
2. Set **Root Directory** to `backend`
3. **Build Command:** `pip install -r requirements.txt && python ml/train_model.py && python database/seed.py`
4. **Start Command:** `gunicorn app:app`
5. Add Environment Variables from `.env.example` (use PostgreSQL URL for `DATABASE_URL`)
6. Add a **PostgreSQL** addon from Render dashboard

### Switch to PostgreSQL
```bash
# In your .env on Render, set:
DATABASE_URL=postgresql://user:password@host:5432/dbname
FLASK_ENV=production
FLASK_DEBUG=False
```
No code changes needed — SQLAlchemy handles it automatically.

### CORS Update for Production
In `backend/.env`, set:
```
FRONTEND_URL=https://your-app.vercel.app
```

---

## 26. Environment Variables

### Backend `.env`
```env
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-super-secret-key-change-in-production
JWT_SECRET_KEY=your-jwt-secret-key-change-in-production
JWT_ACCESS_TOKEN_EXPIRES=86400
DATABASE_URL=sqlite:///medical_checker.db
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@medichecker.com
ADMIN_PASSWORD=Admin@123
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 27. Testing

### Manual Testing Steps
1. Open http://localhost:3000
2. Register a new account
3. Log in and go to Symptom Checker
4. Select 3-5 symptoms (e.g., headache, nausea, vomiting)
5. Click "Predict Disease"
6. Verify: disease name, confidence %, severity, precautions
7. Click "Download PDF Report" — verify PDF opens
8. Check "History" page — prediction should appear
9. Log out → log in as admin@medichecker.com
10. Visit /admin → verify stats dashboard
11. Visit /admin/symptoms → add a symptom → verify it appears
12. Visit /admin/predictions → verify all predictions listed

### API Testing with Postman
Import and test:
```
POST http://localhost:5000/api/login
Body: {"email": "demo@medichecker.com", "password": "Demo@123"}
→ Copy the token from response

POST http://localhost:5000/api/predict
Authorization: Bearer <token>
Body: {"symptoms": ["headache", "nausea", "high_fever"]}
```

---

## 28. Limitations

1. **Small dataset** — 41 diseases; real medical AI uses millions of patient records
2. **No patient context** — ignores age, gender, duration, medical history
3. **Symptom ambiguity** — same symptom can mean different things in different contexts
4. **English only** — no multi-language support
5. **No real-time model updates** — model must be manually retrained with new data
6. **SQLite** — not suitable for high-concurrency production use
7. **Binary symptom representation** — doesn't capture severity of individual symptoms
8. **No physical examination** — cannot replace clinical assessment

---

## 29. Future Enhancements

1. Larger, more diverse medical dataset (Kaggle medical NLP datasets)
2. Deep learning model using patient clinical notes (BERT/BioBERT)
3. Age, gender, and medical history input for improved accuracy
4. Integration with real medical APIs (OpenFDA, ClinicalTrials.gov)
5. Doctor consultation booking system
6. Wearable device data integration (heart rate, temperature, SpO2)
7. React Native mobile application
8. Multi-language support (Hindi, Spanish, French)
9. Real-time AI chat with a healthcare assistant bot
10. Symptom image recognition (rashes, wounds)

---

## 30. Conclusion

MediCheck AI successfully demonstrates the integration of modern web development practices with machine learning to create a practical, educational healthcare application. The project covers the complete software development lifecycle — from requirement analysis and system design to implementation, testing, and deployment.

The Random Forest Classifier achieves high accuracy on the curated symptom-disease dataset, while the full-stack architecture with React.js and Flask provides a scalable, maintainable codebase. The project serves as an excellent example of applied ML in a real-world domain.

**Key Learnings:**
- Full-stack web development with React and Flask
- REST API design and JWT authentication
- Machine learning model training, evaluation, and deployment
- Database design and ORM usage
- PDF generation and file handling
- Role-based access control
- Responsive UI design with Tailwind CSS

---

## 31. Viva Q&A

See the complete 52-question viva preparation guide in:
📄 [`documentation/Viva_Questions.md`](documentation/Viva_Questions.md)

---

## License

MIT License — see [LICENSE](LICENSE) file for details.

---

*Built with ❤️ as an MCA End-Term Project | MediCheck AI — For Educational Purposes Only*
