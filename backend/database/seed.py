"""
Database seed script – populates symptoms, diseases, and creates admin account.
Run: python database/seed.py  (from inside backend/)
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import csv
import json
from app import create_app
from models.models import db, User, Symptom, Disease
from werkzeug.security import generate_password_hash

DATASET_DIR = os.path.join(os.path.dirname(__file__), '../../dataset')


def seed():
    app = create_app()
    with app.app_context():
        db.create_all()

        # ── Admin user ────────────────────────────────────────────────────────
        if not User.query.filter_by(email='admin@medichecker.com').first():
            admin = User(
                name='Admin',
                email='admin@medichecker.com',
                password_hash=generate_password_hash('Admin@123'),
                role='admin'
            )
            db.session.add(admin)
            print("✅ Admin user created  (admin@medichecker.com / Admin@123)")

        # ── Demo regular user ─────────────────────────────────────────────────
        if not User.query.filter_by(email='demo@medichecker.com').first():
            demo = User(
                name='Demo User',
                email='demo@medichecker.com',
                password_hash=generate_password_hash('Demo@123'),
                role='user'
            )
            db.session.add(demo)
            print("✅ Demo user created   (demo@medichecker.com / Demo@123)")

        # ── Symptoms from model artefact (most complete source) ───────────────
        symptoms_json = os.path.join(os.path.dirname(__file__), '../ml/symptoms_list.json')
        if os.path.exists(symptoms_json):
            with open(symptoms_json) as f:
                symptom_list = json.load(f)
            added = 0
            for sym in symptom_list:
                display = sym.replace('_', ' ').title()
                if not Symptom.query.filter_by(symptom_name=sym).first():
                    db.session.add(Symptom(symptom_name=sym, description=display))
                    added += 1
            print(f"✅ {added} symptoms seeded")
        else:
            print("⚠️  symptoms_list.json not found – run train_model.py first")

        # ── Diseases from CSV ─────────────────────────────────────────────────
        disease_csv = os.path.join(DATASET_DIR, 'disease_details.csv')
        if os.path.exists(disease_csv):
            added = 0
            with open(disease_csv, newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    name = row['disease_name'].strip()
                    if not Disease.query.filter_by(disease_name=name).first():
                        db.session.add(Disease(
                            disease_name   = name,
                            description    = row.get('description', '').strip(),
                            precautions    = row.get('precautions', '').strip(),
                            severity_level = row.get('severity_level', 'LOW').strip().upper(),
                            emergency      = row.get('emergency', 'false').strip().lower() == 'true',
                        ))
                        added += 1
            print(f"✅ {added} diseases seeded")
        else:
            print("⚠️  disease_details.csv not found")

        db.session.commit()
        print("\n🎉 Database seeding complete!")


if __name__ == '__main__':
    seed()
