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
const inputClassName =
  "w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans min-h-[46px]";

export function OrderFormSection() {
  const router = useRouter();
  const [form, setForm] = useState({
    brand: "", category: CATEGORIES[0], competitor: "", description: "",
    goal: GOAL_OPTIONS[0], tone: TONE_OPTIONS[0], channel: "", email: "", phone: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const setFormField = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormStatus("");
    if (!form.brand.trim() || !form.description.trim() || !form.email.trim() || !form.phone.trim()) {
      setFormStatus("Lengkapi semua kolom wajib terlebih dahulu.");
      return;
    }
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const orderId = generateOrderId();
      const orderData = {
        orderId,
        brand: form.brand.trim(),
        category: form.category,
        competitor: form.competitor.trim(),
        description: form.description.trim(),
        goal: form.goal,
        tone: form.tone,
        channel: form.channel.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        timestamp: new Date().toISOString(),
        status: "IN_PROGRESS",
      };
      localStorage.setItem("omni_order_" + orderId, JSON.stringify(orderData));
      localStorage.setItem("karsa_checkout_" + orderId, JSON.stringify(orderData));
      setFormStatus("Brief tersimpan. Mengarahkan kamu ke checkout...");
      window.setTimeout(() => {
        if (!user) {
          router.push("/login?redirect=/checkout&id=" + orderId);
        } else {
          router.push("/checkout?id=" + orderId);
        }
      }, 300);
    } catch {
      setFormStatus("Brief belum tersimpan. Coba lagi atau gunakan browser lain.");
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
                  <input id="inputBrand" type="text" required autoComplete="organization" value={form.brand} onChange={(event) => setFormField("brand", event.target.value)} placeholder="Contoh: Kopi Teras Senja" className={inputClassName} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCategory">Kategori Industri *</label>
                    <select id="inputCategory" required value={form.category} onChange={(event) => setFormField("category", event.target.value)} className={inputClassName}>
                      {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCompetitor">1 Akun Kompetitor Utama</label>
                    <input id="inputCompetitor" type="text" value={form.competitor} onChange={(event) => setFormField("competitor", event.target.value)} placeholder="@namakompetitor" className={inputClassName} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputDesc">Produk Utama &amp; Target Pembeli *</label>
                  <textarea id="inputDesc" rows={3} required value={form.description} onChange={(event) => setFormField("description", event.target.value)} placeholder="Jelaskan produk unggulan, rentang harga, dan target pembeli utama kamu..." className={inputClassName}></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputGoal">Tujuan Konten Utama *</label>
                    <select id="inputGoal" required value={form.goal} onChange={(event) => setFormField("goal", event.target.value)} className={inputClassName}>
                      {GOAL_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputTone">Tone Komunikasi *</label>
                    <select id="inputTone" required value={form.tone} onChange={(event) => setFormField("tone", event.target.value)} className={inputClassName}>
                      {TONE_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputChannel">Platform Prioritas</label>
                  <input id="inputChannel" type="text" value={form.channel} onChange={(event) => setFormField("channel", event.target.value)} placeholder="Contoh: Instagram Reels, TikTok, Threads" className={inputClassName} />
                  <p className="text-[10px] text-stone-500 font-sans mt-1">Boleh dikosongkan kalau kamu ingin kami bantu menentukan prioritasnya.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputEmail">Email Penerima File *</label>
                    <input id="inputEmail" type="email" required autoComplete="email" value={form.email} onChange={(event) => setFormField("email", event.target.value)} placeholder="nama@email.com" className={inputClassName} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputPhone">Nomor WhatsApp Aktif *</label>
                    <input id="inputPhone" type="tel" required autoComplete="tel" value={form.phone} onChange={(event) => setFormField("phone", event.target.value)} placeholder="081234567890" className={inputClassName} />
                  </div>
                </div>
                <div className="pt-2 sm:pt-3">
                  <button type="submit" className="w-full py-4 bg-terracotta hover:bg-ink text-white font-mono font-bold rounded-2xl text-sm sm:text-base transition flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[50px] shadow-brutal">
                    <span>Kirim Brief &amp; Lanjut ke Checkout (Rp299.000)</span>
                    <ArrowRight className="w-4 h-4 text-wasabi" />
                  </button>
                  <p id="formStatus" role="status" aria-live="polite" className="text-center text-[10px] sm:text-[11px] text-stone-600 mt-2.5 min-h-4">{formStatus}</p>
                  <p className="text-center text-[10px] sm:text-[11px] font-mono text-stone-500 mt-2.5 sm:mt-3 font-bold">
                    Garansi kalibrasi sudut pesan selama 48 jam sudah termasuk.
                  </p>
                  <p className="text-center text-[10px] text-stone-500 mt-2 leading-relaxed">Data kontak hanya digunakan untuk checkout dan pengiriman hasil. Lihat <Link href="/privacy" className="underline hover:text-terracotta">kebijakan privasi</Link>.</p>
                </div>
              </form>
              <aside className="lg:col-span-5 space-y-4">
                <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-ink text-canvas">
                  <div className="flex items-center justify-between gap-3 pb-4 border-b-2 border-stone-700">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-wasabi font-bold">Karsa Content Batch</span>
                      <h3 className="font-serif text-2xl mt-1">30 Hari Siap Jalan</h3>
                    </div>
                    <span className="text-xl font-bold font-mono text-wasabi">Rp299.000</span>
                  </div>
                  <ul className="space-y-3 mt-5 text-xs font-sans text-stone-200">
                    <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>30 video script kata-per-kata</span></li>
                    <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>30 caption AIDA dan riset tagar</span></li>
                    <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>4 artikel SEO dan Notion Content OS</span></li>
                    <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>5 bonus, shot-list, dan audit angle</span></li>
                  </ul>
                  <div className="mt-5 pt-4 border-t-2 border-stone-700 text-[11px] font-mono text-stone-400 leading-relaxed">
                    Satu kali bayar. Tidak ada langganan otomatis. Brief diproses setelah pembayaran terkonfirmasi.
                  </div>
                </div>
                <div className="p-5 rounded-2xl border-2 border-ink bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-ink" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Brief kamu aman dan terarah.</h4>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">Kami memakai jawabanmu sebagai acuan tone, target, dan sudut pesan. Kalau ada yang perlu dikalibrasi, kamu punya waktu 48 jam setelah file diterima.</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
  );
}
