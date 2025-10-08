import React from "react";
import { Flag, ArrowRight } from "lucide-react";
import ZAMBIA_FLAG_URL from '../assets/zambian_flag.jpg';
import US_FLAG_URL from '../assets/usa_flag.jpg';


const MyWallets = () => {
    return (
        <div className="flex flex-col p-4 bg-gray-50 rounded-xl">
    
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-gray-600 text-sm">My Wallet</h1>
                <p className="text-xs flex items-center text-blue-800 hover:text-blue-600 cursor-pointer"> 
                    See more <ArrowRight size={16} className="ml-1" />
                </p>
            </div>
            
            {/* Wallets Grid */}
            <div className="grid grid-cols-2 gap-4"> 
                
                {/* ZMW Wallet Card (Zambia) */}
                <div className="flex flex-col shadow-lg p-4 bg-white rounded-xl border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                        {/* ZAMBIA FLAG */}
                        <img src={ZAMBIA_FLAG_URL} alt="Zambia Flag" className="w-8 h-6 object-cover rounded-sm shadow-md" />
                        <h1 className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">ZMW</h1>
                    </div>
                    <p className="text-left text-gray-900 text-xl font-bold mt-2">K125,430.5</p>
                    <p className="text-left text-gray-500 text-xs">Available Balance</p>
                </div>
                
                {/* USD Wallet Card (United States) */}
                <div className="flex flex-col shadow-lg p-4 bg-white rounded-xl border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                        {/* US FLAG */}
                        <img src={US_FLAG_URL} alt="United States Flag" className="w-8 h-6 object-cover rounded-sm shadow-md" />
                        <h1 className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">USD</h1>
                    </div>
                    <p className="text-left text-gray-900 text-xl font-bold mt-2">$125,430.5</p>
                    <p className="text-left text-gray-500 text-xs">Available Balance</p>
                </div>
                
            </div>
        </div>
    )
}

export default MyWallets;