import { Video, MessageSquare, Search, Compass, Calendar, Film } from "lucide-react";

export function DeliverablesGrid() {
  return (
    <section id="deliverables" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="badge-tag inline-block text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-sunflower text-ink px-2.5 py-1 mb-2">
              Output Komplit
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-1 sm:mt-2">
              Semua yang Anda terima dalam 1 Paket
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ink/60 mt-2 md:mt-0 font-mono">
            Format Master: Notion Dynamic Database + Backup Docs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Module 1: Video Scripts */}
          <div
            id="modul-video"
            className="md:col-span-2 bento-pop p-6 sm:p-8 rounded-3xl"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-wasabi border-2 border-ink shadow-brutal-sm rounded-lg font-mono text-xs font-bold text-ink">
                01
              </span>
              <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-wasabi text-ink">
                Modul 01 &bull; Video Engine
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-ink">
              30 Naskah Video Pendek (TikTok, Reels, Shorts)
            </h3>
            <p className="text-ink/60 text-xs sm:text-sm mt-2 leading-relaxed">
              Naskah kata-per-kata yang dirancang dengan formula retensi tinggi untuk durasi ideal 15–30 detik.
            </p>
            <div className="mt-4 p-3.5 bg-white border-2 border-ink rounded-xl font-mono text-[11px] sm:text-xs text-ink space-y-1">
              <div>
                <span className="font-bold text-terracotta">Hook:</span>{" "}
                Menghentikan scroll penonton seketika.
              </div>
              <div>
                <span className="font-bold text-ink">Audio Cues:</span>{" "}
                Membedah masalah spesifik audiens Anda.
              </div>
              <div>
                <span className="font-bold text-terracotta">Hook:</span>{" "}
                Menampilkan produk Anda sebagai solusi logis.
              </div>
              <div>
                <span className="font-bold text-ink">Audio Cues:</span>{" "}
                Memicu komentar, klik link bio, atau direct message.
              </div>
            </div>
          </div>

          {/* Module 2: Captions */}
          <div
            id="modul-caption"
            className="bento-pop p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-sunflower border-2 border-ink shadow-brutal-sm rounded-lg font-mono text-xs font-bold text-ink">
                  02
                </span>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-sunflower text-ink">
                  Modul 02
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-ink">
                30 Takarir AIDA &amp; 15 Riset Tagar
              </h3>
              <p className="text-ink/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Takarir media sosial terstruktur untuk memicu interaksi (saves &amp; shares) lengkap dengan kurasi tagar relevan tanpa spam.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t-2 border-ink flex items-center justify-between text-[11px] font-mono text-ink/50">
              <span>Panjang</span>
              <span>120–180 Kata / Post</span>
            </div>
          </div>

          {/* Module 3: SEO Articles */}
          <div
            id="modul-seo"
            className="bento-pop p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-canvas border-2 border-ink shadow-brutal-sm rounded-lg font-mono text-xs font-bold text-ink">
                  03
                </span>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas text-ink">
                  Modul 03
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-ink">
                4 Artikel Blog SEO
              </h3>
              <p className="text-ink/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Artikel 800–1.200 kata dengan penataan judul (H1/H2/H3), density kata kunci natural, dan meta deskripsi untuk mendatangkan pembeli dari Google.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t-2 border-ink flex items-center justify-between text-[11px] font-mono text-ink/50">
              <span>Format</span>
              <span className="text-wasabi font-semibold">Markdown &amp; Docs</span>
            </div>
          </div>

          {/* Module 4: Competitor Radar */}
          <div
            id="modul-radar"
            className="bento-pop p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-terracottaLight border-2 border-ink shadow-brutal-sm rounded-lg font-mono text-xs font-bold text-ink">
                  04
                </span>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-terracottaLight text-ink">
                  Modul 04
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-ink">
                Audit Angle &amp; Gap Kompetitor
              </h3>
              <p className="text-ink/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Analisis terhadap 1 akun kompetitor utama untuk menemukan sudut pandang pesan yang belum digarap di industri Anda.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t-2 border-ink flex items-center justify-between text-[11px] font-mono text-ink/50">
              <span>Output</span>
              <span>Positioning Blueprint</span>
            </div>
          </div>

          {/* Module 5: Notion Dynamic OS */}
          <div
            id="modul-notion"
            className="bento-pop p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-sunflower border-2 border-ink shadow-brutal-sm rounded-lg font-mono text-xs font-bold text-ink">
                  05
                </span>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-sunflower text-ink">
                  Modul 05
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-ink">
                Notion Content OS
              </h3>
              <p className="text-ink/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Database Notion terintegrasi dengan Calendar View, Kanban Status Posting, dan manajemen aset yang siap diduplikasi.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t-2 border-ink flex items-center justify-between text-[11px] font-mono text-ink/50">
              <span>Akses</span>
              <span>1-Click Duplicate</span>
            </div>
          </div>

          {/* Module 6: B-Roll & Shot List */}
          <div
            id="modul-broll"
            className="md:col-span-2 bento-pop p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-wasabi border-2 border-ink shadow-brutal-sm rounded-lg font-mono text-xs font-bold text-ink">
                  06
                </span>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-wasabi text-ink">
                  Modul 06
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-ink">
                Panduan B-Roll &amp; Visual Kamera HP
              </h3>
              <p className="text-ink/60 text-xs sm:text-sm mt-2 leading-relaxed">
                Daftar referensi pengambilan visual b-roll (sudut kamera, pencahayaan alami, gestur tangan) yang bisa dieksekusi sendiri menggunakan kamera smartphone standar tanpa peralatan mahal.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-ink flex items-center justify-between text-[11px] font-mono text-ink/50">
              <span>Tingkat Kesulitan</span>
              <span className="text-wasabi font-semibold">Ramah Pemula Total</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
