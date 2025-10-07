// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {

  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [incorrect, setIncorrect] = useState('');

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
     }
   }, []);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // Parse the response JSON
     const json = await res.json();
     console.log(json);
   //
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem("phone", json.phone);
      sessionStorage.setItem("name", json.name);
      sessionStorage.setItem("loggedIn", Boolean(true).toString());
      setIncorrect('');
      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      setIncorrect('Invalid Credentials');
      setTimeout(() => {
               setIncorrect("");
             }, 15000);
      if (json.errors) {
        for (const error of json.errors) {
          console.log(error.msg)  //alert(error.msg);
        }
      } else {
        console.log(json.error);  //alert(json.error);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
        <div className="login-form">
        <form onSubmit={login}>
         <div className="form-group">
          <label htmlFor="email">Email</label>
         <input 
          type="email" 
          name="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control" 
          placeholder="Enter your email" 
          aria-describedby="helpId" 
         />
       </div>
       <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        placeholder="Enter your password"
        aria-describedby="helpId"
      />
      </div>
      <div className="btn-group">
      <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
        Login
       </button> 
       <br/>
       <span style={{color:'red',height:'.5cm',display:'block',
                fontStyle:'italic',fontSize:'16px',marginTop:'10px'}}>
        {incorrect}
        </span>
       </div>
        <div className="login-text" style={{margin:'20px auto', fontSize:'16px'}}>
         Forgot Password?
         </div>
        </form>
        </div>
          <div className="login-text">
            Are you a new member? 
            <span>
              <Link to="/signup" style={{ color: '#2190FF' }}>
                 Sign Up Here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
