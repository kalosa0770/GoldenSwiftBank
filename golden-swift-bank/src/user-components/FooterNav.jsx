import React from 'react';
import { Home, Zap, DollarSign, User, LogOut } from 'lucide-react';
import { NavLink } from "react-router-dom";

const FooterNav = ({ active = 'Home', onLogout }) => {
  const navItems = [
    { name: 'dashboard', icon: Home},
    { name: 'transfer', icon: Zap},
    { name: 'wallet', icon: DollarSign},
    { name: 'account', icon: User},
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pt-2 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16 max-w-xl mx-auto">
      {/* Navigation */}
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={`/${item.name.toLowerCase()}`}
            className={({ isActive }) =>
              `flex flex-col items-center p-3 rounded-xl font-medium transition duration-200 ${
                isActive
                  ? "text-amber-600 font-bold"
                  : "text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3 transition-transform hover:scale-110" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default FooterNav;
