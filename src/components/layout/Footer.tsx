"use client";

export default function Footer() {
  return (
    <footer className="bg-[#020813] text-slate-500 py-10 border-t border-white/5 mt-auto relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6 relative z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200 transition-colors shrink-0 hover:shadow-md">
          <div className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 relative group">
            <img src="/logos/ninologo.png" alt="NINO" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[9px] font-bold text-slate-700">NINO</span>'; }} />
          </div>
          <div className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 relative group">
            <img src="/logos/asg.png" alt="ASG" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[9px] font-bold text-slate-700">ASG</span>'; }} />
          </div>
          <div className="h-10 w-16 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1.5 relative group">
            <img src="/logos/csrpik2.png" alt="CSR PIK2" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[9px] font-bold text-slate-700">CSR PIK2</span>'; }} />
          </div>
          <div className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 relative group">
            <img src="/logos/cbd.png" alt="CBD" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[9px] font-bold text-slate-700">CBD</span>'; }} />
          </div>
        </div>
        
        <p className="max-w-2xl text-xs leading-relaxed text-slate-400">
          <strong className="text-slate-300">Nino Plus</strong> &mdash; Portal Pemantauan Bencana & Iklim Terintegrasi. <br/>
          Aplikasi ini didukung oleh CSR PIK2. Data terbuka bersumber resmi dari BMKG, PVMBG ESDM, dan NOAA.
        </p>
        
        <div className="text-[10px] text-slate-600 tracking-widest uppercase mt-4">
          &copy; {new Date().getFullYear()} Nino Plus Project
        </div>
      </div>
      
      {/* Footer Ambient */}
      <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-cyan-500/10 blur-[80px]"></div>
    </footer>
  );
}
