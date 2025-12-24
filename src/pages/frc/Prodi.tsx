"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { easeOut } from "framer-motion"
import { api, getImageBaseURL } from "../../config/hooks"

interface ProdiProps {
  setLoading: (value: boolean) => void
}

interface ProdiData {
  id: number
  Name: string
  Jenjang: string
  deskripsi_prodi: {
    Content: string
    peluang?: string
  }
  Foto: {
<<<<<<< HEAD
    url?: string
    formats?: {
      large?: { url: string }
=======
    formats?: {
>>>>>>> 4ca63424dd72f1e3cf3d75026baa04fc8b957f12
      medium?: { url: string }
      small?: { url: string }
      thumbnail?: { url: string }
    }
  }
}

function Prodi({ setLoading }: ProdiProps) {
  const axiosInstance = api()
  const [prodis, setProdis] = useState<ProdiData[]>([])
  const [selectedProdi, setSelectedProdi] = useState<ProdiData | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const scrollPositionRef = useRef<number>(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    setLoading(true)
    axiosInstance
      .get("prodis?populate=*")
      .then((res) => {
        const prodiList = (res.data?.data || []).map((item: any) => ({
          id: item.id,
          Name: item.Name,
          Jenjang: item.Jenjang,
          deskripsi_prodi: {
            Content: item.deskripsi_prodi?.Content || "",
            peluang: item.deskripsi_prodi?.peluang || "",
          },
          Foto: item.Foto || {},
        }))
        setProdis(prodiList)
      })
      .catch((err) => console.error("Fetch Prodi error:", err))
      .finally(() => setLoading(false))
  }, [])

  const handleCardClick = (prodi: ProdiData) => {
    scrollPositionRef.current = window.pageYOffset
    setSelectedProdi(prodi)
    setShowPopup(true)
    document.body.style.overflow = "hidden"
  }

  const closePopup = () => {
    setShowPopup(false)
    setSelectedProdi(null)
    document.body.style.overflow = ""
    setTimeout(() => window.scrollTo(0, scrollPositionRef.current), 100)
  }

  const getImageUrl = (foto: any) => {
<<<<<<< HEAD
    if (!foto) return "/placeholder.svg"
    const imageBaseURL = getImageBaseURL()
    // Prioritize larger formats for better quality
    if (foto.formats?.large?.url) {
      return `${imageBaseURL}${foto.formats.large.url}`
    }
    if (foto.formats?.medium?.url) {
      return `${imageBaseURL}${foto.formats.medium.url}`
    }
    if (foto.url) {
      return `${imageBaseURL}${foto.url}`
    }
    if (foto.formats?.small?.url) {
      return `${imageBaseURL}${foto.formats.small.url}`
    }
    return "/placeholder.svg"
=======
    if (!foto?.formats) return "/placeholder.svg"
    const imageBaseURL = getImageBaseURL()
    return `${imageBaseURL}${
      foto.formats.medium?.url || foto.formats.small?.url || foto.formats.thumbnail?.url || ""
    }`
>>>>>>> 4ca63424dd72f1e3cf3d75026baa04fc8b957f12
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  }
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  }

  return (
    <>
      <section ref={sectionRef} id="program-studi" className="bg-black py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Program Studi</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {prodis.map((prodi, index) => (
              <motion.div
                key={prodi.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(251, 191, 36, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg overflow-hidden shadow-lg bg-gray-900 cursor-pointer"
                onClick={() => handleCardClick(prodi)}
              >
                <div className="h-48 md:h-64 overflow-hidden">
                  <motion.img
                    src={getImageUrl(prodi.Foto)}
                    alt={prodi.Name}
                    className="w-full h-full object-cover"
<<<<<<< HEAD
                    style={{ imageRendering: 'auto' }}
                    loading="lazy"
=======
>>>>>>> 4ca63424dd72f1e3cf3d75026baa04fc8b957f12
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-4 md:p-6 text-center">
                  <h3 className="text-white font-bold text-base md:text-lg mb-2 hover:text-yellow-400 transition-colors">
                    {prodi.Jenjang} - {prodi.Name}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-3">{prodi.deskripsi_prodi?.Content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showPopup && selectedProdi && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div
              className="bg-[#003E7E] text-white rounded-lg shadow-xl max-w-3xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-6 text-white text-2xl font-bold hover:text-yellow-400 transition-all hover:rotate-180 transform z-10"
              >
                ×
              </button>

              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                className="mb-6 overflow-hidden rounded-md"
              >
                <img
                  src={getImageUrl(selectedProdi.Foto) || "/placeholder.svg"}
                  alt="Foto Prodi"
                  className="w-full aspect-video object-contain rounded-md"
                />
              </motion.div>

              <motion.h3
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-xl md:text-2xl font-bold mb-6 text-yellow-400"
              >
                {selectedProdi.Name}
              </motion.h3>

              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                custom={2}
                className="space-y-6"
              >
                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="whitespace-pre-line text-base leading-relaxed text-gray-100">
                    {selectedProdi.deskripsi_prodi?.Content}
                  </p>
                </div>
              </motion.div>

              {selectedProdi.deskripsi_prodi?.peluang && (
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="border-t border-gray-600 pt-6 mt-6"
                >
                  <h4 className="font-semibold text-lg mb-3 text-yellow-400 flex items-center">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse" />
                    Peluang Karier:
                  </h4>
                  <div className="bg-yellow-400/10 p-4 rounded-lg border border-yellow-400/20">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-gray-200">
                      {selectedProdi.deskripsi_prodi.peluang}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 3px;
        }
      `}</style>
    </>
  )
}

export default Prodi
