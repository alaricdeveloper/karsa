"use client";

import Link from "next/link";
export function RegionalSection() {
  return (
<section id="regional" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
              <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-white">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Jangkauan</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-ink mt-3 leading-tight">Untuk brand di seluruh Indonesia.</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">Pengerjaan sepenuhnya jarak jauh dan asinkron — kamu tidak perlu datang ke mana pun. Semua komunikasi lewat WhatsApp &amp; email, deliverables dikirim sebagai tautan.</p>
                <div className="mt-5 grid grid-cols-3 gap-2.5 font-mono text-[10px] font-bold text-center">
                  <div className="p-3 rounded-xl border-2 border-ink bg-canvas"><span className="block text-terracotta text-sm">09.00-18.00</span>Jam kerja WIB</div>
                  <div className="p-3 rounded-xl border-2 border-ink bg-canvas"><span className="block text-terracotta text-sm">&le; 4 Jam</span>Balasan WhatsApp</div>
                  <div className="p-3 rounded-xl border-2 border-ink bg-canvas"><span className="block text-terracotta text-sm">100%</span>Jarak jauh</div>
                </div>
              </div>
              <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-ink text-canvas">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Keamanan Data</span>
                <h2 className="text-2xl sm:text-3xl font-serif mt-3 leading-tight">Brief kamu adalah milik kamu.</h2>
                <p className="text-xs sm:text-sm text-stone-300 font-sans mt-3 leading-relaxed">Isi brief, data kontak, dan dokumen kerja hanya dipakai untuk mengerjakan batch kamu — tidak dijual, tidak dibagikan, tidak dipakai untuk produk lain.</p>
                <ul className="mt-5 space-y-2.5 text-xs font-sans text-stone-200">
                  <li className="flex gap-2"><span className="text-wasabi font-bold">&#10003;</span><span>Kontak hanya untuk checkout &amp; pengiriman hasil</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">&#10003;</span><span>Hak komersial materi jadi milikmu setelah serah terima</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">&#10003;</span><span>Opsi NDA untuk brief sensitif</span></li>
                </ul>
                <Link href="/privacy" className="inline-flex items-center gap-2 mt-5 text-xs font-mono font-bold text-wasabi hover:underline">Baca kebijakan privasi <span>&rarr;</span></Link>
              </div>
            </div>
          </div>
        </section>
  );
}
