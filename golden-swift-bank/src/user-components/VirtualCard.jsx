import React from "react";


const VirtualCard = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Virtual Card Container */}
            <div className="w-full max-w-sm h-56 p-6 items-center justify-center text-center rounded-2xl shadow-2xl bg-blue-600 text-white">
                
                {/* Card Header: Bank Logo and Chip */}
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-lg font-extrabold text-amber-500 tracking-wider">
                        ZANACO BANK
                    </h2>
                </div>
                
                {/* Card Number */}
                <div className="text-center text-sm md:text-lg tracking-widest mb-4">
                    <span className="mr-2">4567</span>
                    <span className="mr-2">8901</span>
                    <span className="mr-2">2345</span>
                    <span className="text-amber-300">6789</span>
                </div>
                
                {/* Card Holder & Expiry */}
                <div className="flex justify-between items-center text-xs mb-6">
                    <div className="flex flex-col">
                        <span className="text-gray-400">CARD HOLDER</span>
                        <span className="text-sm font-semibold uppercase">GOLDEN SWIFT</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-gray-400">EXPIRES</span>
                        <span className="text-sm font-semibold">10/27</span>
                    </div>
                </div>
                {/* Call to Action Button */}
                <a className="text-center items-center justify-center text-amber-500 text-xs mt-6 mx-0 ms-0 w-full max-w-sm hover:text-white font-semibold decoration-none pointer transition delay-150 duration-300 ease-in-out">
                    Manage Card Details
                </a>
            </div>
            
            
            
        </div>
    )
}

export default VirtualCard;