import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { CtaBand } from "@/components/seo/CtaBand";

export const metadata: Metadata = {
  title: "Jasa Konten Video UMKM 30 Hari — 30 Script + 4 Artikel SEO, Mulai Rp299.000",
  description:
    "Jasa konten video UMKM 30 hari: 30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, audit kompetitor, dan Notion OS — dikirim 1x24 jam kerja. Mulai Rp299.000.",
  alternates: { canonical: "/jasa-konten-video-umkm" },
  openGraph: {
    title: "Jasa Konten Video UMKM 30 Hari — Mulai Rp299.000",
    description: "Kalender konten 30 hari lengkap: script, caption, artikel SEO, Notion OS.",
    images: ["/og-image.png"],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa Konten Video UMKM 30 Hari",
  serviceType: "Content Marketing",
  description:
    "Jasa pembuatan kalender konten video 30 hari untuk UMKM Indonesia: 30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, audit kompetitor, dan Notion Content OS — dikirim dalam 1x24 jam kerja.",
  provider: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  areaServed: { "@type": "Country", name: "Indonesia" },
  availableLanguage: "id",
  offers: { "@type": "Offer", price: "299000", priceCurrency: "IDR" },
};

const faqItems = [
  {
    q: "Apa bedanya jasa konten video UMKM ini dengan jasa shooting?",
    a: "Kami menyediakan sistem konten (naskah, caption, kalender, artikel SEO), bukan produksi video di lokasi. Kamu atau tim merekam sendiri dengan HP — setiap naskah sudah berisi panduan visual dan shot list.",
  },
  {
    q: "Cocok untuk bisnis seperti apa?",
    a: "Untuk UMKM yang sudah punya produk siap jual, bisa merekam dengan HP atau punya satu talent, dan butuh posting konsisten 30 hari tanpa pusing mikir ide tiap minggu.",
  },
  {
    q: "Platform apa saja yang didukung?",
    a: "Format vertikal 15-30 detik siap untuk TikTok, Instagram Reels, dan YouTube Shorts. Caption AIDA bisa langsung dipakai di Instagram, TikTok, dan Facebook.",
  },
  {
    q: "Apakah ada jaminan jika naskah kurang cocok?",
    a: "Ada garansi kalibrasi pesan 48 jam: istilah produk dan tone naskah bisa disesuaikan, dengan pembaruan Notion maksimal 12 jam kerja.",
  },
];

export default function JasaKontenVideoUmkmPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="py-12 sm:py-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">
            Paling Laris
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink mt-4 leading-tight">
            Jasa Konten Video UMKM — Sistem 30 Hari, Bukan Sekadar Ide
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-4 max-w-3xl">
            Sebagian besar UMKM gagal konsisten bukan karena kurang niat, tapi karena{" "}
            <strong className="text-ink">sistem kontennya belum ada</strong>. Karsa mengubah brief
            singkat menjadi sistem produksi 30 hari: script siap rekam, caption siap tempel,
            artikel siap publish, dan kalender yang menghilangkan kebingungan tiap minggu.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta text-ink hover:text-white font-mono text-sm font-bold hover:bg-ink transition shadow-brutal-sm min-h-[48px]"
            >
              Mulai dengan Brief — Rp299.000 <span>&rarr;</span>
            </a>
            <a
              href="https://wa.me/6281288009920?text=Halo%2C%20saya%20mau%20tanya%20paket%20konten%20video%20UMKM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-wasabi text-ink font-mono text-sm font-bold hover:bg-canvas transition shadow-brutal-sm min-h-[48px]"
            >
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">6 output utama yang kamu terima</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { t: "30 Video Scripts Kata-per-Kata", d: "Format vertikal 15-30 detik untuk TikTok, Reels, dan Shorts — lengkap dengan visual & audio hook per detik dan CTA." },
              { t: "30 Caption Struktur AIDA", d: "Attention, Interest, Desire, Action — caption siap tempel dengan riset tagar 3 tier." },
              { t: "4 Artikel Blog SEO (1.000 Kata)", d: "Artikel pilar dengan susunan H1/H2/H3 dan meta deskripsi untuk mendatangkan traffic pembeli gratis dari Google." },
              { t: "Audit Angle & Gap Kompetitor", d: "Analisis positioning satu akun kompetitor utama untuk menemukan sudut pesan unik yang belum digarap." },
              { t: "Notion Content OS", d: "Database siap 1-klik duplicate: Calendar View, Kanban status produksi, dan kolom asset management." },
              { t: "Panduan B-Roll Kamera HP", d: "Sudut kamera, pencahayaan alami jendela, dan gestur visual yang bisa direkam sendiri tanpa sewa studio." },
            ].map((o) => (
              <div key={o.t} className="bento-pop bg-white rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-ink">{o.t}</h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 leading-relaxed">{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Kenapa video pendek, bukan feed statis?</h2>
          <div className="mt-6 space-y-3">
            {[
              { t: "Algoritma menyukai retention", d: "Video 15-30 detik yang ditonton penuh memberi sinyal kuat ke algoritma — postingan berikutnya mendapat jangkauan lebih besar." },
              { t: "DM adalah aset penjualan", d: "Setiap video bisa diakhiri ajakan DM. Percakapan di DM berarti calon pembeli hangat yang bisa ditindaklanjuti." },
              { t: "Modal HP sudah cukup", d: "Total investasi alat mulai dari Rp200 ribu sekali beli: tripod, mic clip-on, dan aplikasi edit gratis." },
              { t: "Konsistensi mengalahkan viral", d: "Satu video viral tidak membangun bisnis. 30 video konsisten dengan pesan yang sama — itulah yang membangun kepercayaan." },
            ].map((r) => (
              <div key={r.t} className="bento-pop bg-white rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-ink">{r.t}</h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Berapa biaya jasa konten video UMKM?</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-3">
            Flat <strong className="text-ink">Rp299.000 per batch 30 hari</strong>, sekali bayar,
            tanpa langganan. Bandingkan dengan agensi konten bulanan Rp5-20 juta atau gaji
            content creator full-time — lihat tabel perbandingan di halaman{" "}
            <a href="/harga" className="text-terracotta font-bold hover:underline">harga</a>.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: "1 Batch", price: "Rp299.000", desc: "30 hari konten" },
              { name: "3 Batch", price: "Rp799.000", desc: "90 hari — hemat Rp98.000" },
              { name: "6 Batch", price: "Rp1.490.000", desc: "180 hari — hemat Rp304.000" },
            ].map((p) => (
              <div key={p.name} className="bento-pop bg-white rounded-2xl p-5 text-center">
                <div className="font-mono text-xs font-bold text-stone-500">{p.name}</div>
                <div className="font-serif text-2xl text-terracotta mt-2">{p.price}</div>
                <div className="text-[11px] text-stone-500 font-sans mt-1">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqBlock items={faqItems} title="FAQ Jasa Konten Video UMKM" />
      <CtaBand
        headline="Dari 0-4 posting sporadis menjadi 30 video terencana."
        sub="Sistem produksi konten yang bisa dijalankan siapa pun — mulai dari brief hari ini."
      />
    </PageShell>
  );
}