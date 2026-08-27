"use client";

import { Sun, Frame, Mic, Image, Hand, Clapperboard, Music2, PlaySquare, AtSign } from "lucide-react";

export function ResourcesTab() {
  return (
<section id="view-resources" role="tabpanel" aria-labelledby="tab-nav-resources" className="space-y-6 sm:space-y-8">
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-terracottaLight border-2 border-ink flex items-center justify-center font-mono font-bold text-sm text-ink shadow-brutal-sm shrink-0">04</span>
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Panduan Rekam & Formula</h2>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Field manual member — rekam pakai HP, hook penahan scroll.</p>
            </div>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Panduan Rekam Video Modal Kamera HP</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Sun className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Pencahayaan Alami (Window Light)</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Duduk menghadap jendela besar 45 derajat. Hindari backlight agar wajah jernih tanpa perlu beli lampu studio mahal.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Frame className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Eye-Level Framing</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Posisikan lensa HP setinggi mata (gunakan tripod meja). Sisakan sedikit ruang di atas kepala (*headroom*).</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-terracottaLight border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Mic className="w-4 h-4 text-terracotta" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Audio Jernih & Teleprompter</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Gunakan mic lavalier clip-on murah dan letakkan HP sejajar layar laptop untuk membaca teks Karsa di Customer Hub.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Image className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Ruang & Backdrop Berlapis</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Latar bersih dengan jarak 1—2 meter dari dinding. Satu objek brand (packaging, logo) di frame sudah cukup — jangan penuh barang.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Hand className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Gestur & Ekspresi</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Angkat produk saat menyebut namanya, tunjuk ke arah teks saat poin penting. Ekspresi dibuat 20% lebih besar dari yang terasa wajar.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Clapperboard className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Take Cadangan & B-Roll</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Rekam 2—3 take per naskah dan 5 detik b-roll produk di sela adegan — bahan cadangan cut yang bikin video terasa profesional.</p>
              </div>
            </div>
          </section>

          <section className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
            <div className="readout-grid font-mono text-xs">
              <div className="readout-cell space-y-2">
                <div className="flex items-center gap-2">
                  <Clapperboard className="w-4 h-4 text-terracotta" />
                  <span className="font-bold text-ink">Instagram Reels</span>
                </div>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">9:16 · 15—90 detik<br />Naskah dipotong hook 3 detik terkuat di frame pertama.</p>
              </div>
              <div className="readout-cell space-y-2">
                <div className="flex items-center gap-2">
                  <Music2 className="w-4 h-4 text-ink" />
                  <span className="font-bold text-ink">TikTok</span>
                </div>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">9:16 · 15—60 detik<br />Caption padat + 3 tagar relevan, teks hook besar di 2 detik awal.</p>
              </div>
              <div className="readout-cell space-y-2 bg-wasabi/30">
                <div className="flex items-center gap-2">
                  <PlaySquare className="w-4 h-4" />
                  <span className="font-bold text-ink">YouTube Shorts</span>
                </div>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">9:16 · maks 60 detik<br />Judul + deskripsi SEO sudah disiapkan tiap video.</p>
              </div>
              <div className="readout-cell space-y-2">
                <div className="flex items-center gap-2">
                  <AtSign className="w-4 h-4 text-terracotta" />
                  <span className="font-bold text-ink">Threads / X</span>
                </div>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Teks + gambar<br />Takarir AIDA dipisah jadi thread 3—4 bagian siap salin.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Waktu Posting Terbaik untuk UMKM</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="readout-grid font-mono text-xs">
                <div className="readout-cell space-y-1.5">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-sunflower text-ink font-bold text-[10px]">06.00 — 09.00</span>
                  <h4 className="font-serif font-bold text-base text-ink">Pagi · Edukasi</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Konten edukasi & tips — orang cari solusi sebelum mulai kerja.</p>
                </div>
                <div className="readout-cell space-y-1.5">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">11.00 — 13.00</span>
                  <h4 className="font-serif font-bold text-base text-ink">Siang · Hiburan</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Jam istirahat — konten ringan, meme, dan behind-the-scene.</p>
                </div>
                <div className="readout-cell space-y-1.5 bg-sunflower/20">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-sunflower text-ink font-bold text-[10px]">16.00 — 19.00</span>
                  <h4 className="font-serif font-bold text-base text-ink">Sore · Bukti Sosial</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Pulang kerja — testimoni, review, dan proses produksi paling dicari.</p>
                </div>
                <div className="readout-cell space-y-1.5 bg-wasabi/40">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-wasabi text-ink font-bold text-[10px]">19.00 — 22.00</span>
                  <h4 className="font-serif font-bold text-base text-ink">Malam · Jualan</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Jam keputusan beli tertinggi — tempatkan naskah CTA & promo di sini.</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-stone-600 font-sans">Kalender 30 hari Karsa sudah menyusun pilar konten sesuai jam posting ini — kamu tinggal rekam dan unggah.</p>
          </section>

          <section className="bento-pop p-6 sm:p-8 rounded-3xl space-y-4 font-mono text-xs bg-canvas">
            <h3 className="font-serif font-bold text-xl sm:text-3xl text-ink">Formula Hook Penahan Scroll 3 Detik</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 text-stone-800">
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-terracotta block font-bold text-xs">1. The Common Mistake (Pola Penyangkalan)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Berhenti lakukan [kebiasaan salah], ini alasan kenapa tokomu sepi..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-wasabiDark block font-bold text-xs">2. The Radical Contrast (Perbandingan Ekstrem)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Cara orang biasa vs cara brand 100 juta closing pembeli pertama..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-ink block font-bold text-xs">3. Specific Callout (Pemanggilan Niche)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Khusus buat kamu yang jualan [niche] tapi capek banting harga..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-terracotta block font-bold text-xs">4. The Secret Shortcut (Jalan Pintas Efisien)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Satu metode yang bikin aku hemat 20 jam kerja minggu ini..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-wasabiDark block font-bold text-xs">5. Before-After Transformation (Transformasi Nyata)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Dulu [kondisi buruk], sekarang [hasil] — perubahan dalam 30 hari..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-ink block font-bold text-xs">6. Number Stack (Tumpukan Langkah)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"3 langkah sederhana buat [hasil] tanpa [usaha besar]..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-terracotta block font-bold text-xs">7. Proof Challenge (Tantangan Bukti)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Buktikan sendiri dalam 7 hari — kalau nggak [hasil], [konsekuensi]..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-wasabiDark block font-bold text-xs">8. Question Hook (Pertanyaan Menusuk)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Pernah ngerasain [masalah] padahal udah coba segalanya?..."</em></p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Anatomi Takarir AIDA</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="space-y-0 divide-y-2 divide-ink">
                <div className="p-5 sm:p-6 flex items-start gap-4">
                  <span className="badge-tag px-2.5 py-1 rounded bg-sunflower text-ink font-mono text-[10px] font-bold shrink-0">A</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink">Attention — 1 kalimat pembuka yang menghentikan scroll</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">"Bukan produk Anda yang sepi peminat, cara penyampaian pesannya yang belum menyentuh masalah utama audiens."</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex items-start gap-4">
                  <span className="badge-tag px-2.5 py-1 rounded bg-canvas text-ink font-mono text-[10px] font-bold shrink-0">I</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink">Interest — jaga rasa penasaran dengan kontras</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">"Saat Anda menjual fitur, orang bosan. Saat Anda menjual penghematan waktu, mereka langsung checkout."</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex items-start gap-4">
                  <span className="badge-tag px-2.5 py-1 rounded bg-terracottaLight text-ink font-mono text-[10px] font-bold shrink-0">D</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink">Desire — bangun keinginan dengan bukti konkret</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">"Kami menyusun 30 hari kalender konten berdasarkan audit celah kompetitor dan psikologi audiens spesifik Anda."</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex items-start gap-4 bg-wasabi/40">
                  <span className="badge-tag px-2.5 py-1 rounded bg-wasabi text-ink font-mono text-[10px] font-bold shrink-0">A</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink">Action — satu ajakan spesifik + tagar</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">"📌 Simpan postingan ini untuk referensi minggu depan! #karsastudio #kontenmarketing #umkmindonesia"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
  );
}
