import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import UserDashboard from './user-components/UserDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <main className="relative min-h-screen bg-gray-50 font-[sans] antialiased">
      <Routes>
        <Route path="/" element={<HomePage onLoginClick={handleLoginClick} />} />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginForm isLoggedin={loginSuccess} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </main>
  );
}

export default App;