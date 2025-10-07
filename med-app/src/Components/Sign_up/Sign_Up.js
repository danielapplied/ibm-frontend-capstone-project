// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // API Call to register user
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
                role: role
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            let errorMsg = '';
            if (json.errors) {
                for (const error of json.errors) {
                   errorMsg += error.msg + '\n';     
                }
               setShowerr(errorMsg); 
            } else {
                for (const error of json.error) {
                   errorMsg += error.msg + '\n';     
                }
                setShowerr(errorMsg);
            }
             setTimeout(() => {
               setShowerr("");
             }, 15000);
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid">
                <div className="signup-text" style={{textAlign:'left',marginLeft:'2%'}}>
                   <h2>Register</h2>
                   </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>

               <div className="form-group">
                 <label htmlFor="role">Role</label>
                    <select
                    id="role"
                     name="role"
                     className="form-control"
                     value={role}
                     onChange={(e) => setRole(e.target.value)}
                     required
                    >
                      <option value="">Select your role</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Patient">Patient</option>
                      <option value="Admin">Admin</option>
                      </select>
                       {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                     </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} 
                              type="name" name="name" 
                              id="email" className="form-control" 
                              placeholder="Enter your Name" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} 
                            type="password" name="password" id="password" className="form-control" 
                            placeholder="Enter your password" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>
                        <div className="form-group"> {/* Form group for user's phone number */}
                           <label htmlFor="phone">Phone</label> {/* Label for phone input field */}
                           <input  type="tel"  name="phone"  id="phone"  required  className="form-control" 
                            placeholder="Enter your phone number" 
                            aria-describedby="helpId"
                            value={phone} onChange={(e) => setPhone(e.target.value)}
                            /> 
                           {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>} 
                          </div>
                        <div className="btn-group">
                         <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                           Submit
                         </button>
                         </div>
                    </form>
                   <div className="signup-text" style={{marginTop:'0%'}}>
                     Existing member? 
                     <span>
                       <Link to="/login" style={{ color: '#2190FF' }}>
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