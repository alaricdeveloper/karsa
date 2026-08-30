export function CtaBand({
  headline = "Mulai dari nol setiap minggu? Berhenti sekarang.",
  sub = "Isi brief hari ini — kalender konten 30 hari siap dalam 1x24 jam kerja.",
}: {
  headline?: string;
  sub?: string;
}) {
  return (
    <section className="py-12 sm:py-20 bg-terracotta text-ink border-b-2 border-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-serif leading-tight">{headline}</h2>
        <p className="text-xs sm:text-sm text-white/85 font-sans leading-relaxed mt-3 max-w-2xl mx-auto">
          {sub}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href="/harga"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink text-canvas font-mono text-sm font-bold hover:bg-wasabi hover:text-ink transition shadow-brutal-sm"
          >
            Lihat Harga &amp; Paket <span>&rarr;</span>
          </a>
          <a
            href="https://wa.me/6281288009920?text=Halo%20Karsa%20Studio%2C%20saya%20mau%20tanya%20paket%20konten"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-wasabi text-ink font-mono text-sm font-bold hover:bg-canvas hover:text-ink transition shadow-brutal-sm"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}