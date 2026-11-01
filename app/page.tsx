"use client";

import { useState } from "react";
import { 
  Search, MapPin, CloudRain, Sun, Cloud, CloudSun, 
  Loader2, Menu, Moon, Activity, SunDim, Shirt, Navigation, Umbrella, Wind, Droplets
} from "lucide-react";

// ==========================================
// 1. FUNGSI BACKGROUND IMAGE (SUASANA ADEM & AESTHETIC)
// ==========================================
const getBackgroundImage = (condition: string, isDark: boolean) => {
  const c = condition.toLowerCase();
  
  if (isDark) {
    if (c.includes("hujan")) return "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1500&auto=format&fit=crop"; // Hujan cozy di jendela
    if (c.includes("cerah") || c.includes("panas")) return "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1500&auto=format&fit=crop"; // Malam berbintang
    return "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=1500&auto=format&fit=crop"; // Awan malam yang tenang
  } else {
    if (c.includes("hujan")) return "https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=1500&auto=format&fit=crop"; // Hujan siang
    if (c.includes("panas") || c.includes("cerah")) return "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1500&auto=format&fit=crop"; // Langit biru cerah
    return "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=1500&auto=format&fit=crop"; // Awan putih empuk
  }
};

// ==========================================
// 2. DATABASE LOKAL & LOGIKA HUJAN
// ==========================================
const localDatabase: Record<string, any> = {
  "jakarta": { temp: 32, feelsLike: 35, condition: "Cerah Berawan", wind: 12, humidity: 75, uv: 8, aqi: 65, rainChance: 20, outfit: "Baju Tipis & Ringan", laundry: "Waktu tepat menjemur" },
  "bandung": { temp: 24, feelsLike: 26, condition: "Hujan Ringan", wind: 8, humidity: 85, uv: 3, aqi: 40, rainChance: 80, outfit: "Bawa Payung & Jaket", laundry: "Jangan jemur baju" },
  "bali": { temp: 30, feelsLike: 33, condition: "Cerah", wind: 15, humidity: 70, uv: 9, aqi: 30, rainChance: 10, outfit: "Baju Pantai & Kacamata", laundry: "Sangat aman untuk menjemur" },
  "surabaya": { temp: 34, feelsLike: 38, condition: "Panas Terik", wind: 10, humidity: 60, uv: 10, aqi: 80, rainChance: 0, outfit: "Baju Tipis & Topi", laundry: "Waktu tepat menjemur" },
  "lampung": { temp: 28, feelsLike: 30, condition: "Hujan Sedang", wind: 18, humidity: 90, uv: 2, aqi: 45, rainChance: 95, outfit: "Jas Hujan / Payung", laundry: "Jangan jemur baju" },
  "cikupa": { temp: 29, feelsLike: 31, condition: "Berawan Sebagian", wind: 14, humidity: 78, uv: 6, aqi: 50, rainChance: 40, outfit: "Baju Nyaman", laundry: "Aman untuk menjemur" },
  "default": { temp: 29, feelsLike: 31, condition: "Berawan Sebagian", wind: 14, humidity: 78, uv: 6, aqi: 50, rainChance: 40, outfit: "Baju Nyaman", laundry: "Aman untuk menjemur" }
};

