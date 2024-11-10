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
        coordinates: [-74.65457315343737, 40.34646598179039],
        title: "Benches Outside Frist",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Princeton_Frist_Campus_Center_back.jpg",
        rating: "6.7/10",
        noiseLevel: "Somewhat quiet",
        traffic: "Average",
        aesthetic: "Nature",
        setting: "Outdoor",
        comments: [
            { text: "Nice place, but it can get chilly.", upvotes: 3, downvotes: 0 },
            { text: "Great spot for people-watching.", upvotes: 7, downvotes: 2 },
            { text: "Ideal for quiet studying.", upvotes: 12, downvotes: 1 },
            { text: "Could use more natural light.", upvotes: 5, downvotes: 3 }
        ]
    },
    {
        coordinates: [-74.65741249376822, 40.34957357856974],
        title: "Firestone Library",
        imageUrl: "./images/Firestone Library.jpeg",
        rating: "8.3/10",
        noiseLevel: "Moderate",
        traffic: "Somewhat busy",
        aesthetic: "Traditional",
        setting: "Indoor",
        comments: [
            { text: "Ideal for quiet studying.", upvotes: 12, downvotes: 1 },
            { text: "Could use more natural light.", upvotes: 5, downvotes: 3 }
        ]
    },
    {
        coordinates: [-74.65372722414959, 40.35003201846974],
        title: "Princeton University Press Courtyard",
        imageUrl: "./images/Princeton University Press.jpeg",
        rating: "6.8/10",
        noiseLevel: "Quiet",
        traffic: "Low-Key",
        aesthetic: "Nature",
        setting: "Outdoor",
        comments: [
            { text: "Nice place to read a book.", upvotes: 8, downvotes: 1 },
            { text: "Watch out for squirrels!", upvotes: 3, downvotes: 0 }
        ]
    },
    {
        coordinates: [-74.6561289153119, 40.349764179655125],
        title: "Langfeld Lounge",
        imageUrl: "./images/Langfeld Lounge.jpeg",
        rating: "9.3/10",
        noiseLevel: "Silent",
        traffic: "Empty",
        aesthetic: "Traditional",
        setting: "Indoor",
        comments: [
            { text: "Very peaceful, love studying here.", upvotes: 10, downvotes: 0 },
            { text: "A bit isolated, but that's a plus for me.", upvotes: 4, downvotes: 1 }
        ]
    },
    {
        coordinates: [-74.65631336087017, 40.34968115910778],
        title: "Green Hall Lounge",
        imageUrl: "./images/Green Hall.jpeg",
        rating: "7.0/10",
        noiseLevel: "Quiet",
        traffic: "Low-Key",
        aesthetic: "Peaceful",
        setting: "Indoor",
        comments: [
            { text: "Cozy and quiet, great for group projects.", upvotes: 6, downvotes: 0 },
            { text: "Can get a bit warm inside.", upvotes: 2, downvotes: 2 }
        ]
    },
    {
        coordinates: [-74.65632659866701, 40.34792680768454],
        title: "School of Architecture Courtyard",
        imageUrl: "./images/School of Architecture.jpeg",
        rating: "6.4/10",
        noiseLevel: "Quiet",
        traffic: "Empty",
        aesthetic: "Peaceful",
        setting: "Outdoor",
        comments: [
            { text: "Love the architecture around here.", upvotes: 9, downvotes: 1 },
            { text: "It’s peaceful, but benches are uncomfortable.", upvotes: 4, downvotes: 3 }
        ]
    },
    {
        coordinates: [-74.65277329169322, 40.35040282826641],  
        title: "Break Out Room Basement",
        imageUrl: "./images/Break out room basement.JPG",
        rating: "8.8/10",
        noiseLevel: "Moderate",
        traffic: "Moderate",
        aesthetic: "Ergonomic",
        setting: "Indoor",
        comments: [
            { text: "Comfortable seating, good for group study.", upvotes: 8, downvotes: 0 },
            { text: "Sometimes hard to find a free spot.", upvotes: 3, downvotes: 1 }
        ]
    },
    {
        coordinates: [-74.65214933032735, 40.35001448551751], 
        title: "Computer Science Building Entrance",
        imageUrl: "./images/Computer Science Building Entrance.JPG",
        rating: "4.2/10",
        noiseLevel: "Moderate",
        traffic: "Busy",
        aesthetic: "Chill",
        setting: "Indoor",
        comments: [
            { text: "Not really a study spot, more for passing through.", upvotes: 2, downvotes: 6 },
            { text: "Great if you just need to quickly check something.", upvotes: 3, downvotes: 2 }
        ]
    },
    {
        coordinates: [-74.65231823566275, 40.350102917342966],  
        title: "Computer Science Second Floor Terrace",
        imageUrl: "./images/IMG_0869.JPG",
        rating: "6.0/10",
        noiseLevel: "Moderate",
        traffic: "Average",
        aesthetic: "Casual",
        setting: "Outdoor",
        comments: [
            { text: "Good view and fresh air.", upvotes: 5, downvotes: 1 },
            { text: "Could use some shade on sunny days.", upvotes: 4, downvotes: 3 }
        ]
    },
    {
        coordinates: [-74.65212410947404, 40.350074258019845], 
        title: "Hacker Study Room",
        imageUrl: "./images/IMG_0870.JPG",
        rating: "7.2/10",
        noiseLevel: "Moderate",
        traffic: "Busy",
        aesthetic: "Traditional",
        setting: "Indoor",
        comments: [
            { text: "Great space for focused work.", upvotes: 7, downvotes: 2 },
            { text: "Can get crowded during exams.", upvotes: 4, downvotes: 0 }
        ]
    },
    {
        coordinates: [-74.65225318814403, 40.35005799191212],
        title: "Room 301",
        imageUrl: "./images/Room 301.JPG",
        rating: "6.5/10",
        noiseLevel: "Quiet",
        traffic: "Low",
        aesthetic: "Academic",
        setting: "Indoor",
        comments: [
            { text: "Good place for quiet, individual work.", upvotes: 6, downvotes: 0 },
            { text: "Feels a bit cramped.", upvotes: 3, downvotes: 2 }
        ]
    },
    {
        coordinates: [-74.6521983043001, 40.350030107146885],
        title: "Room 302",
        imageUrl: "./images/Room 302.JPG",
        rating: "7.0/10",
        noiseLevel: "Quiet",
        traffic: "Low",
        aesthetic: "Academic",
        setting: "Indoor",
        comments: [
            { text: "Spacious and quiet, love it here.", upvotes: 9, downvotes: 1 },
            { text: "Sometimes feels a bit too quiet.", upvotes: 2, downvotes: 3 }
        ]
    },
    {
        coordinates: [-74.65792101719518, 40.34756204307376],
        title: "McCormick Hall Patio",
        imageUrl: "https://paw.princeton.edu/sites/default/files/styles/news_article_desktop/public/images/content/OTC-PUAMweb.jpg?itok=up70BJCA",
        rating: "5.4/10",
        noiseLevel: "Moderate",
        traffic: "High",
        aesthetic: "Modern",
        setting: "Outdoor",
        comments: [
            { text: "Nice spot but very crowded.", upvotes: 3, downvotes: 5 },
            { text: "Great view of campus though!", upvotes: 6, downvotes: 2 }
        ]
    },
    {
        coordinates: [-74.66016706095756, 40.34754354083629],
        title: "Witherspoon Hall Patio",
        imageUrl: "./images/Witherspoon Hall Outside.jpeg",
        rating: "5.7/10",
        noiseLevel: "Moderate",
        traffic: "High",
        aesthetic: "Traditional",
        setting: "Outdoor",
        comments: [
            { text: "Nice outdoor seating area.", upvotes: 7, downvotes: 1 },
            { text: "Busy during peak hours.", upvotes: 5, downvotes: 3 }
        ]
    },
    {
        coordinates: [-74.66022139790303, 40.34749177595373],
        title: "Witherspoon Study Room",
        imageUrl: "./images/Witherspoon Hall.jpeg",
        rating: "7.7/10",
        noiseLevel: "Low",
        traffic: "Moderate",
        aesthetic: "Traditional",
        setting: "Indoor",
        comments: [
            { text: "Perfect for focused studying, good atmosphere.", upvotes: 10, downvotes: 0 },
            { text: "Can be a bit too quiet for some people.", upvotes: 4, downvotes: 2 }
        ]
    }

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

    const handleUpvote = (commentIndex) => {
        if (!selectedMarker) return;
        const updatedComments = selectedMarker.comments.map((comment, index) =>
            index === commentIndex ? { ...comment, upvotes: comment.upvotes + 1 } : comment
        );
        setSelectedMarker({ ...selectedMarker, comments: updatedComments });
    };

    const handleDownvote = (commentIndex) => {
        if (!selectedMarker) return;
        const updatedComments = selectedMarker.comments.map((comment, index) =>
            index === commentIndex ? { ...comment, downvotes: comment.downvotes + 1 } : comment
        );
        setSelectedMarker({ ...selectedMarker, comments: updatedComments });
    };

    const addComment = (text) => {
        if (!selectedMarker) return;
        const newComment = { text, upvotes: 0, downvotes: 0 };
        const updatedComments = [...selectedMarker.comments, newComment];
        setSelectedMarker({ ...selectedMarker, comments: updatedComments });
    };


    return (
        <div className="map-container">
            {}
            {!isSidebarOpen && (
                <div className="search-bar">
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
            )}
            
            <div className="logo-top-right">
                <img src="https://i.ibb.co/qDSKykT/logocollegesurfing.png" alt="CollegeSurfing Logo" />
            </div>
            
            <div className="banner-overlay">Welcome to CollegeSurfing</div>
            
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
                    comments={selectedMarker.comments} 
                    handleUpvote={handleUpvote} 
                    handleDownvote={handleDownvote} 
                    addComment={addComment}
                />
            )}
            
            <ZoomAndDirection map={mapRef.current} />
            <div ref={mapContainerRef} className="map" />
        </div>
    );
};

export default Map;