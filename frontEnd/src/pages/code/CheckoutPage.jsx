import React, { useState } from 'react';
import '../styles/CheckoutPage.css'; // Import styling for the checkout page
import icon from '../../assets/icon.png';
function CheckoutPage() {
  // Sample data for cart items (you can replace this with your actual cart state)
  const [cartItems] = useState([
    {
      id: 1,
      name: "The Art of Coding",
      price: 19.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      price: 29.99,
      quantity: 2,
    },
    {
      id: 3,
      name: "Learn React",
      price: 25.99,
      quantity: 1,
    },
  ]);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: '',
  });

  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle form data changes (for card or UPI info)
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Calculate total amount
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order submitted with ${paymentMethod} payment method.`);
  };

  return (
    <div className = 'pageing'>
        <img src={icon} className='checkOut_page_logo'/>
    <div className="checkout_page">
      <h1>Checkout</h1>

      <div className="checkout_summary">
        <h2>Order Summary</h2>
        <div className="checkout_items">
          {cartItems.map((item) => (
            <div key={item.id} className="checkout_item">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="checkout_total">
          <strong>Total: ${calculateTotal()}</strong>
        </div>
      </div>

      <div className="payment_method_section">
        <h2>Select Payment Method</h2>
        <div className="payment_options">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={() => handlePaymentMethodChange('creditCard')}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="debitCard"
              checked={paymentMethod === 'debitCard'}
              onChange={() => handlePaymentMethodChange('debitCard')}
            />
            Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={() => handlePaymentMethodChange('upi')}
            />
            UPI
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => handlePaymentMethodChange('cash')}
            />
            Cash
          </label>
        </div>

        {/* Payment details form */}
        {paymentMethod === 'creditCard' || paymentMethod === 'debitCard' ? (
          <div className="payment_details_form">
            <h3>{paymentMethod === 'creditCard' ? 'Credit Card' : 'Debit Card'} Details</h3>
            <div>
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleFormChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div>
              <label>Expiry Date:</label>
              <input
                type="text"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleFormChange}
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label>CVV:</label>
              <input
                type="text"
                name="cardCVV"
                value={formData.cardCVV}
                onChange={handleFormChange}
                placeholder="123"
              />
            </div>
          </div>
        ) : paymentMethod === 'upi' ? (
          <div className="payment_details_form">
            <h3>UPI Details</h3>
            <div>
              <label>UPI ID:</label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleFormChange}
                placeholder="you@upi"
              />
            </div>
          </div>
        ) : null}

        {/* Submit Button */}
        <button onClick={handleSubmit} className="checkout_submit_btn">
          Submit Order
        </button>
      </div>
    </div>
    </div>
  );
}

export default CheckoutPage;
