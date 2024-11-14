import React from 'react';

const CartItem = ({ 
  item, 
  handleQuantityChange, 
  handleRemoveItem 
}) => {
  return (
    <div className="cart_item" key={item.id}>
      <img src='https://static.vecteezy.com/system/resources/previews/006/298/276/non_2x/gear-smart-eps-icon-digital-tech-business-logo-free-vector.jpg' alt={item.name} className="cart_item_image" />
      
      <div className="cart_item_info">
        <h3>{item.product_name}</h3>
        <p>₹{item.price.toFixed(2)}</p>
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
        <p>₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button
        onClick={() => handleRemoveItem(item.id)}
        className="remove_item_btn"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
