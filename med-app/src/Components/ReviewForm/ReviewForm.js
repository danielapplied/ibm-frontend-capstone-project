import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isData,setCheck] = useState(false);

  useEffect(() => {
    const data_ = JSON.parse(localStorage.getItem('doctorAppointments')) || [];
    const data = Object.values(data_).flat()
    if( data.length > 0 )
     {
      setCheck(true);
     }
    else{
       setCheck(false);
     }
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (loggedIn==="true") {
      setIsLoggedIn(true);
     }
    if (data ){
      setDoctorData(data);
    }
  }, []);

  const handleFeedbackClick = (id) => {
    setSelectedDoctorId(id);
    setReviewText('');
    setReviewerName('');
    setRating(0);
  };

  const handleSubmitReview = () => {
    if (!reviewText || !reviewerName || rating === 0) return;

    setReviews((prev) => ({
      ...prev,
      [selectedDoctorId]: {
        name: reviewerName,
        text: reviewText,
        rating,
      },
    }));

    setSelectedDoctorId(null);
  };

  return (
    <div className="review-container" style={{ marginTop: '10%', width: '60%', marginLeft: '20%' }}>
     { isLoggedIn && isData && (
       <>
      <h1>Reviews</h1>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctorData.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.doctorName}</td>
              <td>{doctor.doctorSpeciality}</td>
              <td>
                <button
                  className="feedback-button"
                  onClick={() => handleFeedbackClick(doctor.id)}
                >
                  Click Here
                </button>
              </td>
              <td className="review-placeholder">
                {reviews[doctor.id] ? (
                  <div>
                    <strong>{reviews[doctor.id].name}</strong>: {reviews[doctor.id].text}
                    <br />
                    Rating: {'★'.repeat(reviews[doctor.id].rating)}
                  </div>
                ) : (
                <button  disabled
                  className="feedback-button" style={{backgroundColor: 'gray', cursor: 'not-allowed'}}
                  onClick={() => handleFeedbackClick(doctor.id)}
                  >
                  View Review
                </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       </>
      )}
      { selectedDoctorId && (
        <div className="review-form">
          <h2>Give Your Review</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
          />
          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'star selected' : 'star'}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button className="submit-button" onClick={handleSubmitReview}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;