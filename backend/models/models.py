"""
SQLAlchemy database models for AI Medical Symptom Checker
"""

from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def utcnow():
    return datetime.now(timezone.utc)


# ─── User ─────────────────────────────────────────────────────────────────────
class User(db.Model):
    __tablename__ = 'users'

    id            = db.Column(db.Integer, primary_key=True)
    name          = db.Column(db.String(100), nullable=False)
    email         = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role          = db.Column(db.String(20), default='user')   # 'user' | 'admin'
    created_at    = db.Column(db.DateTime, default=utcnow)

    predictions   = db.relationship('Prediction', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id':         self.id,
            'name':       self.name,
            'email':      self.email,
            'role':       self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


# ─── Symptom ──────────────────────────────────────────────────────────────────
class Symptom(db.Model):
    __tablename__ = 'symptoms'

    id           = db.Column(db.Integer, primary_key=True)
    symptom_name = db.Column(db.String(100), unique=True, nullable=False)
    description  = db.Column(db.Text, default='')

    def to_dict(self):
        return {
            'id':           self.id,
            'symptom_name': self.symptom_name,
            'description':  self.description,
        }


# ─── Disease ──────────────────────────────────────────────────────────────────
class Disease(db.Model):
    __tablename__ = 'diseases'

    id             = db.Column(db.Integer, primary_key=True)
    disease_name   = db.Column(db.String(150), unique=True, nullable=False)
    description    = db.Column(db.Text, default='')
    precautions    = db.Column(db.Text, default='')   # semicolon-separated list
    severity_level = db.Column(db.String(20), default='LOW')  # LOW/MEDIUM/HIGH/CRITICAL
    emergency      = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id':             self.id,
            'disease_name':   self.disease_name,
            'description':    self.description,
            'precautions':    self.precautions.split(';') if self.precautions else [],
            'severity_level': self.severity_level,
            'emergency':      self.emergency,
        }


# ─── Prediction ───────────────────────────────────────────────────────────────
class Prediction(db.Model):
    __tablename__ = 'predictions'

    id                = db.Column(db.Integer, primary_key=True)
    user_id           = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    selected_symptoms = db.Column(db.Text, nullable=False)    # JSON array string
    predicted_disease = db.Column(db.String(150), nullable=False)
    confidence_score  = db.Column(db.Float, default=0.0)
    all_probabilities = db.Column(db.Text, default='[]')      # JSON string
    created_at        = db.Column(db.DateTime, default=utcnow)

    def to_dict(self):
        import json
        return {
            'id':                self.id,
            'user_id':           self.user_id,
            'selected_symptoms': json.loads(self.selected_symptoms),
            'predicted_disease': self.predicted_disease,
            'confidence_score':  self.confidence_score,
            'all_probabilities': json.loads(self.all_probabilities),
            'created_at':        self.created_at.isoformat() if self.created_at else None,
        }


# ─── Admin Log ────────────────────────────────────────────────────────────────
class AdminLog(db.Model):
    __tablename__ = 'admin_logs'

    id         = db.Column(db.Integer, primary_key=True)
    admin_id   = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    action     = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=utcnow)

    def to_dict(self):
        return {
            'id':         self.id,
            'admin_id':   self.admin_id,
            'action':     self.action,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
