// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpeciality, setDoctorSpeciality] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const doctorName = localStorage.getItem('doctorName');
    const doctorSpeciality = localStorage.getItem('doctorSpeciality');
    //
    const patientName = localStorage.getItem('name');
    const phone = localStorage.getItem('phone');
    const appointmentDate = localStorage.getItem('appointmentDate');
    const selectedSlot = localStorage.getItem('selectedSlot');

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (patientName && phone && appointmentDate && selectedSlot) {
      setIsLoggedIn(true);
      setPatientName(patientName);
      setPhone(phone);
      setAppointmentDate(appointmentDate);
      setSelectedSlot(selectedSlot);
      console.log(patientName, phone, appointmentDate, selectedSlot);
    }

    // Set doctorData state if storedDoctorData exists
    if (doctorName && doctorSpeciality) {
      setIsLoggedIn(true);
      setDoctorName(doctorName);
      setDoctorSpeciality(doctorSpeciality);
      console.log(doctorName, doctorSpeciality);
    }

  }, [isLoggedIn]); // Empty dependency array ensures useEffect runs only once after initial render

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar ></Navbar>
      {/* Render children components */}
       {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && patientName && doctorName && (
        <>
          <div className="appointment-card" style={{ margin: '100px auto', 
                maxWidth: '600px', padding: '20px', border: '1px solid #ccc',
                 borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Doctor:</strong> {doctorName}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Speciality:</strong> {doctorSpeciality}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Name:</strong> {patientName}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Phone Number:</strong> {phone}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Date of Appointment:</strong> {appointmentDate}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Time Slot:</strong> {selectedSlot}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;