  "use client";

  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { api } from "../../config/hooks";
  import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

  interface NavItem {
    id: number;
    label: string;
    Path: string;
    Icon: string | null;
  }

  function Navbar() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState<NavItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfilOpen, setIsProfilOpen] = useState(false);
    const [isAkademikOpen, setIsAkademikOpen] = useState(false);
    const [isProdiOpen, setIsProdiOpen] = useState(false);
    const [isProdiSubOpen, setIsProdiSubOpen] = useState(false);

    useEffect(() => {
      const axios = api();
      axios
        .get("navbar?populate=header")
        .then((res) => {
          const data = res.data.data;
          if (data && data.header && Array.isArray(data.header)) {
            const headerItems: NavItem[] = data.header.map((item: any) => ({
              id: item.id,
              label: item.label || item.Label || '',
              Path: item.Path || item.path || '',
              Icon: item.Icon || item.icon || null,
            }));
            setMenu(headerItems);
          }
        })
        .catch((err) => {
          console.error("Error fetching navbar:", err);
        });
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleProfil = () => {
      setIsProfilOpen((prev) => !prev);
      setIsAkademikOpen(false);
      setIsProdiOpen(false);
      setIsProdiSubOpen(false);
    };
    const toggleAkademik = () => {
      setIsAkademikOpen((prev) => !prev);
      setIsProfilOpen(false);
      setIsProdiOpen(false);
      setIsProdiSubOpen(false);
    };
    const toggleProdi = () => setIsProdiOpen((prev) => !prev);

    const scrollToSection = (path: string) => {
      const sectionId = path.replace(/^\/+/, "");
      
      const currentPath = window.location.pathname;
      
      if (currentPath === '/' || currentPath === '') {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
      
      setIsOpen(false);
      setIsProfilOpen(false);
      setIsAkademikOpen(false);
      setIsProdiOpen(false);
    };

    function HandleRedirect(path: string) { 
      if (path && path.startsWith('http')) {
        window.location.href = path;
      } else {
        window.location.href = 'https://pmb.sttp.ac.id/';
      }
    }

    return (
      <nav className="bg-[#013D7B] fixed top-0 left-0 w-full z-[999] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 md:space-x-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img src="/sttp.png" alt="Logo" className="h-10 md:h-12 w-auto" />
              <span className="text-white font-bold text-sm md:text-lg hidden sm:block">
                SEKOLAH TINGGI TEKNIK PATI
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              {menu.map((item, index) =>
                item.label === "Profil" ? (
                  <div key={item.id} className="relative">
                    <button
                      onClick={toggleProfil}
                      className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      Profil
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isProfilOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`absolute top-full mt-2 bg-white rounded shadow-lg py-2 z-50 min-w-[180px] transition-all duration-300 origin-top ${
                        isProfilOpen
                          ? "opacity-100 visible transform scale-100 translate-y-0"
                          : "opacity-0 invisible transform scale-95 -translate-y-2"
                      }`}
                    >
                      <button
                        onClick={() => scrollToSection("selayang-pandang")}
                        className="block w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                      >
                        Kata sambutan
                      </button>
                      <button
                        onClick={() => scrollToSection("profile")}
                        className="block w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                      >
                        Visi Misi
                      </button>
                      {/* <button
                        onClick={() => navigate('/ulasan-singkat')}
                        className="block w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                      >
                        Ulasan Singkat
                      </button> */}
                    </div>
                  </div>
                ) : item.label !== "Akademik" && item.label !== "Prodi" ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.Path)}
                    className="text-white hover:text-yellow-300 transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                ) : item.label === "Akademik" ? (
                  <div key={item.id} className="relative">
                    <button
                      onClick={toggleAkademik}
                      className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      Akademik
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isAkademikOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`absolute top-full mt-2 bg-white rounded shadow-lg py-2 z-50 min-w-[240px] transition-all duration-300 origin-top ${
                        isAkademikOpen
                          ? "opacity-100 visible transform scale-100 translate-y-0"
                          : "opacity-0 invisible transform scale-95 -translate-y-2"
                      }`}
                      onMouseEnter={() => {
                        // Biarkan sub-menu terbuka jika sudah terbuka
                      }}
                      onMouseLeave={() => setIsProdiSubOpen(false)}
                    >
                      <div className="relative flex">
                        {/* Menu utama Akademik */}
                        <div 
                          className="flex flex-col"
                          onMouseEnter={() => {
                            // Jaga sub-menu tetap terbuka jika mouse masih di area menu utama
                            // Sub-menu hanya tertutup oleh onMouseLeave dari dropdown utama
                          }}
                        >
                          <div
                            onMouseEnter={() => setIsProdiSubOpen(true)}
                            className="relative"
                          >
                            <button
                              className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200 flex items-center justify-between group"
                            >
                              <span>Prodi</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            {/* Sub-menu Prodi (muncul di kanan) - dipindah ke sini agar lebih dekat dengan button Prodi */}
                            {isProdiSubOpen && (
                              <div
                                className="absolute left-full top-0 ml-1 bg-white rounded shadow-lg py-2 min-w-[180px] border-l border-gray-200 z-50"
                                onMouseEnter={() => setIsProdiSubOpen(true)}
                              >
                                <button
                                  onClick={() => scrollToSection("program-studi")}
                                  className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                                >
                                  Informatika
                                </button>
                                <button
                                  onClick={() => scrollToSection("program-studi")}
                                  className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                                >
                                  Elektro
                                </button>
                                <button
                                  onClick={() => scrollToSection("program-studi")}
                                  className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                                >
                                  Manajemen
                                </button>
                                {/* <button
                                  onClick={() => navigate('/caldik')}
                                  className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                                >
                                  Caldik
                                </button> */}
                                {/* <button
                                  onClick={() => navigate('/baak')}
                                  className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                                >
                                  BAAK
                                </button> */}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => navigate('/dosens')}
                            className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            Dosen
                          </button>
                          <button
                            onClick={() => scrollToSection("mahasiswa")}
                            className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            Mahasiswa
                          </button>
                          <button
                            onClick={() => navigate('/akreditasi')}
                            className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            Akreditasi
                          </button>
                          <button
                            onClick={() => navigate('/kurikulum')}
                            className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            Kurikulum
                          </button>
                          {/* <button
                            onClick={() => navigate('/krs')}
                            className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            KRS
                          </button>
                          <button
                            onClick={() => navigate('/khs')}
                            className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            KHS
                          </button> */}
                          {/* <button
                            onClick={() => navigate('/jadwal-matkul')}
                            className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            Jadwal Matkul
                          </button>
                          <button
                            onClick={() => navigate('/kalender-akademik')}
                            className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            Kalender Akademik
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              )}

              <button
                onClick={() => HandleRedirect("https://pmb.sttp.ac.id/")}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105"
              >
                Daftar Sekarang
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                title={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
                aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-3 bg-[#013D7B] rounded-md p-4">
              {menu.map((item, index) =>
                item.label === "Profil" ? (
                  <div
                    key={item.id}
                    className={`transform transition-all duration-300 ${
                      isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={toggleProfil}
                      className="w-full text-left text-white hover:text-yellow-300 flex items-center justify-between transition-colors duration-300"
                    >
                      Profil
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isProfilOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-400 ${
                        isProfilOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="space-y-2 ml-2">
                        <button
                          onClick={() => scrollToSection("selayang-pandang")}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Kata sambutan
                        </button>
                        <button
                          onClick={() => scrollToSection("profile")}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Visi Misi
                        </button>
                        <button
                          onClick={() => navigate('/ulasan-singkat')}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Ulasan Singkat
                        </button>
                      </div>
                    </div>
                  </div>
                ) : item.label !== "Akademik" ? (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.Path)}
                    className={`block text-white hover:text-yellow-300 transition-all duration-300 transform ${
                      isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    } w-full text-left`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <div
                    key={item.id}
                    className={`transform transition-all duration-300 ${
                      isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={toggleAkademik}
                      className="w-full text-left text-white hover:text-yellow-300 flex items-center justify-between transition-colors duration-300"
                    >
                      Akademik
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isAkademikOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-400 ${
                        isAkademikOpen ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="space-y-2 ml-2">
                        <button
                          onClick={toggleProdi}
                          className="w-full text-left text-white hover:text-yellow-300 flex items-center justify-between transition-colors duration-300"
                        >
                          Prodi
                          <ChevronDown
                            className={`w-3 h-3 transition-transform duration-300 ${
                              isProdiOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`ml-4 overflow-hidden transition-all duration-300 ${
                            isProdiOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="space-y-1">
                            <button
                              onClick={() => scrollToSection("program-studi")}
                              className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                            >
                              Informatika
                            </button>
                            <button
                              onClick={() => scrollToSection("program-studi")}
                              className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                            >
                              Elektro
                            </button>
                            <button
                              onClick={() => scrollToSection("program-studi")}
                              className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                            >
                              Manajemen
                            </button>
                            <button
                              onClick={() => navigate('/caldik')}
                              className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                            >
                              Caldik
                            </button>
                            <button
                              onClick={() => navigate('/baak')}
                              className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                            >
                              BAAK
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate('/dosens')}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Dosen
                        </button>
                        <button
                          onClick={() => scrollToSection("mahasiswa")}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Mahasiswa
                        </button>
                        <button
                          onClick={() => navigate('/akreditasi')}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Akreditasi
                        </button>
                        <button
                          onClick={() => navigate('/kurikulum')}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Kurikulum
                        </button>
                        <button
                          onClick={() => navigate('/krs')}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          KRS
                        </button>
                        <button
                          onClick={() => navigate('/khs')}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          KHS
                        </button>
                        <button
                          onClick={() => navigate('/jadwal-matkul')}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Jadwal Matkul
                        </button>
                        <button
                          onClick={() => navigate('/kalender-akademik')}
                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                        >
                          Kalender Akademik
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}

              <button
                onClick={() => scrollToSection("daftar")}
                className={`block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-all duration-300 transform ${
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: `${menu.length * 100}ms` }}
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  export default Navbar;
