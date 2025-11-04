import React, { useState } from 'react';
import { 
    Send, 
    Zap, 
    Shield, 
    Banknote, 
    Globe, 
    CheckCircle, 
    AlertTriangle,
    CreditCard,
    DollarSign,
    Euro,
    User,
    ChevronsDown,
    MapPin,
    Calendar,
    Briefcase,
    Hospital,
    FileText,
    TrendingUp,
    Bookmark
} from 'lucide-react';
import Sidebar from '../Sidebar';
import FooterNav from '../FooterNav';

// --- MOCK DATA AND HELPERS ---

// Mock Wallet Data (for reference in forms)
const initialWallets = [
    { id: 1, title: 'Zambian Kwacha', symbol: 'ZMW', amount: 50000.00, icon: DollarSign, currencySymbol: 'K' },
    { id: 2, title: 'US Dollar', symbol: 'USD', amount: 1250.55, icon: CreditCard, currencySymbol: '$' },
    { id: 3, title: 'Euro', symbol: 'EUR', amount: 980.30, icon: Euro, currencySymbol: '€' },
];

// Helper to format currency
const formatAmount = (amount, symbol) => {
  return `${symbol} ${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
};

// Available Currencies for Diaspora Pay
const diasporaCurrencies = [
    { name: 'USD - US Dollar', symbol: 'USD' },
    { name: 'EUR - Euro', symbol: 'EUR' },
    { name: 'GBP - British Pound', symbol: 'GBP' },
    { name: 'ZMW - Zambian Kwacha (Local)', symbol: 'ZMW' },
];

// Available Visa options for Diaspora Pay
const diasporaVisas = [
    'Family Support Visa',
    'Education Payment Visa',
    'Investment Visa',
    'Property Purchase Visa',
];

// --- SUB-COMPONENT FORMS ---

/**
 * Basic P2P Money Transfer Form
 */
const SendMoneyForm = () => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [sourceCurrency, setSourceCurrency] = useState(initialWallets[0].symbol);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`[Action] P2P Send: ${sourceCurrency} ${amount} to ${recipient}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <Send className="w-5 h-5 mr-2 text-amber-500" />
                Standard Peer-to-Peer Transfer
            </h2>
            <p className="text-gray-500">Send money instantly to another local mobile wallet user.</p>

            {/* Recipient Input */}
            <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">Recipient Mobile Number/ID</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        id="recipient"
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="e.g., 260977xxxxxx or username"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                    />
                </div>
            </div>

            {/* Amount and Currency Selection (Simplified) */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0.01"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="sourceCurrency" className="block text-sm font-medium text-gray-700 mb-2">Source Wallet</label>
                    <select
                        id="sourceCurrency"
                        value={sourceCurrency}
                        onChange={(e) => setSourceCurrency(e.target.value)}
                        className="w-full py-3 px-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    >
                        {initialWallets.map((wallet) => (
                            <option key={wallet.symbol} value={wallet.symbol}>
                                {wallet.symbol} (Bal: {formatAmount(wallet.amount, wallet.currencySymbol)})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 text-lg font-bold rounded-xl text-white bg-amber-600 hover:bg-amber-700 transition transform hover:scale-[1.01] shadow-lg shadow-amber-500/50 mt-8"
            >
                <Send className="w-5 h-5 mr-2" />
                Initiate Transfer
            </button>
        </form>
    );
};

/**
 * Diaspora Pay Form (Detailed as requested)
 */
const DiasporaPayForm = () => {
    const [visa, setVisa] = useState(diasporaVisas[0]);
    const [currency, setCurrency] = useState(diasporaCurrencies[0].symbol);
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`[Action] Diaspora Pay: Visa: ${visa}, Currency: ${currency} ${amount}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-indigo-500" />
                International Remittance
            </h2>
            <p className="text-gray-500">Send money to or receive funds from abroad, ensuring compliance.</p>

            {/* Visa Selection */}
            <div>
                <label htmlFor="visa" className="block text-sm font-medium text-gray-700 mb-2">Select Purpose (Visa Type)</label>
                <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        id="visa"
                        value={visa}
                        onChange={(e) => setVisa(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {diasporaVisas.map((v) => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {/* Currency Selection */}
            <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">Target Currency</label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {diasporaCurrencies.map((c) => (
                            <option key={c.symbol} value={c.symbol}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Amount Input */}
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount to Send/Receive</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Amount in ${currency}`}
                    step="0.01"
                    min="0.01"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
            </div>
            
            <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-[1.01] shadow-lg shadow-indigo-500/50 mt-8"
            >
                <Globe className="w-5 h-5 mr-2" />
                Process International Transfer
            </button>
        </form>
    );
};

/**
 * Smart Pay Form (Schools & Bills)
 */
const SmartPayForm = () => {
    const [subCategory, setSubCategory] = useState('school'); // 'school' or 'bill'
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Smart Pay (Schools & Bills)
            </h2>
            <div className="flex space-x-4">
                <button 
                    onClick={() => setSubCategory('school')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${subCategory === 'school' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <Bookmark className="w-4 h-4 mr-2" /> Pay for School
                </button>
                <button 
                    onClick={() => setSubCategory('bill')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${subCategory === 'bill' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <ChevronsDown className="w-4 h-4 mr-2" /> Pay Bill
                </button>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                {subCategory === 'school' ? (
                    <p className="text-gray-600">Form for paying **School Fees** (Select Institution, Enter Student ID, Amount).</p>
                ) : (
                    <p className="text-gray-600">Form for paying **Utility Bills** (Select Service Provider, Enter Account Number, Amount).</p>
                )}
            </div>
        </div>
    );
};

/**
 * Insura Pay Form (Motor & Health)
 */
const InsuraPayForm = () => {
    const [subCategory, setSubCategory] = useState('motor'); // 'motor' or 'health'
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Insura Pay
            </h2>
            <div className="flex space-x-4">
                <button 
                    onClick={() => setSubCategory('motor')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${subCategory === 'motor' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <TrendingUp className="w-4 h-4 mr-2" /> Motor Insurance
                </button>
                <button 
                    onClick={() => setSubCategory('health')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${subCategory === 'health' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <Hospital className="w-4 h-4 mr-2" /> Health Insurance
                </button>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                {subCategory === 'motor' ? (
                    <p className="text-gray-600">Form for paying **Motor Insurance** (Enter Vehicle Reg, Policy No., Amount).</p>
                ) : (
                    <p className="text-gray-600">Form for paying **Health Insurance** (Enter Member ID, Provider, Premium Amount).</p>
                )}
            </div>
        </div>
    );
};

/**
 * Govt Pay Form (ZRA, PACRA, ZPPA)
 */
const GovtPayForm = () => {
    const [subCategory, setSubCategory] = useState('zra'); // 'zra', 'pacra', 'zppa'
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 flex items-center">
                <Banknote className="w-5 h-5 mr-2 text-blue-600" />
                Govt Pay
            </h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
                <button 
                    onClick={() => setSubCategory('zra')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${subCategory === 'zra' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <FileText className="w-4 h-4 mr-2" /> ZRA (Taxes)
                </button>
                <button 
                    onClick={() => setSubCategory('pacra')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${subCategory === 'pacra' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <MapPin className="w-4 h-4 mr-2" /> PACRA (Registration)
                </button>
                <button 
                    onClick={() => setSubCategory('zppa')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${subCategory === 'zppa' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <Calendar className="w-4 h-4 mr-2" /> ZPPA (Procurement)
                </button>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                <p className="text-gray-600">Form for paying **{subCategory.toUpperCase()}** fees/taxes (Enter Ref Number, Amount, Submit).</p>
            </div>
        </div>
    );
};


// --- MAIN TRANSFERS COMPONENT ---

const Transfers = () => {
    // State to manage the currently selected payment category
    const [currentCategory, setCurrentCategory] = useState('send');

    // Defines the main categories for the tab bar
    const categories = [
        { key: 'send', name: 'Send Money', icon: Send, color: 'text-amber-500' },
        { key: 'smart', name: 'Smart Pay', icon: Zap, color: 'text-yellow-500' },
        { key: 'insura', name: 'Insura Pay', icon: Shield, color: 'text-green-600' },
        { key: 'govt', name: 'Govt Pay', icon: Banknote, color: 'text-blue-600' },
        { key: 'diaspora', name: 'Diaspora Pay', icon: Globe, color: 'text-indigo-600' },
    ];

    const renderForm = () => {
        switch (currentCategory) {
            case 'smart':
                return <SmartPayForm />;
            case 'insura':
                return <InsuraPayForm />;
            case 'govt':
                return <GovtPayForm />;
            case 'diaspora':
                return <DiasporaPayForm />;
            case 'send':
            default:
                return <SendMoneyForm />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-nunito">
            {/* Sidebar */}
            <div className="hidden md:block md:w-[250px] border-r border-gray-200 shadow-lg">
                <Sidebar/>
            </div>
            <main className="flex flex-col flex-1 gap-8 px-6 md:px-10 py-8 overflow-y-auto no-scrollbar">
                <div className="flex-grow overflow-y-auto bg-gray-50">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Transfers & Payments</h1>
                    <p className="text-gray-500 mb-8">Select a service to initiate your payment.</p>

                    {/* Category Selector Tabs */}
                    <div className="flex space-x-2 sm:space-x-4 border-b border-gray-200 pb-2 mb-8 overflow-hidden overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setCurrentCategory(cat.key)}
                                className={`flex items-center px-4 py-3 rounded-xl font-semibold whitespace-nowrap transition duration-200 ${
                                    currentCategory === cat.key
                                        ? `bg-white border-b-4 border-${cat.color.replace('text-', '')}-500 shadow-md text-${cat.color.replace('text-', '')}-600`
                                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                            >
                                <cat.icon className={`w-5 h-5 mr-2 ${cat.color}`} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                    {/* Render the selected Form */}
                    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                        {renderForm()}
                    </div>
                </div>

                {/* Spacer for Footer */}
                <div className="h-20 sm:h-6" />
            </main>
            <FooterNav />
        </div>
            
        
    );
};

export default Transfers;
