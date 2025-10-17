import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import UserDashboard from "./user-components/UserDashboard";

// 🔑 FIX: Check for the correct 'authToken' key 🔑
const isAuthenticated = () => !!localStorage.getItem("authToken"); 

function App() {
  const loginSuccess = () => isAuthenticated;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Signup Route: If authenticated, redirect to Dashboard */}
      <Route
        path="/signup"
        element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <SignUp />}
      />

      {/* Login Route: If authenticated, redirect to Dashboard */}
      <Route
        path="/login"
        element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <LoginForm onLoginSuccess={loginSuccess}/>}
      />

      {/* Protected Dashboard: If NOT authenticated, redirect to Login */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? <UserDashboard /> : <Navigate to="/login" replace />
        }
      />

      {/* Catch-all: redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;