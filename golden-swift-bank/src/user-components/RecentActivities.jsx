import React from 'react';
import { ArrowDownLeft, ArrowUpRight, ShoppingCart, Home, DollarSign, ChevronRight, Lightbulb } from 'lucide-react';

// --- SmartTip Component ---
const SmartTip = () => {
    // Mock data for the finance tip
    const currentTip = {
        title: "Your health matters",
        content: "Remember to renew your health insurance this month!",
        action: "Set a Monthly Budget",
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 flex flex-col justify-between h-full min-h-[300px] md:min-h-full">
            <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-8 h-8 text-amber-500 bg-amber-100 p-1 rounded-full shadow-md" />
                <h3 className="text-xl font-extrabold text-gray-900">Golden Swift Tip</h3>
            </div>
            
            <div className="flex flex-col flex-grow justify-center">
                <p className="text-gray-800 text-2xl font-bold mb-3 leading-snug">{currentTip.title}</p>
                <p className="text-gray-600 text-base mb-6">{currentTip.content}</p>
            </div>
            
            <button className="w-full py-3 text-center bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-150 shadow-md shadow-blue-500/50">
                {currentTip.action}
            </button>
        </div>
    );
};


// --- RecentActivities Component ---
// Mock data for recent transactions
const mockActivities = [
    {
        id: 1,
        type: 'Transfer',
        description: 'Received funds from John M.',
        amount: 850.00,
        date: 'Oct 24',
        status: 'completed',
        icon: ArrowDownLeft,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-100',
    },
    {
        id: 2,
        type: 'Payment',
        description: 'Electricity Bill (ZESCO)',
        amount: -125.50,
        date: 'Oct 23',
        status: 'completed',
        icon: Home,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-100',
    },
    {
        id: 3,
        type: 'Purchase',
        description: 'Online Shopping (Amazon)',
        amount: -45.99,
        date: 'Oct 23',
        status: 'completed',
        icon: ShoppingCart,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-100',
    },
    {
        id: 4,
        type: 'Withdrawal',
        description: 'Cash withdrawal at Agent 102',
        amount: -300.00,
        date: 'Oct 22',
        status: 'completed',
        icon: DollarSign,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-100',
    },
    {
        id: 5,
        type: 'Transfer',
        description: 'Sent funds to Jane D.',
        amount: -50.00,
        date: 'Oct 22',
        status: 'pending',
        icon: ArrowUpRight,
        iconColor: 'text-amber-600',
        bgColor: 'bg-amber-100',
    },
];

const RecentActivities = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-full">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Recent Activities</h2>
            
            <div className="space-y-4">
                {mockActivities.map((activity) => (
                    <div 
                        key={activity.id} 
                        className="flex items-center justify-between p-3 rounded-xl transition duration-200 hover:bg-gray-50 border border-transparent hover:border-gray-100"
                    >
                        {/* Left Side: Icon and Description */}
                        <div className="flex items-center space-x-4">
                            {/* Icon Circle */}
                            <div className={`p-3 rounded-full ${activity.bgColor}`}>
                                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                            </div>
                            
                            {/* Text Details */}
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-800">{activity.description}</span>
                                <span className="text-sm text-gray-500">{activity.date} &bull; {activity.type}</span>
                            </div>
                        </div>

                        {/* Right Side: Amount and Status */}
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <span className={`font-bold text-lg ${activity.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                    {activity.amount > 0 ? '+' : '-'}ZMW {Math.abs(activity.amount).toFixed(2)}
                                </span>
                                <span className={`block text-xs font-medium uppercase ${
                                    activity.status === 'pending' ? 'text-amber-500' : 'text-gray-500'
                                }`}>
                                    {activity.status}
                                </span>
                            </div>
                            
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-6 w-full py-3 text-center text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition duration-150 border-2 border-blue-100">
                View All Transactions
            </button>
        </div>
    );
}

// --- Combined Export Component ---
const DashboardWidgets = () => {
    return (
        // Use a grid to arrange the two components side-by-side on desktop
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Activities takes 2/3 width on large screens */}
            <div className="lg:col-span-2">
                <RecentActivities />
            </div>
            
            {/* Smart Tip takes 1/3 width on large screens */}
            <div className="lg:col-span-1">
                <SmartTip />
            </div>
        </div>
    );
};

export default DashboardWidgets;
