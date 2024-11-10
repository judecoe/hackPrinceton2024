import React from 'react';
import Map from './Map';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { db } from './firebase';

const firebaseConfig = {   // lowercase 'f'
  apiKey: "AIzaSyDjs_g9yeydqqWLjdfrecTMpoPEKJRTTvo",
  authDomain: "college-surfing.firebaseapp.com",
  projectId: "college-surfing",
  storageBucket: "college-surfing.firebasestorage.app",
  messagingSenderId: "486454469198",
  appId: "1:486454469198:web:c05f409c0f0e349415d91f",
  measurementId: "G-ZFWRK1JRS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  // lowercase 'f'
const db = getFirestore(app);

export { db };

const App = () => {
    return (
        <div className="App">
            <Map />
        </div>
    );
};

export default App;
