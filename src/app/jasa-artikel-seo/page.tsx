import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { CtaBand } from "@/components/seo/CtaBand";

export const metadata: Metadata = {
  title: "Jasa Artikel SEO untuk UMKM — 4 Artikel 1.000 Kata + Riset Keyword, Mulai Rp299.000",
  description:
    "Jasa artikel SEO untuk UMKM: 4 artikel pilar 1.000 kata dengan riset keyword, struktur H1/H2/H3, dan meta deskripsi. Termasuk paket batch konten 30 hari. Mulai Rp299.000.",
  alternates: { canonical: "/jasa-artikel-seo" },
  openGraph: {
    title: "Jasa Artikel SEO untuk UMKM — Mulai Rp299.000",
    description: "4 artikel pilar 1.000 kata siap index Google, termasuk dalam paket batch konten.",
    images: ["/og-image.png"],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa Artikel SEO untuk UMKM",
  serviceType: "SEO Content Writing",
  description:
    "Jasa penulisan artikel SEO untuk UMKM: 4 artikel pilar 1.000 kata dengan susunan heading H1/H2/H3, meta deskripsi, dan riset kata kunci pembeli — dikirim dalam 1x24 jam kerja.",
  provider: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  areaServed: { "@type": "Country", name: "Indonesia" },
  availableLanguage: "id",
  offers: { "@type": "Offer", price: "299000", priceCurrency: "IDR" },
};

const faqItems = [
  {
    q: "Berapa artikel SEO yang saya dapatkan?",
    a: "4 artikel pilar masing-masing sekitar 1.000 kata, lengkap dengan susunan heading H1/H2/H3, meta description, dan internal linking yang disarankan.",
  },
  {
    q: "Apakah artikelnya termasuk riset keyword?",
    a: "Ya. Kami menganalisis satu akun kompetitor dan memetakan sudut pesan yang belum digarap, lalu menulis artikel berdasarkan pertanyaan yang benar-benar dicari calon pembeli.",
  },
  {
    q: "Apakah saya bisa publish artikelnya di blog sendiri?",
    a: "Bisa. Semua hak komersial materi menjadi milik kamu setelah serah terima — bebas dipublikasikan di blog, website, atau medium apapun.",
  },
  {
    q: "Kapan saya bisa mulai melihat traffic dari artikel SEO?",
    a: "Artikel SEO butuh waktu 1-3 bulan untuk terindex dan naik peringkat. Yang penting fondasinya benar sejak awal: keyword yang tepat, struktur yang jelas, dan konten yang menjawab pertanyaan pembeli. Simak panduannya di blog kami: cara menulis artikel SEO untuk toko online.",
  },
];

export default function JasaArtikelSeoPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="py-12 sm:py-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">
            Traffic Pembeli Gratis
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink mt-4 leading-tight">
            Jasa Artikel SEO untuk UMKM — Traffic Pembeli dari Google
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-4 max-w-3xl">
            Blog kosong berarti <strong className="text-ink">traffic Google kosong</strong>.
            Setiap batch Karsa menyertakan <strong className="text-ink">4 artikel pilar 1.000
            kata</strong> yang ditulis berdasarkan pertanyaan calon pembeli — dengan struktur
            heading, meta deskripsi, dan sudut pesan yang belum digarap kompetitor kamu.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta text-white font-mono text-sm font-bold hover:bg-ink transition shadow-brutal-sm min-h-[48px]"
            >
              Mulai dengan Brief — Rp299.000 <span>&rarr;</span>
            </a>
            <a
              href="https://wa.me/6281288009920?text=Halo%2C%20saya%20mau%20tanya%20jasa%20artikel%20SEO"
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
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Kenapa UMKM butuh artikel SEO?</h2>
          <div className="mt-6 space-y-3">
            {[
              { t: "Menangkap pembeli yang sedang mencari", d: "Saat orang mengetik \"cara memilih kopi untuk lambung sensitif\" di Google, artikel yang menjawab dengan baik akan muncul — dan pembaca itu adalah calon pembeli." },
              { t: "Aset jangka panjang, bukan sekali pakai", d: "Berbeda dengan postingan media sosial yang tenggelam dalam hitungan jam, artikel SEO terus mendatangkan traffic berbulan-bulan setelah dipublikasikan." },
              { t: "Membangun otoritas brand", d: "Google menilai website berdasarkan kedalaman konten. Artikel pilar yang lengkap memperkuat sinyal E-E-A-T (pengalaman, keahlian, otoritas, kepercayaan)." },
              { t: "Mengisi blog yang selama ini kosong", d: "Blog yang rutin terisi juga memperkuat jangkauan konten video kamu — artikel bisa jadi bahan repurposing dan sebaliknya." },
            ].map((r) => (
              <div key={r.t} className="bento-pop bg-white rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-ink">{r.t}</h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Standar setiap artikel</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "±1.000 kata, struktur H1/H2/H3 jelas",
              "Meta deskripsi siap pakai untuk Google",
              "Riset kata kunci dari pertanyaan pembeli",
              "Sudut pesan unik vs kompetitor",
              "Internal linking yang disarankan",
              "Bahasa Indonesia yang natural, bukan keyword stuffing",
            ].map((item) => (
              <div key={item} className="bento-pop bg-white rounded-2xl p-4 text-xs sm:text-sm font-sans text-ink">
                <span className="text-terracotta font-mono font-bold mr-2">&check;</span>
                {item}
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-6 leading-relaxed">
            Contoh nyata hasil artikel SEO Karsa: artikel klien untuk kata kunci{" "}
            <em>&quot;skincare untuk kulit sensitif&quot;</em> berhasil muncul di halaman 1 Google
            dan traffic organik naik tiap bulan. Detailnya di halaman{" "}
            <a href="/tentang-kami" className="text-terracotta font-bold hover:underline">tentang kami</a>.
          </p>
        </div>
      </section>

      <FaqBlock items={faqItems} title="FAQ Jasa Artikel SEO" />
      <CtaBand
        headline="Blog kosong = traffic Google kosong."
        sub="4 artikel pilar siap index dalam 1x24 jam kerja — termasuk dalam setiap batch konten."
      />
    </PageShell>
  );
}