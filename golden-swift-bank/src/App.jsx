import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import VerifyAccount from "./components/VerifyAccount";
import UserDashboard from "./user-components/UserDashboard";
import { LoaderPinwheel } from 'lucide-react';

// 💡 Global Axios Configuration (Crucial for Cookie Auth)
// Ensure this is done once in your main app entry point (e.g., index.jsx or here)
axios.defaults.withCredentials = true;

// 🎯 We no longer rely on localStorage for the *token*. 
// We use a safe local variable for the username (for UI only).
const checkAuthStatus = () => !!localStorage.getItem("userName");

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

function App() {
  // 💡 FIX 1: Set initial state to null to represent 'checking session'
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const navigate = useNavigate();

  // --- Session Management Handlers ---

  const handleLoginSuccess = useCallback((userName) => {
    // The cookie is set by the backend. We only save the UI name and update state.
    if (userName) {
        localStorage.setItem("userName", userName);
    }
    setIsAuthenticated(true);
    // Navigate after setting state
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
        // 💡 Call backend to explicitly clear the secure HTTP-only cookie
        await axios.post(`${API_BASE_URL}/api/auth/logout`);
    } catch (error) {
        console.error("Logout failed to clear server cookie:", error);
    }
    
    // Clear local non-sensitive data
    localStorage.removeItem("userName"); 
    
    // Update state and navigate
    setIsAuthenticated(false); 
    navigate('/login', { replace: true, state: { message: "You have been logged out.", type: 'success' } });
  }, [navigate]);

  // --- Authentication Check (Replaces synchronous checkAuthStatus) ---

  // 💡 FIX 2: Check the secure cookie status on initial app load using the backend.
  useEffect(() => {
    const verifyInitialSession = async () => {
      try {
        // Hitting the protected endpoint will succeed only if the browser sends a valid cookie.
        await axios.get(`${API_BASE_URL}/api/auth/verify-session`);
        setIsAuthenticated(true); // Cookie is valid!
      } catch (error) {
        // If request fails (401 unauthorized or network error), the cookie is invalid/expired.
        setIsAuthenticated(false); 
        localStorage.removeItem("userName"); // Clear stale UI name
      }
    };
    
    // Run session check once on component mount
    verifyInitialSession();
  }, []);

  // --- Render Logic ---
  
  // 💡 FIX 3: Show loading state while isAuthenticated is null
  if (isAuthenticated === null) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-gray-700">
              Loading data... 
            </p>
        </div>
    ); 
  }

  return (
    <div className="font-nunito min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Signup Route */}
        <Route
          path="/signup"
          // Pass the success handler to SignUp to maintain flow
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp onLoginSuccess={handleLoginSuccess} />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          // Pass the corrected handler function
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm onLoginSuccess={handleLoginSuccess}/>}
        />

        <Route
          path="/verify-account"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <VerifyAccount />}
        />


        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <UserDashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;