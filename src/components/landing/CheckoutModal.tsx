"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { QrCode, Scan, CheckCircle, Check } from "lucide-react";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  order: {
    orderId: string;
    brand: string;
    category: string;
    competitor: string;
    description: string;
    email: string;
    phone: string;
  } | null;
}

export function CheckoutModal({ open, onClose, order }: CheckoutModalProps) {
  const [stage, setStage] = useState<1 | 2>(1);

  if (!order) return null;

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSimulate = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: order.brand,
          category: order.category,
          competitor: order.competitor,
          description: order.description,
          email: order.email,
          phone: order.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membuat pesanan");
      setStage(2);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStage(1);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-md">
      <div className="p-6 sm:p-8 text-center relative">
        {/* Stage 1: Invoice & QRIS */}
        {stage === 1 && (
          <>
            <div className="w-10 h-10 bg-sand-100 text-sand-900 rounded-full flex items-center justify-center mx-auto mb-3 border border-sand-200">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-sand-900 font-serif">Invoice &amp; Pembayaran Instan</h3>
            <p className="text-xs text-stone-600 mt-1">Nomor Pesanan: <span className="font-mono font-bold text-sand-900">{order.orderId}</span></p>

            <div className="mt-4 p-3.5 rounded-xl bg-sand-50 border border-sand-200 text-left text-xs font-mono space-y-1.5">
              <div className="flex justify-between"><span className="text-stone-500">Brand:</span><span className="text-sand-900 font-bold">{order.brand}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Paket:</span><span>30 Days Batch + 5 Bonus Stack</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Total Biaya:</span><span className="text-sand-900 font-bold">Rp299.000</span></div>
            </div>

            {/* QRIS Canvas */}
            <div className="mt-4 p-3.5 bg-white border border-sand-300 rounded-xl inline-block shadow-inner">
              <div className="w-32 h-32 sm:w-36 sm:h-36 bg-stone-900 text-white flex flex-col items-center justify-center rounded text-[10px] font-mono gap-1 mx-auto">
                <Scan className="w-7 h-7 text-sand-300" />
                <span>SIMULASI QRIS</span>
                <span className="text-[8px] text-stone-400">NMID: ID102030405</span>
              </div>
            </div>

            {submitError && (
              <p className="mt-3 text-xs text-red-600 font-mono">{submitError}</p>
            )}
            <button onClick={handleSimulate} disabled={submitting} className="mt-5 w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-xl transition flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50">
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              <span>{submitting ? "Memproses..." : "Simulasikan Pembayaran Berhasil"}</span>
            </button>
            <button onClick={handleClose} className="mt-3 text-xs font-mono text-stone-500 hover:text-sand-900 block w-full text-center py-2">Batal / Tutup</button>
          </>
        )}

        {/* Stage 2: Progress Tracker */}
        {stage === 2 && (
          <div className="text-left">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mb-3">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-sand-900 font-serif">Pembayaran Terverifikasi!</h3>
            <p className="text-xs text-stone-600 mt-1">Data brief berhasil disimpan. Status antrean aktif:</p>

            <div className="mt-6 space-y-4 font-mono text-xs">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0">&#10003;</span>
                <div>
                  <div className="font-bold text-sand-900">Brief &amp; Pembayaran Diterima</div>
                  <div className="text-[10px] text-stone-500">Tersimpan di antrean sistem</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-sand-900 text-white flex items-center justify-center text-[10px] shrink-0 animate-pulse">&#9679;</span>
                <div>
                  <div className="font-bold text-sand-900">Penyusunan 6 Modul + 5 Bonus</div>
                  <div className="text-[10px] text-stone-500">Estimasi selesai dalam 1x24 jam</div>
                </div>
              </div>
              <div className="flex items-start gap-3 opacity-40">
                <span className="w-5 h-5 rounded-full border border-sand-300 flex items-center justify-center text-[10px] shrink-0">3</span>
                <div>
                  <div className="font-bold text-sand-900">Pengiriman Link Notion &amp; Docs</div>
                  <div className="text-[10px] text-stone-500">Akan dikirim ke email &amp; WhatsApp</div>
                </div>
              </div>
            </div>

            <button onClick={handleClose} className="mt-8 w-full py-3.5 bg-sand-900 text-sand-50 text-xs rounded-xl font-medium min-h-[44px]">
              Selesai &amp; Tutup Jendela
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
