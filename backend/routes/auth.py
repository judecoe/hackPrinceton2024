# backend/routes/auth.py
from flask import Blueprint, request, jsonify
from firebase_admin import auth as firebase_auth, firestore, _auth_utils
from models import db  # Firestore client initialized in models

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    token = data.get('token')

    if not token:
        return jsonify({'error': 'Token is missing'}), 400

    try:
        # Verify Firebase ID token
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token['uid']
        email = decoded_token.get('email')

        # Check if the email is valid and ends with '.edu'
        if email is None or not email.endswith('.edu'):
            return jsonify({'error': 'Email must be a .edu domain'}), 400

        # Reference to Firestore user document
        user_ref = db.collection('users').document(uid)
        user = user_ref.get()

        # Store user in Firestore if they don’t already exist
        if not user.exists:
            user_ref.set({
                'email': email,
                'created_at': firestore.SERVER_TIMESTAMP
            })

        return jsonify({'uid': uid}), 200

    except _auth_utils.InvalidIdTokenError as e:
        # Handle invalid token specifically
        return jsonify({'error': 'Invalid ID token'}), 401
    except Exception as e:
        # Handle any other exceptions
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500
