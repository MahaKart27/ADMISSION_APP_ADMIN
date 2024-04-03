import React from 'react';
import { Link } from 'react-router-dom';

const Student = ({ student }) => {
  return (
    <li>
      <Link to={`/student/${student.id}`}>{student.name}</Link>
    </li>
  );
};

export default Student;
