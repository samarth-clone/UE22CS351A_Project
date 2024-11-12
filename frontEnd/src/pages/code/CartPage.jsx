import React, { useState } from 'react';
import '../styles/CartPage.css'; // Import the CSS for the Cart page

function CartPage() {
  // Example cart items (could be from a backend or context state)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "The Art of Coding",
      price: 19.99,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      price: 29.99,
      quantity: 2,
      image: "https://via.placeholder.com/100?text=JS",
    },
    {
      id: 3,
      name: "Learn React",
      price: 25.99,
      quantity: 1,
      image: "https://via.placeholder.com/100?text=React",
    },
  ]);

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Handle remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart_page">
      <h1>Your Shopping Cart</h1>

      <div className="cart_items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart_item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart_item_image" />
              <div className="cart_item_info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>

              <div className="cart_item_quantity">
                <button
                  onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                  className="quantity_btn"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="quantity_btn"
                >
                  +
                </button>
              </div>

              <div className="cart_item_total">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="remove_item_btn"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart_summary">
          <div className="cart_total">
            <h2>Total: ${calculateTotal()}</h2>
          </div>

          <button className="checkout_btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
