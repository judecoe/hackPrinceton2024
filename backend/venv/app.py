from flask import Flask
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load Firebase credentials
cred = credentials.Certificate('path/to/your/firebase-credentials.json')
firebase_admin.initialize_app(cred)

# Register Blueprints
from routes.auth import auth_bp
from routes.buildings import buildings_bp
from routes.study_spots import study_spots_bp
from routes.ratings import ratings_bp
from routes.comments import comments_bp
from routes.images import images_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(buildings_bp, url_prefix='/api/buildings')
app.register_blueprint(study_spots_bp, url_prefix='/api/studyspots')
app.register_blueprint(ratings_bp, url_prefix='/api/ratings')
app.register_blueprint(comments_bp, url_prefix='/api/comments')
app.register_blueprint(images_bp, url_prefix='/api/images')

if __name__ == '__main__':
    app.run(debug=True)
