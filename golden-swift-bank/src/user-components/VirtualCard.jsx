import React from "react";
import { CreditCard } from "lucide-react";


const VirtualCard = () => {
    return (
        <div className="flex flex-col space-y-3">
            {/* Virtual Card Container */}
            <div className="w-full h-full p-6 relative rounded-3xl shadow-2xl overflow-hidden
                          bg-gradient-to-br from-amber-900 to-blue-700 text-white
                          transition duration-500 transform hover:scale-[1.01] hover:shadow-indigo-500/50">
                
                {/* Card Header: Bank Logo and Chip */}
                <div className="absolute inset-0 bg-white opacity-5 rounded-3xl"
                    style={{clipPath: 'polygon(0% 0%, 50% 0%, 100% 100%, 0% 100%)'}}>
                </div>

                <div className="flex justify-between items-start mb-6 z-10 relative">
                    <h2 className="text-xl font-extrabold text-amber-400 tracking-widest">
                        ZANACO
                    </h2>
                    <CreditCard className="w-8 h-8 text-white opacity-80" />
                </div>
                
                {/* Card Number */}
                <div className="text-center font-mono text-xl sm:text-2xl tracking-[0.2em] mb-4 pt-6 z-10 relative">
                    <span className="mr-2">4567</span>
                    <span className="mr-2">8901</span>
                    <span className="mr-2">2345</span>
                    <span className="text-amber-300 font-extrabold">6789</span>
                </div>
                
                {/* Card Holder & Expiry */}
                <div className="flex justify-between items-center text-xs pt-4 z-10 relative">
                    <div className="flex flex-col">
                        <span className="text-indigo-200 opacity-80 text-[0.6rem] tracking-wider">CARD HOLDER</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">GOLDEN SWIFT</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-indigo-200 opacity-80 text-[0.6rem] tracking-wider">EXPIRES</span>
                        <span className="text-sm font-semibold">10/27</span>
                    </div>
                </div>
                {/* Call to Action Button */}
                <button className="mt-4 w-full bg-white text-amber-600 hover:bg-amber-600 hover:text-white 
                             font-semibold py-3 px-6 rounded-xl border border-amber-600 transition 
                             duration-200 shadow-md">
                    Manage Card Details
                </button>
            </div>
            
            
            
        </div>
    )
}

export default VirtualCard;