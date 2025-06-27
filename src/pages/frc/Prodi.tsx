"use client"

import { useEffect, useState, useRef } from "react"
import { api } from "../../config/hooks"

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
    formats?: {
      medium?: { url: string }
      small?: { url: string }
      thumbnail?: { url: string }
    }
  }
}

function Prodi({ setLoading }: ProdiProps) {
  const axios = api()
  const [prodis, setProdis] = useState<ProdiData[]>([])
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const [selectedFoto, setSelectedFoto] = useState<string | null>(null)
  const [content, setContent] = useState<string | null>(null)
  const [peluang, setPeluang] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const [showImage, setShowImage] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showPeluang, setShowPeluang] = useState(false)

  // Ref untuk menyimpan posisi scroll
  const scrollPositionRef = useRef<number>(0)

  useEffect(() => {
    setLoading(true)
    axios
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

  const handleCardClick = (prodiName: string) => {
    const prodiData = prodis.find((p) => p.Name === prodiName)
    if (!prodiData) return

    scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop

    setShowImage(false)
    setShowTitle(false)
    setShowContent(false)
    setShowPeluang(false)

    setSelectedTitle(prodiData.Name)
    setShowPopup(true)
    setIsClosing(false)

    const fotoURL = prodiData.Foto
      ? `http://localhost:1337${
          prodiData.Foto.formats?.medium?.url ||
          prodiData.Foto.formats?.small?.url ||
          prodiData.Foto.formats?.thumbnail?.url ||
          ""
        }`
      : null
    setSelectedFoto(fotoURL)

    setContent(prodiData.deskripsi_prodi?.Content || "Deskripsi tidak ditemukan.")
    setPeluang(prodiData.deskripsi_prodi?.peluang || null)

    setTimeout(() => setShowImage(true), 200)
    setTimeout(() => setShowTitle(true), 600)
    setTimeout(() => setShowContent(true), 1000)
    setTimeout(() => setShowPeluang(true), 1300)
  }

  const closePopup = () => {
    setIsClosing(true)
    setShowImage(false)
    setShowTitle(false)
    setShowContent(false)
    setShowPeluang(false)

    setTimeout(() => {
      setShowPopup(false)
      setIsClosing(false)
      setSelectedTitle(null)
      setSelectedFoto(null)
      setContent(null)
      setPeluang(null)
    }, 300)
  }

  useEffect(() => {
    if (showPopup) {
      const currentScrollY = window.pageYOffset
      scrollPositionRef.current = currentScrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${currentScrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      const scrollY = scrollPositionRef.current
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY)
      })
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
    }
  }, [showPopup])

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  return (
    <>
      <section className="bg-[#000] py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Program Studi</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {prodis.map((prodi) => (
              <div
                key={prodi.id}
                className="rounded-lg overflow-hidden shadow-lg bg-gray-900 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCardClick(prodi.Name)
                }}
              >
                <div className="h-48 md:h-64 overflow-hidden">
                  <img
                    src={`http://localhost:1337${
                      prodi.Foto?.formats?.medium?.url ||
                      prodi.Foto?.formats?.small?.url ||
                      prodi.Foto?.formats?.thumbnail?.url ||
                      ""
                    }`}
                    alt={prodi.Name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4 md:p-6 text-center">
                  <h3 className="text-white font-bold text-base md:text-lg mb-2 transition-colors duration-300 hover:text-yellow-400">
                    {prodi.Jenjang} - {prodi.Name}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-3">{prodi.deskripsi_prodi?.Content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Popup - Rendered inline tanpa portal */}
      {showPopup && (
        <div
          className={`fixed inset-0 bg-black flex items-center justify-center z-[9999] px-4 transition-all duration-500 ${
            isClosing ? "bg-opacity-0" : "bg-opacity-70"
          }`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            closePopup()
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div
            className={`bg-[#003E7E] text-white rounded-lg shadow-xl max-w-3xl w-full p-6 md:p-8 md:px-10 relative max-h-[90vh] overflow-y-auto transform transition-all duration-500 ${
              isClosing ? "scale-90 opacity-0 translate-y-8" : "scale-100 opacity-100 translate-y-0"
            }`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                closePopup()
              }}
              className="absolute top-4 right-6 text-white text-2xl font-bold hover:text-yellow-400 transition-all duration-200 hover:rotate-180 transform z-10"
              aria-label="Close popup"
            >
              &times;
            </button>

            {selectedFoto && (
              <div
                className={`mb-6 overflow-hidden rounded-md transition-all duration-700 transform ${
                  showImage ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4"
                }`}
              >
                <img
                  src={selectedFoto || "/placeholder.svg"}
                  alt="Foto Prodi"
                  className="w-full aspect-video object-contain rounded-md"
                />
              </div>
            )}

            <div
              className={`transition-all duration-600 transform ${
                showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-yellow-400">{selectedTitle}</h3>
            </div>

            <div
              className={`transition-all duration-700 transform ${
                showContent
                  ? "opacity-100 translate-y-0 max-h-screen"
                  : "opacity-0 translate-y-6 max-h-0 overflow-hidden"
              }`}
            >
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="whitespace-pre-line text-base leading-relaxed text-gray-100">{content}</p>
                </div>
              </div>
            </div>

            {peluang && (
              <div
                className={`transition-all duration-700 transform ${
                  showPeluang
                    ? "opacity-100 translate-y-0 max-h-screen mt-6"
                    : "opacity-0 translate-y-6 max-h-0 overflow-hidden mt-0"
                }`}
              >
                <div className="border-t border-gray-600 pt-6">
                  <h4 className="font-semibold text-lg mb-3 text-yellow-400 flex items-center">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></span>
                    Peluang Karier:
                  </h4>
                  <div className="bg-yellow-400/10 p-4 rounded-lg border border-yellow-400/20">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-gray-200">{peluang}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }

        /* Prevent layout shift */
        body.modal-open {
          overflow: hidden !important;
        }
      `}</style>
    </>
  )
}

export default Prodi
