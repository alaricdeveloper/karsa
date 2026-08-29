import type { Metadata } from "next";
import { ArticleShell } from "@/components/seo/ArticleShell";

export const metadata: Metadata = {
  title: "Cara Menulis Artikel SEO untuk Toko Online UMKM: Panduan 1.000 Kata",
  description:
    "Artikel SEO bukan sekadar menulis panjang. Ikuti kerangka 1.000 kata: riset pertanyaan pembeli, struktur heading H1/H2/H3, meta deskripsi, dan internal linking untuk toko online UMKM.",
  alternates: { canonical: "/blog/cara-menulis-artikel-seo-untuk-toko-online" },
  openGraph: {
    title: "Cara Menulis Artikel SEO untuk Toko Online UMKM",
    description: "Kerangka 1.000 kata: riset pertanyaan pembeli hingga internal linking.",
    images: ["/og-image.png"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Cara Menulis Artikel SEO untuk Toko Online UMKM: Panduan 1.000 Kata",
  datePublished: "2026-08-10",
  dateModified: "2026-08-10",
  inLanguage: "id-ID",
  author: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  publisher: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  mainEntityOfPage: "https://usekarsa.com/blog/cara-menulis-artikel-seo-untuk-toko-online",
};

export default function Article4() {
  return (
    <ArticleShell tag="SEO" date="10 Agustus 2026" readTime="10 menit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <h1 className="text-3xl sm:text-4xl font-serif text-ink mt-6 leading-tight">
        Cara Menulis Artikel SEO untuk Toko Online UMKM
      </h1>

      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-5">
        Artikel SEO untuk toko online tidak sama dengan artikel blog biasa. Tujuannya satu:
        menangkap orang yang sedang mencari solusi di Google — lalu mengarahkannya ke produkmu.
        Kerangka 1.000 kata di bawah ini adalah proses yang kami gunakan saat menulis{" "}
        <a href="/jasa-artikel-seo" className="text-terracotta font-bold hover:underline">
          artikel SEO untuk UMKM
        </a>{" "}
        di Karsa Studio.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Langkah 1: Riset pertanyaan pembeli, bukan sekadar kata kunci
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Kata kunci yang baik adalah pertanyaan yang benar-benar diketik calon pembeli. Untuk toko
        skincare, itu bukan <em>&quot;jual skincare&quot;</em> — melainkan{" "}
        <em>&quot;skincare untuk kulit sensitif&quot;</em> atau{" "}
        <em>&quot;kenapa skincare bikin breakout&quot;</em>. Tulis 10-15 pertanyaan dari sudut
        pandang pembeli, lalu pilih satu sebagai fokus artikel. Satu artikel menjawab satu
        pertanyaan utama.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Langkah 2: Susun struktur H1/H2/H3 sebelum menulis
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Struktur yang jelas membantu Google memahami isi artikel dan membantu pembaca men-scan.
        H1 memuat pertanyaan utama. H2 memecah jawaban menjadi subtopik. H3 untuk detail. Contoh
        kerangka untuk 1.000 kata:
      </p>
      <div className="mt-4 bento-pop bg-white rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-ink leading-relaxed">
        <p><strong>H1</strong>: Skincare untuk Kulit Sensitif: Panduan Lengkap 2026</p>
        <p><strong>H2</strong>: Kenapa kulit sensitif gampang breakout?</p>
        <p><strong>H2</strong>: 5 bahan yang aman untuk kulit sensitif</p>
        <p><strong>H3</strong>: Niacinamide dan batas konsentrasinya</p>
        <p><strong>H2</strong>: Cara patch test yang benar</p>
        <p><strong>H2</strong>: Rekomendasi rangkaian untuk pemula</p>
      </div>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Langkah 3: Jawab pertanyaan di paragraf pertama
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Google (dan AI search seperti ChatGPT atau Perplexity) memberi bobot pada jawaban langsung
        di awal. Paragraf pertama sebaiknya menjawab pertanyaan utama dalam 2-3 kalimat, lalu
        diperdalam di bagian berikutnya. Pendekatan ini juga membuat artikel lebih mudah dikutip —
        yang semakin penting di era AI Overviews.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Langkah 4: Tulis meta deskripsi yang mengundang klik
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Meta deskripsi 140-160 karakter yang memuat pertanyaan dan manfaat. Bukan ringkasan isi,
        melainkan janji: apa yang pembaca dapatkan setelah membaca. Sertakan angka spesifik —
        seperti &quot;panduan 1.000 kata&quot; atau &quot;5 bahan aman&quot; — karena angka
        meningkatkan klik.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Langkah 5: Internal linking ke produk dan artikel lain
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Tautkan artikel ke halaman produk terkait dan ke artikel lain yang saling melengkapi.
        Internal linking memberi sinyal struktur situs ke Google dan memperpanjang durasi
        kunjungan pembeli. Jangan berlebihan — 3-5 tautan kontekstual per artikel sudah cukup.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Langkah 6: Konsistensi lebih penting dari volume
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Satu artikel yang menjawab pertanyaan dengan baik bernilai lebih dari sepuluh artikel
        tipis. Blog yang rutin terisi — bahkan dua artikel per bulan — membangun otoritas domain
        lebih cepat daripada ledakan konten sekali lalu mati.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Tidak punya waktu menulis sendiri?
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Setiap batch konten{" "}
        <a href="/jasa-konten-video-umkm" className="text-terracotta font-bold hover:underline">
          Karsa Studio
        </a>{" "}
        sudah menyertakan 4 artikel SEO 1.000 kata dengan kerangka di atas — ditulis berdasarkan
        riset kompetitor tokomu, siap publish di blogmu sendiri. Mulai dari{" "}
        <a href="/harga" className="text-terracotta font-bold hover:underline">Rp299.000</a>.
      </p>
    </ArticleShell>
  );
}