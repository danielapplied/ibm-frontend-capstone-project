// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2
//import { useAppContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //Step 1 - Task 4
    const [incorrect, setIncorrect] = useState('');
    //Step 1 - Task 5
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    //const { setIsLoggedIn } = useAppContext();

    //Step 1 - Task 6
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
          navigate('/app')
        }
      }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault();
        //api call
        const res = await fetch(`${API_URL}/api/auth/login`, {
            //Step 1 - Task 7
            method: 'POST',
            //Step 1 - Task 8
          headers: {
            "content-type": "application/json; charset=utf-8",
            'Authorization': bearerToken ? `Bearer ${bearerToken}` : '', // Include Bearer token if available
          },
        //Step 1 - Task 9
          body: JSON.stringify({
            email,
            password
          })
        });

        //Step 2: Task 1
        const json = await res.json();
        console.log('Json',json);
        if (json.authtoken) {
            //Step 2: Task 2
          sessionStorage.setItem('auth-token', json.authtoken);
          sessionStorage.setItem('name', json.userName);
          sessionStorage.setItem('email', json.userEmail);
            //Step 2: Task 3
         // setIsLoggedIn(true);
            //Step 2: Task 4
          navigate('/');
        } else {
            //Step 2: Task 5
          document.getElementById("email").value="";
          document.getElementById("password").value="";
          setIncorrect("Wrong password or Username. Try again.");
          setTimeout(() => {
            setIncorrect("");
          }, 2000);
        }

      }


  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
        <div className="login-form">
        <form onSubmit={handleLogin}>
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
       <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'14px'}}>{incorrect}</span>
       </div>
        <div className="login-text">
         Forgot Password?
         </div>
        </form>
        </div>
          <div className="login-text">
            Are you a new member? 
            <span>
              <Link to="/app/signup" style={{ color: '#2190FF' }}>
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
