import React from 'react';

const CartItem = ({
  item,
  handleQuantityChangeUp,
  handleQuantityChangeDown,
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
          onClick={() => {
            if (item.quantity <= 1) {
              handleRemoveItem(item.cart_product_id)
            } else {
              handleQuantityChangeDown(item.cart_product_id)
            }
          }}
          className="quantity_btn"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => {

            handleQuantityChangeUp(item.cart_product_id)
          }

          }

          className="quantity_btn"
        >
          +
        </button>
      </div>

      <div className="cart_item_total">
        <p>₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button
        onClick={() => handleRemoveItem(item.cart_product_id)}
        className="remove_item_btn"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
