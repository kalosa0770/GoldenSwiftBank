import React from "react";
import { Home, DollarSign, Zap, User} from 'lucide-react';

const Sidebar = ({logout}) => {
    const navItems = [
        { name: 'Home', icon: Home, current: true },
        { name: 'Transfer', icon: Zap, current: false },
        { name: 'Wallet', icon: DollarSign, current: false },
        { name: 'Account', icon: User, current: false },
    ];

    return (
        <aside className="hidden md:flex flex-col w-[250px] bg-[#f4f5f6] text-white p-6 shadow-xl sticky top-0 h-screen">
            {/* Logo/Branding */}
            <div className="mb-10 pt-4 pb-6 border-b border-blue-600">
                <h1 className="text-2xl font-black tracking-wider text-gray-800">Golden Swift</h1>
                <p className="text-xs text-gray-600 mt-1">All-in-One Wallet for People</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow space-y-4">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href="#"
                        className={`flex items-center p-3 rounded-xl transition duration-150 font-medium 
                            ${item.current 
                                ? 'bg-gradient-to-br from-blue-700 to-blue-500 text-white- shadow-lg' 
                                : 'text-gray-800 hover:bg-gradient-to-br from-blue-700 to-blue-500 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.name}</span>
                    </a>
                ))}
            </nav>

            {/* Footer Profile Placeholder */}
           {/* <div>
                <p className="text-sm font-semibold">Golden Swift</p>
                <div className="flex justify-end">
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition duration-150"
                    >
                        Sign Out
                    </button>
                </div>
            </div> */}
        </aside>
    )
}

export default Sidebar;