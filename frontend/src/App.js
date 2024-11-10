import React, { useRef, useEffect } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {accessToken} from './env';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

mapboxgl.accessToken = accessToken;

function App() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-74.6551, 40.3431],
      zoom: 14,
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default App;