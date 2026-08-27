"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarRange, ChartNoAxesCombined, ChevronDown, Menu, PackageCheck, Store, Target, X } from "lucide-react";
import { SECTORS, GOALS } from "./landing-data";

export function NavHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<Record<string, boolean>>({});

  return (
<header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">
          <a href="#main-content" className="flex items-center space-x-2 shrink-0 group">
            <span className="font-serif text-2xl sm:text-4xl xl:text-3xl 2xl:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">Karsa</span>
            <span className="badge-tag text-[10px] font-mono uppercase px-1.5 sm:px-2 py-0.5 bg-wasabi text-ink rounded font-bold">Studio</span>
          </a>

          <nav className="hidden xl:flex items-center gap-2.5 xl:gap-3 text-xs font-mono font-bold text-ink shrink-0">
            {/* DROPDOWN 1: MODUL OUTPUT */}
            <div className="relative group py-5">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openDropdown === "output"}
                onClick={() => setOpenDropdown(openDropdown === "output" ? null : "output")}
                className="flex items-center gap-1 hover:text-terracotta transition font-bold whitespace-nowrap"
              >
                <span>Isi Paket</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 transition-transform duration-200" />
              </button>
              <div id="outputMenu" className={`dropdown-menu absolute top-full left-0 w-[740px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal z-50 whitespace-normal ${openDropdown === "output" ? "nav-open" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <PackageCheck className="w-4 h-4 text-terracotta" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Output Utama</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <a href="#modul-video" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-wasabi text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">01</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">30 Video Scripts</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Hook, visual, audio, CTA.</span></span>
                      </a>
                      <a href="#modul-caption" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-sunflower text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">02</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">30 Caption &amp; Tagar</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">AIDA + 3 tier tagar.</span></span>
                      </a>
                      <a href="#modul-seo" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-canvas text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">03</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">4 Artikel Blog SEO</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Struktur H1-H3 + meta.</span></span>
                      </a>
                      <a href="#modul-radar" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-terracottaLight text-terracotta border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">04</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">Audit Gap Kompetitor</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Teardown 1 akun acuan.</span></span>
                      </a>
                      <a href="#modul-notion" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-sunflower text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">05</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">Notion Content OS</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Calendar + Kanban produksi.</span></span>
                      </a>
                      <a href="#modul-broll" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-wasabi text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">06</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">Panduan B-Roll HP</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Shot-list untuk rekam sendiri.</span></span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <CalendarRange className="w-4 h-4 text-wasabiDark" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Strategi &amp; Sistem</span>
                    </div>
                    <div className="mt-2 space-y-1 font-sans">
                      <a href="#isi-harian" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Peta Konten 30 Hari</span><span className="block text-[10px] text-stone-500 mt-0.5">Foundation sampai conversion.</span></a>
                      <a href="#standar-kualitas" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Standar Setiap Output</span><span className="block text-[10px] text-stone-500 mt-0.5">Checklist sebelum dipakai tim.</span></a>
                      <a href="#cara-kerja" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Cara Kerja Karsa</span><span className="block text-[10px] text-stone-500 mt-0.5">Brief, riset, tulis, kirim.</span></a>
                      <a href="#cakupan" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Scope Layanan</span><span className="block text-[10px] text-stone-500 mt-0.5">Termasuk dan tidak termasuk.</span></a>
                      <a href="#anatomi-script" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Anatomi Script 25 Detik</span><span className="block text-[10px] text-stone-500 mt-0.5">Hook, value, CTA per detik.</span></a>
                      <a href="#pillar-konten" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Pilar Konten 30 Hari</span><span className="block text-[10px] text-stone-500 mt-0.5">4 pilar &amp; rasio mingguan.</span></a>
                      <a href="#alur-produksi" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Template Produksi</span><span className="block text-[10px] text-stone-500 mt-0.5">Senin-Jumat siap eksekusi.</span></a>
                      <a href="#garansi" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Garansi &amp; SLA</span><span className="block text-[10px] text-stone-500 mt-0.5">24 jam + kalibrasi 48 jam.</span></a>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <ChartNoAxesCombined className="w-4 h-4 text-terracotta" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Proof &amp; Keputusan</span>
                    </div>
                    <div className="mt-2 space-y-1 font-sans">
                      <a href="#compare-scripts" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Bandingkan Kualitas</span><span className="block text-[10px] text-stone-500 mt-0.5">Script generik vs Karsa.</span></a>
                      <a href="#studi-kasus" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Case Study Nyata</span><span className="block text-[10px] text-stone-500 mt-0.5">Metrik dari implementasi.</span></a>
                      <a href="#preview" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Contoh Output</span><span className="block text-[10px] text-stone-500 mt-0.5">Script, caption, dan SEO.</span></a>
                      <a href="#calculator" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Kalkulator Hemat</span><span className="block text-[10px] text-stone-500 mt-0.5">Bandingkan biaya per batch.</span></a>
                      <a href="#komparasi" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Karsa vs Agensi vs In-house</span><span className="block text-[10px] text-stone-500 mt-0.5">Tabel perbandingan jujur.</span></a>
                      <a href="#harga" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Harga &amp; Paket</span><span className="block text-[10px] text-stone-500 mt-0.5">1, 3, atau 6 batch.</span></a>
                      <a href="#testimoni" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Testimoni Customer</span><span className="block text-[10px] text-stone-500 mt-0.5">Kata mereka yang sudah pakai.</span></a>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono px-2">
                  <span className="font-bold text-terracotta">5 bonus eksklusif sudah termasuk dalam setiap batch.</span>
                  <a href="#bonus-stack" onClick={() => setOpenDropdown(null)} className="text-ink font-bold hover:underline">Lihat semua bonus &rarr;</a>
                </div>
              </div>
            </div>

            {/* DROPDOWN 2: SEKTOR BISNIS */}
            <div className="relative group py-5">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openDropdown === "sector"}
                onClick={() => setOpenDropdown(openDropdown === "sector" ? null : "sector")}
                className="flex items-center gap-1 hover:text-terracotta transition font-bold whitespace-nowrap"
              >
                <span>Untuk Bisnis</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 transition-transform duration-200" />
              </button>
              <div id="sectorMenu" className={`dropdown-menu absolute top-full left-0 w-[560px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal z-50 whitespace-normal ${openDropdown === "sector" ? "nav-open" : ""}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <Store className="w-4 h-4 text-terracotta" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Sektor Bisnis</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      {SECTORS.map((s) => (
                        <a key={s.title} href="#studi-kasus" onClick={() => setOpenDropdown(null)} className="p-2 rounded-xl hover:bg-canvas transition flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${s.dot} border border-ink shrink-0`}></span>
                          <span><span className="block font-bold text-ink font-sans text-xs">{s.title}</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">{s.sub}</span></span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <Target className="w-4 h-4 text-wasabiDark" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Tujuan Konten</span>
                    </div>
                    <div className="mt-2 space-y-1 font-sans">
                      {GOALS.map((g) => (
                        <a key={g.title} href={g.href} onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">{g.title}</span><span className="block text-[10px] text-stone-500 mt-0.5">{g.sub}</span></a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="w-px h-5 bg-ink/20 mx-0.5" aria-hidden="true"></span>
            <a href="#harga" className="hover:text-terracotta transition whitespace-nowrap">Harga</a>
            <a href="#testimoni" className="hover:text-terracotta transition whitespace-nowrap">Testimoni</a>
            <a href="#compare-scripts" className="hover:text-terracotta transition whitespace-nowrap">Lihat Kualitas</a>
            <a href="#cara-kerja" className="hover:text-terracotta transition whitespace-nowrap">Cara Kerja</a>
            <a href="#preview" className="hover:text-terracotta transition whitespace-nowrap">Contoh Konten</a>
            <a href="#faq" className="hover:text-terracotta transition whitespace-nowrap">FAQ</a>
          </nav>

          {/* CTA & MOBILE TOGGLE */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <Link href="/login" className="hidden xl:inline-flex text-xs font-mono font-bold text-ink hover:text-terracotta px-2.5 py-2 transition whitespace-nowrap">
              Member Workspace
            </Link>
            <a href="#order" className="badge-tag bg-ink text-canvas hover:bg-terracotta hover:text-white px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shadow-brutal-sm sm:shadow-brutal">
              <span>Mulai dengan Brief</span>
              <ArrowRight className="w-3.5 h-3.5 text-wasabi" />
            </a>
            <button
              type="button"
              id="mobileMenuToggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Tutup Menu" : "Buka Menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              className="xl:hidden p-2 rounded-xl text-ink border-2 border-ink bg-white focus:outline-none shadow-brutal-sm"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <div id="mobileMenu" className="xl:hidden bg-canvas border-b-2 border-ink px-4 pt-3 pb-6 space-y-2.5 font-bold text-xs font-mono text-ink shadow-brutal max-h-[85vh] overflow-y-auto">
            <div className="border-2 border-ink rounded-2xl bg-white p-3.5 shadow-brutal-sm">
              <button
                type="button"
                aria-expanded={!!mobileAcc.fitur}
                aria-controls="mob-fitur"
                className="w-full flex justify-between items-center text-left"
                onClick={() => setMobileAcc((prev) => ({ ...prev, fitur: !prev.fitur }))}
              >
                <span>Isi Paket (6 Komponen)</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAcc.fitur ? "rotate-180" : ""}`} />
              </button>
              <div id="mob-fitur" className={`mt-3 space-y-2 pt-2.5 border-t-2 border-ink text-[11px] ${mobileAcc.fitur ? "" : "hidden"}`}>
                <a href="#modul-video" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 30 Video Scripts Kata-per-Kata</a>
                <a href="#modul-caption" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 30 Captions AIDA &amp; Riset Tagar</a>
                <a href="#modul-seo" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 4 Artikel Blog SEO Google</a>
                <a href="#modul-radar" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Audit Angle &amp; Gap Kompetitor</a>
                <a href="#modul-notion" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Notion Content OS</a>
                <a href="#modul-broll" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Panduan B-Roll Kamera HP</a>
                <a href="#isi-harian" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Peta Konten 30 Hari</a>
                <a href="#standar-kualitas" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Standar Setiap Output</a>
              </div>
            </div>

            <div className="border-2 border-ink rounded-2xl bg-white p-3.5 shadow-brutal-sm">
              <button
                type="button"
                aria-expanded={!!mobileAcc.sektor}
                aria-controls="mob-sektor"
                className="w-full flex justify-between items-center text-left"
                onClick={() => setMobileAcc((prev) => ({ ...prev, sektor: !prev.sektor }))}
              >
                <span>Untuk Bisnis &amp; Tujuan</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAcc.sektor ? "rotate-180" : ""}`} />
              </button>
              <div id="mob-sektor" className={`mt-3 space-y-2 pt-2.5 border-t-2 border-ink text-[11px] ${mobileAcc.sektor ? "" : "hidden"}`}>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; F&amp;B, Cafe &amp; Roastery</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Skincare &amp; Beauty</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Fashion &amp; Apparel</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Jasa Profesional &amp; Edukasi</a>
                <a href="#isi-harian" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Edukasi &amp; Awareness</a>
                <a href="#order" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Leads atau Penjualan</a>
              </div>
            </div>

            <a href="#anatomi-script" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Anatomi Script 25 Detik</a>
            <a href="#pillar-konten" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-sunflower border-2 border-ink shadow-brutal-sm">Pilar Konten 30 Hari</a>
            <a href="#alur-produksi" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Template Produksi Mingguan</a>
            <a href="#harga" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Harga &amp; Paket</a>
            <a href="#testimoni" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Testimoni Customer</a>
            <a href="#komparasi" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Karsa vs Agensi</a>
            <a href="#garansi" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-sunflower border-2 border-ink shadow-brutal-sm">Garansi &amp; SLA</a>
            <a href="#compare-scripts" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Lihat Kualitas Script</a>
            <a href="#cara-kerja" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-sunflower border-2 border-ink shadow-brutal-sm">Cara Kerja Karsa</a>
            <a href="#preview" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Contoh Output</a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">FAQ &amp; Bantuan</a>

            <div className="pt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 border-2 border-ink bg-white font-bold rounded-xl text-xs mb-2 shadow-brutal-sm">
                Buka Member Workspace
              </Link>
              <a href="#order" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3.5 bg-terracotta text-white font-bold rounded-xl text-xs shadow-brutal">
                Isi Brief &amp; Checkout (Rp299.000)
              </a>
            </div>
          </div>
        )}
      </header>
  );
}
