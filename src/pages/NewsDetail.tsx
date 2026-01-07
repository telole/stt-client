import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, getImageBaseURL } from '../config/hooks';
import Navbar from './composable/Navbar';
import Footer from './composable/Footer';

interface Author {
  name: string;
}

interface ContentNode {
  type: string;
  children?: ContentNode[];
  text?: string;
}

interface BeritaDetail {
  id: number;
  Title: string;
  slug: string;
  publishedAt: string;
  Content?: ContentNode[];
  author?: Author;
  Cover?: {
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
      large?: { url: string };
    };
    url: string;
  }[];
  Image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [berita, setBerita] = useState<BeritaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const axios = api();
    const query = `beritas?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=Cover`;
    
    axios
      .get(query)
      .then((res) => {
        const data = res.data?.data?.[0];
        if (data) {
          setBerita(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching berita detail:', err);
        setLoading(false);
      });
  }, [slug]);

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

  const getImageUrl = (berita: BeritaDetail): string => {
    const imageBaseURL = getImageBaseURL();
    
    // Try Cover first (array) - same as News.tsx
    if (berita?.Cover?.[0]?.formats?.medium?.url) {
      return `${imageBaseURL}${berita.Cover[0].formats.medium.url}`;
    }
    if (berita?.Cover?.[0]?.formats?.large?.url) {
      return `${imageBaseURL}${berita.Cover[0].formats.large.url}`;
    }
    if (berita?.Cover?.[0]?.url) {
      return `${imageBaseURL}${berita.Cover[0].url}`;
    }
    
    // Fallback to Image (single object)
    if (berita?.Image?.formats?.large?.url) {
      return `${imageBaseURL}${berita.Image.formats.large.url}`;
    }
    if (berita?.Image?.formats?.medium?.url) {
      return `${imageBaseURL}${berita.Image.formats.medium.url}`;
    }
    if (berita?.Image?.url) {
      return `${imageBaseURL}${berita.Image.url}`;
    }
    
    return '';
  };

  const renderContent = (content: ContentNode[]): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];
    
    content.forEach((node, index) => {
      if (node.type === 'paragraph') {
        const text = node.children?.map(child => child.text || '').join('') || '';
        if (!text.trim()) {
          elements.push(<br key={index} />);
          return;
        }
        
        // Check if text looks like a heading (short, bold-like, or contains keywords)
        if (text.length < 100 && (text.includes('Peran') || text.includes('Era') || text.includes('Industri'))) {
          elements.push(
            <h2 key={index} className="text-xl font-bold text-black mb-4 mt-6">
              {text}
            </h2>
          );
        } else {
          elements.push(
            <p key={index} className="mb-4 text-base leading-relaxed text-justify">
              {text}
            </p>
          );
        }
      }
    });
    
    return elements;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#e4f6ff] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013d7b] mx-auto"></div>
            <p className="mt-4 text-[#013d7b]">Memuat berita...</p>
          </div>
        </div>
      </>
    );
  }

  if (!berita) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#e4f6ff] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Berita tidak ditemukan</p>
            <button
              onClick={() => navigate('/berita')}
              className="mt-4 px-4 py-2 bg-[#013d7b] text-white rounded hover:bg-[#206fa0] transition-colors"
            >
              Kembali ke Berita
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20">
          {/* Back Button */}
          <div 
            className="flex items-center gap-2 mb-6 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => navigate('/berita')}
          >
            <svg className="w-5 h-5 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-base font-normal text-black/50">Kembali</span>
          </div>

          {/* Article Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3">
              {berita.Title}
            </h1>
            <p className="text-base font-normal text-[#206fa0]">
              {formatDate(berita.publishedAt)}
            </p>
          </div>

          {/* Article Image */}
          {getImageUrl(berita) && (
            <div className="mb-8">
              <img
                src={getImageUrl(berita)}
                alt={berita.Title}
                className="w-full max-w-4xl mx-auto rounded-[10px] object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          )}

          {/* Article Content */}
          {berita.Content && berita.Content.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {renderContent(berita.Content)}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NewsDetail;
