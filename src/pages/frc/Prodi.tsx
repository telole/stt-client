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
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

function Prodi({ setLoading }: ProdiProps) {
  const axios = api();
  const [prodis, setProdis] = useState<ProdiData[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedFoto, setSelectedFoto] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [peluang, setPeluang] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setLoading(false); // default false agar tidak loading terus
    axios
      .get("prodis?populate=*")
      .then((res) => setProdis(res.data?.data || []))
      .catch((err) => console.error("Fetch Prodi error:", err))
      .finally(() => setLoading(false));
  }, [axios, setLoading]);

  const handleCardClick = async (prodiName: string) => {
    setSelectedTitle(prodiName);
    setShowPopup(true);
    setLoading(true);

    const prodiData = prodis.find((p) => p.Name === prodiName);
    const fotoURL = prodiData
      ? `http://localhost:1337${
          prodiData.Foto?.formats?.medium?.url ||
          prodiData.Foto?.formats?.small?.url ||
          prodiData.Foto?.formats?.thumbnail?.url ||
          ""
        }`
      : null;
    setSelectedFoto(fotoURL);

    try {
      const res = await axios.get(
        `deskripsi-prodis?filters[Title][$eq]=${encodeURIComponent(prodiName)}`
      );

      const item = res.data?.data?.[0];
      setContent(item?.Content || "Deskripsi tidak ditemukan.");
      setPeluang(item?.peluang || null);
    } catch (err) {
      console.error("Error fetch deskripsi:", err);
      setContent("Gagal memuat deskripsi.");
      setPeluang(null);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTitle(null);
    setSelectedFoto(null);
    setContent(null);
    setPeluang(null);
  };

  return (
    <section className="bg-[#000] py-12 md:py-20 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Program Studi</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {prodis.map((prodi) => (
            <div
              key={prodi.id}
              className="rounded-lg overflow-hidden shadow-lg bg-gray-900 cursor-pointer"
              onClick={() => handleCardClick(prodi.Name)}
            >
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

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#003E7E] text-white rounded-lg shadow-xl max-w-3xl w-full p-6 md:p-8 md:px-10 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closePopup}
              className="absolute top-4 right-6 text-white text-xl font-bold"
            >
              &times;
            </button>

            {selectedFoto && (
              <img
                src={selectedFoto}
                alt="Foto Prodi"
                className="w-full aspect-video object-contain rounded-md mb-6"
              />
            )}

            <h3 className="text-xl md:text-2xl font-bold mb-4">{selectedTitle}</h3>

            <p className="whitespace-pre-line mb-6 text-base leading-relaxed">
              {content}
            </p>

            {peluang && (
              <>
                <h4 className="font-semibold text-base mb-2">Peluang Karier:</h4>
                <p className="whitespace-pre-line text-sm leading-relaxed">{peluang}</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Prodi;
