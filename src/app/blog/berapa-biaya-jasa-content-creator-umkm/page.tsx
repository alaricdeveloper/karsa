import type { Metadata } from "next";
import { ArticleShell } from "@/components/seo/ArticleShell";

export const metadata: Metadata = {
  title: "Berapa Biaya Jasa Content Creator UMKM 2026? Agensi vs In-house vs Sistem",
  description:
    "Biaya content creator UMKM berkisar Rp2-20 juta per bulan tergantung pilihan: freelance, in-house, agensi, atau sistem konten. Perbandingan lengkap biaya dan output di artikel ini.",
  alternates: { canonical: "/blog/berapa-biaya-jasa-content-creator-umkm" },
  openGraph: {
    title: "Berapa Biaya Jasa Content Creator UMKM 2026?",
    description: "Perbandingan 4 opsi: freelance, in-house, agensi, sistem konten.",
    images: ["/og-image.png"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Berapa Biaya Jasa Content Creator UMKM 2026? Agensi vs In-house vs Sistem",
  datePublished: "2026-08-15",
  dateModified: "2026-08-15",
  inLanguage: "id-ID",
  author: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  publisher: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  mainEntityOfPage: "https://usekarsa.com/blog/berapa-biaya-jasa-content-creator-umkm",
};

export default function Article3() {
  return (
    <ArticleShell tag="Biaya" date="15 Agustus 2026" readTime="9 menit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <h1 className="text-3xl sm:text-4xl font-serif text-ink mt-6 leading-tight">
        Berapa Biaya Jasa Content Creator UMKM 2026?
      </h1>

      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-5">
        Pertanyaan yang paling sering kami terima dari pemilik UMKM:{" "}
        <em>&quot;berapa sih biaya jasa content creator per bulan?&quot;</em>. Jawaban jujurnya:
        sangat bervariasi — dari Rp2 juta sampai Rp20 juta per bulan, tergantung pilihan model.
        Artikel ini membandingkan empat opsi berdasarkan harga umum pasar Indonesia per 2026.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Opsi 1: Freelancer per proyek (Rp150-500 ribu per konten)
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Freelancer menjual per konten atau per paket kecil: satu video, satu carousel, satu
        copywriting. Cocok untuk kebutuhan sporadis, tapi total biaya bisa membengkak jika kamu
        butuh 30 konten — dan kualitas antar-proyek sering tidak konsisten karena tiap pengerjaan
        dimulai dari konteks baru.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Opsi 2: Content creator in-house (Rp3-8 juta per bulan)
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Gaji content creator UMKM umumnya Rp3-8 juta per bulan, plus biaya perekrutan, peralatan,
        dan manajemen. Kelebihannya: konteks bisnis yang dalam. Kekurangannya: hasil sangat
        bergantung pada satu orang, dan satu orang biasanya kesulitan menjalankan seluruh alur
        produksi — riset, naskah, rekam, edit, caption, scheduling — setiap minggu.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Opsi 3: Agensi konten (Rp5-20 juta per bulan)
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Agensi menawarkan tim lengkap: strategi, produksi, manajemen akun. Kualitasnya tinggi,
        tapi untuk UMKM tahap awal biaya Rp5-20 juta per bulan sulit dibenarkan — apalagi dengan
        kontrak bulanan yang mengikat. Agensi lebih masuk akal setelah revenue stabil.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Opsi 4: Sistem konten (Rp299 ribu per batch 30 hari)
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Ini model yang kami tawarkan di Karsa Studio: kamu membeli{" "}
        <strong className="text-ink">sistem</strong>, bukan jasa lengkap. Satu batch berisi 30
        naskah kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion OS — tim internal kamu
        tinggal merekam dan memposting. Biaya flat Rp299.000 per batch, sekali bayar, tanpa
        langganan.
      </p>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Model ini bukan pengganti agensi untuk semua orang — kami menyarankannya untuk UMKM yang
        sudah punya produk siap jual dan tim kecil yang sanggup merekam sendiri. Detail model
        bisnisnya ada di halaman{" "}
        <a href="/jasa-content-creator-umkm" className="text-terracotta font-bold hover:underline">
          jasa content creator UMKM
        </a>{" "}
        dan tabel perbandingan di halaman{" "}
        <a href="/harga" className="text-terracotta font-bold hover:underline">harga</a>.
      </p>

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Tabel perbandingan cepat
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b-2 border-ink">
              <th className="py-2.5 pr-4 font-bold">Opsi</th>
              <th className="py-2.5 pr-4 font-bold">Biaya/bulan</th>
              <th className="py-2.5 pr-4 font-bold">Output</th>
              <th className="py-2.5 font-bold">Komitmen</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Freelancer", "Rp150-500 rb/konten", "Bervariasi", "Per proyek"],
              ["In-house", "Rp3-8 juta", "Konten sesuai arahan", "Gaji + kontrak"],
              ["Agensi", "Rp5-20 juta", "Tim produksi lengkap", "Kontrak bulanan"],
              ["Sistem konten (Karsa)", "Rp299 rb/batch", "30 script + 4 artikel SEO + OS", "Sekali bayar"],
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

      <h2 className="text-xl sm:text-2xl font-serif text-ink mt-10">
        Kesimpulan
      </h2>
      <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-3">
        Tidak ada jawaban tunggal. Kalau budget terbatas dan kamu butuh konsistensi segera, sistem
        konten memberi output paling banyak per rupiah. Kalau kamu butuh produksi penuh tanpa
        menyentuh kamera, agensi tetap pilihan. Yang penting: hitung biaya per output, bukan cuma
        biaya per bulan — dan pastikan model yang kamu pilih mengarahkan penonton menuju
        penjualan, bukan sekadar memproduksi konten.
      </p>
    </ArticleShell>
  );
}