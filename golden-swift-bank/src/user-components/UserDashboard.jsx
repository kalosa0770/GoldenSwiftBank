import React from 'react';
import Header from './Header'; 
import Greeting from './Greeting'; 
import ActionButtons from './ActionButtons'; 
import MyWallets from './MyWallets'; 
import VirtualCard from './VirtualCard'; 
import FooterNav from './FooterNav';
import Sidebar from './Sidebar'; 

const UserDashboard = () => {
    return (
        // The main container 
        <div className="md:grid md:grid-cols-[250px_1fr] min-h-screen bg-gray-50 w-100"> 
            <Sidebar />
            {/* Header */}
            <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-10 bg-gray-100 pt-6 pb-4 border-b border-gray-100 shadow-sm transition duration-300">
                    <Header />
                </header>
                
                {/* Main Content Scrollable Area */}
                <main className='flex flex-col p-4 gap-8 flex-grow overflow-y-auto no-scrollbar'>
                    
                    {/* Greeting & Balance */}
                    <Greeting />
                    
                    {/* Scrollable Action Buttons */}
                    <ActionButtons />
                    
                    {/* Financial Overview Cards */}
                    <MyWallets />
                    
                    {/* Premium Card Display */}
                    <VirtualCard />
                    
                    {/* Spacer to push content above the fixed footer */}
                    <div className="h-20 sm:h-6"></div> 
                </main>
                
                {/* Fixed Footer Navigation */}
                <FooterNav />
            </div>
        </div>
    );
}

export default UserDashboard;