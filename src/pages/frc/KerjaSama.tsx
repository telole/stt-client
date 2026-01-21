import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { api, getImageBaseURL } from "../../config/hooks";

interface KerjaSamaProps {
  setLoading?: (value: boolean) => void;
}

interface PartnerLogo {
  id: number;
  src: string;
  alt: string;
  name: string;
}

function KerjaSama({ setLoading }: KerjaSamaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [scrollX, setScrollX] = useState(0);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const [logos, setLogos] = useState<PartnerLogo[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const axios = api();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading?.(true);
        const res = await axios.get("partners?populate=*");
        const partners = res.data?.data || [];
        
        const imageBaseURL = getImageBaseURL();
        const partnerLogos: PartnerLogo[] = partners.map((partner: any) => {
          const logoUrl = partner.Logo?.formats?.thumbnail?.url 
            ? `${imageBaseURL}${partner.Logo.formats.thumbnail.url}`
            : partner.Logo?.url 
            ? `${imageBaseURL}${partner.Logo.url}`
            : "/sttp.png";
          
          return {
            id: partner.id,
            src: logoUrl,
            alt: partner.Logo?.alternativeText || partner.Name || "Partner Logo",
            name: partner.Name || "Partner",
          };
        });
        
        setLogos(partnerLogos);
      } catch (error) {
        console.error("Error fetching partners:", error);
        setLogos([]);
      } finally {
        setLoading?.(false);
      }
    };

    fetchPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const duplicatedLogos =
    logos.length > 0 ? [...logos, ...logos] : [];

  useEffect(() => {
    // Jangan jalanin animasi kalau belum ada logo atau section tidak kelihatan
    if (logos.length === 0 || !isInView) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const getCardWidth = () => {
      const cardWidth = window.innerWidth >= 768 ? 240 : 180;
      const gap = window.innerWidth >= 768 ? 16 : 12;
      return cardWidth + gap;
    };

    let isAnimating = true;
    const SPEED_PX_PER_SEC = 25; // lebih halus

    const tick = (timestamp: number) => {
      if (!isAnimating) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const deltaMs = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const distance = (SPEED_PX_PER_SEC * deltaMs) / 1000;

      const cardWidth = getCardWidth();
      const setWidth = logos.length * cardWidth;

      animationRef.current = (animationRef.current + distance) % setWidth;
      setScrollX(animationRef.current);

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    // Reset posisi saat mulai animasi
    animationRef.current = 0;
    setScrollX(0);
    lastTimeRef.current = null;
    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isAnimating = false;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [logos.length, isInView]);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 md:py-20 px-4 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gray-900 text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Kerja Sama
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
        </motion.div>

        <div
          ref={containerRef}
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {logos.length > 0 ? (
            <div
              className="flex gap-3 md:gap-4"
              style={{
                transform: `translateX(-${scrollX}px)`,
                width: "max-content",
                willChange: "transform",
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex-shrink-0 w-[200px] md:w-[250px]"
                >
                  <div className="bg-white p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px] pentagon-shape">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-w-full max-h-24 md:max-h-32 object-contain mb-4"
                      loading="lazy"
                    />
                    <p className="text-black text-sm md:text-base font-medium text-center mt-2">
                      {logo.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-3 md:gap-4 justify-center">
              <div className="flex-shrink-0 w-[200px] md:w-[250px]">
                <div className="bg-gray-100 p-6 md:p-8 shadow-md flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px] pentagon-shape animate-pulse">
                  <div className="w-24 h-24 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .pentagon-shape {
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
        }
      `}</style>
    </section>
  );
}

export default KerjaSama;

