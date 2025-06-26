import { useEffect, useState } from "react";


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

function Header({ setLoading }: HeaderProps) {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:1337/api/hero?populate=Background")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const data = json.data;
        if (!data || !data.Headline || !data.Background) {
          throw new Error("Invalid data structure received from API");
        }

        const fullImages: BackgroundImage[] = data.Background.map((img: any) => ({
          id: img.id,
          name: img.name,
          url: `http://localhost:1337${img.url}`,
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
  }, [setLoading]);

  useEffect(() => {
    if (!hero) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hero.Background.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [hero]);

  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!hero) return null;

  return (
    <div className="relative w-full h-[90vh] md:h-screen overflow-hidden">
      {/* Background Slideshow */}
      {hero.Background.map((img, idx) => (
        <img
          key={img.id}
          src={img.url}
          alt={img.name}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 brightness-50 ${
            currentIndex === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Hero Text Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-10 md:px-20 text-white z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight max-w-3xl animate__animated animate__fadeInUp  ">
          {hero.Headline}
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight max-w-3xl animate__animated animate__fadeInUp animate-delay-1s">
          {hero.Headline2}
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl leading-relaxed animate__animated animate__fadeInUp animate_delay-1s ">
          {hero.Subheadline}
        </p>
        <a
          href="#daftar"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded transition-all text-sm sm:text-base md:text-lg animate__animated animate__zoomIn animate__delay-1s"
        >
          Daftar Sekarang
        </a>
      </div>
    </div>
  );
}

export default Header;
