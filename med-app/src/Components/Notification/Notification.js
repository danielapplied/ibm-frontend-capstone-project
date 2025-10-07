// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isData,setCheck] = useState(false);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorAppointments')) || [];
    const data = Object.values(storedDoctorData ).flat();
    const storedAppointmentData = data;
    console.log(storedAppointmentData)
    if( data.length > 0 )
     {
      setCheck(true);
     }
    else{
       setCheck(false);
     }
    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (data) {
      setDoctorData(data);
      console.log(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar ></Navbar>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && isData && (
        <>
          <div className="appointment-card" style={{marginTop:"10%", 
            marginLeft:"40%", padding:'20px',border:'2px solid darkblue',
            width:'20%', borderRadius:'5px'}}>
           {appointmentData.map((appointment_) => (
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Doctor:</strong> {appointment_?.doctorName}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Speciality:</strong> {appointment_?.doctorSpeciality}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Name:</strong> {appointment_?.patientName}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Phone Number:</strong> {appointment_?.phoneNumber}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Date of Appointment:</strong> {appointment_?.appointmentDate}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Time Slot:</strong> {appointment_?.selectedSlot}
              </p>
             <br/>
            </div>
           ))}
          </div>
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;