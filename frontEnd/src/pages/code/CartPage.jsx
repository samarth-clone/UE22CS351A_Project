import React, { useState } from 'react';
import '../styles/CartPage.css'; // Import the CSS for the Cart page
import CartItem from '../../components/component/CartItem';
import TitleBar from '../../components/component/TitleBar.jsx';
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
      <TitleBar className='cartTitle' />
      <div className="cartBody">
        <h1>Your Shopping Cart</h1>

        <div className="cart_items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
              />
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
    </div>
  );
}

export default CartPage;
