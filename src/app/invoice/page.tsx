"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

interface OrderData {
  orderId: string;
  brand: string;
  paymentMethod?: string;
}

function InvoiceContent() {
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");

  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (!paramId) return;
    try {
      const raw = localStorage.getItem("omni_order_" + paramId);
      if (raw) {
        setOrder(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, [paramId]);

  const invNumber = order?.orderId || paramId || "INV-849201";
  const invBrand = order?.brand || "Kopi Teras Senja";
  const invMethod = order?.paymentMethod
    ? order.paymentMethod.replace("_", " ") + " Terverifikasi"
    : "QRIS Terverifikasi";

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink print:bg-white!">
      {/* ACTION BAR + WORDMARK (HIDDEN IN PRINT) */}
      <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-md border-b-2 border-ink print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="font-serif text-2xl sm:text-4xl tracking-tight group-hover:rotate-1 transition-transform">
              Karsa
            </span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] bg-white border-2 border-ink rounded-xl hover:bg-canvas transition text-ink font-bold shadow-brutal-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Workspace</span>
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 min-h-[44px] bg-ink text-canvas rounded-xl hover:bg-terracotta transition font-bold shadow-brutal"
            >
              <Printer className="w-3.5 h-3.5 text-wasabi" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* OFFICIAL INVOICE PAPER CANVAS */}
      <div className="px-3.5 sm:px-6 pt-6 sm:pt-12 pb-28 md:pb-16 print:px-0! print:pt-0! print:pb-0!">
        <main className="invoice-container max-w-3xl mx-auto bento-pop rounded-3xl p-6 sm:p-12 space-y-8 bg-white print:max-w-full print:w-full print:p-6 print:m-0! print:shadow-none! print:border-ink!">
          {/* HEADER: BRAND & PAID BADGE */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-ink">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-3xl sm:text-4xl tracking-tight text-ink">
                  Karsa
                </span>
                <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-wasabi text-ink rounded font-bold">
                  Content Studio
                </span>
              </div>
              <p className="text-xs font-mono text-stone-600 mt-1 font-bold">
                usekarsa.co &bull; hello.usekarsa@gmail.com
              </p>
            </div>

            {/* PAID STAMP BADGE */}
            <div className="flex items-center gap-2 px-4 py-2 bg-wasabi border-2 border-ink text-ink rounded-2xl font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm">
              <CheckCircle className="w-4 h-4 text-emerald-800" />
              <span>Lunas &bull; Terverifikasi</span>
            </div>
          </div>

          {/* METADATA GRID: CLIENT & ORDER INFO */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-1">
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-bold block">
                Nomor Invoice
              </span>
              <span className="font-bold text-terracotta mt-0.5 block text-sm sm:text-base font-serif">
                {invNumber}
              </span>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-bold block">
                Tanggal Pembayaran
              </span>
              <span className="font-bold text-ink mt-0.5 block">
                19 Agustus 2026
              </span>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-bold block">
                Klien / Brand
              </span>
              <span className="font-bold text-ink mt-0.5 block text-sm sm:text-base font-serif">
                {invBrand}
              </span>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-bold block">
                Metode Pembayaran
              </span>
              <span className="font-bold text-ink mt-0.5 block">
                {invMethod}
              </span>
            </div>
          </div>

          {/* DELIVERABLES TABLE */}
          <div className="space-y-3 font-mono text-xs">
            <div className="border-b-2 border-ink pb-2 flex justify-between font-bold text-ink text-[11px] uppercase tracking-wider">
              <span>Rincian Layanan &amp; Deliverables</span>
              <span>Jumlah</span>
            </div>

            <div className="divide-y-2 divide-ink text-stone-800">
              <div className="py-3.5 flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="font-bold text-ink block font-sans text-sm sm:text-base">
                    Paket Kalender Konten 30 Hari Karsa
                  </span>
                  <span className="text-stone-600 text-xs">
                    30 Naskah Video Pendek Kata-per-Kata, 30 Takarir AIDA, dan
                    4 Artikel SEO
                  </span>
                </div>
                <span className="font-bold text-ink text-sm sm:text-base font-serif">
                  Rp 299.000
                </span>
              </div>

              <div className="py-2.5 flex justify-between text-stone-700">
                <span>
                  Notion Content OS Database + Calendar Matrix View
                </span>
                <span className="text-emerald-800 font-bold">Termasuk</span>
              </div>

              <div className="py-2.5 flex justify-between text-stone-700">
                <span>
                  Audit Celah 1 Akun Kompetitor &amp; Positioning Blueprint
                </span>
                <span className="text-emerald-800 font-bold">Termasuk</span>
              </div>

              <div className="py-2.5 flex justify-between text-stone-700">
                <span>Panduan Shot-List B-Roll Kamera HP</span>
                <span className="text-emerald-800 font-bold">Termasuk</span>
              </div>

              <div className="py-2.5 flex justify-between text-stone-700">
                <span>Garansi Kalibrasi Sudut Pesan 48 Jam</span>
                <span className="text-emerald-800 font-bold">Termasuk</span>
              </div>
            </div>

            {/* TOTAL BOX */}
            <div className="pt-4 border-t-2 border-ink flex justify-between items-center text-sm font-bold text-ink">
              <span className="font-sans">Total Pembayaran Lunas</span>
              <span className="text-2xl sm:text-3xl font-serif text-terracotta">
                Rp 299.000
              </span>
            </div>
          </div>

          {/* SLA GUARANTEE CALLOUT */}
          <div className="p-4 bg-canvas border-2 border-ink rounded-2xl font-mono text-xs space-y-1 text-stone-800 shadow-brutal-sm">
            <div className="flex items-center gap-2 font-bold text-ink">
              <Clock className="w-4 h-4 text-terracotta" />
              <span>SLA Pengerjaan: Maksimal 24 Jam Kerja</span>
            </div>
            <p className="text-xs font-sans text-stone-600 leading-relaxed">
              Tim Karsa sedang menyusun dan mengurasi 30 naskah kontenmu.
              Berkas Notion dan Studio Teleprompter akan otomatis aktif di
              Customer Hub kamu.
            </p>
          </div>

          {/* FOOTER LINK TO CUSTOMER DASHBOARD (NO PRINT) */}
          <div className="pt-4 text-center print:hidden">
            <Link
              href={`/portal/${invNumber}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-white rounded-2xl font-mono text-xs font-bold hover:bg-ink transition shadow-brutal min-h-[48px]"
            >
              <span>Buka Customer Hub Sekarang</span>
              <ArrowRight className="w-4 h-4 text-wasabi" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas flex items-center justify-center">
          <p className="text-sm text-stone-500 font-mono">Memuat invoice...</p>
        </div>
      }
    >
      <InvoiceContent />
    </Suspense>
  );
}
