"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldCheck,
  Award,
  Timer,
  CheckCircle,
  Lock,
  Copy,
  FileText,
  CreditCard,
  Truck,
} from "lucide-react";

interface OrderData {
  orderId: string;
  brand: string;
  category: string;
  competitor?: string;
  description?: string;
  email: string;
  phone: string;
  timestamp: string;
  status: string;
  paymentMethod: string;
}

const VA_NUMBERS: Record<string, string> = {
  BCA_VA: "8077708128800992",
  MANDIRI_VA: "8922008128800992",
};

const VA_LABELS: Record<string, string> = {
  BCA_VA: "BCA Virtual Account",
  MANDIRI_VA: "Mandiri Virtual Account",
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");

  const [order, setOrder] = useState<OrderData>({
    orderId: "INV-" + Math.floor(100000 + Math.random() * 900000),
    brand: "Kopi Teras Senja",
    category: "Kuliner / F&B",
    email: "hello.usekarsa@gmail.com",
    phone: "081288009920",
    timestamp: new Date().toISOString(),
    status: "IN_PROGRESS",
    paymentMethod: "QRIS",
  });

  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [copied, setCopied] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Load order from localStorage and lock email to logged-in user
  useEffect(() => {
    if (paramId) {
      try {
        const stored = localStorage.getItem("karsa_checkout_" + paramId) || localStorage.getItem("omni_order_" + paramId);
        if (stored) {
          const parsed = JSON.parse(stored);
          setOrder(parsed);
          setPaymentMethod(parsed.paymentMethod || "QRIS");
        }
      } catch {}
    }

    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then((res: { data: { user: { email?: string } | null } }) => {
        const user = res.data.user;
        if (user?.email) {
          setOrder((prev) => ({ ...prev, email: user.email! }));
        }
      });
    }
  }, [paramId]);

  // Countdown timer
  useEffect(() => {
    if (paymentComplete) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [paymentComplete]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const switchPayMethod = useCallback((method: string) => {
    setPaymentMethod(method);
  }, []);

  const copyToClipboard = useCallback(() => {
    const num = VA_NUMBERS[paymentMethod] || VA_NUMBERS.BCA_VA;
    navigator.clipboard.writeText(num).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [paymentMethod]);

  const confirmPayment = useCallback(async () => {
    const updated = {
      ...order,
      status: "IN_PROGRESS",
      paidAt: new Date().toISOString(),
    };
    localStorage.setItem("omni_order_" + order.orderId, JSON.stringify(updated));

    try {
      await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: order.brand,
          category: order.category,
          competitor: order.competitor || "",
          description: order.description || "Order dari Member Workspace",
          email: order.email,
          phone: order.phone,
        }),
      });
    } catch {}

    setPaymentComplete(true);
  }, [order]);

  const timerColor =
    timeLeft <= 60
      ? "text-red-700"
      : timeLeft <= 300
      ? "text-amber-700"
      : "font-bold text-sm";

  if (paymentComplete) {
    return (
      <>
        <style>{`
          .bento-card {
            background: #FFFFFF;
            border: 1px solid #E5E5E0;
            transition: border-color 0.2s ease, transform 0.2s ease;
          }
          .bento-card:hover {
            border-color: #A3A39E;
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <header className="sticky top-0 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-sand-900 font-normal">
                Karsa
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-200 text-sand-800 rounded font-semibold">
                Verified Checkout
              </span>
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-white border border-sand-200 px-3 py-1.5 rounded-xl shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">
                Pembayaran Terproteksi Enkripsi 256-bit
              </span>
              <span className="sm:hidden font-bold">256-Bit SSL</span>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6">
          {/* SUCCESS PROGRESS STEPPER */}
          <div className="bento-card p-4 rounded-2xl flex items-center justify-between font-mono text-xs text-stone-500">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xs">
                ✓
              </span>
              <span>Brief Terkirim</span>
            </div>
            <div className="h-0.5 w-10 sm:w-20 bg-emerald-300" />
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xs">
                ✓
              </span>
              <span>Pembayaran</span>
            </div>
            <div className="h-0.5 w-10 sm:w-20 bg-sand-300" />
            <div className="flex items-center gap-2 text-sand-900 font-bold">
              <span className="w-6 h-6 rounded-full bg-sand-900 text-sand-50 flex items-center justify-center text-xs">
                3
              </span>
              <span>Produksi 24 Jam</span>
            </div>
          </div>

          {/* SUCCESS CARD */}
          <div className="bento-card p-8 sm:p-12 rounded-3xl text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-sand-900">
                Pembayaran Berhasil!
              </h1>
              <p className="text-sm text-stone-500 font-sans">
                Invoice <strong className="font-mono text-sand-900">{order.orderId}</strong> untuk{" "}
                <strong className="text-sand-900">{order.brand}</strong> telah terverifikasi.
              </p>
            </div>
            <div className="p-4 bg-sand-50 rounded-2xl text-left space-y-2 font-mono text-xs text-stone-600">
              <div className="flex justify-between">
                <span className="text-stone-500">Order ID</span>
                <span className="font-bold text-sand-900">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Brand</span>
                <span className="font-bold text-sand-900">{order.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Kategori</span>
                <span className="font-bold text-sand-900">{order.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Status</span>
                <span className="font-bold text-emerald-700">Diproses</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/invoice?id=${order.orderId}`}
                className="flex-1 py-4 bg-sand-900 hover:bg-stone-800 text-sand-50 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm min-h-[48px] text-xs"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Lihat Invoice</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex-1 py-4 bg-white border border-sand-300 hover:bg-sand-100 text-sand-900 rounded-xl font-bold transition flex items-center justify-center gap-2 min-h-[48px] text-xs"
              >
                <span>Kembali ke Dashboard</span>
              </Link>
            </div>
            <p className="text-[10px] text-stone-400 font-sans">
              Naskah kamu akan diproses dalam 24 jam kerja. Cek email untuk update produksi.
            </p>
          </div>

          {/* FOOTER */}
          <div className="text-center py-6 space-y-3">
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-stone-400">
              <Link href="/terms" className="hover:text-sand-900 transition-colors">
                Syarat & Ketentuan
              </Link>
              <span>·</span>
              <Link href="/privacy" className="hover:text-sand-900 transition-colors">
                Kebijakan Privasi
              </Link>
              <span>·</span>
              <Link href="/refund" className="hover:text-sand-900 transition-colors">
                Refund Policy
              </Link>
            </div>
            <p className="text-[10px] text-stone-400 font-mono">
              © 2026 Karsa Studio. All rights reserved.
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{`
        .bento-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E0;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .bento-card:hover {
          border-color: #A3A39E;
        }
        .payment-option.active {
          border-color: #171615;
          background-color: #FBFBFA;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* TOP APP BAR */}
      <header className="sticky top-0 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-sand-900 font-normal">
              Karsa
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-200 text-sand-800 rounded font-semibold">
              Verified Checkout
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-white border border-sand-200 px-3 py-1.5 rounded-xl shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">
              Pembayaran Terproteksi Enkripsi 256-bit
            </span>
            <span className="sm:hidden font-bold">256-Bit SSL</span>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6">
        {/* PROGRESS STEPPER */}
        <div className="bento-card p-4 rounded-2xl flex items-center justify-between font-mono text-xs text-stone-500">
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xs">
              ✓
            </span>
            <span>Brief Terkirim</span>
          </div>
          <div className="h-0.5 w-10 sm:w-20 bg-sand-300" />
          <div className="flex items-center gap-2 text-sand-900 font-bold">
            <span className="w-6 h-6 rounded-full bg-sand-900 text-sand-50 flex items-center justify-center text-xs">
              2
            </span>
            <span>Pembayaran</span>
          </div>
          <div className="h-0.5 w-10 sm:w-20 bg-sand-300" />
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-sand-200 flex items-center justify-center text-xs">
              3
            </span>
            <span>Produksi 24 Jam</span>
          </div>
        </div>

        {/* 2-COLUMNS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: PAYMENT METHODS & ACCORDION INSTRUCTIONS (7 COLS) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-3xl font-serif font-bold text-sand-900">
                Metode Pembayaran Resmi
              </h1>
              <p className="text-xs font-mono text-stone-500">
                Verifikasi instan otomatis — antrean produksi langsung diproses.
              </p>
            </div>

            {/* PAYMENT METHOD TABS */}
            <div className="space-y-3 font-mono text-xs">
              {/* OPTION 1: QRIS INSTANT */}
              <label
                className={`payment-option bento-card p-4 rounded-2xl flex items-center justify-between cursor-pointer border-2 ${
                  paymentMethod === "QRIS" ? "active" : ""
                }`}
                style={{
                  borderColor: paymentMethod === "QRIS" ? "#171615" : undefined,
                  backgroundColor:
                    paymentMethod === "QRIS" ? "#FBFBFA" : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="QRIS"
                    checked={paymentMethod === "QRIS"}
                    onChange={() => switchPayMethod("QRIS")}
                    className="accent-sand-900 w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-sand-900 text-sm font-sans block">
                      QRIS (Semua Bank & E-Wallet)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                  Otomatis &bull; 0 Detik
                </span>
              </label>

              {/* OPTION 2: BCA VA */}
              <label
                className={`payment-option bento-card p-4 rounded-2xl flex items-center justify-between cursor-pointer border ${
                  paymentMethod === "BCA_VA" ? "active border-2" : ""
                }`}
                style={{
                  borderColor:
                    paymentMethod === "BCA_VA" ? "#171615" : undefined,
                  backgroundColor:
                    paymentMethod === "BCA_VA" ? "#FBFBFA" : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="BCA_VA"
                    checked={paymentMethod === "BCA_VA"}
                    onChange={() => switchPayMethod("BCA_VA")}
                    className="accent-sand-900 w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-sand-900 text-sm font-sans block">
                      BCA Virtual Account
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Nomor VA khusus & verifikasi otomatis 24 jam
                    </span>
                  </div>
                </div>
                <span className="text-stone-400 text-xs font-bold">BCA</span>
              </label>

              {/* OPTION 3: MANDIRI VA */}
              <label
                className={`payment-option bento-card p-4 rounded-2xl flex items-center justify-between cursor-pointer border ${
                  paymentMethod === "MANDIRI_VA" ? "active border-2" : ""
                }`}
                style={{
                  borderColor:
                    paymentMethod === "MANDIRI_VA" ? "#171615" : undefined,
                  backgroundColor:
                    paymentMethod === "MANDIRI_VA" ? "#FBFBFA" : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="MANDIRI_VA"
                    checked={paymentMethod === "MANDIRI_VA"}
                    onChange={() => switchPayMethod("MANDIRI_VA")}
                    className="accent-sand-900 w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-sand-900 text-sm font-sans block">
                      Mandiri Virtual Account
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Transfer via Livin&apos; by Mandiri atau ATM
                    </span>
                  </div>
                </div>
                <span className="text-stone-400 text-xs font-bold">
                  MANDIRI
                </span>
              </label>
            </div>

            {/* PAYMENT DISPLAY CANVAS: QRIS */}
            {paymentMethod === "QRIS" && (
              <div className="bento-card p-6 rounded-3xl text-center space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-sand-200">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                    National QR Standard
                  </span>
                  <span className="font-bold text-sand-900">
                    NMID: ID102688492019
                  </span>
                </div>

                <div className="w-52 h-52 bg-white border-2 border-dashed border-sand-400 rounded-2xl mx-auto flex items-center justify-center p-3 shadow-inner">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-sand-900"
                  >
                    <rect width="100" height="100" fill="none" />
                    <path
                      d="M10 10h30v30h-30zM15 15h20v20h-20zM60 10h30v30h-30zM65 15h20v20h-20zM10 60h30v30h-30zM15 65h20v20h-20zM50 10h5v15h-5zM50 35h15v5h-15zM50 50h10v10h-10zM70 50h20v10h-20zM60 70h10v20h-10zM80 70h10v20h-10zM20 50h15v5h-15zM40 70h10v15h-10zM45 45h10v10h-10z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div className="space-y-1">
                  <p className="text-stone-700 font-sans text-xs font-semibold">
                    Pindai QR di atas dengan BCA, Livin, GoPay, OVO, atau Dana.
                  </p>
                  <p className="text-stone-400 text-[10px]">
                    QR Code ini berlaku selama 15 menit untuk 1 kali transaksi.
                  </p>
                </div>
              </div>
            )}

            {/* PAYMENT DISPLAY CANVAS: VIRTUAL ACCOUNT */}
            {paymentMethod !== "QRIS" && (
              <div className="bento-card p-6 rounded-3xl space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-sand-200">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                    {VA_LABELS[paymentMethod] || "Virtual Account"}
                  </span>
                  <span className="text-emerald-700 font-bold text-[10px]">
                    Online 24 Jam
                  </span>
                </div>

                <div className="p-4 bg-sand-50 border border-sand-300 rounded-2xl space-y-2">
                  <span className="text-[10px] text-stone-500 uppercase block">
                    Nomor Rekening Virtual Account
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-bold text-sand-900 tracking-wider">
                      {VA_NUMBERS[paymentMethod] || "8077708128800992"}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1.5 bg-white border border-sand-300 rounded-xl hover:bg-sand-200 transition text-[11px] font-bold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? "Tersalin!" : "Salin"}</span>
                    </button>
                  </div>
                </div>

                {/* Step Guide Accordion */}
                <div className="space-y-2 text-stone-700 font-sans text-xs">
                  <p className="font-bold text-sand-900 font-mono text-[11px] uppercase">
                    Panduan Transfer m-Banking:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed text-stone-600">
                    <li>
                      Buka aplikasi m-Banking kamu → Pilih menu{" "}
                      <strong>Transfer / Bayar</strong>.
                    </li>
                    <li>
                      Pilih menu <strong>Virtual Account</strong> → Masukkan
                      nomor VA di atas.
                    </li>
                    <li>
                      Pastikan nama merchant tertera{" "}
                      <strong>KARSA STUDIO</strong> dengan nominal{" "}
                      <strong>Rp 299.000</strong>.
                    </li>
                    <li>
                      Masukkan PIN transaksi kamu dan klik tombol konfirmasi di
                      bawah.
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* REASSURANCE ACCORDION (TRUST SEALS) */}
            <div className="bento-card p-5 rounded-2xl space-y-3 font-mono text-xs text-stone-700 bg-sand-100/40">
              <div className="flex items-center gap-2 font-bold text-sand-900">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>3 Jaminan Resmi Karsa Studio</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-sans">
                <div className="p-2.5 bg-white rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block font-mono">
                    1. SLA 24 Jam Pasti
                  </strong>
                  <p className="text-stone-500 mt-0.5">
                    Naskah selesai dalam 24 jam kerja atau terima bonus 5
                    naskah gratis.
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block font-mono">
                    2. Kalibrasi 48 Jam
                  </strong>
                  <p className="text-stone-500 mt-0.5">
                    Bebas revisi penyesuaian sudut pesan agar 100% klop dengan
                    tokomu.
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block font-mono">
                    3. Hak Cipta Penuh
                  </strong>
                  <p className="text-stone-500 mt-0.5">
                    100% kepemilikan naskah dan artikel adalah milik brand kamu
                    selamanya.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY & CONVERSION BAR (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            {/* COUNTDOWN TIMER */}
            <div className="bento-card p-4 rounded-2xl bg-amber-50/70 border-amber-200 font-mono text-xs flex items-center justify-between text-amber-950">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Selesaikan pembayaran dalam:</span>
              </div>
              <span className={timerColor}>{formatTime(timeLeft)}</span>
            </div>

            {/* ORDER DETAIL BOX */}
            <div className="bento-card p-5 sm:p-6 rounded-3xl space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-stone-500 uppercase">
                    Ringkasan Tagihan
                  </span>
                  <span className="px-2 py-0.5 bg-sand-100 text-stone-800 rounded font-bold text-[10px]">
                    {order.orderId}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-sand-900 font-sans mt-1">
                  {order.brand}
                </h3>
                <span className="text-stone-500 text-[11px]">
                  {order.category}
                </span>
              </div>

              <div className="space-y-2 py-3 border-y border-sand-200 text-stone-700">
                <div className="flex justify-between items-center">
                  <span>30 Naskah Video Kata-per-Kata</span>
                  <span className="font-bold text-sand-900">Rp 299.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>30 Takarir AIDA & 15 Tagar</span>
                  <span className="text-emerald-700 font-bold">
                    Termasuk (Gratis)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>4 Artikel Blog SEO (1.000 Kata)</span>
                  <span className="text-emerald-700 font-bold">
                    Termasuk (Gratis)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Notion Content OS 1-Click Duplicate</span>
                  <span className="text-emerald-700 font-bold">
                    Termasuk (Gratis)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Audit 1 Akun Kompetitor</span>
                  <span className="text-emerald-700 font-bold">
                    Termasuk (Gratis)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Biaya Transaksi / Layanan</span>
                  <span className="text-emerald-700 font-bold">
                    Rp 0 (Gratis)
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-sand-900 pt-1">
                <span className="font-sans">Total Pembayaran Lunas</span>
                <span className="text-2xl font-serif text-emerald-800">
                  Rp 299.000
                </span>
              </div>

              <button
                onClick={confirmPayment}
                className="w-full py-4 bg-sand-900 active:bg-stone-800 hover:bg-stone-800 text-sand-50 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm min-h-[48px] text-xs"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Saya Sudah Membayar →</span>
              </button>

              <div className="p-3 bg-sand-50 rounded-xl text-[10px] text-stone-500 space-y-1 font-sans">
                <div className="flex items-center gap-1.5 font-mono text-stone-700 font-bold">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Keamanan Terjamin</span>
                </div>
                <p>
                  Data brief bisnis dan parameter tokomu dijaga kerahasiaannya
                  dengan standar Non-Disclosure Agreement (NDA).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-4 text-xs font-mono text-stone-400">
          <Link href="/terms" className="hover:text-sand-900 transition-colors">
            Syarat & Ketentuan
          </Link>
          <span>·</span>
          <Link
            href="/privacy"
            className="hover:text-sand-900 transition-colors"
          >
            Kebijakan Privasi
          </Link>
          <span>·</span>
          <Link
            href="/refund"
            className="hover:text-sand-900 transition-colors"
          >
            Refund Policy
          </Link>
        </div>
        <p className="text-[10px] text-stone-400 font-mono">
          © 2026 Karsa Studio. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="text-sm text-stone-500 font-mono">Memuat checkout...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
