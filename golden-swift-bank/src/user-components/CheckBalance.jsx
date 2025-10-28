import React, { useState } from "react";
import { EyeClosed, Eye, ArrowRight, Wallet } from "lucide-react";

const CheckBalance = () => {
  const [hidden, setHidden] = useState(true);

  const toggleBalance = () => setHidden(!hidden);

  return (
    <div className="relative bg-gradient-to-br from-white/90 to-blue-50/90 p-5 rounded-2xl shadow-md border border-white/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300 w-full max-w-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-gray-800 font-semibold text-lg tracking-wide">
            Main Balance
          </h2>
        </div>
        <button
          onClick={toggleBalance}
          className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          {hidden ? (
            <EyeClosed className="w-5 h-5 text-blue-600" />
          ) : (
            <Eye className="w-5 h-5 text-blue-600" />
          )}
        </button>
      </div>

      {/* Balance Display */}
      <div className="text-start mb-5">
        {hidden ? (
          <span className="text-3xl tracking-widest text-gray-400 select-none">
            ••••
          </span>
        ) : (
          <span className="text-3xl font-extrabold text-gray-900">$500.00</span>
        )}
      </div>

      {/* Toggle Button */}
      <div className="flex justify-start">
        <button
          onClick={toggleBalance}
          className="group flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
        >
          {hidden ? "View Balance" : "Hide Balance"}
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default CheckBalance;
