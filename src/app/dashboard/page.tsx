import { getLatestEarthquake, getRecentEarthquakes, getVolcanoStatus, getTideStatus, getWeatherStatus } from "@/lib/api";
import DashboardClient from "@/components/DashboardClient";

export const dynamic = 'force-dynamic'; // Selalu muat data terbaru tanpa cache
export const revalidate = 0; 

export default async function Home() {
  const earthquakeData = await getLatestEarthquake();
  const recentEarthquakes = await getRecentEarthquakes();
  const volcanoData = await getVolcanoStatus();
  const tideData = await getTideStatus();
  const weatherData = await getWeatherStatus();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4 relative z-10">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 tracking-tight drop-shadow-md">
            Pusat Pantau Bencana
          </h1>
          <p className="text-cyan-100/60 mt-1 font-medium tracking-wide">Pemantauan iklim, geologi, dan cuaca terintegrasi waktu nyata.</p>
        </div>
      </div>

      <DashboardClient 
        earthquakeData={earthquakeData} 
        recentEarthquakes={recentEarthquakes} 
        volcanoData={volcanoData} 
        tideData={tideData} 
        weatherData={weatherData}
      />
    </div>
  );
}
