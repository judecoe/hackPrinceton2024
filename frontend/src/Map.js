import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { accessToken } from './env';
import './Map.css';

mapboxgl.accessToken = accessToken;

const Map = () => {
    const mapContainerRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        const fristCoordinates = [-74.655154, 40.346720];

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: fristCoordinates,
            zoom: 15,
        });

        mapRef.current = map;

        const markerElement = document.createElement('img');
        markerElement.src = 'https://www.shutterstock.com/image-vector/coffee-book-logo-design-cup-260nw-1711719175.jpg';
        markerElement.style.width = '40px';
        markerElement.style.height = '40px';
        markerElement.style.borderRadius = '50%';
        markerElement.style.objectFit = 'cover';

        const marker = new mapboxgl.Marker(markerElement)
            .setLngLat(fristCoordinates)
            .addTo(map);
        
        marker.getElement().addEventListener('click', () => {
            setIsSidebarOpen(true);
        });

        return () => map.remove();
    }, []);

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="map-container">
            {}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button onClick={closeSidebar} className="close-button">
                    Close
                </button>
                <h2>Frist Campus Center</h2>
                <p>This is information about Frist Campus Center. You can add additional details here to provide more information to the user.</p>
            </div>

            {}
            <div ref={mapContainerRef} className="map" />
        </div>
    );
};

export default Map;
