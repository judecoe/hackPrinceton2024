import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { accessToken } from './env';
import StudyInfo from './StudyInfo';
import ZoomAndDirection from './ZoomAndDirection';
import './Map.css';

mapboxgl.accessToken = accessToken;

const markerData = [
    {
        id: 1,
        coordinates: [-74.655154, 40.346720],
        title: "Benches Outside Frist",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Princeton_Frist_Campus_Center_back.jpg",
        rating: "6.9/10",
        noiseLevel: "Somewhat quiet",
        traffic: "Average",
        aesthetic: "Nature",
        setting: "Outdoor"
    },
    {
        id: 2,
        coordinates: [-74.65741249376822, 40.34957357856974],
        title: "Firestone Library",
        imageUrl: "https://example.com/another-image.jpg",
        rating: "8.9/10",
        noiseLevel: "Quiet",
        traffic: "Somewhat busy",
        aesthetic: "Traditional",
        setting: "Indoor"
    },
    {
        id: 3,
        coordinates: [-74.65372722414959, 40.35003201846974],
        title: "Princeton University Press Courtyard",
        imageUrl: "./images/Princeton University Press.jpeg",
        rating: "6.8/10",
        noiseLevel: "Quiet",
        traffic: "Low-Key",
        aesthetic: "Nature",
        setting: "Outdoor"
    },
    {
        id: 4,
        coordinates: [-74.6549095221592, 40.3505011475726],
        title: "Lewis Center for the Arts Courtyard",
        imageUrl: "",
        rating: "6.3/10",
        noiseLevel: "Quiet",
        traffic: "Low-Key",
        aesthetic: "Nature",
        setting: "Outdoor"
    },
    {
        id: 5,
        coordinates: [-74.65607099034348, 40.349751868901336],
        title: "Green Hall Sanctuary",
        imageUrl: "",
        rating: "7.0/10",
        noiseLevel: "Quiet",
        traffic: "Empty",
        aesthetic: "Nature",
        setting: "Outdoor"
    },
];

const Map = () => {
    const mapContainerRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.655, 40.345],
            zoom: 15,
        });

        map.setMinZoom(13); 
        map.setMaxZoom(19); 

        mapRef.current = map;

        markerData.forEach(marker => {
            const markerElement = document.createElement('img');
            markerElement.src = marker.imageUrl;
            markerElement.style.width = '40px';
            markerElement.style.height = '40px';
            markerElement.style.borderRadius = '50%';
            markerElement.style.objectFit = 'cover';

            new mapboxgl.Marker(markerElement)
                .setLngLat(marker.coordinates)
                .addTo(map);

            markerElement.addEventListener('click', () => {
                setSelectedMarker(marker);
                setIsSidebarOpen(true);

                map.flyTo({
                    center: marker.coordinates,
                    zoom: 18,
                    speed: 1.5,
                    curve: 1,
                });
            });
        });

        return () => map.remove();
    }, []);

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setSelectedMarker(null);
    };

    return (
        <div className="map-container">
            {selectedMarker && (
                <StudyInfo
                    isOpen={isSidebarOpen}
                    onClose={closeSidebar}
                    title={selectedMarker.title}
                    imageUrl={selectedMarker.imageUrl}
                    rating={selectedMarker.rating}
                    noiseLevel={selectedMarker.noiseLevel}
                    traffic={selectedMarker.traffic}
                    aesthetic={selectedMarker.aesthetic}
                    setting={selectedMarker.setting}
                />
            )}
            <ZoomAndDirection map={mapRef.current} /> {/* Add Zoom Controls */}
            <div ref={mapContainerRef} className="map" />
        </div>
    );
};

export default Map;
