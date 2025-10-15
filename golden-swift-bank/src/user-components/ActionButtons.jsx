import React from "react";
import { Send, SendToBack, ArrowDownCircle, ArrowUpCircle, ReceiptText, Phone } from 'lucide-react'

const ActionButtons = () => {
    const actions = [
        { name: 'Send', icon: Send, primary: true }, // Highlighted action
        { name: 'Request', icon: SendToBack, primary: false },
        { name: 'Cash In', icon: ArrowDownCircle, primary: false },
        { name: 'Cash Out', icon: ArrowUpCircle, primary: false },
        { name: 'Pay Bills', icon: ReceiptText, primary: false },
        { name: 'Airtime', icon: Phone, primary: false },
    ];

    return (
        <div className="space-y-3">
            <h1 className="text-gray-700 font-bold text-lg">Quick Actions</h1>

            {/* Horizontal scroll container with modified large-screen behavior */}
            <div className="flex space-x-3 overflow-x-scroll overflow-hidden no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        // *** MODIFIED BUTTON STYLING FOR LG SCREENS ***
                        className={`flex-shrink-0 flex flex-col items-center justify-center 
                                    rounded-xl p-3 w-24 h-24 whitespace-nowrap 
                                    font-semibold text-xs shadow-md transition duration-200 
                                    transform hover:scale-[1.02] active:scale-95
                                    
                                    // On large screens, set the width to 1/3 of the container, minus spacing
                                    lg:w-[calc((100%-0.75rem*2)/3)] 
                                    lg:flex-grow lg:flex-shrink 
                                    
                                    ${action.primary 
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/50' 
                                        : 'bg-white text-gray-700 border border-gray-100 hover:bg-blue-50'
                                    }`}
                    >
                        <action.icon className={`w-6 h-6 mb-1 ${action.primary ? 'text-white' : 'text-amber-500'}`} />
                        <span>{action.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ActionButtons;