import { useNavigate } from 'react-router-dom';
import TasksLogo from '../images/black_thunder_logo.png';
import NotFoundImage from '../images/ChatGPT Image 8_08_2025, 10_40_33.png';

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="h-screen bg-[#171717] flex flex-col overflow-hidden">
            {/* Header */}
            <header className="flex justify-between items-center px-12 py-6">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src={TasksLogo}
                        alt="TASKS"
                        className="w-14 h-14 rounded-[46px] mr-2"
                    />
                    <h1 className="text-[#FFE0C2] text-2xl font-normal">
                        TASK'S
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
            <main className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden">
                {/* Coluna Esquerda */}
                <div className="flex flex-col items-center justify-center">
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
                </div>

                {/* Coluna Direita */}
                <div className="bg-[#FFE0C2] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                    <img
                        src={NotFoundImage}
                        alt="Not Found"
                        className="max-h-[60vh] w-auto object-contain rounded-lg"
                    />
                    <h2 className="mt-6 text-3xl font-light text-[#171717]">
                        Manage your tasks like a lightning bolt
                    </h2>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
