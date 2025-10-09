import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserDashboard from './user-components/UserDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <main className="relative min-h-screen bg-gray-50 font-[sans] antialiased">
      <BrowserRouter>
        {!isLoggedIn ? (
          <LoginForm isLoggedin={loginSuccess} />
        ) : (
          <UserDashboard />
        )}
      </BrowserRouter>
    </main>
  );
}

export default App;