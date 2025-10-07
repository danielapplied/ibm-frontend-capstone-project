import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality,experience, rating,  onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
         const authtoken = sessionStorage.getItem("auth-token");
         if (!authtoken) {
            navigate("/login");
         }
        const storedName = sessionStorage.getItem('name');
        const storedPhone = sessionStorage.getItem('phone');
        if (storedName) setName(storedName);
        if (storedPhone) setPhoneNumber(storedPhone);
    },[]);

    // Available time slots
    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
        '05:00 PM', '05:30 PM'
    ];

    // Get today's date in YYYY-MM-DD format for min date
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ 
            name, 
            phoneNumber, 
            appointmentDate, 
            selectedSlot,
            doctorName,
            doctorSpeciality 
        });
        // Clear form fields after submission
        setName('');
        setPhoneNumber('');
        setAppointmentDate('');
        setSelectedSlot('');
    };

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="appointmentDate">Date of Appointment:</label>
                <input
                    type="date"
                    id="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={getTodayDate()}
                    required
                />
            </div>
             <div className="form-group">
               <label>Book Time Slot:</label>
                <select 
                    className="time-slot-select" 
                    style={{ color: 'black' }}
                    value={selectedSlot || ''}
                    onChange={(e) => handleSlotSelection(e.target.value)}>
                   <option value="" disabled>Choose a time slot</option>
                   {timeSlots.map((slot, index) => (
                   <option key={index} value={slot}>
                   {slot}
                  </option>
                  ))}
               </select>
               {selectedSlot && (
                <p className="selected-slot-info">
                     Selected: {selectedSlot}
                 </p>
               )}
             </div>
            <button 
                type="submit" 
                disabled={!name || !phoneNumber || !appointmentDate || !selectedSlot}>
                Book Now
            </button>
        </form>
    );
};

export default AppointmentForm;
