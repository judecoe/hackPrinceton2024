# backend/utils.py
from functools import wraps
from flask import request, jsonify
from firebase_admin import auth as firebase_auth

def firebase_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                token = auth_header.split(' ').pop()
                decoded_token = firebase_auth.verify_id_token(token)
                request.uid = decoded_token['uid']
            except Exception as e:
                return jsonify({'error': 'Invalid token: ' + str(e)}), 401
        else:
            return jsonify({'error': 'Authorization header missing'}), 401

        return f(*args, **kwargs)
    return decorated_function
