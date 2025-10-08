import React from "react";
import { Bell } from 'lucide-react';

const Header = () => {
    return (
        
        <div className="flex justify-between items-center bg-gray-50 rounded-lg shadow-md py-4 px-4"> 
            {/* Initial Avatar */}
            <div className="flex items-center justify-center rounded-full bg-white w-9 h-9 p-1 shadow-inner">
                <p className="text-amber-500 font-extrabold text-sm">GS</p> 
            </div>
            
            {/* Notification Icon */}
            <Bell className="text-amber-500 hover:text-amber-400 cursor-pointer" size={20}/>
        </div>
    );
}

export default Header;