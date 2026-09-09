"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamic imports to prevent SSR window issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// For useMap, we can just define a separate client-only component or import it inside
function MapController({ selectedLocation }: { selectedLocation: {lat: number, lng: number, zoom: number, id: string} | null }) {
  // We can require react-leaflet here safely because this component is only rendered inside MapContainer (client side)
  const { useMap } = require("react-leaflet");
  const map = useMap();
  
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], selectedLocation.zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [selectedLocation, map]);

  return null;
}

export default function MapView({ 
  latestEarthquake, 
  earthquakes, 
  volcanos,
  selectedLocation
}: { 
  latestEarthquake: any,
  earthquakes: any[], 
  volcanos: any[],
  selectedLocation?: {lat: number, lng: number, zoom: number, id: string} | null
}) {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const leaflet = require('leaflet');
      setL(leaflet);
    }
  }, []);

  if (!mounted || !L) return <div className="w-full h-[400px] lg:h-full bg-[#061123] animate-pulse flex items-center justify-center rounded-2xl text-slate-500">Memuat Peta...</div>;

  // Fokus batas peta wilayah Indonesia
  const bounds: any = [
    [-11.0, 94.0], // Barat Daya
    [6.0, 141.0]   // Timur Laut
  ];

  // Custom Icons
  const latestQuakeIcon = L.divIcon({
    html: '<div class="pulse-icon-red" style="width: 100%; height: 100%;"></div>',
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const historyQuakeIcon = L.divIcon({
    html: '<div class="pulse-icon-orange" style="width: 100%; height: 100%;"></div>',
    className: '',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

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

  // Mencegah duplikasi: filter gempa dari riwayat jika DateTime sama dengan gempa terkini
  const historyFiltered = earthquakes.filter(g => g.DateTime !== latestEarthquake?.DateTime);

  return (
    <div className="w-full h-[450px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl relative z-0 bg-[#061123] border border-white/5 ring-1 ring-white/10">
      <MapContainer 
        center={[-2.5, 118.0]} 
        zoom={5} 
        minZoom={4}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%", zIndex: 0, background: "#061123" }}
      >
        <MapController selectedLocation={selectedLocation as any} />
        <TileLayer
          className="dark-map-tiles"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render Gempa Terkini */}
        {latestEarthquake && (
          <Marker 
            position={latestEarthquake.Coordinates.split(',').map(Number)}
            icon={latestQuakeIcon}
          >
            <Popup>
              <div className="font-sans text-sm">
                <div className="font-bold text-gray-800">Mag {latestEarthquake.Magnitude} (TERKINI)</div>
                <div className="text-gray-600 text-xs mb-1">{latestEarthquake.Tanggal}, {latestEarthquake.Jam}</div>
                <div className="font-medium text-xs">{latestEarthquake.Wilayah}</div>
                <div className="text-xs text-gray-500 mt-1">Kedalaman: {latestEarthquake.Kedalaman}</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Render Riwayat Gempa (Orange) */}
        {historyFiltered.map((gempa, idx) => {
          const coords = gempa.Coordinates.split(',').map(Number);
          return (
            <Marker 
              key={`eq-hist-${idx}`} 
              position={[coords[0], coords[1]]}
              icon={historyQuakeIcon}
            >
              <Popup>
                <div className="font-sans text-sm">
                  <div className="font-bold text-gray-800">Mag {gempa.Magnitude}</div>
                  <div className="text-gray-600 text-xs mb-1">{gempa.Tanggal}, {gempa.Jam}</div>
                  <div className="font-medium text-xs">{gempa.Wilayah}</div>
                  <div className="text-xs text-gray-500 mt-1">Kedalaman: {gempa.Kedalaman}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Render Gunung Api */}
        {volcanos.map((v, idx) => {
          return (
            <Marker
              key={`volcano-${idx}`}
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
          )
        })}

      </MapContainer>
      
      {/* Legend Overlay */}
      <div className="absolute bottom-4 right-4 bg-[#0B192C]/80 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-white/10 z-[1000] text-[10px] sm:text-xs pointer-events-none text-slate-200">
        <div className="font-bold mb-2 text-cyan-400 uppercase tracking-widest text-[9px]">Legenda (Indonesia)</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
            <span>Gempa Terkini</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_5px_rgba(245,158,11,0.6)]"></span>
            <span>Riwayat Gempa M&ge;5</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
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
