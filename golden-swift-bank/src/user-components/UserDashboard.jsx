import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import all required components (assuming they exist)
import Header from './Header'; 
import Greeting from './Greeting'; 
import ActionButtons from './ActionButtons'; 
import MyWallets from './MyWallets'; 
import VirtualCard from './VirtualCard'; 
import FooterNav from './FooterNav';
import Sidebar from './Sidebar'; 

// 💡 Ensure axios is configured globally with credentials:
// axios.defaults.withCredentials = true;

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';


const UserDashboard = ({onLogout}) => {
    const navigate = useNavigate();
    
    // We keep the local storage name for immediate UI display, but don't trust it for auth
    const [uiUserName, setUiUserName] = useState(localStorage.getItem('userName') || 'User');
    
    // 💡 NEW STATE: Tracks if the secure cookie is validated
    const [isSessionValid, setIsSessionValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 💡 EFFECT: Check the secure cookie status on component mount
    useEffect(() => {
        const verifySession = async () => {
            try {
                // HITS THE PROTECTED BACKEND ENDPOINT
                const response = await axios.get(`${API_BASE_URL}/api/auth/verify-session`);
                
                if (response.status === 200 && response.data.isAuthenticated) {
                    setIsSessionValid(true);
                    // Update UI name with verified name from the backend payload (if provided)
                    if (response.data.firstName && response.data.firstName !== uiUserName) {
                        setUiUserName(response.data.firstName);
                        localStorage.setItem('userName', response.data.firstName);
                    }
                } else {
                    // Unexpected response (e.g., token expired but server didn't send 401)
                    handleFailedAuth();
                }
            } catch (error) {
                // 401 Unauthorized or Network Error -> Cookie is invalid or missing.
                console.error("Session verification failed:", error.response?.statusText || "Network Error");
                handleFailedAuth();
            } finally {
                setIsLoading(false);
            }
        };

        const handleFailedAuth = () => {
            // Force logout state if the cookie check fails
            if (onLogout) {
                onLogout(); 
            } else {
                // Fallback navigation if onLogout isn't passed correctly
                localStorage.removeItem('userName');
                navigate('/login', { replace: true });
            }
        };

        verifySession();
    }, [navigate, onLogout, uiUserName]);


    if (isLoading) {
        // Show a loading screen while checking the session
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-gray-700">Loading Dashboard...</p>
            </div>
        );
    }

    if (!isSessionValid) {
        // App.jsx routing should handle the redirect, but this is a safeguard.
        return null; 
    }
    
    // RENDER DASHBOARD ONLY IF SESSION IS VALID
    return (
        <div className="relative md:grid md:grid-cols-[250px_1fr] min-h-screen bg-gray-50 w-full"> 
            
            {/* Sidebar (Desktop/Tablet View) */}
            <div className="hidden md:block h-full border-r border-gray-200 shadow-lg">
                <Sidebar onLogout={onLogout} /> 
            </div>

            {/* Main Content Column */}
            <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-10 bg-white pt-4 pb-3 border-b border-gray-200 shadow-sm transition duration-300 px-4">
                    <Header />
                </header>
                
                {/* Main Content Scrollable Area */}
                <main className='flex flex-col p-4 gap-8 flex-grow overflow-y-auto no-scrollbar'>
                    
                    <Greeting userName={uiUserName} />
                    <ActionButtons />
                    
                    <MyWallets />
                    <VirtualCard />
                    
                    {/* Spacer for FooterNav on mobile */}
                    <div className="h-20 sm:h-6"></div> 
                </main>
                
                {/* Footer Navigation (typically fixed/mobile-only) */}
                <FooterNav onLogout={onLogout} />
            </div>
        </div>
    );
}

export default UserDashboard;