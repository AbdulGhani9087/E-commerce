import React, { useState, useContext } from 'react'
import './CSS/LoginSignup.css'
import { ShopContext } from '../Context/ShopContext'

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '');

const LoginSignup = () => {
  const { updateAdminStatus } = useContext(ShopContext);
  const [state, setState] = useState("login");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('authtoken', responseData.authToken);
        updateAdminStatus();

        if (responseData.isAdmin) {
          alert("Welcome Admin! Redirecting to admin panel...");
          window.location.replace("/admin");
        } else {
          alert("User logged in successfully");
          window.location.replace("/");
        }
      } else {
        alert("Login failed: " + (responseData.errors || "Invalid credentials"));
      }
    } catch (error) {
      alert("Login error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('authtoken', responseData.authToken);
        updateAdminStatus();
        alert("User registered successfully");
        window.location.replace("/");
      } else {
        alert("Registration failed: " + (responseData.errors || "Something went wrong"));
      }
    } catch (error) {
      alert("Signup error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state === "login" ? "Login" : "Signup"}</h1>
        <div className="loginsignup-feilds">
          {state === "signup" && (
            <input type="text" placeholder="Enter your name" name="name" value={formData.name || ''} onChange={changeHandler} />
          )}
          <input name='email' type="email" placeholder="Enter your email" value={formData.email} onChange={changeHandler} />
          <input name='password' type="password" placeholder="Enter your password" value={formData.password} onChange={changeHandler} />
        </div>
        <button 
          onClick={() => { state === "login" ? login() : signup() }}
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Continue'}
        </button>
        {state === "signup" && (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("login")}>Login here</span>
          </p>
        )}
        {state === "login" && (
          <p className="loginsignup-login">
            Create an account{" "}
            <span onClick={() => setState("signup")}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            By continuing, I agree to the terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup