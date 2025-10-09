import React from "react";
import { EyeClosed, Check } from 'lucide-react';

const CheckBalance = () => {
    return (
        <div className="bg-gradient-to-br from-blue-700 to-blue-500 flex flex-col p-6 rounded-2xl shadow-2xl shadow-blue-500/50 transition duration-300 hover:shadow-blue-500/80"> 
            <div className="flex justify-between items-center px-1">
                <h1 className="text-white font-bold text-xl">Main Balance</h1>
                <button className="p-1 rounded-full text-white/90 hover:text-amber-300 transition duration-150">
                    <EyeClosed className="w-6 h-6" /> 
                </button>
            </div>
            <div className="flex flex-col items-center justify-center text-center pt-8 pb-4">
                <p className="text-white text-4xl sm:text-5xl font-extrabold tracking-widest">******</p>
                <div className="flex flex-wrap justify-center gap-3 pt-6">
                    <button className="flex items-center bg-teal-500 hover:bg-teal-600 text-white rounded-full py-1.5 px-3 shadow-md ring-1 ring-white/40 transition duration-150 text-sm">
                       <Check className="w-4 h-4 mr-1"/> 
                       <p className="font-semibold">Verified</p>
                    </button>
                    <button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white rounded-full py-1.5 px-3 shadow-md ring-1 ring-white/40 transition duration-150 text-sm">
                       <p className="font-semibold">KYC Level 2</p>
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