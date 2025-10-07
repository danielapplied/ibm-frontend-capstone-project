// Import necessary modules from React library
import React from 'react';
// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import custom Navbar component
import Notification from './Components/Notification/Notification';
// Function component for the main App
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import Profile from './Components/Profile/Profile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={ <Notification>
               <Landing_Page />
                  </Notification> } />
        <Route path="/login" element={ <Notification>
               <Login />
            </Notification> } />
        <Route path="/signup" element={ <Notification>
               <Sign_Up />
                  </Notification> } />
        <Route path="/instant-consultation" element={ <Notification>
               <BookingConsultation />
                  </Notification> } />
       <Route path="/reviews" element={ <Notification>
               <ReviewForm/>
                  </Notification> } />
      <Route path="/profile" element={ <Notification>
               <Profile/>
                  </Notification> } />
       <Route path='/appointment' element={<Notification/>} />
        <Route path="*" element={
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        } />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
