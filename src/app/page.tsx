import Link from 'next/link';
import { ShieldAlert, Map, LineChart, Server, Newspaper, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  const allNews = await db.getNews();
  const latestNews = allNews
    .filter((n: any) => n.status === "Publish")
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  return (
    <div className="flex-grow flex flex-col relative z-10 w-full overflow-hidden">
      
      {/* Top Section: White Background */}
      <section className="w-full bg-white text-slate-800 py-20 md:py-28 px-4 relative border-b border-slate-200 shadow-sm">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-50 border border-cyan-200 text-[#7367F0] font-bold tracking-wide text-sm mb-2 shadow-sm">
            <ShieldAlert size={18} /> Informasi & Kegiatan CSR PIK2
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            NINO+ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7367F0] to-[#5c52c0]">Solusi Terintegrasi</span> Mitigasi Dampak El Niño Pesisir
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            NINO+ hadir sebagai platform digital dan gerakan ketahanan iklim yang dirancang khusus guna membantu wilayah pesisir beradaptasi terhadap krisis kekeringan ekstrem.
          </p>
          
          <div className="pt-8 pb-4">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7367F0] to-[#5c52c0] hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-lg rounded-full shadow-[0_10px_25px_rgba(8,145,178,0.3)] hover:shadow-[0_15px_35px_rgba(8,145,178,0.4)] transition-all hover:-translate-y-1"
            >
              <Map size={24} /> Buka Dashboard Pemantauan
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Section: Navy Blue Background */}
      <section className="w-full bg-[#061123] text-slate-200 py-20 md:py-28 px-4 relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#7367F0]/10 text-[#7367F0] rounded-2xl mb-6 border border-[#7367F0]/20">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight max-w-4xl mx-auto">
              Monitoring Sarana Mitigasi Kekeringan
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Sistem pelacakan progres realisasi fasilitas air komunal secara berkala untuk masyarakat pesisir, mencakup:
            </p>
          </div>

          {/* Info Grid (4 Features) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left mb-20">
            
            {/* Card 1 */}
            <div className="bg-[#0B192C]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-[#7367F0]/40 hover:bg-[#0f2442] hover:shadow-[0_10px_30px_rgba(115,103,240,0.15)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">10 Instalasi</h3>
              <div className="text-[#7367F0] font-semibold mb-4 text-sm tracking-wide uppercase">Sistem Air Siap Minum</div>
              <p className="text-slate-400 leading-relaxed text-sm mt-auto">
                (Clean Drinking Water System) Penyediaan akses air minum yang aman dan tersertifikasi untuk memenuhi kebutuhan harian masyarakat pesisir yang terdampak.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0B192C]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-[#7367F0]/40 hover:bg-[#0f2442] hover:shadow-[0_10px_30px_rgba(115,103,240,0.15)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-cyan-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">3 Instalasi</h3>
              <div className="text-cyan-400 font-semibold mb-4 text-sm tracking-wide uppercase">Fasilitas Air Bersih</div>
              <p className="text-slate-400 leading-relaxed text-sm mt-auto">
                (Clean Water System) Instalasi pengolahan dan sanitasi air bersih skala besar untuk keperluan MCK dan aktivitas domestik warga.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0B192C]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-[#7367F0]/40 hover:bg-[#0f2442] hover:shadow-[0_10px_30px_rgba(115,103,240,0.15)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7367F0]/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-16 h-16 bg-[#7367F0]/10 rounded-2xl flex items-center justify-center text-[#7367F0] mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-[#7367F0]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" ry="2"></rect><path d="M9 4v16"></path><path d="M15 4v16"></path><path d="M4 9h16"></path><path d="M4 15h16"></path></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">20 Titik</h3>
              <div className="text-[#7367F0] font-semibold mb-4 text-sm tracking-wide uppercase">Tandon Distribusi Air</div>
              <p className="text-slate-400 leading-relaxed text-sm mt-auto">
                Infrastruktur penyimpanan dan penampungan air strategis yang disebar merata di titik-titik krusial guna menjamin pemerataan distribusi.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0B192C]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-emerald-500/40 hover:bg-[#0f2442] hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Aplikasi</h3>
              <div className="text-emerald-400 font-semibold mb-4 text-sm tracking-wide uppercase">Nino+</div>
              <p className="text-slate-400 leading-relaxed text-sm mt-auto">
                Ini merupakan aplikasi untuk request program CWS / CDWS dan Log Nelayan.
                <br /><br />
                <a href="https://ninoplus.online" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
                  Silahkan Klik <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </p>
            </div>

          </div>

          {/* News / Company Profile Preview Section */}
          {latestNews && (
            <div className="bg-gradient-to-br from-[#0B192C] to-[#020813] rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 text-[#7367F0] font-bold tracking-widest text-xs uppercase">
                  <Newspaper size={16} /> Kabar Terbaru
                </div>
                <h3 className="text-3xl font-bold text-white leading-tight line-clamp-2">{latestNews.title}</h3>
                <p className="text-slate-400 leading-relaxed line-clamp-4">
                  {latestNews.content}
                </p>
                <Link href={`/berita/${latestNews.id}`} className="inline-flex items-center gap-2 text-[#7367F0] font-bold hover:text-[#7367F0] transition-colors mt-2">
                  Baca Selengkapnya <ArrowRight size={18} />
                </Link>
              </div>
              <div className="md:w-1/2 w-full h-64 md:h-80 bg-[#0f2442] rounded-2xl border border-white/10 relative overflow-hidden group shadow-xl">
                {latestNews.imageUrl ? (
                  <img src={latestNews.imageUrl} alt={latestNews.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000')] bg-cover bg-center opacity-40 group-hover:opacity-70 transition-opacity duration-500 mix-blend-overlay"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white font-bold text-xl drop-shadow-md line-clamp-1">{latestNews.title}</div>
                  <div className="text-[#7367F0] text-sm mt-1 drop-shadow-md font-medium">Dipublikasikan: {new Date(latestNews.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
