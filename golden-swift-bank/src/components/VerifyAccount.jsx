import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- Send OTP ---
  const handleSendOtp = async () => {
    if (!userId) {
      setMessage('User ID is missing.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/otp/send-verify-otp`, { userId });
      setMessage(res.data.message || 'OTP sent successfully!');
      setOtpSent(true); // ✅ Switch to OTP input after successful send
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Verify OTP ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || !userId) return;
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/otp/verify-email`, { userId, otp });
      setMessage(res.data.message || 'Account verified!');
      navigate('/dashboard', { replace: true }); // ✅ Redirect after verification
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Verify Your Account</h1>

      {message && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-md w-full max-w-xs text-center">
          {message}
        </div>
      )}

      {/* Step 1: Show Send OTP button */}
      {!otpSent && (
        <button
          onClick={handleSendOtp}
          disabled={isLoading}
          className={`py-3 px-6 rounded-xl font-bold transition-all ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      )}

      {/* Step 2: Show OTP form after sending */}
      {otpSent && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 w-full max-w-xs mt-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-3 border rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`py-3 rounded-xl font-bold transition-all ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}
    </div>
  );
};

export default VerifyAccount;
