from flask import Blueprint, request, jsonify
from firebase_admin import storage, firestore
from models import db  # Import the Firestore client from models.py
from utils import firebase_required  # Import the authentication decorator

images_bp = Blueprint('images', __name__)

@images_bp.route('/<study_spot_id>', methods=['POST'])
@firebase_required  # Ensure that only authenticated users can upload images
def upload_image(study_spot_id):
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        bucket = storage.bucket()
        blob = bucket.blob(f'study_spot_images/{study_spot_id}/{file.filename}')
        blob.upload_from_file(file)
        blob.make_public()
        image_url = blob.public_url

        # Store image_url in Firestore under the study spot
        db.collection('study_spots').document(study_spot_id).update({
            'images': firestore.ArrayUnion([image_url])
        })

        return jsonify({'image_url': image_url}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
