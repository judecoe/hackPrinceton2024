// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import other Firebase services you need (e.g., Auth, Firestore, Storage)

const firebaseConfig = {
  apiKey: "AIzaSyDjs_g9yeydqqWLjdfrecTMpoPEKJRTTvo",
  authDomain: "college-surfing.firebaseapp.com",
  projectId: "college-surfing",
  storageBucket: "college-surfing.firebasestorage.app",
  messagingSenderId: "486454469198",
  appId: "1:486454469198:web:c05f409c0f0e349415d91f",
  measurementId: "G-ZFWRK1JRS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the app instance and any Firebase services you need to use
export { app, analytics };
