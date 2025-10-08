import React from 'react';
import { Home, Zap, DollarSign, User, Settings } from 'lucide-react'; 


const FooterNav = ({ active = 'Home' }) => {
    
    // navigation items
    const navItems = [
        { name: 'Home', icon: Home, link: '#home' },
        { name: 'Transfer', icon: Zap, link: '#transfer' }, 
        { name: 'Wallet', icon: DollarSign, link: '#wallet' },
        { name: 'Account', icon: User, link: '#account' },
    ];

    return (
        // Fixed bottom container
        <div className="fixed bottom-0 left-0 right-0 z-50 
                      bg-white shadow-2xl border-t border-gray-100 p-2">
            
            <div className="flex justify-around items-center max-w-lg mx-auto">
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
                        <a 
                            key={item.name}
                            href={item.link}
                            className="flex flex-col items-center p-2 rounded-lg transition duration-300 hover:bg-gray-100"
                        >
                            <item.icon size={24} className={iconColor} />
                            <span className={`text-xs mt-1 ${textColor}`}>
                                {item.name}
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default FooterNav;