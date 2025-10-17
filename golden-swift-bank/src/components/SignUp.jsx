const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';

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
  const [passwordValidations, setPasswordValidations] = useState(
    passwordRules.map(rule => ({ ...rule, valid: false }))
  );
  const [error, setError] = useState("");

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

    try {
      // 🎯 FIX: Construct the full URL using the environment variable
      const url = `${API_BASE_URL}/api/users`;
      
      const response = await axios.post(url, data);
      
      const token = response.data.token; // Access the token field
      
      if (token) {
        // 1. Store the token for future authenticated requests
        localStorage.setItem("authToken", token); 
        
        // 2. Navigate the user directly to a protected route (e.g., dashboard)
        navigate("/dashboard"); 

      } else {
        // Fallback: This path should be rare if the backend is working
        navigate("/login", { state: { message: "Account created successfully! Please log in." } });
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  const isFormValid = passwordValidations.every(rule => rule.valid) &&
                      data.firstName && data.lastName && data.email && data.password;

  return (
    <div className="relative flex min-h-screen items-center justify-center w-full font-sans bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-sky-400 opacity-90" />
      <div className="relative z-10 flex w-full items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/60 p-8 sm:p-10 w-11/12 max-w-lg">
          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            <h1>Sign up to Golden Swift</h1>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <input name="firstName" placeholder="First Name" value={data.firstName} onChange={handleChange} required className="border border-blue-200 p-3 rounded-lg w-full" />
              <input name="lastName" placeholder="Last Name" value={data.lastName} onChange={handleChange} required className="border border-blue-200 p-3 rounded-lg w-full" />
            </div>

            {/* Email & Phone */}
            <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required className="border border-blue-200 p-3 rounded-lg w-full" />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={data.phoneNumber} onChange={handleChange} className="border border-blue-200 p-3 rounded-lg w-full" />

            {/* Password Field */}
            <div className="w-full relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                value={data.password}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg w-full pr-20 focus:ring-amber-500 focus:border-amber-500"
              />
              <span className="absolute inset-y-0 right-0 flex items-center">
                <button type="button" onClick={togglePassword} className="h-full bg-gray-300 border-none px-3 text-white font-semibold rounded-lg text-sm hover:bg-gray-700">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </span>
            </div>

            {/* Password Requirements */}
            <div className="w-full text-sm mt-[-10px]">
              <p className="font-semibold text-gray-700 mb-1">Password Requirements:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {passwordValidations.map((rule, idx) => (
                  <li key={idx} className={`flex items-center ${rule.valid ? 'text-green-600' : 'text-red-500'}`}>
                    {rule.valid ? <CheckCircle size={14} className="mr-2"/> : <XCircle size={14} className="mr-2"/>}
                    {rule.text}
                  </li>
                ))}
              </ul>
            </div>

            {error && <div className="text-red-500 font-medium mt-2">{error}</div>}

            {/* Submit Button */}
            <button type="submit" disabled={!isFormValid} className={`w-full py-3 rounded-xl font-bold flex justify-center items-center transition-opacity ${isFormValid ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-70'}`}>
              Sign Up
            </button>

            {/* Login Link */}
            <div className="text-sm mt-2 text-gray-600">
              Already have an account? <Link to="/login"><button className="text-blue-600 font-semibold ml-1 border-none">Sign in</button></Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
