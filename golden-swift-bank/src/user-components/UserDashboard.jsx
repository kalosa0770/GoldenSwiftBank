import React from 'react';
import Header from './Header'; 
import Greeting from './Greeting'; 
import ActionButtons from './ActionButtons'; 
import MyWallets from './MyWallets'; 
import VirtualCard from './VirtualCard'; 
import FooterNav from './FooterNav'; 

const UserDashboard = () => {
    return (
        // The main container 
        <div className="flex flex-col min-h-screen bg-gray-50 pb-20"> 
            
            {/* Header */}
            <header className="sticky top-0 z-10 bg-gray-50 shadow-sm p-4">
                <Header />
            </header>
            
            {/* Main Content Scrollable Area */}
            <main className='flex flex-col p-4 gap-6 flex-grow'>
                
                {/* Greeting & Balance */}
                <Greeting />
                
                {/* Scrollable Action Buttons */}
                <ActionButtons />
                
                {/* Financial Overview Cards */}
                <MyWallets />
                
                {/* Premium Card Display */}
                <VirtualCard />
                
                {/* Spacer to push content above the fixed footer */}
                <div className="h-6"></div> 
            </main>
            
            {/* Fixed Footer Navigation */}
            <FooterNav />
        </div>
    );
}

export default UserDashboard;