// import React from 'react';

import { useNavigate } from 'react-router-dom';
import blackThunderLogo from '../images/black_thunder_logo.png';

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#171717] flex flex-col">

            {/* Header */}
            <header className="flex justify-between items-center px-12 py-6">
                {/* Logo */}
                <div className="flex items-center">
                    <img 
                        src={blackThunderLogo} 
                        alt="BlackThunder" 
                        className="w-14 h-14 rounded-[46px] mr-2"
                    />
                    <h1 className="text-[#FFE0C2] text-2xl font-normal">
                        BlackThunder
                    </h1>
                </div>

                {/* Navigation Menu */}
                <nav className="flex space-x-8">
                    <a href="#" className="text-white/70 text-lg font-normal hover:text-[#FFE0C2] transition-colors">
                        Suport
                    </a>
                    <a href="#" className="text-white/70 text-lg font-normal hover:text-[#FFE0C2] transition-colors">
                        Discord
                    </a>
                    <a href="#" className="text-white/70 text-lg font-normal hover:text-[#FFE0C2] transition-colors">
                        Features
                    </a>
                    <a href="#" className="text-white/70 text-lg font-normal hover:text-[#FFE0C2] transition-colors">
                        Pricing
                    </a>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center">
                {/* 404 Number */}
                <div className="flex items-center justify-center mb-3">
                    <span className="text-[#FFE0C2] text-8xl font-normal leading-[1.302]">
                        4
                    </span>
                    <span className="text-[#FFE0C2] text-8xl font-normal leading-[1.302] mx-4">
                        0
                    </span>
                    <span className="text-[#FFE0C2] text-8xl font-normal leading-[1.302]">
                        4
                    </span>
                </div>

                {/* Back to Home Button */}
                <button
                    onClick={handleBackToHome}
                    className="bg-[#393028] text-[#FFE0C2] px-16 py-3 rounded-[38px] text-2xl font-light hover:bg-[#4a3a35] transition-colors duration-200 cursor-pointer"
                >
                    Back to Home
                </button>
            </main>
        </div>
    );
};

export default NotFound;
