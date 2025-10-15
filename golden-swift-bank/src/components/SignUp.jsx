import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Eye, EyeClosed } from 'lucide-react';

// Define the complexity rules (adjust these to match your backend Joi config)
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

    const togglePassword = () => {
      setShowPassword(!showPassword);
    }

    // state for tracking password validation status
    const [passwordValidations, setPasswordValidations] = useState(
        passwordRules.map(rule => ({ ...rule, valid: false }))
    );

    const [error, setError] = useState("")
    const navigate = useNavigate();

    // Function to check complexity and update state
    const checkPasswordComplexity = (password) => {
        const newValidations = passwordValidations.map(rule => ({
            ...rule,
            valid: rule.regex.test(password),
        }));
        setPasswordValidations(newValidations);
    };

    const handleChange = ({currentTarget: input}) => {
        const { name, value } = input;
        
        setData(prevData => ({...prevData, [name]: value}));

        // Check password complexity only when the password field changes
        if (name === 'password') {
            checkPasswordComplexity(value);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const isPasswordValid = passwordValidations.every(rule => rule.valid);
        if (!isPasswordValid) {
            setError("Password does not meet all complexity requirements.");
            return;
        }

        try {
            const url = "/api/users";

            const {data:res} = await axios.post(url, data);
            navigate('/login', { 
                state: { 
                    message: "Account created successfully! Please log in.",
                    type: "success" 
                } 
            });
            console.log(res.message)
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                // Display the specific message from the Joi validation
                setError(error.response.data.message)
            }
        }
    }
  
    // Determine if the submit button should be enabled
    const isFormValid = passwordValidations.every(rule => rule.valid) && 
                        data.firstName && data.lastName && data.email && data.password;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center mx-auto font-sans bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-sky-400 opacity-90" />
        <div className="relative z-10 flex w-full items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/60 p-8 sm:p-10 w-11/12 max-w-lg">
            <form onSubmit={handleSignUp} className="flex flex-col gap-5 items-center justify-center">
            
              
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <input type='text' name='firstName' placeholder="First Name" value={data.firstName} onChange={handleChange}  required className="border border-blue-200 p-3 rounded-lg w-full" />
                <input type='text' name='lastName' placeholder="Last Name"  value={data.lastName} onChange={handleChange} required className="border border-blue-200 p-3 rounded-lg w-full" />
              </div>

              {/* Email & Phone */}
              <input type="email" name='email' placeholder="Email" value={data.email} onChange={handleChange} required className="border border-blue-200 p-3 rounded-lg w-full" />
              <input type="tel" name='phoneNumber' placeholder="Phone Number" value={data.phoneNumber} onChange={handleChange} className="border border-blue-200 p-3 rounded-lg w-full" />

              {/* Button submit */}
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
                <span className="absolute inset-y-0 right-0 flex items-center">
                  <button 
                    type="button"
                    onClick={togglePassword} 
                    className='h-full bg-gray-300 border-none px-3 text-white font-semibold rounded-lg text-sm transition duration-150 hover:bg-gray-700'
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </span>
              </div>

              {/* Password Complexity Feedback */}
              <div className='w-full text-sm mt-[-10px]'>
                  <p className='font-semibold text-gray-700 mb-1'>Password Requirements:</p>
                  <ul className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
                      {passwordValidations.map((rule, index) => (
                          <li key={index} className={`flex items-center transition-colors duration-200 ${rule.valid ? 'text-green-600' : 'text-red-500'}`}>
                              {rule.valid ? <CheckCircle size={14} className="mr-2" /> : <XCircle size={14} className="mr-2" />}
                              {rule.text}
                          </li>
                      ))}
                  </ul>
              </div>
              {/* END Password Complexity Feedback */}


                {error && <div className='text-red-500 font-medium mt-2'>{error}</div>}

              {/* Submit Button */}
              <button 
                  type="submit"  
                  disabled={!isFormValid} 
                  className={`w-full py-3 rounded-xl font-bold flex justify-center items-center transition-opacity ${
                      isFormValid 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-70'
                  }`}
              >
                Sign Up
              </button>

              {/* Login Link */}
              <div className="text-sm mt-2 text-gray-600">
                Already have an account? <Link to="/login"> <button className="text-blue-600 font-semibold ml-1 border-none">Sign in</button></Link> 
              </div>

            </form>
          </div>
      </div>
    </div>
  );
};

export default SignUp;