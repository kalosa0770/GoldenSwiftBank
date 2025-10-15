import React, {useState, useRef, useEffect} from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Logo from '../assets/logo.jpeg';
import LadyImg from '../assets/ladyImg.jpeg';
import { Menu, X, ArrowRight, ArrowLeft, Zap, ShieldCheck, TrendingUp, MapPin, ReceiptText, Signal, Facebook, Twitter, Linkedin } from 'lucide-react';
 

// Header Section
const Header = ({onLoginClick, onSignUpClick}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-gray-200 p-4 shadow-2xl relative z-20">
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <div className="flex items-center">
                    <img 
                        src={Logo} 
                        alt="Golden Swift Logo" 
                        className='w-14 h-14 rounded-full border-2 border-amber-500 shadow-md shadow-amber-500' 
                    />
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-6 list-none text-sm">
                    <li><a href="#" className='no-underline text-gray-700 hover:text-amber-500 transition duration-150 font-semibold'>Home</a></li>
                    <li><a href="#" className='no-underline text-gray-700 hover:text-amber-500 transition duration-150 font-semibold'>About</a></li>
                    <li><a href="#" className='no-underline text-gray-700 hover:text-amber-500 transition duration-150 font-semibold'>Services</a></li>
                    <li className='bg-blue-600 hover:bg-blue-500 text-white rounded-full py-2 px-5 text-sm font-semibold transition duration-200'>
                        <a href="#" className='decoration-none text-white' onClick={onLoginClick} >Sign in</a>
                    </li>
                    <li className='bg-amber-500 hover:bg-amber-400 text-white rounded-full py-2 px-5 text-sm font-bold transition duration-200 shadow-lg'>
                        <a href="#" className='decoration-none text-white' onClick={onSignUpClick}>Sign up</a>
                    </li>
                </ul>

                {/* Hamburger Icon (Mobile) */}
                <button
                    className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-8 h-8 text-amber-600" /> : <Menu className="w-8 h-8 text-amber-600" />}
                </button>
            </nav>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-gray-200 shadow-lg z-30">
                    <ul className="flex flex-col items-center gap-4 py-6 text-sm">
                        <li><a href="#" className='no-underline text-gray-700 hover:text-amber-500 font-semibold'>Home</a></li>
                        <li><a href="#" className='no-underline text-gray-700 hover:text-amber-500 font-semibold'>About</a></li>
                        <li><a href="#" className='no-underline text-gray-700 hover:text-amber-500 font-semibold'>Services</a></li>
                        <li className='bg-blue-600 hover:bg-blue-500 text-white rounded-full py-2 px-5 text-sm font-semibold'>
                            <a href="#" className='decoration-none text-white' onClick={onLoginClick}>Sign in</a>
                        </li>
                        <li className='bg-amber-500 hover:bg-amber-400 text-white rounded-full py-2 px-5 text-sm font-bold shadow-lg'>
                            <a href="#" className='decoration-none text-white' onClick={onSignUpClick}>Sign up</a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

// Call to Action Section
const CallToAction = () => (
    <div className="grid md:grid-cols-2 gap-[10vw] grid-cols-1 items-center justify-center w-full text-center py-20 px-8">
        
        {/* Headline: Use deep navy for authority, with a strong amber highlight */}
        <div className="flex flex-col w-full text-start ">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                Enjoy Instant Transfers & Smart Saving
            </h1>
            {/* Sub-Headline: Clean, readable gray text */}
            <div className="text-lg md:text-xl font-medium text-gray-700 drop-shadow-sm mb-8 max-w-2xl">
                Experience seamless banking, instant transfers, and smart savings—all at your fingertips.
            </div>
            {/* CTA Button: Strongest Blue (Primary Brand Action) */}
        </div>

        {/* Sending Form */}
        <div className="flex items-center bg-gray-200 rounded-2xl shadow-sm p-6">
            <form className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                    <label htmlFor="sending-from" className="font-semibold text-gray-700 mb-1">Sending from</label>
                    <select id="sending-from" className="p-2 rounded-lg border border-gray-300">
                        <option value="">Select country</option>
                        <option value="Zambia">Zambia</option>
                        <option value="United States">United States</option>
                        <option value="China">China</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="sending-to" className="font-semibold text-gray-700 mb-1">Sending to</label>
                    <select id="sending-to" className="p-2 rounded-lg border border-gray-300">
                        <option value="">Select country</option>
                        <option value="Zambia">Zambia</option>
                        <option value="United States">United States</option>
                        <option value="China">China</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-xl transition duration-200"
                >
                    Send money
                </button>
            </form>
        </div> 
    </div>
);

const Features = () => (
    <section className="w-full py-10 px-8 bg-gray-50"> 
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white">
            
            {/* LEFT SIDE: Image Container */}
            <div className="flex bg-blue-100/50"> {/* Added a light blue background for the image container */}
                <img 
                    src={LadyImg} 
                    alt="A woman using a mobile financial application" 
                    className='w-full h-full object-cover lg:h-auto' // Use object-cover to ensure image fills the space cleanly
                />
            </div>
            
            {/* RIGHT SIDE: Text and Features Container */}
            <div className="flex flex-col p-4 md:p-8 justify-center">
                
                {/* Tagline */}
                <p className='text-sm uppercase tracking-widest text-gray-600 font-bold mb-3'>
                    Easy, Secure, and Reliable
                </p>
                
                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Why <br />Golden Swift?
                </h1>
                
                {/* Feature List */}
                <div className="space-y-6 mt-10">
                    
                    {/* Feature 1: Instant Transfer */}
                    <div className='flex items-start space-x-4'>
                        <Zap className="h-7 w-7 text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Instant Transfer.</h2>
                            <p className="text-gray-600 mt-1">Send and receive money instantly, anytime, anywhere in the world.</p> 
                        </div>
                    </div>
                    
                    {/* Feature 2: Smart Savings */}
                    <div className='flex items-start space-x-4'>
                        <TrendingUp className="h-7 w-7 text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Smart Savings.</h2>
                            <p className="text-gray-600 mt-1">Digitize your savings and reach your financial goals with smart tools.</p> 
                        </div>
                    </div>
                    
                    {/* Feature 3: Secure Banking */}
                    <div className='flex items-start space-x-4'>
                        <ShieldCheck className="h-7 w-7 text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Secure Banking.</h2>
                            <p className="text-gray-600 mt-1">Your data and transactions are protected with top-tier security and encryption.</p> 
                        </div>
                    </div>
                    
                </div>
                
                {/* CTA Button */}
                <button className='mt-12 w-full md:w-auto self-start bg-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-[1.02] active:scale-95'>
                    Get Started Today
                </button>
                
            </div>
        </div>
    </section>
);

const serviceItems = [
    { title: "Instant Transfers", 
      icon: <Zap className="w-10 h-10 text-amber-500" />,
      description: "Send and receive funds in seconds, eliminating delays and hassle. Your money moves at the speed of life." 
    },
    { title: "Smart Savings", 
      icon: <TrendingUp className="w-10 h-10 text-amber-500" />,
      description: "Digitize your savings goals, set automated rules, and watch your finances grow intelligently. Start building wealth today." 
    },
    { title: "Cash In/Out Network", 
      icon: <MapPin className="w-10 h-10 text-amber-500" />,
      description: "Access cash easily through our vast agent network. The physical and digital meet seamlessly." 
    },
    { title: "Pay Bills Globally", 
      icon: <ReceiptText className="w-10 h-10 text-amber-500" />,
      description: "Pay utility bills, tuition, and subscriptions for family or business, all from one secure dashboard." 
    },
    { title: "Airtime Top-Up", 
      icon: <Signal className="w-10 h-10 text-amber-500" />,
      description: "Instantly top up mobile airtime for any major network. Stay connected with loved ones effortlessly." 
    },
];

// Component
const Services = () => {
    const [current, setCurrent] = useState(0);
    // State to track direction
    const [direction, setDirection] = useState('forward');

    const nodeRef = useRef(null);

    const prevSlide = () => {
        setDirection('backward');
        setCurrent(current === 0 ? serviceItems.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setDirection('forward');
        setCurrent(current === serviceItems.length - 1 ? 0 : current + 1);
    };
    
    // Get the current item's
    const currentItem = serviceItems[current];

    // Determine the class to use based on the direction state
    const transitionClass = direction === 'forward' ? 'slide' : 'slide-back';
    
    return (
        <div  className="grid grid-cols-1 md:grid-cols-2 bg-gray-200 py-20 px-4 md:px-8 items-center justify-center w-full max-w-7xl mx-auto">
            
            {/* LEFT SIDE: Headline & Controls */}
            <div className="flex flex-col p-4 md:p-8">
                <h1 className="text-gray-900 font-extrabold text-4xl md:text-6xl mb-6">All In One</h1>
                <p className="text-gray-600 text-lg max-w-md mb-8">
                    Manage all your essential financial needs with seamless integration in one place.
                </p>
                <div className="flex gap-4">
                    {/* Previous Button */}
                    <button 
                        onClick={prevSlide} 
                        className='rounded-full bg-amber-500 text-white p-3 shadow-md hover:bg-amber-600 transition duration-150 transform hover:scale-105 active:scale-95'
                        aria-label="Previous Service"
                    >
                        <ArrowLeft className='w-6 h-6' />
                    </button>
                    {/* Next Button */}
                    <button 
                        onClick={nextSlide} 
                        className='rounded-full bg-amber-500 text-white p-3 shadow-md hover:bg-amber-600 transition duration-150 transform hover:scale-105 active:scale-95'
                        aria-label="Next Service"
                    >
                        <ArrowRight className='w-6 h-6' />
                    </button>
                </div>
                
                {/* Indicator Dots */}
                <div className="flex gap-2 mt-6">
                    {serviceItems.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === current ? 'w-8 bg-blue-600' : 'w-2 bg-gray-400'
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
            
            {/* RIGHT SIDE: Animated Card  */}
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={currentItem.title} 
                    nodeRef={nodeRef}
                    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                    classNames={transitionClass} 
                    timeout={300} 
                >
                    <div 
                        className="bg-white rounded-3xl shadow-xl p-8 md:p-12 h-96 flex flex-col justify-between service-card relative overflow-hidden"
                    >
                        {/* Icon and Title */}
                        <div className="flex items-center space-x-4 mb-4">
                            {currentItem.icon}
                            <h2 className="text-3xl font-extrabold text-gray-800">
                                {currentItem.title}
                            </h2>
                        </div>
                        
                        {/* Description Content */}
                        <p className="text-lg text-gray-600 flex-grow">
                            {currentItem.description}
                        </p>

                        {/* Card Footer */}
                        <button className='mt-8 w-40 text-blue-600 border border-blue-600 font-semibold py-2 rounded-full hover:bg-blue-50 transition duration-200'>
                            Learn More
                        </button>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}


    

const Steps = () => {
    return (
        <section className="py-20 bg-white items-center justify-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
                    Get Started in 3 Easy Steps
                </h2>
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-[auto, 1fr] gap-x-4 relative">
                    
                        <div className="absolute left-6  h-full w-0.5 bg-gray-300" aria-hidden="true"></div>

                        {/* --- Step 1 --- */}
                        <div className="flex mb-12 relative">
                            <div className="flex flex-col items-center mr-6 w-12 z-10 flex-shrink-0">
                                {/* Number Circle */}
                                <div className="size-12 rounded-full bg-gray-600 shadow-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl font-bold">1</span>
                                </div>
                            </div>

                            {/* Right Column: Content */}
                            <div className="flex flex-col text-left pt-2">
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">Create a profile</h3>
                                <p className="text-gray-600">
                                    Setup only takes a few minutes with basic personal information.
                                </p>
                            </div>
                        </div>

                        {/* --- Step 2 --- */}
                        <div className="flex mb-12 relative">
                            {/* Left Column: Number and Line Connection */}
                            <div className="flex flex-col items-center mr-6 w-12 z-10 flex-shrink-0">
                                {/* Number Circle */}
                                <div className="size-12 rounded-full bg-gray-600 shadow-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl font-bold">2</span>
                                </div>
                            </div>

                            {/* Right Column: Content */}
                            <div className="flex flex-col text-left pt-2">
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">Choose how to send</h3>
                                <p className="text-gray-600">
                                    You can send money conveniently in-app, online, or in person.
                                </p>
                            </div>
                        </div>

                        {/* --- Step 3 --- */}
                        <div className="flex relative">
                            {/* Left Column: Number and Line Connection */}
                            <div className="flex flex-col items-center mr-6 w-12 z-10 flex-shrink-0">
                                {/* Number Circle */}
                                <div className="size-12 rounded-full bg-gray-600 shadow-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl font-bold">3</span>
                                </div>
                            </div>

                            {/* Right Column: Content */}
                            <div className="flex flex-col text-left pt-2">
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">Track your transfer</h3>
                                <p className="text-gray-600">
                                    Stay updated with real-time notifications from start to finish.
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>

                
                
                {/* CTA Button */}
                <button className='mt-16 bg-gray-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-amber-600 transition duration-300 mx-auto block'>
                    Sign Up Now
                </button>
            </div>
        </section>
    );
}

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

                    {/* Column 1: Logo and Contact */}
                    <div className="col-span-2 md:col-span-2 space-y-4">
                        <h3 className="text-3xl font-extrabold text-white">Golden Swift</h3>
                        <p className="text-gray-400 text-sm">
                            Africa’s All-in-One Wallet for People
                        </p>
                        <div className="pt-2">
                            <p className="text-sm font-semibold text-amber-500">Support:</p>
                            <p className="text-gray-300 text-sm">support@goldenswift.com</p>
                            <p className="text-gray-300 text-sm">+260770940809</p>
                        </div>
                    </div>

                    {/* Column 2: Company Links */}
                    <div className="col-span-1 space-y-3">
                        <h4 className="text-lg font-bold text-gray-100 mb-2">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition">About Us</a></li>
                            <li><a href="/press" className="text-gray-400 hover:text-blue-400 transition">Press & Media</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Services & Features */}
                    <div className="col-span-1 space-y-3">
                        <h4 className="text-lg font-bold text-gray-100 mb-2">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/send" className="text-gray-400 hover:text-blue-400 transition">Transfer</a></li>
                            <li><a href="/savings" className="text-gray-400 hover:text-blue-400 transition">Smart Savings</a></li>
                            <li><a href="/pay-bills" className="text-gray-400 hover:text-blue-400 transition">Bill Payments</a></li>
                            <li><a href="/cash-network" className="text-gray-400 hover:text-blue-400 transition">Cash Network</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Help */}
                    <div className="col-span-1 space-y-3">
                        <h4 className="text-lg font-bold text-gray-100 mb-2">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/faq" className="text-gray-400 hover:text-blue-400 transition">FAQ</a></li>
                            <li><a href="/security" className="text-gray-400 hover:text-blue-400 transition">Security</a></li>
                            <li><a href="/privacy" className="text-gray-400 hover:text-blue-400 transition">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-gray-400 hover:text-blue-400 transition">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* --- Separator and Bottom Bar --- */}
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
                    
                    {/* Copyright */}
                    <p className="text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
                        &copy; {new Date().getFullYear()} Golden Swift. All rights reserved.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex space-x-6 order-1 md:order-2">
                        <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition">
                            <Twitter />
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400 transition">
                            <Linkedin />
                        </a>
                        <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 transition">
                            <Facebook />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const HomePage = ({onLoginClick, onSignUpClick}) => (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans relative overflow-hidden">
        
        <Header onLoginClick={onLoginClick} onSignUpClick={onSignUpClick}/>
        <div className="flex-1 flex items-center justify-center">
            <CallToAction />
        </div>
        <Features />
        <Services />
        <Steps />
        <Footer />
    </div>
);

export default HomePage;