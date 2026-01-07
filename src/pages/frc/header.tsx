import { useEffect, useState } from "react";
import { api, getImageBaseURL } from "../../config/hooks";


interface BackgroundImage {
  id: number;
  url: string;
  name: string;
}

interface HeroData {
  Headline: string;
  Headline2: string;
  Subheadline: string;
  Background: BackgroundImage[];
}

interface HeaderProps {
  setLoading: (value: boolean) => void;
}

function HandleRedirect(path: string) { 
  window.location.href = 'https://pmb.sttp.ac.id/';
}

function Header({ setLoading }: HeaderProps) {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const axios = api();
    axios
      .get("hero?populate=Background")
      .then((res) => {
        const data = res.data.data;
        if (!data || !data.Headline || !data.Background) {
          throw new Error("Invalid data structure received from API");
        }

        const imageBaseURL = getImageBaseURL();
        const fullImages: BackgroundImage[] = data.Background.map((img: any) => ({
          id: img.id,
          name: img.name,
          url: `${imageBaseURL}${img.url}`,
        }));

        setHero({
          Headline: data.Headline,
          Headline2: data.Headline2 || "",
          Subheadline: data.Subheadline,
          Background: fullImages,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch hero data:", err);
        setError(err.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hero || !hero.Background || hero.Background.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hero.Background.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [hero]);



  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!hero) return null;

  return (
  <div className="relative w-full max-w-screen h-screen overflow-hidden">
    {hero.Background && hero.Background.length > 0 && hero.Background.map((img, idx) => (
      <img
        key={img.id}
        src={img.url}
        alt={img.name}
        className={`absolute w-full h-full object-cover transition-opacity duration-1000 brightness-50 ${
          currentIndex === idx ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}
    <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-10 md:px-20 text-white z-10 ml-4 sm:ml-8 md:ml-16">
      <h1 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight max-w-3xl animate__animated animate__fadeInUp">
        {hero.Headline}
      </h1>
      <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight max-w-3xl animate__animated animate__fadeInUp animate-delay-1s">
        {hero.Headline2}
      </h2>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl mb-4 sm:mb-6 max-w-2xl leading-relaxed animate__animated animate__fadeInUp animate_delay-1s italic" style={{ fontFamily: "'Brush Script MT', 'Brush Script', cursive" }}>
        {hero.Subheadline}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate__animated animate__zoomIn animate__delay-1s">
        <button
          onClick={() => HandleRedirect("https://pmb.sttp.ac.id/")}
          className="font-['Poppins'] bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2.5 sm:py-3 px-5 sm:px-6 md:px-8 rounded transition-all text-sm sm:text-base md:text-lg"
        >
          Daftar Sekarang
        </button>
        <button
          onClick={() => window.open('https://wa.me/628971329888', '_blank')}
          className="font-['Poppins'] bg-[#0b466a] hover:bg-[#093a56] text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 md:px-8 rounded transition-all text-sm sm:text-base md:text-lg"
        >
          Hubungi Via WhatsApp
        </button>
      </div>
    </div>
  </div>
);
}

export default Header;
