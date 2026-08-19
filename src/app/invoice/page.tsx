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
    <>
      <style>{`
        @media print {
          body {
            background-color: #FFFFFF !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .invoice-container {
            border: none !important;
            box-shadow: none !important;
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="bg-sand-100 text-sand-900 font-sans antialiased selection:bg-sand-900 selection:text-sand-50 py-6 sm:py-12 px-3 sm:px-6 min-h-screen">
        {/* ACTION BAR (HIDDEN IN PRINT) */}
        <div className="max-w-3xl mx-auto mb-5 flex items-center justify-between no-print font-mono text-xs">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-sand-300 rounded-xl hover:bg-sand-200 transition text-stone-700 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Workspace</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 bg-sand-900 text-sand-50 rounded-xl hover:bg-stone-800 transition font-semibold shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>

        {/* OFFICIAL INVOICE PAPER CANVAS */}
        <main className="invoice-container max-w-3xl mx-auto bg-white border border-sand-300 rounded-3xl p-6 sm:p-12 shadow-md space-y-8">
          {/* HEADER: BRAND & PAID BADGE */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-sand-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-3xl tracking-tight text-sand-900">
                  Karsa
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-sand-800 rounded font-bold">
                  Content Studio
                </span>
              </div>
              <p className="text-xs font-mono text-stone-500 mt-1">
                usekarsa.co &bull; hello.usekarsa@gmail.com
              </p>
            </div>

            {/* PAID STAMP BADGE */}
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border-2 border-emerald-500 text-emerald-800 rounded-xl font-mono text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Lunas &bull; Terverifikasi</span>
            </div>
          </div>

          {/* METADATA GRID: CLIENT & ORDER INFO */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-1">
            <div>
              <span className="text-stone-400 text-[10px] uppercase block">
                Nomor Invoice
              </span>
              <span className="font-bold text-sand-900 mt-0.5 block text-sm">
                {invNumber}
              </span>
            </div>
            <div>
              <span className="text-stone-400 text-[10px] uppercase block">
                Tanggal Pembayaran
              </span>
              <span className="font-bold text-sand-900 mt-0.5 block">
                19 Agustus 2026
              </span>
            </div>
            <div>
              <span className="text-stone-400 text-[10px] uppercase block">
                Klien / Brand
              </span>
              <span className="font-bold text-sand-900 mt-0.5 block text-sm">
                {invBrand}
              </span>
            </div>
            <div>
              <span className="text-stone-400 text-[10px] uppercase block">
                Metode Pembayaran
              </span>
              <span className="font-bold text-sand-900 mt-0.5 block">
                {invMethod}
              </span>
            </div>
          </div>

          {/* DELIVERABLES TABLE */}
          <div className="space-y-3 font-mono text-xs">
            <div className="border-b border-sand-900 pb-2 flex justify-between font-bold text-sand-900 text-[11px] uppercase tracking-wider">
              <span>Rincian Layanan &amp; Deliverables</span>
              <span>Jumlah</span>
            </div>

            <div className="divide-y divide-sand-200 text-stone-800">
              <div className="py-3 flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="font-bold text-sand-900 block font-sans text-sm">
                    Paket Kalender Konten 30 Hari Karsa
                  </span>
                  <span className="text-stone-500 text-[11px]">
                    30 Naskah Video Pendek Kata-per-Kata, 30 Takarir AIDA, dan
                    4 Artikel SEO
                  </span>
                </div>
                <span className="font-bold text-sand-900">Rp 299.000</span>
              </div>

              <div className="py-2.5 flex justify-between text-stone-600">
                <span>
                  Notion Content OS Database + Calendar Matrix View
                </span>
                <span className="text-emerald-700 font-bold">Termasuk</span>
              </div>

              <div className="py-2.5 flex justify-between text-stone-600">
                <span>
                  Audit Celah 1 Akun Kompetitor &amp; Positioning Blueprint
                </span>
                <span className="text-emerald-700 font-bold">Termasuk</span>
              </div>

              <div className="py-2.5 flex justify-between text-stone-600">
                <span>Panduan Shot-List B-Roll Kamera HP</span>
                <span className="text-emerald-700 font-bold">Termasuk</span>
              </div>

              <div className="py-2.5 flex justify-between text-stone-600">
                <span>Garansi Kalibrasi Sudut Pesan 48 Jam</span>
                <span className="text-emerald-700 font-bold">Termasuk</span>
              </div>
            </div>

            {/* TOTAL BOX */}
            <div className="pt-4 border-t-2 border-sand-900 flex justify-between items-center text-sm font-bold text-sand-900">
              <span className="font-sans">Total Pembayaran Lunas</span>
              <span className="text-2xl font-serif text-sand-900">
                Rp 299.000
              </span>
            </div>
          </div>

          {/* SLA GUARANTEE CALLOUT */}
          <div className="p-4 bg-sand-50 border border-sand-200 rounded-2xl font-mono text-xs space-y-1 text-stone-700">
            <div className="flex items-center gap-2 font-bold text-sand-900">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>SLA Pengerjaan: Maksimal 24 Jam Kerja</span>
            </div>
            <p className="text-[11px] font-sans text-stone-600">
              Tim Karsa sedang menyusun dan mengurasi 30 naskah kontenmu.
              Berkas Notion dan Studio Teleprompter akan otomatis aktif di
              Customer Hub kamu.
            </p>
          </div>

          {/* FOOTER LINK TO CUSTOMER DASHBOARD (NO PRINT) */}
          <div className="pt-4 text-center no-print">
            <Link
              href={`/portal/${invNumber}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-sand-900 text-sand-50 rounded-xl font-mono text-xs font-bold hover:bg-stone-800 transition shadow-md min-h-[48px]"
            >
              <span>Buka Customer Hub Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default function InvoicePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="text-sm text-stone-500 font-mono">Memuat invoice...</p>
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  );
}
