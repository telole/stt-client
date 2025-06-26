import { useEffect, useState } from "react";
import { api } from "../../config/hooks";
import { Menu, X } from "lucide-react"; // ikon burger dan close

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#013D7B] fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <img src="sttp.png" alt="Logo" className="h-10 md:h-12 w-auto" />
            <span className="text-white font-bold text-sm md:text-lg hidden sm:block">
              SEKOLAH TINGGI TEKNIK PATI
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menu.map((item) => (
              <a
                key={item.id}
                href={item.Path}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#daftar"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-all"
            >
              Daftar Sekarang
            </a>
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 space-y-3 bg-[#013D7B] rounded-md p-4">
            {menu.map((item) => (
              <a
                key={item.id}
                href={item.Path}
                className="block text-white hover:text-yellow-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#daftar"
              className="block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-all"
            >
              Daftar Sekarang
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
