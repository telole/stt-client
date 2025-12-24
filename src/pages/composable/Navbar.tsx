"use client";

import { useEffect, useState } from "react";
import { api } from "../../config/hooks";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavItem {
  id: number;
  label: string;
  Path: string;
  Icon: string | null;
}

function Navbar() {
  const axios = api();
  const [menu, setMenu] = useState<NavItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAkademikOpen, setIsAkademikOpen] = useState(false);
  const [isProdiOpen, setIsProdiOpen] = useState(false);

  useEffect(() => {
    axios
      .get("navbar?populate=header")
      .then((res) => {
        const data = res.data.data;
        const headerItems: NavItem[] = data.header;
        setMenu(headerItems);
      })
      .catch((err) => {
        console.error("Error fetching navbar:", err);
      });
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAkademik = () => {
    setIsAkademikOpen((prev) => !prev);
    setIsProdiOpen(false);
  };
  const toggleProdi = () => setIsProdiOpen((prev) => !prev);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
    setIsAkademikOpen(false);
    setIsProdiOpen(false);
  };

  return (
    <nav className="bg-[#013D7B] fixed top-0 left-0 w-full z-[999] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img src="sttp.png" alt="Logo" className="h-10 md:h-12 w-auto" />
            <span className="text-white font-bold text-sm md:text-lg hidden sm:block">
              SEKOLAH TINGGI TEKNIK PATI
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {menu.map((item, index) =>
              item.label !== "Akademik" ? (
                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(index === 0 ? "profile" : item.Path.replace("#", ""))
                  }
                  className="text-white hover:text-yellow-300 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ) : (
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
                    className={`absolute top-full mt-2 bg-white rounded shadow-lg py-2 w-40 z-50 transition-all duration-300 origin-top ${
                      isAkademikOpen
                        ? "opacity-100 visible transform scale-100 translate-y-0"
                        : "opacity-0 invisible transform scale-95 -translate-y-2"
                    }`}
                  >
                    <button
                      onClick={() => scrollToSection("program-studi")}
                      className="block w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                    >
                      Detail
                    </button>
                    <button
                      onClick={toggleProdi}
                      className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200 flex items-center justify-between"
                    >
                      Prodi
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${
                          isProdiOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`ml-4 mt-1 border-l border-gray-300 pl-2 transition-all duration-300 overflow-hidden ${
                        isProdiOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
                      }`}
                    >
                      <button
                        onClick={() => scrollToSection("program-studi")}
                        className="block w-full text-left px-2 py-1 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                      >
                        S1 Manajemen
                      </button>
                      <button
                        onClick={() => scrollToSection("program-studi")}
                        className="block w-full text-left px-2 py-1 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                      >
                        S1 Informatika
                      </button>
                      <button
                        onClick={() => scrollToSection("program-studi")}
                        className="block w-full text-left px-2 py-1 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                      >
                        S1 Elektro
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}

            <button
              onClick={() => scrollToSection("daftar")}
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
              item.label !== "Akademik" ? (
                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(index === 0 ? "profile" : item.Path.replace("#", ""))
                  }
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
                        onClick={() => scrollToSection("program-studi")}
                        className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                      >
                        Detail
                      </button>
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
                          isProdiOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="space-y-1">
                          <button
                            onClick={() => scrollToSection("prodi-management")}
                            className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                          >
                            S1 Manajemen
                          </button>
                          <button
                            onClick={() => scrollToSection("prodi-informatika")}
                            className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                          >
                            S1 Informatika
                          </button>
                          <button
                            onClick={() => scrollToSection("prodi-elektro")}
                            className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                          >
                            S1 Elektro
                          </button>
                        </div>
                      </div>
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
