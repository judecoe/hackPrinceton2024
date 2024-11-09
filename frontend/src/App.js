import React, { useRef, useEffect } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic21pdGhidW5rcyIsImEiOiJjbTM5bDZrZG4xN2E5MmlwdGxqbXA2ZXc3In0.Y2O5J7Dl_8ViBPH2BZblNg';

function App() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9', 
      center: [-74.6551, 40.3431], 
      zoom: 14, 
      //test
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