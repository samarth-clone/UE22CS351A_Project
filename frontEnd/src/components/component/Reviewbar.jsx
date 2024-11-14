import React, { useState } from 'react';
import '../styles/ReviewBar.css';

const ReviewBar = ({productId, productName}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const getCustomerIDByEmail = async (email) => {
        const response = await fetch(`http://localhost:8080/customers/${email}`);
        const data = await response.json();
        return data.customer_id;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = window.location.href;
        const emailMatch = url.match(/\/([^/]+)\/product\//);
        if (!emailMatch) {
            alert("Could not extract email from URL");
            return;
        }

        if (rating === 0) {
            alert("Please provide a rating before submitting.");
            return;
        }
        if (comment.trim() === '') {
            alert("Please write a comment before submitting.");
            return;
        }


        const email = emailMatch[1];
        console.log("email", email);
        const customerID = await getCustomerIDByEmail(email);

        const review = {
            rating,
            comment,
            customer_id: customerID,
            ordered_product_id: productId, // Replace with actual product ID if needed
            product_name: productName, // Replace with actual product name if needed
        };
        console.log(review)

        await fetch(`http://localhost:8080/products/setReview/${review.ordered_product_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
        });

        setComment('');
        setRating(0);
    };

    return (
        <div className="review-bar">
            <h3>Write a Review</h3>
            <div className="review-rating">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`star ${index < rating ? 'filled' : ''}`}
                        onClick={() => setRating(index + 1)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                className='review-bar-comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
            ></textarea>
            <button onClick={handleSubmit}>Submit Review</button>
        </div>
    );
};

export default ReviewBar;
