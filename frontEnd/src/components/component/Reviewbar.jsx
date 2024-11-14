import React, { useState } from 'react';
import '../styles/ReviewBar.css'; // Include your CSS for styling

const ReviewBar = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (rating === 0 || comment.trim() === '') {
            alert('Please provide both a rating and a comment.');
            return;
        }
        const review = {
            rating,
            comment,
            customer_name: 'Anonymous', // Modify as necessary
            product_Name: 'Sample Product', // Modify as necessary
        };
        onSubmit(review);
        setComment('');
        setRating(0);
    };

    return (
        <div className="review-bar">
            <h3>Write a Review</h3>
            <div className="review-rating">
                {/* Display rating stars */}
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`star ${index < rating ? 'filled' : ''}`}
                        onClick={() => handleRatingChange(index + 1)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                className="review-comment"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write your review here..."
            ></textarea>
            <button className="submit-btn" onClick={handleSubmit}>
                Submit Review
            </button>
        </div>
    );
};

export default ReviewBar;
