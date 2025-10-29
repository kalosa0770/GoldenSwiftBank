import React from "react";
import { Bell } from "lucide-react";
import logo from "../assets/logo.jpeg";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full bg-gray-100 rounded-2xl p-3 sm:p-4 shadow-sm border-b border-gray-100 sticky top-0 z-20">
      {/* Left: Logo / Brand */}
      <div className="flex items-center gap-2 cursor-pointer hover:scale-[1.03] transition-transform duration-200">
        <img
          src={logo}
          alt="Golden Swift Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-2 ring-amber-300 shadow-md"
        />
        <div className="hidden sm:block">
          <h2 className="text-gray-800 font-extrabold text-lg tracking-tight">
            Golden Swift
          </h2>
          <p className="text-gray-500 text-xs font-medium">
            Your Digital Wallet
          </p>
          
        </div>
      </div>

      {/* Right: Notification Icon */}
      <button
        aria-label="Notifications"
        className="relative p-2 rounded-full hover:bg-amber-100/70 focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-200"
      >
        <Bell className="text-gray-800 hover:text-amber-600 w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm animate-pulse"></span>
      </button>
    </header>
  );
};

export default Header;
