import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({onLoginSuccess}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [statusMessage, setStatusMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
      if (localStorage.getItem('authToken')) { // ⬅️ FIX 1
          localStorage.removeItem('authToken'); // ⬅️ FIX 2
          console.log("Stale token cleared on LoginForm mount.");
      }
  }, [navigate]);


 
  useEffect(() => {
    if (location.state?.message) {
      setStatusMessage({ text: location.state.message, type: location.state.type || 'success' });
      window.history.replaceState({}, document.title); 
    }
  }, [location.state]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // API call to authenticate
      const url = 'http://localhost:3001/api/auth'; 
      const response = await axios.post(url, data);

      const token = response?.data.token;
      if (!token) {
        throw new Error('No token returned from server');
      }

      // Set the token on success
      localStorage.setItem('authToken', token); 

      if (response.data.user) {
        localStorage.setItem('User', JSON.stringify(response.data.user));
      }

      onLoginSuccess?.();
      
      // ... rest of the successful login logic
      navigate('/dashboard', { replace: true }); 
      
    } catch (err) {
      // the token is cleared if the login attempt fails
      localStorage.removeItem('authToken');
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gray-100 font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-sky-400 opacity-90" />
      <div className="relative z-10 flex w-full items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/60 p-8 sm:p-10 w-11/12 max-w-sm">
          {statusMessage && (
            <div className={`p-3 mb-4 rounded-lg text-center font-medium 
              ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {statusMessage.text}
            </div>
          )}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <h1>Login to your account</h1>
            <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required className="border border-gray-300 p-3 rounded-lg w-full" />
            <div className="w-full relative">
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={data.password} onChange={handleChange} required className="border p-3 rounded-lg w-full pr-20" />
              <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 px-3 bg-gray-300 rounded-lg text-sm">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button type="submit" className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700">Login</button>
            <div className="flex justify-between w-full mt-2 text-sm">
              <Link to="/signup" className="text-blue-600 font-semibold hover:text-amber-700">Sign up here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;