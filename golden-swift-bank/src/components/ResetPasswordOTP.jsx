import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import manImg from '../assets/manImg.jpeg';

const VITE_BASE_URL = import.meta.env.VITE_APP_API_URL;
const API_BASE_URL = VITE_BASE_URL || 'http://localhost:3001';

const passwordRules = [
    { text: "At least 8 characters", regex: /.{8,}/ },
    { text: "At least one uppercase letter", regex: /(?=.*[A-Z])/ },
    { text: "At least one lowercase letter", regex: /(?=.*[a-z])/ },
    { text: "At least one number", regex: /(?=.*\d)/ },
];

const ResetPasswordOTP = () => {
    // State passed from ForgotPassword component (contains the email)
    const location = useLocation();
    const navigate = useNavigate();
    const emailFromState = location.state?.email;

    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const [passwordValidations, setPasswordValidations] = useState(passwordRules.map(rule => ({ ...rule, valid: false })));

    // Redirect if no email is found (user navigated directly)
    if (!emailFromState) {
        navigate('/forgot-password', { replace: true, state: { message: "Please enter your email first.", type: 'warning' } });
        return null;
    }

    const togglePassword = () => setShowPassword(!showPassword);

    const checkPasswordComplexity = (password) => {
        setPasswordValidations(passwordRules.map(rule => ({
            ...rule,
            valid: rule.regex.test(password),
        })));
    };

    const isPasswordValid = passwordValidations.every(rule => rule.valid);
    const passwordsMatch = newPassword === confirmPassword;
    const isFormValid = otp && newPassword && confirmPassword && isPasswordValid && passwordsMatch;

    const handleBack = () => {
        window.history.back();
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
        checkPasswordComplexity(e.target.value);
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        
        if (!isFormValid) {
            setError("Please correct all errors before submitting.");
            return;
        }

        setIsLoading(true);

        try {
            // ⭐ 1. POST request to the final reset endpoint ⭐
            const response = await axios.post(`${API_BASE_URL}/api/reset`, {
                email: emailFromState, // We use the email to find the user
                otp: otp.trim(),       // Send the OTP
                newPassword: newPassword.trim(), // Send the new password
            });

            // 2. Success
            if (response.data.success) {
                setMessage(response.data.message || 'Password reset successful! Redirecting to login.');
                
                setTimeout(() => {
                    navigate('/login', { replace: true, state: { message: "Your password has been reset successfully. Please log in.", type: 'success' } });
                }, 2000); 
            } else {
                setError(response.data.message || 'Reset failed. Check your OTP and try again.');
            }

        } catch (err) {
            const responseMessage = err.response?.data?.message || 'Error processing request. Please try again.';
            setError(responseMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setMessage('');
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/otp/send-reset-otp`, { 
                email: emailFromState
            });
            setMessage(response.data.message || 'New OTP sent. Check your email!');
        } catch (err) {
            setError(err.response?.data?.message || 'Error resending OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen w-full items-center justify-center font-sans p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-gray-800 to-black opacity-90" />
            
            <div className="relative z-10 flex flex-col w-full items-center justify-center">
                <button onClick={handleBack} className='py-3 px-4 bg-amber-700 text-white absolute rounded-2xl left-6 top-6 cursor-pointer'>Back</button>
                
                <div className="md:flex block w-full max-w-4xl bg-white rounded-2xl shadow-2xl shadow-blue-500/60 overflow-hidden mt-20">

                    {/* Left: Image Column */}
                    <div className="md:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 flex items-center justify-center">
                        <img 
                            src={manImg} 
                            alt="Professional using a laptop" 
                            className="w-full h-full object-cover rounded-xl shadow-lg" 
                            style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Right: Form Column */}
                    <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Reset Password</h1>
                        <p className="text-gray-600 text-center mb-6">OTP sent to: <span className="font-bold text-amber-600">{emailFromState}</span></p>

                        {/* Status Messages */}
                        {error && <div className="text-red-500 bg-red-50 p-3 rounded-xl text-sm font-medium mb-4">{error}</div>}
                        {message && <div className="text-green-700 bg-green-100 p-3 rounded-xl text-sm font-medium mb-4">{message}</div>}
                        
                        <form onSubmit={handleReset} className="flex flex-col gap-5">
                            
                            {/* OTP Field */}
                            <div className="flex flex-col">
                                <label className='text-lg text-gray-600 mb-2'>Verification Code (OTP)</label>
                                <input 
                                    type="text" 
                                    name="otp" 
                                    placeholder="Enter 6-digit OTP" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    maxLength={6}
                                    required 
                                    className="border border-gray-300 p-3 rounded-xl w-full text-center tracking-[0.5em] focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" 
                                />
                            </div>

                            {/* New Password Field */}
                            <div className="w-full relative">
                                <label className='text-gray-600 text-lg mb-2 block'>New Password</label>
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    name="newPassword" 
                                    placeholder="New Password" 
                                    value={newPassword} 
                                    onChange={handlePasswordChange} 
                                    required 
                                    className="border p-3 rounded-xl w-full pr-12 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" 
                                />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="w-full relative">
                                <label className='text-gray-600 text-lg mb-2 block'>Confirm Password</label>
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    name="confirmPassword" 
                                    placeholder="Confirm New Password" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    required 
                                    className={`border p-3 rounded-xl w-full pr-12 focus:ring-1 transition 
                                        ${confirmPassword && !passwordsMatch ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'}`} 
                                />
                                <button 
                                    type="button" 
                                    onClick={togglePassword} 
                                    className="absolute inset-y-0 right-0 top-[35px] flex items-center pr-3 text-sm text-gray-500 hover:text-gray-800"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                                {!passwordsMatch && confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
                                )}
                            </div>

                            {/* Password Rules */}
                            <div className="w-full text-sm mt-[-10px] p-3 bg-gray-50 rounded-xl">
                                <p className="font-bold text-gray-700 mb-2">New Password Requirements:</p>
                                <ul className="grid grid-cols-2 gap-1">
                                    {passwordValidations.map((rule, idx) => (
                                        <li key={idx} className={`flex items-center text-xs font-medium ${rule.valid ? 'text-green-600' : 'text-red-500'}`}>
                                            {rule.valid ? <CheckCircle size={14} className="mr-2 min-w-[14px]" /> : <XCircle size={14} className="mr-2 min-w-[14px]" />}
                                            {rule.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={!isFormValid || isLoading}
                                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 
                                    ${isFormValid && !isLoading ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/50' : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-70'}`}
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </button>

                            {/* Resend Button */}
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={isLoading}
                                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 disabled:bg-blue-400"
                            >
                                Resend OTP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordOTP;
