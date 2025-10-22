import React, {useState} from "react";
import { EyeClosed, Check, ArrowRight, Wallet, Banknote, Currency, Target} from 'lucide-react';

const CheckBalance = () => {
    const [checkBalance, setCheckBalance] = useState(true);

    const viewBal = () => {
        setCheckBalance(!checkBalance);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 w-full gap-4">
            {/* Card 1: Main Balance */}
            <div className="bg-white flex flex-col p-6 rounded-2xl shadow-xl border border-gray-100 transition duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/50"> 
                <div className="flex justify-between items-center px-1">
                    <h1 className="text-gray-800 font-bold text-xl">Main Balance</h1>
                    <button className="p-1 rounded-full bg-gray-50 text-gray-800 hover:text-amber-500 transition duration-150">
                        <Wallet className="w-6 h-6" /> 
                    </button>
                </div>
                <div className="items-center justify-center text-center pt-8 pb-6">
                    {/* Emphasizing balance for visual appeal */}
                    {
                    checkBalance 
                    
                        ? '********' 
                        
                        : <p className="text-4xl text-gray-700 font-extrabold tracking-tight" onChange={setCheckBalance} >$500</p> 
                    
                    }
                </div>
                <a href="#view" className="text-center justify-center flex items-center hover:text-amber-800 text-amber-600 ro py-2 px-3 font-semibold text-sm"
                    onClick={viewBal}
                 >
                    <p>View Balance </p>
                    <ArrowRight className="w-4 h-4 ml-1"/>
                </a>
            </div>
            
            {/* Card 2, 3, 4: (Use the same updated styling for these) */}
            
            {/* Card 2: Transactions */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/50">
                <div className="flex justify-between items-center px-1">
                    <h1 className="text-gray-800 font-bold text-xl ">Transactions</h1>
                    <button className="p-1 rounded-full bg-gray-50 text-gray-800 hover:text-amber-500 transition duration-150">
                        <Banknote className="w-6 h-6" /> 
                    </button>
                </div>
                <div className="items-center justify-center text-center pt-8 pb-6">
                    <p className="text-4xl text-gray-700 font-extrabold tracking-tight">27</p>
                </div>
                <a href="#all" className="text-center justify-center flex items-center hover:text-amber-800 text-amber-600 ro py-2 px-3 font-semibold text-sm">
                    <p>View all transactions </p>
                    <ArrowRight className="w-4 h-4 ml-1"/>
                </a>
            </div>
            
            {/* Card 3: Currencies */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/50">
                <div className="flex justify-between items-center px-1">
                    <h1 className="text-gray-800 font-bold text-xl ">Currencies</h1>
                    <button className="p-1 rounded-full bg-gray-50 text-gray-800 hover:text-amber-500 transition duration-150">
                        <Currency className="w-6 h-6" /> 
                    </button>
                </div>
                <div className="items-center justify-center text-center pt-8 pb-6">
                    <p className="text-4xl text-gray-700 font-extrabold tracking-tight">4</p>
                </div>
                <a href="#currencies" className="text-center justify-center flex items-center hover:text-amber-800 text-amber-600 ro py-2 px-3 font-semibold text-sm">
                    <p>View all currencies</p>
                    <ArrowRight className="w-4 h-4 ml-1"/>
                </a>
            </div>
            
            {/* Card 4: Savings Goal */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/50">
                <div className="flex justify-between items-center px-1">
                    <h1 className="text-gray-800 font-bold text-xl ">KYC</h1>
                    <button className="p-1 rounded-full bg-gray-50 text-gray-800 hover:text-amber-500 transition duration-150">
                        <Target className="w-6 h-6" /> 
                    </button>
                </div>
                <div className="items-center justify-center text-center pt-8 pb-6">
                    {/* Show a percentage or goal status */}
                    <p className="text-4xl text-gray-700 font-extrabold tracking-tight">Verified</p>
                </div>
                <a href="#details" className="text-center justify-center flex items-center hover:text-amber-800 text-amber-600 ro py-2 px-3 font-semibold text-sm">
                    <p>View Details</p> {/* Changed text */}
                    <ArrowRight className="w-4 h-4 ml-1"/>
                </a>
            </div>
        </div>
    );
}

const Greeting = ({userName}) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Greeting: Use a soft gray for background text, and amber for the brand name */}
            <h1 className="text-gray-700 font-normal text-base">
                Welcome back <span className="font-bold text-amber-500">{userName}</span>
            </h1>
            <CheckBalance />
        </div>
    );
}

export default Greeting;