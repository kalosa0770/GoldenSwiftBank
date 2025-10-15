// App.js 
import React from 'react'; // NOTE: Removed useState
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import UserDashboard from './user-components/UserDashboard';
import './App.css';

// 💡 NEW HELPER FUNCTION: This is the source of truth for auth status
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

function App() {
  // 💡 REMOVED: isLoggedIn state and loginSuccess function
  const navigate = useNavigate();

  // (Keeping these handlers for navigation buttons, which is fine)
  const handleSignUpClick = () => { navigate('/signup'); }
  const handleLoginClick = () => { navigate('/login'); };

  return (
    <main className="relative min-h-screen bg-gray-50 font-[sans] antialiased">
      <Routes>
        <Route path="/" element={<HomePage onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick}/>} />
        
        {/* The Signup Route */}
        <Route
          path="/signup"
          element={
            // If logged in, redirect to dashboard
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignUp /> // Now just renders the component
            )
          }
        />
        
        {/* The Login Route */}
        <Route
          path="/login"
          element={
            // If logged in, redirect to dashboard
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginForm /> // Now just renders the component
            )
          }
        />
        
        {/* The Dashboard Route (Protected) */}
        <Route
          path="/dashboard"
          element={
            // Check localStorage directly for access
            isAuthenticated() ? (
              <UserDashboard />
            ) : (
              // Redirect to login if no token is found
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </main>
  );
}

export default App;