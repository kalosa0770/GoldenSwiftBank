import React from 'react';
import { 
    User, 
    Settings, 
    Lock, 
    Shield, 
    Bell, 
    CreditCard, 
    Briefcase,
    Mail,
    Phone,
    Key,
    UserCheck,
    HelpCircle,
    FileText,
    LogOut // LogOut icon imported for the new button
} from 'lucide-react';
import { Sidebar } from 'lucide-react';
import FooterNav from '../FooterNav';

// Mock User Data
const mockUser = {
    name: 'Jane Doe',
    walletId: 'GDS-238475-USD',
    email: 'jane.doe@example.com',
    phone: '+260 977 555 123',
    status: 'Verified',
};

// Reusable component for a single setting item
const SettingItem = ({ icon: Icon, title, description, actionText, onClick }) => (
    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-100">
        <div className="flex items-center">
            <div className="p-3 mr-4 rounded-full bg-amber-500 bg-opacity-10 text-amber-600">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
        <button
            onClick={onClick}
            className="text-sm font-medium text-amber-600 hover:text-amber-700 transition duration-150 py-1 px-3 rounded-lg border border-amber-600 hover:border-amber-700"
        >
            {actionText || 'Manage'}
        </button>
    </div>
);


/**
 * Accounts Component
 * Displays user profile, security settings, and application preferences.
 */
const Accounts = () => {
    // Simulated action handler
    const handleAction = (setting) => {
        console.log(`[Action] Attempting to manage: ${setting}`);
        // In a real app, this would trigger a modal or routing event, especially for 'Logout'.
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-nunito">
            {/* Sidebar */}
            <div className="hidden md:block md:w-[250px] border-r border-gray-200 shadow-lg">
                <Sidebar/>
            </div>
            <main className="flex flex-col flex-1 gap-8 px-6 md:px-10 py-8 overflow-y-auto no-scrollbar">
                <div className="p-4 sm:p-8 flex-grow overflow-y-auto bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Account Management</h1>
                        <p className="text-gray-500 mb-8">Update your profile, security, and app preferences.</p>

                        {/* 1. User Profile Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 mb-10">
                            <div className="flex items-center border-b pb-5 mb-5">
                                <div className="w-16 h-16 bg-amber-500 text-white flex items-center justify-center rounded-full text-2xl font-bold mr-6 shadow-lg">
                                    {mockUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="2xl font-bold text-gray-800 flex items-center">
                                        {mockUser.name}
                                        <UserCheck className="w-5 h-5 ml-2 text-green-500" />
                                    </h2>
                                    <p className="text-md text-gray-600 font-mono mt-1">ID: {mockUser.walletId}</p>
                                </div>
                                <button 
                                    onClick={() => handleAction('Edit Profile')}
                                    className="ml-auto text-sm font-semibold text-amber-600 hover:text-amber-700 transition"
                                >
                                    Edit Profile
                                </button>
                            </div>

                            {/* Contact Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                                    <span>{mockUser.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                                    <span>{mockUser.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Security Settings */}
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center">
                            <Lock className="w-6 h-6 mr-3 text-red-500" />
                            Security & Access
                        </h2>
                        <div className="space-y-4 mb-10">
                            <SettingItem
                                icon={Key}
                                title="Change Password"
                                description="Update your primary login password securely."
                                actionText="Update"
                                onClick={() => handleAction('Change Password')}
                            />
                            <SettingItem
                                icon={Shield}
                                title="Two-Factor Authentication (2FA)"
                                description="Add an extra layer of security to your account."
                                actionText="Setup 2FA"
                                onClick={() => handleAction('Setup 2FA')}
                            />
                            <SettingItem
                                icon={CreditCard}
                                title="Wallet PIN Management"
                                description="Manage your transaction PIN for quick payments."
                                actionText="Manage PIN"
                                onClick={() => handleAction('Manage PIN')}
                            />
                        </div>

                        {/* 3. General Preferences */}
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center">
                            <Settings className="w-6 h-6 mr-3 text-blue-500" />
                            General Preferences
                        </h2>
                        <div className="space-y-4 mb-10">
                            <SettingItem
                                icon={Bell}
                                title="Notification Settings"
                                description="Control email, SMS, and push notification alerts."
                                onClick={() => handleAction('Manage Notifications')}
                            />
                            <SettingItem
                                icon={Briefcase}
                                title="Linked Bank Accounts"
                                description="Manage the bank accounts linked to your wallet."
                                actionText="Link/Remove"
                                onClick={() => handleAction('Linked Accounts')}
                            />
                        </div>

                        {/* 4. Support and Legal */}
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center">
                            <HelpCircle className="w-6 h-6 mr-3 text-gray-500" />
                            Support & Legal
                        </h2>
                        <div className="space-y-4">
                            <SettingItem
                                icon={HelpCircle}
                                title="Customer Support"
                                description="Get help with transactions, disputes, or technical issues."
                                actionText="Get Help"
                                onClick={() => handleAction('Customer Support')}
                            />
                            <SettingItem
                                icon={FileText}
                                title="Terms and Conditions"
                                description="Review our service agreement and legal policies."
                                actionText="View"
                                onClick={() => handleAction('View Terms')}
                            />
                        </div>
                        
                        {/* 5. Logout Button */}
                        <div className="mt-12 pt-6 border-t border-gray-300">
                            <button
                                onClick={() => handleAction('Logout')}
                                className="w-full flex items-center justify-center py-3 px-4 text-lg font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 transition transform hover:scale-[1.005] shadow-lg shadow-red-500/50"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Log Out of Golden Swift
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-3">Securely disconnect your session.</p>
                        </div>
                    </div>
                </div>
                {/* Spacer for Footer */}
                <div className="h-20 sm:h-6" />
            </main>
            <FooterNav />
            
        </div>
    );
};

export default Accounts;
