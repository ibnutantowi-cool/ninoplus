import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function TentangProgram() {
  const allNews = await db.getNews();
  const news = allNews
    .filter((n: any) => n.status === "Publish")
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const settings = await db.getSettings();
  const youtubeId = settings?.youtubeId || "dQw4w9WgXcQ";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Top Banner (Navy) */}
      <div className="bg-gradient-to-br from-[#061123] via-[#0B192C] to-[#0f2442] py-20 relative overflow-hidden z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#7367F0]/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#7367F0]/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 font-bold tracking-widest text-xs mb-6 shadow-sm uppercase backdrop-blur-sm">
            Pusat Informasi
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase drop-shadow-lg">
            Berita Terkini
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            Dapatkan kabar terbaru, edukasi mitigasi bencana, dan informasi eksklusif seputar inovasi sistem pemantauan Nino Plus.
          </p>
        </div>
      </div>

      {/* Main Content (White/Light) */}
      <div className="flex-grow bg-slate-50 text-slate-800 py-16">
        <div className="container mx-auto px-2 md:px-4 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8">
            
            {/* Left Column: Blog (20%) */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-extrabold mb-6 text-slate-900 border-b-2 border-[#7367F0] pb-2 inline-block">Sorotan Blog</h2>
              <div className="space-y-4">
                {news.length > 0 ? news.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-xl shadow-sm border border-slate-200 p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    {item.imageUrl && (
                      <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-slate-100 border border-slate-100 relative shrink-0 flex items-center justify-center p-1">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                      </div>
                    )}
                    <Link href={`/berita/${item.id}`} className="text-slate-800 font-extrabold text-sm hover:text-[#7367F0] block leading-snug transition-colors mb-2">
                      {item.title}
                    </Link>
                    <div className="text-[10px] text-[#7367F0] font-bold tracking-widest uppercase mt-auto">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                )) : (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center text-xs text-slate-500 shadow-sm">
                    Belum ada berita.
                  </div>
                )}
              </div>
            </div>

            {/* Middle Column: YouTube (60%) */}
            <div className="lg:col-span-6">
              <h2 className="text-xl font-extrabold mb-6 text-slate-900 border-b-2 border-red-500 pb-2 inline-block">Video Pilihan Utama</h2>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-black aspect-video relative group w-full">
                <iframe 
                  className="w-full h-full absolute top-0 left-0"
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-extrabold text-lg text-slate-800 mb-2">Nino+ By CSR PIK2</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  NINO+ hadir sebagai platform digital dan gerakan ketahanan iklim yang dirancang khusus guna membantu wilayah pesisir beradaptasi terhadap krisis kekeringan ekstrem.
                </p>
              </div>
            </div>

            {/* Right Column: Social Media (20%) */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-extrabold mb-6 text-slate-900 border-b-2 border-indigo-500 pb-2 inline-block">Sosial Media</h2>
              
              <div className="space-y-4">
                <a href="https://www.instagram.com/csrpik2?stkn=cHU1MWZyMzRiMzV2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-pink-300 transition-all group">
                  <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform text-xs">IG</div>
                  <div>
                    <div className="font-bold text-sm text-slate-800 group-hover:text-pink-600 transition-colors">Instagram</div>
                    <div className="text-[10px] text-slate-500">@csrpik2</div>
                  </div>
                </a>

                <a href="https://m.youtube.com/channel/UCIOUR8TrdXmhvq7r_RZ_mog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-red-300 transition-all group">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform text-xs">YT</div>
                  <div>
                    <div className="font-bold text-sm text-slate-800 group-hover:text-red-600 transition-colors">YouTube</div>
                    <div className="text-[10px] text-slate-500">CSR PIK2</div>
                  </div>
                </a>

                <a href="https://www.tiktok.com/@csrpik2?_r=1&_t=ZS-99ZcSllWSAe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-400 transition-all group">
                  <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center font-bold text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform text-xs">TK</div>
                  <div>
                    <div className="font-bold text-sm text-slate-800 group-hover:text-black transition-colors">TikTok</div>
                    <div className="text-[10px] text-slate-500">@csrpik2</div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Footer (Navy) */}
      <div className="bg-[#061123] text-slate-500 py-12 text-center text-sm border-t border-white/5">
        &copy; 2026 Nino Plus System - Didukung oleh CSR PIK2.
      </div>
    </div>
  );
}
