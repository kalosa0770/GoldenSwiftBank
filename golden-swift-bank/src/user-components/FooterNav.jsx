import React from 'react';
import { Home, Zap, DollarSign, User, Settings, LogOut } from 'lucide-react'; 


const FooterNav = ({ active = 'Home', onLogout }) => {
    
    // navigation items
    const navItems = [
        { name: 'Home', icon: Home, link: '#home' },
        { name: 'Transfer', icon: Zap, link: '#transfer' }, 
        { name: 'Wallet', icon: DollarSign, link: '#wallet' },
        { name: 'Account', icon: User, link: '#account' },
        { name: 'Logout', icon: LogOut, link: onLogout },
    ];

    return (
        // Fixed bottom container
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pt-2 pb-safe md:hidden">
            
            <div className="flex justify-around items-center h-16 max-w-xl mx-auto">
                {navItems.map((item) => {
                    const isActive = item.name === active;
                    
                    // Icon color changes based on active state
                    const iconColor = isActive 
                        ? 'text-amber-500'
                        : 'text-gray-900'; 
                        
                    // Text color changes based on active state
                    const textColor = isActive 
                        ? 'text-amber-500 font-bold'
                        : 'text-gray-600';

                    return (
                        <button
                            key={item.name}
                            className="flex flex-col items-center p-2 rounded-lg transition duration-300 hover:bg-gray-100"
                            onClick={item.name === 'Logout' ? item.link : null}
                        >
                            <item.icon size={24} className={iconColor} />
                            <span className={`text-xs mt-1 ${textColor}`}>
                                {item.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FooterNav;