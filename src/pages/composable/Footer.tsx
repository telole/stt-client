import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#052437] py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Logo Section */}
        <div className="flex items-center gap-10">
          <img
            src="/footer-logo-1.png"
            alt="Logo 1"
            className="w-[57px] h-[54px] object-contain"
          />
          <img
            src="/footer-logo-2.png"
            alt="Logo 2"
            className="w-[71px] h-[54px] object-contain"
          />
          <img
            src="/footer-logo-3.png"
            alt="Logo 3"
            className="w-[137px] h-[54px] object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Raih Mimpimu */}
          <div className="flex flex-col gap-3 max-w-md">
            <h3 className="text-white font-bold text-base">
              Raih Mimpimu Bersama Kami
            </h3>
            <p className="text-white text-base leading-relaxed">
              Sekolahmu adalah langkah awal menuju cita-citamu. Segera daftarkan
              dirimu, kami siap melayani!
            </p>
          </div>

          {/* Hubungi Kami */}
          <div className="flex flex-col gap-3 max-w-md">
            <h3 className="text-white font-bold text-base">
              Hubungi Kami
            </h3>
            <p className="text-white text-base leading-relaxed">
              Jln. Raya Pati Trangkil KM.4,5 Ngepungrojo, kec. Pati, Kabupaten
              Pati, Jawa Tengah
            </p>
            <p className="text-white text-base">
              08971329888
            </p>
          </div>

          {/* Sosial Media */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-base">
              Sosial Media
            </h3>
            <ul className="text-white text-base leading-6 space-y-1">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>TikTok</li>
              <li>YouTube</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
