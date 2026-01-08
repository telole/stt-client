import { useNavigate } from 'react-router-dom';
import Navbar from './composable/Navbar';

export default function Fallback() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <>
            <div className="w-full min-h-screen bg-white relative overflow-hidden mx-auto flex items-center justify-center px-4 py-20 pt-32">
            <div className="flex flex-col items-center max-w-4xl w-full relative">
                <div className="w-full max-w-[913px] h-[481px] flex-shrink-0 relative z-10 flex items-center justify-center mb-[-60px]">
                    <div
                        className="w-[142px] h-[192px] bg-center bg-cover bg-no-repeat relative z-30"
                        
                    />
                    <span 
                        className="absolute inset-0 flex items-center justify-center text-[400px] font-bold leading-[480px] text-[rgba(240,205,2,0.2)] text-center whitespace-nowrap z-20"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        404
                    </span>
                </div>

                <div className="flex flex-col gap-5 justify-center items-center flex-shrink-0 flex-wrap-nowrap relative z-40 max-w-[672px] w-full mt-8">
                    <span 
                        className="flex w-full justify-center items-start flex-shrink-0 text-5xl md:text-6xl font-bold text-[#013d7b] text-center whitespace-nowrap"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Halaman tidak ditemukan!
                    </span>
                    <button
                        onClick={handleBackToHome}
                        className="flex w-[209px] px-5 py-[15px] gap-2.5 justify-center items-center flex-shrink-0 bg-[#013d7b] rounded-[10px] cursor-pointer hover:bg-[#012a5a] transition-colors duration-200"
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
        </>
    );
}