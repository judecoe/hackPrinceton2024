import firebase_admin
from firebase_admin import credentials, firestore, auth

# Initialize the SDK
cred = credentials.Certificate("C:\Users\micha\OneDrive\2 School\firebase_credentials.json")
firebase_admin.initialize_app(cred)

# Test Firebase connection by listing users or adding a document to Firestore
def test_firebase_connection():
    try:
        # Test Firestore
        db = firestore.client()
        doc_ref = db.collection("test").document("testDoc")
        doc_ref.set({"testField": "testValue"})
        print("Firestore test write successful!")

        # Test Authentication by listing users (optional)
        user = auth.get_user_by_email("test@example.com")
        print("Successfully fetched user:", user.uid)

    except Exception as e:
        print("Error testing Firebase connection:", e)

if __name__ == "__main__":
    test_firebase_connection()
