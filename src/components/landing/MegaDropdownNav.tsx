"use client";

import { useState } from "react";
import { ChevronDown, Video, MessageSquare, Search, Compass, Calendar, Film, ArrowUpRight } from "lucide-react";

export function MegaDropdownNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header className="sticky top-0 z-40 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-2">
          <span className="font-serif text-2xl font-normal tracking-tight text-sand-900">Karsa</span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-sand-200 text-sand-800 rounded font-medium">Studio</span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-mono text-stone-600">
          {/* DROPDOWN 1: MODUL & FITUR */}
          <div className="relative group py-5">
            <button className="flex items-center gap-1 hover:text-sand-900 transition font-medium">
              <span>Modul Deliverables</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="dropdown-menu absolute top-full left-0 w-[560px] bg-white border border-sand-300 rounded-2xl p-4 shadow-xl z-50">
              <div className="grid grid-cols-2 gap-2">
                <a href="#modul-video" className="p-3 rounded-xl hover:bg-sand-50 transition border border-transparent hover:border-sand-200 flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-sand-100 text-sand-900 group-hover/item:bg-sand-900 group-hover/item:text-white transition">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sand-900 font-sans text-xs">30 Naskah Video Pendek</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Hook 3s, arahan audio, visual cues & CTA.</p>
                  </div>
                </a>

                <a href="#modul-caption" className="p-3 rounded-xl hover:bg-sand-50 transition border border-transparent hover:border-sand-200 flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-sand-100 text-sand-900 group-hover/item:bg-sand-900 group-hover/item:text-white transition">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sand-900 font-sans text-xs">30 Takarir & Tagar AIDA</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Copywriting berkonversi + 3 tier tagar relevan.</p>
                  </div>
                </a>

                <a href="#modul-seo" className="p-3 rounded-xl hover:bg-sand-50 transition border border-transparent hover:border-sand-200 flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-sand-100 text-sand-900 group-hover/item:bg-sand-900 group-hover/item:text-white transition">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sand-900 font-sans text-xs">4 Artikel SEO Website</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">1.000 kata berstruktur H1/H2/H3 siap rank.</p>
                  </div>
                </a>

                <a href="#modul-radar" className="p-3 rounded-xl hover:bg-sand-50 transition border border-transparent hover:border-sand-200 flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-sand-100 text-sand-900 group-hover/item:bg-sand-900 group-hover/item:text-white transition">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sand-900 font-sans text-xs">Audit Celah Kompetitor</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Teardown positioning 1 kompetitor utama.</p>
                  </div>
                </a>

                <a href="#modul-notion" className="p-3 rounded-xl hover:bg-sand-50 transition border border-transparent hover:border-sand-200 flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-sand-100 text-sand-900 group-hover/item:bg-sand-900 group-hover/item:text-white transition">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sand-900 font-sans text-xs">Notion Dynamic OS</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Database kalender posting siap duplikasi.</p>
                  </div>
                </a>

                <a href="#modul-broll" className="p-3 rounded-xl hover:bg-sand-50 transition border border-transparent hover:border-sand-200 flex items-start gap-3 group/item">
                  <div className="p-2 rounded-lg bg-sand-100 text-sand-900 group-hover/item:bg-sand-900 group-hover/item:text-white transition">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sand-900 font-sans text-xs">Panduan B-Roll & Rekam</div>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">Shot-list praktis rekam hanya pakai HP.</p>
                  </div>
                </a>
              </div>

              <div className="mt-2 pt-2.5 border-t border-sand-200 flex items-center justify-between text-[11px] font-mono text-stone-500 px-2">
                <span>Termasuk 5 Bonus Eksklusif Gratis</span>
                <a href="#bonus-stack" className="text-sand-900 font-bold hover:underline">Lihat Bonus Stack &rarr;</a>
              </div>
            </div>
          </div>

          {/* DROPDOWN 2: SOLUSI SEKTOR */}
          <div className="relative group py-5">
            <button className="flex items-center gap-1 hover:text-sand-900 transition font-medium">
              <span>Solusi Sektor</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="dropdown-menu absolute top-full left-0 w-[420px] bg-white border border-sand-300 rounded-2xl p-3.5 shadow-xl z-50">
              <div className="space-y-1">
                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-sand-50 transition flex items-center justify-between group/case">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                    <div>
                      <div className="font-bold text-sand-900 font-sans text-xs">F&B, Cafe & Roastery</div>
                      <div className="text-[10px] text-stone-500 font-mono">Sensori rasa, review ASMR & edukasi menu</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-sand-900 transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-sand-50 transition flex items-center justify-between group/case">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                    <div>
                      <div className="font-bold text-sand-900 font-sans text-xs">D2C Skincare & Beauty</div>
                      <div className="text-[10px] text-stone-500 font-mono">Ingredient breakdown & myth-busting</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-sand-900 transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-sand-50 transition flex items-center justify-between group/case">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <div>
                      <div className="font-bold text-sand-900 font-sans text-xs">Fashion & Apparel Lokal</div>
                      <div className="text-[10px] text-stone-500 font-mono">Styling guide, body fit & detail bahan</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-sand-900 transition" />
                </a>

                <a href="#studi-kasus" className="p-2.5 rounded-xl hover:bg-sand-50 transition flex items-center justify-between group/case">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                    <div>
                      <div className="font-bold text-sand-900 font-sans text-xs">Jasa Profesional & Edukasi</div>
                      <div className="text-[10px] text-stone-500 font-mono">Konsultan, klinik, les & agensi mandiri</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/case:text-sand-900 transition" />
                </a>
              </div>
            </div>
          </div>

          <a href="#preview" className="hover:text-sand-900 transition font-medium">Contoh Output</a>
          <a href="#value-stack" className="hover:text-sand-900 transition font-medium">Rincian Value</a>
          <a href="#calculator" className="hover:text-sand-900 transition font-medium">Kalkulator Biaya</a>
          <a href="#faq" className="hover:text-sand-900 transition font-medium">FAQ</a>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a href="#order" className="hidden sm:inline-flex text-xs font-mono font-medium bg-sand-900 hover:bg-stone-800 text-sand-50 px-4 py-2 rounded-lg transition tracking-tight">
            Pesan Batch (Rp299k)
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Tutup Menu" : "Buka Menu"}
            className="md:hidden p-2 rounded-lg text-sand-900 hover:bg-sand-200 transition focus:outline-none"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-sand-50 border-b border-sand-200 px-4 pt-2 pb-6 space-y-2 font-medium text-xs font-mono text-stone-700 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="border border-sand-200 rounded-xl bg-white p-3">
            <div
              className="flex justify-between items-center cursor-pointer font-bold text-sand-900"
              onClick={() => toggleAccordion("mob-fitur")}
            >
              <span>Modul Deliverables (6 Komponen)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions["mob-fitur"] ? "rotate-180" : ""}`} />
            </div>
            {openAccordions["mob-fitur"] && (
              <div className="mt-3 space-y-2 pt-2 border-t border-sand-100 text-[11px]">
                <a href="#modul-video" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 30 Naskah Video Pendek</a>
                <a href="#modul-caption" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 30 Takarir & Riset Tagar</a>
                <a href="#modul-seo" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 4 Artikel Blog SEO Google</a>
                <a href="#modul-radar" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Audit Celah Kompetitor</a>
                <a href="#modul-notion" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Notion Dynamic OS</a>
                <a href="#modul-broll" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Panduan B-Roll & Rekam</a>
              </div>
            )}
          </div>

          <div className="border border-sand-200 rounded-xl bg-white p-3">
            <div
              className="flex justify-between items-center cursor-pointer font-bold text-sand-900"
              onClick={() => toggleAccordion("mob-sektor")}
            >
              <span>Solusi Sektor Industri</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions["mob-sektor"] ? "rotate-180" : ""}`} />
            </div>
            {openAccordions["mob-sektor"] && (
              <div className="mt-3 space-y-2 pt-2 border-t border-sand-100 text-[11px]">
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; F&B / Coffee Roastery</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Skincare & D2C Beauty</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Fashion & Apparel Lokal</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Jasa Konsultan & Edukasi</a>
              </div>
            )}
          </div>

          <a href="#preview" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl bg-white border border-sand-200 font-bold text-sand-900">Contoh Output Nyata</a>
          <a href="#bonus-stack" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl bg-white border border-sand-200 font-bold text-sand-900">5 Bonus Stack (Gratis)</a>
          <a href="#calculator" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl bg-white border border-sand-200 font-bold text-sand-900">Perbandingan Biaya</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl bg-white border border-sand-200 font-bold text-sand-900">Pusat Bantuan (FAQ)</a>

          <div className="pt-2">
            <a href="#order" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3.5 bg-sand-900 text-sand-50 font-bold rounded-xl text-xs">
              Isi Brief Sekarang (Rp299.000)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
