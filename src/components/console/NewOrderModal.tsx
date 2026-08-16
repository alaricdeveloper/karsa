"use client";

import { useState } from "react";
import type { OrderStatus } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { CATEGORIES } from "@/lib/constants";
import { generateOrderId } from "@/lib/utils";

interface NewOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (order: {
    order_id: string;
    brand: string;
    category: string;
    competitor: string | null;
    description: string;
    email: string;
    phone: string;
    status: OrderStatus;
  }) => void;
}

export function NewOrderModal({ open, onClose, onSave }: NewOrderModalProps) {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [competitor, setCompetitor] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    if (!brand.trim() || !description.trim() || !email.trim() || !phone.trim()) return;

    onSave({
      order_id: generateOrderId(),
      brand: brand.trim(),
      category,
      competitor: competitor.trim() || null,
      description: description.trim(),
      email: email.trim(),
      phone: phone.trim(),
      status: "IN_PROGRESS",
    });

    setBrand("");
    setCategory(CATEGORIES[0]);
    setCompetitor("");
    setDescription("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <div className="p-5 sm:p-6 text-xs">
        <div className="flex justify-between items-center pb-3 border-b border-sand-200 mb-4">
          <h3 className="text-base font-bold font-serif text-sand-900">Input Manual Brief Klien Baru</h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-sand-900 text-2xl px-2"
          >
            &times;
          </button>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          <div>
            <label className="block font-mono text-stone-700 mb-1">
              Nama Brand <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Contoh: Sambal Bakar Juara"
              className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg p-3 sm:p-2.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-stone-700 mb-1">Kategori *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg p-3 sm:p-2.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-stone-700 mb-1">Akun Kompetitor</label>
              <input
                type="text"
                value={competitor}
                onChange={(e) => setCompetitor(e.target.value)}
                placeholder="@kompetitor"
                className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg p-3 sm:p-2.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-stone-700 mb-1">
              Deskripsi Produk & Target Konsumen *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Deskripsi brief..."
              className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg p-3 sm:p-2.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-stone-700 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@gmail.com"
                className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg p-3 sm:p-2.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block font-mono text-stone-700 mb-1">WhatsApp *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full bg-sand-50 border border-sand-300 rounded-xl sm:rounded-lg p-3 sm:p-2.5 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-sand-200 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-3 sm:py-2 border border-sand-300 rounded-xl sm:rounded-lg min-h-[44px]"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="w-1/2 sm:w-auto px-5 py-3 sm:py-2 bg-sand-900 text-sand-50 rounded-xl sm:rounded-lg font-medium min-h-[44px]"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
