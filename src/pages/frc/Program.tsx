'use client';

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { api } from "../../config/hooks";

interface ProgramProps {
  setLoading: (loading: boolean) => void;
}

interface ProgramData {
  id: number;
  Name: string;
  Description: string;
  Icon: string | null; 
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

function Program({ setLoading }: ProgramProps) {
  const axios = api();
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const particleId = useRef(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get("programs") 
      .then((res) => setPrograms(res.data?.data || []))
      .catch((err) => console.error("Fetch Program error:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePos({ x, y });

        // Add new particle
        setParticles(prev => [
          ...prev,
          { id: particleId.current++, x, y }
        ]);

        // Remove old particles after animation
        setTimeout(() => {
          setParticles(prev => prev.slice(1));
        }, 1000);
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const getFallbackIcon = (name: string): string => {
    if (name.toLowerCase().includes("weekend")) return "bi-house-fill";
    if (name.toLowerCase().includes("reguler")) return "bi-mortarboard-fill";
    return "bi-grid-fill";
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-blue-900 py-12 md:py-20 px-4 md:px-20 overflow-hidden"
      style={{ background: "#013D7B" }}
    >
      {/* Particle Trail Effect */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed"
          initial={{ 
            x: particle.x - 4, 
            y: particle.y - 4,
            scale: 1,
            opacity: 1 
          }}
          animate={{ 
            scale: 0,
            opacity: 0,
            y: particle.y - 30
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            width: "8px",
            height: "8px",
            background: "linear-gradient(135deg, #FFC107, #FF9800)",
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(255, 193, 7, 0.8)",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Program Kelas STT Pati
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
          {programs.map((program, index) => {
            const { id, Name, Description, Icon } = program;
            const iconClass = Icon || getFallbackIcon(Name);

            return (
              <motion.div 
                className="text-center" 
                key={id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-6">
                  <i
                    className={`bi ${iconClass} text-yellow-400 text-4xl md:text-5xl`}
                  ></i>
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl mb-2">
                  {Name}
                </h3>
                <p className="text-gray-300 text-sm whitespace-pre-line">
                  {Description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Program;