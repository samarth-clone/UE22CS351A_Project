import React from 'react'
import '../styles/BookCard.css'
import icon from '../../assets/icon.png';
import { Link } from 'react-router-dom';
export default function BookCard() {
  return (
    <Link to="/product" className='linker'>
    <div class="product-card">
          <img src={icon} alt="Book Cover" class="product-image"/>
          <div class="product-details">
            <h2 class="product-title">The Art of Coding</h2>
            <div class="product-rating">
              ★★★★☆ (4.5)
            </div>
            <p class="product-price">$19.99</p>
            <button class="buy-now">Buy Now</button>
          </div>
        </div>
      </Link>
  )
}
