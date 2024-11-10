import React, { useState } from 'react';
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
    const [voted, setVoted] = useState({});
    
    if (!isOpen) return null;

    const handleVote = (index, type) => {
        const currentVote = voted[index];
        if (currentVote === type) {
            setVoted({ ...voted, [index]: null });
            type === 'upvote' ? handleUpvote(index, -1) : handleDownvote(index, -1);
        } else {
            setVoted({ ...voted, [index]: type });
            if (currentVote === 'upvote') {
                handleUpvote(index, -1);
                handleDownvote(index, 1);
            } else if (currentVote === 'downvote') {
                handleDownvote(index, -1);
                handleUpvote(index, 1);
            } else {
                type === 'upvote' ? handleUpvote(index, 1) : handleDownvote(index, 1);
            }
        }
    };

    return (
        <div className="study-info-sidebar">
            <button className="close-button" onClick={onClose}>×</button>
            <h2>{title}</h2>
            <img src={imageUrl} alt={title} className="study-image" />
            <p><span className="tag-label">Rating:</span> <span className="tag-value">{rating}</span></p>
            <p><span className="tag-label">Noise Level:</span> <span className="tag-value">{noiseLevel}</span></p>
            <p><span className="tag-label">Traffic:</span> <span className="tag-value">{traffic}</span></p>
            <p><span className="tag-label">Aesthetic:</span> <span className="tag-value">{aesthetic}</span></p>
            <p><span className="tag-label">Setting:</span> <span className="tag-value">{setting}</span></p>

            <h3>Comments:</h3>
            <div className="comments-section">
                {comments && comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="comment-header">
                                <img
                                    src="https://e7.pngegg.com/pngimages/416/62/png-clipart-anonymous-person-login-google-account-computer-icons-user-activity-miscellaneous-computer-thumbnail.png"
                                    alt="Anonymous Profile"
                                    className="profile-picture"
                                />
                                <span className="username">Anonymous #{index + 1}</span>
                            </div>
                            <p>{comment.text}</p>
                            <div className="vote-buttons">
                                <button
                                    className={`vote-button ${voted[index] === 'upvote' ? 'voted' : ''}`}
                                    onClick={() => handleVote(index, 'upvote')}
                                >
                                    Upvote ({comment.upvotes})
                                </button>
                                <button
                                    className={`vote-button ${voted[index] === 'downvote' ? 'voted' : ''}`}
                                    onClick={() => handleVote(index, 'downvote')}
                                >
                                    Downvote ({comment.downvotes})
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to add one!</p>
                )}
            </div>
        </div>
    );
};

export default StudyInfo;
