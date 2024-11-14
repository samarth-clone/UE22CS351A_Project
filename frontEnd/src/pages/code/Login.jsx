import React, { useState } from 'react';
import '../styles/auth.css'; // Import the styling for the auth pages
import icon from '../../assets/icon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Make handleSubmit async
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);

    const loginCreds = {
      email: email,
      password: password,
    };

    // Handle login logic here
    try {
      const response = await fetch('http://localhost:8080/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCreds),
      });

      if (response.ok) {
        // Redirect to home page if login is successful
        window.location.href = `http://localhost:5173/${email}`;
      } else {
        // Alert for login failure
        const errorText = await response.text();
        alert(`Login failed: ${errorText}`);
      }
    } catch (error) {
      // Alert for any network or other errors
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <img className='imageIcon' src={icon} alt="App Icon" />
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;
