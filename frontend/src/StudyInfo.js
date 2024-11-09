import React from 'react';
import './StudyInfo.css';

const StudyInfo = ({
    isOpen,
    onClose,
    title = "Study Spot",
    imageUrl,
    rating = "Not rated",
    noiseLevel = "Unknown",
    busyness = "Unknown",
    aesthetic = "None",
    setting = "Unspecified",
}) => {
    // Define categories as an array of objects for dynamic rendering
    const categories = [
        { label: "⭐ Rating", value: rating, className: "tag-rating" },
        { label: "Aesthetic", value: aesthetic, className: "tag-aesthetic" },
        { label: "Setting", value: setting, className: "tag-setting" },
        { label: "Noise Level", value: noiseLevel, className: "tag-noise" },
        { label: "Busyness", value: busyness, className: "tag-busyness" },
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={onClose} className="close-button">
                &times;
            </button>
            <h2>{title}</h2>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={`${title}`}
                    className="study-spot-image"
                />
            )}
            <div className="tags-container">
                {categories.map((category, index) => (
                    <span key={index} className={`tag ${category.className}`}>
                        {category.label}: {category.value}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default StudyInfo;
