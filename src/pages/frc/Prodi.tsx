import { useEffect, useState } from "react";
import { api } from "../../config/hooks";

interface ProdiProps {
  setLoading: (value: boolean) => void;
}

interface ProdiData {
  id: number;
  Name: string;
  Jenjang: string;
  deskripsi_prodi: {
    Content: string;
  };
  Foto: {
    formats: {
      medium?: {
        url: string;
      };
        small?: {
        url: string; 
        };
      thumbnail?: {
        url: string;
      };
    };
  };
}
function Prodi({ setLoading }: ProdiProps) {
  const axios = api();
  const [prodis, setProdis] = useState<ProdiData[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("prodis?populate=*")
      .then((res) => setProdis(res.data?.data || []))
      .catch((err) => console.error("Fetch Prodi error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#000] py-12 md:py-20 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Program Studi</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {prodis.map((prodi) => (
            <div key={prodi.id} className="rounded-lg overflow-hidden shadow-lg bg-gray-900">
              <div className="h-48 md:h-64 overflow-hidden">
                <img
                 src={`http://localhost:1337${
                    prodi.Foto?.formats?.medium?.url ||
                    prodi.Foto?.formats?.small?.url ||
                    prodi.Foto?.formats?.thumbnail?.url ||
                    ""
                    }`}
                  alt={prodi.Name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-white font-bold text-base md:text-lg mb-2">
                  {prodi.Jenjang} - {prodi.Name}
                </h3>
                <p className="text-white text-sm line-clamp-3">
                  {prodi.deskripsi_prodi?.Content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Prodi;
