import React, { useState } from 'react';
import LoginForm from './Components/LoginForm';
import AdminPage from './Components/AdminPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // You can implement your login logic here
    // For simplicity, let's check if the username and password are not empty strings
    if (username.trim() !== '' && password.trim() !== '') {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="App">
      {loggedIn ? <AdminPage /> : <LoginForm handleLogin={handleLogin} />}
    </div>
  );
};

export default App;

