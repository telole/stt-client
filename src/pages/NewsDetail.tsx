import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, getImageBaseURL } from '../config/hooks';
import Navbar from './composable/Navbar';
import Footer from './composable/Footer';
import LoadingSpinner from '../setLoading/SetLoading';
import AOS from 'aos';

interface Author {
  name: string;
}

interface ContentNode {
  type: string;
  children?: ContentNode[];
  text?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
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
    if (!slug) {
      handleLoading(false);
      return;
    }

    handleLoading(true);
    const axios = api();
    const query = `beritas?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=Cover`;
    
    axios
      .get(query)
      .then((res) => {
        const data = res.data?.data?.[0];
        if (data) {
          setBerita(data);
        }
        handleLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching berita detail:', err);
        handleLoading(false);
      });
  }, [slug, handleLoading]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && berita) {
      AOS.refresh();
    }
  }, [isLoading, berita]);

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
    
    if (berita?.Cover?.[0]?.formats?.medium?.url) {
      return `${imageBaseURL}${berita.Cover[0].formats.medium.url}`;
    }
    if (berita?.Cover?.[0]?.formats?.large?.url) {
      return `${imageBaseURL}${berita.Cover[0].formats.large.url}`;
    }
    if (berita?.Cover?.[0]?.url) {
      return `${imageBaseURL}${berita.Cover[0].url}`;
    }
    
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

  const renderNode = (node: ContentNode, key: number | string): React.ReactNode => {
    if (node.type === 'text') {
      let content: React.ReactNode = node.text || '';
      
      if (node.bold && node.italic) {
        content = <strong><em>{content}</em></strong>;
      } else if (node.bold) {
        content = <strong>{content}</strong>;
      } else if (node.italic) {
        content = <em>{content}</em>;
      }
      
      return <span key={key}>{content}</span>;
    }
    
    if (node.type === 'link' && node.url) {
      const linkChildren = node.children && node.children.length > 0
        ? node.children.map((child, idx) => renderNode(child, idx))
        : [node.url];
      return (
        <a
          key={key}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {linkChildren}
        </a>
      );
    }
    
    if (node.children) {
      return node.children.map((child, idx) => renderNode(child, `${key}-${idx}`));
    }
    
    return null;
  };

  const renderContent = (content: ContentNode[]): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];
    
    content.forEach((node, index) => {
      if (node.type === 'paragraph') {
        const hasContent = node.children?.some(child => {
          if (child.type === 'text' && child.text?.trim()) return true;
          if (child.type === 'link') return true;
          return false;
        });
        
        if (!hasContent) {
          elements.push(<br key={index} />);
          return;
        }
        
        const paragraphContent = node.children?.map((child, idx) => {
          const uniqueKey = `${index}-${idx}`;
          return renderNode(child, uniqueKey as any);
        }) || [];
        const textContent = node.children?.map(child => {
          if (child.type === 'text') return child.text || '';
          if (child.type === 'link' && child.children) {
            return child.children.map(c => c.text || '').join('');
          }
          return '';
        }).join('') || '';
        
        if (textContent.length < 100 && (textContent.includes('Peran') || textContent.includes('Era') || textContent.includes('Industri'))) {
          elements.push(
            <h2 key={index} className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 mt-4 sm:mt-6">
              {paragraphContent}
            </h2>
          );
        } else {
          elements.push(
            <p key={index} className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed text-justify">
              {paragraphContent}
            </p>
          );
        }
      }
    });
    
    return elements;
  };

  if (!berita && !isLoading) {
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

  if (!berita) {
    return null;
  }

  return (
    <>
      <Navbar />
      
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <div className="min-h-screen bg-white pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div 
            className="flex items-center gap-2 mb-4 sm:mb-6 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => navigate('/berita')}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base font-normal text-black/50">Kembali</span>
            </div>
            
          <div className="mb-4 sm:mb-6" data-aos="fade-up">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-3 leading-tight">
              {renderTextWithLinks(berita.Title)}
            </h1>
            <p className="text-sm sm:text-base font-normal text-[#206fa0]">
              {formatDate(berita.publishedAt)}
            </p>
          </div>

          {getImageUrl(berita) && (
            <div className="mb-6 sm:mb-8" data-aos="fade-up" data-aos-delay="100">
              <img
                src={getImageUrl(berita)}
                alt={berita.Title}
                className="w-full max-w-4xl mx-auto rounded-[10px] object-cover"
                style={{ maxHeight: '300px', height: 'auto' }}
              />
            </div>
          )}

          {berita.Content && berita.Content.length > 0 && (
            <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
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
