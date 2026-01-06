import React from 'react';

const Anno = () => {
  const announcements = [
    {
      title: 'Kreativitas Tanpa Batas: Menuju Indonesia Emas di Era Industri 4.0',
      date: 'Senin, 25 Desember 2025 - 19.59',
    },
    {
      title: 'Kreativitas Tanpa Batas: Menuju Indonesia Emas di Era Industri 4.0',
      date: 'Senin, 25 Desember 2025 - 19.59',
    },
    {
      title: 'Kreativitas Tanpa Batas: Menuju Indonesia Emas di Era Industri 4.0',
      date: 'Senin, 25 Desember 2025 - 19.59',
    },
  ];

  const events = [
    {
      date: '25',
      month: 'Dec',
      year: '2021',
      title: 'Kreativitas Tanpa Batas: Menuju Indonesia Emas di Era Industri 4.0',
    },
    {
      date: '25',
      month: 'Dec',
      year: '2021',
      title: 'Kreativitas Tanpa Batas: Menuju Indonesia Emas di Era Industri 4.0',
    },
    {
      date: '25',
      month: 'Dec',
      year: '2021',
      title: 'Kreativitas Tanpa Batas: Menuju Indonesia Emas di Era Industri 4.0',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[750px] py-8 md:py-12 lg:py-[68px] px-4 md:px-8 lg:px-[410px] gap-8 md:gap-12 lg:gap-[100px] justify-center items-center bg-[#f0cd02] relative mx-auto">
      {/* Pengumuman Card */}
      <div className="flex w-full lg:w-[580px] p-6 md:p-8 lg:p-[50px] flex-col gap-6 md:gap-8 lg:gap-[30px] items-start bg-white rounded-[20px] relative shadow-[6px_24px_54px_0_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="flex w-full lg:w-[271px] flex-col gap-4 md:gap-5 items-start relative">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[43.884px] text-black">
            Pengumuman
          </h2>
          <div className="w-full lg:w-[205px] h-2 bg-[#f0cd02]"></div>
        </div>

        {/* Announcements List */}
        <div className="flex w-full lg:w-[480px] flex-col gap-4 md:gap-5 items-start relative">
          {announcements.map((announcement, index) => (
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
          ))}
        </div>

        {/* Button */}
        <div className="flex w-full lg:w-[278px] px-4 md:px-5 py-3 md:py-[15px] justify-center items-center bg-[#013d7b] rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity">
          <span className="text-sm md:text-base font-bold leading-[19.504px] text-white whitespace-nowrap">
            Lihat Pengumuman Lainnya
          </span>
        </div>
      </div>

      {/* Acara & Kegiatan Card */}
      <div className="flex w-full lg:w-[580px] min-h-0 p-6 md:p-8 lg:p-[50px] flex-col justify-between gap-6 md:gap-8 lg:gap-[30px] items-start bg-white rounded-[20px] relative shadow-[6px_24px_54px_0_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="flex w-full lg:w-[323px] flex-col gap-4 md:gap-5 items-start relative">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[43.884px] text-black">
            Acara & Kegiatan
          </h2>
          <div className="w-full lg:w-[205px] h-2 bg-[#f0cd02]"></div>
        </div>

        {/* Events List */}
        <div className="flex w-full lg:w-[480px] flex-col items-start relative">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex w-full lg:w-[480px] items-start relative"
            >
              {/* Date Box */}
              <div
                className={`flex w-16 md:w-[75px] lg:w-[75px] p-3 md:p-5 lg:p-5 flex-col gap-2 md:gap-[10px] justify-center items-center flex-shrink-0 relative ${
                  index === 0
                    ? 'border border-black/50'
                    : 'border-t border-l border-r border-black/50'
                }`}
              >
                <span className="flex w-[35px] h-[60px] justify-start items-start self-stretch flex-shrink-0 text-xs md:text-sm lg:text-base font-normal leading-tight lg:leading-[19.504px] text-[#206fa0] text-left lg:text-left overflow-hidden">
                  {event.date}
                  <br />
                  {event.month}
                  <br />
                  {event.year}
                </span>
              </div>
              {/* Title Box */}
              <div
                className={`flex min-w-0 flex-1 lg:flex-grow p-3 md:p-5 lg:p-5 gap-[10px] justify-center items-center relative ${
                  index === 0
                    ? 'border-t border-r border-b border-black/50'
                    : 'border-t border-r border-black/50'
                }`}
              >
                <span className="flex w-full lg:w-[365px] justify-start items-start text-sm md:text-base lg:text-xl font-medium leading-snug lg:leading-[24.38px] text-black">
                  {event.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex w-full lg:w-[232px] px-4 md:px-5 py-3 md:py-[15px] justify-center items-center bg-[#013d7b] rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity">
          <span className="text-sm md:text-base font-bold leading-[19.504px] text-white whitespace-nowrap">
            Lihat Kegiatan Lainnya
          </span>
        </div>
      </div>
    </div>
  );
};

export default Anno;
