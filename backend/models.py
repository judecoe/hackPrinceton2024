# backend/models.py
import firebase_admin
from firebase_admin import credentials, firestore, auth, storage

# Initialize Firebase app with service account
cred = credentials.Certificate('C:/Users/micha/OneDrive/2 School/firebase_credentials.json')
firebase_admin.initialize_app(cred)

# Initialize Firestore DB
db = firestore.client()  # Ensure this line has no extra text after it
