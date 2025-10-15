import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios'; // Using Axios for cleaner HTTP calls
import { useLocation, useNavigate } from 'react-router-dom'
import { EyeClosed, EyeIcon, Loader, CheckCircle } from 'lucide-react'; 


const LoginForm = () => {
    const location = useLocation(); 
    const [statusMessage, setStatusMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    //show password
    const togglePassword = () => {
      setShowPassword(!showPassword);
    }
    const [data, setData] = useState({
            email: "",
            password: "",
        });
    
        const [error, setError] = useState("")
    
        const handleChange = ({currentTarget: input}) => {
            setData({...data, [input.name]: input.value});
        };
    
        const handleLogin = async (e) => {
            e.preventDefault();
            
            try {
                const url ="http://localhost:3001/api/auth";
                const response = await axios.post(url, data); 
                localStorage.setItem("token", response.data.token); 
                
                navigate("/dashboard"); 

            } catch (error) {
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                }
            }
        }

        
        useEffect(() => {
            if (location.state && location.state.message) {
                setStatusMessage({
                    text: location.state.message,
                    type: location.state.type || 'success'
                });
                window.history.replaceState({}, document.title); 
            }
        }, [location.state]);

    return (
        <div
            className="relative flex min-h-screen w-full items-center justify-center mx-auto bg-gray-100 font-sans"
        >
            {/* Background Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-sky-400 opacity-90" />
            
            <div className="relative z-10 flex w-full items-center justify-center p-4">
                {/* FORM CARD */}
                <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/60 p-8 sm:p-10 w-11/12 max-w-sm">
                    {statusMessage && (
                        <div className={`p-3 mb-4 rounded-lg text-center font-medium 
                            ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                        >
                            {statusMessage.text}
                        </div>
                    )}
                    
                    <form onSubmit={handleLogin} className="flex flex-col gap-5 items-center justify-center">
                        
                        {/* Branding */}
                        <div className="flex flex-col pb-3 justify-center items-center text-center">
                            <div className='w-14 h-14 rounded-full border-2 border-amber-500 mb-4 shadow-md flex items-center justify-center'>
                                <LogoSVG />
                            </div>
                            <h1 className="text-gray-800 text-2xl font-bold">Welcome Back</h1>
                            <p className="text-gray-600 text-sm mt-1">Sign in to access your dashboard</p>
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email" className="text-gray-700 font-semibold">Email Address</label>
                            <input 
                                type="email" name='email' placeholder="Email" value={data.email} onChange={handleChange} required  
                                className="border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-800 p-3 rounded-lg transition duration-150"
                            
                            />
                        </div>
                        
                        {/* Password Input */}
                        <div className="w-full relative"> 
                            <input
                                type={showPassword ? 'text' : 'password'} 
                                name='password'
                                placeholder="Enter password"
                                value={data.password} 
                                onChange={handleChange}
                                required
                                className={`border p-3 rounded-lg w-full pr-20 focus:ring-amber-500 focus:border-amber-500`}
                            />
                            
                            <span
                                className="absolute inset-y-0 right-0 flex items-center"
                            >
                                <button 
                                    type="button" 
                                    onClick={togglePassword} 
                                    className='h-full bg-gray-300 border-none px-3 text-white font-semibold rounded-lg text-sm transition duration-150 hover:bg-gray-700'
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </span>
                        </div>

                                    
                        
                        {/* Login Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl shadow-md shadow-amber-500/50 
                                    hover:bg-amber-700 transition duration-200 mt-4 flex items-center justify-center "
                                         
                                    
                            
                        >
                            Login
                        </button>

                        {/* Links */}
                        <div className="flex justify-between w-full mt-2 text-sm">
                            <a href="#" className="text-gray-600 hover:text-amber-700">Forgot Password?</a>
                            <a href="#" className="text-blue-600 hover:text-amber-700 font-semibold">Sign up here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;