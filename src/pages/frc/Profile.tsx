import { useEffect, useState } from "react";
import { api } from "../../config/hooks";

interface VisiItem {
  id: number;
  Text: string;
}

interface MisiItem {
  id: number;
  Text: string;
}

interface ProfileData {
  Visi: VisiItem[];
  Misi: MisiItem[];
  url: string;
}

interface ProfileProps {
  setLoading: (value: boolean) => void;
}

function Profile({ setLoading }: ProfileProps) {
  const axios = api();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("profiles?populate[Visi]=*&populate[Misi]=*");
        if (res.data.data && res.data.data.length > 0) {
          setProfile(res.data.data[0]);
        }
      } catch (err) {
        console.error("Gagal mengambil data profil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setLoading]);

  return (
    <section id="profile" className="bg-gray-900 py-12 md:py-20 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Profil</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12">
          <div className="w-full lg:w-1/2">
            <div className="mb-8 md:mb-12">
              <h3 className="text-yellow-400 text-lg md:text-xl lg:text-2xl font-bold mb-4">Visi</h3>
              <p className="text-white text-sm md:text-base leading-relaxed">
                {profile?.Visi?.[0]?.Text}
              </p>
            </div>

            <div>
              <h3 className="text-yellow-400 text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6">Misi</h3>
              <div className="space-y-3 md:space-y-4">
                {profile?.Misi?.map((misi, index) => (
                  <div className="flex items-start gap-3" key={misi.id}>
                    <span className="text-yellow-400 font-bold text-sm md:text-base mt-1 flex-shrink-0">
                      {index + 1}.
                    </span>
                    <p className="text-white text-sm md:text-base leading-relaxed">{misi.Text.replace(/^\d+\.\s*/, "")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-video">
              <iframe
                src="https://www.youtube.com/embed/XRNIGXZH1f0?si=FJvDxsP6B6JUIMz"
                title="Profil STTP"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
