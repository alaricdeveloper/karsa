import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { CtaBand } from "@/components/seo/CtaBand";

export const metadata: Metadata = {
  title: "Blog Karsa Studio — Panduan Konten Video & SEO untuk UMKM",
  description:
    "Panduan praktis konten video, script TikTok, dan artikel SEO untuk UMKM Indonesia. Ditulis tim Karsa Studio berdasarkan pengalaman produksi 30 hari konten.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog Karsa Studio",
    description: "Panduan konten video & SEO untuk UMKM Indonesia.",
    images: ["/og-image.png"],
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog Karsa Studio",
  url: "https://usekarsa.com/blog",
  inLanguage: "id-ID",
  publisher: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
};

const posts = [
  {
    href: "/blog/jasa-konten-video-umkm-untuk-penjualan",
    title: "Jasa Konten Video UMKM: Cara Mengubah 30 Video Jadi Penjualan (Panduan 2026)",
    excerpt:
      "Konten video tidak otomatis menjual. Inilah struktur kalender 30 hari yang terbukti mengarahkan penonton dari video pertama sampai keputusan DM.",
    date: "2026-08-25",
    readTime: "8 menit",
    tag: "Konten Video",
  },
  {
    href: "/blog/cara-membuat-video-tiktok-produk-umkm",
    title: "Cara Membuat Video TikTok Produk UMKM yang Di-Save (Formula 25 Detik)",
    excerpt:
      "Video TikTok produk yang disave bukan soal kamera mahal. Ini anatomi 25 detik: hook, problem framing, value, dan CTA — dengan contoh naskah utuh.",
    date: "2026-08-20",
    readTime: "7 menit",
    tag: "TikTok",
  },
  {
    href: "/blog/berapa-biaya-jasa-content-creator-umkm",
    title: "Berapa Biaya Jasa Content Creator UMKM 2026? Agensi vs Sistem",
    excerpt:
      "Rp2 juta hingga Rp20 juta per bulan — biaya content creator sangat bervariasi. Kami bandingkan 4 opsi: freelance, in-house, agensi, dan sistem konten.",
    date: "2026-08-15",
    readTime: "9 menit",
    tag: "Biaya",
  },
  {
    href: "/blog/cara-menulis-artikel-seo-untuk-toko-online",
    title: "Cara Menulis Artikel SEO untuk Toko Online UMKM: Panduan 1.000 Kata",
    excerpt:
      "Artikel SEO bukan sekadar menulis panjang. Ikuti kerangka 1.000 kata ini: riset pertanyaan pembeli, struktur heading, dan internal linking.",
    date: "2026-08-10",
    readTime: "10 menit",
    tag: "SEO",
  },
];

export default function BlogPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <section className="py-12 sm:py-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Gratis Dibaca
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink mt-4 leading-tight">
            Blog Karsa Studio
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-4 max-w-3xl">
            Prinsip konten yang dipakai tim Karsa di setiap naskah — bisa kamu pakai bahkan tanpa
            memesan. Ditulis dari pengalaman produksi 30 hari konten untuk brand di seluruh
            Indonesia.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((post) => (
              <a
                key={post.href}
                href={post.href}
                className="bento-pop bg-white rounded-2xl p-5 sm:p-6 flex flex-col hover:translate-x-[-2px] hover:translate-y-[-2px] transition"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500">
                  <span className="badge-tag px-2 py-0.5 rounded-full bg-wasabi text-ink font-bold">
                    {post.tag}
                  </span>
                  <span>{post.date} &middot; {post.readTime}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-ink mt-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <span className="text-terracotta font-mono text-xs font-bold mt-3">
                  Baca selengkapnya &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Panduan itu gratis. Kalendernya? Siap dalam 24 jam."
        sub="Kalau kamu butuh 30 hari konten yang langsung bisa dijalankan, mulai dari brief hari ini."
      />
    </PageShell>
  );
}