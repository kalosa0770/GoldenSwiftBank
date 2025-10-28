import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  { text: "At least one special character", regex: /(?=.*[!@#$%^&*])/ },
];

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState(passwordRules.map(rule => ({ ...rule, valid: false })));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(100);

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const checkPasswordComplexity = (password) => {
    setPasswordValidations(passwordRules.map(rule => ({
      ...rule,
      valid: rule.regex.test(password),
    })));
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    setData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') checkPasswordComplexity(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!passwordValidations.every(rule => rule.valid)) {
      setError("Password does not meet all complexity requirements.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/users`, data);
      if (res.status === 201) {
        const userId = res.data?.user?._id;

        setShowSuccess(true);
        setProgress(100);

        // Start the 3-second countdown animation
        let interval = setInterval(() => {
          setProgress(prev => {
            if (prev <= 0) {
              clearInterval(interval);
              // Redirect to verify account page with userId
              navigate('/verify-account', { state: { userId } });
              return 0;
            }
            return prev - 2;
          });
        }, 60);

      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please check your details or network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = passwordValidations.every(rule => rule.valid) &&
    data.firstName && data.lastName && data.email && data.password;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gray-100 font-sans p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-sky-400 opacity-90" />

      {/* ✅ Success Popup (Toast) */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-green-100 border border-green-400 text-green-800 px-5 py-4 rounded-xl shadow-lg w-80 animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-600" />
            <p className="font-semibold">Registration successful! Redirecting to verification...</p>
          </div>
          <div className="h-2 bg-green-300 rounded-full mt-3 overflow-hidden">
            <div
              className="h-2 bg-green-600 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="relative z-10 flex w-full items-center justify-center">
        <div className="md:flex block w-full max-w-4xl bg-white rounded-2xl shadow-2xl shadow-blue-500/60 overflow-hidden">

          {/* Left Column */}
          <div className="md:w-1/2 bg-indigo-700 p-8">
            <img
              src={manImg}
              alt="Professional using a laptop"
              className="w-full h-full object-cover rounded-xl shadow-lg"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Join the journey</h1>
            <form onSubmit={handleSignUp} className="flex flex-col gap-5">

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col">
                  <label className='text-gray-600 text-lg mb-2'>First Name</label>
                  <input name="firstName" placeholder="First Name" value={data.firstName} onChange={handleChange} required className="border border-blue-200 p-3 rounded-xl w-full focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
                </div>
                <div className="flex flex-col">
                  <label className='text-gray-600 text-lg mb-2'>Last Name</label>
                  <input name="lastName" placeholder="Last Name" value={data.lastName} onChange={handleChange} required className="border border-blue-200 p-3 rounded-xl w-full focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className='text-gray-600 text-lg mb-2'>Email address</label>
                <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required className="border border-blue-200 p-3 rounded-xl w-full focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className='text-gray-600 text-lg mb-2'>Phone Number</label>
                <input type="tel" name="phoneNumber" placeholder="Phone Number (Optional)" value={data.phoneNumber} onChange={handleChange} className="border border-blue-200 p-3 rounded-xl w-full focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
              </div>

              {/* Password */}
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

              {/* Password Rules */}
              <div className="w-full text-sm mt-[-10px] p-3 bg-gray-50 rounded-xl">
                <p className="font-bold text-gray-700 mb-2">Password Requirements:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {passwordValidations.map((rule, idx) => (
                    <li key={idx} className={`flex items-center text-xs font-medium ${rule.valid ? 'text-green-600' : 'text-red-500'}`}>
                      {rule.valid ? <CheckCircle size={14} className="mr-2 min-w-[14px]" /> : <XCircle size={14} className="mr-2 min-w-[14px]" />}
                      {rule.text}
                    </li>
                  ))}
                </ul>
              </div>

              {error && <div className="text-red-500 font-medium mt-2 bg-red-50 p-2 rounded-xl text-sm">{error}</div>}

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-3 rounded-xl font-bold flex justify-center items-center transition-all duration-300 
                ${isFormValid && !isLoading ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/50' : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-70'}`}
              >
                {isLoading ? 'Processing...' : 'Sign Up'}
              </button>

              <div className="text-sm mt-2 text-gray-600 text-center">
                Already have an account?
                <Link to="/login" className="text-blue-600 font-bold ml-1 hover:text-amber-700 transition">Sign in</Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
