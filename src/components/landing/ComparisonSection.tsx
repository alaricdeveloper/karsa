"use client";

export function ComparisonSection() {
  return (
<section id="komparasi" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Perbandingan Jujur</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Karsa vs Agensi vs In-house vs Prompt AI.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">Kami tunjukkan perbandingannya apa adanya, biar kamu yang memutuskan.</p>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="compare-table min-w-[760px]">
                <thead>
                  <tr>
                    <th className="w-[22%]">Aspek</th>
                    <th className="w-[24%]">Karsa Studio</th>
                    <th>Agensi</th>
                    <th>In-house</th>
                    <th>AI Prompt Mentah</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-sans">
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Biaya per bulan</td>
                    <td className="bg-wasabi/30 font-bold">Rp299 ribu sekali bayar</td>
                    <td className="text-stone-600">Rp5-20 juta</td>
                    <td className="text-stone-600">Rp4-8 juta (gaji 1 orang)</td>
                    <td className="text-stone-600">Rp0-500 ribu (langganan AI)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Waktu mulai</td>
                    <td className="bg-wasabi/30 font-bold">24 jam kerja</td>
                    <td className="text-stone-600">2-4 minggu</td>
                    <td className="text-stone-600">1-3 bulan rekrut &amp; ramp-up</td>
                    <td className="text-stone-600">Instan</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Riset kompetitor</td>
                    <td className="bg-wasabi/30 font-bold">Audit 1 akun acuan</td>
                    <td className="text-stone-600">Tergantung proposal</td>
                    <td className="text-stone-600">Manual, menyita waktu</td>
                    <td className="text-stone-600">Tidak ada</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Kualitas naskah</td>
                    <td className="bg-wasabi/30 font-bold">Kata-per-kata + cue visual/audio</td>
                    <td className="text-stone-600">Bervariasi per tim</td>
                    <td className="text-stone-600">Bergantung skill individu</td>
                    <td className="text-stone-600">Generik, butuh edit manual</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Kontrol brand voice</td>
                    <td className="bg-wasabi/30 font-bold">100% — kamu pegang tone &amp; kata</td>
                    <td className="text-stone-600">Medium — lewat rapat &amp; approval</td>
                    <td className="text-stone-600">Tinggi</td>
                    <td className="text-stone-600">Rendah — susah konsisten</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Kepemilikan aset</td>
                    <td className="bg-wasabi/30 font-bold">100% milik kamu setelah serah terima</td>
                    <td className="text-stone-600">Sering tertahan kontrak</td>
                    <td className="text-stone-600">100%</td>
                    <td className="text-stone-600">100%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Komitmen kontrak</td>
                    <td className="bg-wasabi/30 font-bold">Tanpa kontrak, tanpa langganan</td>
                    <td className="text-stone-600">3-6 bulan minimal</td>
                    <td className="text-stone-600">Kontrak kerja</td>
                    <td className="text-stone-600">Tanpa kontrak</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">SLA / garansi</td>
                    <td className="bg-wasabi/30 font-bold">24 jam + kalibrasi 48 jam</td>
                    <td className="text-stone-600">Tergantung kontrak</td>
                    <td className="text-stone-600">Tidak ada</td>
                    <td className="text-stone-600">Tidak ada</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-stone-500 font-mono mt-5">Perbandingan berdasarkan harga umum pasar Indonesia per 2026. Angka dapat berbeda sesuai kota dan skala kebutuhan.</p>
          </div>
        </section>
  );
}
