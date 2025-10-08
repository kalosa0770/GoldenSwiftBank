import React from "react";
import { Send, SendToBack, ArrowDownCircle, ArrowUpCircle, ReceiptText, Phone } from 'lucide-react'

const ActionButtons = () => {
    return (
        <div className="flex flex-col">
            <h1 className="text-gray-600 text-sm mb-3">Quick Actions</h1>
            <div className="overflow-x-scroll overflow-hidden flex gap-3 w-full p-2 bg-gray-50">
                <button className="flex flex-col border border-blue-800  text-blue-800 shadow-sm rounded-lg px-4 py-2 font-semibold whitespace-nowrap hover:bg-amber-600 transition duration-300">
                    <Send />
                    Send 
                </button>
                <button className="flex flex-col border border-blue-800 text-blue-800 shadow-sm rounded-lg px-4 py-2 whitespace-nowrap hover:bg-blue-50 transition duration-300">
                    <SendToBack />
                    Request
                </button>
                <button className="border border-blue-800 text-blue-800 shadow-sm rounded-lg px-4 py-2 whitespace-nowrap hover:bg-blue-50 transition duration-300">
                    <ArrowDownCircle />
                    Cash In
                </button>
                <button className="border border-blue-800 text-blue-800 shadow-sm rounded-lg px-4 py-2 whitespace-nowrap hover:bg-blue-50 transition duration-300">
                    <ArrowUpCircle />
                    Cash Out
                </button>
                <button className="border border-blue-800 text-blue-800 shadow-sm rounded-lg px-4 py-2 whitespace-nowrap hover:bg-blue-50 transition duration-300">
                    <ReceiptText />
                    Pay Bills
                </button>
                <button className="border border-blue-800 text-blue-800 shadow-sm rounded-lg px-4 py-2 whitespace-nowrap hover:bg-blue-50 transition duration-300">
                    <Phone />
                    Airtime
                </button>
            </div>
        </div>
    );
}

export default ActionButtons;