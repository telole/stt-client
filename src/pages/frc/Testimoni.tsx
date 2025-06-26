import { useEffect, useState } from "react";
import { api } from "../../config/hooks";

interface DescriptionBlock {
  type: string;
  children: { text: string }[];
}

interface TestimoniItem {
  id: number;
  Name: string;
  Jabatan: string;
  Description: DescriptionBlock[];
  Foto?: {
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
    url: string;
  };
}

interface TestimoniProps {
  setLoading: (value: boolean) => void;
}

function Testimoni({ setLoading }: TestimoniProps) {
  const [testimoni, setTestimoni] = useState<TestimoniItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const axios = api();
  const BASE_URL = "http://localhost:1337";

  useEffect(() => {
    const fetchTestimoni = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "testimonis?populate=Foto&sort=createdAt:desc&pagination[limit]=3"
        );
        setTestimoni(response.data.data || response.data);
      } catch (error) {
        console.error("Gagal fetch testimoni:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimoni();
  }, [setLoading]);

  const getFotoUrl = (item: TestimoniItem | undefined): string => {
    const url =
      item?.Foto?.formats?.small?.url ||
      item?.Foto?.formats?.thumbnail?.url ||
      item?.Foto?.url;
    return url ? BASE_URL + url : "/default.jpg";
  };

  return (
    <section
      className="bg-blue-900 py-20 px-6 md:px-20 relative overflow-hidden"
      style={{ backgroundColor: "#013D7B" }}
    >
      <style>
        {`
          @keyframes drawLine {
            from {
              stroke-dashoffset: 400;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          .animate-path {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: drawLine 0.6s ease forwards;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Testimoni Mahasiswa dan Alumni
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* MOBILE RESPONSIVE (Stacked) */}
        <div className="flex flex-col lg:hidden gap-8">
          {testimoni.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center"
            >
              <img
                src={getFotoUrl(item)}
                alt={item.Name}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <h4 className="font-bold text-gray-800">{item.Name}</h4>
              <p className="text-sm text-gray-600 mb-4">{item.Jabatan}</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                "
                {item.Description?.[0]?.children?.[0]?.text ??
                  "Testimoni tidak tersedia."}
                "
              </p>
              <div className="w-16 h-1 bg-yellow-400 rounded-full mt-2"></div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-12">
          {/* Left: Cards */}
          <div className="w-1/2 space-y-12">
            {testimoni.map((item, i) => (
              <div
                key={item.id}
                className={`bg-white rounded-full px-6 py-4 flex items-center gap-4 shadow-lg max-w-sm cursor-pointer relative z-10 transition-all duration-300 ${
                  activeIndex === i ? "ring-2 ring-yellow-400" : ""
                }`}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <img
                  src={getFotoUrl(item)}
                  alt={item.Name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{item.Name}</h4>
                  <p className="text-sm text-gray-600">{item.Jabatan}</p>
                </div>

                {/* Garis animasi */}
                {activeIndex === i && (
                  <svg
                    className="absolute left-full top-1/2 transform -translate-y-1/2"
                    width="300"
                    height="120"
                    viewBox="0 0 300 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {i === 0 && (
                      <path
                        d="M0 60 H300 V110"
                        stroke="#FCD34D"
                        strokeWidth="3"
                        className="animate-path"
                        fill="none"
                      />
                    )}
                    {i === 1 && (
                      <path
                        d="M0 60 H260"
                        stroke="#FCD34D"
                        strokeWidth="3"
                        className="animate-path"
                        fill="none"
                      />
                    )}
                    {i === 2 && (
                      <path
                        d="M0 60 H300 V10"
                        stroke="#FCD34D"
                        strokeWidth="3"
                        className="animate-path"
                        fill="none"
                      />
                    )}
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Right: Bubble */}
          <div className="w-1/2">
            <div className="bg-white rounded-2xl p-8 shadow-lg relative z-10">
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                "
                {testimoni[activeIndex]?.Description?.[0]?.children?.[0]?.text ??
                  "STTP mendukung penuh karier dan pendidikan saya."}
                "
              </p>
              <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimoni;
