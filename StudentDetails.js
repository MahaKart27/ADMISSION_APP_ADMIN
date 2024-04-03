import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDetails = ({ students }) => {
  const { studentId } = useParams();
  const student = students.find(student => student.id === parseInt(studentId));

  if (!student) {
    return <div>Student not found</div>;
  }

  const handleAccept = () => {
    // Implement your logic for accepting here
  };

  const handleDeny = () => {
    // Implement your logic for denying here
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
              <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '8px 16px', borderRadius: '4px' }} onClick={() => handleAccept(student.id, student.email, student.name)}>Accept</button>
              <button style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', borderRadius: '4px' }} onClick={() => handleDeny(student.id, student.email, student.name)}>Deny</button>
            </div>

      <div>
        <h2>Personal Details</h2>
        <ul>
          <li>ID: {student.id}</li>
          <li>Name: {student.name}</li>
          <li>Father's name: {student.fathername}</li>
          <li>Email: {student.email}</li>
          <li>Phone Number: {student.phonenumber}</li>
          <li>Age: {student.age}</li>
        </ul>
      </div>

      <div>
        <h2>Education Details</h2>
        {/* Add personal details here */}
        <ul>
          <li>highest qualification: {student.highestqualification}</li>
          {/* <li>Contact Number: {student.contactNumber}</li> */}
          {/* Add more personal details as needed */}
        </ul>
      </div>

      <div>
        <h2>Statement of Purpose (SOP)</h2>
        <p>{student.sop}</p>
        {/* Add more sections as needed for achievements, extracurricular activities, etc. */}
      </div>
    </div>
  );
};

export default StudentDetails;