import React from "react";
import { Home, DollarSign, Zap, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const navItems = [
    { name: "Home", icon: Home },
    { name: "Transfer", icon: Zap },
    { name: "Wallet", icon: DollarSign },
    { name: "Account", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[250px] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 shadow-xl sticky top-0 h-screen">
      {/* Branding */}
      <div className="mb-10 pt-4 pb-6 border-b border-amber-400">
        <h1 className="text-2xl font-black tracking-wider text-white">
          Golden Swift
        </h1>
        <p className="text-xs text-white mt-1">All-in-One Wallet for People</p>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={`/${item.name.toLowerCase()}`}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-xl font-medium transition duration-200 ${
                isActive
                  ? "bg-gradient-to-br from-amber-600 to-amber-400 text-white shadow-lg"
                  : "text-white hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-300 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3 transition-transform hover:scale-110" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full px-8 py-3 mt-6 bg-gradient-to-br from-amber-600 to-amber-400 text-white font-bold rounded-xl hover:from-amber-500 hover:to-amber-300 transition shadow-lg flex items-center justify-center mx-auto"
      >
        <LogOut size={20} className="mr-2" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
