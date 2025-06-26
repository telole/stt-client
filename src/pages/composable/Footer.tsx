interface FooterProps {
  setLoading: (value: boolean) => void;
}



function Footer({ setLoading }: FooterProps) {
    
    

    return  (

        <>
        <footer className="bg-blue-900 py-12 md:py-16 px-4 md:px-20" style={{ backgroundColor: '#013D7B' }}>
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <img src="sttp.png"
                 alt="STTP Logo"
                 className="w-10 h-10 md:w-12 md:h-12 mr-3" />
            <div>
              <h3 className="text-white font-bold text-base md:text-lg">TO BE TECHNOPRENEUR</h3>
            </div>
          </div>
          
          <p className="text-gray-300 text-xs md:text-sm mb-6 leading-relaxed">
            Sekolahmu adalah langkah awal menuju cita-citamu. Segera daftarkan dirimu. Kami siap melayani!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 md:px-6 py-2 md:py-3 rounded transition-all text-sm md:text-base">
              Daftar Sekarang
            </button>
            <button className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded transition-all text-sm md:text-base">
              Hubungi Via WhatsApp
            </button>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-white font-bold text-base md:text-lg mb-4">Hubungi Kami</h4>
          <div className="space-y-3">
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              Ngepungsono, Kec. Pati, Kabupaten Pati, Jawa Tengah 59119
            </p>
            <p className="text-gray-300 text-xs md:text-sm">
              (0295) 382470
            </p>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-white font-bold text-base md:text-lg mb-4">Sosial Media</h4>
          <div className="space-y-2">
            <a href="#" className="block text-gray-300 hover:text-yellow-400 text-xs md:text-sm transition-colors">
              Facebook
            </a>
            <a href="#" className="block text-gray-300 hover:text-yellow-400 text-xs md:text-sm transition-colors">
              Instagram
            </a>
            <a href="#" className="block text-gray-300 hover:text-yellow-400 text-xs md:text-sm transition-colors">
              TikTok
            </a>
            <a href="#" className="block text-gray-300 hover:text-yellow-400 text-xs md:text-sm transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
        </>
    )



}

export default Footer;