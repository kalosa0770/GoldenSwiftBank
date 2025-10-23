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
        <div className="space-y-5">
            <h1 className="text-gray-800 font-semibold text-xl tracking-wide">
                Quick Actions
            </h1>

            {/* Scrollable Actions Row */}
            <div className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
                {actions.map((action, index) => (
                <button
                    key={index}
                    className={`flex-shrink-0 flex flex-col items-center justify-center
                                rounded-2xl p-4 w-28 h-28 
                                font-medium text-sm tracking-tight shadow-sm
                                transition-all duration-300 ease-in-out transform
                                hover:scale-[1.05] hover:shadow-lg active:scale-95
                                
                                lg:w-[calc((100%-0.75rem*2)/3)] 
                                lg:flex-grow lg:flex-shrink
                                
                                ${
                                action.primary
                                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-400/30'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100'
                                }`}
                >
                    <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 
                                ${
                                    action.primary
                                    ? 'bg-white/20'
                                    : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                                }`}
                    >
                    <action.icon
                        className={`w-6 h-6 ${
                        action.primary ? 'text-white' : 'text-blue-600'
                        }`}
                    />
                    </div>
                    <span>{action.name}</span>
                </button>
                ))}
            </div>
            </div>

    );
}

export default ActionButtons;