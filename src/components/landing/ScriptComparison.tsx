export function ScriptComparison() {
  return (
    <section id="compare-scripts" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Bandingkan Kualitas</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Script generik vs formula Karsa</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Setiap naskah punya alasan di balik hook, visual, ritme, dan CTA-nya.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs">
          
          {/* BEFORE: GENERIC SCRIPT */}
          <div className="bento-pop p-5 sm:p-6 rounded-3xl bg-rose-50/50 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center pb-2.5 border-b-2 border-ink">
              <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-200 text-ink">❌ Script Biasa / Prompt AI Mentah</span>
            <span className="text-rose-700 font-bold">Hook lemah</span>
            </div>
            <div className="space-y-2.5 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
              <div className="p-3 sm:p-3.5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm">
                <strong className="font-mono text-rose-800 text-[11px] sm:text-xs block mb-1">Opening Basi & Membosankan:</strong>
                &quot;Halo guys! Kali ini aku mau kenalin produk baru dari brand kita nih. Kopi ini dibuat dari biji pilihan berkualitas...&quot;
              </div>
              <div className="p-3 sm:p-3.5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm">
                <strong className="font-mono text-rose-800 text-[11px] sm:text-xs block mb-1">Tanpa Cue Visual:</strong>
                Talent berdiri kaku di depan kamera sambil ngomong monoton tanpa variasi ekspresi atau angle rekam.
              </div>
            </div>
            <p className="text-[11px] font-bold text-rose-800 pt-2 border-t-2 border-ink">Masalah: opening tidak memberi alasan untuk terus menonton.</p>
          </div>

          {/* AFTER: KARSA PSYCHOLOGY FORMULA */}
          <div className="bento-pop p-5 sm:p-6 rounded-3xl bg-wasabi/30 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center pb-2.5 border-b-2 border-ink">
              <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-wasabi text-ink">✓ Formula Karsa Studio</span>
            <span className="text-ink font-bold">Struktur jelas</span>
            </div>
            <div className="space-y-2.5 font-sans text-xs sm:text-sm text-stone-900 leading-relaxed">
              <div className="p-3 sm:p-3.5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm">
                <strong className="font-mono text-terracotta text-[11px] sm:text-xs block mb-1">[00:00 - 00:03] HOOK PENYANGKALAN:</strong>
                &quot;Berhenti minum kopi sachet kalau jam 2 siang lambungmu selalu kembung. Ini cara simpel ngatasinnya...&quot;
              </div>
              <div className="p-3 sm:p-3.5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm">
                <strong className="font-mono text-wasabiDark text-[11px] sm:text-xs block mb-1">[00:03 - 00:18] VALUE DELIVERY & PROOF:</strong>
                Tunjukkan visual es batu retak dalam gelas cold brew (ASMR) dan jelaskan alasan pH rendah asam secara visual.
              </div>
            </div>
            <p className="text-[11px] font-bold text-ink pt-2 border-t-2 border-ink">Tujuan: membuat pesan lebih mudah dipahami dan ditindaklanjuti.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
