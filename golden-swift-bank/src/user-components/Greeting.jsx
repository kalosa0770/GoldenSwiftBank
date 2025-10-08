import React from "react";
import { EyeClosed, Check } from 'lucide-react';

const CheckBalance = () => {
    return (
        <div className="shadow-xl bg-blue-600 flex flex-col p-5 rounded-xl"> 
            <div className="flex justify-between items-center px-1">
                <h1 className="text-white font-bold text-lg">Main Balance</h1>
                <EyeClosed className="text-white hover:text-amber-400 cursor-pointer" size={24} /> 
            </div>
            <div className="flex flex-col items-center justify-center text-center pt-8">
                <p className="text-white text-3xl font-extrabold tracking-widest">******</p>
                <div className="flex gap-4 pt-6">
                    <button className="justify-center items-center bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 border-0 flex shadow-md">
                       <Check size={16} /> 
                       <p className="text-xs ps-1 px-1 font-semibold">Verified</p>
                    </button>
                    <button className="justify-center items-center bg-amber-500 hover:bg-amber-600 text-white rounded-full p-2 border-0 flex shadow-md">
                       <p className="text-xs ps-1 px-1 font-semibold">KYC Level 2</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

const Greeting = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Greeting: Use a soft gray for background text, and amber for the brand name */}
            <h1 className="text-gray-700 font-normal text-base">
                Welcome back <span className="font-bold text-amber-500">Golden Swift</span>
            </h1>
            <CheckBalance />
        </div>
    );
}

export default Greeting;