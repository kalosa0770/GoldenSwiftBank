import React, { useState, useEffect, useCallback } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import UserDashboard from "./user-components/UserDashboard";

const checkAuthStatus = () => !!localStorage.getItem("authToken");

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus);
  const navigate = useNavigate();

  // Use useCallback to define the function that updates the state and navigates
  const handleLoginSuccess = useCallback(() => {
    // 1. Update state immediately to trigger re-render
    setIsAuthenticated(true);
    // 2. Navigate to the protected route
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  // Set up an effect to listen for changes in localStorage for manual changes (optional, but robust)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(checkAuthStatus());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = useCallback(() => {
    // 1. Clear local storage data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName"); 
    
    // 2. Update state to false, forcing App to re-render immediately
    setIsAuthenticated(false); 
    
    // 3. Navigate to login (the redirect logic in the routes handles the rest)
    navigate('/login', { replace: true, state: { message: "You have been logged out.", type: 'success' } });
  }, [navigate]);

  
  return (
    <div className="font-sans min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Signup Route: If authenticated, redirect to Dashboard */}
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />}
        />

        {/* Login Route: If authenticated, redirect to Dashboard */}
        <Route
          path="/login"
          // Pass the corrected handler function
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm onLoginSuccess={handleLoginSuccess}/>}
        />

        {/* Protected Dashboard: If NOT authenticated, redirect to Login */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <UserDashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;