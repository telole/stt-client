import { useEffect, useState } from "react";
import { api, getImageBaseURL } from "../../config/hooks";

interface ReasonProps {
  setLoading: (loading: boolean) => void;
}

interface ReasonItem {
  id: number;
  Title: string;
  Icon: string;
  List: {
    id: number;
    Description: string;
  }[];
  Model: {
    url: string;
    formats: {
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

function Reason({ setLoading }: ReasonProps) {
  const axios = api();
  const [reason, setReason] = useState<ReasonItem | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("alasans?populate=*")
      .then((res) => {
        const data = res.data?.data?.[0];
        if (data) {
          setReason({
            id: data.id,
            Title: data.Title,
            Icon: data.Icon,
            List: data.List || [],
            Model: data.Model,
          });
        }
      })
      .catch((err) => console.error("Fetch Reason error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!reason) return null;

  const getImageUrl = () => {
    if (!reason?.Model) return '';
    const imageBaseURL = getImageBaseURL();
    const url = reason.Model.formats?.medium?.url || reason.Model.url || '';
    return url ? `${imageBaseURL}${url}` : '';
  };

  return (
   <section className="bg-yellow-400 py-12 md:py-20 px-4 md:px-20 relative overflow-hidden">
  <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] bg-blue-900 rounded-full z-0 top-20 md:top-auto md:right-20 md:translate-y-10 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0"></div>
  <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
    <div className="w-full md:w-1/2 relative z-20">
      <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
        <h2 className="text-blue-900 text-xl md:text-2xl lg:text-3xl font-bold mb-4 whitespace-pre-line">
          {reason.Title}
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6 md:mb-8 rounded-full"></div>

        <div className="space-y-4 md:space-y-6">
          {reason.List.map((item) => (
            <div key={item.id} className="flex items-start gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <i className={reason.Icon}></i>
              </div>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                {item.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="w-full md:w-1/2 relative flex justify-center items-center overflow-visible min-h-[300px] md:min-h-0">
      <img
        src={getImageUrl()}
        alt="Model STTP"
        className="relative z-10 w-auto h-auto scale-[1.3] md:scale-[2.3] lg:scale-[2.7] object-contain translate-x-[-20px] translate-y-[40px] md:translate-x-[-150px] md:translate-y-[75px]"
      />
    </div>
  </div>
</section>

  );
}

export default Reason;
