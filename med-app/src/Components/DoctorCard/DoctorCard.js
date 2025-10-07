import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Create a unique key for this doctor
  const doctorKey = `${name}-${speciality}`.replace(/\s+/g, '-').toLowerCase();

  useEffect(() => {
    // Retrieve appointments for this specific doctor
    const storedAppointments = JSON.parse(localStorage.getItem('doctorAppointments')) || {};
    const doctorAppointments = storedAppointments[doctorKey] || [];
    setAppointments(doctorAppointments);
  }, [doctorKey]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    // Filter out the cancelled appointment
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    
    // Update localStorage for all doctors
    const allAppointments = JSON.parse(localStorage.getItem('doctorAppointments')) || {};
    if (updatedAppointments.length === 0) {
      // Remove this doctor's entry if no appointments left
      delete allAppointments[doctorKey];
    } else {
      // Update this doctor's appointments
      allAppointments[doctorKey] = updatedAppointments;
    }
    localStorage.setItem('doctorAppointments', JSON.stringify(allAppointments));
    // Close modal after cancellation
    setShowModal(false);
    window.location.reload();
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(), // Use uuid for unique IDs
      doctorName: name,
      doctorSpeciality: speciality,
      doctorExperience: experience,
      doctorRatings: ratings,
      patientName: appointmentData.name,
      phoneNumber: appointmentData.phoneNumber,
      appointmentDate: appointmentData.appointmentDate,
      selectedSlot: appointmentData.selectedSlot,
      bookedAt: new Date().toISOString()
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    
    // Update localStorage for all doctors
    const allAppointments = JSON.parse(localStorage.getItem('doctorAppointments')) || {};
    allAppointments[doctorKey] = updatedAppointments;
    localStorage.setItem('doctorAppointments', JSON.stringify(allAppointments));
    console.log(allAppointments)
    window.location.reload();
    setShowModal(false);
  };

  // Check if this doctor has any appointments
  const isBooked = appointments.length > 0;

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> 
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> 
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
          {/* Status indicator */}
          <div className={`doctor-status ${isBooked ? 'booked' : 'available'}`}>
            {isBooked ? 'Booked' : 'Available'}
          </div>
        </div>
      </div>
      
      <div className="doctor-card-options-container">
        <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button 
              className={`book-appointment-btn ${isBooked ? 'cancel-appointment' : ''}`}
              onClick={() => setShowModal(true)}
            >
              {isBooked ? (
                <div>View/Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> 
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> 
                  </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>
              
              {isBooked ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Patient Name: {appointment.patientName}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date: {appointment.appointmentDate}</p>
                      <p>Time Slot: {appointment.selectedSlot}</p>
                      <p>Booked At: {new Date(appointment.bookedAt).toLocaleString()}</p>
                      <button onClick={() => handleCancel(appointment.id)}>
                        Cancel Appointment
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm 
                  doctorName={name} 
                  doctorSpeciality={speciality}
                  experience={experience} 
                  rating={ratings} 
                  onSubmit={handleFormSubmit} 
                />
              )}
              
              <button 
                onClick={() => setShowModal(false)}
                style={{ margin: '10px', padding: '10px 20px' }}
              >
                Close
              </button>
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCard;
