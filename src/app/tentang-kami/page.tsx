import type { Metadata } from "next";
import { PageShell } from "@/components/seo/PageShell";
import { CtaBand } from "@/components/seo/CtaBand";

export const metadata: Metadata = {
  title: "Tentang Karsa Studio — Tim di Balik Sistem Konten 30 Hari",
  description:
    "Karsa Studio adalah sistem produksi konten untuk UMKM Indonesia: 30 video scripts kata-per-kata, 4 artikel SEO, dan Notion OS dalam 1x24 jam kerja. Hubungi kami di WA 0812-8800-9920.",
  alternates: { canonical: "/tentang-kami" },
  openGraph: {
    title: "Tentang Karsa Studio",
    description: "Sistem produksi konten 30 hari untuk UMKM Indonesia.",
    images: ["/og-image.png"],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Tentang Karsa Studio",
  url: "https://usekarsa.com/tentang-kami",
  inLanguage: "id-ID",
  mainEntity: {
    "@type": "Organization",
    name: "Karsa Studio",
    url: "https://usekarsa.com",
    email: "halo@usekarsa.com",
    telephone: "+6281288009920",
    areaServed: "ID",
    foundingDate: "2026",
  },
};

export default function TentangKamiPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <section className="py-12 sm:py-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">
            Apa itu Karsa Studio?
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink mt-4 leading-tight">
            Karsa Studio — sistem konten 30 hari untuk UMKM yang ingin bergerak cepat
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed mt-4 max-w-3xl">
            Karsa Studio adalah penyedia sistem produksi konten untuk bisnis kecil dan menengah di
            Indonesia. Kami mengubah brief singkat menjadi{" "}
            <strong className="text-ink">inventaris 30 hari yang siap dieksekusi</strong>: naskah
            video kata-per-kata, caption berstruktur AIDA, artikel SEO, dan Notion OS — semuanya
            dikirim dalam 1x24 jam kerja.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Kenapa Karsa ada</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-3">
            Sebagian besar UMKM Indonesia sudah punya produk bagus, tapi berhenti di tengah jalan
            saat harus konsisten membuat konten. Bukan karena tidak mau — karena setiap minggu
            mereka mulai dari halaman kosong. Karsa dibangun dari keyakinan bahwa{" "}
            <strong className="text-ink">konsistensi mengalahkan viral</strong>: satu video viral
            tidak membangun bisnis, tetapi 30 video konsisten dengan pesan yang sama akan
            membangun kepercayaan dan penjualan.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { t: "30", d: "naskah video siap rekam per batch" },
              { t: "24 jam", d: "SLA pengiriman maksimal" },
              { t: "40+", d: "brand UMKM telah terlayani" },
            ].map((s) => (
              <div key={s.t} className="bento-pop bg-white rounded-2xl p-5 text-center">
                <div className="font-serif text-3xl text-terracotta">{s.t}</div>
                <div className="text-[11px] text-stone-600 font-sans mt-1">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">5 prinsip yang kami pegang di setiap naskah</h2>
          <div className="mt-6 space-y-3">
            {[
              "Satu video, satu pesan — penonton mengingat satu hal per video.",
              "Hook itu janji, bukan clickbait — pembuka harus ditepati isi videonya.",
              "Jual masalah sebelum produk — audiens membeli karena masalahnya relevan.",
              "Konsistensi mengalahkan viral — sistem di atas keberuntungan.",
              "Data mengalahkan perasaan — keputusan konten diambil dari retention & saves.",
            ].map((p, i) => (
              <div key={p} className="bento-pop bg-white rounded-2xl p-4 sm:p-5 flex gap-4">
                <span className="font-mono text-terracotta font-bold text-sm shrink-0">
                  Prinsip {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs sm:text-sm text-ink font-sans leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Cara kerja kami</h2>
          <div className="mt-6 space-y-3">
            {[
              { n: "01", t: "Isi brief", d: "Kamu menceritakan produk, target pembeli, gaya komunikasi, dan kompetitor acuan." },
              { n: "02", t: "Kami petakan angle", d: "Brief dibedah menjadi sudut pesan, tema, dan ide yang relevan dengan audiensmu." },
              { n: "03", t: "Naskah disusun", d: "Script, caption, SEO, dan shot-list dirangkai menjadi kalender 30 hari yang utuh." },
              { n: "04", t: "Terima & eksekusi", d: "Semua output dikirim dalam Notion Workspace dan backup Docs, maksimal 1x24 jam kerja." },
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

      <section className="py-12 sm:py-16 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-serif text-ink">Hubungi kami</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bento-pop bg-white rounded-2xl p-5">
              <h3 className="text-sm font-bold text-ink">WhatsApp</h3>
              <a href="https://wa.me/6281288009920" target="_blank" rel="noopener noreferrer" className="text-terracotta font-bold text-sm hover:underline mt-1 block">
                0812-8800-9920
              </a>
              <p className="text-[11px] text-stone-500 font-sans mt-2">Tim balas maksimal 4 jam kerja. Senin-Jumat, 09.00-18.00 WIB.</p>
            </div>
            <div className="bento-pop bg-white rounded-2xl p-5">
              <h3 className="text-sm font-bold text-ink">Email</h3>
              <a href="mailto:halo@usekarsa.com" className="text-terracotta font-bold text-sm hover:underline mt-1 block">
                halo@usekarsa.com
              </a>
              <p className="text-[11px] text-stone-500 font-sans mt-2">Untuk brief, invoice, dan pertanyaan legal.</p>
            </div>
          </div>
          <p className="text-xs text-stone-600 font-sans mt-6 leading-relaxed max-w-3xl">
            Karsa Studio melayani brand di seluruh Indonesia secara jarak jauh dan asinkron —
            kamu tidak perlu datang ke mana pun. Dokumen legal resmi tersedia di halaman{" "}
            <a href="/terms" className="text-terracotta font-bold hover:underline">Syarat &amp; Ketentuan</a>,{" "}
            <a href="/privacy" className="text-terracotta font-bold hover:underline">Kebijakan Privasi</a>, dan{" "}
            <a href="/refund" className="text-terracotta font-bold hover:underline">Jaminan SLA &amp; Refund</a>.
          </p>
        </div>
      </section>

      <CtaBand
        headline="Kenal kami? Sekarang lihat hasilnya."
        sub="Lihat contoh output sebelum memesan — atau langsung mulai dengan brief singkat."
      />
    </PageShell>
  );
}