// Reports.jsx
import React from 'react';
import './ReportsLayout.css';

const Reports = () => {
  const data = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      specialty: 'Dermatology',
    },
  ];

  return (
    <div className="reports-container" style={{ marginTop: '10%' ,width:'100%', marginLeft:'-105%'}}>
      <h1>Reports</h1>
      <table className="reports-table" style={{ width: '900px' }}>
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
          {data.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
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