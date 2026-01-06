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
    <div className="flex w-full min-h-[750px] py-[68px] px-[410px] gap-[100px] justify-center items-center flex-nowrap bg-[#f0cd02] relative mx-auto">
      {/* Pengumuman Card */}
      <div className="flex w-[580px] p-[50px] flex-col gap-[30px] items-start flex-shrink-0 flex-nowrap bg-white rounded-[20px] relative shadow-[6px_24px_54px_0_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="flex w-[271px] flex-col gap-5 items-start flex-shrink-0 flex-nowrap relative z-[1]">
          <span className="h-11 flex-shrink-0 flex-basis-auto text-[36px] font-bold leading-[43.884px] text-black relative text-left whitespace-nowrap z-[2]">
            Pengumuman
          </span>
          <div className="w-[205px] h-2 flex-shrink-0 bg-[#f0cd02] relative z-[3]"></div>
        </div>

        {/* Announcements List */}
        <div className="flex w-[480px] flex-col gap-5 items-start flex-shrink-0 flex-nowrap relative z-[4]">
          {announcements.map((announcement, index) => (
            <React.Fragment key={index}>
              <div className="flex w-[480px] flex-col gap-[10px] items-start flex-shrink-0 flex-nowrap relative">
                <span className="flex w-[480px] min-w-0 h-12 justify-start items-start self-stretch flex-shrink-0 text-xl font-medium leading-[24.38px] text-black relative text-left z-[6]">
                  {announcement.title}
                </span>
                <span className="min-w-0 h-5 self-stretch flex-shrink-0 flex-basis-auto text-base font-normal leading-[19.504px] text-[#206fa0] relative text-left whitespace-nowrap z-[7]">
                  {announcement.date}
                </span>
              </div>
              {index < announcements.length - 1 && (
                <div className="w-[480px] h-px flex-shrink-0 bg-[#d9d9d9] relative"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Button */}
        <div className="flex w-[278px] px-5 py-[15px] gap-[10px] justify-center items-center flex-shrink-0 flex-nowrap bg-[#013d7b] rounded-[10px] relative z-[17] cursor-pointer hover:opacity-90 transition-opacity">
          <span className="h-5 flex-shrink-0 flex-basis-auto text-base font-bold leading-[19.504px] text-white relative text-left whitespace-nowrap z-[18]">
            Lihat Pengumuman Lainnya
          </span>
        </div>
      </div>

      {/* Acara & Kegiatan Card */}
      <div className="flex w-[580px] min-h-0 p-[50px] flex-col justify-between items-start self-stretch flex-shrink-0 flex-nowrap bg-white rounded-[20px] relative shadow-[6px_24px_54px_0_rgba(0,0,0,0.05)] z-[19]">
        {/* Header */}
        <div className="flex w-[323px] flex-col gap-5 items-start flex-shrink-0 flex-nowrap relative z-[20]">
          <span className="h-11 flex-shrink-0 flex-basis-auto text-[36px] font-bold leading-[43.884px] text-black relative text-left whitespace-nowrap z-[21]">
            Acara & Kegiatan
          </span>
          <div className="w-[205px] h-2 flex-shrink-0 bg-[#f0cd02] relative z-[22]"></div>
        </div>

        {/* Events List */}
        <div className="flex w-[480px] flex-col items-start flex-shrink-0 flex-nowrap relative z-[23]">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex w-[480px] items-start flex-shrink-0 flex-nowrap relative ${
                index > 0 ? 'mt-0' : ''
              }`}
            >
              {/* Date Box */}
              <div
                className={`flex w-[75px] p-5 flex-col gap-[10px] justify-center items-center flex-shrink-0 flex-nowrap relative ${
                  index === 0
                    ? 'border border-black/50'
                    : 'border-t border-l border-r border-black/50'
                }`}
              >
                <span className="flex w-[35px] h-[60px] justify-start items-start self-stretch flex-shrink-0 text-base font-normal leading-[19.504px] text-[#206fa0] relative text-left overflow-hidden z-[26]">
                  {event.date}
                  <br />
                  {event.month}
                  <br />
                  {event.year}
                </span>
              </div>
              {/* Title Box */}
              <div
                className={`flex min-w-0 p-5 gap-[10px] justify-center items-center self-stretch flex-grow flex-shrink-0 flex-basis-0 flex-nowrap relative ${
                  index === 0
                    ? 'border-t border-r border-b border-black/50'
                    : 'border-t border-r border-black/50'
                }`}
              >
                <span className="flex w-[365px] h-12 justify-start items-start flex-grow flex-shrink-0 flex-basis-0 text-xl font-medium leading-[24.38px] text-black relative text-left z-[28]">
                  {event.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex w-[232px] px-5 py-[15px] gap-[10px] justify-center items-center flex-shrink-0 flex-nowrap bg-[#013d7b] rounded-[10px] relative z-[39] cursor-pointer hover:opacity-90 transition-opacity">
          <span className="h-5 flex-shrink-0 flex-basis-auto text-base font-bold leading-[19.504px] text-white relative text-left whitespace-nowrap z-[40]">
            Lihat Kegiatan Lainnya
          </span>
        </div>
      </div>
    </div>
  );
};

export default Anno;
