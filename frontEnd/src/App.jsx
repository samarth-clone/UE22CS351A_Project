import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BasicExample from './pages/code/home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/code/Login'
import SignUp from './pages/code/SignUp'
import Product from './pages/code/Product'
import ProfilePage from './pages/code/ProfilePage'
import CartPage from './pages/code/CartPage'
import CheckoutPage from './pages/code/CheckoutPage'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicExample />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/product" element={<Product />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkOut" element={<CheckoutPage />} />
      </Routes>
    </Router>
  )
}

export default App