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
        // 1. Correct w-100 to w-full.
        // 2. Add 'relative' back for stacking context, which is good practice.
        <div className="relative md:grid md:grid-cols-[250px_1fr] min-h-screen bg-gray-50 w-full"> 
            
            {/* FIX: Hide the Sidebar component on mobile screens. 
              It will only be displayed when the grid layout (md:grid) takes effect.
            */}
            <div className="hidden md:block h-full">
                <Sidebar />
            </div>

            {/* Main Content Column */}
            <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-10 bg-gray-100 pt-6 pb-4 border-b border-gray-100 shadow-sm transition duration-300">
                    <Header />
                </header>
                
                {/* Main Content Scrollable Area */}
                <main className='flex flex-col p-4 gap-8 flex-grow overflow-y-auto no-scrollbar'>
                    
                    <Greeting />
                    <ActionButtons />
                    <MyWallets />
                    <VirtualCard />
                    
                    {/* Spacer (Necessary only if FooterNav is fixed/mobile-only) */}
                    <div className="h-20 sm:h-6"></div> 
                </main>
                
                {/* FIX: Ensure FooterNav is FIXED on mobile and hidden on desktop 
                  (or whatever your mobile-first design requires).
                  This styling likely needs to be inside FooterNav.
                */}
                <FooterNav />
            </div>
        </div>
    );
}

export default UserDashboard;