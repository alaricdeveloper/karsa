"use client";

import { useState } from "react";
import { X } from "lucide-react";

const CATEGORIES = [
  "Kuliner / F&B",
  "Fashion & Apparel",
  "Skincare & Beauty",
  "Jasa Profesional",
  "Gadget / Elektronik",
  "Lainnya",
];

export function NewOrderModal({
  open,
  onClose,
  onSave,
}: {
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
    status: string;
    notion_url: string | null;
    notes: string | null;
  }) => void;
}) {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [competitor, setCompetitor] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  function reset() {
    setBrand("");
    setCategory(CATEGORIES[0]);
    setCompetitor("");
    setDescription("");
    setEmail("");
    setPhone("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      order_id: "INV-" + Math.floor(100000 + Math.random() * 900000),
      brand: brand.trim(),
      category,
      competitor: competitor.trim() || null,
      description: description.trim(),
      email: email.trim(),
      phone: phone.trim(),
      status: "IN_PROGRESS",
      notion_url: null,
      notes: "Manual input via Console.",
    });
    reset();
  }

  return (
    <div
      className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Input manual brief"
    >
      <div className="bg-white border-t-2 sm:border-2 border-ink rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 shadow-brutal-lg font-sans text-xs max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b-2 border-ink mb-4">
          <h3 className="text-base sm:text-lg font-serif text-ink">Input Manual Brief Klien Baru</h3>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-ink text-2xl font-bold px-2 min-h-[44px]"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block font-mono text-ink font-bold mb-1" htmlFor="manualBrand">
              Nama Brand *
            </label>
            <input
              type="text"
              id="manualBrand"
              required
              placeholder="Contoh: Sambal Bakar Juara"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-ink font-bold mb-1" htmlFor="manualCategory">
                Kategori *
              </label>
              <select
                id="manualCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink font-bold focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-ink font-bold mb-1" htmlFor="manualCompetitor">
                Akun Kompetitor
              </label>
              <input
                type="text"
                id="manualCompetitor"
                placeholder="@kompetitor"
                value={competitor}
                onChange={(e) => setCompetitor(e.target.value)}
                className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-ink font-bold mb-1" htmlFor="manualDesc">
              Deskripsi Produk &amp; Target Konsumen *
            </label>
            <textarea
              id="manualDesc"
              rows={3}
              required
              placeholder="Deskripsi brief..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-ink font-bold mb-1" htmlFor="manualEmail">
                Email *
              </label>
              <input
                type="email"
                id="manualEmail"
                required
                placeholder="client@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
              />
            </div>
            <div>
              <label className="block font-mono text-ink font-bold mb-1" htmlFor="manualPhone">
                WhatsApp *
              </label>
              <input
                type="tel"
                id="manualPhone"
                required
                placeholder="081234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-base sm:text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
              />
            </div>
          </div>

          <div className="pt-3 border-t-2 border-ink flex justify-end gap-3 font-mono">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-3 border-2 border-ink rounded-xl font-bold hover:bg-canvas min-h-[44px] shadow-brutal-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-1/2 sm:w-auto px-6 py-3 bg-terracotta hover:bg-ink text-ink hover:text-white rounded-xl font-bold min-h-[44px] shadow-brutal"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}