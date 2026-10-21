"""
AI Medical Symptom Checker – Flask Application Entry Point
"""

import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)

    # ── Configuration ─────────────────────────────────────────────────────────
    app.config['SECRET_KEY']                  = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['JWT_SECRET_KEY']              = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret')
    app.config['JWT_ACCESS_TOKEN_EXPIRES']    = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 86400))
    app.config['SQLALCHEMY_DATABASE_URI']     = os.getenv('DATABASE_URL', 'sqlite:///medical_checker.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # ── Extensions ────────────────────────────────────────────────────────────
    from models.models import db
    db.init_app(app)

    JWTManager(app)

    CORS(app,
         resources={r"/api/*": {"origins": os.getenv('FRONTEND_URL', 'http://localhost:3000')}},
         supports_credentials=True)

    # ── Blueprints ────────────────────────────────────────────────────────────
    from routes.auth    import auth_bp
    from routes.predict import predict_bp
    from routes.admin   import admin_bp

    app.register_blueprint(auth_bp,    url_prefix='/api')
    app.register_blueprint(predict_bp, url_prefix='/api')
    app.register_blueprint(admin_bp,   url_prefix='/api/admin')

    # ── Health Check ──────────────────────────────────────────────────────────
    @app.route('/api/health')
    def health():
        return jsonify({'status': 'ok', 'message': 'MediCheck API is running'}), 200

    # ── 404 / 500 Handlers ────────────────────────────────────────────────────
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Endpoint not found'}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'error': 'Internal server error'}), 500

    return app


# ── Create tables on first run ────────────────────────────────────────────────
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        from models.models import db
        db.create_all()
        print("✅ Database tables created")
    app.run(debug=True, host='0.0.0.0', port=5000)
