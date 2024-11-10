from flask import Blueprint, jsonify

buildings_bp = Blueprint('buildings_bp', __name__)

@buildings_bp.route('/api/buildings', methods=['GET'])
def get_buildings():
    return jsonify({"message": "Buildings data here"})
