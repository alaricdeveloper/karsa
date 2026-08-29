"use client";

import { startTransition, useState, useEffect, useCallback, Suspense } from "react";
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
} from "lucide-react";

interface OrderData {
  orderId: string;
  brand: string;
  category: string;
  competitor?: string;
  description?: string;
  goal?: string;
  tone?: string;
  channel?: string;
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

function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">
        <Link href="/" className="flex items-center space-x-2 shrink-0 group">
          <span className="font-serif text-2xl sm:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">
            Karsa
          </span>
          <span className="badge-tag text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 bg-wasabi text-ink rounded font-bold">
            Verified Checkout
          </span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-ink bg-white border-2 border-ink px-3 py-1.5 rounded-xl shadow-brutal-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline font-bold">
            Pembayaran Terproteksi Enkripsi 256-bit
          </span>
          <span className="sm:hidden font-bold">256-Bit SSL</span>
        </div>
      </div>
    </header>
  );
}

function CheckoutFooter() {
  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 text-center space-y-3">
      <div className="flex items-center justify-center gap-4 text-xs font-mono text-stone-500">
        <Link href="/terms" className="hover:text-ink transition-colors">
          Syarat & Ketentuan
        </Link>
        <span>·</span>
        <Link
          href="/privacy"
          className="hover:text-ink transition-colors"
        >
          Kebijakan Privasi
        </Link>
        <span>·</span>
        <Link
          href="/refund"
          className="hover:text-ink transition-colors"
        >
          Refund Policy
        </Link>
      </div>
      <p className="text-[10px] text-stone-400 font-mono">
        © 2026 Karsa Studio. All rights reserved.
      </p>
    </div>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");

  const [order, setOrder] = useState<OrderData>({
    orderId: "INV-PREVIEW",
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
          startTransition(() => {
            setOrder(parsed);
            setPaymentMethod(parsed.paymentMethod || "QRIS");
          });
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
          orderId: order.orderId,
          status: "IN_PROGRESS",
          brand: order.brand,
          category: order.category,
          competitor: order.competitor || "",
          description: order.description || "Order dari Member Workspace",
          goal: order.goal || "",
          tone: order.tone || "",
          channel: order.channel || "",
          email: order.email,
          phone: order.phone,
        }),
      });
    } catch {}

    setPaymentComplete(true);
  }, [order]);

  const timerColor =
    timeLeft <= 0
      ? "bg-terracotta text-white"
      : timeLeft <= 60
      ? "bg-terracottaLight text-terracotta"
      : timeLeft <= 300
      ? "bg-sunflower/40 text-ink"
      : "bg-white text-ink";

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink pb-28 md:pb-16">
        <CheckoutHeader />

        <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6">
          {/* SUCCESS PROGRESS STEPPER */}
          <div className="bento-pop p-4 rounded-2xl flex items-center justify-between font-mono text-xs text-stone-500 bg-white">
            <div className="flex items-center gap-2 text-wasabiDark font-bold">
              <span className="w-6 h-6 rounded-full bg-wasabi border-2 border-ink flex items-center justify-center text-ink text-xs font-bold shadow-brutal-sm">
                ✓
              </span>
              <span className="hidden sm:inline">Brief Terkirim</span>
              <span className="sm:hidden">Brief</span>
            </div>
            <div className="h-0.5 w-8 sm:w-16 bg-stone-300" />
            <div className="flex items-center gap-2 text-wasabiDark font-bold">
              <span className="w-6 h-6 rounded-full bg-wasabi border-2 border-ink flex items-center justify-center text-ink text-xs font-bold shadow-brutal-sm">
                ✓
              </span>
              <span>Pembayaran</span>
            </div>
            <div className="h-0.5 w-8 sm:w-16 bg-stone-300" />
            <div className="flex items-center gap-2 text-stone-400 font-bold">
              <span className="w-6 h-6 rounded-full bg-canvas border-2 border-ink flex items-center justify-center text-xs text-stone-600">
                3
              </span>
              <span className="hidden sm:inline">Produksi 24 Jam</span>
              <span className="sm:hidden">SLA 24j</span>
            </div>
          </div>

          {/* SUCCESS CARD */}
          <div className="bento-pop p-8 sm:p-12 rounded-3xl text-center space-y-6 bg-white">
            <div className="w-20 h-20 bg-wasabi border-2 border-ink rounded-full mx-auto flex items-center justify-center shadow-brutal-sm">
              <CheckCircle className="w-10 h-10 text-ink" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
                Pembayaran Berhasil!
              </h1>
              <p className="text-sm text-stone-600 font-sans">
                Invoice <strong className="font-mono text-ink">{order.orderId}</strong> untuk{" "}
                <strong className="text-ink">{order.brand}</strong> telah terverifikasi.
              </p>
            </div>
            <div className="p-4 bg-canvas border-2 border-ink rounded-2xl text-left space-y-2 font-mono text-xs text-stone-600">
              <div className="flex justify-between">
                <span className="text-stone-500">Order ID</span>
                <span className="font-bold text-ink">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Brand</span>
                <span className="font-bold text-ink">{order.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Kategori</span>
                <span className="font-bold text-ink">{order.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Status</span>
                <span className="font-bold text-wasabiDark">Diproses</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/invoice?id=${order.orderId}`}
                className="flex-1 py-4 bg-ink hover:bg-terracotta text-canvas rounded-xl font-mono font-bold text-xs transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]"
              >
                <FileText className="w-4 h-4 text-wasabi" />
                <span>Lihat Invoice</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex-1 py-4 bg-white border-2 border-ink hover:bg-canvas text-ink rounded-xl font-mono font-bold text-xs transition flex items-center justify-center gap-2 shadow-brutal-sm min-h-[48px]"
              >
                <span>Kembali ke Dashboard</span>
              </Link>
            </div>
            <p className="text-[10px] text-stone-500 font-sans">
              Naskah kamu akan diproses dalam 24 jam kerja. Cek email untuk update produksi.
            </p>
          </div>
        </main>

        <CheckoutFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink pb-28 md:pb-16">
      <CheckoutHeader />

      {/* MAIN VIEWPORT */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6">
        {/* PROGRESS STEPPER */}
        <div className="bento-pop p-4 rounded-2xl flex items-center justify-between font-mono text-xs text-stone-500 bg-white">
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <span className="w-6 h-6 rounded-full bg-wasabi border-2 border-ink flex items-center justify-center text-ink text-xs font-bold shadow-brutal-sm">
              ✓
            </span>
            <span className="hidden sm:inline">Brief Terkirim</span>
            <span className="sm:hidden">Brief</span>
          </div>
          <div className="h-0.5 w-8 sm:w-16 bg-stone-300" />
          <div className="flex items-center gap-2 text-ink font-bold">
            <span className="w-6 h-6 rounded-full bg-terracotta text-white border-2 border-ink flex items-center justify-center text-xs shadow-brutal-sm font-bold">
              2
            </span>
            <span>Pembayaran</span>
          </div>
          <div className="h-0.5 w-8 sm:w-16 bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-400 font-bold">
            <span className="w-6 h-6 rounded-full bg-canvas border-2 border-ink flex items-center justify-center text-xs text-stone-600">
              3
            </span>
            <span className="hidden sm:inline">Produksi 24 Jam</span>
            <span className="sm:hidden">SLA 24j</span>
          </div>
        </div>

        {/* 2-COLUMNS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: PAYMENT METHODS & DISPLAY (7 COLS) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
                Verifikasi Otomatis
              </span>
              <h1 className="text-xl sm:text-3xl font-serif font-bold text-ink mt-2">
                Metode Pembayaran Resmi
              </h1>
              <p className="text-xs font-mono text-stone-600">
                Verifikasi instan otomatis — antrean produksi langsung diproses.
              </p>
            </div>

            {/* PAYMENT METHOD TABS */}
            <div className="space-y-3 font-mono text-xs">
              {/* OPTION 1: QRIS INSTANT */}
              <label
                className={`bento-pop p-4 rounded-2xl flex items-center justify-between cursor-pointer ${
                  paymentMethod === "QRIS"
                    ? "bg-sunflower/20 shadow-brutal-sm"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="QRIS"
                    checked={paymentMethod === "QRIS"}
                    onChange={() => switchPayMethod("QRIS")}
                    className="accent-ink w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-ink text-sm font-sans block">
                      QRIS (Semua Bank & E-Wallet)
                    </span>
                    <span className="text-[11px] text-stone-600 font-medium">
                      BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay
                    </span>
                  </div>
                </div>
                <span className="badge-tag px-2 py-0.5 bg-white text-ink rounded text-[10px] font-bold">
                  Otomatis &bull; 0 Detik
                </span>
              </label>

              {/* OPTION 2: BCA VA */}
              <label
                className={`bento-pop p-4 rounded-2xl flex items-center justify-between cursor-pointer ${
                  paymentMethod === "BCA_VA"
                    ? "bg-sunflower/20 shadow-brutal-sm"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="BCA_VA"
                    checked={paymentMethod === "BCA_VA"}
                    onChange={() => switchPayMethod("BCA_VA")}
                    className="accent-ink w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-ink text-sm font-sans block">
                      BCA Virtual Account
                    </span>
                    <span className="text-[11px] text-stone-600 font-medium">
                      Nomor VA khusus & verifikasi otomatis 24 jam
                    </span>
                  </div>
                </div>
                <span className="text-stone-500 text-xs font-bold font-mono">
                  BCA
                </span>
              </label>

              {/* OPTION 3: MANDIRI VA */}
              <label
                className={`bento-pop p-4 rounded-2xl flex items-center justify-between cursor-pointer ${
                  paymentMethod === "MANDIRI_VA"
                    ? "bg-sunflower/20 shadow-brutal-sm"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="MANDIRI_VA"
                    checked={paymentMethod === "MANDIRI_VA"}
                    onChange={() => switchPayMethod("MANDIRI_VA")}
                    className="accent-ink w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-ink text-sm font-sans block">
                      Mandiri Virtual Account
                    </span>
                    <span className="text-[11px] text-stone-600 font-medium">
                      Transfer via Livin&apos; by Mandiri atau ATM
                    </span>
                  </div>
                </div>
                <span className="text-stone-500 text-xs font-bold font-mono">
                  MANDIRI
                </span>
              </label>
            </div>

            {/* PAYMENT DISPLAY CANVAS: QRIS */}
            {paymentMethod === "QRIS" && (
              <div className="bento-pop p-6 rounded-3xl text-center space-y-4 font-mono text-xs bg-white">
                <div className="flex justify-between items-center pb-3 border-b-2 border-ink">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">
                    National QR Standard
                  </span>
                  <span className="font-bold text-ink font-mono">
                    NMID: ID102688492019
                  </span>
                </div>

                <div className="w-52 h-52 bg-white border-2 border-ink rounded-2xl mx-auto flex items-center justify-center p-3 shadow-brutal-sm">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-ink"
                  >
                    <rect width="100" height="100" fill="none" />
                    <path
                      d="M10 10h30v30h-30zM15 15h20v20h-20zM60 10h30v30h-30zM65 15h20v20h-20zM10 60h30v30h-30zM15 65h20v20h-20zM50 10h5v15h-5zM50 35h15v5h-15zM50 50h10v10h-10zM70 50h20v10h-20zM60 70h10v20h-10zM80 70h10v20h-10zM20 50h15v5h-15zM40 70h10v15h-10zM45 45h10v10h-10z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div className="space-y-1">
                  <p className="text-ink font-sans text-xs font-bold">
                    Pindai QR di atas dengan BCA, Livin, GoPay, OVO, atau Dana.
                  </p>
                  <p className="text-stone-500 text-[10px]">
                    QR Code ini berlaku selama 15 menit untuk 1 kali transaksi.
                  </p>
                </div>
              </div>
            )}

            {/* PAYMENT DISPLAY CANVAS: VIRTUAL ACCOUNT */}
            {paymentMethod !== "QRIS" && (
              <div className="bento-pop p-6 rounded-3xl space-y-4 font-mono text-xs bg-white">
                <div className="flex justify-between items-center pb-3 border-b-2 border-ink">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">
                    {VA_LABELS[paymentMethod] || "Virtual Account"}
                  </span>
                  <span className="text-emerald-700 font-bold text-[10px] badge-tag bg-wasabi px-2 py-0.5 rounded">
                    Online 24 Jam
                  </span>
                </div>

                <div className="p-4 bg-canvas border-2 border-ink rounded-2xl space-y-2 shadow-brutal-sm">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">
                    Nomor Rekening Virtual Account
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-ink tracking-wider font-mono">
                      {VA_NUMBERS[paymentMethod] || "8077708128800992"}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="px-3.5 py-2 bg-white border-2 border-ink rounded-xl hover:bg-canvas transition text-xs font-bold flex items-center gap-1 shadow-brutal-sm min-h-[44px]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? "Tersalin!" : "Salin"}</span>
                    </button>
                  </div>
                </div>

                {/* Step Guide Accordion */}
                <div className="space-y-2 text-stone-800 font-sans text-xs pt-1">
                  <p className="font-bold text-ink font-mono text-[11px] uppercase">
                    Panduan Transfer m-Banking:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-xs leading-relaxed text-stone-700">
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
            <div className="bento-pop p-5 rounded-2xl space-y-3 font-mono text-xs text-stone-800 bg-canvas">
              <div className="flex items-center gap-2 font-bold text-ink">
                <Award className="w-4 h-4 text-terracotta" />
                <span>3 Jaminan Resmi Karsa Studio</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                <div className="p-3 bg-white rounded-xl border-2 border-ink shadow-brutal-sm">
                  <strong className="text-ink block font-mono font-bold">
                    1. SLA 24 Jam Pasti
                  </strong>
                  <p className="text-stone-600 mt-0.5 text-[11px]">
                    Naskah selesai dalam 24 jam kerja atau terima bonus 5
                    naskah gratis.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-ink shadow-brutal-sm">
                  <strong className="text-ink block font-mono font-bold">
                    2. Kalibrasi 48 Jam
                  </strong>
                  <p className="text-stone-600 mt-0.5 text-[11px]">
                    Bebas revisi penyesuaian sudut pesan agar 100% klop dengan
                    tokomu.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border-2 border-ink shadow-brutal-sm">
                  <strong className="text-ink block font-mono font-bold">
                    3. Hak Cipta Penuh
                  </strong>
                  <p className="text-stone-600 mt-0.5 text-[11px]">
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
            <div className="bento-pop p-4 rounded-2xl bg-sunflower border-2 border-ink font-mono text-xs flex items-center justify-between text-ink font-bold shadow-brutal-sm">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-terracotta animate-pulse" />
                <span>Selesaikan pembayaran dalam:</span>
              </div>
              <span
                className={`font-bold text-sm px-2 py-0.5 rounded border border-ink ${timerColor}`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* ORDER DETAIL BOX */}
            <div className="bento-pop p-5 sm:p-6 rounded-3xl space-y-4 font-mono text-xs bg-white">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">
                    Ringkasan Tagihan
                  </span>
                  <span className="badge-tag px-2 py-0.5 bg-canvas text-ink rounded font-bold text-[10px]">
                    {order.orderId}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-ink mt-1">
                  {order.brand}
                </h3>
                <span className="text-terracotta font-bold text-xs">
                  {order.category}
                </span>
              </div>

              <div className="space-y-2.5 py-3 border-y-2 border-ink text-stone-800">
                <div className="flex justify-between items-center">
                  <span>30 Naskah Video Kata-per-Kata</span>
                  <span className="font-bold text-ink">Rp 299.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>30 Takarir AIDA & 15 Tagar</span>
                  <span className="text-wasabiDark font-bold">
                    Termasuk (Gratis)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>4 Artikel Blog SEO (1.000 Kata)</span>
                  <span className="text-wasabiDark font-bold">
                    Termasuk (Gratis)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Notion Content OS 1-Click Duplicate</span>
                  <span className="text-wasabiDark font-bold">
                    Termasuk (Gratis)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Audit 1 Akun Kompetitor</span>
                  <span className="text-wasabiDark font-bold">
                    Termasuk (Gratis)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Biaya Transaksi / Layanan</span>
                  <span className="text-wasabiDark font-bold">
                    Rp 0 (Gratis)
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-ink pt-1">
                <span className="font-sans">Total Pembayaran Lunas</span>
                <span className="text-2xl font-serif text-terracotta">
                  Rp 299.000
                </span>
              </div>

              <button
                onClick={confirmPayment}
                className="w-full py-4 bg-terracotta hover:bg-ink text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px] text-sm font-mono"
              >
                <CheckCircle className="w-4 h-4 text-wasabi" />
                <span>Saya Sudah Membayar →</span>
              </button>

              <div className="p-3.5 bg-canvas border border-ink rounded-xl text-[11px] text-stone-600 space-y-1 font-sans">
                <div className="flex items-center gap-1.5 font-mono text-ink font-bold">
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

      <CheckoutFooter />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="text-sm text-stone-500 font-mono">Memuat checkout...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
