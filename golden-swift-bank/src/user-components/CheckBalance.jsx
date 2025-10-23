import React, { useState } from "react";
import { EyeClosed, ArrowRight, Wallet } from 'lucide-react';

const CheckBalance = () => {
  const [hidden, setHidden] = useState(true);

  const toggleBalance = () => setHidden(!hidden);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 w-full max-w-sm transform hover:-translate-y-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-800 font-semibold text-lg tracking-wide">Main Balance</h2>
            <div className="p-2 bg-blue-100 rounded-full">
            <Wallet className="w-5 h-5 text-blue-600" />
            </div>
        </div>

        {/* Balance Display */}
        <div className="text-start mb-6">
            {hidden ? (
            <span className="text-3xl tracking-widest text-gray-400">••••</span>
            ) : (
            <span className="text-3xl font-extrabold text-gray-800">$500.00</span>
            )}
        </div>

        {/* Toggle Button */}
        <div className="flex justify-start">
            <button
            onClick={toggleBalance}
            className="group flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
            >
            {hidden ? 'View Balance' : 'Hide Balance'}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
        </div>
        </div>

  );
};

export default CheckBalance;
