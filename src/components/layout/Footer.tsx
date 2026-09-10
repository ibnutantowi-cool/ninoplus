"use client";

export default function Footer() {
  return (
    <footer className="bg-[#020813] text-slate-500 py-10 border-t border-white/5 mt-auto relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6 relative z-10">
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 hover:shadow-sm transition-all bg-white/5 px-6 py-3 rounded-xl border border-white/10">
          <div className="h-8 sm:h-12 flex items-center justify-center shrink-0 relative group">
            <img src="/logos/logo1.png" alt="NINO" className="h-full w-auto object-contain brightness-90 hover:brightness-110 transition-all" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] font-bold text-slate-400">NINO</span>'; }} />
          </div>
          <div className="h-8 sm:h-12 flex items-center justify-center shrink-0 relative group">
            <img src="/logos/asg.png" alt="ASG" className="h-full w-auto object-contain brightness-90 hover:brightness-110 transition-all" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] font-bold text-slate-400">ASG</span>'; }} />
          </div>
          <div className="h-8 sm:h-12 flex items-center justify-center shrink-0 relative group">
            <img src="/logos/csrpik2.png" alt="CSR PIK2" className="h-full w-auto object-contain brightness-90 hover:brightness-110 transition-all" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] font-bold text-slate-400">CSR PIK2</span>'; }} />
          </div>
          <div className="h-8 sm:h-12 flex items-center justify-center shrink-0 relative group">
            <img src="/logos/cbd.png" alt="CBD" className="h-full w-auto object-contain brightness-90 hover:brightness-110 transition-all" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] font-bold text-slate-400">CBD</span>'; }} />
          </div>
          <div className="h-8 sm:h-12 flex items-center justify-center shrink-0 relative group">
            <img src="/logos/logonino.png" alt="Logo 5" className="h-full w-auto object-contain brightness-90 hover:brightness-110 transition-all" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] font-bold text-slate-400">LOGO 5</span>'; }} />
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
