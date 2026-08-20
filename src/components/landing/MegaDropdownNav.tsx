"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export function MegaDropdownNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-1 group">
          <span className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-ink group-hover:rotate-1 transition-transform">Karsa</span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-wasabi text-ink rounded border border-ink font-bold badge-tag">Studio</span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-mono font-bold text-ink">
          {/* DROPDOWN 1: MODUL & FITUR */}
          <div className="relative group py-5">
            <button className="flex items-center gap-1 hover:text-terracotta transition font-medium">
              <span>Modul Output</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="dropdown-menu absolute top-full left-0 w-[560px] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal z-50">
              <div className="grid grid-cols-2 gap-2">
                <a href="#modul-video" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold text-ink shrink-0">
                    01
                  </div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">30 Naskah Video Pendek</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Hook 3s, arahan audio, visual cues & CTA.</p>
                  </div>
                </a>

                <a href="#modul-caption" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold text-ink shrink-0">
                    02
                  </div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">30 Takarir & Tagar AIDA</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Copywriting berkonversi + 3 tier tagar relevan.</p>
                  </div>
                </a>

                <a href="#modul-seo" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-sunflower border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold text-ink shrink-0">
                    03
                  </div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">4 Artikel SEO Website</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">1.000 kata berstruktur H1/H2/H3 siap rank.</p>
                  </div>
                </a>

                <a href="#modul-radar" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-sunflower border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold text-ink shrink-0">
                    04
                  </div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">Audit Celah Kompetitor</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Teardown positioning 1 kompetitor utama.</p>
                  </div>
                </a>

                <a href="#modul-notion" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold text-ink shrink-0">
                    05
                  </div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">Notion Dynamic OS</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Database kalender posting siap duplikasi.</p>
                  </div>
                </a>

                <a href="#modul-broll" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-terracotta/10 border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold text-ink shrink-0">
                    06
                  </div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">Panduan B-Roll & Rekam</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Shot-list praktis rekam hanya pakai HP.</p>
                  </div>
                </a>
              </div>

              <div className="mt-2 pt-2.5 border-t-2 border-ink flex items-center justify-between text-[11px] font-mono text-stone-500 px-2">
                <span>Termasuk 5 Bonus Eksklusif Gratis</span>
                <a href="#bonus-stack" className="text-ink font-bold hover:underline">Lihat Bonus Stack &rarr;</a>
              </div>
            </div>
          </div>

          {/* DROPDOWN 2: SOLUSI SEKTOR */}
          <div className="relative group py-5">
            <button className="flex items-center gap-1 hover:text-terracotta transition font-medium">
              <span>Solusi Sektor</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="dropdown-menu absolute top-full left-0 w-[420px] bg-white border-2 border-ink rounded-2xl p-3.5 shadow-brutal z-50">
              <div className="space-y-1">
                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-canvas transition flex items-center justify-between group/case border-2 border-transparent hover:border-ink">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-ink"></div>
                    <div>
                      <div className="font-bold text-ink font-sans text-xs">F&B, Cafe & Roastery</div>
                      <div className="text-[10px] text-stone-500 font-mono">Sensori rasa, review ASMR & edukasi menu</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-ink transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-canvas transition flex items-center justify-between group/case border-2 border-transparent hover:border-ink">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-600 border border-ink"></div>
                    <div>
                      <div className="font-bold text-ink font-sans text-xs">D2C Skincare & Beauty</div>
                      <div className="text-[10px] text-stone-500 font-mono">Ingredient breakdown & myth-busting</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-ink transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-canvas transition flex items-center justify-between group/case border-2 border-transparent hover:border-ink">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 border border-ink"></div>
                    <div>
                      <div className="font-bold text-ink font-sans text-xs">Fashion & Apparel Lokal</div>
                      <div className="text-[10px] text-stone-500 font-mono">Styling guide, body fit & detail bahan</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-ink transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-canvas transition flex items-center justify-between group/case border-2 border-transparent hover:border-ink">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-ink"></div>
                    <div>
                      <div className="font-bold text-ink font-sans text-xs">Jasa Profesional & Edukasi</div>
                      <div className="text-[10px] text-stone-500 font-mono">Konsultan, klinik, les & agensi mandiri</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-ink transition" />
                </a>
              </div>
            </div>
          </div>

          <a href="#compare" className="hover:text-terracotta transition font-medium">Bandingkan Script</a>
          <a href="#bonus-stack" className="hover:text-terracotta transition font-medium">5 Bonus Stack</a>
          <a href="#calculator" className="hover:text-terracotta transition font-medium">Kalkulator Hemat</a>
          <a href="#preview" className="hover:text-terracotta transition font-medium">Contoh Konten</a>
          <a href="#faq" className="hover:text-terracotta transition font-medium">FAQ</a>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a href="/dashboard" className="hidden sm:inline-flex text-xs font-mono font-bold text-ink hover:text-terracotta px-3 py-2 rounded-lg transition">
            Member Workspace
          </a>
          <a href="#order" className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-bold bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-lg transition tracking-tight border-2 border-ink shadow-brutal-sm">
            Order Batch (Rp299k)
            <ArrowUpRight className="w-3.5 h-3.5 text-wasabi" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Tutup Menu" : "Buka Menu"}
            className="md:hidden p-2 rounded-xl border-2 border-ink bg-white shadow-brutal-sm transition focus:outline-none hover:bg-canvas"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-canvas border-b-2 border-ink px-4 pt-2 pb-6 space-y-2 font-bold text-xs font-mono text-ink shadow-brutal max-h-[85vh] overflow-y-auto">
          <div className="border-2 border-ink rounded-xl bg-white p-3 shadow-brutal-sm">
            <div
              className="flex justify-between items-center cursor-pointer font-bold text-ink"
              onClick={() => toggleAccordion("mob-fitur")}
            >
              <span>Modul Output (6 Komponen)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions["mob-fitur"] ? "rotate-180" : ""}`} />
            </div>
            {openAccordions["mob-fitur"] && (
              <div className="mt-3 space-y-2 pt-2 border-t-2 border-ink text-[11px]">
                <a href="#modul-video" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-wasabi/20 text-ink border border-ink/30">
                  <span className="font-mono font-bold text-[9px] bg-wasabi px-1 py-0.5 rounded border border-ink">01</span>
                  30 Naskah Video Pendek
                </a>
                <a href="#modul-caption" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-wasabi/20 text-ink border border-ink/30">
                  <span className="font-mono font-bold text-[9px] bg-wasabi px-1 py-0.5 rounded border border-ink">02</span>
                  30 Takarir & Riset Tagar
                </a>
                <a href="#modul-seo" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-sunflower/20 text-ink border border-ink/30">
                  <span className="font-mono font-bold text-[9px] bg-sunflower px-1 py-0.5 rounded border border-ink">03</span>
                  4 Artikel Blog SEO Google
                </a>
                <a href="#modul-radar" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-sunflower/20 text-ink border border-ink/30">
                  <span className="font-mono font-bold text-[9px] bg-sunflower px-1 py-0.5 rounded border border-ink">04</span>
                  Audit Celah Kompetitor
                </a>
                <a href="#modul-notion" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-canvas/50 text-ink border border-ink/30">
                  <span className="font-mono font-bold text-[9px] bg-canvas px-1 py-0.5 rounded border border-ink">05</span>
                  Notion Dynamic OS
                </a>
                <a href="#modul-broll" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-terracotta/10 text-ink border border-ink/30">
                  <span className="font-mono font-bold text-[9px] bg-terracotta/20 px-1 py-0.5 rounded border border-ink">06</span>
                  Panduan B-Roll & Rekam
                </a>
              </div>
            )}
          </div>

          <div className="border-2 border-ink rounded-xl bg-white p-3 shadow-brutal-sm">
            <div
              className="flex justify-between items-center cursor-pointer font-bold text-ink"
              onClick={() => toggleAccordion("mob-sektor")}
            >
              <span>Solusi Sektor Industri</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions["mob-sektor"] ? "rotate-180" : ""}`} />
            </div>
            {openAccordions["mob-sektor"] && (
              <div className="mt-3 space-y-2 pt-2 border-t-2 border-ink text-[11px]">
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-canvas transition">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-ink shrink-0"></div>
                  F&B / Coffee Roastery
                </a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-canvas transition">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-600 border border-ink shrink-0"></div>
                  Skincare & D2C Beauty
                </a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-canvas transition">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 border border-ink shrink-0"></div>
                  Fashion & Apparel Lokal
                </a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-canvas transition">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-ink shrink-0"></div>
                  Jasa Konsultan & Edukasi
                </a>
              </div>
            )}
          </div>

          <a href="#preview" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl bg-white border-2 border-ink font-bold text-ink shadow-brutal-sm">Contoh Konten Nyata</a>
          <a href="#bonus-stack" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl bg-white border-2 border-ink font-bold text-ink shadow-brutal-sm">5 Bonus Stack (Gratis)</a>
          <a href="#calculator" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl bg-white border-2 border-ink font-bold text-ink shadow-brutal-sm">Kalkulator Hemat</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl bg-white border-2 border-ink font-bold text-ink shadow-brutal-sm">FAQ</a>

          <div className="pt-2 flex flex-col gap-2">
            <a href="/dashboard" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 border-2 border-ink text-ink font-bold rounded-xl text-xs shadow-brutal-sm bg-white hover:bg-canvas transition">
              Buka Member Workspace
            </a>
            <a href="#order" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3.5 bg-terracotta text-white font-bold rounded-xl text-xs border-2 border-ink shadow-brutal">
              Isi Brief Sekarang (Rp299.000)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
