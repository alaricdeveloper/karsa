import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { CtaBand } from "@/components/seo/CtaBand";

export const metadata: Metadata = {
  title: "Jasa Content Creator UMKM — Sistem Konten 30 Hari Tanpa Hiring, Mulai Rp299.000",
  description:
    "Jasa content creator UMKM tanpa hiring: sistem konten 30 hari dengan 30 video scripts, caption AIDA, artikel SEO, dan Notion OS. Dikerjakan tim Karsa dalam 24 jam kerja. Mulai Rp299.000.",
  alternates: { canonical: "/jasa-content-creator-umkm" },
  openGraph: {
    title: "Jasa Content Creator UMKM — Mulai Rp299.000",
    description: "Sistem konten 30 hari tanpa gaji bulanan. 30 script + 4 artikel SEO + Notion OS.",
    images: ["/og-image.png"],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa Content Creator UMKM",
  serviceType: "Content Marketing",
  description:
    "Jasa content creator untuk UMKM berbasis sistem: 30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion Content OS tanpa biaya gaji bulanan — dikirim dalam 1x24 jam kerja.",
  provider: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  areaServed: { "@type": "Country", name: "Indonesia" },
  availableLanguage: "id",
  offers: { "@type": "Offer", price: "299000", priceCurrency: "IDR" },
};

const faqItems = [
  {
    q: "Apakah ini menggantikan content creator full-time?",
    a: "Untuk UMKM tahap awal, ya — kamu mendapat output content creator (script, caption, artikel, kalender) tanpa gaji bulanan. Tim kamu tinggal merekam dan memposting. Saat skala bertambah, sistem ini jadi fondasi untuk diambil alih tim internal.",
  },
  {
    q: "Berapa biaya content creator per bulan dibanding Karsa?",
    a: "Content creator UMKM umumnya Rp2-8 juta per bulan. Karsa flat Rp299.000 per batch 30 hari. Perbandingan lengkap ada di halaman harga.",
  },
  {
    q: "Siapa yang merekam videonya?",
    a: "Kamu atau satu orang talent internal dengan HP. Setiap naskah dilengkapi arahan visual, gesture, dan intonasi sehingga rekaman bisa dilakukan tanpa pengalaman.",
  },
  {
    q: "Apakah saya bisa tetap konsultasi dengan tim?",
    a: "Ya. Ada garansi kalibrasi 48 jam untuk tone dan istilah produk, plus opsi NDA untuk brief sensitif. Komunikasi melalui WhatsApp dan email.",
  },
];

export default function JasaContentCreatorUmkmPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="py-12 sm:py-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Alternatif Hiring
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink mt-4 leading-tight">
            Jasa Content Creator UMKM — Output Lengkap, Tanpa Gaji Bulanan
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-4 max-w-3xl">
            Hiring content creator berarti komitmen gaji, manajemen, dan onboarding berbulan-bulan.
            Karsa memberi kamu{" "}
            <strong className="text-ink">output yang sama — bahkan lebih terstruktur</strong> —
            dalam 1x24 jam kerja: 30 script, 30 caption, 4 artikel SEO, dan sistem kalender yang
            langsung bisa dijalankan tim kamu.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta text-ink hover:text-white font-mono text-sm font-bold hover:bg-ink transition shadow-brutal-sm min-h-[48px]"
            >
              Mulai dengan Brief — Rp299.000 <span>&rarr;</span>
            </a>
            <a
              href="https://wa.me/6281288009920?text=Halo%2C%20saya%20mau%20konsultasi%20jasa%20content%20creator%20UMKM"
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
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Karsa vs Agensi vs In-house vs Prompt AI</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">
            Perbandingan berdasarkan harga umum pasar Indonesia per 2026.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="py-3 pr-4 font-bold">Aspek</th>
                  <th className="py-3 pr-4 font-bold text-terracotta">Karsa Studio</th>
                  <th className="py-3 pr-4 font-bold">Agensi</th>
                  <th className="py-3 pr-4 font-bold">In-house</th>
                  <th className="py-3 font-bold">Prompt AI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Biaya", "Rp299.000/batch", "Rp5-20 jt/bulan", "Rp3-8 jt/bulan", "Gratis (waktu)"],
                  ["Kecepatan", "1x24 jam kerja", "1-3 minggu", "1 bulan+", "Instan tapi mentah"],
                  ["Kontekstual", "Brief dibedah + audit kompetitor", "Ya", "Ya", "Tergantung prompt"],
                  ["Struktur", "Kalender 30 hari + Notion OS", "Bervariasi", "Tergantung tim", "Tidak ada"],
                  ["SLA & revisi", "Garansi kalibrasi 48 jam", "Kontrak", "Meeting", "Tidak ada"],
                  ["Kontrol brand", "Kamu pegang penuh", "Agensi pegang", "Tim internal", "Kamu"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-stone-200">
                    <td className="py-2.5 pr-4 font-bold">{row[0]}</td>
                    <td className="py-2.5 pr-4 text-terracotta font-bold">{row[1]}</td>
                    <td className="py-2.5 pr-4">{row[2]}</td>
                    <td className="py-2.5 pr-4">{row[3]}</td>
                    <td className="py-2.5">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Apa yang termasuk dalam satu batch</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Riset angle + audit satu akun kompetitor",
              "30 video scripts kata-per-kata",
              "30 caption AIDA + riset tagar 3 tier",
              "4 artikel SEO 1.000 kata",
              "Notion Content OS + backup Docs",
              "Panduan B-Roll kamera HP",
              "5 bonus: 50 template hook, bio guide, repurposing framework",
              "Garansi kalibrasi pesan 48 jam",
            ].map((item) => (
              <div key={item} className="bento-pop bg-white rounded-2xl p-4 text-xs sm:text-sm font-sans text-ink">
                <span className="text-terracotta font-mono font-bold mr-2">&check;</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqBlock items={faqItems} title="FAQ Jasa Content Creator UMKM" />
      <CtaBand
        headline="Tetap pegang kendali, tanpa mulai dari nol."
        sub="Output content creator kelas profesional dengan harga satu kali bayar — bukan gaji bulanan."
      />
    </PageShell>
  );
}