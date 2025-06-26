import { useEffect, useState } from "react";
import axios from "axios";

interface Step {
  id: number;
  Title: string;
  Deskripsi: string;
  Urutan: number;
  Posisi: string;
}

interface FlowProps {
  setLoading: (value: boolean) => void;
}

function Flow({ setLoading }: FlowProps) {
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:1337/api/alur-daftars?populate[step]=*")
      .then((res) => {
        const data = res.data?.data?.[0]?.step || [];
        const sortedSteps = [...data].sort((a, b) => a.Urutan - b.Urutan);
        setSteps(sortedSteps);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [setLoading]);

  return (
    <div
      id="daftar"
      className="scroll-mt-32 min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center px-4 py-10 md:py-20"
      style={{ backgroundColor: "#013D7B" }}
    >
      <div className="max-w-4xl w-full bg-white bg-opacity-95 px-4 sm:px-6 md:px-12 pt-8 md:pt-12 pb-12 md:pb-16 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-2">
          Alur Pendaftaran
        </h2>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8 md:mb-16 rounded-full"></div>

        {/* MOBILE VIEW */}
        <div className="block md:hidden space-y-8">
          {steps.map((step) => (
            <div className="flex items-start gap-4" key={step.id}>
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-lg flex-shrink-0">
                {step.Urutan}
              </div>
              <div>
                <h3 className="text-blue-900 font-bold text-lg mb-2">{step.Title}</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{step.Deskripsi}</p>
                {step.Urutan === 1 && (
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded transition-all text-sm">
                    Daftar Sekarang
                  </button>
                )}
                {step.Urutan === 5 && (
                  <div className="bg-blue-900 text-white px-6 py-4 rounded-lg">
                    <p className="font-bold text-yellow-300 text-lg mb-1">SELAMAT!</p>
                    <div className="w-15 h-1 bg-yellow-400 rounded-full my-2"></div>
                    <p className="text-sm leading-relaxed">{step.Deskripsi}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        {steps.length >= 5 && (
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-400 z-0"></div>

            <div className="flex items-start mb-16 relative z-10">
              <div className="w-1/2 pr-12 relative">
                <div className="absolute right-0 top-4 w-10 h-1 bg-yellow-400"></div>
                <h3 className="text-blue-900 font-bold text-lg mb-2">{steps[0].Title}</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{steps[0].Deskripsi}</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded transition-all text-sm">
                  Daftar Sekarang
                </button>
              </div>
              <div className="relative z-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">
                {steps[0].Urutan}
              </div>
              <div className="w-1/2 pl-12"></div>
            </div>

            <div className="flex items-start mb-16 relative z-10">
              <div className="w-1/2 pr-12"></div>
              <div className="relative z-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">
                {steps[1].Urutan}
              </div>
              <div className="w-1/2 pl-12 relative">
                <div className="absolute left-0 top-4 w-10 h-1 bg-yellow-400"></div>
                <h3 className="text-blue-900 font-bold text-lg mb-2">{steps[1].Title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{steps[1].Deskripsi}</p>
              </div>
            </div>

            <div className="flex items-start mb-16 relative z-10">
              <div className="w-1/2 pr-12 relative">
                <div className="absolute right-0 top-4 w-10 h-1 bg-yellow-400"></div>
                <h3 className="text-blue-900 font-bold text-lg mb-2">{steps[2].Title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{steps[2].Deskripsi}</p>
              </div>
              <div className="relative z-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">
                {steps[2].Urutan}
              </div>
              <div className="w-1/2 pl-12"></div>
            </div>

            <div className="flex items-start mb-16 relative z-10">
              <div className="w-1/2 pr-12"></div>
              <div className="relative z-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">
                {steps[3].Urutan}
              </div>
              <div className="w-1/2 pl-12 relative">
                <div className="absolute left-0 top-4 w-10 h-1 bg-yellow-400"></div>
                <h3 className="text-blue-900 font-bold text-lg mb-2">{steps[3].Title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{steps[3].Deskripsi}</p>
              </div>
            </div>

            <div className="flex items-center relative z-10">
              <div className="w-1/2 pr-12 flex justify-end relative">
                <div className="absolute right-0 top-16 w-10 h-1 bg-yellow-400"></div>
                <div className="bg-blue-900 text-white px-6 py-4 rounded-lg max-w-xs">
                  <p className="font-bold text-yellow-300 text-lg mb-1">SELAMAT!</p>
                  <div className="mt-4 w-15 h-1 bg-yellow-400 rounded-full"></div>
                  <p className="text-sm leading-relaxed">{steps[4].Deskripsi}</p>
                </div>
              </div>
              <div className="relative z-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">
                {steps[4].Urutan}
              </div>
              <div className="w-1/2 pl-12"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Flow;
