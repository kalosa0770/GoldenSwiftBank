import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalProgress, setModalProgress] = useState(100);

  useEffect(() => {
    if (location.state?.message) {
      setStatusMessage({ text: location.state.message, type: location.state.type || 'success' });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleChange = ({ currentTarget: input }) => setData({ ...data, [input.name]: input.value });
  const togglePassword = () => setShowPassword(!showPassword);

  const handleBack = () => {
    window.history.back();
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setStatusMessage(null);
    setUserIdToVerify(null);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth`, data, { withCredentials: true });
      console.log("Login response:", response.data);
      const { userName, isAccountVerified, userId } = response.data;
  
      if (!isAccountVerified) {
        navigate('/verify-account', { state: { userId } });
        return;
      }
  
      // ✅ Call onLoginSuccess and wait for state update
      if (onLoginSuccess) {
        onLoginSuccess(userName, isAccountVerified, userId);
      }
  
      // ✅ Show success modal and navigate
      setShowSuccessModal(true);
      setModalProgress(100);
  
      const interval = setInterval(() => {
        setModalProgress(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            setShowSuccessModal(false);
            navigate('/dashboard', { replace: true });
            return 0;
          }
          return prev - 2;
        });
      }, 60);
  
    } catch (err) {
      const responseStatus = err.response?.status;
      const responseData = err.response?.data;
  
      if (responseStatus === 403 && responseData?.userId) {
        setStatusMessage({
          text: responseData.message || 'Your account is not verified. Please resend the OTP.',
          type: 'warning'
        });
        setUserIdToVerify(responseData.userId);
      } else {
        // ✅ Fix: Use the exact same error message as backend
        setError(responseData?.message || 'Invalid Email or Password!');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendOtp = async () => {
    if (!userIdToVerify) return;
    setOtpSending(true);
    setStatusMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/otp/send-verify-otp`, { userId: userIdToVerify });
      setStatusMessage({ text: response.data.message || 'OTP sent! Please check your email.', type: 'success' });
    } catch (err) {
      setStatusMessage({ text: err.response?.data?.message || 'Error sending OTP.', type: 'error' });
    } finally {
      setOtpSending(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full items-center justify-center font-sans p-4">
      
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-gray-800 to-black opacity-90" />
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-80 flex flex-col items-center shadow-lg">
            <CheckCircle size={40} className="text-green-600 mb-4" />
            <p className="font-semibold text-center mb-4">Login successful! Redirecting to dashboard...</p>
            <div className="h-2 bg-green-300 rounded-full w-full overflow-hidden">
              <div
                className="h-2 bg-green-600 transition-all duration-100 ease-linear"
                style={{ width: `${modalProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col w-full items-center justify-center">
        <div className="flex">
          <button onClick={handleBack} className='py-3 px-4 bg-amber-700 text-white absolute rounded-2xl left-6 top-6 cursor-pointer'>Back</button>
        </div>
        <div className="md:flex block w-full max-w-4xl bg-white rounded-2xl shadow-2xl shadow-blue-500/60 overflow-hidden">

          {/* Left */}
          <div className="md:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 p-8 flex items-center justify-center">
            <img 
              src={manImg} 
              alt="Professional using a laptop" 
              className="w-full h-full object-cover rounded-xl shadow-lg" 
              style={{ aspectRatio: '1/1', objectFit: 'cover' }}
            />
          </div>

          {/* Right Form */}
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

              <div className="w-full relative">
                <label className='text-gray-600 text-lg mb-2 block'>Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  placeholder="Password" 
                  value={data.password} 
                  onChange={handleChange} 
                  required 
                  className="border p-3 rounded-xl w-full pr-12 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" 
                />
                <button 
                  type="button" 
                  onClick={togglePassword} 
                  className="absolute inset-y-0 right-0 top-[35px] flex items-center pr-3 text-sm text-gray-500 hover:text-gray-800"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
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
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 disabled:bg-blue-400"
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
