import React, { useEffect, useState, useRef, useCallback } from 'react';
import { api } from '../config/hooks';
import Navbar from './composable/Navbar';
import Footer from './composable/Footer';
import LoadingSpinner from '../setLoading/SetLoading';
import AOS from 'aos';

interface AnnouncementData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
}

interface Announcement {
  title: string;
  date: string;
}

interface EventData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
}

interface Event {
  date: string;
  month: string;
  year: string;
  title: string;
}

const AnnoucementSchedule = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
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

    // Fetch all announcements without pagination
    axios
      .get('pengumumen?sort=publishedAt:desc')
      .then((res) => {
        const data = res.data?.data || [];
        const formattedAnnouncements: Announcement[] = data.map((item: AnnouncementData) => {
          const date = new Date(item.publishedAt);
          const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
          const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
          ];
          
          const dayName = days[date.getDay()];
          const day = date.getDate();
          const month = months[date.getMonth()];
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          
          return {
            title: item.Title.trim(),
            date: `${dayName}, ${day} ${month} ${year} - ${hours}.${minutes}`,
          };
        });
        setAnnouncements(formattedAnnouncements);
        handleLoading(false);
      })
      .catch((err) => {
        console.error('Fetch Pengumuman error:', err);
        handleLoading(false);
      });

    axios
      .get('acara-kegiatans?sort=publishedAt:desc')
      .then((res) => {
        const data = res.data?.data || [];
        const formattedEvents: Event[] = data.map((item: EventData) => {
          const date = new Date(item.publishedAt);
          const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
            'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
          ];
          
          const day = date.getDate().toString();
          const month = monthNames[date.getMonth()];
          const year = date.getFullYear().toString();
          
          return {
            date: day,
            month: month,
            year: year,
            title: item.Title.trim(),
          };
        });
        setEvents(formattedEvents);
        handleLoading(false);
      })
      .catch((err) => {
        console.error('Fetch Acara Kegiatan error:', err);
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

  return (
    <>
      <Navbar />
      
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <div className="min-h-screen bg-white">
        <div className="relative pt-32 pb-20 px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
            style={{
              backgroundImage: 'url(/parallax.jpg)'
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5" data-aos="fade-down">
              Pengumuman & Jadwal Kegiatan
            </h1>
            <div className="w-52 h-2 bg-[#f0cd02] mx-auto" data-aos="fade-up" data-aos-delay="100"></div>
          </div>
        </div>
            
        <div className="py-8 md:py-12 lg:py-[68px] px-4 md:px-8 lg:px-[410px] bg-[#e4f6ff]">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[100px] justify-center items-start max-w-7xl mx-auto">
     
            <div className="flex w-full lg:w-[580px] p-6 md:p-8 lg:p-[50px] flex-col gap-6 md:gap-8 lg:gap-[30px] items-start bg-white rounded-[20px] shadow-[6px_24px_54px_0_rgba(0,0,0,0.05)]" data-aos="fade-right">
              <div className="flex w-full lg:w-[271px] flex-col gap-4 md:gap-5 items-start">
                <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[43.884px] text-black">
                  Pengumuman
                </h2>
                <div className="w-full lg:w-[205px] h-2 bg-[#f0cd02]"></div>
              </div>

              <div className="flex w-full lg:w-[480px] flex-col gap-4 md:gap-5 items-start">
                {announcements.length > 0 ? (
                  announcements.map((announcement, index) => (
                    <React.Fragment key={index}>
                      <div className="flex w-full lg:w-[480px] flex-col gap-2 md:gap-[10px] items-start">
                        <h3 className="flex w-full lg:w-[480px] min-w-0 justify-start items-start text-base md:text-lg lg:text-xl font-medium leading-snug lg:leading-[24.38px] text-black">
                          {announcement.title}
                        </h3>
                        <p className="min-w-0 self-stretch text-sm md:text-base font-normal leading-[19.504px] text-[#206fa0] whitespace-normal lg:whitespace-nowrap">
                          {announcement.date}
                        </p>
                      </div>
                      {index < announcements.length - 1 && (
                        <div className="w-full lg:w-[480px] h-px bg-[#d9d9d9]"></div>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Tidak ada pengumuman</p>
                )}
              </div>
            </div>

            <div className="flex w-full lg:w-[580px] p-6 md:p-8 lg:p-[50px] flex-col gap-6 md:gap-8 lg:gap-[30px] items-start bg-white rounded-[20px] shadow-[6px_24px_54px_0_rgba(0,0,0,0.05)]" data-aos="fade-left">
              <div className="flex w-full lg:w-[323px] flex-col gap-4 md:gap-5 items-start">
                <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[43.884px] text-black">
                  Acara & Kegiatan
                </h2>
                <div className="w-full lg:w-[205px] h-2 bg-[#f0cd02]"></div>
              </div>

              <div className="flex w-full lg:w-[480px] flex-col items-start">
                {events.length > 0 ? (
                  <div className="w-full border border-black/50 overflow-hidden">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className={`flex w-full items-start ${
                          index < events.length - 1 ? 'border-b border-black/50' : ''
                        }`}
                      >
                        <div className="flex w-16 md:w-[75px] lg:w-[75px] p-3 md:p-5 lg:p-5 flex-col gap-2 md:gap-[10px] justify-center items-center flex-shrink-0 border-r border-black/50">
                          <span className="flex w-[35px] h-[60px] justify-start items-start self-stretch flex-shrink-0 text-xs md:text-sm lg:text-base font-normal leading-tight lg:leading-[19.504px] text-[#206fa0] text-left">
                            {event.date}
                            <br />
                            {event.month}
                            <br />
                            {event.year}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 lg:flex-grow p-3 md:p-5 lg:p-5 gap-[10px] justify-center items-center">
                          <span className="flex w-full lg:w-[365px] justify-start items-start text-sm md:text-base lg:text-xl font-medium leading-snug lg:leading-[24.38px] text-black">
                            {event.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm p-5">Tidak ada acara & kegiatan</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AnnoucementSchedule;
