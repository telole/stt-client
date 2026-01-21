  "use client";

  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { api } from "../../config/hooks";
  import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
 
  interface SubNavItem {
    id: number;
    label: string;
    Path: string;
    Icon: string | null;
  }
 
  interface NavChildItem {
    id: number;
    label: string;
    Path: string;
    Icon: string | null;
    subChildren?: SubNavItem[];
  }
 
  interface NavItem {
    id: number;
    label: string;
    Path: string;
    Icon: string | null;
    children?: NavChildItem[];
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
        .get(
          "navbar?populate[header][populate][NavbarChild][populate][SubNavbarChild]=*"
        )
        .then((res) => {
          const data = res.data.data;
          if (data && data.header && Array.isArray(data.header)) {
            const headerItems: NavItem[] = data.header.map((item: any) => ({
              id: item.id,
              label: item.Label || item.label || "",
              Path: item.Path || item.path || "",
              Icon: item.Icon || item.icon || null,
              children:
                item.NavbarChild?.map((child: any) => ({
                  id: child.id,
                  label: child.Label || child.label || "",
                  Path: child.Path || child.path || "",
                  Icon: child.Icon || child.icon || null,
                  subChildren:
                    child.SubNavbarChild?.map((sub: any) => ({
                      id: sub.id,
                      label: sub.Label || sub.label || "",
                      Path: sub.Path || sub.path || "",
                      Icon: sub.Icon || sub.icon || null,
                    })) || [],
                })) || [],
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
  
    const handlePathClick = (path: string) => {
      if (!path) return;
      const trimmed = path.trim();
  
      if (trimmed.startsWith("http")) {
        window.open(trimmed, "_blank");
      } else if (trimmed.startsWith("/")) {
        navigate(trimmed);
      } else {
        scrollToSection(trimmed);
      }
  
      setIsOpen(false);
      setIsProfilOpen(false);
      setIsAkademikOpen(false);
      setIsProdiOpen(false);
      setIsProdiSubOpen(false);
    };

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
                item.label === "Profil" && (item.children?.length || 0) > 0 ? (
                  <div key={item.id} className="relative">
                    <button
                      onClick={toggleProfil}
                      className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      {item.label}
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
                      {item.children?.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => handlePathClick(child.Path)}
                          className="block w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : item.label !== "Akademik" && item.label !== "Prodi" ? (
                  <button
                    key={item.id}
                    onClick={() => handlePathClick(item.Path)}
                    className="text-white hover:text-yellow-300 transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                ) : item.label === "Akademik" && (item.children?.length || 0) > 0 ? (
                  <div key={item.id} className="relative">
                    <button
                      onClick={toggleAkademik}
                      className="text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      {item.label}
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
                      onMouseLeave={() => setIsProdiSubOpen(false)}
                    >
                      <div className="relative flex">
                        <div className="flex flex-col">
                          {(() => {
                            const children = item.children || [];
                            const prodiChild = children.find(
                              (child) =>
                                child.label.toLowerCase() === "prodi"
                            );
                            const otherChildren = children.filter(
                              (child) =>
                                child.label.toLowerCase() !== "prodi"
                            );

                            return (
                              <>
                                {prodiChild && (
                                  <div
                                    onMouseEnter={() => setIsProdiSubOpen(true)}
                                    className="relative"
                                  >
                                    <button className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200 flex items-center justify-between group">
                                      <span>{prodiChild.label}</span>
                                      <ChevronRight className="w-4 h-4" />
                                    </button>
                                    {isProdiSubOpen && (
                                      <div
                                        className="absolute left-full top-0 ml-1 bg-white rounded shadow-lg py-2 min-w-[180px] border-l border-gray-200 z-50"
                                        onMouseEnter={() =>
                                          setIsProdiSubOpen(true)
                                        }
                                      >
                                        {prodiChild.subChildren?.map(
                                          (sub) => (
                                            <button
                                              key={sub.id}
                                              onClick={() =>
                                                handlePathClick(sub.Path)
                                              }
                                              className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                                            >
                                              {sub.label}
                                            </button>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {otherChildren.map((child) => (
                                  <button
                                    key={child.id}
                                    onClick={() => handlePathClick(child.Path)}
                                    className="w-full text-left px-4 py-2 text-blue-900 hover:bg-yellow-100 transition-colors duration-200"
                                  >
                                    {child.label}
                                  </button>
                                ))}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handlePathClick(item.Path)}
                    className="text-white hover:text-yellow-300 transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                )
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
                item.label === "Profil" && (item.children?.length || 0) > 0 ? (
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
                      {item.label}
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
                        {item.children?.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handlePathClick(child.Path)}
                            className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : item.label !== "Akademik" ? (
                  <button
                    key={item.id}
                    onClick={() => handlePathClick(item.Path)}
                    className={`block text-white hover:text-yellow-300 transition-all duration-300 transform ${
                      isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    } w-full text-left`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                  </button>
                ) : (item.children?.length || 0) > 0 ? (
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
                      {item.label}
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
                        {(() => {
                          const children = item.children || [];
                          const prodiChild = children.find(
                            (child) => child.label.toLowerCase() === "prodi"
                          );
                          const otherChildren = children.filter(
                            (child) => child.label.toLowerCase() !== "prodi"
                          );

                          return (
                            <>
                              {prodiChild && (
                                <>
                                  <button
                                    onClick={toggleProdi}
                                    className="w-full text-left text-white hover:text-yellow-300 flex items-center justify-between transition-colors duration-300"
                                  >
                                    {prodiChild.label}
                                    <ChevronDown
                                      className={`w-3 h-3 transition-transform duration-300 ${
                                        isProdiOpen ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>

                                  <div
                                    className={`ml-4 overflow-hidden transition-all duration-300 ${
                                      isProdiOpen
                                        ? "max-h-40 opacity-100"
                                        : "max-h-0 opacity-0"
                                    }`}
                                  >
                                    <div className="space-y-1">
                                      {prodiChild.subChildren?.map((sub) => (
                                        <button
                                          key={sub.id}
                                          onClick={() =>
                                            handlePathClick(sub.Path)
                                          }
                                          className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                                        >
                                          {sub.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              )}

                              {otherChildren.map((child) => (
                                <button
                                  key={child.id}
                                  onClick={() => handlePathClick(child.Path)}
                                  className="block w-full text-left text-white hover:text-yellow-300 transition-colors duration-300"
                                >
                                  {child.label}
                                </button>
                              ))}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handlePathClick(item.Path)}
                    className={`block text-white hover:text-yellow-300 transition-all duration-300 transform ${
                      isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    } w-full text-left`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                  </button>
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
