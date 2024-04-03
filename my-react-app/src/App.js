import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentDetails from './components/StudentDetails';
import './App.css';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon from react-icons/fa

// Sample student data
const studentsData = [
  {
    "id": 1,
    "name": "John Doe",
    "age": 20,
    "grade": "A",
    "address": "123 Main St",
    "contactNumber": "123-456-7890",
    "sop": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id velit eu nunc commodo commodo."
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "age": 21,
    "grade": "B",
    "address": "456 Elm St",
    "contactNumber": "987-654-3210",
    "sop": "Fusce vel dolor sit amet nulla varius feugiat. Ut lobortis ligula at metus congue venenatis."
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "age": 19,
    "grade": "A+",
    "address": "789 Oak St",
    "contactNumber": "456-789-0123",
    "sop": "Proin sed lorem in ligula sodales interdum nec et mauris. Vivamus nec arcu sed enim interdum suscipit."
  }
];

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1>Student Applications</h1> {/* Changed title to "Student Applications" */}
        <Routes>
          <Route path="/" element={<StudentList students={studentsData} />} />
          <Route path="/student/:studentId" element={<StudentDetailsPage />} /> {/* Changed route element to StudentDetailsPage */}
        </Routes>
      </div>
    </Router>
  );
};

const StudentList = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <FaSearch className="search-icon" /> {/* Search icon */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="student-list">
        {filteredStudents.map(student => (
          <li key={student.id} className="student-item">
            <Link to={`/student/${student.id}`} className="student-link">{student.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// New component to handle the route for displaying student details
const StudentDetailsPage = () => {
  return (
    <>
      <h1>Student Details</h1> {/* Changed title to "Student Details" */}
      <StudentDetails students={studentsData} />
    </>
  );
};

export default App;
