import React, { useEffect, useState } from 'react';
import '../styles/CartPage.css'; // Import the CSS for the Cart page
import CartItem from '../../components/component/CartItem';
import TitleBar from '../../components/component/TitleBar.jsx';

function CartPage() {
  const [data, setData] = useState([]);
  const [customerID, setCustomerID] = useState(null);

  // Function to fetch customer ID by email
  const getCustomerIDByEmail = async (email) => {
    const response = await fetch(`http://localhost:8080/customers/${email}`);
    const data = await response.json();
    return data.customer_id;
  };

  // Fetch customer ID and cart data
  useEffect(() => {
    const fetchCartData = async () => {
      const url = window.location.href;
      const emailMatch = url.match(/\/([^/]+)\/cart/);
      if (!emailMatch || !emailMatch[1].includes('@')) {
        alert("Log in to process cart.");
        return;
      }

      const email = emailMatch[1];
      const id = await getCustomerIDByEmail(email);
      setCustomerID(id);

      const response = await fetch(`http://localhost:8080/cart/getCartForCustomer/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const cartData = await response.json();
        setData(cartData);
      } else {
        console.error("Failed to fetch cart data.");
      }
    };

    fetchCartData();
  }, []);

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    // Logic to update quantity
  };

  // Handle remove item from cart
  const handleRemoveItem = (id) => {
    // Logic to remove item from cart
  };

  // Calculate total price
  const calculateTotal = () => {
    return data.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart_page">
      <TitleBar className='cartTitle' />
      <div className="cartBody">
        <h1>Your Shopping Cart</h1>

        <div className="cart_items">
          {data.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            data.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
              />
            ))
          )}
        </div>

        {data.length > 0 && (
          <div className="cart_summary">
            <div className="cart_total">
              <h2>Total: ${calculateTotal()}</h2>
            </div>

            <button className="checkout_btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
