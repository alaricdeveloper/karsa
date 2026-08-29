import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { CtaBand } from "@/components/seo/CtaBand";

export const metadata: Metadata = {
  title: "Paket Konten Instagram UMKM — 30 Konten Terencana (Reels, Karusel, Story), Mulai Rp299.000",
  description:
    "Paket konten Instagram untuk UMKM: 30 video script Reels, caption AIDA, panduan bio & highlight, dan kalender 30 hari. Termasuk 4 artikel SEO. Mulai Rp299.000.",
  alternates: { canonical: "/paket-konten-instagram" },
  openGraph: {
    title: "Paket Konten Instagram UMKM — Mulai Rp299.000",
    description: "30 konten terencana untuk feed & Reels, caption AIDA, kalender 30 hari.",
    images: ["/og-image.png"],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Paket Konten Instagram UMKM",
  serviceType: "Social Media Content",
  description:
    "Paket konten Instagram untuk UMKM: 30 video scripts Reels kata-per-kata, 30 caption AIDA dengan riset tagar, panduan optimasi bio & highlight, dan kalender konten 30 hari — dikirim dalam 1x24 jam kerja.",
  provider: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  areaServed: { "@type": "Country", name: "Indonesia" },
  availableLanguage: "id",
  offers: { "@type": "Offer", price: "299000", priceCurrency: "IDR" },
};

const faqItems = [
  {
    q: "Apakah paket ini termasuk desain feed atau konten foto?",
    a: "Fokus paket ini adalah konten video Reels + caption + kalender, bukan desain feed. Namun setiap caption disusun struktur AIDA dan bisa langsung dipakai, dan bonus panduan bio & highlight membantu profil terlihat profesional.",
  },
  {
    q: "Berapa kali saya harus posting dalam seminggu?",
    a: "Kalender Karsa dirancang 30 hari dengan ritme produksi: rekam batch 4-6 video sekali jalan, edit di CapCut, lalu jadwalkan via Meta Business Suite. Total 30 konten siap dijadwalkan.",
  },
  {
    q: "Apakah caption dan tagar risetnya sudah termasuk?",
    a: "Ya — setiap video disertai caption AIDA dan riset tagar 3 tier (broad, medium, niche) yang relevan dengan produk kamu.",
  },
  {
    q: "Bagaimana dengan Instagram Story?",
    a: "Panduan optimasi bio & highlight serta repurposing framework membantu mengubah satu ide video menjadi Story, carousel, dan konten X/WhatsApp Status.",
  },
];

export default function PaketKontenInstagramPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="py-12 sm:py-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Khusus Instagram
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink mt-4 leading-tight">
            Paket Konten Instagram UMKM — 30 Konten Terencana, Bukan Asal Posting
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-4 max-w-3xl">
            Feed yang berisi foto katalog tanpa cerita tidak menggerakkan penjualan. Paket ini
            memberi kamu <strong className="text-ink">30 video script Reels kata-per-kata</strong>,
            30 caption AIDA, panduan optimasi bio &amp; highlight, dan kalender 30 hari — sehingga
            profil Instagram kamu bekerja sebagai aset penjualan, bukan sekadar portofolio.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta text-white font-mono text-sm font-bold hover:bg-ink transition shadow-brutal-sm min-h-[48px]"
            >
              Mulai dengan Brief — Rp299.000 <span>&rarr;</span>
            </a>
            <a
              href="https://wa.me/6281288009920?text=Halo%2C%20saya%20mau%20tanya%20paket%20konten%20Instagram"
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
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Isi paket konten Instagram</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { t: "30 Script Reels Kata-per-Kata", d: "Format vertikal 15-30 detik: hook, problem framing, value solution, dan CTA per detik." },
              { t: "30 Caption Struktur AIDA", d: "Attention, Interest, Desire, Action + riset tagar 3 tier siap tempel." },
              { t: "Panduan Optimasi Bio & Highlight", d: "Struktur profil agar pengunjung memahami value bisnismu dalam 5 detik." },
              { t: "Kalender Konten 30 Hari", d: "Setiap hari punya peran: kenalkan masalah, bangun kepercayaan, tunjukkan solusi, arahkan aksi." },
              { t: "Content Repurposing Framework", d: "SOP mengubah satu video menjadi carousel, Story, thread X, dan status WhatsApp." },
              { t: "4 Artikel SEO Bonus", d: "Artikel pilar yang juga bisa di-embed sebagai link di bio dan mendatangkan traffic Google." },
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
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Pilar konten yang menjaga feed tetap sehat</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-3">
            Rasio antar pilar dijaga agar feed tidak jadi brosur iklan:
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { t: "Edukasi Solusi — 40%", d: "Jawab pertanyaan calon pembeli, bangun otoritas tanpa terlihat menggurui." },
              { t: "Storytelling Nyata — 30%", d: "Cerita pelanggan, proses produksi, dan perjalanan brand." },
              { t: "Penawaran Spesial — 15%", d: "Promo, produk baru, dan CTA langsung — dibatasi agar tidak melelahkan." },
              { t: "Mitos vs Fakta — 15%", d: "Format debunk yang mudah dibagikan dan memicu komentar." },
            ].map((r) => (
              <div key={r.t} className="bento-pop bg-white rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-ink">{r.t}</h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqBlock items={faqItems} title="FAQ Paket Konten Instagram" />
      <CtaBand
        headline="Instagram kamu seharusnya menjual, bukan sekadar ada."
        sub="30 konten terencana dengan pesan yang konsisten — mulai dari brief hari ini."
      />
    </PageShell>
  );
}