import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviwCard';
import '../styles/ReviewList.css';

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/products/getReview/${productId}`,{
            method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
        })
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error("Error fetching reviews:", error));
    }, [productId]);
    return (
        <div className="review-list">
            {reviews.map(review => (
                <ReviewCard key={review.ReviewID} review={review} />
            ))}
        </div>
    );
};

export default ReviewList;
