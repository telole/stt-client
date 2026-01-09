import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api, getImageBaseURL } from "../config/hooks";
import Navbar from "./composable/Navbar";
import Footer from "./composable/Footer";
import LoadingSpinner from "../setLoading/SetLoading";
import AOS from 'aos';

interface Author {
  name: string;
}

interface BeritaData {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  publishedAt: string;
  author?: Author;
  Cover?: {
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
    url: string;
  }[];
}

export default function News() {
  const navigate = useNavigate();
  const [beritaList, setBeritaList] = useState<BeritaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingCountRef = useRef(0);

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
      .get('beritas?populate=Cover&sort=createdAt:desc')
      .then((res) => {
        const data = res.data?.data || [];
        setBeritaList(data);
        handleLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching berita:', err);
        handleLoading(false);
      });
  }, [handleLoading]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `Pati, ${day} ${month} ${year}`;
  };

  const getImageUrl = (berita: BeritaData): string => {
    const imageBaseURL = getImageBaseURL();
    return berita?.Cover?.[0]?.formats?.small?.url
      ? `${imageBaseURL}${berita.Cover[0].formats.small.url}`
      : "/default.jpg";
  };

  const renderTextWithLinks = (text: string): React.ReactNode[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = urlRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const url = match[0];
      parts.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
          onClick={(e) => e.stopPropagation()}
        >
          {url}
        </a>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : [text];
  };

  return (
    <>
      <Navbar />
      
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
          style={{
            backgroundImage: 'url(/parallax.jpg)'
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4" data-aos="fade-down">
            Berita Terkini
          </h1>
          <div className="w-24 sm:w-32 md:w-52 h-1.5 sm:h-2 bg-[#f0cd02] mx-auto" data-aos="fade-up" data-aos-delay="100"></div>
        </div>
      </div>

      <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {beritaList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {beritaList.map((berita, index) => (
                <div
                  key={berita.id}
                  onClick={() => navigate(`/berita/${berita.slug}`)}
                  className="bg-[#e4f6ff] rounded-[10px] overflow-hidden shadow-[5px_7px_19px_0_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-[5px_7px_19px_0_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:scale-[1.02] sm:hover:scale-105 flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="h-[180px] sm:h-[200px] w-full bg-gray-200 overflow-hidden">
                    <img
                      src={getImageUrl(berita)}
                      alt={berita.Title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 flex-1">
                    <span className="text-sm sm:text-base font-normal leading-[19.504px] text-[#206fa0]">
                      {formatDate(berita.publishedAt)}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-medium leading-tight sm:leading-[24.38px] text-black line-clamp-3 flex-1">
                      {renderTextWithLinks(berita.Title)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20">
              <p className="text-gray-500 text-base sm:text-lg">Tidak ada berita</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
}
