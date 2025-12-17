import { useEffect, useState } from "react";
import { api, getImageBaseURL } from "../../config/hooks";

interface NewsItem {
  id: number;
  Title: string;
  slug: string;
  createdAt: string;
  Cover?: {
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
    url: string;
  }[];
}

interface NewsProps {
  setLoading: (value: boolean) => void;
}

function News({ setLoading }: NewsProps) {
  const axios = api();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get("beritas?populate=Cover&sort=createdAt:desc&pagination[limit]=3");
        setNews(res.data.data);
      } catch (error) {
        console.error("Gagal fetch berita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getCoverUrl = (item: NewsItem): string => {
    const imageBaseURL = getImageBaseURL();
    return item?.Cover?.[0]?.formats?.small?.url
      ? `${imageBaseURL}${item.Cover[0].formats.small.url}`
      : "/default.jpg";
  };

  return (
    <section className="bg-gray-50 py-12 md:py-20 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-gray-900 text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Berita Terkini</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {news.map((item, index) => (
            <div
              key={item.id}
              className={`bg-blue-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                index === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="h-40 md:h-48 bg-gray-200 overflow-hidden">
                <img
                  src={getCoverUrl(item)}
                  alt={item.Title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 bg-blue-50">
                <p className="text-blue-600 text-xs md:text-sm mb-2 md:mb-3 font-medium">
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-gray-900 font-bold text-sm md:text-base leading-tight">
                  {item.Title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 md:px-8 py-2 md:py-3 rounded-lg transition-all shadow-md hover:shadow-lg text-sm md:text-base">
            Lihat Semua Berita
          </button>
        </div>
      </div>
    </section>
  );
}

export default News;
