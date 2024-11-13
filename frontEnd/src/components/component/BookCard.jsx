import React, { useEffect, useState } from 'react';

const BookCard = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [error, setError] = useState(null);

  // Fetch product details and reviews
  useEffect(() => {
    // Fetch product details
    fetch(`http://localhost:8080/products/${id}`, {
      headers: {
        'Accept': 'application/json', // Ensure the server knows you expect JSON
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error("Error fetching product data:", error);
        setError("Failed to load product information");
      });

    // Fetch reviews for the product to calculate the average rating
    fetch(`http://localhost:8080/products/getReview/${id}`, {
      headers: {
        'Accept': 'application/json', // Ensure the server knows you expect JSON
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return response.json(); // Parse response as JSON
      })
      .then(reviews => {
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const avgRating = totalRating / reviews.length;
          setAverageRating(avgRating.toFixed(1)); // Set average rating
        } else {
          setAverageRating("No reviews yet");
        }
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews");
      });
  }, [id]);

  // Display loading or error states
  if (error) return <div>{error}</div>; // Show error if present
  if (!product) return <div>Loading...</div>; // Show loading until data is fetched

  return (
    <div className="book-card">
      <h3>{product.ProductName}</h3>
      <p>Description: {product.Description}</p>
      <p>Price: ${product.Price}</p>
      <p>Average Rating: {averageRating || "Loading..."}</p>
    </div>
  );
};

export default BookCard;
