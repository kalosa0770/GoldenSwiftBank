import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import VerifyAccount from "./components/VerifyAccount";
import UserDashboard from "./user-components/UserDashboard";

axios.defaults.withCredentials = true; // crucial for cookies

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking
  const [unverifiedUserId, setUnverifiedUserId] = useState(null); // for OTP resend
  const navigate = useNavigate();

  // --- Login Success Handler ---
  const handleLoginSuccess = useCallback((userName, isVerified, userId) => {
    if (userName) localStorage.setItem("userName", userName);

    if (isVerified) {
      // 1. Set Auth State (This triggers the navigation in the useEffect below)
      setIsAuthenticated(true); 
    } else {
      // Handle unverified user case
      setUnverifiedUserId(userId);
      // We still redirect to verify-account immediately if this is the flow needed.
      navigate("/verify-account", { replace: true });
    }
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    navigate('/login', { replace: true, state: { message: "You have been logged out.", type: 'success' } });
  }, [navigate]);

  // --- Verify initial session ---
  useEffect(() => {
    const verifyInitialSession = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/verify-session`);
        // We can use the response to check if the session is verified
        if (response.data.isAuthenticated) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
        localStorage.removeItem("userName");
      }
    };
    verifyInitialSession();
  }, []);
  
  // --- FIX: Navigation Effect ---
  // This useEffect ensures navigation only happens *after* isAuthenticated has updated to true.
  useEffect(() => {
    if (isAuthenticated === true) {
        navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);


  // --- Loading state herer ---
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-4"></div>
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    </div>
    );
  }

  return (
    <div className="font-nunito min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <SignUp />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <LoginForm onLoginSuccess={handleLoginSuccess} />
          }
        />

        {/* Verify Account */}
        <Route
          path="/verify-account"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <VerifyAccount unverifiedUserId={unverifiedUserId} />
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <UserDashboard onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
