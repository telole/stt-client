import { useEffect, useState } from "react";
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

function Program({ setLoading }: ProgramProps) {
  const axios = api();
  const [programs, setPrograms] = useState<ProgramData[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("programs") 
      .then((res) => setPrograms(res.data?.data || []))
      .catch((err) => console.error("Fetch Program error:", err))
      .finally(() => setLoading(false));
  }, []);

  const getFallbackIcon = (name: string): string => {
    if (name.toLowerCase().includes("weekend")) return "bi-house-fill";
    if (name.toLowerCase().includes("reguler")) return "bi-mortarboard-fill";
    return "bi-grid-fill";
  };

  return (
    <section
      className="bg-blue-900 py-12 md:py-20 px-4 md:px-20"
      style={{ background: "#013D7B" }}
    >
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
