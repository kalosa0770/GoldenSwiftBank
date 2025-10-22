import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import UserDashboard from "./user-components/UserDashboard";

// 💡 Global Axios Configuration (Crucial for Cookie Auth)
// Ensure this is done once in your main app entry point (e.g., index.jsx or here)
axios.defaults.withCredentials = true;

// 🎯 We no longer rely on localStorage for the *token*. 
// We use a safe local variable for the username (for UI only).
const checkAuthStatus = () => !!localStorage.getItem("userName");

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null); 

    // 💡 EFFECT: Listen for the prompt being set by the script in index.html
    useEffect(() => {
        // We use a timeout because the deferredPrompt might not be set instantly
        const checkPrompt = () => {
            const prompt = window.deferredPrompt;
            if (prompt) {
                setDeferredPrompt(prompt);
                // We clear the global variable so it doesn't leak or confuse future checks
                window.deferredPrompt = null; 
            }
        };

        // Check initially and then set a small interval for robustness
        checkPrompt();
        const interval = setInterval(checkPrompt, 500); 
        
        return () => clearInterval(interval);
    }, []);


    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            console.log("Install prompt is not ready.");
            // If the prompt is null, maybe tell the user to use the browser's menu
            alert("Please use your browser's menu option (usually three dots) to 'Install App' or 'Add to Home Screen'.");
            return;
        }

        // 1. Show the installation prompt
        deferredPrompt.prompt();

        // 2. Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to the install prompt: ${outcome}`);

        // 3. Reset the prompt state regardless of the outcome
        setDeferredPrompt(null);
    };
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
            <p className="text-xl text-gray-700">Checking session...</p>
        </div>
    ); 
  }

  return (
    <div className="font-sans min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage handleInstallClick={handleInstallClick}/>} />

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