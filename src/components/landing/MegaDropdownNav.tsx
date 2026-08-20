"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react";

export function MegaDropdownNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">

        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-2 shrink-0 group">
          <span className="font-serif text-2xl sm:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">Karsa</span>
          <span className="badge-tag text-[9px] sm:text-[10px] font-mono uppercase px-1.5 sm:px-2 py-0.5 bg-wasabi text-ink rounded font-bold">Studio</span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-6 text-xs font-mono font-bold text-ink shrink-0">
          {/* DROPDOWN 1: MODUL & FITUR */}
          <div className="relative group py-5">
            <button className="flex items-center gap-1 hover:text-terracotta transition font-bold whitespace-nowrap">
              <span>Modul Output</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="dropdown-menu absolute top-full left-0 w-[540px] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal z-50 whitespace-normal">
              <div className="grid grid-cols-2 gap-2">
                <a href="#modul-video" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-wasabi text-ink border-2 border-ink font-mono font-bold text-xs">01</div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">30 Video Scripts</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Hook 3s, cues visual & direct CTA.</p>
                  </div>
                </a>

                <a href="#modul-caption" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-sunflower text-ink border-2 border-ink font-mono font-bold text-xs">02</div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">30 Captions & Tagar</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Copywriting AIDA + 3 tier tagar.</p>
                  </div>
                </a>

                <a href="#modul-seo" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-canvas text-ink border-2 border-ink font-mono font-bold text-xs">03</div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">4 Artikel Blog SEO</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">1.000 kata siap rank di Google.</p>
                  </div>
                </a>

                <a href="#modul-radar" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-terracottaLight text-terracotta border-2 border-ink font-mono font-bold text-xs">04</div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">Audit Gap Kompetitor</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Teardown 1 akun kompetitor acuan.</p>
                  </div>
                </a>

                <a href="#modul-notion" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-sunflower text-ink border-2 border-ink font-mono font-bold text-xs">05</div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">Notion Content OS</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Database kalender 1-klik duplicate.</p>
                  </div>
                </a>

                <a href="#modul-broll" className="p-3 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-wasabi text-ink border-2 border-ink font-mono font-bold text-xs">06</div>
                  <div>
                    <div className="font-bold text-ink font-sans text-xs">Panduan B-Roll HP</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Shot-list praktis modal kamera HP.</p>
                  </div>
                </a>
              </div>

              <div className="mt-2.5 pt-2.5 border-t-2 border-ink flex items-center justify-between text-[11px] font-mono px-2">
                <span className="font-bold text-terracotta">Termasuk 5 Bonus Eksklusif Gratis</span>
                <a href="#bonus-stack" className="text-ink font-bold hover:underline">Lihat Bonus Stack &rarr;</a>
              </div>
            </div>
          </div>

          {/* DROPDOWN 2: SOLUSI SEKTOR */}
          <div className="relative group py-5">
            <button className="flex items-center gap-1 hover:text-terracotta transition font-bold whitespace-nowrap">
              <span>Solusi Sektor</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="dropdown-menu absolute top-full left-0 w-[400px] bg-white border-2 border-ink rounded-2xl p-3.5 shadow-brutal z-50 whitespace-normal">
              <div className="space-y-1">
                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-center justify-between group/case">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-ink"></div>
                    <div>
                      <div className="font-bold text-ink font-sans text-xs">F&B, Cafe & Artisan Roastery</div>
                      <div className="text-[10px] text-stone-500 font-mono">Sensori rasa, review ASMR & edukasi menu</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-ink transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-center justify-between group/case">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500 border border-ink"></div>
                    <div>
                      <div className="font-bold text-ink font-sans text-xs">D2C Skincare & Beauty</div>
                      <div className="text-[10px] text-stone-500 font-mono">Ingredient breakdown & myth-busting</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-ink transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-center justify-between group/case">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 border border-ink"></div>
                    <div>
                      <div className="font-bold text-ink font-sans text-xs">Fashion & Apparel Lokal</div>
                      <div className="text-[10px] text-stone-500 font-mono">Styling guide, body fit & detail bahan</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-ink transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-canvas transition border-2 border-transparent hover:border-ink flex items-center justify-between group/case">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-ink"></div>
                    <div>
                      <div className="font-bold text-ink font-sans text-xs">Jasa Profesional & Edukasi</div>
                      <div className="text-[10px] text-stone-500 font-mono">Konsultan, klinik, agensi & les mandiri</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-ink transition" />
                </a>
              </div>
            </div>
          </div>

          <a href="#compare-scripts" className="hover:text-terracotta transition whitespace-nowrap">Bandingkan Script</a>
          <a href="#bonus-stack" className="hover:text-terracotta transition whitespace-nowrap">5 Bonus Stack</a>
          <a href="#calculator" className="hover:text-terracotta transition whitespace-nowrap">Kalkulator Hemat</a>
          <a href="#preview" className="hover:text-terracotta transition whitespace-nowrap">Contoh Konten</a>
          <a href="#faq" className="hover:text-terracotta transition whitespace-nowrap">FAQ</a>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <a href="/dashboard" className="hidden sm:inline-flex text-xs font-mono font-bold text-ink hover:text-terracotta px-3 py-2 transition whitespace-nowrap">
            Member Workspace
          </a>
          <a href="#order" className="badge-tag bg-ink text-canvas hover:bg-terracotta hover:text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shadow-brutal-sm sm:shadow-brutal">
            <span>Order Batch <span className="hidden sm:inline">(Rp299k)</span></span>
            <ArrowRight className="w-3.5 h-3.5 text-wasabi" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Tutup Menu" : "Buka Menu"}
            className="lg:hidden p-2 rounded-xl text-ink border-2 border-ink bg-white focus:outline-none shadow-brutal-sm"
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
        <div className="lg:hidden bg-canvas border-b-2 border-ink px-4 pt-3 pb-6 space-y-2.5 font-bold text-xs font-mono text-ink shadow-brutal max-h-[85vh] overflow-y-auto">
          <div className="border-2 border-ink rounded-2xl bg-white p-3.5 shadow-brutal-sm">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion("mob-fitur")}
            >
              <span>Modul Output (6 Komponen)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions["mob-fitur"] ? "rotate-180" : ""}`} />
            </div>
            {openAccordions["mob-fitur"] && (
              <div className="mt-3 space-y-2 pt-2.5 border-t-2 border-ink text-[11px]">
                <a href="#modul-video" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 30 Video Scripts Kata-per-Kata</a>
                <a href="#modul-caption" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 30 Captions AIDA & Riset Tagar</a>
                <a href="#modul-seo" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 4 Artikel Blog SEO Google</a>
                <a href="#modul-radar" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Audit Angle & Gap Kompetitor</a>
                <a href="#modul-notion" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Notion Content OS</a>
                <a href="#modul-broll" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Panduan B-Roll Kamera HP</a>
              </div>
            )}
          </div>

          <a href="#compare-scripts" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Bandingkan Kualitas Script</a>
          <a href="#bonus-stack" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-sunflower border-2 border-ink shadow-brutal-sm">5 Bonus Stack (Gratis)</a>
          <a href="#calculator" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Kalkulator Penghematan</a>
          <a href="#preview" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Contoh Output Nyata</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Pusat Bantuan (FAQ 10 Poin)</a>

          <div className="pt-2">
            <a href="/dashboard" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 border-2 border-ink bg-white font-bold rounded-xl text-xs mb-2 shadow-brutal-sm">
              Buka Member Workspace
            </a>
            <a href="#order" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3.5 bg-terracotta text-white font-bold rounded-xl text-xs shadow-brutal">
              Isi Brief Sekarang (Rp299.000)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
