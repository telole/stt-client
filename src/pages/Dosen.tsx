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
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {selectedDosen.name || 'Dosen'}
                  </h3>
                  {selectedDosen.deskripsi_dosen?.year_in && (
                    <p className="text-sm text-gray-400 mb-2">
                      Bergabung {selectedDosen.deskripsi_dosen.year_in}
                    </p>
                  )}
                  {selectedDosen.deskripsi_dosen?.About && (
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                      {selectedDosen.deskripsi_dosen.About}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  <div className="space-y-2.5">
                    {selectedDosen.deskripsi_dosen?.Address && (
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-[#206fa0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">{selectedDosen.deskripsi_dosen.Address}</span>
                      </div>
                    )}
                    {selectedDosen.deskripsi_dosen?.email && (
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-[#206fa0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <span className="text-sm text-gray-600">{selectedDosen.deskripsi_dosen.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {selectedDosen.deskripsi_dosen?.phone && (
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-[#206fa0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm text-gray-600">{selectedDosen.deskripsi_dosen.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#206fa0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {new Date(selectedDosen.publishedAt).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
export default Dosen;
