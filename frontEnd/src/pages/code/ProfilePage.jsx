import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css'; // Import styling for the profile page
import TitleBar from '../../components/component/TitleBar';

function ProfilePage() {
  const [transactionData, setTransactionData] = useState([]);
  const [customerID, setCustomerID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
  });
  const [errors, setErrors] = useState({}); // State to store error messages

  // Function to get customer ID by email
  const getCustomerIDByEmail = async (email) => {
    const response = await fetch(`http://localhost:8080/customers/${email}`);
    const data = await response.json();
    return data.customer_id;
  };

  // Fetch customer ID based on email in URL
  useEffect(() => {
    const fetchCustomerID = async () => {
      const url = window.location.href;
      const emailMatch = url.match(/\/([^/]+)\/profile/);
      if (!emailMatch || !emailMatch[1].includes('@')) {
        alert("Log in to process checkout.");
        return;
      }
      const email = emailMatch[1];
      setUserEmail(email);
      const id = await getCustomerIDByEmail(email);
      setCustomerID(id);
    };
    fetchCustomerID();
  }, []);

  // Fetch transaction data when customer ID is available
  useEffect(() => {
    if (customerID) {
      const fetchTransactionData = async () => {
        const response = await fetch(`http://localhost:8080/checkout/getTransactions/${customerID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const newTransactionData = await response.json();
          setTransactionData(newTransactionData);
        } else {
          console.error("Failed to fetch transaction data.");
        }
      };
      fetchTransactionData();
    }
  }, [customerID]);

  // Fetch user data when email is available
  useEffect(() => {
    if (userEmail) {
      const fetchUserData = async () => {
        const response = await fetch(`http://localhost:8080/customers/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const newUserData = await response.json();
          setUserInfo(newUserData);
        } else {
          console.error("Failed to fetch user data.");
        }
      };
      fetchUserData();
    }
  }, [userEmail]);

  // Handle input value change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Handle validation when field loses focus
  const handleBlur = (e) => {
    const { name, value } = e.target;

    let newErrors = { ...errors };

    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (name === "contact" && !/^\d{10}$/.test(value)) {
      newErrors.contact = "Contact number must be 10 digits.";
    } else if ((name === "first_name" || name === "last_name") && value.trim() === "") {
      newErrors[name] = "This field cannot be empty.";
    } else {
      newErrors[name] = ""; // Clear error if validation passes
    }

    setErrors(newErrors);
  };

  // Handle saving changes
  const handleSaveChanges = () => {
    // Check if any required fields are empty
    let newErrors = { ...errors };
    let hasError = false;

    // Validate each required field
    if (!userInfo.first_name.trim()) {
      newErrors.first_name = "First name cannot be empty.";
      hasError = true;
    }
    if (!userInfo.last_name.trim()) {
      newErrors.last_name = "Last name cannot be empty.";
      hasError = true;
    }
    if (!userInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }
    if (!userInfo.contact.trim() || !/^\d{10}$/.test(userInfo.contact)) {
      newErrors.contact = "Contact number must be 10 digits.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      alert("Changes have been committed.");
      // Here you might also want to make an API call to save the changes to the server
    }
  };
  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing user session, cookies)
    alert("You have been logged out.");
    window.location.href = '/' // Redirect to the homepage after logout
  };

  return (
    <>
      <TitleBar />
      <div className="profile_page">
        <div className="profile_info">
          <h2>User Information</h2>

          <div className="profile_input_group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="first_name"
              value={userInfo.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.first_name && <p className="error_message">{errors.first_name}</p>}
          </div>

          <div className="profile_input_group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="last_name"
              value={userInfo.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.last_name && <p className="error_message">{errors.last_name}</p>}
          </div>

          <div className="profile_input_group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <p className="error_message">{errors.email}</p>}
          </div>

          <div className="profile_input_group">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={userInfo.contact}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.contact && <p className="error_message">{errors.contact}</p>}
          </div>

          <button className="profile_save_btn" onClick={handleSaveChanges}>Save Changes</button>
        </div>

        <div className="transaction_history">
          <h2>Transaction History</h2>
          <table className="transaction_table">
            <thead>
              <tr>
                <th>Total</th>
                <th>Payment Method</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((transaction) => (
                <tr key={transaction.CustomerID}>
                  <td>{transaction.Total}</td>
                  <td>{transaction.PaymentMethod}</td>
                  <td>{transaction.TransactionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="logout_section">
            <button className="logout_button" onClick={handleLogout}>Logout</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default ProfilePage;
