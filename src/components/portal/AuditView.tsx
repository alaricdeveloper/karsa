import type { Order } from "@/lib/types";

export function AuditView({ order }: { order: Order }) {
  const comp = order.competitor || "kompetitor utama";

  const strengths = [
    `Konten ${order.brand} berdiri di posisi yang jarang diisi ${comp}: edukasi yang jujur, bukan hard-selling.`,
    "Konsistensi nada bicara membangun kepercayaan jangka panjang.",
    "Cakupan kategori yang spesifik membuat setiap naskah terasa personal.",
  ];

  const weaknesses = [
    "Riset kompetitor terbatas pada akun publik; riset pasar primer belum tersedia.",
    "Data kompetitor (frekuensi, engagement) adalah estimasi demo, bukan angka resmi.",
    "Audit ini disusun dari satu brief — validasi ulang disarankan saat batch kedua.",
  ];

  const gaps = [
    { they: "Kompetitor memakai konten hard-selling statis", we: "Karsa menyusun naskah edukasi + storytelling yang membangun trust dulu, jualan kemudian" },
    { they: "Hook umum yang bisa dipakai siapa saja", we: "Hook perbandingan langsung (before-after) spesifik untuk kategori Anda" },
    { they: "CTA menumpuk di satu tempat (bioshop)", we: "CTA tersebar harian: DM, komentar, dan link bio sesuai konteks hari" },
    { they: "Frekuensi tidak terjadwal", we: "Kalender 30 hari terjadwal dengan pilar yang bergilir" },
  ];

  const angleMap = [
    { pillar: "Edukasi Nilai", days: "Day 01, 05, 09, 13, 17, 21, 25, 29", angle: "Bangun kepercayaan lewat tips & standar kualitas" },
    { pillar: "Storytelling Nyata", days: "Day 02, 06, 10, 14, 18, 22, 26, 30", angle: "Manusiawi-kan brand lewat kisah nyata & proses" },
    { pillar: "Hard Sell & Promo", days: "Day 03, 07, 11, 15, 19, 23, 27", angle: "Konversi dengan urgensi & penawaran terbatas" },
    { pillar: "Mitos vs Fakta", days: "Day 04, 08, 12, 16, 20, 24, 28", angle: "Beda dari pasar dengan membantah mitos kategori" },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl bg-terracottaLight text-terracotta border-2 border-ink shadow-brutal-sm flex items-center justify-center font-mono font-bold text-sm shrink-0">
          04
        </span>
        <div>
          <h2 className="font-serif font-normal text-xl sm:text-2xl text-ink leading-tight">Audit Angle Kompetitor</h2>
          <p className="text-[10px] sm:text-xs text-inkMuted font-mono font-bold">Posisi pasar dan celah yang dipakai tim kami menyusun naskah Anda.</p>
        </div>
      </div>

      <div className="bento-pop p-6 sm:p-8 rounded-3xl font-mono text-xs space-y-4 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="badge-tag px-3 py-1 rounded-full text-[10px] font-bold bg-sunflower text-ink">Positioning &amp; Gap Analysis</span>
          <span className="text-[10px] text-inkMuted font-bold">Data estimasi (demo) dari brief &amp; audit akun publik</span>
        </div>
        <h3 className="font-serif font-normal text-xl sm:text-2xl text-ink">Audit Celah Pasar &amp; Sudut Diferensiasi</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
            <span className="text-ink font-mono text-[10px] font-bold block mb-1 uppercase">Profil Kompetitor</span>
            <p className="font-sans text-stone-800 text-xs leading-relaxed">
              Target audit: <strong>{comp}</strong>. Kategori: {order.category}. Frekuensi posting: ±3-5/minggu (estimasi). Ciri konten: hard-selling statis, hook umum, CTA terpusat di bioshop.
            </p>
          </div>
          <div className="p-4 bg-wasabi/30 border-2 border-ink rounded-2xl">
            <span className="text-wasabiDark font-mono text-[10px] font-bold block mb-1 uppercase">Kelebihan Kami</span>
            <ul className="list-disc pl-5 font-sans text-stone-800 text-xs space-y-1">
              {strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-terracottaLight border-2 border-ink rounded-2xl">
            <span className="text-terracotta font-mono text-[10px] font-bold block mb-1 uppercase">Batasan Audit</span>
            <ul className="list-disc pl-5 font-sans text-stone-800 text-xs space-y-1">
              {weaknesses.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
            <span className="text-ink font-mono text-[10px] font-bold block mb-1 uppercase">Peta Angle per Pilar</span>
            <div className="space-y-1.5 font-sans text-xs text-stone-800">
              {angleMap.map((a) => (
                <div key={a.pillar}>
                  <span className="font-mono font-bold text-[10px] text-terracotta">{a.pillar}</span>
                  <span className="block text-[11px]">{a.days}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <span className="text-ink font-mono text-[10px] font-bold block mb-2 uppercase">Tabel Gap: Kompetitor vs Rekomendasi Kami</span>
          <div className="space-y-2">
            {gaps.map((g) => (
              <div key={g.they} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-3 bg-canvas border-2 border-ink rounded-xl font-sans text-xs text-stone-800">
                  <span className="font-mono font-bold text-[10px] text-stone-600 block mb-0.5">MEREKA</span>
                  {g.they}
                </div>
                <div className="p-3 bg-wasabi/30 border-2 border-ink rounded-xl font-sans text-xs text-stone-800">
                  <span className="font-mono font-bold text-[10px] text-wasabiDark block mb-0.5">KAMI</span>
                  {g.we}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}