import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDetails = ({ students }) => {
  const { studentId } = useParams();
  const student = students.find(student => student.id === parseInt(studentId));

  if (!student) {
    return <div>Student not found</div>;
  }

  const handleAccept = async () => {
    try {
      // Make a POST request to your backend endpoint for sending emails
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: student.email,
          message: 'Notification sent to student registered email',
        }),
      });
      
      if (response.ok) {
        alert('Notification sent to student registered email');
        // Redirect to another page if needed
        // history.push('/notification');
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send notification');
    }
  };

  const handleDeny = async () => {
    try {
      // Make a POST request to your backend endpoint for denying the application
      const response = await fetch('/api/deny-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: student.email,
          message: 'Application denied',
        }),
      });
      
      if (response.ok) {
        alert('Application denied successfully');
        // Redirect or perform other actions as needed
      } else {
        throw new Error('Failed to deny application');
      }
    } catch (error) {
      console.error('Error denying application:', error);
      alert('Failed to deny application');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
        <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '8px 16px', borderRadius: '4px' }} onClick={handleAccept}>Accept</button>
        <button style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', borderRadius: '4px' }} onClick={handleDeny}>Deny</button>
      </div>

      <div>
        <h2>Personal Details</h2>
        <ul>
          <li>ID: {student.id}</li>
          <li>Name: {student.name}</li>
          <li>Father's name: {student.fathers_name}</li>
          <li>Email: {student.email}</li>
          <li>Phone Number: {student.phone_number}</li>
          <li>Age: {student.age}</li>
        </ul>
      </div>

      <div>
        <h2>Education Details</h2>
        <ul>
          <li>Highest Qualification: {student.highestqualification}</li>
        </ul>
      </div>

      <div>
        <h2>Statement of Purpose (SOP)</h2>
        <p>{student.sop}</p>
      </div>
    </div>
  );
};

export default StudentDetails;

