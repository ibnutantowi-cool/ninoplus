"use client";

import { useState } from "react";
import MapView from "@/components/map/MapView";
import { EarthquakeWidget, VolcanoWidget } from "@/components/widgets/Widgets";
import { LineChart, Waves, CloudSun, Wind, Droplets } from "lucide-react";

export default function DashboardClient({
  earthquakeData,
  recentEarthquakes,
  volcanoData,
  tideData,
  weatherData
}: {
  earthquakeData: any;
  recentEarthquakes: any[];
  volcanoData: any[];
  tideData: any[];
  weatherData: any;
}) {
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, zoom: number, id: string} | null>(null);

  const handleEarthquakeClick = (gempa: any, id: string) => {
    const coords = gempa.Coordinates.split(',').map(Number);
    setSelectedLocation({ lat: coords[0], lng: coords[1], zoom: 8, id });
  };

  const handleVolcanoClick = (volcano: any, id: string) => {
    setSelectedLocation({ lat: volcano.latitude, lng: volcano.longitude, zoom: 10, id });
  };

  return (
    <>
      {/* Weather Header Widget */}
      <div className="mb-6 relative z-10">
        <div className="bg-[#0A1628]/80 backdrop-blur-xl p-4 md:p-5 rounded-3xl shadow-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-2xl">
              <CloudSun className="text-yellow-400 h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {weatherData.temperature} <span className="text-slate-400 text-sm font-normal">| {weatherData.condition}</span>
              </h2>
              <p className="text-cyan-400 text-sm font-medium">{weatherData.location}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Droplets className="text-blue-400 w-4 h-4" />
              <span className="text-slate-300 text-sm">{weatherData.humidity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="text-teal-400 w-4 h-4" />
              <span className="text-slate-300 text-sm">{weatherData.wind}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 lg:h-[calc(100vh-280px)] lg:min-h-[750px] relative z-10">
        {/* Main Map Area */}
        <div className="flex-grow xl:w-2/3 flex flex-col gap-4">
          <div className="bg-[#0A1628]/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-2xl border border-white/5 flex-grow relative z-0 flex flex-col min-h-[500px]">
            <h2 className="font-bold text-lg text-slate-200 mb-3 px-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse"></span>
              WebGIS Peta Bencana Indonesia
            </h2>
            <div className="flex-grow relative z-0 rounded-2xl overflow-hidden">
              <MapView 
                latestEarthquake={earthquakeData} 
                earthquakes={recentEarthquakes} 
                volcanos={volcanoData} 
                selectedLocation={selectedLocation}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="xl:w-1/3 flex flex-col gap-5 overflow-y-auto pr-2 pb-4 custom-scrollbar">
          <EarthquakeWidget 
            data={earthquakeData} 
            history={recentEarthquakes} 
            onEarthquakeClick={handleEarthquakeClick}
          />
          <VolcanoWidget 
            volcanos={volcanoData} 
            onVolcanoClick={handleVolcanoClick}
          />
          
          <div className="bg-[#0A1628]/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <LineChart className="text-cyan-400 h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-200">Indeks El Niño (ENSO)</h3>
            </div>
            <div className="h-32 bg-[#020813]/50 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl text-sm">
              <span className="font-bold text-cyan-400 text-lg">Nino 3.4: +0.2°C</span>
              <span className="text-xs mt-1 text-slate-400 uppercase tracking-widest font-bold">Kondisi Netral</span>
            </div>
          </div>

          <div className="bg-[#0A1628]/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-xl">
                <Waves className="text-cyan-400 h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-200">Pasang Surut Pelabuhan</h3>
            </div>
            <div className="text-sm space-y-3">
              {tideData.map((tide) => (
                <div key={tide.id} className="flex justify-between items-center bg-[#020813]/40 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <span className="font-medium text-slate-300">{tide.port}</span>
                  <span className="font-bold text-cyan-400 bg-cyan-900/30 px-2.5 py-1 rounded-md">{tide.height} ({tide.trend})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
