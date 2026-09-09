import { AlertTriangle, Activity, Clock } from "lucide-react";
import { EarthquakeData } from "@/lib/api";

export function EarthquakeWidget({ 
  data, 
  history, 
  onEarthquakeClick 
}: { 
  data: EarthquakeData | null, 
  history: EarthquakeData[],
  onEarthquakeClick?: (gempa: EarthquakeData, id: string) => void
}) {
  if (!data) return null;

  return (
    <div className="bg-[#0A1628]/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/5 flex flex-col max-h-[400px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-red-500/20 rounded-xl">
          <Activity className="text-red-400 h-5 w-5" />
        </div>
        <h3 className="font-bold text-slate-200">Gempa Bumi (M &ge; 5.0)</h3>
      </div>
      
      {/* Latest Earthquake */}
      <div className="mb-4">
        <div 
          className="p-4 bg-gradient-to-br from-[#1A0B12] to-[#2B0E14] border border-red-500/20 rounded-2xl text-sm relative overflow-hidden shadow-inner cursor-pointer hover:border-red-500/40 transition-colors"
          onClick={() => onEarthquakeClick && onEarthquakeClick(data, data.DateTime)}
        >
          <div className="absolute top-0 right-0 bg-red-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-[0_0_10px_rgba(239,68,68,0.6)]">TERKINI</div>
          <div className="font-extrabold text-red-400 text-xl mb-1 drop-shadow-sm">M {data.Magnitude}</div>
          <div className="font-medium text-slate-200 leading-tight mb-2">{data.Wilayah}</div>
          <div className="text-slate-400 text-xs flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3" /> {data.Tanggal}, {data.Jam}
          </div>
          <div className="text-xs text-slate-400">Kedalaman: {data.Kedalaman}</div>
          <div className="text-[10px] mt-2 font-bold text-red-400 uppercase tracking-wider">{data.Potensi}</div>
        </div>
      </div>

      {/* History List */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-2 custom-scrollbar">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 sticky top-0 bg-[#0A1628]/90 backdrop-blur pb-2 pt-1 z-10 border-b border-white/5">Riwayat Sebelumnya</h4>
        {history
          .filter(gempa => gempa.DateTime !== data.DateTime) // Mencegah duplikasi jika data terkini masuk di riwayat
          .slice(0, 25)
          .map((gempa, idx) => (
          <div 
            key={idx} 
            className="flex gap-3 p-3 hover:bg-white/5 rounded-xl border border-transparent transition-colors cursor-pointer group"
            onClick={() => onEarthquakeClick && onEarthquakeClick(gempa, gempa.DateTime)}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 text-orange-400 font-bold flex items-center justify-center text-sm group-hover:bg-orange-500/20 group-hover:scale-105 transition-all shadow-[0_0_8px_rgba(249,115,22,0.1)]">
              {gempa.Magnitude}
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium text-slate-300 line-clamp-1 group-hover:text-cyan-300 transition-colors">{gempa.Wilayah}</div>
              <div className="text-[10px] text-slate-500">{gempa.Tanggal}, {gempa.Jam}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VolcanoWidget({ 
  volcanos, 
  onVolcanoClick 
}: { 
  volcanos: any[],
  onVolcanoClick?: (volcano: any, id: string) => void
}) {
  return (
    <div className="bg-[#0A1628]/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/5">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-orange-500/20 rounded-xl">
          <AlertTriangle className="text-orange-400 h-5 w-5" />
        </div>
        <h3 className="font-bold text-slate-200">Aktivitas Gunung Api</h3>
      </div>
      <div className="space-y-3">
        {volcanos.map((v) => (
          <div 
            key={v.id} 
            className="flex items-center justify-between p-3 bg-[#020813]/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors group cursor-pointer"
            onClick={() => onVolcanoClick && onVolcanoClick(v, v.name)}
          >
            <div>
              <div className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">{v.name}</div>
              <div className="text-xs text-slate-500">{v.location}</div>
            </div>
            <span className={`text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-bold shadow-md ${v.level === 4 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]'}`}>
              {v.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
