import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const LoginSignup = () => {

  const [state,setState]=useState("login");
  const [formData,setFormData]=useState({
    
    email:"",
    password:""
  });

  const changeHandler=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  }

const login = async () => {
  console.log("login function executed", formData);
  let responseData;
  await fetch(`${BACKEND_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => resp.json())
    .then((data) => (responseData = data));

  if (responseData.success) {
    localStorage.setItem('authtoken', responseData.authToken); // Use authToken here
    alert("User logged in successfully");
    window.location.replace("/");
    setState("login");
  } else {
    alert("Login failed: " + responseData.errors);
  }
};


  const signup = async () => {
  console.log("Signup function executed", formData);
  let responseData;
  await fetch(`${BACKEND_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',        // fixed Accept header
      'Content-Type': 'application/json', // fixed Content-Type header
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => resp.json())
    .then((data) => (responseData = data));

  if (responseData.success) {
    localStorage.setItem('authtoken', responseData.authToken); // use authToken here
    alert("User registered successfully");
    window.location.replace("/");
    setState("login");
  } else {
    alert("Registration failed: " + responseData.errors);
  }
};




  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state === "login" ? "Login" : "Signup"}</h1>
        <div className="loginsignup-feilds">
          {state === "signup" && (
            <input type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={changeHandler} />
          )}
          <input name='email' type="email" placeholder="Enter your email" value={formData.email} onChange={changeHandler} />
          <input name='password' type="password" placeholder="Enter your password" value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={()=>{state==="login"?login():signup()}}>Continue</button>
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