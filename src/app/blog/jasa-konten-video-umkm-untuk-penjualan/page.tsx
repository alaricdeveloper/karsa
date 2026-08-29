import type { Metadata } from "next";
import { ArticleShell } from "@/components/seo/ArticleShell";

export const metadata: Metadata = {
  title: "Jasa Konten Video UMKM: Cara Mengubah 30 Video Jadi Penjualan (Panduan 2026)",
  description:
    "Konten video tidak otomatis menjual. Pelajari struktur kalender 30 hari yang mengarahkan penonton dari video pertama sampai keputusan DM — panduan praktis untuk UMKM Indonesia.",
  alternates: { canonical: "/blog/jasa-konten-video-umkm-untuk-penjualan" },
  openGraph: {
    title: "Jasa Konten Video UMKM: Cara Mengubah 30 Video Jadi Penjualan",
    description: "Struktur kalender 30 hari yang mengubah penonton jadi pembeli.",
    images: ["/og-image.png"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Jasa Konten Video UMKM: Cara Mengubah 30 Video Jadi Penjualan (Panduan 2026)",
  datePublished: "2026-08-25",
  dateModified: "2026-08-25",
  inLanguage: "id-ID",
  author: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  publisher: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  mainEntityOfPage: "https://usekarsa.com/blog/jasa-konten-video-umkm-untuk-penjualan",
};

export default function Article1() {
  return (
    <ArticleShell tag="Konten Video" date="25 Agustus 2026" readTime="8 menit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <h1 className="text-3xl sm:text-4xl font-serif text-ink mt-6 leading-tight">
        Jasa Konten Video UMKM: Cara Mengubah 30 Video Jadi Penjualan
      </h1>

      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-5">
        Banyak UMKM sudah rajin membuat konten video, tapi penjualan tidak bergerak. Masalahnya
        bukan frekuensi — tapi <strong className="text-ink">tidak ada alur</strong> yang
        mengarahkan penonton dari sekadar menonton menjadi menghubungi penjual. Artikel ini
        membedah struktur kalender 30 hari yang kami pakai di Karsa Studio untuk mengubah
        penonton menjadi calon pembeli.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Mengapa konten video UMKM sering gagal menjual
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Ada tiga kesalahan umum. <strong className="text-ink">Pertama</strong>, konten terlalu
        promosi — feed penuh brosur iklan, audiens lelah, engagement anjlok.{" "}
        <strong className="text-ink">Kedua</strong>, konten tidak konsisten — posting seminggu
        sekali dengan tema acak, algoritma tidak pernah mendapat sinyal yang cukup.{" "}
        <strong className="text-ink">Ketiga</strong>, tidak ada ajakan yang jelas — video berakhir
        tanpa CTA, penonton yang tertarik tidak tahu harus melakukan apa.
      </p>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Solusinya bukan menambah jumlah konten, melainkan membangun{" "}
        <strong className="text-ink">jalur konversi</strong>: rangkaian video yang membawa
        penonton dari sadar masalah, percaya solusi, sampai siap bertanya.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Empat fase kalender konten 30 hari yang menjual
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Kalender 30 hari yang kami susun bukan kumpulan ide acak. Setiap hari punya peran dalam
        rangkaian:
      </p>
      <h3 className="text-base sm:text-lg font-bold text-ink mt-6">Fase 1 — Kenalkan masalah</h3>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-2">
        Konten pengenalan produk, pain point utama, mitos yang beredar, dan pertanyaan yang sering
        muncul dari calon pembeli. Tujuannya satu: penonton merasa{" "}
        <em>&quot;ini masalah saya juga&quot;</em>. Video seperti ini paling banyak di-save karena
        orang menyimpan konten yang relevan dengan masalahnya.
      </p>
      <h3 className="text-base sm:text-lg font-bold text-ink mt-6">Fase 2 — Bangun kepercayaan</h3>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-2">
        Konten edukasi, breakdown bahan atau proses, perbandingan, dan bukti yang membuat value
        produk lebih mudah dipahami. Di fase ini penonton mulai menilai kompetensi brand.
      </p>
      <h3 className="text-base sm:text-lg font-bold text-ink mt-6">Fase 3 — Tunjukkan solusi</h3>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-2">
        Demo, use case, objection handling, dan social proof. Penonton yang sudah percaya mulai
        membayangkan hasilnya pada dirinya sendiri.
      </p>
      <h3 className="text-base sm:text-lg font-bold text-ink mt-6">Fase 4 — Arahkan aksi</h3>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-2">
        Penawaran, FAQ, urgency yang wajar, dan CTA berulang. Percakapan di DM — bukan like atau
        view — adalah indikator kesuksesan fase ini.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        DM adalah aset penjualan terbesar UMKM
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Setiap video bisa diakhiri ajakan DM. Percakapan di DM berarti calon pembeli hangat yang
        bisa ditindaklanjuti satu per satu — jauh lebih bernilai daripada ribuan view tanpa arah.
        Itulah mengapa struktur naskah kami selalu mencantumkan CTA yang spesifik per video:
        simpan, komentar, DM, atau kunjungi profil.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Rasio pilar yang menjaga feed tetap sehat
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Kalender 30 hari kami memakai empat pilar dengan rasio:{" "}
        <strong className="text-ink">edukasi 40%</strong>, storytelling 30%, penawaran 15%, dan
        mitos vs fakta 15%. Penawaran dibatasi porsinya agar audiens tidak lelah, sementara
        edukasi menjadi magnet yang membuat mereka bertahan mengikuti akun.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Bagaimana jika tidak ada waktu untuk menyusun semua ini?
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Menyusun kalender seperti di atas memakan waktu berhari-hari — riset kompetitor,
        menulis 30 naskah, menyiapkan caption, belum lagi 4 artikel SEO. Ini persis yang dikerjakan{" "}
        <a href="/jasa-konten-video-umkm" className="text-terracotta font-bold hover:underline">
          jasa konten video UMKM Karsa Studio
        </a>{" "}
        dalam 1x24 jam kerja: kalender lengkap dengan naskah kata-per-kata, caption AIDA, dan
        artikel SEO — mulai dari{" "}
        <a href="/harga" className="text-terracotta font-bold hover:underline">Rp299.000</a>.
      </p>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Baca juga panduan teknisnya:{" "}
        <a href="/blog/cara-membuat-video-tiktok-produk-umkm" className="text-terracotta font-bold hover:underline">
          cara membuat video TikTok produk UMKM yang di-save
        </a>
        .
      </p>
    </ArticleShell>
  );
}