import React, { useRef, useEffect } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {accessToken} from './env';

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