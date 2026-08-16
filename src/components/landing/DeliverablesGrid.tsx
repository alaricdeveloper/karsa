import { Video, MessageSquare, Search, Compass, Calendar, Film } from "lucide-react";

export function DeliverablesGrid() {
  return (
    <section id="deliverables" className="py-14 sm:py-20 bg-sand-100/60 border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Spesifikasi Detail Produk</span>
            <h2 className="text-2xl sm:text-4xl font-serif text-sand-900 mt-1 sm:mt-2">Semua yang Anda terima dalam 1 Paket</h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 md:mt-0 font-mono">Format Master: Notion Dynamic Database + Backup Docs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Module 1: Video Scripts */}
          <div id="modul-video" className="md:col-span-2 bento-card p-6 sm:p-8 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center text-sand-900 border border-sand-200">
                <Video className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-stone-700 rounded border border-sand-200">Modul 01 &bull; Video Engine</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-sand-900">30 Naskah Video Pendek (TikTok, Reels, Shorts)</h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Naskah kata-per-kata yang dirancang dengan formula retensi tinggi untuk durasi ideal 15–30 detik.
            </p>
            <div className="mt-4 p-3.5 bg-sand-50 border border-sand-200 rounded-xl font-mono text-[11px] sm:text-xs text-stone-700 space-y-1">
              <div><strong>Visual &amp; Audio Hook (0-3s):</strong> Menghentikan scroll penonton seketika.</div>
              <div><strong>Problem Framing (3-10s):</strong> Membedah masalah spesifik audiens Anda.</div>
              <div><strong>Value Delivery (10-25s):</strong> Menampilkan produk Anda sebagai solusi logis.</div>
              <div><strong>Direct CTA (25-30s):</strong> Memicu komentar, klik link bio, atau direct message.</div>
            </div>
          </div>

          {/* Module 2: Captions */}
          <div id="modul-caption" className="bento-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center text-sand-900 border border-sand-200">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-stone-700 rounded border border-sand-200">Modul 02</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-sand-900">30 Takarir AIDA &amp; Riset Tagar</h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Takarir media sosial terstruktur untuk memicu interaksi (*saves &amp; shares*) lengkap dengan kurasi 10–15 tagar relevan tanpa spam.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-sand-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Panjang</span>
              <span>120–180 Kata / Post</span>
            </div>
          </div>

          {/* Module 3: SEO Articles */}
          <div id="modul-seo" className="bento-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center text-sand-900 border border-sand-200">
                  <Search className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-stone-700 rounded border border-sand-200">Modul 03</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-sand-900">4 Artikel SEO Website (Pillar Content)</h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Artikel 800–1.200 kata dengan penataan judul (H1/H2/H3), density kata kunci natural, dan meta deskripsi untuk mendatangkan pembeli dari Google.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-sand-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Format</span>
              <span className="text-emerald-700 font-semibold">Markdown &amp; Docs</span>
            </div>
          </div>

          {/* Module 4: Competitor Radar */}
          <div id="modul-radar" className="bento-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center text-sand-900 border border-sand-200">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-stone-700 rounded border border-sand-200">Modul 04</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-sand-900">Audit Celah Kompetitor</h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Analisis terhadap 1 akun kompetitor utama untuk menemukan sudut pandang pesan yang belum digarap di industri Anda.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-sand-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Output</span>
              <span>Positioning Blueprint</span>
            </div>
          </div>

          {/* Module 5: Notion Dynamic OS */}
          <div id="modul-notion" className="bento-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center text-sand-900 border border-sand-200">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-stone-700 rounded border border-sand-200">Modul 05</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-sand-900">Notion Content OS</h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Database Notion terintegrasi dengan Calendar View, Kanban Status Posting, dan manajemen aset yang siap diduplikasi.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-sand-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Akses</span>
              <span>1-Click Duplicate</span>
            </div>
          </div>

          {/* Module 6: B-Roll & Shot List */}
          <div id="modul-broll" className="md:col-span-2 bento-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center text-sand-900 border border-sand-200">
                  <Film className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-stone-700 rounded border border-sand-200">Modul 06</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-sand-900">Panduan Shot List &amp; B-Roll Praktis</h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Daftar referensi pengambilan visual b-roll (sudut kamera, pencahayaan alami, gestur tangan) yang bisa dieksekusi sendiri menggunakan kamera smartphone standar tanpa peralatan mahal.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Tingkat Kesulitan</span>
              <span className="text-emerald-700 font-semibold">Ramah Pemula Total</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
