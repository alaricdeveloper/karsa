export function DeliverablesGrid() {
  return (
    <section id="deliverables" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
              Output Komplit
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">
              6 Output Utama yang Kamu Terima
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-600 mt-2 md:mt-0 font-bold">
            Format: Notion Dynamic Database + Docs Backup
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Module 1: Video Scripts */}
          <div id="modul-video" className="md:col-span-2 bento-pop p-5 sm:p-8 rounded-3xl">
            <div className="flex justify-between items-start mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                01
              </div>
              <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">
                Video Scripts
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">
              30 Video Scripts Kata-per-Kata
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Format vertikal 15-30 detik untuk TikTok, Reels, dan Shorts lengkap dengan pembagian per detik: Visual &amp; Audio Hook (0-3s), Problem Framing, Value Solution, dan Call To Action (CTA).
            </p>
            <div className="mt-4 p-3 sm:p-3.5 bg-canvas border-2 border-ink rounded-2xl font-mono text-xs space-y-1 shadow-brutal-sm">
              <div>
                <strong className="text-terracotta">&bull; Hook:</strong> Pancingan scroll instan tanpa basa-basi.
              </div>
              <div>
                <strong className="text-ink">&bull; Audio Cues:</strong> Rekomendasi sound komersial aman lisensi.
              </div>
            </div>
          </div>

          {/* Module 2: Captions */}
          <div id="modul-caption" className="bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                  02
                </div>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">
                  Captions &amp; Copy
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">
                30 Captions AIDA &amp; 15 Tagar
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                Copywriting formula Attention, Interest, Desire, Action siap copy-paste ke Instagram &amp; Threads lengkap dengan 3 tier tagar relevan.
              </p>
            </div>
            <span className="text-xs font-mono text-stone-500 mt-4 block pt-3 border-t-2 border-ink">
              120-180 Kata per Post
            </span>
          </div>

          {/* Module 3: SEO Articles */}
          <div id="modul-seo" className="bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-canvas border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                  03
                </div>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-wasabi rounded font-bold">
                  Google Traffic
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">
                4 Artikel Blog SEO (1.000 Kata)
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                Artikel pilar panjang dengan susunan heading H1/H2/H3 dan meta deskripsi untuk mendatangkan traffic pembeli gratis dari Google.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-800 font-bold mt-4 block pt-3 border-t-2 border-ink">
              Format Markdown &amp; Docs
            </span>
          </div>

          {/* Module 4: Competitor Radar */}
          <div id="modul-radar" className="bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-terracottaLight text-terracotta border-2 border-ink flex items-center justify-center font-mono font-bold shadow-brutal-sm">
                  04
                </div>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">
                  Teardown
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">
                Audit Angle &amp; Gap Kompetitor
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                Analisis positioning 1 akun kompetitor utama untuk menemukan sudut pesan unik yang belum digarap di pasar tokomu.
              </p>
            </div>
            <span className="text-xs font-mono text-stone-500 mt-4 block pt-3 border-t-2 border-ink">
              Positioning Blueprint
            </span>
          </div>

          {/* Module 5: Notion Dynamic OS */}
          <div id="modul-notion" className="bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                  05
                </div>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">
                  Database
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">
                Notion Content OS
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                Database Notion siap 1-klik duplicate dengan Calendar View, Kanban status produksi, dan kolom asset management yang rapi.
              </p>
            </div>
            <span className="text-xs font-mono text-stone-500 mt-4 block pt-3 border-t-2 border-ink">
              1-Click Duplicate
            </span>
          </div>

          {/* Module 6: B-Roll & Shot List */}
          <div id="modul-broll" className="md:col-span-2 bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                  06
                </div>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">
                  Shot List
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">
                Panduan B-Roll &amp; Visual Kamera HP
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                Panduan sudut kamera, pencahayaan alami jendela, dan gestur visual yang gampang direkam sendiri pakai HP tanpa perlu sewa studio atau alat mahal.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-800 font-bold mt-4 block pt-3 border-t-2 border-ink">
              Level: Ramah Pemula Total
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
