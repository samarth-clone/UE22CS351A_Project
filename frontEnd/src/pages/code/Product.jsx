import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Product.css';
import icon from '../../assets/icon.png';
import ReviewList from '../../components/component/ReviwList.jsx';
import ReviewBar from '../../components/component/Reviewbar.jsx';

function Product() {
    // Get the `id` from the URL parameters
    const { id } = useParams();

    // State to hold product data
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product data from the server
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/products/${id}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch product data: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Re-run this effect if `id` changes

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // If product data is not available, display a message
    if (!product) {
        return <div>Product not found</div>;
    }


    return (
        <>
            <div className="titleBar">
                <img className="iconImage" src={icon} alt="Icon" />
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
                    {/* Placeholder image since API does not provide an image */}
                    <img src="https://picsum.photos/500/500/" alt="Product" className="product_image" />
                </div>

                <div className="product_right">
                    <h1 className="product_title">{product.product_name}</h1>

                    <div className="product_price">
                        <span className="price">${product.price}</span>
                    </div>

                    <button className="product_add_to_cart_btn">Add to Cart</button>
                    <button className="product_buy_now_btn">Buy Now</button>

                    <div className="product_description">
                        <h2>Product Details</h2>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
            <div className="review_bar">
                <ReviewBar productId={product.product_id} />
            </div>
            <div className='review_list'>
                <ReviewList productId={product.product_id}/>
            </div>
        </>
    );
}

export default Product;
