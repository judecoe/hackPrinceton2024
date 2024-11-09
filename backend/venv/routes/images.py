from flask import Blueprint, request, jsonify
from firebase_admin import storage

images_bp = Blueprint('images', __name__)

@images_bp.route('/<study_spot_id>', methods=['POST'])
def upload_image(study_spot_id):
    file = request.files['image']
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
