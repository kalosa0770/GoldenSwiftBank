import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import manImg from '../assets/manImg.jpeg';

const VITE_BASE_URL = import.meta.env.VITE_APP_API_URL;
const API_BASE_URL = VITE_BASE_URL || 'http://localhost:3001';

const LoginForm = ({ onLoginSuccess }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [statusMessage, setStatusMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userIdToVerify, setUserIdToVerify] = useState(null);
    const [otpSending, setOtpSending] = useState(false);

    useEffect(() => {
        if (location.state?.message) {
            setStatusMessage({ text: location.state.message, type: location.state.type || 'success' });
            navigate(location.pathname, { replace: true, state: {} }); 
        }
    }, [location.state, navigate, location.pathname]);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const togglePassword = () => setShowPassword(!showPassword);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setStatusMessage(null);
        setUserIdToVerify(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth`, data, {
                withCredentials: true,
            });

            const { userName, isAccountVerified, userId } = response?.data;

            if (!isAccountVerified) {
                // Show message and store userId for sending OTP
                setStatusMessage({
                    text: 'Your account is not verified. Click below to resend OTP.',
                    type: 'warning'
                });
                setUserIdToVerify(userId);
                return;
            }

            // Successful login
            if (userName) {
                localStorage.setItem("userName", userName);
                if (onLoginSuccess) onLoginSuccess(userName);
                setStatusMessage({
                    text: 'Login successful!',
                    type: 'success'
                });
                setTimeout(() => navigate('/dashboard'), 1000);
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!userIdToVerify) return;

        setOtpSending(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/email/send-verify-otp`, { userId: userIdToVerify });
            if (response.data.success) {
                setStatusMessage({ text: 'OTP sent! Please check your email.', type: 'success' });
            } else {
                setStatusMessage({ text: response.data.message || 'Failed to send OTP.', type: 'error' });
            }
        } catch (err) {
            setStatusMessage({ text: err.response?.data?.message || 'Error sending OTP.', type: 'error' });
        } finally {
            setOtpSending(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-gray-100 font-sans p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-sky-400 opacity-90" />

            <div className="relative z-10 flex w-full items-center justify-center">
                <div className="md:flex block w-full max-w-4xl bg-white rounded-2xl shadow-2xl shadow-blue-500/60 overflow-hidden">

                    {/* Left Column */}
                    <div className="md:w-1/2 bg-indigo-700 p-8">
                        <img 
                            src={manImg} 
                            alt="Professional using a laptop" 
                            className="w-full h-full object-cover rounded-xl shadow-lg" 
                        />
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                        {statusMessage && (
                            <div className={`p-3 mb-4 rounded-xl text-center font-medium transition-all duration-300
                                ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 
                                  statusMessage.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'}`}>
                                {statusMessage.text}
                            </div>
                        )}
                        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Login to your account</h1>
                        <form onSubmit={handleLogin} className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <label className='text-lg text-gray-600 mb-2'>Email address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    value={data.email} 
                                    onChange={handleChange} 
                                    required 
                                    className="border border-gray-300 p-3 rounded-xl w-full focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" 
                                />
                            </div>
                            <div className="w-full flex gap-2">
                                <div className="flex flex-col w-full">
                                    <label className='text-gray-600 text-lg mb-2'>Password</label>
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        name="password" 
                                        placeholder="Password" 
                                        value={data.password} 
                                        onChange={handleChange} 
                                        required 
                                        className="border p-3 rounded-xl w-full pr-24 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" 
                                    />
                                </div>
                                <button type="button" onClick={togglePassword} className="py-2 px-3 text-gray-700 text-sm mt-6">
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {error && <div className="text-red-500 bg-red-50 p-2 rounded-xl text-sm font-medium">{error}</div>}

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 
                                ${isLoading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/50'}`}
                            >
                                {isLoading ? 'Logging In...' : 'Login'}
                            </button>

                            {userIdToVerify && (
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={otpSending}
                                    className="w-full py-2 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300"
                                >
                                    {otpSending ? 'Sending OTP...' : 'Resend OTP'}
                                </button>
                            )}

                            <div className="flex justify-center w-full mt-4 text-sm text-gray-600">
                                Don't have an account? 
                                <Link to="/signup" className="text-blue-600 font-bold ml-1 hover:text-amber-700 transition">Sign up here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
