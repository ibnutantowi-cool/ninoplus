import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function BeritaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const berita = await db.getNewsById(id);

  if (!berita) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Banner (Navy) */}
      <div className="bg-gradient-to-br from-[#061123] via-[#0B192C] to-[#0f2442] pt-24 pb-32 relative overflow-hidden z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="container mx-auto px-4">
          <Link href="/tentang" className="inline-flex items-center gap-2 text-[#7367F0] font-bold hover:text-[#7367F0] transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Pusat Informasi
          </Link>
          <div className="text-xs font-bold text-[#7367F0] uppercase tracking-widest mb-4 bg-white/10 inline-block px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
            {berita.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-4xl drop-shadow-md">
            {berita.title}
          </h1>
        </div>
      </div>

      {/* Main Content (White) */}
      <div className="flex-grow bg-slate-50 text-slate-800 pb-20 -mt-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            
            {berita.imageUrl && (
              <div className="w-full relative bg-slate-100 flex justify-center border-b border-slate-200">
                <img 
                  src={berita.imageUrl} 
                  alt={berita.title}
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>
            )}
            
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-10 pb-10 border-b border-slate-100">
                <Clock className="w-5 h-5 text-[#7367F0]" />
                Dipublikasikan pada {new Date(berita.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>

              <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                {berita.content}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer (Navy) */}
      <div className="bg-[#061123] text-slate-500 py-12 text-center text-sm border-t border-white/5 mt-auto">
        &copy; 2026 Nino Plus System - Didukung oleh CSR PIK2.
      </div>
    </div>
  );
}
