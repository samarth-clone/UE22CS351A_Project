import React, { useEffect, useState } from 'react';
import '../styles/CartPage.css';
import CartItem from '../../components/component/CartItem';
import TitleBar from '../../components/component/TitleBar.jsx';

function CartPage() {
  const [data, setData] = useState([]);
  const [customerID, setCustomerID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const getCustomerIDByEmail = async (email) => {
    const response = await fetch(`http://localhost:8080/customers/${email}`);
    const data = await response.json();
    return data.customer_id;
  };

  const fetchCartData = async () => {
    if (!customerID) return;
    const response = await fetch(`http://localhost:8080/cart/getCartForCustomer/${customerID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const cartData = await response.json();
      setData(cartData || []);
    } else {
      console.error("Failed to fetch cart data.");
    }
  };


  // const url = window.location.href;
  // const emailMatch = url.match(/\/([^/]+)\/cart/);
  // if (!emailMatch || !emailMatch[1].includes('@')) {
  //   alert("Log in to process cart.");
  //   return;
  // }
  // setUserEmail(emailMatch[1])


  useEffect(() => {
    const fetchCustomerID = async () => {
      const url = window.location.href;
      const emailMatch = url.match(/\/([^/]+)\/cart/);
      if (!emailMatch || !emailMatch[1].includes('@')) {
        alert("Log in to process cart.");
        return;
      }
      const email = emailMatch[1];
      setUserEmail(email)
      const id = await getCustomerIDByEmail(email);
      setCustomerID(id);
    };
    fetchCustomerID();
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [customerID]);

  const updateItemLocally = (cartProductID, change) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.cart_product_id === cartProductID
          ? { ...item, quantity: item.quantity + change }
          : item
      ).filter(item => item.quantity > 0) // Remove items with quantity <= 0
    );
  };

  const handleQuantityChangeUp = async (cartProductID) => {
    updateItemLocally(cartProductID, 1);
    await fetch(`http://localhost:8080/cart/updateCartProductPlus/${cartProductID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCartData(); // Optional, for syncing
  };

  const handleQuantityChangeDown = async (cartProductID) => {
    updateItemLocally(cartProductID, -1);
    await fetch(`http://localhost:8080/cart/updateCartProductMinus/${cartProductID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCartData(); // Optional, for syncing
  };

  const handleRemoveItem = async (cartProductID) => {
    setData((prevData) => prevData.filter((item) => item.cart_product_id !== cartProductID));
    await fetch(`http://localhost:8080/cart/deleteCartProduct/${cartProductID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCartData(); // Optional, for syncing
  };

  const calculateTotal = () => {
    return data.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
                handleQuantityChangeUp={handleQuantityChangeUp}
                handleQuantityChangeDown={handleQuantityChangeDown}
                handleRemoveItem={handleRemoveItem}
              />
            ))
          )}
        </div>
        {data.length > 0 && (
          <div className="cart_summary">
            <div className="cart_total">
              <h2>Total: ₹{calculateTotal()}</h2>
            </div>
            <button className="checkout_btn" onClick={() => window.location.href = `/${userEmail}/checkOut`}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
