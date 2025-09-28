// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css'

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const navigate = useNavigate();
   // const { setIsLoggedIn } = useAppContext();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json(); // Parse the response JSON
        console.log(json);
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            //setIsLoggedIn(true); // Update login state
            setIncorrect("Account created successfully"); // Show success message
            // Clear form fields
            setName('');    
            setEmail('');
            setPhone('');
            setPassword('');    
            // Optionally, you can add a delay here before redirecting
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
          document.getElementById("email").value="";
          document.getElementById("password").value="";
           setIncorrect("Ensure you provide  correct input formart for email, name, password and phone number. Try again."); // Show error message
          setTimeout(() => {
            setIncorrect("");
          }, 2000);
        }
       }
    

    // JSX to render the Sign Up form
    return (
     <div>
      <div className="container" style={{marginTop:'5%'}}>
       <div className="signup-grid">
          <div className="signup-text">
            <h2>Register</h2>
          </div>
       <div className="signup-form"> {/* Form for user sign-up */}
         <form onSubmit={handleSubmit}> {/* Start of the form */}
         <div className="form-group"> {/* Form group for user's name */}
          <label htmlFor="name">Name</label> {/* Label for name input field */}
          <input 
            type="text" 
            name="name" 
            id="name" 
            required 
            className="form-control" 
            placeholder="Enter your name" 
            aria-describedby="helpId"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> {/* Text input field for name */}
        </div>

        <div className="form-group"> {/* Form group for user's email */}
          <label htmlFor="email">Email</label> {/* Label for email input field */}
          <input 
            type="email" 
            name="email" 
            id="email" 
            required 
            className="form-control" 
            placeholder="Enter your email" 
            aria-describedby="helpId"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> {/* Email input field */}
        </div>

        <div className="form-group"> {/* Form group for user's password */}
          <label htmlFor="password">Password</label> {/* Label for password input field */}
          <input 
            type="password"
            name="password" 
            id="password" 
            required 
            className="form-control" 
            placeholder="Enter your password" 
            aria-describedby="helpId"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> {/* Password input field */}
        </div>

       <div className="form-group"> {/* Form group for user's phone number */}
          <label htmlFor="phone">Phone</label> {/* Label for phone input field */}
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            required 
            className="form-control" 
            placeholder="Enter your phone number" 
            aria-describedby="helpId"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          /> {/* Tel input field for phone number */}
        </div>

         <div className="btn-group"> {/* Button group for form submission and reset */}
          <button 
            type="submit" 
            className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
           >
             Submit
             </button> {/* Submit button */}
             </div>
            </form> {/* End of the form */}
            <br/>
            <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'14px'}}>{incorrect}</span>  
           </div>
             <div className="signup-text" style={{marginTop:'0%'}}>
              Existing member? 
              <span>
                <Link to="/app/login" style={{ color: '#2190FF' }}>
                   Login Here
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Sign_Up; // Export the Sign_Up component for use in other components