import React, { useState } from 'react';
import '../styles/auth.css';
import icon from '../../assets/icon.png';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      dob: dob,
      email: email,
      password: password,
      contact: contact,
    };

    try {
      const response = await fetch('http://localhost:8080/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText)
        if (errorText.startsWith('sql:')) {
          window.location.href = '/login';
          alert('Sign-up successful')
        }
        else {
          console.log("entered error 2")
          alert('Error:', errorText)
        }

      } else {
        window.location.href = '/login';
        alert('Sign-up successful!');
      }
    } catch (error) {
      console.log(error)
      if (error == "sql: no rows in result set") {
        window.location.href = '/login';
        alert('Sign-up successful')
      }
      else {
        console.log("entered error 4")
        alert('Error:', error)
      }
    }
  };

  return (
    <div className="auth-container">
      <img className="imageIcon" src={icon} alt="App Icon" />
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          <div className="form-group centered-field">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              placeholder="Enter your contact number"
            />
          </div>
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default SignUp;
