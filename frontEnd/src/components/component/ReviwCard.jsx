import React from 'react';
import '../styles/ReviwCard.css'; // Include this CSS file for styling if needed

const ReviewCard = ({ review }) => {
    console.log(review);
    
    
    // Ensure the data is accessible based on the struct
    return (
        <div className="review-card">
            <h3 className="review-customer">{review.customer_name}</h3>  {/* Changed to match the JSON field */}
            <div className="review-rating">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            </div>
            <p className="review-comment">{review.comment}</p>
            <span className="review-product">Product: {review.product_Name}</span>  {/* Changed to match the JSON field */}
        </div>
    );
};

export default ReviewCard;
