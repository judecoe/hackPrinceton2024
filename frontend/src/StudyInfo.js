import React from 'react';
import './StudyInfo.css';

const StudyInfo = ({ 
    isOpen, 
    onClose, 
    title, 
    imageUrl, 
    rating, 
    noiseLevel, 
    traffic, 
    aesthetic, 
    setting, 
    comments, 
    handleUpvote, 
    handleDownvote 
}) => {
    if (!isOpen) return null;

    return (
        <div className="study-info-sidebar">
            <button className="close-button" onClick={onClose}>Close</button>
            <h2>{title}</h2>
            <img src={imageUrl} alt={title} className="study-image" />
            <p><strong>Rating:</strong> {rating}</p>
            <p><strong>Noise Level:</strong> {noiseLevel}</p>
            <p><strong>Traffic:</strong> {traffic}</p>
            <p><strong>Aesthetic:</strong> {aesthetic}</p>
            <p><strong>Setting:</strong> {setting}</p>

            <h3>Comments:</h3>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>{comment.text}</p>
                        <div className="vote-buttons">
                            <button onClick={() => handleUpvote(index)}>Upvote ({comment.upvotes})</button>
                            <button onClick={() => handleDownvote(index)}>Downvote ({comment.downvotes})</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No comments yet. Be the first to add one!</p>
            )}
        </div>
    );
};

export default StudyInfo;
