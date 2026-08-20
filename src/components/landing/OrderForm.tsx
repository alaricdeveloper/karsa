"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { generateOrderId } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export function OrderForm() {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      brand: brand.trim(),
      category,
      competitor: competitor.trim(),
      description: description.trim(),
      email: email.trim(),
      phone: phone.trim(),
      timestamp: new Date().toISOString(),
      status: "PENDING",
    };

    localStorage.setItem("karsa_checkout_" + orderId, JSON.stringify(orderData));

    if (!user) {
      router.push("/login?redirect=/checkout&id=" + orderId);
    } else {
      router.push("/checkout?id=" + orderId);
    }
  };

  return (
    <section id="order" className="py-12 sm:py-20 bg-canvas border-b-2 border-ink">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracotta text-white">
            SLA Maks. 24 Jam
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Formulir Brief Kalender 30 Hari</h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 font-mono">Detail di bawah digunakan sebagai parameter penulisan seluruh kalender konten Anda.</p>
        </div>

        <form id="orderForm" onSubmit={handleSubmit} className="bento-pop p-5 sm:p-10 rounded-3xl space-y-4 bg-white">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">Nama Brand / Bisnis *</label>
            <input
              type="text"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Contoh: Kopi Teras Senja"
              className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans min-h-[46px]"
            />
            {errors.brand && (
              <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.brand}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">Kategori Industri *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans min-h-[46px]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">1 Akun Kompetitor Utama</label>
              <input
                type="text"
                value={competitor}
                onChange={(e) => setCompetitor(e.target.value)}
                placeholder="@namakompetitor"
                className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans min-h-[46px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">Produk Utama & Target Pembeli *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan produk unggulan, rentang harga, dan siapa target pembeli utama Anda..."
              className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans"
            />
            {errors.description && (
              <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">Email Penerima File *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans min-h-[46px]"
              />
              {errors.email && (
                <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">Nomor WhatsApp Aktif *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans min-h-[46px]"
              />
              {errors.phone && (
                <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="pt-2 sm:pt-3">
            <button type="submit" className="w-full py-4 bg-terracotta hover:bg-ink text-white font-mono font-bold rounded-2xl text-xs sm:text-sm min-h-[48px] sm:min-h-[50px] shadow-brutal transition flex items-center justify-center gap-2">
              <span>Kirim Brief &amp; Lanjut ke Checkout (Rp299.000)</span>
              <ArrowRight className="w-4 h-4 text-wasabi" />
            </button>
            <p className="text-center text-[10px] sm:text-[11px] font-mono text-stone-500 mt-2.5 sm:mt-3 font-bold">
              Garansi kalibrasi sudut pesan selama 48 jam gratis.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
