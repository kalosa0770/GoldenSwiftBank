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

    if (!isVerified) {
      // Show OTP resend option
      setUnverifiedUserId(userId);
      navigate("/verify-account", { replace: true });
      return;
    }

    setIsAuthenticated(true);
    navigate('/dashboard', { replace: true });
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
        await axios.get(`${API_BASE_URL}/api/auth/verify-session`);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        localStorage.removeItem("userName");
      }
    };
    verifyInitialSession();
  }, []);

  // --- Loading state ---
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Loading...</p>
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
              ? <Navigate to="/login" replace />
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
              ? <Navigate to="/login" replace />
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
