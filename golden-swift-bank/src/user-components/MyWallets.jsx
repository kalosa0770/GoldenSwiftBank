import React from "react";
import { Flag, ArrowRight } from "lucide-react";
import ZAMBIA_FLAG_URL from '../assets/zambian_flag.jpg';
import US_FLAG_URL from '../assets/usa_flag.jpg';


const MyWallets = () => {
    return (
        <div className="flex flex-col space-y-4">
    
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-gray-700 font-bold text-lg">My Wallet</h1>
                <button className="text-sm flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-150 p-2 -mr-2 rounded-lg"> 
                    See more <ArrowRight className="w-4 h-4 ml-1" />
                </button>
            </div>
            
            {/* Wallets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                
                {/* ZMW Wallet Card (Zambia) */}
                <div className="flex flex-col shadow-lg p-4 bg-white rounded-xl border border-blue-10">
                    <div className="flex justify-between items-center mb-4">
                        {/* ZAMBIA FLAG */}
                        <img src={ZAMBIA_FLAG_URL} alt="Zambia Flag" className="w-8 h-6 object-cover rounded-sm shadow-md" />
                        <h1 className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">ZMW</h1>
                    </div>
                    <p className="text-left text-gray-900 text-xl font-bold mt-2">K125,430.5</p>
                    <p className="text-left text-gray-500 text-xs mt-1">Available Balance</p>
                </div>
                
                {/* USD Wallet Card (United States) */}
                <div className="flex flex-col shadow-lg p-4 bg-white rounded-xl border border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                        {/* US FLAG */}
                        <img src={US_FLAG_URL} alt="United States Flag" className="w-8 h-6 object-cover rounded-sm shadow-md" />
                        <h1 className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">USD</h1>
                    </div>
                    <p className="text-left text-gray-900 text-xl font-bold mt-2">$125,430.5</p>
                    <p className="text-left text-gray-500 text-xs mt-1">Available Balance</p>
                </div>
                
            </div>
        </div>
    )
}

export default MyWallets;