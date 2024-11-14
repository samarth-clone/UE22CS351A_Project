import React, { useEffect, useState } from 'react';
import icon from '../../assets/icon.png';
import '../styles/home.css';
import BookCard from '../../components/component/BookCard.jsx';
import { Link } from 'react-router-dom';
import TitleBar from '../../components/component/TitleBar.jsx';
function Home() {
  const [products, setProducts] = useState([]); // State to store products
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    // Fetch products from the server
    fetch('http://localhost:8080/products',  {
      headers: {
        'Accept': 'application/json',
      }})
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); // Set the products to state
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      });
  }, []); // Empty dependency array, so this runs only once when the component mounts

  return (
    <>
      <TitleBar></TitleBar>
       

      <div className="items">
        {error ? (
          <div>{error}</div> // Show error message if there's an error
        ) : (
          products.map((product) => (
            <BookCard key={product.product_id} id={product.product_id} />
          ))
        )}       
    </div>
    </>
  );
}

export default Home;
