import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import components
import Header from './Header';
import Greeting from './Greeting';
import ActionButtons from './ActionButtons';
import RecentActivities from './RecentActivities';
import MyWallets from './MyWallets';
import VirtualCard from './VirtualCard';
import FooterNav from './FooterNav';
import Sidebar from './Sidebar';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

const UserDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // Verified user name from backend
  const [uiUserName, setUiUserName] = useState(localStorage.getItem('userName'));
  
  // Track session validity
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/verify-session`, {
          withCredentials: true
        });

        if (response.status === 200) {
          const { userName, isAccountVerified, _id } = response.data;

          if (!isAccountVerified) {
            // Redirect unverified users to OTP page
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

  if (!isSessionValid) return null; // Safeguard

  return (
    <div className="font-nunito relative md:grid md:grid-cols-[250px_1fr] min-h-screen flex flex-col bg-gray-50 w-full">
      {/* Sidebar */}
      <div className="hidden md:block h-full border-r border-gray-200 shadow-lg">
        <Sidebar onLogout={onLogout} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white pt-4 pb-3 border-b border-gray-200 shadow-sm px-4">
          <Header />
        </header>

        <main className="flex flex-col overflow-y-auto scroll-smooth mx-auto md:p-20 p-10 w-full gap-8 flex-grow no-scrollbar">
          <Greeting userName={uiUserName} />
          <ActionButtons />
          <RecentActivities />
          <MyWallets />
          <VirtualCard 
            bank="GoldenSwift Bank"
            cardNumber="4567890123456789"
            cardHolder={uiUserName || "User"}
            expiry="12/29"
            className="w-full max-w-md mx-auto" 
          />

          {/* Spacer for footer */}
          <div className="h-20 sm:h-6" />
        </main>

        <FooterNav onLogout={onLogout} />
      </div>
    </div>
  );
};

export default UserDashboard;
