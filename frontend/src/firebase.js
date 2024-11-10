// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app);

export { db };
