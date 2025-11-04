import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import components
import Header from './Header';
import Greeting from './Greeting';
import DashboardWidgets from './DashboardWidgets';
import Chatbot from './Chatbot';
import MyWallets from './MyWallets';
import VirtualCard from './VirtualCard';
import FooterNav from './FooterNav';
import Sidebar from './Sidebar';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

const UserDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [uiUserName, setUiUserName] = useState(localStorage.getItem('userName'));
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/verify-session`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          const { userName, isAccountVerified, _id } = response.data;

          if (!isAccountVerified) {
            navigate('/verify-account', { state: { userId: _id } });
            return;
          }

          setIsSessionValid(true);

          if (userName) {
            setUiUserName(userName);
            localStorage.setItem('userName', userName);
          }
        } else {
          handleFailedAuth();
        }
      } catch (error) {
        console.error("Session verification failed:", error.response?.statusText || "Network Error");
        handleFailedAuth();
      } finally {
        setIsLoading(false);
      }
    };

    const handleFailedAuth = () => {
      if (onLogout) onLogout();
      localStorage.removeItem('userName');
      navigate('/login', { replace: true });
    };

    verifySession();
  }, [navigate, onLogout]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Loading Dashboard...</p>
      </div>
    );
  }

  if (!isSessionValid) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 font-nunito">
      {/* Sidebar */}
      <div className="hidden md:block md:w-[250px] border-r border-gray-200 shadow-lg">
        <Sidebar onLogout={onLogout} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white pt-4 pb-3 border-b border-gray-200 shadow-sm px-4">
          <Header />
        </header>

        {/* Scrollable Main */}
        <main className="flex flex-col flex-1 gap-8 px-6 md:px-10 py-8 overflow-y-auto no-scrollbar">
          
          {/* Greeting + Balance */}
          <Greeting userName={uiUserName} />

          {/* Quick Action Buttons */}
          {/* <ActionButtons /> */}

          {/* Dashboard Widgets: Recent Activities, SmartTip, Announcements, Shortcut Access */}
          <DashboardWidgets />

          {/* Wallets and Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MyWallets />
            <VirtualCard
              bank="GoldenSwift Bank"
              cardNumber="4567890123456789"
              cardHolder={uiUserName || "User"}
              expiry="12/29"
              className="w-full max-w-md"
            />
          </div>
          <Chatbot />

          {/* Spacer for Footer */}
          <div className="h-20 sm:h-6" />
        </main>

        {/* Footer Navigation */}
        <FooterNav onLogout={onLogout} />

        {/* Floating AI Chatbot */}
        
      </div>
    </div>
  );
};

export default UserDashboard;
