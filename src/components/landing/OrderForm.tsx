"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { generateOrderId } from "@/lib/utils";

interface OrderFormProps {
  onOrderCreated: (order: {
    orderId: string;
    brand: string;
    category: string;
    competitor: string;
    description: string;
    email: string;
    phone: string;
  }) => void;
}

export function OrderForm({ onOrderCreated }: OrderFormProps) {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [competitor, setCompetitor] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!brand.trim()) newErrors.brand = "Wajib diisi.";
    if (!description.trim() || description.trim().length < 15)
      newErrors.description = "Wajib diisi minimal 15 karakter.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = "Format email tidak valid.";
    if (
      !phone.trim() ||
      !/^(\+62|62|0)8[1-9][0-9]{7,11}$/.test(phone.trim())
    ) {
      newErrors.phone = "Harus diawali 08 atau +62 (10-14 digit).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = generateOrderId();

    onOrderCreated({
      orderId,
      brand: brand.trim(),
      category,
      competitor: competitor.trim(),
      description: description.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  return (
    <form id="orderForm" onSubmit={handleSubmit} className="bento-card p-5 sm:p-10 rounded-2xl space-y-4 sm:space-y-6">
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5">Nama Brand / Bisnis *</label>
        <input
          type="text"
          required
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Contoh: Kopi Teras Senja"
          className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3.5 py-3 text-base sm:text-sm text-sand-900 focus:outline-none focus:border-sand-900 font-sans transition min-h-[44px]"
        />
        {errors.brand && (
          <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.brand}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5">Kategori Industri *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3.5 py-3 text-base sm:text-sm text-sand-900 focus:outline-none focus:border-sand-900 font-sans transition min-h-[44px]"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5">1 Akun Kompetitor Utama</label>
          <input
            type="text"
            value={competitor}
            onChange={(e) => setCompetitor(e.target.value)}
            placeholder="@namakompetitor"
            className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3.5 py-3 text-base sm:text-sm text-sand-900 focus:outline-none focus:border-sand-900 font-sans transition min-h-[44px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5">Produk Utama & Target Pembeli *</label>
        <textarea
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Jelaskan produk unggulan, rentang harga, dan siapa pembeli utama Anda (misal: pekerja kantoran 22-30 tahun yang butuh opsi kopi rendah asam)."
          className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3.5 py-3 text-base sm:text-sm text-sand-900 focus:outline-none focus:border-sand-900 font-sans transition"
        />
        {errors.description && (
          <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5">Email Pengiriman File *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3.5 py-3 text-base sm:text-sm text-sand-900 focus:outline-none focus:border-sand-900 font-sans transition min-h-[44px]"
          />
          {errors.email && (
            <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5">Nomor WhatsApp Aktif *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="081234567890"
            className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3.5 py-3 text-base sm:text-sm text-sand-900 focus:outline-none focus:border-sand-900 font-sans transition min-h-[44px]"
          />
          {errors.phone && (
            <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <button type="submit" className="w-full py-4 bg-sand-900 hover:bg-stone-800 text-sand-50 font-medium rounded-xl text-sm transition flex items-center justify-center gap-2 min-h-[48px] shadow-sm">
          <span>Kirim Brief &amp; Buat Invoice (Rp299.000)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-center text-[10px] sm:text-[11px] font-mono text-stone-500 mt-3">
          Garansi kalibrasi sudut pesan selama 48 jam gratis.
        </p>
      </div>
    </form>
  );
}
