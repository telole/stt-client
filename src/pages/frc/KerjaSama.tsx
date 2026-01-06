import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface KerjaSamaProps {
  setLoading?: (value: boolean) => void;
}

function KerjaSama({ setLoading }: KerjaSamaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [scrollX, setScrollX] = useState(0);
  const animationRef = useRef<number>(0);

  const logos = [
    { id: 1, src: "/sttp.png", alt: "STTP Logo", name: "STT Pati" },
    { id: 2, src: "/sttp.png", alt: "STTP Logo", name: "SMKTH Pati" },
    { id: 3, src: "/sttp.png", alt: "STTP Logo", name: "STIE" },
    { id: 4, src: "/sttp.png", alt: "STTP Logo", name: "PO. Sumber Harapan" },
    { id: 5, src: "/sttp.png", alt: "STTP Logo", name: "Mekanisasi Pertanian Pati" },
    { id: 6, src: "/sttp.png", alt: "STTP Logo", name: "BPR Asabahana Pati" },
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos]; 

  useEffect(() => {
    if (containerRef.current && isInView) {
      const timer = setTimeout(() => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const startPosition = containerWidth;
          animationRef.current = startPosition;
          setScrollX(startPosition);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const getCardWidth = () => {
      return window.innerWidth >= 768 ? 250 + 24 : 200 + 24; 
    };

    const containerWidth = containerRef.current.offsetWidth;
    const startPosition = containerWidth;
    const actualCardWidth = getCardWidth();
    const actualTotalWidth = logos.length * actualCardWidth;
    const endPosition = startPosition + actualTotalWidth + containerWidth;

    const animate = () => {
      animationRef.current += 0.5;
      if (animationRef.current >= endPosition) {
        animationRef.current = startPosition;   
      }
      setScrollX(animationRef.current);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isInView, logos.length]);

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

        <div ref={containerRef} className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={{
              x: `-${scrollX}px`,
            }}
            transition={{
              ease: "linear",
              duration: 0,
            }}
            style={{
              width: "max-content",
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
                  />
                  <p className="text-black text-sm md:text-base font-medium text-center mt-2">
                    {logo.name}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
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

