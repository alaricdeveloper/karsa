import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { CtaBand } from "@/components/seo/CtaBand";

export const metadata: Metadata = {
  title: "Jasa Script Video TikTok UMKM — 30 Naskah Kata-per-Kata, Mulai Rp299.000",
  description:
    "Jasa script video TikTok untuk UMKM: 30 naskah kata-per-kata siap rekam, format vertikal 15-30 detik, hook per detik + CTA. Dikirim 1x24 jam kerja. Mulai Rp299.000.",
  alternates: { canonical: "/jasa-script-video-tiktok" },
  openGraph: {
    title: "Jasa Script Video TikTok UMKM — 30 Naskah Kata-per-Kata, Mulai Rp299.000",
    description:
      "30 naskah kata-per-kata siap rekam untuk TikTok, Reels & Shorts. Dikirim 1x24 jam kerja. Mulai Rp299.000.",
    images: ["/og-image.png"],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa Script Video TikTok untuk UMKM",
  serviceType: "Video Script Writing",
  description:
    "Jasa pembuatan 30 script video TikTok kata-per-kata untuk UMKM: format vertikal 15-30 detik, visual & audio hook per detik, problem framing, value solution, dan CTA — dikirim dalam 1x24 jam kerja.",
  provider: { "@type": "Organization", name: "Karsa Studio", url: "https://usekarsa.com" },
  areaServed: { "@type": "Country", name: "Indonesia" },
  availableLanguage: "id",
  offers: {
    "@type": "Offer",
    price: "299000",
    priceCurrency: "IDR",
    description: "Batch Konten 30 Hari — termasuk 30 script video TikTok",
  },
};

const faqItems = [
  {
    q: "Berapa lama script video TikTok dikerjakan?",
    a: "30 naskah kata-per-kata dikirim maksimal 1x24 jam kerja setelah brief dan pembayaran terkonfirmasi. Setiap naskah sudah lengkap dengan timing per detik, arahan visual, dan CTA.",
  },
  {
    q: "Script-nya format vertikal berapa detik?",
    a: "Setiap naskah dirancang 15-30 detik format vertikal 9:16 untuk TikTok, Reels, dan Shorts — dengan pembagian per detik: hook (0-3s), problem framing, value solution, dan CTA.",
  },
  {
    q: "Apakah saya perlu punya tim video?",
    a: "Tidak. Cukup HP dengan kamera 1080p dan tripod ponsel. Setiap script menyertakan panduan visual, shot list, dan intonasi sehingga kamu atau satu orang talent bisa merekam sendiri.",
  },
  {
    q: "Apakah script bisa disesuaikan dengan produk saya?",
    a: "Ya. Brief kamu dibedah dulu: produk, target pembeli, gaya komunikasi, dan kompetitor acuan. Ada garansi kalibrasi 48 jam untuk istilah produk dan tone naskah.",
  },
];

export default function JasaScriptTikTokPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="py-12 sm:py-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Layanan Unggulan
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink mt-4 leading-tight">
            Jasa Script Video TikTok untuk UMKM — 30 Naskah Siap Rekam
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-4 max-w-3xl">
            Berhenti membuka aplikasi pencatat ide setiap Minggu malam tanpa hasil. Kamu dapat{" "}
            <strong className="text-ink">30 video scripts kata-per-kata</strong> untuk TikTok,
            Reels, dan Shorts — lengkap dengan timing per detik, arahan visual, dan CTA. Tinggal
            rekam, edit, posting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta text-ink hover:text-white font-mono text-sm font-bold hover:bg-ink transition shadow-brutal-sm min-h-[48px]"
            >
              Mulai dengan Brief — Rp299.000 <span>&rarr;</span>
            </a>
            <a
              href="https://wa.me/6281288009920?text=Halo%2C%20saya%20mau%20tanya%20jasa%20script%20video%20TikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-wasabi text-ink font-mono text-sm font-bold hover:bg-canvas transition shadow-brutal-sm min-h-[48px]"
            >
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Kenapa script kata-per-kata?</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-3">
            Sebagian besar konten UMKM gagal bukan karena kualitas kamera, tapi karena{" "}
            <strong className="text-ink">tidak ada naskah</strong>. Improvisasi di depan kamera
            menghasilkan video panjang, bertele-tele, dan jarang di-save. Script kata-per-kata
            menghilangkan tebak-tebakan: kamu tahu persis kalimat pertama, jeda, gesture, dan
            ajakan di akhir video.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Hook 0-3 detik yang menghentikan scroll",
              "Ritme bicara & intonasi per baris",
              "Arahan gesture, B-Roll, dan framing",
              "CTA yang sesuai tujuan video",
              "Satu pesan per video — tidak ambigu",
              "Format repurposable ke Reels & Shorts",
            ].map((item) => (
              <li key={item} className="bento-pop bg-white rounded-2xl p-4 text-xs sm:text-sm font-sans text-ink">
                <span className="text-terracotta font-mono font-bold mr-2">&check;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Anatomi naskah 25 detik</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-3">
            Setiap script Karsa mengikuti struktur waktu yang terbukti menahan retention:
          </p>
          <div className="mt-6 space-y-3">
            {[
              { t: "0-3 detik — Visual & Audio Hook", d: "Pembuka yang membuka pertanyaan di kepala penonton tanpa menjawabnya langsung. Contoh: \"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk?\"" },
              { t: "3-10 detik — Problem Framing", d: "Perjelas masalah yang penonton rasakan. Video yang menyebut masalah spesifik lebih sering di-save." },
              { t: "10-20 detik — Value Solution", d: "Sampaikan solusi dan bukti. Satu video membawa satu pesan, tidak lebih." },
              { t: "20-25 detik — CTA", d: "Ajakan tunggal: simpan, komentar, DM, atau kunjungi profil — sesuai tujuan video." },
            ].map((row) => (
              <div key={row.t} className="bento-pop bg-white rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-ink font-mono">{row.t}</h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 leading-relaxed">{row.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Berapa biaya jasa script video TikTok?</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-3">
            Satu harga flat <strong className="text-ink">Rp299.000 per batch</strong> — 30 naskah
            + 30 caption AIDA + 4 artikel SEO + bonus. Tanpa langganan, tanpa biaya bulanan, tanpa
            auto-debit. Bandingkan dengan agensi konten bulanan yang rata-rata Rp5-20 juta.
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
          <p className="text-[11px] text-stone-500 font-mono mt-4">
            Lihat perbandingan lengkap di halaman{" "}
            <a href="/harga" className="text-terracotta font-bold hover:underline">harga paket</a>.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Cara kerja: dari brief ke 30 naskah</h2>
          <div className="mt-6 space-y-3">
            {[
              { n: "01", t: "Isi brief", d: "Ceritakan produk, target pembeli, gaya komunikasi, dan kompetitor acuan melalui formulir singkat." },
              { n: "02", t: "Riset angle", d: "Tim Karsa membedah brief dan menganalisis satu akun kompetitor untuk menemukan sudut pesan yang belum digarap." },
              { n: "03", t: "Penulisan naskah", d: "Script, caption, dan shot-list dirangkai menjadi kalender 30 hari yang utuh — hari demi hari." },
              { n: "04", t: "Pengiriman", d: "Semua output dikirim lewat Notion Workspace + backup Docs maksimal 1x24 jam kerja setelah pembayaran terkonfirmasi." },
            ].map((step) => (
              <div key={step.n} className="bento-pop bg-white rounded-2xl p-4 sm:p-5 flex gap-4">
                <span className="font-mono text-terracotta font-bold text-sm shrink-0">{step.n}</span>
                <div>
                  <h3 className="text-sm font-bold text-ink">{step.t}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1 leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqBlock items={faqItems} title="FAQ Jasa Script Video TikTok" />
      <CtaBand
        headline="30 naskah siap rekam, minggu ini."
        sub="Isi brief hari ini — kalender konten 30 hari tiba dalam 1x24 jam kerja. Baca juga panduan lengkapnya di blog: cara membuat video TikTok produk UMKM."
      />
    </PageShell>
  );
}