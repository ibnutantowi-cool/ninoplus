import { Share2, ArrowRight } from "lucide-react";

export default function PublicNews() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0B192C]">Info & Berita</h1>
          <p className="text-gray-600 mt-2">Pembaruan terkini seputar iklim, bencana, dan edukasi mitigasi.</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Semua', 'El Niño', 'Gempa', 'Gunung Api', 'Maritim', 'Edukasi'].map(cat => (
            <button key={cat} className="px-4 py-1.5 rounded-full border border-gray-300 text-sm hover:border-[#0B192C] hover:bg-slate-50 whitespace-nowrap transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* News Card 1 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
          <div className="h-48 bg-slate-200 flex items-center justify-center">
            <span className="text-gray-400">Gambar Banner Berita</span>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-3">
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-medium">Gempa</span>
              <span className="text-xs text-gray-500">2 Hari lalu</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#0B192C]">Peringatan Dini Gempa Megathrust Selatan Jawa</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">BMKG merilis skenario pemodelan potensi gempa megathrust yang mengimbau masyarakat pesisir untuk mempersiapkan jalur evakuasi...</p>
            
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
              <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                Baca Selengkapnya <ArrowRight className="w-4 h-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700" title="Bagikan">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* News Card 2 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
          <div className="h-48 bg-slate-200 flex items-center justify-center">
            <span className="text-gray-400">Gambar Banner Berita</span>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-3">
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded font-medium">El Niño</span>
              <span className="text-xs text-gray-500">4 Hari lalu</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#0B192C]">Transisi La Niña Diprediksi Terjadi Bulan Depan</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">Indeks Nino 3.4 terus menunjukkan tren penurunan. Analis iklim BMKG dan NOAA memprediksi peningkatan curah hujan...</p>
            
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
              <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                Baca Selengkapnya <ArrowRight className="w-4 h-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700" title="Bagikan">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Box */}
      <div className="mt-12 bg-[#0B192C] rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold text-cyan-400 mb-2">Dapatkan Peringatan Cepat</h3>
          <p className="text-slate-300 text-sm">Daftarkan email atau nomor WhatsApp Anda untuk menerima notifikasi otomatis saat terjadi bencana atau pembaruan status cuaca ekstrem.</p>
        </div>
        <div className="md:w-1/2 w-full flex gap-2">
          <input type="text" placeholder="Email / Nomor WhatsApp" className="w-full px-4 py-2 rounded-md text-gray-800 outline-none focus:ring-2 focus:ring-cyan-500" />
          <button className="bg-cyan-600 hover:bg-cyan-500 px-6 py-2 rounded-md font-medium transition-colors whitespace-nowrap">
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}
