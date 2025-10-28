import React from "react";
import { Flag, ArrowRight } from "lucide-react";
import ZAMBIA_FLAG_URL from '../assets/zambian_flag.jpg';
import US_FLAG_URL from '../assets/usa_flag.jpg';

const MyWallets = () => {
  const wallets = [
    {
      id: 1,
      flag: ZAMBIA_FLAG_URL,
      currency: "ZMW",
      balance: "K125,430.50",
    },
    {
      id: 2,
      flag: US_FLAG_URL,
      currency: "USD",
      balance: "$125,430.50",
    },
  ];

  return (
    <div className="flex flex-col space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-gray-900 font-nunito font-extrabold text-xl tracking-tight">
          My Wallet
        </h1>
        <button className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-800 transition-colors duration-200 rounded-lg px-2 py-1 hover:bg-amber-50">
          See more
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {wallets.map(wallet => (
          <div
            key={wallet.id}
            className="flex flex-col bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-5 hover:-translate-y-1"
          >
            <div className="flex justify-between items-center mb-4">
              <img
                src={wallet.flag}
                alt={`${wallet.currency} Flag`}
                className="w-8 h-6 rounded-sm shadow-sm ring-1 ring-gray-200"
              />
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {wallet.currency}
              </span>
            </div>

            <p className="text-gray-900 text-2xl font-extrabold tracking-tight">
              {wallet.balance}
            </p>
            <p className="text-gray-500 text-xs mt-1">Available Balance</p>

            {/* Quick Wallet Actions */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 text-xs font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors">
                Deposit
              </button>
              <button className="flex-1 py-2 text-xs font-semibold text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors">
                Withdraw
              </button>
              <button className="flex-1 py-2 text-xs font-semibold text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors">
                Convert
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWallets;
