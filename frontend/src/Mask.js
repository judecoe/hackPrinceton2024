import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { accessToken } from './env';
import './Map.css';

mapboxgl.accessToken = accessToken;

const Map = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const princetonCampusCoordinates = [
        [-74.661, 40.349],
        [-74.652, 40.349],
        [-74.652, 40.342],
        [-74.661, 40.342],
        [-74.661, 40.349]
    ];

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.655154, 40.346720],
            zoom: 15,
        });

        mapRef.current = map;

        map.on('load', () => {
            // Add a layer for masking non-campus areas
            map.addLayer({
                id: 'grey-outside-campus',
                type: 'fill',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [
                                // Outer bounds (covering the entire map)
                                [
                                    [-75, 41],
                                    [-75, 39],
                                    [-73, 39],
                                    [-73, 41],
                                    [-75, 41]
                                ],
                                // Princeton campus boundary as a hole
                                princetonCampusCoordinates
                            ]
                        }
                    }
                },
                paint: {
                    'fill-color': 'rgba(128, 128, 128, 0.5)', // Grey with 50% opacity
                    'fill-opacity': 0.5
                }
            });
        });

        return () => map.remove();
    }, []);

    return (
        <div className="map-container">
            {/* Map Container */}
            <div ref={mapContainerRef} className="map" />
        </div>
    );
};

export default Map;
