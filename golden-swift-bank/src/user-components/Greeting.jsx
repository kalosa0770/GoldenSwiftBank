import React, { useState, useEffect } from "react";
import CheckBalance from "./CheckBalance";
import { TrendingUp, CreditCard, PiggyBank } from "lucide-react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
};

const Greeting = ({ userName }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="flex flex-col justify-between w-full h-full p-6 md:p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl shadow-[0_4px_30px_rgba(255,215,0,0.2)] relative overflow-hidden border border-yellow-400/20">
      
      {/* Golden Glow Effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-yellow-400/30 to-amber-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-52 h-52 bg-gradient-to-tr from-amber-500/20 to-yellow-400/5 blur-3xl rounded-full"></div>

      {/* Greeting Section */}
      <div className="relative">
        <h1 className="font-nunito font-extrabold text-2xl md:text-3xl tracking-tight leading-snug">
          {greeting},{" "}
          <span className="text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]">
            {userName}
          </span>
        </h1>
      </div>

      {/* Balance + Insights */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Balance Card */}
        <div className="bg-gray-800 border border-yellow-400/10 p-5 rounded-2xl">
          <CheckBalance />
        </div>

        {/* Quick Insights */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/5 p-5 rounded-2xl border border-yellow-400/20 backdrop-blur-md hover:bg-yellow-500/20 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            Quick Insights
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-gray-200">
                <CreditCard className="w-4 h-4 text-yellow-300" /> 
                Transactions this week
              </span>
              <span className="font-bold text-yellow-400">12</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
