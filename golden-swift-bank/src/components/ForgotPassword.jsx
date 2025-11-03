import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import manImg from '../assets/manImg.jpeg';

const VITE_BASE_URL = import.meta.env.VITE_APP_API_URL;
const API_BASE_URL = VITE_BASE_URL || 'http://localhost:3001';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      // 1. Send the email to the backend endpoint
      const response = await axios.post(`${API_BASE_URL}/api/otp/send-reset-otp`, { 
        email: email.trim() // Trim the email before sending
      });

      // 2. Success: The backend sends the OTP email and returns success: true
      if (response.data.success) {
        setMessage(response.data.message || 'Password reset OTP sent. Check your email!');
        
        // 3. Navigate to a page where the user can enter the OTP and new password
        // We pass the email in state so the next component knows which user it is verifying.
        // NOTE: The backend should handle finding the user by email/ID in the OTP verification step.
        setTimeout(() => {
          navigate('/reset-password-otp', { state: { email: email.trim() } });
        }, 2000); 

      } else {
        // Handle explicit backend failure (e.g., email not found, though backend handles 404)
        setError(response.data.message || 'Request failed. Please try again.');
      }

    } catch (err) {
      // Handle 404/400 errors from the backend
      const responseMessage = err.response?.data?.message || 'Error sending request. Check your email address.';
      setError(responseMessage);
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
            <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Forgot Password?</h1>
            <p className="text-gray-600 text-center mb-6">Enter your email address below and we'll send you a password reset OTP.</p>

            {/* Status Messages */}
            {error && <div className="text-red-500 bg-red-50 p-3 rounded-xl text-sm font-medium mb-4">{error}</div>}
            {message && <div className="text-green-700 bg-green-100 p-3 rounded-xl text-sm font-medium mb-4">{message}</div>}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className='text-lg text-gray-600 mb-2'>Email address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="border border-gray-300 p-3 rounded-xl w-full focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading || !email}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 
                  ${(isLoading || !email) ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/50'}`}
              >
                {isLoading ? 'Sending OTP...' : 'Send Reset OTP'}
              </button>
            </form>

            <div className="text-sm mt-4 text-gray-600 text-center">
              Remember your password? 
              <span onClick={() => navigate('/login')} className="text-blue-600 font-bold ml-1 hover:text-amber-700 transition cursor-pointer">Log in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;