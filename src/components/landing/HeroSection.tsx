import { ArrowRight, Eye, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column - Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink bg-sunflower border-2 border-ink px-3 py-1 shadow-brutal-sm mb-6">
              Stop pusing mikirin ide konten tiap malam!
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-ink leading-[1.12]">
              30 Hari konten organik, naskah kata-per-kata siap rekam.{" "}
              <span className="italic text-terracotta">Siap jadi.</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-ink/70 max-w-xl font-normal leading-relaxed">
              Bukan agensi lambat dengan rapat berminggu-minggu. Dapatkan 30 naskah video TikTok/Reels, 30 takarir Instagram, 4 artikel SEO Google, dan ruang kerja Notion terstruktur dalam 1x24 jam.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#order"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-terracotta hover:bg-terracotta/90 text-surface border-2 border-ink rounded-xl font-bold text-sm shadow-brutal transition min-h-[48px]"
              >
                <span>Mulai Order Batch</span>
                <span className="inline-flex items-center justify-center w-6 h-6 bg-wasabi rounded-full border border-ink">
                  <ArrowRight className="w-3.5 h-3.5 text-ink" />
                </span>
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface hover:bg-canvas text-ink border-2 border-ink rounded-xl font-bold text-sm shadow-brutal-sm transition badge-tag min-h-[48px]"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Contoh Script</span>
              </a>
            </div>

            {/* Proof Tiles */}
            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 max-w-md sm:max-w-lg font-mono text-[11px] sm:text-xs text-ink/60">
              <div className="bg-surface border-2 border-ink rounded-xl px-3 py-3 shadow-brutal-sm">
                <div className="text-ink font-bold text-sm sm:text-base">30</div>
                <div>Video Scripts</div>
              </div>
              <div className="bg-wasabi border-2 border-ink rounded-xl px-3 py-3 shadow-brutal-sm">
                <div className="text-ink font-bold text-sm sm:text-base">&lt; 24 Jam</div>
                <div>Waktu Proses</div>
              </div>
              <div className="bg-terracotta border-2 border-ink rounded-xl px-3 py-3 shadow-brutal-sm text-surface">
                <div className="font-bold text-sm sm:text-base">Rp299k</div>
                <div>Flat Harga</div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="lg:col-span-5 mt-12 lg:mt-0 flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[280px] sm:w-[300px] h-[580px] sm:h-[620px] bg-ink rounded-[38px] border-4 border-ink shadow-brutal-lg p-3">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-ink rounded-b-2xl z-20 flex items-center justify-between px-5">
                  <span className="text-[10px] font-mono text-white/90">09:41</span>
                </div>

                {/* Screen */}
                <div className="w-full h-full bg-stone-950 rounded-[30px] overflow-hidden flex flex-col relative">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between px-5 pt-10 pb-3">
                    <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">Teleprompter</span>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-terracotta bg-terracotta/20 border border-terracotta/40 rounded-full px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
                      REC
                    </span>
                  </div>

                  {/* Rolling Script Content */}
                  <div className="flex-1 overflow-hidden relative">
                    <div className="animate-teleprompter absolute inset-x-0 top-0 flex flex-col gap-3 px-4 pb-10">
                      {/* Script Block 1 */}
                      <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                        <div className="text-[9px] font-mono text-terracotta mb-1 uppercase tracking-wider">Hook</div>
                        <div className="text-[11px] text-white/90 leading-relaxed font-mono">
                          Kamu masih bikin konten satu-satu? Stop. Ada cara 30x lebih cepat...
                        </div>
                      </div>

                      {/* Script Block 2 */}
                      <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                        <div className="text-[9px] font-mono text-wasabi mb-1 uppercase tracking-wider">Value</div>
                        <div className="text-[11px] text-white/90 leading-relaxed font-mono">
                          Bayangkan punya 30 naskah siap rekam, ditulis kata-per-kata, semua dalam 24 jam.
                        </div>
                      </div>

                      {/* Script Block 3 */}
                      <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                        <div className="text-[9px] font-mono text-sunflower mb-1 uppercase tracking-wider">Story</div>
                        <div className="text-[11px] text-white/90 leading-relaxed font-mono">
                          Dulu aku spend 3 jam semalam cuma buat caption. Sekarang? Tinggal rekam.
                        </div>
                      </div>

                      {/* Script Block 4 */}
                      <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                        <div className="text-[9px] font-mono text-terracotta mb-1 uppercase tracking-wider">Hook</div>
                        <div className="text-[11px] text-white/90 leading-relaxed font-mono">
                          Ternyata rahasia konten viral bukan editing yang fancy...
                        </div>
                      </div>

                      {/* Script Block 5 */}
                      <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                        <div className="text-[9px] font-mono text-wasabi mb-1 uppercase tracking-wider">CTA</div>
                        <div className="text-[11px] text-white/90 leading-relaxed font-mono">
                          Klik link di bio, ambil slot batch minggu ini. Bonus script IG Reels gratis.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Controls */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-stone-800 bg-stone-950/80 backdrop-blur">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
                      <span className="text-[9px] font-mono text-white/60">02:34</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                        <Play className="w-3 h-3 text-white fill-white" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center border border-terracotta">
                        <span className="text-[9px] font-bold text-white">GO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
