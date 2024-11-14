import React, { useEffect, useState } from 'react';
import '../styles/CheckoutPage.css'; // Import styling for the checkout page
import icon from '../../assets/icon.png';
function CheckoutPage() {
  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [customerID, setCustomerID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: '',
  });


  const getCustomerIDByEmail = async (email) => {
    const response = await fetch(`http://localhost:8080/customers/${email}`);
    const data = await response.json();
    return data.customer_id;
  };


  useEffect(() => {
    const fetchCustomerID = async () => {
      const url = window.location.href;
      const emailMatch = url.match(/\/([^/]+)\/checkOut/);
      if (!emailMatch || !emailMatch[1].includes('@')) {
        alert("Log in to process checkout.");
        return;
      }
      const email = emailMatch[1];
      setUserEmail(email)
      const id = await getCustomerIDByEmail(email);
      setCustomerID(id);
    };
    fetchCustomerID();
  }, []);
  
 

  // Cart items
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
      setCartItems(cartData || []);
    } else {
      console.error("Failed to fetch cart data.");
    }
  };
  useEffect(() => {
    fetchCartData();
  }, [customerID]);

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
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
  
    // Credit/Debit Card format checks
    if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV) {
        alert('Please fill in all card details.');
        return;
      }
  
      // Validate card number (Luhn algorithm check for credit/debit card numbers)
      const cardNumberRegex = /^\d{16}$/; // Assuming a 16-digit card number
      if (!cardNumberRegex.test(formData.cardNumber)) {
        alert('Please enter a valid card number (16 digits).');
        return;
      }
  
      // Validate card expiry (MM/YY format)
      const cardExpiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
      if (!cardExpiryRegex.test(formData.cardExpiry)) {
        alert('Please enter a valid expiry date (MM/YY).');
        return;
      }
  
      // Validate card CVV (3 digits)
      const cardCVVRegex = /^\d{3}$/;
      if (!cardCVVRegex.test(formData.cardCVV)) {
        alert('Please enter a valid CVV (3 digits).');
        return;
      }
    } 
    // UPI format check
    else if (paymentMethod === 'upi') {
      if (!formData.upiId) {
        alert('Please fill in your UPI ID.');
        return;
      }
  
      // Validate UPI ID format (example: username@upi)
      const upiRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+$/;
      if (!upiRegex.test(formData.upiId)) {
        alert('Please enter a valid UPI ID.');
        return;
      }
    }
    var currentTotal = calculateTotal()
    currentTotal = parseInt(currentTotal, 10);
    const message = {
      'customer_id': customerID,
      'payment_method': paymentMethod,
      'total': currentTotal,
    }
    console.log(message);
    const response = await fetch('http://localhost:8080/checkout/recordTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    alert(`Order submitted with ${paymentMethod} payment method.`);

    const response2 = await fetch(`http://localhost:8080/cart/getCartID/${customerID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    var data = await response2.json();
    var cartID = data.cart_id
    console.log(cartID)

    const response3 = await fetch(`http://localhost:8080/cart/deleteCart/${cartID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    window.location.href = `/${userEmail}`;
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
            <div key={item.cart_product_id} className="checkout_item">
              <span>{item.product_name} (x{item.quantity})</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="checkout_total">
          <strong>Total: ₹{calculateTotal()}</strong>
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