const popularCities = ["Jakarta", "Bandung", "Bali", "Lampung"];

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const executeSearch = (searchCity: string) => {
    if (!searchCity) return;
    setLoading(true);
    setCity(searchCity);

    setTimeout(() => {
      const searchKey = searchCity.toLowerCase();
      const cityData = localDatabase[searchKey] || localDatabase["default"];
      
      const hourlyData = Array.from({length: 6}).map((_, i) => ({
        time: `${String(12+i).padStart(2, '0')}:00`,
        temp: cityData.temp + (Math.floor(Math.random() * 3) - 1),
        iconCode: cityData.condition.toLowerCase().includes("hujan") ? "cloud-rain" : "cloud-sun",
        rainChance: cityData.rainChance
      }));

      const dailyData = Array.from({length: 5}).map((_, i) => ({
        dayName: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"][(new Date().getDay() + i) % 7],
        maxTemp: cityData.temp + 2,
        minTemp: cityData.temp - 4,
        iconCode: i % 2 === 0 ? "cloud-sun" : "cloud-rain",
      }));

      setWeather({
        city: searchCity.charAt(0).toUpperCase() + searchCity.slice(1),
        current: cityData,
        hourly: hourlyData,
        daily: dailyData,
      });
      setLoading(false);
    }, 600);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(city);
  };

  const WeatherIcon = ({ code, className }: { code: string, className?: string }) => {
    if (code === "sun") return <Sun className={className} />;
    if (code === "cloud-sun") return <CloudSun className={className} />;
    if (code === "cloud-rain") return <CloudRain className={className} />;
    return <Cloud className={className} />;
  };

  const textColor = "text-white";
  const textMuted = "text-white/60";
  
  const glassPanel = "bg-white/5 border border-white/10 backdrop-blur-md shadow-lg";
  const glassHover = "hover:bg-white/10 transition-all duration-300";

  const currentCondition = weather ? weather.current.condition : "Cerah";
  const isRaining = weather?.current?.condition.toLowerCase().includes("hujan");

  return (
    <main 
      className="min-h-screen font-sans relative overflow-hidden transition-all duration-1000 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: `url('${getBackgroundImage(currentCondition, isDark)}')`,
        backgroundColor: '#0f172a' 
      }}
    >
      {/* Overlay Gelap */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-black/50' : 'bg-black/20'}`}></div>
      
      <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-8 max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setWeather(null)}>
            <CloudSun className="w-8 h-8 text-white" />
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Synoptic</span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full ${glassPanel} text-white`}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className={`p-2 rounded-full ${glassPanel} text-white`}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Cari kota..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-md transition-all shadow-md"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition">
            {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Navigation className="w-4 h-4 text-white" />}
          </button>
        </form>

        {/* KONDISI 1: DASHBOARD AWAL */}
        {!weather ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-white drop-shadow-md">Cuaca Hari Ini</h2>
              <p className="text-white/70 text-sm md:text-base">Pilih kota atau cari lokasimu</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
              {popularCities.map((cityName) => (
                <button 
                  key={cityName}
                  onClick={() => executeSearch(cityName)}
                  className={`${glassPanel} ${glassHover} rounded-2xl p-5 flex flex-col items-center`}
                >
                  <MapPin className="w-6 h-6 mb-3 text-white/70" />
                  <span className="font-semibold text-white">{cityName}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          
        /* KONDISI 2: DASHBOARD CUACA */
          <div className="flex-1 flex flex-col animate-in slide-in-from-bottom-8 duration-500">
            
            <div className="flex items-center gap-2 mb-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium drop-shadow-sm">{weather.city}, Indonesia</span>
            </div>

            {/* NOTIFIKASI HUJAN */}
            {isRaining && (
              <div className="mb-6 bg-blue-600/90 backdrop-blur-md border border-blue-400/50 rounded-2xl p-4 flex items-start gap-4 shadow-xl">
                <div className="bg-white/20 p-2 rounded-full mt-1">
                  <Umbrella className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base">Peringatan Hujan</h3>
                  <p className="text-white/90 text-xs md:text-sm mt-1">
                    Hujan diperkirakan akan turun dalam waktu dekat di {weather.city}. Siapkan payung atau jas hujan Anda.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col lg:flex-row justify-between gap-6">
              
              {/* KIRI: INFO UTAMA */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-7xl md:text-[110px] font-light leading-none text-white tracking-tighter drop-shadow-lg">
                      {weather.current.temp}°
                    </h1>
                    <p className="text-xl text-white/90 font-medium mt-2 drop-shadow-md">{weather.current.condition}</p>
                    <p className="text-sm text-white/60 mt-1">Terasa seperti {weather.current.feelsLike}°C</p>
                  </div>
                  <WeatherIcon code={isRaining ? "cloud-rain" : "cloud-sun"} className="w-20 h-20 md:w-28 md:h-28 text-white/80 drop-shadow-xl" />
                </div>

                {/* Kartu Info Kecil */}
                <div className="grid grid-cols-3 gap-3 mt-8">
                  <div className={`${glassPanel} rounded-2xl p-3 md:p-4 flex flex-col items-center text-center`}>
                    <Wind className="w-5 h-5 text-white/60 mb-2" />
                    <span className="text-lg font-semibold text-white">{weather.current.wind} <span className="text-xs font-normal text-white/50">km/j</span></span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Angin</span>
                  </div>
                  <div className={`${glassPanel} rounded-2xl p-3 md:p-4 flex flex-col items-center text-center`}>
                    <Droplets className="w-5 h-5 text-white/60 mb-2" />
                    <span className="text-lg font-semibold text-white">{weather.current.humidity}%</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Lembap</span>
                  </div>
                  <div className={`${glassPanel} rounded-2xl p-3 md:p-4 flex flex-col items-center text-center`}>
                    <Umbrella className="w-5 h-5 text-white/60 mb-2" />
                    <span className="text-lg font-semibold text-white">{weather.current.rainChance}%</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Hujan</span>
                  </div>
                </div>

                {/* Rekomendasi */}
                <div className={`mt-4 ${glassPanel} rounded-2xl p-4 flex items-center gap-4`}>
                  <div className="p-3 bg-white/10 rounded-full">
                    <Shirt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Rekomendasi</p>
                    <p className="text-sm font-medium text-white">{weather.current.outfit}</p>
                    <p className="text-xs text-white/60">{weather.current.laundry}</p>
                  </div>
                </div>
              </div>

              {/* KANAN: PRAKIRAAN JAM-JAMAN & HARIAN */}
              <div className="w-full lg:w-[380px] flex flex-col gap-4">
                
                <div className={`${glassPanel} rounded-3xl p-4`}>
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-2">Prakiraan Jam</h3>
                  <div className="flex flex-col gap-1">
                    {weather.hourly.slice(0, 4).map((hour: any, i: number) => (
                      <div key={i} className="flex items-center justify-between px-2 py-2 hover:bg-white/5 rounded-lg transition">
                        <span className="text-sm text-white/80 w-12">{hour.time}</span>
                        <WeatherIcon code={hour.iconCode} className="w-5 h-5 text-white/70" />
                        <span className="text-sm text-blue-300 w-12 text-right">{hour.rainChance}%</span>
                        <span className="text-sm font-semibold text-white w-8 text-right">{hour.temp}°</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${glassPanel} rounded-3xl p-4`}>
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-2">Prakiraan 5 Hari</h3>
                  <div className="flex flex-col gap-1">
                    {weather.daily.map((day: any, i: number) => (
                      <div key={i} className="flex items-center justify-between px-2 py-2">
                        <span className="text-sm text-white/80 w-10">{day.dayName}</span>
                        <WeatherIcon code={day.iconCode} className="w-5 h-5 text-white/70" />
                        <div className="flex gap-3 text-sm w-16 justify-end">
                          <span className="text-white/50">{day.minTemp}°</span>
                          <span className="text-white font-semibold">{day.maxTemp}°</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}