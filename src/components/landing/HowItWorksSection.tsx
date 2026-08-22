import { ClipboardPenLine, PenTool, ScanSearch, Send } from "lucide-react";

const steps = [
  { number: "01", title: "Isi brief", description: "Ceritakan produk, target pembeli, gaya komunikasi, dan kompetitor acuanmu.", icon: ClipboardPenLine, color: "text-wasabi", badge: "bg-wasabi text-ink" },
  { number: "02", title: "Kami petakan angle", description: "Brief dibedah menjadi sudut pesan, tema, dan ide yang relevan dengan audiensmu.", icon: ScanSearch, color: "text-sunflower", badge: "bg-sunflower text-ink" },
  { number: "03", title: "Naskah disusun", description: "Script, caption, SEO, dan shot-list dirangkai menjadi kalender 30 hari yang utuh.", icon: PenTool, color: "text-terracotta", badge: "bg-terracotta text-white" },
  { number: "04", title: "Terima & eksekusi", description: "Semua output dikirim dalam Notion Workspace dan backup Docs, siap dibagi ke tim.", icon: Send, color: "text-wasabi", badge: "bg-wasabi text-ink" },
];

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-12 sm:py-20 bg-ink text-canvas border-b-2 border-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Alur Kerja</span>
            <h2 className="text-2xl sm:text-4xl font-serif mt-3">Dari brief sampai siap posting.</h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 font-mono max-w-sm leading-relaxed">Tidak perlu meeting panjang atau onboarding rumit. Cukup isi konteks bisnis, lalu tim Karsa mengerjakan sisanya.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {steps.map(({ number, title, description, icon: Icon, color, badge }) => (
            <div key={number} className="p-5 rounded-2xl bg-stone-900 border-2 border-stone-700 relative">
              <span className={`absolute -top-3 -left-2 badge-tag ${badge} px-2 py-1 rounded-lg text-[10px] font-mono font-bold`}>{number}</span>
              <Icon className={`w-7 h-7 ${color} mb-5`} aria-hidden="true" />
              <h3 className="font-bold font-serif text-lg">{title}</h3>
              <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 sm:p-5 rounded-2xl border-2 border-wasabi/60 bg-wasabi/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-wasabi font-bold">Komitmen pengerjaan</span>
            <p className="text-sm font-bold mt-1">Maksimal 1x24 jam kerja setelah brief dan pembayaran terkonfirmasi.</p>
          </div>
          <a href="#order" className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-wasabi text-ink font-mono text-xs font-bold hover:bg-white transition shrink-0">Isi brief sekarang <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </section>
  );
}
