"use client";

import { useState, useEffect } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { MessageSquare } from "lucide-react";

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  onSave: (
    orderId: string,
    updates: { status?: OrderStatus; notion_url?: string; notes?: string }
  ) => void;
}

export function DetailModal({ open, onClose, order, onSave }: DetailModalProps) {
  const [status, setStatus] = useState<OrderStatus>("PENDING_PAYMENT");
  const [notionUrl, setNotionUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.status);
      setNotionUrl(order.notion_url || "");
      setNotes(order.notes || "");
    }
  }, [order]);

  if (!order) return null;

  const handleSave = () => {
    onSave(order.id, {
      status,
      notion_url: notionUrl || undefined,
      notes: notes || undefined,
    });
    onClose();
  };

  const sendWhatsApp = () => {
    const phone = order.phone.replace(/[^0-9]/g, "");
    const normalized = phone.startsWith("0")
      ? "62" + phone.slice(1)
      : phone.startsWith("62")
      ? phone
      : "62" + phone;

    let message = `Halo ${order.brand}, tim Karsa Studio telah menyelesaikan penyusunan Kalender Konten 30 Hari Anda (Order ID: ${order.order_id}).\n\n`;

    if (notionUrl) {
      message += `Akses ruang kerja Notion Anda di sini:\n${notionUrl}\n\n`;
    } else {
      message += `Dokumen Anda sedang dalam tahap kurasi final dan akan segera dikirimkan.\n\n`;
    }

    message += `Jika ada pertanyaan atau penyesuaian sudut pesan dalam 48 jam, silakan balas pesan ini. Terima kasih!`;

    window.open(
      `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-2xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-sand-200 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-bold text-stone-500 block">
            {order.order_id}
          </span>
          <h3 className="text-base sm:text-lg font-bold font-serif text-sand-900 mt-0.5">
            {order.brand}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-sand-900 text-2xl px-2 py-1"
        >
          &times;
        </button>
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-xs">
        {/* Info block */}
        <div className="p-3.5 sm:p-4 bg-sand-50 border border-sand-200 rounded-xl space-y-2">
          <div className="flex justify-between font-mono text-stone-600">
            <span>Kategori Niche:</span>
            <span className="font-bold text-sand-900">{order.category}</span>
          </div>
          <div className="flex justify-between font-mono text-stone-600">
            <span>Kompetitor:</span>
            <span className="font-bold text-sand-900">{order.competitor || "-"}</span>
          </div>
          <div className="pt-2 border-t border-sand-200">
            <span className="font-mono text-stone-500 block mb-1">Deskripsi Brief:</span>
            <p className="text-stone-800 font-sans leading-relaxed text-xs sm:text-sm">
              {order.description}
            </p>
          </div>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 font-mono">
          <div className="p-2.5 sm:p-3 border border-sand-200 rounded-xl bg-white">
            <span className="text-stone-500 text-[10px] block">Email</span>
            <span className="font-bold text-sand-900 break-all text-[11px] sm:text-xs">
              {order.email}
            </span>
          </div>
          <div className="p-2.5 sm:p-3 border border-sand-200 rounded-xl bg-white">
            <span className="text-stone-500 text-[10px] block">WhatsApp</span>
            <span className="font-bold text-sand-900 text-[11px] sm:text-xs">
              {order.phone}
            </span>
          </div>
        </div>

        {/* Notion URL */}
        <div>
          <label className="block font-mono text-stone-700 text-xs mb-1">
            Tautan Notion Workspace:
          </label>
          <input
            type="url"
            value={notionUrl}
            onChange={(e) => setNotionUrl(e.target.value)}
            placeholder="https://notion.so/..."
            className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg px-3 py-2.5 sm:py-2 text-base sm:text-xs font-mono text-sand-900 focus:outline-none focus:border-sand-900 transition min-h-[44px] sm:min-h-0"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block font-mono text-stone-700 text-xs mb-1">
            Catatan Internal Tim:
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Catatan internal..."
            className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg px-3 py-2.5 sm:py-2 text-base sm:text-xs font-mono text-sand-900 focus:outline-none focus:border-sand-900 transition resize-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-mono text-stone-700 text-xs mb-1">
            Perbarui Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg px-3 py-2.5 sm:py-2 text-base sm:text-xs font-mono text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px] sm:min-h-0"
          >
            <option value="PENDING_PAYMENT">Pending Invoice</option>
            <option value="IN_PROGRESS">Penyusunan Konten (In Progress)</option>
            <option value="QC_REVIEW">Kurasi & QC Review</option>
            <option value="COMPLETED">Selesai Terkirim (Completed)</option>
          </select>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3.5 sm:p-4 border-t border-sand-200 bg-sand-50/50 flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-3">
        <button
          onClick={sendWhatsApp}
          className="w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl sm:rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Kirim Notifikasi WA</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onClose}
            className="w-1/2 sm:w-auto px-4 py-3 sm:py-2.5 border border-sand-300 rounded-xl sm:rounded-lg text-xs font-medium hover:bg-sand-200 transition min-h-[44px]"
          >
            Tutup
          </button>
          <button
            onClick={handleSave}
            className="w-1/2 sm:w-auto px-5 py-3 sm:py-2.5 bg-sand-900 hover:bg-stone-800 text-sand-50 rounded-xl sm:rounded-lg text-xs font-medium transition min-h-[44px]"
          >
            Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
}
