import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getImageBaseURL } from '../config/hooks';
import Navbar from './composable/Navbar';
import Footer from './composable/Footer';

interface KurikulumData {
  id: number;
  documentId: string;
  Title: string;
  SubTitle: string;
  Deskripsi: string;
  SubDeskripsi: string;
  Tumbnail: {
    id: number;
    url: string;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  publishedAt: string;
}

export default function Curriculums() {
  const navigate = useNavigate();
  const [kurikulum, setKurikulum] = useState<KurikulumData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axios = api();
    axios
      .get('kurikulums?populate=*')
      .then((res) => {
        const data = res.data?.data?.[0];
        if (data) {
          setKurikulum({
            id: data.id,
            documentId: data.documentId,
            Title: data.Title,
            SubTitle: data.SubTitle,
            Deskripsi: data.Deskripsi,
            SubDeskripsi: data.SubDeskripsi,
            Tumbnail: data.Tumbnail,
            publishedAt: data.publishedAt,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching kurikulum:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getImageUrl = () => {
    if (!kurikulum?.Tumbnail) return '';
    const imageBaseURL = getImageBaseURL();
    const url = kurikulum.Tumbnail.formats?.medium?.url || kurikulum.Tumbnail.url || '';
    return url ? `${imageBaseURL}${url}` : '';
  };

  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph.split('\n').map((line, lineIndex, array) => (
          <span key={lineIndex}>
            {line}
            {lineIndex < array.length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013d7b] mx-auto"></div>
            <p className="mt-4 text-[#013d7b]">Memuat data kurikulum...</p>
          </div>
        </div>
      </>
    );
  }

  if (!kurikulum) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-500">Data kurikulum tidak ditemukan</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-black/40 bg-cover bg-center shadow-lg brightness-50" 
             style={{
               backgroundImage: 'url(/parallax.jpg)'
             }}>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
           KURIKULUM
          </h1>
          <div className="w-52 h-2 bg-[#f0cd02] mx-auto"></div>
        </div>
      </div>

      <div className="w-full bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-[#013d7b] transition-colors mb-6"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Kembali</span>
          </button>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
              {kurikulum.Title}
            </h2>
            <p className="text-[#206fa0] text-base md:text-lg">
              {formatDate(kurikulum.publishedAt)}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-12">                       
            {getImageUrl() && (
              <div className="w-full md:w-[500px] h-[333px] flex-shrink-0">
                <img
                  src={getImageUrl()}
                  alt={kurikulum.Title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="flex-1">
              <div className="text-base md:text-lg leading-relaxed text-black whitespace-pre-line">
                {formatText(kurikulum.Deskripsi)}
              </div>
            </div>
          </div>
          {kurikulum.SubTitle && (
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                {kurikulum.SubTitle}
              </h3>
              <div className="text-base md:text-lg leading-relaxed text-black whitespace-pre-line">
                {formatText(kurikulum.SubDeskripsi)}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}