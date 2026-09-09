import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nino Plus - Portal Pemantauan Bencana & Iklim Terintegrasi",
  description: "Aplikasi ini didukung oleh CSR PIK2. Data dari BMKG, PVMBG ESDM, dan NOAA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#020813] text-slate-300 flex flex-col min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-100`}>
        {/* Ambient Glow Background Effect */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]"></div>
        </div>
        
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
