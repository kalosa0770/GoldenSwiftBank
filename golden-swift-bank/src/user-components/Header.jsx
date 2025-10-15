import React from "react";
import { Bell } from 'lucide-react';
import logo from '../assets/logo.jpeg'

const Header = () => {
    return (
        
        <div className="flex justify-between w-full p-2 sm:p-4">
            {/* Initial Avatar (Far Left) */}
            <div className="flex items-center justify-center   transition duration-200 hover:scale-[1.02] cursor-pointer">
                <img src={logo} className="w-14 h-14 rounded-full ring-2 ring-amber-200 shadow-lg" alt="logo" />
            </div>

            {/* Notification Icon (ABSOLUTE Far Right) */}
            <button className="rounded-full hover:bg-amber-100/50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 **-mr-4 sm:-mr-4**">
                {/* The Bell icon itself still defines its size and color */}
                <Bell className="text-gray-800 hover:text-amber-600 w-6 h-6 sm:w-7 sm:h-7" />
            </button>
        </div>
    );
}

export default Header;