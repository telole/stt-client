import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../../config/hooks';

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

const Anno = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const axios = api();
    
    axios
      .get('pengumumen?pagination[pageSize]=3&sort=publishedAt:desc')
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
      })
      .catch((err) => console.error('Fetch Pengumuman error:', err));

    axios
      .get('acara-kegiatans?pagination[pageSize]=3&sort=publishedAt:desc')
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
      })
      .catch((err) => console.error('Fetch Acara Kegiatan error:', err));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[750px] py-8 md:py-12 lg:py-[68px] px-4 md:px-8 lg:px-[410px] gap-8 md:gap-12 lg:gap-[100px] justify-center items-center bg-[#f0cd02] relative mx-auto">
      <motion.div 
        className="flex w-full lg:w-[580px] min-h-0 p-6 md:p-8 lg:p-[50px] flex-col justify-between gap-6 md:gap-8 lg:gap-[30px] items-start bg-white rounded-[20px] relative shadow-[6px_24px_54px_0_rgba(0,0,0,0.05)]"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex w-full lg:w-[271px] flex-col gap-4 md:gap-5 items-start relative">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[43.884px] text-black">
            Pengumuman
          </h2>
          <div className="w-full lg:w-[205px] h-2 bg-[#f0cd02]"></div>
        </div>

        <div className="flex w-full lg:w-[480px] flex-col gap-4 md:gap-5 items-start relative">
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <React.Fragment key={index}>
                <div className="flex w-full lg:w-[480px] flex-col gap-2 md:gap-[10px] items-start relative">
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

        <motion.div 
          className="flex w-full lg:w-[278px] px-4 md:px-5 py-3 md:py-[15px] justify-center items-center bg-[#013d7b] rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/pengumuman-jadwal-kegiatan')}
        >
          <span className="text-sm md:text-base font-bold leading-[19.504px] text-white whitespace-nowrap">
            Lihat Pengumuman Lainnya
          </span>
        </motion.div>
      </motion.div>

      <motion.div 
        className="flex w-full lg:w-[580px] min-h-0 p-6 md:p-8 lg:p-[50px] flex-col justify-between gap-6 md:gap-8 lg:gap-[30px] items-start bg-white rounded-[20px] relative shadow-[6px_24px_54px_0_rgba(0,0,0,0.05)]"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex w-full lg:w-[323px] flex-col gap-4 md:gap-5 items-start relative">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[43.884px] text-black">
            Acara & Kegiatan
          </h2>
          <div className="w-full lg:w-[205px] h-2 bg-[#f0cd02]"></div>
        </div>

        <div className="flex w-full lg:w-[480px] flex-col items-start relative">
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
                    <span className="flex w-[35px] h-[60px] justify-start items-start self-stretch flex-shrink-0 text-xs md:text-sm lg:text-base font-normal leading-tight lg:leading-[19.504px] text-[#206fa0] text-left lg:text-left">
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

        <motion.div 
          className="flex w-full lg:w-[232px] px-4 md:px-5 py-3 md:py-[15px] justify-center items-center bg-[#013d7b] rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/pengumuman-jadwal-kegiatan')}
        >
          <span className="text-sm md:text-base font-bold leading-[19.504px] text-white whitespace-nowrap">
            Lihat Kegiatan Lainnya
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Anno;
