"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Side: Branding & Logos */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <div className="flex flex-col">
              <Link href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 tracking-tight leading-none whitespace-nowrap">
                Nino+
              </Link>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mt-1 whitespace-nowrap">
                NATURE IS NOT OUR ENEMY
              </span>
            </div>
            
            {/* Logo Slots (Hidden on very small screens, visible on sm and up) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200 transition-colors shrink-0">
              <div className="h-8 w-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-0.5 relative group">
                <img src="/logos/ninologo.png" alt="NINO" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[8px] font-bold text-slate-700">BMKG</span>'; }} />
              </div>
              <div className="h-8 w-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-0.5 relative group">
                <img src="/logos/asg.png" alt="PVMBG" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[8px] font-bold text-slate-700">PVMBG</span>'; }} />
              </div>
              <div className="h-8 w-14 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 relative group">
                <img src="/logos/csrpik2.png" alt="PIK2" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[9px] font-bold text-slate-700">PIK2</span>'; }} />
              </div>
              <div className="h-8 w-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-0.5 relative group">
                <img src="/logos/cbd.png" alt="BNPB" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[8px] font-bold text-slate-700">BNPB</span>'; }} />
              </div>
            </div>
          </div>

          {/* Right Side: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 shrink-0">
            <Link href="/" className="text-slate-600 font-semibold hover:text-[#7367F0] transition-colors whitespace-nowrap">
              Beranda
            </Link>
            <Link href="/dashboard" className="text-slate-600 font-semibold hover:text-[#7367F0] transition-colors whitespace-nowrap">
              Dashboard
            </Link>
            <Link href="/peta-tematik" className="text-slate-500 font-medium hover:text-slate-800 transition-colors whitespace-nowrap">
              Peta Tematik
            </Link>
            <Link href="/tentang" className="text-slate-500 font-medium hover:text-slate-800 transition-colors whitespace-nowrap">
              Tentang Program
            </Link>
            <a href="https://ninoplus.online" target="_blank" rel="noopener noreferrer" className="bg-cyan-50 text-[#7367F0] hover:bg-cyan-100 border border-cyan-200 px-5 py-2 rounded-full transition-colors font-semibold text-sm whitespace-nowrap">
              Aplikasi
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-600 hover:text-[#7367F0] transition-colors shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-slate-200 pt-4 animate-in slide-in-from-top-2 fade-in duration-200">
            <Link href="/" className="text-slate-700 font-semibold text-lg hover:text-[#7367F0] px-2" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
            <Link href="/dashboard" className="text-slate-700 font-semibold text-lg hover:text-[#7367F0] px-2" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link href="/peta-tematik" className="text-slate-600 font-medium text-lg hover:text-[#7367F0] px-2" onClick={() => setIsMenuOpen(false)}>Peta Tematik</Link>
            <Link href="/tentang" className="text-slate-600 font-medium text-lg hover:text-[#7367F0] px-2" onClick={() => setIsMenuOpen(false)}>Tentang Program</Link>
            
            {/* Logo Slots for Mobile (Since hidden in header) */}
            <div className="flex sm:hidden items-center gap-3 pt-4 px-2">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mitra Resmi:</span>
              <div className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 relative group">
                <img src="/logos/bmkg.png" alt="BMKG" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[9px] font-bold text-slate-700">BMKG</span>'; }} />
              </div>
              <div className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 relative group">
                <img src="/logos/pvmbg.png" alt="PVMBG" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[9px] font-bold text-slate-700">PVMBG</span>'; }} />
              </div>
              <div className="h-10 w-16 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1.5 relative group">
                <img src="/logos/pik2.png" alt="PIK2" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] font-bold text-slate-700">PIK2</span>'; }} />
              </div>
              <div className="h-10 w-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 relative group">
                <img src="/logos/bnpb.png" alt="BNPB" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[9px] font-bold text-slate-700">BNPB</span>'; }} />
              </div>
            </div>

            <a href="https://ninoplus.online" target="_blank" rel="noopener noreferrer" className="bg-cyan-50 text-[#7367F0] hover:bg-cyan-100 border border-cyan-200 px-4 py-3 rounded-xl transition-colors font-bold text-base text-center mt-4 mx-2" onClick={() => setIsMenuOpen(false)}>
              Aplikasi
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
