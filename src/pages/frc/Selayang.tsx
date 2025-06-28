import { useEffect, useState } from "react";
import { api } from "../../config/hooks";
import { motion } from "framer-motion";

interface SelayangData {
  Content: string;
  Author: string;
  AuthorTitle: string;
  Foto: {
    formats: {
      medium?: {
        url: string;
      };
    };
  };
}

interface SelayangProps {
  setLoading: (value: boolean) => void;
}

function Selayang({ setLoading }: SelayangProps) {
  const axios = api();
  const [selayang, setSelayang] = useState<SelayangData | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("selayang-pandang?populate=*")
      .then((res) => {
        const data = res.data?.data;
        if (data) {
          setSelayang({
            Content: data.Content,
            Author: data.Author,
            AuthorTitle: data.AuthorTitle,
            Foto: data.Foto,
          });
        }
      })
      .catch((err) => console.error("Fetch Selayang Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!selayang) return null;

  const imageUrl =
    selayang.Foto?.formats?.medium?.url
      ? `http://localhost:1337${selayang.Foto.formats.medium.url}`
      : "";

  return (
    <section className="bg-white border border-blue-500 px-4 md:px-20 pt-12 md:pt-16 pb-0 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 relative z-10">

        <motion.div
          className="w-full md:w-1/2 md:max-w-lg text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-blue-900 text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Selayang Pandang
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mb-6 md:mb-8 mx-auto md:mx-0"></div>
          <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed mb-6">
            "{selayang.Content}"
          </p>
          <div className="text-center md:text-left">
            <p className="text-base md:text-lg font-bold text-gray-900 mb-1">
              {selayang.Author}
            </p>
            <p className="text-sm md:text-base text-gray-600">
              {selayang.AuthorTitle}
            </p>
          </div>
        </motion.div>

        <motion.div
          // className="w-full md:w-1/2 relative flex justify-center md:justify-end items-center"
          // initial={{ opacity: 0, x: 50 }}
          // whileInView={{ opacity: 1, x: 0 }}
          // viewport={{ once: true, amount: 0.3 }}
          // transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-yellow-400 rounded-full z-0 md:right-[-40px] md:translate-y-16"></div>
          <img
            src={imageUrl}
            alt={`Ketua STTP - ${selayang.Author}`}
            className="relative z-10 w-auto h-[400px] md:h-[500px] lg:h-[650px] object-cover md:-translate-x-8"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Selayang;
