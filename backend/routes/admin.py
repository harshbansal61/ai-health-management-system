"""
Admin routes – manage users, symptoms, diseases, view all predictions
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import db, User, Symptom, Disease, Prediction, AdminLog
from functools import wraps

admin_bp = Blueprint('admin', __name__)


# ─── Admin Guard ──────────────────────────────────────────────────────────────
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = int(get_jwt_identity())
        user    = User.query.get(user_id)
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return fn(*args, **kwargs)
    return wrapper


def log_action(admin_id, action):
    entry = AdminLog(admin_id=admin_id, action=action)
    db.session.add(entry)


# ─── Dashboard Stats ──────────────────────────────────────────────────────────
@admin_bp.route('/stats', methods=['GET'])
@admin_required
def stats():
    return jsonify({
        'total_users':       User.query.filter_by(role='user').count(),
        'total_predictions': Prediction.query.count(),
        'total_symptoms':    Symptom.query.count(),
        'total_diseases':    Disease.query.count(),
    }), 200


# ─── Users ────────────────────────────────────────────────────────────────────
@admin_bp.route('/users', methods=['GET'])
@admin_required
def list_users():
    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify([u.to_dict() for u in users]), 200


@admin_bp.route('/users/<int:uid>', methods=['DELETE'])
@admin_required
def delete_user(uid):
    admin_id = int(get_jwt_identity())
    user = User.query.get_or_404(uid)
    if user.role == 'admin':
        return jsonify({'error': 'Cannot delete admin users'}), 400
    db.session.delete(user)
    log_action(admin_id, f'Deleted user {uid} ({user.email})')
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200


# ─── Predictions (all) ────────────────────────────────────────────────────────
@admin_bp.route('/predictions', methods=['GET'])
@admin_required
def all_predictions():
    preds = Prediction.query.order_by(Prediction.created_at.desc()).limit(200).all()
    results = []
    for p in preds:
        d = p.to_dict()
        user = User.query.get(p.user_id)
        d['user_name']  = user.name  if user else 'Deleted'
        d['user_email'] = user.email if user else ''
        results.append(d)
    return jsonify(results), 200


# ─── Symptoms CRUD ────────────────────────────────────────────────────────────
@admin_bp.route('/symptoms', methods=['GET'])
@admin_required
def list_symptoms():
    syms = Symptom.query.order_by(Symptom.symptom_name).all()
    return jsonify([s.to_dict() for s in syms]), 200


@admin_bp.route('/symptoms', methods=['POST'])
@admin_required
def add_symptom():
    admin_id = int(get_jwt_identity())
    data = request.get_json()
    name = data.get('symptom_name', '').strip()
    if not name:
        return jsonify({'error': 'symptom_name is required'}), 400
    if Symptom.query.filter_by(symptom_name=name).first():
        return jsonify({'error': 'Symptom already exists'}), 409
    sym = Symptom(symptom_name=name, description=data.get('description', ''))
    db.session.add(sym)
    log_action(admin_id, f'Added symptom: {name}')
    db.session.commit()
    return jsonify(sym.to_dict()), 201


@admin_bp.route('/symptoms/<int:sid>', methods=['PUT'])
@admin_required
def update_symptom(sid):
    admin_id = int(get_jwt_identity())
    sym = Symptom.query.get_or_404(sid)
    data = request.get_json()
    if data.get('symptom_name'):
        sym.symptom_name = data['symptom_name'].strip()
    if data.get('description') is not None:
        sym.description = data['description']
    log_action(admin_id, f'Updated symptom {sid}')
    db.session.commit()
    return jsonify(sym.to_dict()), 200


@admin_bp.route('/symptoms/<int:sid>', methods=['DELETE'])
@admin_required
def delete_symptom(sid):
    admin_id = int(get_jwt_identity())
    sym = Symptom.query.get_or_404(sid)
    db.session.delete(sym)
    log_action(admin_id, f'Deleted symptom {sid} ({sym.symptom_name})')
    db.session.commit()
    return jsonify({'message': 'Symptom deleted'}), 200


# ─── Diseases CRUD ────────────────────────────────────────────────────────────
@admin_bp.route('/diseases', methods=['GET'])
@admin_required
def list_diseases():
    diseases = Disease.query.order_by(Disease.disease_name).all()
    return jsonify([d.to_dict() for d in diseases]), 200


@admin_bp.route('/diseases', methods=['POST'])
@admin_required
def add_disease():
    admin_id = int(get_jwt_identity())
    data = request.get_json()
    name = data.get('disease_name', '').strip()
    if not name:
        return jsonify({'error': 'disease_name is required'}), 400
    if Disease.query.filter_by(disease_name=name).first():
        return jsonify({'error': 'Disease already exists'}), 409
    prec = data.get('precautions', '')
    if isinstance(prec, list):
        prec = ';'.join(prec)
    d = Disease(
        disease_name   = name,
        description    = data.get('description', ''),
        precautions    = prec,
        severity_level = data.get('severity_level', 'LOW').upper(),
        emergency      = bool(data.get('emergency', False)),
    )
    db.session.add(d)
    log_action(admin_id, f'Added disease: {name}')
    db.session.commit()
    return jsonify(d.to_dict()), 201


@admin_bp.route('/diseases/<int:did>', methods=['PUT'])
@admin_required
def update_disease(did):
    admin_id = int(get_jwt_identity())
    d = Disease.query.get_or_404(did)
    data = request.get_json()
    if data.get('disease_name'):
        d.disease_name = data['disease_name'].strip()
    if data.get('description') is not None:
        d.description = data['description']
    if data.get('precautions') is not None:
        prec = data['precautions']
        d.precautions = ';'.join(prec) if isinstance(prec, list) else prec
    if data.get('severity_level'):
        d.severity_level = data['severity_level'].upper()
    if data.get('emergency') is not None:
        d.emergency = bool(data['emergency'])
    log_action(admin_id, f'Updated disease {did}')
    db.session.commit()
    return jsonify(d.to_dict()), 200


@admin_bp.route('/diseases/<int:did>', methods=['DELETE'])
@admin_required
def delete_disease(did):
    admin_id = int(get_jwt_identity())
    d = Disease.query.get_or_404(did)
    db.session.delete(d)
    log_action(admin_id, f'Deleted disease {did} ({d.disease_name})')
    db.session.commit()
    return jsonify({'message': 'Disease deleted'}), 200


# ─── Admin Logs ───────────────────────────────────────────────────────────────
@admin_bp.route('/logs', methods=['GET'])
@admin_required
def admin_logs():
    logs = AdminLog.query.order_by(AdminLog.created_at.desc()).limit(100).all()
    return jsonify([l.to_dict() for l in logs]), 200
