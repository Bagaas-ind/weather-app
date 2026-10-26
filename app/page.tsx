"use client";

import { useState } from "react";
import { 
  Search, MapPin, Wind, Droplets, CloudRain, Sun, Cloud, CloudSun, 
  Loader2, Menu, Moon, Activity, SunDim, Shirt
} from "lucide-react";

// ==========================================
// 1. KAMUS GAMBAR SPESIFIK PER DAERAH
// ==========================================
// ==========================================
// 1. KAMUS GAMBAR SPESIFIK PER DAERAH
// ==========================================
const specificBackgrounds: Record<string, string> = {
  "jakarta": "https://images.unsplash.com/photo-1555899434-94d1368aa7af?q=80&w=2000&auto=format&fit=crop",
  "surabaya": "https://images.unsplash.com/photo-1577706881850-51d6eb4d5a3c?q=80&w=2000&auto=format&fit=crop",
  "bandung": "https://images.unsplash.com/photo-1596711703308-916e6c681b2c?q=80&w=2000&auto=format&fit=crop",
  "yogyakarta": "https://images.unsplash.com/photo-1598911725182-208e32652129?q=80&w=2000&auto=format&fit=crop",
  "medan": "https://images.unsplash.com/photo-1590424255418-89abdd3e5853?q=80&w=2000&auto=format&fit=crop",
  "bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
  "lampung": "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c8c8?q=80&w=2000&auto=format&fit=crop",
  // TAMBAHAN KOTA BARU
  "tangerang": "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?q=80&w=2000&auto=format&fit=crop", // Gambar Cityscape
  "bekasi": "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?q=80&w=2000&auto=format&fit=crop",
  "depok": "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2000&auto=format&fit=crop",
};

// ==========================================
// 2. FUNGSI MENGAMBIL BACKGROUND (DIPERBAIKI)
// ==========================================
const getDynamicBackground = (cityName: string) => {
  const loc = cityName.toLowerCase();
  
  // 1. Cek kamus
  const foundKey = Object.keys(specificBackgrounds).find(key => loc.includes(key));
  if (foundKey) return specificBackgrounds[foundKey];

  // 2. Jika tidak ada di kamus, cek apakah ini kota besar (Urban)
  const urbanKeywords = ["tangerang", "semarang", "makassar", "palembang", "malang", "bogor"];
  if (urbanKeywords.some(k => loc.includes(k))) {
    // Kasih gambar default perkotaan yang keren
    return "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?q=80&w=2000&auto=format&fit=crop"; 
  }
  
  // 3. Jika bukan kota besar, kasih gambar alam Nusantara
  return "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000&auto=format&fit=crop";
};

// ==========================================
// 2. DATABASE LOKAL (MOCK DATA) PENGGANTI API
// ==========================================
// Kamu bisa nambah kota lain di sini beserta datanya
const localDatabase: Record<string, any> = {
  "jakarta": {
    temp: 32, feelsLike: 35, condition: "Cerah Berawan", wind: 12, humidity: 75, uv: 8, aqi: 65,
    outfit: "Baju Tipis & Ringan", laundry: "Waktu tepat menjemur"
  },
  "bandung": {
    temp: 24, feelsLike: 26, condition: "Hujan Ringan", wind: 8, humidity: 85, uv: 3, aqi: 40,
    outfit: "Bawa Payung & Jaket", laundry: "Jangan jemur baju"
  },
  "bali": {
    temp: 30, feelsLike: 33, condition: "Cerah", wind: 15, humidity: 70, uv: 9, aqi: 30,
    outfit: "Baju Pantai & Kacamata", laundry: "Sangat aman untuk menjemur"
  },
  "surabaya": {
    temp: 34, feelsLike: 38, condition: "Panas Terik", wind: 10, humidity: 60, uv: 10, aqi: 80,
    outfit: "Baju Tipis & Topi", laundry: "Waktu tepat menjemur"
  },
  "default": {
    temp: 29, feelsLike: 31, condition: "Berawan Sebagian", wind: 14, humidity: 78, uv: 6, aqi: 50,
    outfit: "Baju Nyaman", laundry: "Aman untuk menjemur"
  }
};

const getWeatherInfo = (condition: string) => {
  const c = condition.toLowerCase();
  if (c.includes("hujan")) return { label: condition, icon: "cloud-rain" };
  if (c.includes("cerah")) return { label: condition, icon: "sun" };
  if (c.includes("berawan")) return { label: condition, icon: "cloud-sun" };
  return { label: condition, icon: "cloud" };
};


