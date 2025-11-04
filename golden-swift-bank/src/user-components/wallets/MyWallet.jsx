import React from 'react';
import { 
    DollarSign, 
    Euro, 
    CreditCard,
    Clock,
    RotateCw,
    Sliders,
    PlusCircle
} from 'lucide-react';
// Assuming these components are available in your project structure
import Sidebar from '../Sidebar';
import FooterNav from '../FooterNav';

// --- MOCK DATA AND HELPERS ---

// Mock Wallet Data
const initialWallets = [
    { id: 1, title: 'Zambian Kwacha', symbol: 'ZMW', amount: 50000.00, icon: DollarSign, color: 'text-green-600', currencySymbol: 'K' },
    { id: 2, title: 'US Dollar', symbol: 'USD', amount: 1250.55, icon: CreditCard, color: 'text-blue-600', currencySymbol: '$' },
    { id: 3, title: 'Euro', symbol: 'EUR', amount: 980.30, icon: Euro, color: 'text-indigo-600', currencySymbol: '€' },
];

// Helper to format currency
const formatAmount = (amount, symbol) => {
    return `${symbol} ${new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)}`;
};

// Feature list for the scrollable area
const features = [
    { key: 'convert', name: 'Convert Currency', icon: RotateCw, color: 'text-amber-500' },
    { key: 'history', name: 'Transaction History', icon: Clock, color: 'text-indigo-500' },
    { key: 'settings', name: 'Wallet Settings', icon: Sliders, color: 'text-gray-500' },
    { key: 'topup', name: 'Top Up', icon: PlusCircle, color: 'text-green-500' },
    { key: 'withdraw', name: 'Withdraw', icon: DollarSign, color: 'text-red-500' },
    { key: 'security', name: 'Security Check', icon: CreditCard, color: 'text-blue-500' },
];

/**
 * MyWallet Component
 * Displays all currency balances and navigation links for wallet features.
 */
const MyWallet = () => {
    
    // Default navigation action (logs to console)
    const handleNavigation = (routeKey) => {
        console.log(`[Action] Navigating to: ${routeKey}.`);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-nunito">
            {/* Sidebar */}
            <div className="hidden md:block md:w-[250px] border-r border-gray-200 shadow-lg">
                <Sidebar/>
            </div>
            <main className="flex flex-col flex-1 gap-8 px-6 md:px-10 py-8 overflow-y-auto no-scrollbar">
                <div className="flex-grow overflow-y-auto bg-gray-50">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">My Wallets</h1>
                    <p className="text-gray-500 mb-8">View your current balances across all currencies.</p>
                    
                    {/* Wallet Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {initialWallets.map((wallet) => (
                            <div 
                                key={wallet.id} 
                                className={`p-6 rounded-3xl bg-white text-gray-800 shadow-xl border border-gray-200 transform transition duration-300 hover:scale-[1.03]`}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <wallet.icon className={`w-8 h-8 opacity-90 ${wallet.color}`} />
                                    {/* Top Up Button */}
                                    <button 
                                        onClick={() => handleNavigation(`topup-${wallet.symbol}`)}
                                        className="flex items-center text-sm font-semibold py-2 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition shadow-md"
                                        title={`Top up ${wallet.symbol}`}
                                    >
                                        <PlusCircle className="w-4 h-4 mr-1" />
                                        Top Up
                                    </button>
                                </div>
                                <p className="text-lg font-medium text-gray-600">{wallet.title}</p>
                                <div className="mt-2">
                                    <p className="text-4xl font-black tracking-tight">
                                        {formatAmount(wallet.amount, wallet.currencySymbol)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ➕ ADD CURRENCY FEATURE */}
                    <div className="mt-6">
                        <button 
                            onClick={() => handleNavigation('add-currency')}
                            className="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition duration-200 group"
                        >
                            <PlusCircle className="w-5 h-5 mr-2 group-hover:text-indigo-600 transition" />
                            <span className="font-semibold">Add New Currency Wallet</span>
                        </button>
                    </div>
                    {/* --- END ADD CURRENCY FEATURE --- */}

                    {/* --- WALLET FEATURES SECTION (Scrollable) --- */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Quick Actions</h2>
                        
                        {/* Horizontal Scroll and Hidden Scrollbar */}
                        <div className="flex space-x-4 pb-4 overflow-x-auto no-scrollbar">
                            {features.map((feature) => (
                                <button 
                                    key={feature.key} 
                                    onClick={() => handleNavigation(feature.key)}
                                    // flex-shrink-0 is crucial to keep items on one line
                                    className="flex flex-col items-center justify-center flex-shrink-0 w-28 h-28 p-2 bg-white rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 transition duration-200 text-center"
                                >
                                    <feature.icon className={`w-8 h-8 mb-2 ${feature.color}`} />
                                    <span className="font-semibold text-sm text-gray-700 leading-snug">{feature.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Recent Activity Placeholder */}
                    <div className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-amber-500" />
                            Recent Activity
                        </h2>
                        <p className="text-gray-500">No transactions recorded yet.</p>
                    </div>
                </div>
                {/* Spacer for Footer */}
                <div className="h-20 sm:h-6" />
            </main>
            <FooterNav />
        </div>
    );
};

export default MyWallet;