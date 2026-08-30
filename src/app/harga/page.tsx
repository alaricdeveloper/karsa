import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { CtaBand } from "@/components/seo/CtaBand";

export const metadata: Metadata = {
  title: "Harga Paket Konten Karsa — Batch 30 Hari Rp299.000, Tanpa Langganan",
  description:
    "Harga paket konten Karsa Studio: 1 batch Rp299.000, 3 batch Rp799.000 (hemat Rp98.000), 6 batch Rp1.490.000 (hemat Rp304.000). Sekali bayar, tanpa auto-debit, garansi kalibrasi 48 jam.",
  alternates: { canonical: "/harga" },
  openGraph: {
    title: "Harga Paket Konten Karsa — Mulai Rp299.000",
    description: "1 batch Rp299.000. Sekali bayar, tanpa langganan, garansi kalibrasi 48 jam.",
    images: ["/og-image.png"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Batch Konten 30 Hari Karsa Studio",
  description:
    "Inventaris konten 30 hari untuk UMKM: 30 video scripts, 30 caption AIDA, 4 artikel SEO, audit kompetitor, Notion Content OS.",
  brand: { "@type": "Brand", name: "Karsa Studio" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "IDR",
    lowPrice: "299000",
    highPrice: "1490000",
    offerCount: "3",
    offers: [
      { "@type": "Offer", name: "1 Batch — 30 hari", price: "299000", priceCurrency: "IDR" },
      { "@type": "Offer", name: "3 Batch — 90 hari", price: "799000", priceCurrency: "IDR" },
      { "@type": "Offer", name: "6 Batch — 180 hari", price: "1490000", priceCurrency: "IDR" },
    ],
  },
};

const faqItems = [
  {
    q: "Apakah ada biaya bulanan atau langganan?",
    a: "Tidak. Satu harga flat per batch, tanpa langganan otomatis dan tanpa auto-debit. Kamu hanya membayar saat membutuhkan batch baru.",
  },
  {
    q: "Bagaimana cara pembayarannya?",
    a: "Pembayaran instan melalui QRIS dan Virtual Account di halaman checkout. Batch diproses sesuai urutan pembayaran.",
  },
  {
    q: "Apakah harga bisa berubah untuk pembelian batch tambahan?",
    a: "Untuk paket 6 batch, harga terkunci untuk penambahan batch. Untuk paket lain, harga mengikuti daftar harga yang berlaku.",
  },
  {
    q: "Apakah ada garansi jika hasilnya kurang sesuai?",
    a: "Ada garansi kalibrasi pesan 48 jam: penyesuaian istilah produk dan tone naskah gratis dalam 48 jam pertama, pembaruan Notion maksimal 12 jam kerja.",
  },
  {
    q: "Apakah ada diskon atau promo?",
    a: "Paket 3 batch dan 6 batch sudah termasuk diskon bawaan: hemat Rp98.000 untuk 3 batch dan Rp304.000 untuk 6 batch dibanding membeli satuan.",
  },
];

export default function HargaPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <section className="py-12 sm:py-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Transparan, Tanpa Kejutan
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink mt-4 leading-tight">
            Harga Paket Konten Karsa Studio
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-4 max-w-3xl">
            Satu harga flat, tanpa langganan otomatis, tanpa biaya tersembunyi. Setiap batch
            mencakup 30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, audit
            kompetitor, Notion Content OS, dan 5 bonus eksklusif.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Pilih ritme yang cocok dengan bisnismu</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: "1 Batch",
                price: "Rp299.000",
                tag: "Coba dulu",
                desc: "30 hari konten",
                features: [
                  "30 script + 30 caption",
                  "4 artikel SEO",
                  "Audit kompetitor",
                  "Notion OS + B-Roll guide",
                  "5 bonus eksklusif",
                  "Garansi kalibrasi 48 jam",
                ],
              },
              {
                name: "3 Batch",
                price: "Rp799.000",
                tag: "Hemat Rp98.000",
                desc: "90 hari konsisten",
                features: [
                  "Semua isi 1 Batch x3 (bertahap)",
                  "Prioritas antrean produksi",
                  "Data batch 1 dipakai untuk batch 2",
                  "Kalibrasi pesan diperpanjang",
                  "Harga terkunci",
                ],
              },
              {
                name: "6 Batch",
                price: "Rp1.490.000",
                tag: "Hemat Rp304.000",
                desc: "180 hari konsisten",
                features: [
                  "Semua isi 3 Batch",
                  "1 sesi kalibrasi strategi 30 menit / 2 bulan",
                  "Laporan tren performa per batch",
                  "Harga terkunci untuk penambahan",
                ],
              },
            ].map((p) => (
              <div key={p.name} className={`bento-pop rounded-3xl p-5 sm:p-6 flex flex-col ${p.name === "3 Batch" ? "bg-sunflower/40" : "bg-white"}`}>
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl text-ink">{p.name}</h2>
                  <span className="badge-tag px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-wasabi text-ink">{p.tag}</span>
                </div>
                <div className="font-serif text-3xl text-terracotta mt-2">{p.price}</div>
                <div className="text-[11px] text-stone-500 font-mono mt-1">{p.desc}</div>
                <ul className="mt-4 space-y-2 text-xs font-sans flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-ink">
                      <span className="text-terracotta font-mono font-bold">&check;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#order"
                  className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ink text-canvas font-mono text-sm font-bold hover:bg-terracotta hover:text-ink transition min-h-[48px]"
                >
                  Pilih {p.name} <span>&rarr;</span>
                </a>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 font-mono mt-5">
            Pembayaran QRIS &amp; Virtual Account. SLA pengiriman maksimal 1x24 jam kerja per batch.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Karsa vs biaya konten lainnya</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="py-3 pr-4 font-bold">Pilihan</th>
                  <th className="py-3 pr-4 font-bold">Biaya per bulan</th>
                  <th className="py-3 pr-4 font-bold">Output</th>
                  <th className="py-3 font-bold">Komitmen</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Karsa Studio (1 batch)", "Rp299.000", "30 script + caption + 4 artikel SEO + Notion OS", "Sekali bayar"],
                  ["Content creator UMKM", "Rp2-8 juta", "Konten sesuai briefing bulanan", "Gaji + kontrak"],
                  ["Agensi konten", "Rp5-20 juta", "Produksi + manajemen lengkap", "Kontrak bulanan"],
                  ["Freelancer per konten", "Rp150-500 rb/konten", "Bervariasi", "Per proyek"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-stone-200">
                    <td className="py-2.5 pr-4 font-bold">{row[0]}</td>
                    <td className="py-2.5 pr-4">{row[1]}</td>
                    <td className="py-2.5 pr-4">{row[2]}</td>
                    <td className="py-2.5">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-stone-500 font-mono mt-3">
            Perbandingan berdasarkan harga umum pasar Indonesia per 2026. Angka dapat berbeda sesuai kota dan skala kebutuhan.
          </p>
        </div>
      </section>

      <FaqBlock items={faqItems} title="FAQ Harga & Pembayaran" />
      <CtaBand
        headline="Satu batch, semua fondasi kontenmu."
        sub="Amankan slot minggu ini — antrean produksi diproses sesuai urutan pembayaran."
      />
    </PageShell>
  );
}