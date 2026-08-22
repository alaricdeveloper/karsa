"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { generateOrderId } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const GOAL_OPTIONS = ["Edukasi & Awareness", "Leads & DM", "Penjualan Produk", "Positioning Brand", "Campuran"];
const TONE_OPTIONS = ["Edukasi & Tepercaya", "Santai & Conversational", "Bold & Direct", "Premium & Minimal", "Belum Yakin"];
const inputClassName = "w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans min-h-[46px]";

export function OrderForm() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [competitor, setCompetitor] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(GOAL_OPTIONS[0]);
  const [tone, setTone] = useState(TONE_OPTIONS[0]);
  const [channel, setChannel] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!brand.trim()) newErrors.brand = "Wajib diisi.";
    if (!description.trim() || description.trim().length < 15) newErrors.description = "Wajib diisi minimal 15 karakter.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = "Format email tidak valid.";
    if (!phone.trim() || !/^(\+62|62|0)8[1-9][0-9]{7,11}$/.test(phone.trim())) newErrors.phone = "Harus diawali 08 atau +62 (10-14 digit).";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const orderId = generateOrderId();
      const orderData = {
        orderId,
        brand: brand.trim(),
        category,
        competitor: competitor.trim(),
        description: description.trim(),
        goal,
        tone,
        channel: channel.trim(),
        email: email.trim(),
        phone: phone.trim(),
        timestamp: new Date().toISOString(),
        status: "PENDING",
      };

      // Keep the existing checkout handoff; the added brief fields remain available to the next page.
      localStorage.setItem("karsa_checkout_" + orderId, JSON.stringify(orderData));
      setStatus("Brief tersimpan. Mengarahkan kamu ke checkout...");

      if (!user) {
        router.push("/login?redirect=/checkout&id=" + orderId);
      } else {
        router.push("/checkout?id=" + orderId);
      }
    } catch {
      setSubmitting(false);
      setStatus("Brief belum tersimpan. Coba lagi atau gunakan browser lain.");
    }
  };

  return (
    <section id="order" className="py-12 sm:py-20 bg-canvas border-b-2 border-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracotta text-white">SLA Maks. 24 Jam</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Mulai dengan brief singkat.</h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 font-mono">Jawabanmu membantu tim Karsa menulis kalender yang terasa spesifik untuk bisnis kamu.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          <form id="orderForm" onSubmit={handleSubmit} className="lg:col-span-7 bento-pop p-5 sm:p-10 rounded-3xl space-y-4 bg-white">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputBrand">Nama Brand / Bisnis *</label>
              <input id="inputBrand" type="text" required autoComplete="organization" value={brand} onChange={(event) => setBrand(event.target.value)} placeholder="Contoh: Kopi Teras Senja" className={inputClassName} />
              {errors.brand && <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.brand}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCategory">Kategori Industri *</label>
                <select id="inputCategory" required value={category} onChange={(event) => setCategory(event.target.value)} className={inputClassName}>{CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}</select>
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCompetitor">1 Akun Kompetitor Utama</label>
                <input id="inputCompetitor" type="text" value={competitor} onChange={(event) => setCompetitor(event.target.value)} placeholder="@namakompetitor" className={inputClassName} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputDesc">Produk Utama &amp; Target Pembeli *</label>
              <textarea id="inputDesc" rows={3} required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Jelaskan produk unggulan, rentang harga, dan target pembeli utama kamu..." className={`${inputClassName} min-h-0`} />
              {errors.description && <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputGoal">Tujuan Konten Utama *</label>
                <select id="inputGoal" required value={goal} onChange={(event) => setGoal(event.target.value)} className={inputClassName}>{GOAL_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}</select>
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputTone">Tone Komunikasi *</label>
                <select id="inputTone" required value={tone} onChange={(event) => setTone(event.target.value)} className={inputClassName}>{TONE_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}</select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputChannel">Platform Prioritas</label>
              <input id="inputChannel" type="text" value={channel} onChange={(event) => setChannel(event.target.value)} placeholder="Contoh: Instagram Reels, TikTok, Threads" className={inputClassName} />
              <p className="text-[10px] text-stone-500 font-sans mt-1">Boleh dikosongkan kalau kamu ingin kami bantu menentukan prioritasnya.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputEmail">Email Penerima File *</label>
                <input id="inputEmail" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" className={inputClassName} />
                {errors.email && <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputPhone">Nomor WhatsApp Aktif *</label>
                <input id="inputPhone" type="tel" required autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="081234567890" className={inputClassName} />
                {errors.phone && <p className="text-rose-600 text-[11px] font-mono mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="pt-2 sm:pt-3">
              <button type="submit" disabled={submitting} className="w-full py-4 bg-terracotta hover:bg-ink disabled:opacity-70 disabled:cursor-wait text-white font-mono font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[50px] shadow-brutal">
                <span>{submitting ? "Menyimpan brief..." : "Kirim Brief & Lanjut ke Checkout (Rp299.000)"}</span>
                {!submitting && <ArrowRight className="w-4 h-4 text-wasabi" aria-hidden="true" />}
              </button>
              <p role="status" aria-live="polite" className={`text-center text-[10px] sm:text-[11px] mt-2.5 min-h-4 ${status.includes("belum") ? "text-terracotta font-bold" : "text-stone-600"}`}>{status}</p>
              <p className="text-center text-[10px] sm:text-[11px] font-mono text-stone-500 mt-2.5 sm:mt-3 font-bold">Garansi kalibrasi sudut pesan selama 48 jam sudah termasuk.</p>
              <p className="text-center text-[10px] text-stone-500 mt-2 leading-relaxed">Data kontak hanya digunakan untuk checkout dan pengiriman hasil. Lihat <Link href="/privacy" className="underline hover:text-terracotta">kebijakan privasi</Link>.</p>
            </div>
          </form>

          <aside className="lg:col-span-5 space-y-4">
            <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-ink text-canvas">
              <div className="flex items-center justify-between gap-3 pb-4 border-b-2 border-stone-700">
                <div><span className="text-[10px] font-mono uppercase tracking-wider text-wasabi font-bold">Karsa Content Batch</span><h3 className="font-serif text-2xl mt-1">30 Hari Siap Jalan</h3></div>
                <span className="text-xl font-bold font-mono text-wasabi">Rp299k</span>
              </div>
              <ul className="space-y-3 mt-5 text-xs font-sans text-stone-200">
                <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>30 video script kata-per-kata</span></li>
                <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>30 caption AIDA dan riset tagar</span></li>
                <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>4 artikel SEO dan Notion Content OS</span></li>
                <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>5 bonus, shot-list, dan audit angle</span></li>
              </ul>
              <div className="mt-5 pt-4 border-t-2 border-stone-700 text-[11px] font-mono text-stone-400 leading-relaxed">Satu kali bayar. Tidak ada langganan otomatis. Brief diproses setelah pembayaran terkonfirmasi.</div>
            </div>

            <div className="p-5 rounded-2xl border-2 border-ink bg-white">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4 text-ink" aria-hidden="true" /></div>
                <div><h4 className="font-bold text-sm">Brief kamu aman dan terarah.</h4><p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">Kami memakai jawabanmu sebagai acuan tone, target, dan sudut pesan. Kalau ada yang perlu dikalibrasi, kamu punya waktu 48 jam setelah file diterima.</p></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
