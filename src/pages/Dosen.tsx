import { useEffect, useState, useRef, useCallback } from 'react';
import { api, getImageBaseURL } from '../config/hooks';
import Navbar from './composable/Navbar';
import { X } from 'lucide-react';
import Footer from './composable/Footer';
import LoadingSpinner from '../setLoading/SetLoading';
import AOS from 'aos';

interface FotoData {
  id: number;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

interface DeskripsiDosen {
  id: number;
  About: string;
  Address: string;
  email: string;
  phone: string;
  year_in: number;
}

interface DosenData {
  id: number;
  documentId: string;
  name: string;
  Deskripsi: string;
  code: string;
  Foto: FotoData | null;
  deskripsi_dosen: DeskripsiDosen | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const Dosen = () => {
  const [dosenList, setDosenList] = useState<DosenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingCountRef = useRef(0);
  const [selectedDosen, setSelectedDosen] = useState<DosenData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoading = useCallback((loading: boolean) => {
    if (loading) {
      loadingCountRef.current += 1;
      setIsLoading(true);
    } else {
      loadingCountRef.current = Math.max(0, loadingCountRef.current - 1);
      setTimeout(() => {
        if (loadingCountRef.current === 0) {
          setIsLoading(false);
        }
      }, 50);
    }
  }, []);

  useEffect(() => {
    handleLoading(true);
    const axios = api();
    axios
      .get('dosens?populate=*')
      .then((res) => {
        const data = res.data?.data || [];
        setDosenList(data);
        handleLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching dosen:', err);
        handleLoading(false);
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      AOS.refresh();
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#e4f6ff]">
      <Navbar />
      
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <div className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-black/40 bg-cover bg-center shadow-lg brightness-50" 
             style={{
               backgroundImage: 'url(/parallax.jpg)'
             }}>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5" data-aos="fade-down">
            Daftar Dosen
          </h1>
          <div className="w-52 h-2 bg-[#f0cd02] mx-auto" data-aos="fade-up" data-aos-delay="100"></div>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {dosenList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {dosenList.map((dosen, index) => (
                <div
                  key={dosen.id}
                  onClick={() => {
                    setSelectedDosen(dosen);
                    setIsModalOpen(true);
                  }}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 flex flex-col items-center text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {dosen.Foto?.url ? (
                    <img
                      src={`${getImageBaseURL()}${dosen.Foto.url}`}
                      alt={dosen.name}
                      className="w-36 h-36 mb-4 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-36 h-36 mb-4 rounded-full bg-gradient-to-br from-[#013d7b] to-[#206fa0] flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {dosen.name ? dosen.name.charAt(0).toUpperCase() : 'D'}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {dosen.name || 'Dosen'}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {dosen.Deskripsi || 'Tidak ada deskripsi'}
                  </p>
                </div>
              ))}
                    </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Tidak ada data dosen</p>
                  </div>
          )}
                    </div>
                  </div>
                        
      {isModalOpen && selectedDosen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="p-5">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0">
                  {selectedDosen.Foto?.url ? (
                    <img
                      src={`${getImageBaseURL()}${selectedDosen.Foto.url}`}
                      alt={selectedDosen.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#206fa0]"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#013d7b] to-[#206fa0] flex items-center justify-center border-2 border-[#206fa0]">
                      <span className="text-white text-4xl font-bold">
                        {selectedDosen.name ? selectedDosen.name.charAt(0).toUpperCase() : 'D'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-0.5">
                    {selectedDosen.name || 'Dosen'}
                  </h3>
                  {selectedDosen.Deskripsi && (
                    <p className="text-sm text-gray-500 mb-2">
                      {selectedDosen.Deskripsi}
                    </p>
                  )}
                </div>
              </div>

              {selectedDosen.deskripsi_dosen?.About && (
                <div className="mt-3 bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedDosen.deskripsi_dosen.About}
                  </p>
                </div>
              )}

              <p className="mt-4 text-xs text-gray-400">
                {new Date(selectedDosen.publishedAt).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
export default Dosen;
