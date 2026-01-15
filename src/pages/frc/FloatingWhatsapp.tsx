import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../config/hooks";

export default function FloatingWhatsApp() {

    const [number, setNumber] = useState('');
    const axios = api();

    useEffect(() => {
  axios
    .get("whatsapps")
    .then((res) => {
      const item = res.data?.data?.find((w: any) => w.Tampil === true);

      if (item?.Nomor) {
        const formatted = item.Nomor.replace(/^0/, "62");
        setNumber(formatted);
      }
    })
    .catch((err) => {
      console.error("Error fetching WhatsApp number:", err);
    });
}, []);

  return (
   <a
  href={`https://wa.me/${number}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
  fixed bottom-6 right-6
  z-[9999]
  flex items-center gap-3
  px-11 py-7
  min-w-[280px]
  rounded-full
  bg-[#0B4C8C] hover:bg-[#093E73]
  text-white font-semibold
  shadow-lg
  transition-all
"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-10 h-10 fill-[#FFD400]"
  >
    <path d="M16 2.9C8.8 2.9 2.9 8.8 2.9 16c0 2.6.8 5.1 2.3 7.2L3 29l6-2.1c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13.1-5.9 13.1-13.1S23.2 2.9 16 2.9zm0 23.7c-2.1 0-4.2-.6-6-1.7l-.4-.2-3.6 1.3 1.2-3.5-.2-.4c-1.2-1.9-1.9-4-1.9-6.2 0-6.3 5.1-11.4 11.4-11.4S27.4 9.7 27.4 16 22.3 26.6 16 26.6zm6.2-8.5c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1-1.3-.5-2.5-1.5c-.9-.8-1.5-1.7-1.7-2s0-.5.1-.6c.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5s0-.4 0-.6-.7-1.6-1-2.2c-.3-.6-.6-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.8 1.2 3.2 1.4 3.4c.2.2 2.4 3.7 5.9 5.2.8.3 1.4.5 1.9.6.8.2 1.6.1 2.2.1.7-.1 1.8-.7 2-1.3.3-.6.3-1.1.2-1.3-.1-.2-.3-.3-.6-.4z"/>
  </svg>

  <span className="hidden sm:block">
    Hubungi via WhatsApp
  </span>
</a>

  );
}
