import { useNavigate } from 'react-router-dom';

// Import all required components (assuming they exist)
import Header from './Header'; 
import Greeting from './Greeting'; 
import ActionButtons from './ActionButtons'; 
import MyWallets from './MyWallets'; 
import VirtualCard from './VirtualCard'; 
import FooterNav from './FooterNav';
import Sidebar from './Sidebar'; 

const UserDashboard = () => {
    const navigate = useNavigate();

    // 💡 LOGOUT FUNCTION: Clears the token and redirects to /login
    const handleLogout = () => {
        // 1. Clear the authentication token - 🔑 FIX APPLIED HERE 🔑
        localStorage.removeItem('authToken'); // Changed from 'token'
        
        // 2. Redirect the user to the login page
        navigate('/login', { replace: true });
    };

    return (
        <div className="relative md:grid md:grid-cols-[250px_1fr] min-h-screen bg-gray-50 w-full"> 
            
            {/* Sidebar (Desktop/Tablet View) */}
            <div className="hidden md:block h-full border-r border-gray-200 shadow-lg">
                {/* Ensure the Sidebar component uses the updated handleLogout prop */}
                <Sidebar logout={handleLogout} /> 
            </div>

            {/* Main Content Column */}
            <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-10 bg-white pt-4 pb-3 border-b border-gray-200 shadow-sm transition duration-300 px-4">
                    <Header />
                </header>
                
                {/* Main Content Scrollable Area */}
                <main className='flex flex-col p-4 gap-8 flex-grow overflow-y-auto no-scrollbar'>
                    
                    <Greeting />
                    <ActionButtons />
                    
                    {/* ... other components ... */}

                    <MyWallets />
                    <VirtualCard />
                    
                    {/* Spacer for FooterNav on mobile */}
                    <div className="h-20 sm:h-6"></div> 
                </main>
                
                {/* Footer Navigation (typically fixed/mobile-only) */}
                <FooterNav />
            </div>
        </div>
    );
}

export default UserDashboard;