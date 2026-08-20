export function ScriptComparison() {
  return (
    <section className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink bg-sunflower border-2 border-ink px-3 py-1 shadow-brutal-sm mb-4">
            Bandingkan Kualitas
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-ink leading-[1.12]">
            Script Biasa vs Formula Psikologi Karsa
          </h2>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Left: Script Biasa */}
          <div className="bento-pop bg-rose-50/50 border-2 border-ink rounded-2xl p-6 sm:p-8 shadow-brutal">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink bg-rose-200 border-2 border-ink px-3 py-1 shadow-brutal-sm">
                ❌ Script Biasa / Prompt AI Mentah
              </span>
              <span className="text-xs font-mono font-bold text-rose-700">Retensi 2s</span>
            </div>

            <div className="space-y-4 mb-6">
              {/* Example 1 */}
              <div className="bg-surface border-2 border-ink rounded-xl p-4 shadow-brutal-sm">
                <div className="text-[9px] font-mono text-rose-400 mb-1 uppercase tracking-wider">Hook</div>
                <div className="text-sm text-ink/80 leading-relaxed font-mono">
                  &quot;Hey guys, today I want to talk about content creation tips that might help you...&quot;
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-surface border-2 border-ink rounded-xl p-4 shadow-brutal-sm">
                <div className="text-[9px] font-mono text-rose-400 mb-1 uppercase tracking-wider">Value</div>
                <div className="text-sm text-ink/80 leading-relaxed font-mono">
                  &quot;So basically you should try to post consistently and use good hashtags. Also engage with your audience...&quot;
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-rose-800 bg-rose-100/80 border border-rose-200 rounded-lg p-3">
              Hasil: Penonton langsung scroll lewat dalam 2 detik pertama.
            </div>
          </div>

          {/* Right: Formula Karsa */}
          <div className="bento-pop bg-wasabi/30 border-2 border-ink rounded-2xl p-6 sm:p-8 shadow-brutal mt-6 lg:mt-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink bg-wasabi border-2 border-ink px-3 py-1 shadow-brutal-sm">
                ✓ Formula Karsa Studio
              </span>
              <span className="text-xs font-mono font-bold text-ink">Retensi 85%</span>
            </div>

            <div className="space-y-4 mb-6">
              {/* Example 1 */}
              <div className="bg-surface border-2 border-ink rounded-xl p-4 shadow-brutal-sm">
                <div className="text-[9px] font-mono text-white bg-terracotta inline-block px-2 py-0.5 rounded mb-1 uppercase tracking-wider">Hook</div>
                <div className="text-sm text-ink leading-relaxed font-mono">
                  &quot;Kamu masih bikin konten satu-satu? Stop. Ada cara 30x lebih cepat — dan ini bukan clickbait.&quot;
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-surface border-2 border-ink rounded-xl p-4 shadow-brutal-sm">
                <div className="text-[9px] font-mono text-white bg-wasabiDark inline-block px-2 py-0.5 rounded mb-1 uppercase tracking-wider">Value</div>
                <div className="text-sm text-ink leading-relaxed font-mono">
                  &quot;Bayangkan punya 30 naskah siap rekam, ditulis kata-per-kata, semua dalam 24 jam. Tinggal buka Notion, rekam, post.&quot;
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-ink bg-wasabi/40 border border-wasabi rounded-lg p-3">
              Hasil: Penonton nonton sampai tuntas dan langsung klik link di bio.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
