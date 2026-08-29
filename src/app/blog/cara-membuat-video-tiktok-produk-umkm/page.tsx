import type { Metadata } from "next";
import { ArticleShell } from "@/components/seo/ArticleShell";

export const metadata: Metadata = {
  title: "Cara Membuat Video TikTok Produk UMKM yang Di-Save (Formula 25 Detik)",
  description:
    "Video TikTok produk yang disave bukan soal kamera mahal. Pelajari anatomi 25 detik: hook, problem framing, value, dan CTA — lengkap dengan contoh naskah utuh untuk UMKM.",
  alternates: { canonical: "/blog/cara-membuat-video-tiktok-produk-umkm" },
  openGraph: {
    title: "Cara Membuat Video TikTok Produk UMKM yang Di-Save",
    description: "Formula 25 detik dengan contoh naskah utuh.",
    images: ["/og-image.png"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Cara Membuat Video TikTok Produk UMKM yang Di-Save (Formula 25 Detik)",
  datePublished: "2026-08-20",
  dateModified: "2026-08-20",
  inLanguage: "id-ID",
  author: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  publisher: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  mainEntityOfPage: "https://usekarsa.com/blog/cara-membuat-video-tiktok-produk-umkm",
};

export default function Article2() {
  return (
    <ArticleShell tag="TikTok" date="20 Agustus 2026" readTime="7 menit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <h1 className="text-3xl sm:text-4xl font-serif text-ink mt-6 leading-tight">
        Cara Membuat Video TikTok Produk UMKM yang Di-Save
      </h1>

      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-5">
        Saves adalah metrik paling jujur di TikTok: orang menyimpan video yang mereka anggap
        berharga untuk ditonton lagi. Video produk yang di-save berarti penonton menilai kontenmu
        layak disimpan — langkah pertama menuju pembelian. Formula di bawah ini adalah anatomi
        yang kami pakai di setiap{" "}
        <a href="/jasa-script-video-tiktok" className="text-terracotta font-bold hover:underline">
          naskah video TikTok
        </a>{" "}
        Karsa Studio.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Anatomi 25 detik yang menghentikan scroll
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Struktur waktu ini memberi alasan bagi setiap detik video:
      </p>
      <h3 className="text-base sm:text-lg font-bold text-ink mt-6">0-3 detik — Visual &amp; Audio Hook</h3>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-2">
        Hook membuka pertanyaan di kepala penonton tanpa menjawabnya langsung — otak memaksa
        mereka bertahan. Contoh untuk kopi cold brew:{" "}
        <em>&quot;Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk?&quot;</em>
      </p>
      <h3 className="text-base sm:text-lg font-bold text-ink mt-6">3-10 detik — Problem Framing</h3>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-2">
        Perjelas masalah yang penonton rasakan. Detail masalah yang spesifik membuat penonton
        merasa dipahami — dan menyimpan video itu.
      </p>
      <h3 className="text-base sm:text-lg font-bold text-ink mt-6">10-20 detik — Value Solution</h3>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-2">
        Sampaikan solusi dengan bukti: metode, angka, perbandingan. Contoh:{" "}
        <em>&quot;Metode slow-drip 12 jam kami memecah asam klorogenat secara alami tanpa
        ngurangin kadar kafein.&quot;</em>
      </p>
      <h3 className="text-base sm:text-lg font-bold text-ink mt-6">20-25 detik — Call To Action</h3>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-2">
        Satu CTA, tidak ambigu: <em>&quot;Cek link di bio sekarang buat amankan sampler pack
        ramah lambung minggu ini!&quot;</em> Penonton mengingat satu hal per video.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Contoh naskah utuh (kopi cold brew)
      </h2>
      <div className="mt-4 bento-pop bg-white rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-ink leading-relaxed">
        <p><strong>[0-3s]</strong> Talent menuang kopi instan ke gelas — langsung menggumpal di dasar. Ekspresi heran.</p>
        <p className="mt-2"><strong>[Hook]</strong> &quot;Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk? Ini alasan ilmiahnya...&quot;</p>
        <p className="mt-2"><strong>[3-10s]</strong> &quot;Asam klorogenat dalam kopi instan diproses dengan panas tinggi, dan itu yang bikin lambung kamu bereaksi.&quot;</p>
        <p className="mt-2"><strong>[10-20s]</strong> Tunjukkan biji cold brew asli. &quot;Metode slow-drip 12 jam kami memecah asam ini secara alami — kadar asam 70% lebih rendah dibanding roasting konvensional.&quot;</p>
        <p className="mt-2"><strong>[20-25s]</strong> &quot;Cek link di bio untuk coba sampler pack khusus lambung sensitif minggu ini.&quot;</p>
      </div>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Tiga kesalahan yang membunuh saves
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        <strong className="text-ink">Hook terlalu umum</strong> (&quot;5 tips produk kamu&quot;)
        tidak memberi alasan untuk bertahan. <strong className="text-ink">Video terlalu panjang</strong>{" "}
        tanpa struktur membuat penonton pergi di detik ke-10.{" "}
        <strong className="text-ink">Tidak ada CTA penyimpanan</strong> — video edukasi sebaiknya
        diakhiri ajakan &quot;simpan video ini untuk...&quot; agar penonton yang butuh langsung
        menekan tombol save.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Butuh 30 naskah seperti ini sekaligus?
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Menulis satu naskah seperti contoh di atas butuh riset. Menulis 30 butuh sistem. Jasa
        script video TikTok Karsa mengirim{" "}
        <a href="/jasa-script-video-tiktok" className="text-terracotta font-bold hover:underline">
          30 naskah kata-per-kata
        </a>{" "}
        dengan format per detik seperti di atas — plus caption dan 4 artikel SEO, dalam 1x24 jam
        kerja. Mulai dari{" "}
        <a href="/harga" className="text-terracotta font-bold hover:underline">Rp299.000</a>.
      </p>
    </ArticleShell>
  );
}