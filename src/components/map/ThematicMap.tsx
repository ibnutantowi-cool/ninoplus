"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamic imports to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const Polygon = dynamic(() => import("react-leaflet").then(mod => mod.Polygon), { ssr: false });

// Helper to calculate coordinates for ash plume
function calculatePlumePolygon(lat: number, lng: number, direction: number, distanceKm: number, spreadAngle: number) {
  // Rough approximation: 1 degree latitude ~ 111 km
  const kmPerDeg = 111;
  const distDeg = distanceKm / kmPerDeg;
  
  // Directions in Math functions: 0 is North, 90 is East
  // Convert direction to radians. 0 degrees = North (which is +y), 90 = East (+x)
  // Math.sin/cos standard: 0 is right (+x), so we adjust.
  const angleRad = (direction - 90) * (Math.PI / 180);
  const spreadRad = spreadAngle * (Math.PI / 180);

  const leftAngle = angleRad - (spreadRad / 2);
  const rightAngle = angleRad + (spreadRad / 2);

  const p1 = [lat, lng]; // Origin (volcano)
  
  // Note: we need to adjust longitude based on latitude (cos(lat)) but for small distances in Indonesia it's a fine approximation
  const latAdjust = Math.cos(lat * (Math.PI / 180));
  
  const p2 = [
    lat + (Math.sin(-leftAngle) * distDeg),
    lng + (Math.cos(leftAngle) * distDeg / latAdjust)
  ];
  
  const p3 = [
    lat + (Math.sin(-rightAngle) * distDeg),
    lng + (Math.cos(rightAngle) * distDeg / latAdjust)
  ];

  return [p1, p2, p3];
}

export default function ThematicMap({ volcanos }: { volcanos: any[] }) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Load Leaflet purely on client side for custom icons
    setL(require("leaflet"));
  }, []);

  if (!L) return <div className="w-full h-full bg-[#061123] animate-pulse"></div>;

  const awasVolcanoIcon = L.divIcon({
    html: '<div class="volcano-icon"></div>',
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 20]
  });

  const siagaVolcanoIcon = L.divIcon({
    html: '<div class="volcano-icon volcano-icon-siaga"></div>',
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 20]
  });

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={[-2.5, 118.0]} 
        zoom={5} 
        minZoom={4}
        style={{ height: "100%", width: "100%", zIndex: 0, background: "#061123" }}
      >
        <TileLayer
          className="dark-map-tiles"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render Gunung Api & Sebaran Abu */}
        {volcanos.map((v, idx) => {
          const hasPlume = v.ashPlume;
          const polygonCoords = hasPlume ? calculatePlumePolygon(v.latitude, v.longitude, v.ashPlume.direction, v.ashPlume.distanceKm, v.ashPlume.spreadAngle) : [];

          return (
            <div key={`volcano-group-${idx}`}>
              {/* Polygon Sebaran Abu */}
              {hasPlume && (
                <Polygon 
                  positions={polygonCoords as any} 
                  pathOptions={{ 
                    color: '#f97316',       // Orange border 
                    fillColor: '#a8a29e',   // Grayish brown fill
                    fillOpacity: 0.5, 
                    weight: 2,
                    dashArray: '5, 5'
                  }}
                >
                  <Popup>
                    <div className="text-xs font-bold text-slate-700">Arah Angin/Abu: {v.ashPlume.direction}&deg;</div>
                    <div className="text-xs text-slate-600">Jangkauan: {v.ashPlume.distanceKm} km</div>
                  </Popup>
                </Polygon>
              )}
              
              {/* Marker Gunung Api */}
              <Marker
                position={[v.latitude, v.longitude]}
                icon={v.level === 4 ? awasVolcanoIcon : siagaVolcanoIcon}
              >
                <Popup>
                  <div className="font-sans text-sm">
                    <div className="font-bold text-gray-800">{v.name}</div>
                    <div className="text-gray-600 text-xs mb-1">{v.location}</div>
                    <div className={`font-bold text-xs ${v.level === 4 ? 'text-red-600' : 'text-orange-600'}`}>
                      Status: {v.status} (Level {v.level})
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          )
        })}
      </MapContainer>
      
      {/* Legend Overlay */}
      <div className="absolute bottom-6 right-6 bg-[#0B192C]/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/10 z-[1000] text-xs pointer-events-none text-slate-200">
        <div className="font-bold mb-3 text-cyan-400 uppercase tracking-widest text-[10px]">Legenda Abu Vulkanik</div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-4 bg-[#64748b]/50 border border-[#94a3b8] border-dashed"></div>
            <span>Perkiraan Arah Sebaran Abu</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="volcano-legend"></div>
            <span>Gunung Api Awas</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="volcano-legend volcano-legend-siaga"></div>
            <span>Gunung Api Siaga</span>
          </div>
        </div>
      </div>
    </div>
  );
}
