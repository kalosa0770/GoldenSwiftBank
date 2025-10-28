import React, { useState } from "react";
import { EyeClosed, Eye, ArrowRight, Wallet } from "lucide-react";

const CheckBalance = () => {
  const [hidden, setHidden] = useState(true);

  const toggleBalance = () => setHidden(!hidden);

  return (
    <div className="">
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
      <div className="text-center mb-5">
        {hidden ? (
          <span className="text-3xl tracking-widest text-white select-none">
            ••••
          </span>
        ) : (
          <span className="text-3xl font-extrabold">$500.00</span>
        )}
      </div>
    </div>
  );
};

export default CheckBalance;
