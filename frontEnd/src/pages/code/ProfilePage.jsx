import React, { useState } from 'react';
import '../styles/ProfilePage.css'; // Import styling for the profile page
import icon from '../../assets/icon.png';
import { Link } from 'react-router-dom';
function ProfilePage() {
  // User's info state
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    address: "123 Main St, Cityville, 12345",
  });

  // Transaction history state
  const [transactions] = useState([
    {
      item: "The Art of Coding",
      address: "123 Main St, Cityville, 12345",
      amount: "$19.99",
      paymentMethod: "Credit Card",
    },
    {
      item: "Advanced JavaScript",
      address: "123 Main St, Cityville, 12345",
      amount: "$25.99",
      paymentMethod: "PayPal",
    },
  ]);

  // Handle user info change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <>
    <div className="titleBar">
            <img className='iconImage' src = {icon}></img>
            <h1>Boogs and Pajes</h1>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/signUp" className="signUp">
              Sign-Up
            </Link>
        </div>
    <div className="profile_page">
      
      <div className="profile_info">
        <h2>User Information</h2>
        <div className="profile_input_group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />
        </div>

        <div className="profile_input_group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
          />
        </div>

        <button className="profile_save_btn">Save Changes</button>
      </div>

      <div className="transaction_history">
        <h2>Transaction History</h2>
        <table className="transaction_table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Address</th>
              <th>Amount Paid</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.item}</td>
                <td>{transaction.address}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default ProfilePage;
