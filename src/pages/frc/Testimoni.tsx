"use client"

import { useEffect, useState } from "react"
import { api } from "../../config/hooks"

interface DescriptionBlock {
  type: string
  children: { text: string }[]
}

interface TestimoniItem {
  id: number
  Name: string
  Jabatan: string
  Description: DescriptionBlock[]
  Foto?: {
    formats?: {
      small?: { url: string }
      medium?: { url: string }
      thumbnail?: { url: string }
    }
    url: string
  }
}

interface TestimoniProps {
  setLoading: (value: boolean) => void
}

function Testimoni({ setLoading }: TestimoniProps) {
  const [testimoni, setTestimoni] = useState<TestimoniItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [contentKey, setContentKey] = useState(0)
  const axios = api()
  const BASE_URL = "http://localhost:1337"

  useEffect(() => {
    const fetchTestimoni = async () => {
      try {
        setLoading(true)
        const response = await axios.get("testimonis?populate=Foto&sort=createdAt:desc&pagination[limit]=3")
        setTestimoni(response.data.data || response.data)
        setTimeout(() => setIsVisible(true), 100)
      } catch (error) {
        console.error("Gagal fetch testimoni:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimoni()
  }, [setLoading])

  useEffect(() => {
    if (testimoni.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimoni.length)
        setContentKey((prev) => prev + 1)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [testimoni.length])

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
      setContentKey((prev) => prev + 1)
    }
  }

  const getFotoUrl = (item: TestimoniItem | undefined): string => {
    const url = item?.Foto?.formats?.small?.url || item?.Foto?.formats?.thumbnail?.url || item?.Foto?.url
    return url ? BASE_URL + url : "/placeholder.svg?height=64&width=64"
  }

  return (
    <section
      className="bg-blue-900 py-20 px-6 md:px-20 relative overflow-hidden"
      style={{ backgroundColor: "#013D7B" }}
    >
      <style>
        {`
          @keyframes drawLine {
            0% {
              stroke-dashoffset: 1000;
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
          
          @keyframes flowParticles {
            0% {
              offset-distance: 0%;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              offset-distance: 100%;
              opacity: 0;
            }
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              filter: drop-shadow(0 0 5px #FCD34D) drop-shadow(0 0 10px #FCD34D);
            }
            50% {
              filter: drop-shadow(0 0 10px #FCD34D) drop-shadow(0 0 20px #FCD34D) drop-shadow(0 0 30px #FCD34D);
            }
          }
          
          @keyframes elasticDraw {
            0% {
              stroke-dashoffset: 1000;
              stroke-width: 1;
            }
            50% {
              stroke-width: 5;
            }
            100% {
              stroke-dashoffset: 0;
              stroke-width: 3;
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }
          
          .animate-line-draw {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: elasticDraw 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          
          .animate-line-glow {
            animation: pulseGlow 2s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out forwards;
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.6s ease-out forwards;
          }
          
          .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
          }
          
          .card-hover {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .bubble-content {
            transition: all 0.5s ease-in-out;
          }
          
          /* Particle animation along path */
          .particle {
            width: 6px;
            height: 6px;
            background: #FCD34D;
            border-radius: 50%;
            position: absolute;
            animation: flowParticles 2s ease-in-out infinite;
            box-shadow: 0 0 10px #FCD34D;
          }
          
          .particle:nth-child(2) { animation-delay: 0.3s; }
          .particle:nth-child(3) { animation-delay: 0.6s; }
          .particle:nth-child(4) { animation-delay: 0.9s; }
        `}
      </style>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Testimoni Mahasiswa dan Alumni</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* MOBILE RESPONSIVE (Stacked) */}
        <div className="flex flex-col lg:hidden gap-8">
          {testimoni.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full shimmer mb-4"></div>
                    <div className="w-24 h-4 shimmer rounded mb-2"></div>
                    <div className="w-32 h-3 shimmer rounded mb-4"></div>
                    <div className="w-full h-3 shimmer rounded mb-2"></div>
                    <div className="w-3/4 h-3 shimmer rounded mb-2"></div>
                    <div className="w-16 h-1 shimmer rounded"></div>
                  </div>
                </div>
              ))
            : testimoni.map((item, i) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-6 shadow-md card-hover ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <img
                        src={getFotoUrl(item) || "/placeholder.svg"}
                        alt={item.Name}
                        className="w-16 h-16 rounded-full object-cover mb-4 transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400/20 to-transparent"></div>
                    </div>
                    <h4 className="font-bold text-gray-800 transition-colors duration-300 hover:text-blue-600">
                      {item.Name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">{item.Jabatan}</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                      "{item.Description?.[0]?.children?.[0]?.text ?? "Testimoni tidak tersedia."}"
                    </p>
                    <div className="w-16 h-1 bg-yellow-400 rounded-full mt-2 transition-all duration-300 hover:w-20"></div>
                  </div>
                </div>
              ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-12">
          {/* Left: Cards */}
          <div className={`w-1/2 space-y-12 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            {testimoni.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-full px-6 py-4 flex items-center gap-4 shadow-lg max-w-sm">
                    <div className="w-12 h-12 rounded-full shimmer"></div>
                    <div className="flex-1">
                      <div className="w-24 h-4 shimmer rounded mb-2"></div>
                      <div className="w-32 h-3 shimmer rounded"></div>
                    </div>
                  </div>
                ))
              : testimoni.map((item, i) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-full px-6 py-4 flex items-center gap-4 shadow-lg max-w-sm cursor-pointer relative z-20 transition-all duration-500 card-hover ${
                      activeIndex === i
                        ? "ring-4 ring-yellow-400 ring-opacity-50 shadow-2xl transform scale-105"
                        : "hover:shadow-xl"
                    }`}
                    onClick={() => handleCardClick(i)}
                    onMouseEnter={() => handleCardClick(i)}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    <div className="relative">
                      <img
                        src={getFotoUrl(item) || "/placeholder.svg"}
                        alt={item.Name}
                        className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${
                          activeIndex === i ? "ring-2 ring-yellow-400 ring-offset-2" : ""
                        }`}
                      />
                      {activeIndex === i && (
                        <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-bold transition-colors duration-300 ${
                          activeIndex === i ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {item.Name}
                      </h4>
                      <p className="text-sm text-gray-600">{item.Jabatan}</p>
                    </div>

                    {/* Enhanced Beautiful Line Animations */}
                    {activeIndex === i && (
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 z-10">
                        <svg
                          width="320"
                          height="140"
                          viewBox="0 0 320 140"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="overflow-visible"
                        >
                          <defs>
                            {/* Gradient definitions */}
                            <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8" />
                              <stop offset="50%" stopColor="#F59E0B" stopOpacity="1" />
                              <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.6" />
                            </linearGradient>

                            {/* Glow filter */}
                            <filter id={`glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                              <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>

                            {/* Drop shadow */}
                            <filter id={`shadow-${i}`}>
                              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FCD34D" floodOpacity="0.3" />
                            </filter>
                          </defs>

                          {/* Background glow path */}
                          {i === 0 && (
                            <>
                              <path
                                d="M0 70 Q80 70 160 70 Q240 70 280 70 Q300 70 300 90 Q300 110 300 120"
                                stroke="#FCD34D"
                                strokeWidth="8"
                                className="animate-line-draw opacity-30"
                                fill="none"
                                filter={`url(#glow-${i})`}
                              />
                              <path
                                d="M0 70 Q80 70 160 70 Q240 70 280 70 Q300 70 300 90 Q300 110 300 120"
                                stroke={`url(#gradient-${i})`}
                                strokeWidth="3"
                                className="animate-line-draw animate-line-glow"
                                fill="none"
                                filter={`url(#shadow-${i})`}
                                style={{ animationDelay: "0.2s" }}
                              />
                            </>
                          )}

                          {i === 1 && (
                            <>
                              <path
                                d="M0 70 Q80 65 160 70 Q200 75 240 70 Q270 65 290 70"
                                stroke="#FCD34D"
                                strokeWidth="8"
                                className="animate-line-draw opacity-30"
                                fill="none"
                                filter={`url(#glow-${i})`}
                              />
                              <path
                                d="M0 70 Q80 65 160 70 Q200 75 240 70 Q270 65 290 70"
                                stroke={`url(#gradient-${i})`}
                                strokeWidth="3"
                                className="animate-line-draw animate-line-glow"
                                fill="none"
                                filter={`url(#shadow-${i})`}
                                style={{ animationDelay: "0.2s" }}
                              />
                            </>
                          )}

                          {i === 2 && (
                            <>
                              <path
                                d="M0 70 Q80 70 160 70 Q240 70 280 70 Q300 70 300 50 Q300 30 300 20"
                                stroke="#FCD34D"
                                strokeWidth="8"
                                className="animate-line-draw opacity-30"
                                fill="none"
                                filter={`url(#glow-${i})`}
                              />
                              <path
                                d="M0 70 Q80 70 160 70 Q240 70 280 70 Q300 70 300 50 Q300 30 300 20"
                                stroke={`url(#gradient-${i})`}
                                strokeWidth="3"
                                className="animate-line-draw animate-line-glow"
                                fill="none"
                                filter={`url(#shadow-${i})`}
                                style={{ animationDelay: "0.2s" }}
                              />
                            </>
                          )}

                          {/* Animated particles along the path */}
                          <g>
                            {[...Array(4)].map((_, particleIndex) => (
                              <circle
                                key={particleIndex}
                                r="3"
                                fill="#FCD34D"
                                className="particle"
                                style={{
                                  animationDelay: `${0.5 + particleIndex * 0.3}s`,
                                  filter: "drop-shadow(0 0 6px #FCD34D)",
                                }}
                              >
                                <animateMotion
                                  dur="2s"
                                  repeatCount="indefinite"
                                  begin={`${0.5 + particleIndex * 0.3}s`}
                                >
                                  <mpath href={i === 0 ? "#path-0" : i === 1 ? "#path-1" : "#path-2"} />
                                </animateMotion>
                              </circle>
                            ))}
                          </g>

                          {/* Hidden paths for particle animation */}
                          <defs>
                            <path id="path-0" d="M0 70 Q80 70 160 70 Q240 70 280 70 Q300 70 300 90 Q300 110 300 120" />
                            <path id="path-1" d="M0 70 Q80 65 160 70 Q200 75 240 70 Q270 65 290 70" />
                            <path id="path-2" d="M0 70 Q80 70 160 70 Q240 70 280 70 Q300 70 300 50 Q300 30 300 20" />
                          </defs>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
          </div>

          {/* Right: Enhanced Speech Bubble */}
          <div className={`w-1/2 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            {testimoni.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg relative">
                <div className="space-y-4">
                  <div className="w-full h-4 shimmer rounded"></div>
                  <div className="w-5/6 h-4 shimmer rounded"></div>
                  <div className="w-4/5 h-4 shimmer rounded"></div>
                  <div className="w-16 h-1 shimmer rounded mt-4"></div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-2xl relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-yellow-50 opacity-50"></div>
                <div className="absolute top-4 right-4 text-yellow-400/30 text-6xl font-serif">"</div>

                <div className="relative z-10">
                  <div key={contentKey} className="bubble-content">
                    <p className="text-gray-700 text-base leading-relaxed mb-6 font-medium">
                      "
                      {testimoni[activeIndex]?.Description?.[0]?.children?.[0]?.text ??
                        "STTP mendukung penuh karier dan pendidikan saya."}
                      "
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={getFotoUrl(testimoni[activeIndex]) || "/placeholder.svg"}
                        alt={testimoni[activeIndex]?.Name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{testimoni[activeIndex]?.Name}</p>
                        <p className="text-xs text-gray-600">{testimoni[activeIndex]?.Jabatan}</p>
                      </div>
                    </div>

                    <div className="w-16 h-1 bg-yellow-400 rounded-full transition-all duration-500 hover:w-24"></div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6 justify-center">
                  {testimoni.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleCardClick(i)}
                      title={`Pilih testimoni ${testimoni[i]?.Name || i + 1}`}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeIndex === i ? "bg-yellow-400 w-6" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimoni
