import React, {useState} from 'react';
import Logo from '../assets/logo.jpeg';
import BackgroundImg from '../assets/ladyImg.jpeg';
import { useNavigate } from 'react-router-dom';
import { EyeClosed, EyeIcon } from 'lucide-react'; 

const LoginForm = ({isLoggedin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    //View password
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     if (email === 'goldenswift@gmail.com' && password === 'password') {
    //         isLoggedin();
    //         navigate('../user-components/UserDashboard');
    //         isLoggedin(false); // Change '/userdashboard' to your actual dashboard route
    //     } else {
    //         setMessage('Unable to login, check your credentials');
    //     }
    // };
    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'goldenswift@gmail.com' && password === 'password') {
            isLoggedin(); // This sets isLoggedIn to true in App.jsx
            navigate('../user-components/UserDashboard'); 
            
        } else {
            setMessage('Unable to login, check your credentials');
        }
    };
    return (
        <div
            className="relative flex h-screen w-full bg-gray-50 items-center justify-center mx-auto"
             
        >
            <img 
                src={BackgroundImg} 
                alt="Login Background" 
                // Image sizing: Fill the container, but preserve aspect ratio
                className="absolute inset-0 w-full h-full object-auto" 
            />
            <div className="relative z-10 flex w-full items-center justify-center">
                {/* Adjusted shadow for better contrast */}
                <div className="bg-white/30 backdrop-invert backdrop-opacity-30  rounded-2xl shadow-2xl shadow-blue-500/60 p-8 sm:p-10 w-11/12 max-w-sm">
                    
                    <form onSubmit={handleLogin} className="flex flex-col gap-5 items-center justify-center">
                        
                        {/* Branding */}
                        <div className="flex flex-col pb-3 justify-center items-center text-center">
                            <img src={Logo} className="w-14 h-14 rounded-full mb-4" alt="Golden Swift Bank Logo" />
                            <h1 className="text-gray-800 text-2xl font-bold">Welcome Back</h1>
                            <p className="text-gray-800 text-sm mt-1">Sign in to access your dashboard</p>
                        </div>
                        
                        {/* Email Input - Improved Structure */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email" className="text-gray-700 font-bold">Email Address</label>
                            <input 
                                id="email"
                                type="email" 
                                placeholder="goldenswift@gmail.com" 
                                className="border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-800 p-3 rounded-lg transition duration-150"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        {/* Password Input - Improved Structure */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="password" className="text-gray-700 font-bold">Password</label>
                            <div className="relative">
                                <input 
                                    id="password"
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter your password" 
                                    className="block w-full border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-800 p-3 rounded-lg transition duration-150"
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 end-0 flex items-center px-3 cursor-pointer text-amber-600"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? <EyeIcon size={20} /> : <EyeClosed size={20} />}
                                </span>
                            </div>
                        </div>
                        
                        {/* Login Button - Added */}
                        <button 
                            type="submit" 
                            className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl shadow-md shadow-amber-500/50 
                                    hover:bg-amber-700 transition duration-200 mt-4"
                        >
                            Log In
                        </button>

                        <div className='text-teal-600'>{message}</div>

                        {/* Optional: Forgot Password Link */}
                        <div className="flex gap-4">
                            <a href="#" className="text-sm text-gray-800 hover:text-amber-700 mt-2">Forgot Password?</a>
                            <a href="#" className="text-sm text-gray-800 hover:text-amber-700 mt-2">Don't have account?</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
            
    );
}

export default LoginForm