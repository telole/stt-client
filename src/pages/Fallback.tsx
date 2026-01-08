import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './composable/Navbar';

export default function Fallback() {
    const navigate = useNavigate();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
    }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen bg-white relative overflow-hidden mx-auto flex items-center justify-center px-4 py-20 pt-32">
                {/* Floating Particles Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-[#f0cd02] opacity-10"
                            style={{
                                width: Math.random() * 60 + 10,
                                height: Math.random() * 60 + 10,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="flex flex-col items-center max-w-4xl w-full relative z-10">
                    <div className="w-full max-w-[913px] h-[481px] flex-shrink-0 relative z-10 flex items-center justify-center mb-[-60px]">
                        <div
                            className={`w-[142px] h-[192px] bg-center bg-cover bg-no-repeat relative z-30 transition-all duration-1000 ${
                                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{
                                backgroundImage: 'url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-08/h3q4Gq6yvz.png)'
                            }}
                        />
                        <span 
                            className={`absolute inset-0 flex items-center justify-center text-[200px] md:text-[300px] lg:text-[400px] font-black leading-[480px] text-center whitespace-nowrap z-20 transition-all duration-1000 ${
                                isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}
                            style={{ 
                                fontFamily: 'Poppins, sans-serif',
                                animation: 'pulse 2s ease-in-out infinite',
                                color: 'rgba(240,205,2,0.4)',
                                textShadow: '0 0 20px rgba(240,205,2,0.3), 0 0 40px rgba(240,205,2,0.2), 0 4px 8px rgba(0,0,0,0.1)',
                                WebkitTextStroke: '2px rgba(240,205,2,0.6)',
                                WebkitTextFillColor: 'rgba(240,205,2,0.5)'
                            }}
                        >
                            404
                        </span>
                    </div>

                    <div className={`flex flex-col gap-5 justify-center items-center flex-shrink-0 flex-wrap-nowrap relative z-40 max-w-[672px] w-full mt-8 transition-all duration-1000 delay-300 ${
                        isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <span 
                            className="flex w-full justify-center items-start flex-shrink-0 text-4xl md:text-5xl lg:text-6xl font-bold text-[#013d7b] text-center whitespace-nowrap animate-bounce-subtle"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            Halaman tidak ditemukan!
                        </span>
                        <button
                            onClick={handleBackToHome}
                            className="flex w-[209px] px-5 py-[15px] gap-2.5 justify-center items-center flex-shrink-0 bg-[#013d7b] rounded-[10px] cursor-pointer hover:bg-[#012a5a] transition-all duration-300 transform hover:scale-110 hover:shadow-lg animate-bounce-button"
                        >
                            <span 
                                className="h-5 flex-shrink-0 text-base font-bold text-white whitespace-nowrap"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Kembali ke Beranda
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.2;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.3;
                        transform: scale(1.05);
                    }
                }

                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                @keyframes bounce-button {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-3px) scale(1.02);
                    }
                }

                .animate-bounce-subtle {
                    animation: bounce-subtle 2s ease-in-out infinite;
                }

                .animate-bounce-button {
                    animation: bounce-button 2s ease-in-out infinite;
                    animation-delay: 0.5s;
                }
            `}</style>
        </>
    );
}