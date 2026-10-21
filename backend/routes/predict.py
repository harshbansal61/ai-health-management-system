"""
Prediction routes – symptom list, disease predict, history, report
"""

import json
from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import db, User, Symptom, Disease, Prediction
from ml.predictor import predict, get_all_symptoms
from utils.report_generator import generate_pdf_report
import io

predict_bp = Blueprint('predict', __name__)


# ─── All Symptoms ─────────────────────────────────────────────────────────────
@predict_bp.route('/symptoms', methods=['GET'])
def list_symptoms():
    symptoms = Symptom.query.order_by(Symptom.symptom_name).all()
    return jsonify([s.to_dict() for s in symptoms]), 200


# ─── All Diseases ─────────────────────────────────────────────────────────────
@predict_bp.route('/diseases', methods=['GET'])
def list_diseases():
    diseases = Disease.query.order_by(Disease.disease_name).all()
    return jsonify([d.to_dict() for d in diseases]), 200


# ─── Single Disease ───────────────────────────────────────────────────────────
@predict_bp.route('/diseases/<int:disease_id>', methods=['GET'])
def get_disease(disease_id):
    d = Disease.query.get_or_404(disease_id)
    return jsonify(d.to_dict()), 200


# ─── Predict ──────────────────────────────────────────────────────────────────
@predict_bp.route('/predict', methods=['POST'])
@jwt_required()
def make_prediction():
    user_id = int(get_jwt_identity())
    data    = request.get_json()
    symptoms_input = data.get('symptoms', [])

    if not symptoms_input or len(symptoms_input) < 1:
        return jsonify({'error': 'Please select at least one symptom'}), 400

    # ML prediction
    result = predict(symptoms_input)

    # Fetch disease details from DB
    disease_row = Disease.query.filter_by(
        disease_name=result['disease']
    ).first()

    # Save prediction to DB
    pred = Prediction(
        user_id           = user_id,
        selected_symptoms = json.dumps(symptoms_input),
        predicted_disease = result['disease'],
        confidence_score  = result['confidence'],
        all_probabilities = json.dumps(result['all_probabilities']),
    )
    db.session.add(pred)
    db.session.commit()

    response = {
        'prediction_id':    pred.id,
        'disease':          result['disease'],
        'confidence':       result['confidence'],
        'all_probabilities': result['all_probabilities'],
        'selected_symptoms': symptoms_input,
        'created_at':       pred.created_at.isoformat(),
    }
    if disease_row:
        response.update({
            'description':    disease_row.description,
            'precautions':    disease_row.precautions.split(';') if disease_row.precautions else [],
            'severity_level': disease_row.severity_level,
            'emergency':      disease_row.emergency,
        })
    else:
        response.update({
            'description':    '',
            'precautions':    [],
            'severity_level': 'UNKNOWN',
            'emergency':      False,
        })

    return jsonify(response), 200


# ─── Prediction History ───────────────────────────────────────────────────────
@predict_bp.route('/history', methods=['GET'])
@jwt_required()
def history():
    user_id = int(get_jwt_identity())
    preds   = Prediction.query.filter_by(user_id=user_id)\
                              .order_by(Prediction.created_at.desc())\
                              .all()
    return jsonify([p.to_dict() for p in preds]), 200


# ─── Download Report ──────────────────────────────────────────────────────────
@predict_bp.route('/report/<int:prediction_id>', methods=['GET'])
@jwt_required()
def download_report(prediction_id):
    user_id = int(get_jwt_identity())
    pred    = Prediction.query.get_or_404(prediction_id)

    if pred.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    user         = User.query.get(user_id)
    disease_row  = Disease.query.filter_by(disease_name=pred.predicted_disease).first()

    pdf_bytes = generate_pdf_report(pred, user, disease_row)
    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f'MediCheck_Report_{pred.id}.pdf'
    )
