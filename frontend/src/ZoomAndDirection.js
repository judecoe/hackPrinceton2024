// ZoomAndDirection.js
import React, { useEffect } from 'react';
import './ZoomAndDirection.css';

const ZoomAndDirection = ({ map }) => {
    useEffect(() => {
        console.log("Map instance in ZoomAndDirection:", map); // Debugging line to confirm map instance
    }, [map]);

    const handleZoomIn = () => {
        if (map) {
            map.flyTo({ zoom: map.getZoom() + 1 });
        } else {
            console.error("Map instance not available for zooming in.");
        }
    };

    const handleZoomOut = () => {
        if (map) {
            map.flyTo({ zoom: map.getZoom() - 1 });
        } else {
            console.error("Map instance not available for zooming out.");
        }
    };

    return (
        <div className="zoom-controls">
            <button onClick={handleZoomIn} className="zoom-button">+</button>
            <button onClick={handleZoomOut} className="zoom-button">−</button>
        </div>
    );
};

export default ZoomAndDirection;
