import { useEffect, useState } from 'react';
import { api } from '../config/hooks';
import Navbar from './composable/Navbar';
import { X } from 'lucide-react';
import Footer from './composable/Footer';

interface DosenData {
  id: number;
  documentId: string;
  About: string;
  Address: string;
  email: string;
  phone: string;
  year_in: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const Dosen = () => {
  const [dosenList, setDosenList] = useState<DosenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDosen, setSelectedDosen] = useState<DosenData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const axios = api();
    axios
      .get('deskripsi-dosens')
      .then((res) => {
        const data = res.data?.data || [];
        setDosenList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching dosen:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e4f6ff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013d7b] mx-auto"></div>
          <p className="mt-4 text-[#013d7b]">Memuat data dosen...</p>
            </div>
          </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e4f6ff]">
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-black/40 bg-cover bg-center shadow-lg brightness-50" 
             style={{
               backgroundImage: 'url(/parallax.jpg)'
             }}>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Daftar Dosen
          </h1>
          <div className="w-52 h-2 bg-[#f0cd02] mx-auto"></div>
        </div>
                    </div>

      <div className="py-16 px-4 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {dosenList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {dosenList.map((dosen) => (
                <div
                  key={dosen.id}
                  onClick={() => {
                    setSelectedDosen(dosen);
                    setIsModalOpen(true);
                  }}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 flex flex-col items-center text-center"
                >
                  <div className="w-36 h-36 mb-4 rounded-full bg-gradient-to-br from-[#013d7b] to-[#206fa0] flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {dosen.email ? dosen.email.charAt(0).toUpperCase() : 'D'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {dosen.email ? dosen.email.split('@')[0] : 'Dosen'}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Bergabung {dosen.year_in}
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
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Detail Dosen</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#013d7b] to-[#206fa0] flex items-center justify-center mx-auto md:mx-0">
                    <span className="text-white text-4xl font-bold">
                      {selectedDosen.email ? selectedDosen.email.charAt(0).toUpperCase() : 'D'}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedDosen.email ? selectedDosen.email.split('@')[0] : 'Dosen'}
                  </h3>
                  <p className="text-base text-gray-500 mb-4">
                    Bergabung {selectedDosen.year_in}
                  </p>
                  
                  {selectedDosen.About && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {selectedDosen.About}
                    </p>
                  )}

                  <div className="space-y-3">
                    {selectedDosen.Address && (
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#206fa0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-700">{selectedDosen.Address}</span>
                    </div>
                    )}
                    {selectedDosen.email && (
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#206fa0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-700">{selectedDosen.email}</span>
                  </div>
                    )}
                    {selectedDosen.phone && (
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#206fa0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm text-gray-700">{selectedDosen.phone}</span>
                </div>
                    )}
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#206fa0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-700">
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
