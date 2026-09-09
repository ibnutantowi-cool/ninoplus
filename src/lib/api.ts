export interface EarthquakeData {
  Tanggal: string;
  Jam: string;
  DateTime: string;
  Coordinates: string;
  Lintang: string;
  Bujur: string;
  Magnitude: string;
  Kedalaman: string;
  Wilayah: string;
  Potensi: string;
  Dirasakan?: string;
  Shakemap?: string;
}

export async function getLatestEarthquake(): Promise<EarthquakeData | null> {
  try {
    const res = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json', { cache: 'no-store' });
    const data = await res.json();
    return data.Infogempa.gempa;
  } catch (error) {
    console.error("Failed to fetch latest earthquake", error);
    return null;
  }
}

export async function getRecentEarthquakes(): Promise<EarthquakeData[]> {
  try {
    // Ambil Gempa Terkini (M >= 5.0)
    const resTerkini = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json', { cache: 'no-store' });
    const dataTerkini = await resTerkini.json();
    let gempas: any[] = dataTerkini.Infogempa?.gempa || [];

    // Ambil Gempa Dirasakan (Berbagai Magnitudo kecil) untuk Realtime
    try {
      const resDirasakan = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json', { cache: 'no-store' });
      const dataDirasakan = await resDirasakan.json();
      const dirasakanList = dataDirasakan.Infogempa?.gempa || [];
      
      // Standarisasi field Potensi dari Dirasakan
      const formattedDirasakan = dirasakanList.map((g: any) => ({
        ...g,
        Potensi: g.Potensi || `Dirasakan: ${g.Dirasakan}`
      }));
      
      gempas = [...gempas, ...formattedDirasakan];
    } catch (e) {
      console.warn("Could not fetch gempa dirasakan", e);
    }

    // Hilangkan Duplikat berdasarkan DateTime
    const uniqueGempas = Array.from(new Map(gempas.map(item => [item.DateTime, item])).values());
    
    // Urutkan dari yang paling baru
    uniqueGempas.sort((a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime());

    return uniqueGempas;
  } catch (error) {
    console.error("Failed to fetch recent earthquakes", error);
    return [];
  }
}

// Dummy/Fallback function untuk API lain jika endpoint asli memerlukan API Key khusus
export async function getVolcanoStatus() {
  // Simulasi data status gunung api Indonesia
  return [
    {
      id: "v1",
      name: "G. Lewotobi Laki-laki",
      location: "Flores Timur, NTT",
      status: "AWAS",
      level: 4,
      latitude: -8.54,
      longitude: 122.77,
      ashPlume: { direction: 270, distanceKm: 45, spreadAngle: 40 } // Angin ke Barat
    },
    {
      id: "v2",
      name: "G. Ibu",
      location: "Halmahera Barat, Maluku Utara",
      status: "AWAS",
      level: 4,
      latitude: 1.488,
      longitude: 127.63,
      ashPlume: { direction: 45, distanceKm: 30, spreadAngle: 35 } // Angin ke Timur Laut
    },
    {
      id: "v3",
      name: "G. Marapi",
      location: "Agam/Batusangkar, Sumatera Barat",
      status: "SIAGA",
      level: 3,
      latitude: -0.381,
      longitude: 100.473,
      ashPlume: { direction: 135, distanceKm: 20, spreadAngle: 30 } // Angin ke Tenggara
    },
    {
      id: "v4",
      name: "G. Ili Lewotolok",
      location: "Lembata, NTT",
      status: "SIAGA",
      level: 3,
      latitude: -8.272,
      longitude: 123.505,
      ashPlume: { direction: 315, distanceKm: 25, spreadAngle: 25 } // Angin ke Barat Laut
    },
    {
      id: "v5",
      name: "G. Merapi",
      location: "Sleman, DI Yogyakarta",
      status: "SIAGA",
      level: 3,
      latitude: -7.54,
      longitude: 110.44
    },
    {
      id: "v6",
      name: "G. Semeru",
      location: "Lumajang, Jawa Timur",
      status: "SIAGA",
      level: 3,
      latitude: -8.108,
      longitude: 112.92,
      ashPlume: { direction: 180, distanceKm: 15, spreadAngle: 20 } // Angin ke Selatan
    },
    {
      id: "v7",
      name: "G. Ruang",
      location: "Sitaro, Sulawesi Utara",
      status: "SIAGA",
      level: 3,
      latitude: 2.30,
      longitude: 125.37
    },
    {
      id: "v8",
      name: "G. Anak Krakatau",
      location: "Selat Sunda, Lampung",
      status: "SIAGA",
      level: 3,
      latitude: -6.102,
      longitude: 105.423,
      ashPlume: { direction: 90, distanceKm: 35, spreadAngle: 45 } // Angin ke Timur
    },
    {
      id: "v9",
      name: "G. Karangetang",
      location: "Sitaro, Sulawesi Utara",
      status: "SIAGA",
      level: 3,
      latitude: 2.78,
      longitude: 125.40
    },
    {
      id: "v10",
      name: "G. Dukono",
      location: "Halmahera Utara, Maluku Utara",
      status: "SIAGA",
      level: 3,
      latitude: 1.68,
      longitude: 127.89,
      ashPlume: { direction: 225, distanceKm: 50, spreadAngle: 40 } // Angin ke Barat Daya
    },
    {
      id: "v11",
      name: "G. Awu",
      location: "Sangihe, Sulawesi Utara",
      status: "SIAGA",
      level: 3,
      latitude: 3.67,
      longitude: 125.45
    }
  ];
}

export async function getTideStatus() {
  // Simulasi data pasang surut pesisir utara Kab. Tangerang, Banten
  return [
    { id: 1, port: 'Pesisir Tanjung Kait', height: '0.9m', trend: 'Naik' },
    { id: 2, port: 'Pelabuhan Mauk', height: '1.1m', trend: 'Puncak Pasang' },
    { id: 3, port: 'Pesisir Kronjo', height: '0.6m', trend: 'Surut' },
  ];
}

export async function getWeatherStatus() {
  // Simulasi data cuaca BMKG untuk wilayah Kabupaten Tangerang, Banten
  return {
    location: 'Kab. Tangerang, Banten',
    temperature: '32°C',
    condition: 'Cerah Berawan',
    humidity: '75%',
    wind: '12 km/jam Tenggara',
    icon: 'partly-cloudy' // indikator untuk UI
  };
}
