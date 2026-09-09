import { getVolcanoStatus } from "@/lib/api";
import ThematicMap from "@/components/map/ThematicMap";

export const dynamic = 'force-dynamic';

export default async function PetaTematikPage() {
  const volcanos = await getVolcanoStatus();

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-[#020813] text-slate-200">
      
      {/* Top Banner / Explanation */}
      <div className="bg-[#0B192C]/80 border-b border-white/5 py-4 px-6 z-10 shrink-0 shadow-lg">
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 flex items-center gap-2">
          Peta Tematik: Sebaran Abu Vulkanik
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-4xl">
          Visualisasi arah dan jarak perkiraan sebaran abu vulkanik dari gunung api yang berstatus Siaga/Awas di seluruh Indonesia berdasarkan arah angin terkini.
        </p>
      </div>

      {/* Map Area */}
      <div className="flex-grow relative z-0">
        <ThematicMap volcanos={volcanos} />
      </div>
    </div>
  );
}
