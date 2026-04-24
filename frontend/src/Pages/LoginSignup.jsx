import React, { useState, useContext } from 'react'
import './CSS/LoginSignup.css'
import { ShopContext } from '../Context/ShopContext'

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '');

const LoginSignup = () => {
  const { updateAdminStatus } = useContext(ShopContext);
  const [state, setState] = useState("login");
  const [loading, setLoading] = useState(false);
  const [otpNeeded, setOtpNeeded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const login = async () => {
    // ... same logic
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
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
    if (!otpNeeded) {
      // Step 1: Send OTP
      if (!formData.name || !formData.email || !formData.password) {
        alert("Please fill all fields first");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });
        const data = await response.json();
        if (data.success) {
          alert("A 6-digit OTP has been sent to your email. Please verify to continue.");
          setOtpNeeded(true);
        } else {
          alert("Error: " + data.errors);
        }
      } catch (error) {
        alert("Failed to send OTP. Please check your connection.");
      } finally {
        setLoading(false);
      }
    } else {
      // Step 2: Verify and Signup
      if (!formData.otp) {
        alert("Please enter the OTP sent to your email");
        return;
      }
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
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state === "login" ? "Login" : (otpNeeded ? "Verify Email" : "Signup")}</h1>
        <div className="loginsignup-feilds">
          {state === "signup" && !otpNeeded && (
            <input type="text" placeholder="Enter your name" name="name" value={formData.name || ''} onChange={changeHandler} />
          )}
          {!otpNeeded && (
            <>
              <input name='email' type="email" placeholder="Enter your email" value={formData.email} onChange={changeHandler} />
              <input name='password' type="password" placeholder="Enter your password" value={formData.password} onChange={changeHandler} />
            </>
          )}
          {otpNeeded && (
            <div className="otp-section">
              <p>Enter the OTP sent to <b>{formData.email}</b></p>
              <input 
                name='otp' 
                type="text" 
                placeholder="6-digit OTP" 
                maxLength="6" 
                value={formData.otp} 
                onChange={changeHandler} 
                className="otp-input"
              />
              <span className="resend-otp" onClick={() => setOtpNeeded(false)}>Change Email / Back</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => { state === "login" ? login() : signup() }}
          disabled={loading}
        >
          {loading ? 'Processing...' : (otpNeeded ? 'Verify & Register' : 'Continue')}
        </button>
        {state === "signup" && (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => {setState("login"); setOtpNeeded(false);}}>Login here</span>
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