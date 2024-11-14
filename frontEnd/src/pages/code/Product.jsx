import React from 'react';
import '../styles/Product.css'; // Import styling for the product page
import { Link } from 'react-router-dom';
import icon from '../../assets/icon.png';
function Product() {
    const product = {
      title: "The Art of Coding",
      description: "A comprehensive guide to mastering coding techniques and practices.",
      price: "$19.99",
      originalPrice: "$29.99",
      image: "https://via.placeholder.com/600x600", // Main product image
      images: [
        "https://via.placeholder.com/600x600", 
        "https://via.placeholder.com/600x600?text=Image+2",
        "https://via.placeholder.com/600x600?text=Image+3"
      ],
      rating: 4.5,
      reviews: 1200,
      details: "This book covers everything you need to know to get started with coding, from algorithms to data structures. Perfect for beginners and experienced coders alike.",
      shipping: "Free shipping on orders over $50",
    };
  
    return (
        <>
        <div className="titleBar">
            <img className='iconImage' src = {icon}></img>
            <h1>Boogs and Pajes</h1>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/signUp" className="signUp">
              Sign-Up
            </Link>
        </div>

      <div className="product_page">
        <div className="product_left">
          <img src={product.image} alt="Product" className="product_image" />
        </div>
  
        <div className="product_right">
          <h1 className="product_title">{product.title}</h1>
  
          <div className="product_rating">
            <span className="product_stars">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="product_reviews">({product.reviews} reviews)</span>
          </div>
  
          <div className="product_price">
            <span className="price">{product.price}</span>
            <span className="original_price">{product.originalPrice}</span>
          </div>
  
          <button className="product_add_to_cart_btn">Add to Cart</button>
  
          <div className="product_shipping">{product.shipping}</div>
          
          <div className="product_description">
            <h2>Product Details</h2>
            <p>{product.details}</p>
          </div>
        </div>
      </div>
      </>
    );
  }
export default Product;
