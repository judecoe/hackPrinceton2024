from flask import Blueprint, request, jsonify
from models import db
from utils import firebase_required

study_spots_bp = Blueprint('study_spots', __name__)

@study_spots_bp.route('/', methods=['GET'])
def get_study_spots():
    spots = db.collection('study_spots').stream()
    spots_list = []
    for spot in spots:
        spot_data = spot.to_dict()
        spot_data['id'] = spot.id
        spots_list.append(spot_data)
    return jsonify(spots_list), 200

@study_spots_bp.route('/', methods=['POST'])
@firebase_required
def add_study_spot():
    data = request.get_json()
    required_fields = ['name', 'description', 'latitude', 'longitude' , 'rating']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    new_spot = {
        'name': data['name'],
        'description': data['description'],
        'latitude': data['latitude'],
        'longitude': data['longitude'],
        'rating' : data['rating'],
        'created_by': request.uid,
    }
    spot_ref = db.collection('study_spots').document()
    spot_ref.set(new_spot)
    return jsonify({'id': spot_ref.id}), 201
