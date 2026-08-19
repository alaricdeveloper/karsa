"use client";

import Link from "next/link";
import { Home, LayoutGrid, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand-50 text-sand-900 font-sans antialiased selection:bg-sand-900 selection:text-sand-50 flex flex-col justify-between">
      <style>{`
        .bento-card { background: #FFFFFF; border: 1px solid #E5E5E0; transition: border-color 0.2s ease, transform 0.2s ease; }
        .bento-card:hover { border-color: #A3A39E; }
      `}</style>

      {/* TOP APP BAR */}
      <header className="sticky top-0 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-sand-900 font-normal">Karsa</span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-200 text-sand-800 rounded font-semibold">Status 404</span>
          </Link>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand-300 rounded-xl hover:bg-sand-100 transition text-stone-700 shadow-sm">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN 404 CONTENT */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 my-auto text-center space-y-8">
        {/* BIG EDITORIAL 404 DISPLAY */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-900 bg-amber-100/70 border border-amber-200 px-3 py-1 rounded-full mx-auto">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            Alamat URL Tidak Ditemukan
          </div>

          <h1 className="text-7xl sm:text-9xl font-serif text-sand-900 tracking-tight select-none">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-serif text-stone-700 italic">
            Naskah konten ini belum terbit atau tautannya berpindah.
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
            Halaman yang kamu cari tidak tersedia dalam arsip Karsa Studio. Mungkin tautan salah ketik atau telah dialihkan ke ruang kerja baru.
          </p>
        </div>

        {/* PRIMARY ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs max-w-md mx-auto">
          <Link href="/" className="w-full sm:w-auto px-6 py-3.5 bg-sand-900 hover:bg-stone-800 text-sand-50 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm min-h-[48px]">
            <span className="w-4 h-4 text-emerald-400">&#8592;</span>
            <span>Kembali ke Beranda Utama</span>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto px-6 py-3.5 bg-white border border-sand-300 hover:bg-sand-100 text-sand-900 rounded-xl font-medium transition flex items-center justify-center gap-2 min-h-[48px]">
            <LayoutGrid className="w-4 h-4 text-stone-500" />
            <span>Buka Member Workspace</span>
          </Link>
        </div>

        {/* QUICK DIRECTORY BENTO CARDS */}
        <div className="pt-6 border-t border-sand-200 space-y-3 text-left font-mono text-xs">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider block text-center">Navigasi Langsung Portal Karsa</span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/portal/demo" className="bento-card p-4 rounded-2xl space-y-1 block group hover:border-sand-900 transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sand-900 font-sans">Customer Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-sand-900 transition" />
              </div>
              <p className="text-[11px] text-stone-500 font-sans">Akses 30 naskah, teleprompter, dan duplikasi Notion.</p>
            </Link>

            <Link href="/dashboard" className="bento-card p-4 rounded-2xl space-y-1 block group hover:border-sand-900 transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sand-900 font-sans">Member Tools</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-sand-900 transition" />
              </div>
              <p className="text-[11px] text-stone-500 font-sans">Generator Hook, Kalkulator ROI, dan Brand Vault.</p>
            </Link>

            <a href="https://wa.me/6281288009920" target="_blank" rel="noopener noreferrer" className="bento-card p-4 rounded-2xl space-y-1 block group hover:border-sand-900 transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sand-900 font-sans">Bantuan CS</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-sand-900 transition" />
              </div>
              <p className="text-[11px] text-stone-500 font-sans">Hubungi tim operasional langsung via WhatsApp.</p>
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-sand-200 py-6 px-4 font-mono text-xs text-stone-500 text-center">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px]">
            <Link href="/terms" className="hover:text-sand-900 transition">Terms</Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-sand-900 transition">Privacy</Link>
            <span>&bull;</span>
            <Link href="/refund" className="hover:text-sand-900 transition">SLA Guarantee</Link>
          </div>
          <p className="text-[11px] text-stone-400">&copy; 2026 Karsa Studio (<span className="text-stone-600">usekarsa.co</span>). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