export default function WeatherApp() {
  const [city, setCity] = useState("Jakarta");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [bgImage, setBgImage] = useState(specificBackgrounds["jakarta"]);
  const [isDark, setIsDark] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);

    // Simulasi loading sebentar biar kerasa natural
    setTimeout(() => {
      const searchKey = city.toLowerCase();
      // Ambil dari database lokal, kalau nggak ada pakai default
      const cityData = localDatabase[searchKey] || localDatabase["default"];
      
      const weatherInfo = getWeatherInfo(cityData.condition);
      
      // Generate data per jam (dummy)
      const hourlyData = Array.from({length: 6}).map((_, i) => ({
        time: `${String(12+i).padStart(2, '0')}:00`,
        temp: cityData.temp + (Math.floor(Math.random() * 3) - 1), // Suhu variasi dikit
        iconCode: weatherInfo.icon
      }));

      // Generate data 5 hari (dummy)
      const dailyData = Array.from({length: 5}).map((_, i) => ({
        dayName: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"][(new Date().getDay() + i) % 7],
        maxTemp: cityData.temp + 2,
        minTemp: cityData.temp - 4,
        iconCode: i % 2 === 0 ? weatherInfo.icon : "cloud"
      }));

      setBgImage(getDynamicBackground(searchKey));
      setWeather({
        city: city.charAt(0).toUpperCase() + city.slice(1),
        current: cityData,
        hourly: hourlyData,
        daily: dailyData,
      });
      
      setLoading(false);
    }, 800); // Delay 0.8 detik
  };

  const WeatherIcon = ({ code, className }: { code: string, className?: string }) => {
    if (code === "sun") return <Sun className={className} />;
    if (code === "cloud-sun") return <CloudSun className={className} />;
    if (code === "cloud-rain") return <CloudRain className={className} />;
    return <Cloud className={className} />;
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-400 bg-green-400/20 border-green-400/30";
    if (aqi <= 100) return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30";
    return "text-red-400 bg-red-400/20 border-red-400/30";
  };

  const getUVStatus = (uv: number) => {
    if (uv <= 2) return { label: "Aman", color: "text-green-400" };
    if (uv <= 7) return { label: "Sedang", color: "text-yellow-400" };
    return { label: "Bahaya", color: "text-red-400" };
  };

  const textColor = isDark ? "text-white" : "text-blue-950";
  const textMuted = isDark ? "text-blue-200/70" : "text-blue-900/70";
  const glassPanel = isDark 
    ? "bg-[#0a192f]/60 border-[#1e3a8a]/50 shadow-[0_8px_32px_0_rgba(2,6,23,0.5)]" 
    : "bg-white/50 border-white/80 shadow-[0_8px_32px_0_rgba(56,189,248,0.15)]";
  const glassHover = isDark ? "hover:bg-[#0a192f]/80" : "hover:bg-white/70";

  return (
    <main 
      className={`min-h-screen bg-cover bg-center bg-no-repeat font-sans relative overflow-hidden transition-all duration-1000 ${textColor}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDark ? 'bg-gradient-to-r from-[#020813]/95 via-[#020813]/80 to-[#0a192f]/40' : 'bg-gradient-to-r from-sky-200/80 via-white/60 to-orange-100/30'
      }`}></div>
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDark ? 'bg-gradient-to-t from-[#020813]/90 via-transparent to-[#0a192f]/50' : 'bg-gradient-to-t from-white/80 via-transparent to-sky-100/30'
      }`}></div>

      <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-10 max-w-[1600px] mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-12 gap-4">
          <div className="flex justify-between w-full md:w-auto items-center">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 ${glassPanel} rounded-full flex items-center justify-center`}>
                <Cloud className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold tracking-widest uppercase">Synoptic</h1>
            </div>
            
            <div className="flex md:hidden items-center gap-3">
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full ${glassPanel} cursor-pointer`}>
                {isDark ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-blue-900" />}
              </button>
              <Menu className="w-6 h-6" />
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Cari kota (Jakarta, Bandung, Bali...)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full ${glassPanel} ${textColor} placeholder-current opacity-80 rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 ${
                isDark ? 'focus:ring-blue-500/50' : 'focus:ring-sky-400/50'
              } transition-all text-sm`}
            />
            <button type="submit" className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${glassHover}`}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </form>

          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <span className={textMuted}>EN / ID</span>
            <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full ${glassPanel} cursor-pointer`}>
              {isDark ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-blue-900" />}
            </button>
            <Menu className="w-6 h-6 cursor-pointer" />
          </div>
        </header>

        {weather ? (
          <div className="flex-1 flex flex-col lg:flex-row justify-between gap-6 md:gap-10">
            <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">{weather.city}, Indonesia</span>
              </div>
              
              <h2 className="text-4xl md:text-7xl font-semibold leading-tight mb-2 tracking-tight drop-shadow-lg">
                {weather.current.condition.includes("Hujan") ? "Badai" : "Cerah"} <br />
                dengan {weather.current.condition}
              </h2>
              
              <p className={`max-w-md mb-6 md:mb-8 text-sm md:text-base leading-relaxed ${textMuted} drop-shadow-md`}>
                Suhu terasa seperti {weather.current.feelsLike}°C. Kelembapan {weather.current.humidity}% dengan kecepatan angin {weather.current.wind} km/jam.
              </p>

              <div className={`flex items-center gap-6 md:gap-10 ${glassPanel} rounded-3xl p-4 overflow-x-auto w-full md:w-fit`}>
                {weather.hourly.map((hour: any, i: number) => (
                  <div key={i} className="flex flex-col items-center gap-2 min-w-[50px]">
                    <span className={`text-xs ${textMuted}`}>{hour.time}</span>
                    <WeatherIcon code={hour.iconCode} className={`w-6 h-6 ${isDark ? 'text-blue-200' : 'text-blue-600'}`} />
                    <span className="text-lg font-bold">{hour.temp}°</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[400px] flex flex-col gap-4">
              <div className={`${glassPanel} rounded-[2rem] p-6 flex flex-col items-end text-right`}>
                <p className={`text-sm mb-2 font-medium ${textMuted}`}>Suhu Saat Ini</p>
                <div className="flex items-start">
                  <span className="text-[80px] md:text-[90px] font-light leading-none tracking-tighter drop-shadow-md">
                    {weather.current.temp}
                  </span>
                  <span className="text-3xl mt-2">°C</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`${glassPanel} rounded-2xl p-4 flex flex-col justify-between`}>
                  <div className={`flex items-center gap-2 mb-2 ${textMuted}`}>
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-semibold">Kualitas Udara</span>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${getAQIColor(weather.current.aqi).split(' ')[0]}`}>{weather.current.aqi}</div>
                    <div className={`text-[10px] mt-1 px-2 py-0.5 rounded-full inline-block border ${getAQIColor(weather.current.aqi)}`}>
                      {weather.current.aqi <= 50 ? "Baik" : weather.current.aqi <= 100 ? "Sedang" : "Tidak Sehat"}
                    </div>
                  </div>
                </div>
                <div className={`${glassPanel} rounded-2xl p-4 flex flex-col justify-between`}>
                  <div className={`flex items-center gap-2 mb-2 ${textMuted}`}>
                    <SunDim className="w-4 h-4" />
                    <span className="text-xs font-semibold">Indeks UV</span>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${getUVStatus(weather.current.uv).color}`}>{weather.current.uv}</div>
                    <div className={`text-[10px] mt-1 ${getUVStatus(weather.current.uv).color}`}>
                      {getUVStatus(weather.current.uv).label}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${glassPanel} rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4`}>
                <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-sky-200 text-blue-700'}`}>
                   <Shirt className="w-6 h-6" />
                </div>
                <div>
                  <p className={`text-sm font-medium ${textMuted}`}>Rekomendasi Hari Ini</p>
                  <p className="font-semibold">{weather.current.outfit}</p>
                  <p className={`text-xs ${textMuted}`}>{weather.current.laundry}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
             <p className={`text-xl ${textMuted}`}>Silakan ketik nama kota (contoh: Jakarta, Bandung, Bali) lalu klik ikon pencarian.</p>
          </div>
        )}

        {weather && (
          <div className="mt-8 md:mt-12 animate-in slide-in-from-bottom-10 duration-1000">
            <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${textMuted}`}>Prakiraan 5 Hari</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {weather.daily.map((day: any, i: number) => (
                <div key={i} className={`${glassPanel} rounded-2xl p-4 md:p-5 flex flex-col items-center transition`}>
                  <span className={`text-xs md:text-sm mb-2 md:mb-3 font-medium ${textMuted}`}>{day.dayName}</span>
                  <WeatherIcon code={day.iconCode} className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 ${isDark ? 'text-blue-200' : 'text-blue-600'}`} />
                  <div className="flex gap-2 md:gap-3 text-xs md:text-sm">
                    <span className={textMuted}>{day.minTemp}°</span>
                    <span className="font-bold">{day.maxTemp}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}