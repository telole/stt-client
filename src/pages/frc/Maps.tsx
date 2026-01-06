import React from 'react';

interface MapsProps {
  setLoading?: (value: boolean) => void;
}

const Maps = ({ setLoading }: MapsProps) => {
  return (
    <section className="w-full bg-[#013d7b] py-16 md:py-28 px-4 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 md:gap-20 justify-center items-center">
        {/* Title Section */}
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            Peta
          </h2>
          <div className="w-[190px] h-2 bg-[#f0cd02]"></div>
        </div>

        <div className="w-full">
          <iframe
            src="https://www.google.com/maps?q=-6.7112848,111.0573271&hl=id&z=17&output=embed"
            width="100%"
            height="444"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[300px] md:h-[444px] rounded-[20px]"
            title="Sekolah Tinggi Teknik Pati"
          />
        </div>
      </div>
    </section>
  );
};

export default Maps;
