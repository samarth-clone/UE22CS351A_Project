import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookCard.css';

const BookCard = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/products/${id}`, {
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error("Error fetching product data:", error);
        setError("Failed to load product information");
      });

    fetch(`http://localhost:8080/products/getReview/${id}`, {
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return response.json();
      })
      .then(reviews => {
        if (reviews === null) {
          setAverageRating("No reviews yet");
          return;
        }
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const avgRating = totalRating / reviews.length;
          setAverageRating(avgRating.toFixed(1));
        } else {
          setAverageRating("No reviews yet");
        }
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews");
      });
  }, [id]);

  const handleBuyNow = (event) => {
    event.stopPropagation(); // Prevent click from propagating to the card
    navigate("/checkout");
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="loading-message">Loading...</div>;

  return (
    <div 
      className="book-card" 
      onClick={() => navigate(`/product/${id}`)} 
      style={{ cursor: 'pointer' }}
    >
      {/* Add the generic image at the top */}
      <img 
        src="https://static.vecteezy.com/system/resources/previews/006/298/276/non_2x/gear-smart-eps-icon-digital-tech-business-logo-free-vector.jpg" 
        alt="Product"
        className="product-image"
      />
      <div className="card-header">
        <h3>{product.product_name}</h3>
      </div>
      <div className="card-body">
        <p className="description">{product.description}</p>
        <p className="price">${product.price}</p>
        <p className="rating">Average Rating: {averageRating || "Loading..."}</p>
      </div>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default BookCard;
