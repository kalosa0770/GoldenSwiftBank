import React from "react";
import { Flag, ArrowRight } from "lucide-react";
import ZAMBIA_FLAG_URL from '../assets/zambian_flag.jpg';
import US_FLAG_URL from '../assets/usa_flag.jpg';


const MyWallets = () => {
    return (
        <div className="flex flex-col space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-gray-800 font-nunito font-extrabold text-xl tracking-tight">
                My Wallet
                </h1>
                <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 rounded-lg px-2 py-1 hover:bg-blue-50">
                See more
                <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Wallet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* ZMW Wallet */}
                <div className="flex flex-col bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-5 hover:-translate-y-1">
                <div className="flex justify-between items-center mb-4">
                    <img
                    src={ZAMBIA_FLAG_URL}
                    alt="Zambia Flag"
                    className="w-8 h-6 rounded-sm shadow-sm ring-1 ring-gray-200"
                    />
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ZMW
                    </span>
                </div>
                <p className="text-gray-900 text-2xl font-extrabold tracking-tight">
                    K125,430.50
                </p>
                <p className="text-gray-500 text-xs mt-1">Available Balance</p>
                </div>

                {/* USD Wallet */}
                <div className="flex flex-col bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-5 hover:-translate-y-1">
                <div className="flex justify-between items-center mb-4">
                    <img
                    src={US_FLAG_URL}
                    alt="United States Flag"
                    className="w-8 h-6 rounded-sm shadow-sm ring-1 ring-gray-200"
                    />
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    USD
                    </span>
                </div>
                <p className="text-gray-900 text-2xl font-extrabold tracking-tight">
                    $125,430.50
                </p>
                <p className="text-gray-500 text-xs mt-1">Available Balance</p>
                </div>
            </div>
            </div>
    )
}

export default MyWallets;