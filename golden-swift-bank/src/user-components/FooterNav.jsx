import React from 'react';
import { Home, Zap, DollarSign, User, LogOut } from 'lucide-react';

const FooterNav = ({ active = 'Home', onLogout }) => {
  const navItems = [
    { name: 'Home', icon: Home, link: '#home' },
    { name: 'Transfer', icon: Zap, link: '#transfer' },
    { name: 'Wallet', icon: DollarSign, link: '#wallet' },
    { name: 'Account', icon: User, link: '#account' },
    { name: 'Logout', icon: LogOut, action: onLogout },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pt-2 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16 max-w-xl mx-auto">
        {navItems.map((item) => {
          const isActive = item.name === active;

          const iconColor = isActive ? 'text-amber-500' : 'text-white';
          const textColor = isActive ? 'text-amber-500 font-bold' : 'text-white';

          return (
            <button
              key={item.name}
              onClick={item.action ? item.action : () => (window.location.href = item.link)}
              className="flex flex-col items-center p-2 rounded-lg transition duration-300 hover:bg-gray-100 active:bg-gray-200"
            >
              <item.icon size={24} className={iconColor} />
              <span className={`text-xs mt-1 ${textColor}`}>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FooterNav;
