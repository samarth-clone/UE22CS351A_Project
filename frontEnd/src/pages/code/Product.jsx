import React, { useEffect, useState } from 'react';
import { useParams, Link, json } from 'react-router-dom';
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
            const url = window.location.href;
            const emailMatch = url.match(/\/([^/]+)\/product\//);
            const email = emailMatch[1];
            const targetUrl = email.includes('@')
            if (!targetUrl) {
                alert("Log in to add to cart.");
                return
            }
            const customerID = await getCustomerIDByEmail(email);
            console.log("Customer ID:",customerID)
            var response = await fetch(`http://localhost:8080/cart/getCartID/${customerID}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(response)
            if (!response.ok){
                var response2 = await fetch('http://localhost:8080/cart/createCart',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({'customer_id' : customerID})
                })
                if (!response2.ok){
                    console.log('Error making new cart')
                }
                else{
                    var data = await response2.json()
                    var cart_id = data.cart_id
                    console.log(cart_id)
                    console.log('made new cart')
                }

            }
            else{
                var data = await response.json()
                var cart_id = data.cart_id
                console.log(cart_id)
                console.log("cart exists")
                
                
            }
            setQuantity(1);
            console.log(quantity)
            const message = {
                'vendor_product_id' : vendorProductID,
                'quantity' : 1,
                'cart_id' : cart_id
            }

            var response = await fetch(`http://localhost:8080/cart/getCartForCustomer/${customerID}`,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok){
                console.log(response)
                var data3 = await response.json()
                console.log(data3)
                var checker = 0
                if(data3){
                    for (let i = 0; i<data3.length; i++){
                        console.log("data item:",data3[i].product_id)
                        console.log("url item:",product.product_id)
                        var data_item = data3[i].product_id
                        var url_item = product.product_id
                        if (data_item == url_item){
                            checker = 1
                            console.log(data3[i].cart_product_id)
                            alert("item in cart")
                            return
                        }
                        console.log("type of checker:",checker)
                    }
                }
                
                if (!checker){
                    var response = await fetch('http://localhost:8080/cart/addToCart',{
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(message)
                    })
                    if (response.ok){
                        alert("added to cart successfully")
                    }
                    else{
                        alert("error adding to cart")
                    }
                }
                else{
                    alert("item in cart")
                    return
                }
            }
            else{
                console.log("there has been an error")
            }
            

    };


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
                            <span className="price">₹{product.price}</span>
                        </div>

                        
                        <button className="product_add_to_cart_btn" onClick={handleAddToCart}>Add to Cart</button>

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