import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Product.css';
import icon from '../../assets/icon.png';
import ReviewList from '../../components/component/ReviwList.jsx';
import ReviewBar from '../../components/component/Reviewbar.jsx';
import TitleBar from '../../components/component/TitleBar.jsx';
function Product() {
    // Get the `id` from the URL parameters
    const { id } = useParams();

    // State to hold product data
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(0); // Track quantity
    const [vendorProductID, setVendorProductID] = useState(0);
    const getCustomerIDByEmail = async (email) => {
        const response = await fetch(`http://localhost:8080/customers/${email}`);
        const data = await response.json();
        return data.customer_id;
    };
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
                setProduct(data.product);
                setVendorProductID(data.vendorProductID);
                console.log("Hello", data);
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

    // Handle Add to Cart button click
    const handleAddToCart = async () => {
        if (quantity === 0) {


            const url = window.location.href;
            const emailMatch = url.match(/\/([^/]+)\/product\//);
            const email = emailMatch[1];
            const targetUrl = email.includes('@')
            const customerID = await getCustomerIDByEmail(email);
            if (!targetUrl) {
                alert("Log in to add to cart.");
                return
            }
            setQuantity(1);
            var response = await awaitfetch(`http://localhost:8080/cart/getCartID/${customerID}`)






        }
    };

    // Handle increment quantity
    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Handle decrement quantity
    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 0)); // Prevent quantity from going below 0
    };
    const confirmAddToCart = async () => {
        const url = window.location.href;
        const emailMatch = url.match(/\/([^/]+)\/product\//);
        const email = emailMatch[1];
        const targetUrl = email.includes('@')
        if (!targetUrl) {
            alert("Log in to add to cart.");
            return
        }
        const customerID = await getCustomerIDByEmail(email);
        var message = {
            vendor_product_id : vendorProductID,
            cart_id: 1, //need to find,
            quantity: quantity
         }
         useEffect(() => {
            // Log initial message payload
            console.log("Add to Cart - Initial message payload:", message);
    
            const addToCart = async () => {
                console.log("Add to Cart - Starting fetch request...");
    
                try {
                    const response = await fetch('http://localhost:8080/cart/addToCart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(message),
                    });
    
                    // Log the HTTP status code and response status
                    console.log("Add to Cart - Response status:", response.status, response.statusText);
    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
    
                    const data = await response.json();
    
                    // Log the data received from the server
                    console.log("Add to Cart - Server response data:", data);
                } catch (error) {
                    // Log any errors caught during the fetch
                    console.error("Add to Cart - Error occurred:", error);
                }
            };
    
            // Check for required data in message before sending request
            if (message && Object.keys(message).length > 0) {
                console.log("Add to Cart - Valid message, initiating request...");
                addToCart();
            } else {
                console.warn("Add to Cart - Invalid or empty message object. Skipping request.");
            }
    
        }, [message]);
        }
    return (
            <>
                <TitleBar />

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

                        {/* Render Add to Cart button */}
                        <button className="product_add_to_cart_btn" onClick={handleAddToCart}>Add to Cart</button>

                        {/* Quantity counter - displayed below Add to Cart button if quantity > 0 */}
                        {quantity > 0 && (
                            <>
                                <div className="quantity_countera">
                                    <button onClick={decrementQuantity} className="quantity_btna">-</button>
                                    <span className="quantitya">{quantity}</span>
                                    <button onClick={incrementQuantity} className="quantity_btna">+</button>
                                </div>
                                <button className="confirmButton" onClick={confirmAddToCart}>Confirm</button>
                            </>
                        )}

                        <div className="product_description">
                            <h2>Product Details</h2>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
                <div className="review_bar">
                    <ReviewBar productId={product.product_id} productName={product.product_name} />
                </div>
                <div className="review_list">
                    <ReviewList productId={product.product_id} />
                </div>
            </>
        );
    }

    export default Product;