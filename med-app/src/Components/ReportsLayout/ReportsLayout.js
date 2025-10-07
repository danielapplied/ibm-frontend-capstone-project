// Reports
import React, { useEffect, useState } from 'react';
import './ReportsLayout.css';

const Reports = () => {

  const [doctorData, setDoctorData] = useState([]);
  const [isData,setCheck] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <div className="reports-container" style={{ marginTop: '10%' ,width:'100%', marginLeft:'-145%'}}>
      <h1>Reports</h1>
      <table className="reports-table" style={{ width: '1100px' }}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {doctorData.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.doctorName}</td>
              <td>{doctor.doctorSpeciality}</td>
              <td>
                <a href='patient_report.pdf' 
                 className="action-button view">View Report</a>
              </td>
              <td>
                <a  href='#'download="patient_report.pdf" 
                    className="action-button download">Download Report</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;