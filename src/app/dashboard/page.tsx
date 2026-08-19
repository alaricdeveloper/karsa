"use client";

import { useState, useEffect, useRef, useCallback, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Sparkles,
  LogOut,
  LayoutGrid,
  Cpu,
  BookOpen,
  User,
  Wand2,
  Clock,
  RefreshCw,
  CheckCircle2,
  Video,
  MessageSquare,
  Search,
  Compass,
  Calendar,
  Film,
  Save,
  ArrowRight,
  Plus,
  Check,
  Camera,
} from "lucide-react";

const PROFILE_STORAGE_KEY = "karsa_user_profile";

type Profile = {
  fullName: string;
  displayName: string;
  roleBio: string;
  email: string;
  phone: string;
  defaultBrand: string;
  defaultCategory: string;
  defaultCompetitor: string;
  avatarUrl: string;
};

type Order = {
  orderId: string;
  brand: string;
  category: string;
  competitor: string;
  description: string;
  email: string;
  phone: string;
  timestamp: string;
  status: string;
  notionUrl: string;
  notes: string;
};

const DEFAULT_PROFILE: Profile = {
  fullName: "Alaric Diaz",
  displayName: "Alaric",
  roleBio: "Founder & Lead Strategist",
  email: "hello.usekarsa@gmail.com",
  phone: "081288009920",
  defaultBrand: "",
  defaultCategory: "Kuliner / F&B",
  defaultCompetitor: "",
  avatarUrl: "",
};

type MainTab = "workspace" | "tools" | "demo" | "resources" | "profile";
type DemoTab = "script" | "caption" | "seo";

function loadProfileFromStorage(): Profile {
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (stored) {
    try {
      return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
    } catch {}
  }
  return DEFAULT_PROFILE;
}

async function fetchOrdersFromSupabase(email: string): Promise<Order[]> {
  // Try API first (bypasses any client-side Supabase issues)
  try {
    const res = await fetch("/api/orders");
    if (res.ok) {
      const allOrders: Record<string, unknown>[] = await res.json();
      const filtered = allOrders.filter((o) => o.email === email);
      return filtered.map((o) => ({
        orderId: o.order_id as string,
        brand: o.brand as string,
        category: o.category as string,
        competitor: (o.competitor as string) || "",
        description: (o.description as string) || "",
        email: o.email as string,
        phone: (o.phone as string) || "",
        timestamp: (o.created_at as string) || "",
        status: o.status as string,
        notionUrl: (o.notion_url as string) || "",
        notes: (o.notes as string) || "",
      }));
    }
  } catch {}

  // Fallback: Supabase client
  const supabase = createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((o: Record<string, unknown>) => ({
    orderId: o.order_id as string,
    brand: o.brand as string,
    category: o.category as string,
    competitor: (o.competitor as string) || "",
    description: (o.description as string) || "",
    email: o.email as string,
    phone: (o.phone as string) || "",
    timestamp: (o.created_at as string) || "",
    status: o.status as string,
    notionUrl: (o.notion_url as string) || "",
    notes: (o.notes as string) || "",
  }));
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<MainTab>("workspace");
  const [activeDemoTab, setActiveDemoTab] = useState<DemoTab>("script");
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showSaveStatus, setShowSaveStatus] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingAvatarRef = useRef<string>("");
  const loadedRef = useRef(false);

  // Hook generator state
  const [hookBrand, setHookBrand] = useState("");
  const [hookCategory, setHookCategory] = useState("Kuliner / Minuman");
  const [hookProblem, setHookProblem] = useState("");
  const [hookResults, setHookResults] = useState<React.ReactNode | null>(null);

  // ROI calculator state
  const [roiHours, setRoiHours] = useState(6);
  const [roiAgency, setRoiAgency] = useState(3500000);

  // Audit score state
  const [auditQ1, setAuditQ1] = useState(25);
  const [auditQ2, setAuditQ2] = useState(10);
  const [auditQ3, setAuditQ3] = useState(20);

  // Order form state
  const [inBrand, setInBrand] = useState("");
  const [inCategory, setInCategory] = useState("Kuliner / F&B");
  const [inCompetitor, setInCompetitor] = useState("");
  const [inDesc, setInDesc] = useState("");
  const [inEmail, setInEmail] = useState("");
  const [inPhone, setInPhone] = useState("");

  // Profile form state
  const [inputFullName, setInputFullName] = useState("");
  const [inputDisplayName, setInputDisplayName] = useState("");
  const [inputRoleBio, setInputRoleBio] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputDefaultBrand, setInputDefaultBrand] = useState("");
  const [inputDefaultCategory, setInputDefaultCategory] = useState("Kuliner / F&B");
  const [inputDefaultCompetitor, setInputDefaultCompetitor] = useState("");
  const userEmailRef = useRef<string | null>(null);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then((res: { data: { user: { email?: string } | null } }) => {
        const user = res.data.user;
        if (!user) {
          router.push("/login?redirect=/dashboard");
          return;
        }
        userEmailRef.current = user.email || null;
        console.log("[Dashboard] Fetching orders for:", user.email);
        fetchOrdersFromSupabase(user.email || "").then((o) => {
          console.log("[Dashboard] Orders loaded:", o.length);
          setOrders(o);
        }).catch((e) => console.error("[Dashboard] Fetch orders failed:", e));
        setProfile((prev) => {
          if (prev.email === DEFAULT_PROFILE.email || !prev.email) {
            const username = user.email ? user.email.split("@")[0] : prev.displayName;
            const updated = {
              ...prev,
              email: user.email || prev.email,
              displayName: prev.displayName === DEFAULT_PROFILE.displayName ? username : prev.displayName,
              fullName: prev.fullName === DEFAULT_PROFILE.fullName ? username : prev.fullName,
            };
            setInputEmail(updated.email);
            setInputDisplayName(updated.displayName);
            setInputFullName(updated.fullName);
            setInEmail(updated.email);
            return updated;
          }
          return prev;
        });
      });
    }

    const p = loadProfileFromStorage();
    setProfile(p);
    setInputFullName(p.fullName);
    setInputDisplayName(p.displayName);
    setInputRoleBio(p.roleBio);
    setInputEmail(p.email);
    setInputPhone(p.phone);
    setInputDefaultBrand(p.defaultBrand);
    setInputDefaultCategory(p.defaultCategory);
    setInputDefaultCompetitor(p.defaultCompetitor);
    setInBrand(p.defaultBrand);
    setInCategory(p.defaultCategory);
    setInCompetitor(p.defaultCompetitor);
    setInEmail(p.email);
    setInPhone(p.phone);
  }, [router]);

  const reloadOrders = useCallback(() => {
    if (userEmailRef.current) {
      fetchOrdersFromSupabase(userEmailRef.current).then(setOrders);
    }
  }, []);

  const switchMainTab = useCallback((tab: MainTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const avatarInitial = profile.displayName?.trim().charAt(0).toUpperCase() || "A";
  const hasAvatar = profile.avatarUrl && profile.avatarUrl.trim() !== "";

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAvatarUrl = pendingAvatarRef.current || profile.avatarUrl || "";
    const updated: Profile = {
      fullName: inputFullName.trim(),
      displayName: inputDisplayName.trim(),
      roleBio: inputRoleBio.trim(),
      email: inputEmail.trim(),
      phone: inputPhone.trim(),
      defaultBrand: inputDefaultBrand.trim(),
      defaultCategory: inputDefaultCategory,
      defaultCompetitor: inputDefaultCompetitor.trim(),
      avatarUrl: finalAvatarUrl,
    };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    setProfile(updated);
    pendingAvatarRef.current = "";
    const p = loadProfileFromStorage();
    setInputFullName(p.fullName);
    setInputDisplayName(p.displayName);
    setInputRoleBio(p.roleBio);
    setInputEmail(p.email);
    setInputPhone(p.phone);
    setInputDefaultBrand(p.defaultBrand);
    setInputDefaultCategory(p.defaultCategory);
    setInputDefaultCompetitor(p.defaultCompetitor);
    setShowSaveStatus(true);
    setTimeout(() => setShowSaveStatus(false), 4000);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = "INV-" + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId,
      brand: inBrand.trim(),
      category: inCategory,
      competitor: inCompetitor.trim(),
      description: inDesc.trim(),
      email: inEmail.trim(),
      phone: inPhone.trim(),
      timestamp: new Date().toISOString(),
      status: "PENDING",
    };
    localStorage.setItem("karsa_checkout_" + orderId, JSON.stringify(orderData));
    setModalOpen(false);
    router.push("/checkout?id=" + orderId);
  };

  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file foto maksimal 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64Url = ev.target?.result as string;
      pendingAvatarRef.current = base64Url;
      setProfile((prev) => ({ ...prev, avatarUrl: base64Url }));
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    pendingAvatarRef.current = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
    setProfile((prev) => ({ ...prev, avatarUrl: "" }));
  };

  const generateDemoHooks = () => {
    const brand = hookBrand.trim() || "Brand Anda";
    const problem = hookProblem.trim() || "susah closing";
    const category = hookCategory;

    setHookResults(
      <>
        <div className="p-3.5 bg-sand-50 border border-sand-200 rounded-xl space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900">Formula Penyangkalan</span>
            <span className="text-[9px] text-stone-400 font-mono">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs font-sans text-stone-800">&quot;Berhenti buang uang buat [kebiasaan lama]. Ini alasan kenapa pelanggan {brand} gak pernah ngeluh {problem}...&quot;</p>
        </div>
        <div className="p-3.5 bg-sand-50 border border-sand-200 rounded-xl space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-100 text-indigo-900">Formula Callout Niche</span>
            <span className="text-[9px] text-stone-400 font-mono">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs font-sans text-stone-800">&quot;Khusus buat kamu yang lagi nyari {category} tapi capek kena masalah {problem} tiap hari...&quot;</p>
        </div>
        <div className="p-3.5 bg-sand-50 border border-sand-200 rounded-xl space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-900">Formula Secret Shortcut</span>
            <span className="text-[9px] text-stone-400 font-mono">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs font-sans text-stone-800">&quot;Trik sederhana dari {brand} yang bikin kamu bebas dari {problem} tanpa ribet!&quot;</p>
        </div>
        <div className="pt-2 text-center">
          <button onClick={() => setModalOpen(true)} className="text-xs font-mono font-bold text-sand-900 underline">
            Dapatkan 30 Naskah Lengkap untuk {brand} &rarr;
          </button>
        </div>
      </>
    );
  };

  const runAuditScore = useCallback((q1: number, q2: number, q3: number) => {
    return q1 + q2 + q3;
  }, []);

  const roiSavedHours = roiHours * 4;
  const roiNetSavings = roiAgency - 299000;
  const auditTotal = runAuditScore(auditQ1, auditQ2, auditQ3);

  const getOrderStatusLabel = (status: string) => {
    switch (status) {
      case "IN_PROGRESS": return "Sedang Disusun (AI + QC)";
      case "QC_REVIEW": return "Tahap Kurasi Akhir";
      case "COMPLETED": return "Selesai & Siap Akses";
      default: return "Menunggu Bayar";
    }
  };

  const handleLogout = async () => {
    if (confirm("Apakah Anda ingin keluar dari Workspace Karsa?")) {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      window.location.href = "/login";
    }
  };

  const mainTabNavBtnClass = (tab: MainTab) =>
    activeTab === tab
      ? "py-3.5 border-b-2 border-sand-900 font-bold text-sand-900"
      : "py-3.5 border-b-2 border-transparent text-stone-500 hover:text-sand-900";

  const mobNavBtnClass = (tab: MainTab) =>
    activeTab === tab
      ? "text-sand-900 font-bold"
      : "text-stone-500";

  const demoTabBtnClass = (tab: DemoTab) =>
    activeDemoTab === tab
      ? "px-3 py-1.5 rounded-lg border border-sand-300 text-xs shrink-0 bg-sand-900 text-white"
      : "px-3 py-1.5 rounded-lg border border-sand-300 bg-white text-stone-700 text-xs shrink-0";

  return (
    <>
      <style>{`
        :root { --sat: env(safe-area-inset-top); --sab: env(safe-area-inset-bottom); }
        .safe-top { padding-top: var(--sat); }
        .safe-bottom { padding-bottom: var(--sab); }
        .bento-card { background: #FFFFFF; border: 1px solid #E5E5E0; transition: border-color 0.2s ease, transform 0.2s ease; }
        .bento-card:hover { border-color: #A3A39E; }
        .status-badge.IN_PROGRESS { background-color: #E0E7FF; color: #3730A3; border-color: #C7D2FE; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input[type=range] { -webkit-appearance: none; background: #EBEBE8; height: 6px; border-radius: 999px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 22px; width: 22px; border-radius: 50%; background: #171615; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
      `}</style>

      <div className="bg-sand-50 text-sand-900 font-sans antialiased selection:bg-sand-900 selection:text-sand-50 pb-28 md:pb-16 touch-manipulation">

        {/* TOP APP BAR */}
        <header className="sticky top-0 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-200 safe-top">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <a href="/" className="flex items-center space-x-2">
                <span className="font-serif text-2xl sm:text-3xl tracking-tight text-sand-900 font-normal">Karsa</span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-200 text-sand-800 rounded font-semibold">Hub</span>
              </a>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono">
              <button onClick={() => switchMainTab("profile")} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-sand-300 rounded-xl hover:bg-sand-100 transition text-stone-700">
                <div className="w-5 h-5 rounded-full bg-sand-900 text-sand-50 flex items-center justify-center text-[10px] font-bold overflow-hidden font-serif">
                  {hasAvatar ? <img src={profile.avatarUrl} className="w-full h-full object-cover" alt="Avatar" /> : <span>{avatarInitial}</span>}
                </div>
                <span className="hidden sm:inline font-medium">{profile.displayName}</span>
              </button>
              <button onClick={() => setModalOpen(true)} className="hidden md:flex px-3.5 py-2 bg-sand-900 hover:bg-stone-800 text-sand-50 rounded-xl transition items-center gap-1.5 font-medium shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mulai Batch (Rp299k)</span>
              </button>
              <button onClick={handleLogout} className="p-2 border border-sand-300 rounded-xl hover:bg-sand-200 transition bg-white text-stone-600" title="Keluar">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* DESKTOP TAB NAV */}
        <div className="hidden md:block border-b border-sand-200 bg-white/60 sticky top-16 z-20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 text-xs font-mono overflow-x-auto no-scrollbar">
            {([
              ["workspace", LayoutGrid, "Workspace & Inventaris"],
              ["tools", Cpu, "Micro-Tools & Kalkulator ROI"],
              ["demo", Sparkles, "Deliverables & Studio Demo"],
              ["resources", BookOpen, "Panduan Rekam HP & Formula"],
              ["profile", User, "Pengaturan Akun & Brand Vault"],
            ] as const).map(([tab, Icon, label]) => (
              <button key={tab} onClick={() => switchMainTab(tab)} className={`${mainTabNavBtnClass(tab)} flex items-center gap-2 shrink-0`}>
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8">

          {/* VIEW 1: WORKSPACE */}
          {activeTab === "workspace" && (
            <div className="space-y-4 sm:space-y-8">
              {/* Hero Banner */}
              <section className="bento-card p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-8">
                  <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-stone-700 bg-sand-100 border border-sand-200 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      SLA Produksi: Kuota Batch Tersedia
                    </div>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-sand-900 leading-tight">
                      Selamat datang, <span className="italic">{profile.displayName || profile.fullName}</span>.{" "}
                      <br className="hidden sm:inline" />
                      <span className="text-stone-600 font-serif text-lg sm:text-2xl lg:text-3xl font-normal block sm:inline mt-1 sm:mt-0">Inventaris konten 30 harimu siap diorkestrasi.</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                      Kirimkan formulir brief bisnismu untuk menerima 30 naskah video kata-per-kata, 30 takarir AIDA, 4 artikel SEO, dan Notion Content OS dalam 1x24 jam kerja.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 shrink-0 pt-2 sm:pt-0">
                    <button onClick={() => setModalOpen(true)} className="w-full px-5 py-3.5 bg-sand-900 active:bg-stone-800 hover:bg-stone-800 text-sand-50 rounded-xl font-mono text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm min-h-[48px]">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Mulai Order Batch (Rp299.000)</span>
                    </button>
                    <button onClick={() => switchMainTab("tools")} className="w-full px-5 py-3.5 bg-sand-100 active:bg-sand-200 hover:bg-sand-200 text-sand-900 border border-sand-300 rounded-xl font-mono text-xs font-medium transition flex items-center justify-center gap-2 min-h-[48px]">
                      <Wand2 className="w-4 h-4 text-stone-500" />
                      <span>Coba Generator Hook Gratis</span>
                    </button>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-sand-200 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 font-mono text-xs">
                  <div className="p-3 sm:p-3.5 bg-sand-50 border border-sand-200 rounded-xl sm:rounded-2xl">
                    <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block">Batch Aktif</span>
                    <span className="text-base sm:text-xl font-bold text-sand-900 mt-0.5 block">{orders.length} Batch</span>
                    <span className="text-[9px] sm:text-[10px] text-stone-400 block">Antrean Real-time</span>
                  </div>
                  <div className="p-3 sm:p-3.5 bg-sand-50 border border-sand-200 rounded-xl sm:rounded-2xl">
                    <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block">Deliverables</span>
                    <span className="text-base sm:text-xl font-bold text-sand-900 mt-0.5 block">30 Naskah</span>
                    <span className="text-[9px] sm:text-[10px] text-stone-400 block">Visual + Audio Hook</span>
                  </div>
                  <div className="p-3 sm:p-3.5 bg-sand-50 border border-sand-200 rounded-xl sm:rounded-2xl">
                    <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block">Turnaround</span>
                    <span className="text-base sm:text-xl font-bold text-emerald-700 mt-0.5 block">&lt; 24 Jam</span>
                    <span className="text-[9px] sm:text-[10px] text-stone-400 block">QC Tim Ahli</span>
                  </div>
                  <div className="p-3 sm:p-3.5 bg-sand-50 border border-sand-200 rounded-xl sm:rounded-2xl">
                    <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase block">Kalibrasi</span>
                    <span className="text-base sm:text-xl font-bold text-sand-900 mt-0.5 block">48 Jam</span>
                    <span className="text-[9px] sm:text-[10px] text-stone-400 block">Bebas Revisi Sudut</span>
                  </div>
                </div>
              </section>

              {/* Orders */}
              <section className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-base sm:text-xl font-serif font-bold text-sand-900">Inventaris Batch Konten Saya</h2>
                    <p className="text-[11px] sm:text-xs font-mono text-stone-500">Ruang kerja kalender 30 hari yang terdaftar.</p>
                  </div>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-sand-200 text-sand-800 rounded-lg text-[10px] sm:text-xs font-mono font-semibold">{orders.length} Batch</span>
                </div>
                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <div className="bento-card p-6 sm:p-12 rounded-2xl sm:rounded-3xl text-center space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-sand-100 border border-sand-200 flex items-center justify-center mx-auto text-stone-400 shadow-inner">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div className="max-w-md mx-auto space-y-1">
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-sand-900">Belum Ada Pesanan Aktif</h3>
                        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                          Kirim brief pertamamu sekarang untuk mendapatkan inventaris kalender 30 hari siap pakai.
                        </p>
                      </div>
                      <div className="pt-1">
                        <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 px-5 py-3 bg-sand-900 text-sand-50 text-xs font-mono font-semibold rounded-xl active:bg-stone-800 hover:bg-stone-800 transition shadow-sm min-h-[44px]">
                          <Plus className="w-4 h-4 text-emerald-400" />
                          <span>Kirim Parameter Brief (Rp299k)</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.orderId} className="bento-card p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-stone-500">
                            <span className="font-bold text-sand-900">{order.orderId}</span>
                            <span>&bull;</span>
                            <span>{order.category}</span>
                          </div>
                          <h4 className="font-serif font-bold text-base sm:text-lg text-sand-900">{order.brand}</h4>
                          <p className="text-xs text-stone-600 font-sans line-clamp-1">{order.description}</p>
                        </div>
                        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-sand-200">
                          <span className={`status-badge ${order.status} border px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-mono font-semibold`}>
                            {getOrderStatusLabel(order.status)}
                          </span>
                          <a href={`/portal/${order.orderId}`} className="px-3.5 py-2 bg-sand-900 text-sand-50 text-xs font-mono rounded-xl active:bg-stone-800 hover:bg-stone-800 transition flex items-center gap-1.5 min-h-[40px]">
                            <span>Buka Hub</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Pipeline */}
              <section className="space-y-3 sm:space-y-4 pt-4 border-t border-sand-200">
                <div>
                  <span className="text-[9px] sm:text-xs font-mono uppercase text-stone-500">Transparansi Operasional</span>
                  <h2 className="text-base sm:text-2xl font-serif font-bold text-sand-900 mt-0.5">Alur Kerja Produksi 24 Jam Kami</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
                  <div className="bento-card p-4 sm:p-5 rounded-2xl space-y-1.5">
                    <span className="px-2 py-0.5 rounded bg-sand-100 text-stone-700 font-bold text-[10px]">Jam 00 — 04</span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-sand-900 font-sans">Audit Celah & Positioning</h3>
                    <p className="text-stone-600 font-sans text-xs leading-relaxed">Pembedahan akun kompetitor dan penetapan 4 pilar sudut pandang diferensiasi.</p>
                  </div>
                  <div className="bento-card p-4 sm:p-5 rounded-2xl space-y-1.5">
                    <span className="px-2 py-0.5 rounded bg-sand-100 text-stone-700 font-bold text-[10px]">Jam 04 — 12</span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-sand-900 font-sans">AI Script Drafting Engine</h3>
                    <p className="text-stone-600 font-sans text-xs leading-relaxed">Penyusunan 30 naskah video per detik, 30 takarir AIDA, dan 4 artikel SEO.</p>
                  </div>
                  <div className="bento-card p-4 sm:p-5 rounded-2xl space-y-1.5">
                    <span className="px-2 py-0.5 rounded bg-sand-100 text-stone-700 font-bold text-[10px]">Jam 12 — 20</span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-sand-900 font-sans">Human QC & Polish</h3>
                    <p className="text-stone-600 font-sans text-xs leading-relaxed">Kurasi oleh tim copywriter senior untuk memastikan nada bicara alami.</p>
                  </div>
                  <div className="bento-card p-4 sm:p-5 rounded-2xl space-y-1.5 border-emerald-300 bg-emerald-50/20">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">Jam 20 — 24</span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-sand-900 font-sans">Notion & Studio Delivery</h3>
                    <p className="text-stone-600 font-sans text-xs leading-relaxed">Pengiriman link Notion Database dan akses Teleprompter interaktif.</p>
                  </div>
                </div>
              </section>

              {/* Triple Guarantee */}
              <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-sand-100/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-sand-900">Garansi Tepat Waktu 24 Jam</h4>
                      <p className="text-[11px] sm:text-xs text-stone-600 font-sans mt-0.5">Jika pengiriman lewat 24 jam, dapatkan ekstra 5 naskah video gratis.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center shrink-0">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-sand-900">Garansi Kalibrasi 48 Jam</h4>
                      <p className="text-[11px] sm:text-xs text-stone-600 font-sans mt-0.5">Bebas revisi sudut pesan jika belum sesuai dengan karakter tokomu.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-sand-900">Naskah Kata-per-Kata</h4>
                      <p className="text-[11px] sm:text-xs text-stone-600 font-sans mt-0.5">Bukan poin kasar. Naskah siap dibaca langsung di teleprompter HP.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* VIEW 2: TOOLS */}
          {activeTab === "tools" && (
            <div className="space-y-4 sm:space-y-8">
              {/* Hook Generator */}
              <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6">
                <div className="max-w-2xl space-y-1">
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Micro-Tool Member
                  </div>
                  <h2 className="text-lg sm:text-3xl font-serif font-bold text-sand-900">Generator Hook Video Viral Instan</h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans">Ketik nama bisnismu dan lihat bagaimana formula psikologi Karsa menyusun pembuka video dalam hitungan detik.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="md:col-span-1 space-y-3 bg-sand-50 p-4 rounded-2xl border border-sand-200">
                    <div>
                      <label className="block text-stone-700 mb-1 font-bold">Nama Brand / Produk</label>
                      <input type="text" value={hookBrand} onChange={(e) => setHookBrand(e.target.value)} placeholder="Contoh: Kopi Teras" className="w-full bg-white border border-sand-300 rounded-xl p-3 text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                    </div>
                    <div>
                      <label className="block text-stone-700 mb-1 font-bold">Kategori Bisnis</label>
                      <select value={hookCategory} onChange={(e) => setHookCategory(e.target.value)} className="w-full bg-white border border-sand-300 rounded-xl p-3 text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]">
                        <option value="Kuliner / Minuman">Kuliner / Minuman</option>
                        <option value="Fashion & Aksesoris">Fashion & Aksesoris</option>
                        <option value="Skincare & Perawatan">Skincare & Perawatan</option>
                        <option value="Jasa / Layanan">Jasa / Layanan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-700 mb-1 font-bold">Masalah Terbesar Pembeli</label>
                      <input type="text" value={hookProblem} onChange={(e) => setHookProblem(e.target.value)} placeholder="Contoh: gampang ngantuk / mahal" className="w-full bg-white border border-sand-300 rounded-xl p-3 text-xs text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                    </div>
                    <button type="button" onClick={generateDemoHooks} className="w-full py-3.5 bg-sand-900 active:bg-stone-800 hover:bg-stone-800 text-sand-50 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm min-h-[48px]">
                      <Wand2 className="w-4 h-4 text-emerald-400" />
                      <span>Generate 3 Hook Video</span>
                    </button>
                  </div>
                  <div className="md:col-span-2 space-y-2.5 sm:space-y-3 font-sans">
                    {hookResults || (
                      <div className="h-full min-h-[180px] border-2 border-dashed border-sand-300 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-stone-400 space-y-2">
                        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                        <p className="text-xs font-mono">Isi parameter di samping lalu tekan tombol Generate.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* ROI Calculator */}
              <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6">
                <div className="space-y-1">
                  <span className="text-[9px] sm:text-xs font-mono uppercase text-stone-500">Kalkulator Finansial</span>
                  <h2 className="text-lg sm:text-3xl font-serif font-bold text-sand-900">Berapa Banyak Waktu & Uang yang Kamu Hemat?</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs">
                  <div className="space-y-4 bg-sand-50 p-4 sm:p-5 rounded-2xl border border-sand-200">
                    <div>
                      <div className="flex justify-between font-bold text-sand-900 mb-2">
                        <span>Jam Merancang Konten / Minggu:</span>
                        <span className="text-emerald-700">{roiHours} Jam</span>
                      </div>
                      <input type="range" min="2" max="15" value={roiHours} step="1" onChange={(e) => setRoiHours(parseInt(e.target.value))} className="w-full cursor-pointer py-2" />
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-sand-900 mb-2">
                        <span>Biaya Hire Agensi Bulanan:</span>
                        <span className="text-emerald-700">Rp {roiAgency.toLocaleString("id-ID")}</span>
                      </div>
                      <input type="range" min="1500000" max="8000000" value={roiAgency} step="250000" onChange={(e) => setRoiAgency(parseInt(e.target.value))} className="w-full cursor-pointer py-2" />
                    </div>
                  </div>
                  <div className="bento-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-4 border-emerald-300 bg-emerald-50/10">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center pb-2 border-b border-sand-200">
                        <span className="text-stone-600">Total Waktu Dihemat:</span>
                        <span className="text-sm sm:text-base font-bold text-sand-900 font-serif">{roiSavedHours} Jam / Bulan</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-sand-200">
                        <span className="text-stone-600">Biaya Karsa Studio:</span>
                        <span className="text-sm sm:text-base font-bold text-sand-900 font-serif">Rp 299.000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-sand-200">
                        <span className="text-stone-600">Penghematan Finansial:</span>
                        <span className="text-base sm:text-lg font-bold text-emerald-700 font-serif">Rp {roiNetSavings.toLocaleString("id-ID")} / Bulan</span>
                      </div>
                    </div>
                    <button onClick={() => setModalOpen(true)} className="w-full py-3.5 bg-sand-900 active:bg-stone-800 text-sand-50 rounded-xl font-bold transition flex items-center justify-center gap-2 min-h-[48px]">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Klaim Penghematan — Order Batch</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Audit Score */}
              <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4">
                <div>
                  <span className="text-[9px] sm:text-xs font-mono uppercase text-stone-500">Diagnostic Check</span>
                  <h2 className="text-lg sm:text-2xl font-serif font-bold text-sand-900">Audit Kesiapan Konten Brand</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="bg-sand-50 p-3.5 rounded-2xl border border-sand-200 space-y-1.5">
                    <span className="font-bold text-sand-900 block">1. Konsistensi Posting</span>
                    <select value={auditQ1} onChange={(e) => setAuditQ1(parseInt(e.target.value))} className="w-full bg-white border border-sand-300 rounded-xl p-2.5 text-xs text-stone-800 min-h-[44px]">
                      <option value="10">Jarang (&lt; 2 video/minggu)</option>
                      <option value="25">Kadang-kadang (3-4 video/minggu)</option>
                      <option value="40">Setiap hari konsisten</option>
                    </select>
                  </div>
                  <div className="bg-sand-50 p-3.5 rounded-2xl border border-sand-200 space-y-1.5">
                    <span className="font-bold text-sand-900 block">2. Struktur Naskah Video</span>
                    <select value={auditQ2} onChange={(e) => setAuditQ2(parseInt(e.target.value))} className="w-full bg-white border border-sand-300 rounded-xl p-2.5 text-xs text-stone-800 min-h-[44px]">
                      <option value="10">Spontan / Tanpa naskah</option>
                      <option value="25">Poin garis besar saja</option>
                      <option value="40">Naskah kata-per-kata & CTA</option>
                    </select>
                  </div>
                  <div className="bg-sand-50 p-3.5 rounded-2xl border border-sand-200 space-y-1.5">
                    <span className="font-bold text-sand-900 block">3. Pemahaman Target</span>
                    <select value={auditQ3} onChange={(e) => setAuditQ3(parseInt(e.target.value))} className="w-full bg-white border border-sand-300 rounded-xl p-2.5 text-xs text-stone-800 min-h-[44px]">
                      <option value="10">Masih umum / Semua orang</option>
                      <option value="20">Paham usia & demografi</option>
                      <option value="20">Paham pain-point emosional</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 bg-sand-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sand-900 text-sand-50 flex items-center justify-center font-bold text-sm sm:text-base font-serif shrink-0">
                      {auditTotal}%
                    </div>
                    <div>
                      <span className="font-bold text-sand-900 block text-xs sm:text-sm">
                        {auditTotal < 60 ? "Status: Perlu Sistematisasi Naskah" : "Status: Siap Skalasi Produksi Batch"}
                      </span>
                      <span className="text-stone-500 text-[10px] sm:text-[11px] font-sans block">
                        {auditTotal < 60
                          ? "Kalender Karsa 30 hari akan menyusun inventaris kontenmu agar konsisten tanpa mikir ide."
                          : "Tokomu punya pondasi bagus, batch Karsa akan mempercepat pembuatan naskah video jadi 1 hari."}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setModalOpen(true)} className="w-full sm:w-auto px-4 py-3 bg-sand-900 text-sand-50 rounded-xl active:bg-stone-800 hover:bg-stone-800 transition font-medium min-h-[44px] flex items-center justify-center">
                    Tingkatkan Skor Sekarang &rarr;
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* VIEW 3: DEMO */}
          {activeTab === "demo" && (
            <div className="space-y-4 sm:space-y-8">
              <section className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-[9px] sm:text-xs font-mono uppercase text-stone-500">Deliverables Lengkap</span>
                  <h2 className="text-lg sm:text-2xl font-serif font-bold text-sand-900 mt-0.5">Semua yang Siap Digunakan dalam 24 Jam</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
                  {([
                    [Video, "30 Naskah Video Pendek", "Format kata-per-kata: Visual Hook (0-3s), Problem Framing, Solution, dan CTA."],
                    [MessageSquare, "30 Takarir AIDA & 15 Tagar", "Copywriting Attention, Interest, Desire, Action siap salin ke Instagram & Threads."],
                    [Search, "4 Artikel SEO Website", "Artikel 1.000 kata lengkap dengan susunan heading H1/H2/H3 dan meta deskripsi."],
                    [Compass, "Audit Celah Kompetitor", "Pembedahan 1 akun kompetitor untuk menemukan sudut pesan yang belum tergarap."],
                    [Calendar, "Notion Content OS", "Database Notion dengan Calendar Matrix View siap 1-click duplicate."],
                    [Film, "Panduan Shot-List B-Roll", "Panduan sudut kamera dan pencahayaan yang mudah direkam pakai kamera HP."],
                  ] as [React.ComponentType<{className?: string}>, string, string][]).map(([Icon, title, desc], i) => (
                    <div key={i} className="bento-card p-4 sm:p-5 rounded-2xl space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-sand-100 border border-sand-200 flex items-center justify-center text-sand-900">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-sand-900 font-sans">{title}</h3>
                      <p className="text-stone-600 font-sans text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Demo Viewer */}
              <section className="space-y-3 sm:space-y-4 pt-4 border-t border-sand-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-xs">
                  <div>
                    <span className="text-[9px] sm:text-xs uppercase text-stone-500">Uji Coba Mutu Naskah</span>
                    <h2 className="text-base sm:text-2xl font-serif font-bold text-sand-900 mt-0.5">Tampilan Naskah & Takarir Karsa</h2>
                  </div>
                  <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
                    {([
                      ["script", "Naskah Video"],
                      ["caption", "Takarir AIDA"],
                      ["seo", "Artikel SEO"],
                    ] as const).map(([tab, label]) => (
                      <button key={tab} onClick={() => setActiveDemoTab(tab)} className={demoTabBtnClass(tab)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bento-card p-4 sm:p-6 rounded-2xl font-mono text-xs space-y-3">
                  {activeDemoTab === "script" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-sand-200">
                        <div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900">Pilar: Edukasi Solusi</span>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-sand-900 mt-0.5">Day 04 — Mengapa Produk Konvensional Membebani Pengguna</h4>
                        </div>
                        <span className="text-stone-500 text-[10px]">20-25s</span>
                      </div>
                      <div className="space-y-2.5 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                          <strong className="text-amber-950 font-mono text-[10px] block mb-1">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                          <p>Talent menunjukkan tumpukan catatan manual berantakan: <em>&quot;Kenapa masih buang waktu 2 jam tiap malam cuma buat mikirin ide konten besok?&quot;</em></p>
                        </div>
                        <div className="p-3 bg-white border border-sand-200 rounded-xl">
                          <strong className="text-stone-500 font-mono text-[10px] block mb-1">[00:03 - 00:18] VALUE DELIVERY</strong>
                          <p>Tunjukkan kalender 30 hari Karsa: <em>&quot;Di Karsa, kamu dapet 30 naskah per detik, takarir AIDA, dan panduan rekam HP langsung dalam 24 jam.&quot;</em></p>
                        </div>
                        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                          <strong className="text-emerald-950 font-mono text-[10px] block mb-1">[00:18 - 00:25] CALL TO ACTION</strong>
                          <p><em>&quot;Cek link di bio kami sekarang buat amankan batch tokomu sebelum kuota minggu ini ditutup!&quot;</em></p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDemoTab === "caption" && (
                    <div className="space-y-2.5">
                      <div className="pb-2 border-b border-sand-200 font-serif font-bold text-sm text-sand-900">
                        Takarir Instagram & Threads — Formula AIDA
                      </div>
                      <div className="p-3.5 bg-sand-50 border border-sand-200 rounded-xl font-sans text-xs text-stone-800 leading-relaxed whitespace-pre-line">
{`Bukan produk Anda yang sepi peminat, cara penyampaian pesannya yang belum menyentuh masalah utama audiens. 👇

Saat Anda menjual fitur, orang bosan. Saat Anda menjual penghematan waktu dan kejelasan solusi, mereka langsung checkout.

Di Karsa Studio, kami menyusun 30 hari kalender konten berdasarkan audit celah kompetitor dan psikologi audiens spesifik Anda. 

📌 Simpan postingan ini untuk referensi menyusun naskah minggu depan!
#karsastudio #kontenmarketing #umkmindonesia #strategibisnis`}
                      </div>
                    </div>
                  )}

                  {activeDemoTab === "seo" && (
                    <div className="space-y-2.5">
                      <div className="pb-2 border-b border-sand-200 font-serif font-bold text-sm text-sand-900">
                        Kerangka Artikel SEO (1.000 Kata Siap Rank Google)
                      </div>
                      <div className="p-3.5 bg-sand-50 border border-sand-200 rounded-xl font-mono text-xs space-y-2 text-stone-800">
                        <div className="font-bold text-sand-900 text-xs sm:text-sm">H1: Panduan Lengkap Memilih Strategi Konten untuk UMKM 2026</div>
                        <div className="text-[10px] text-stone-500">Volume Pencarian: 3.200/bln | Intent: Komersial & Solutif</div>
                        <div className="pl-3 border-l-2 border-sand-300 space-y-1 text-stone-700 font-sans text-xs mt-2">
                          <p><strong>H2: 3 Kesalahan Fatal yang Sering Dilakukan Pemilik Bisnis Baru</strong></p>
                          <p><strong>H2: Perbandingan Efisiensi: Agensi Bulanan vs Kalender Productized</strong></p>
                          <p><strong>H2: Cara Merekam Video Profesional Hanya Bermodalkan Kamera Ponsel</strong></p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* VIEW 4: RESOURCES */}
          {activeTab === "resources" && (
            <div className="space-y-4 sm:space-y-8">
              <section className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-[9px] sm:text-xs font-mono uppercase text-stone-500">Resource Library</span>
                  <h2 className="text-lg sm:text-2xl font-serif font-bold text-sand-900 mt-0.5">Panduan Rekam Video Modal Kamera HP</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
                  {[
                    ["01", "bg-amber-100 text-amber-900", "Pencahayaan Alami (Window Light)", "Duduk menghadap jendela besar 45 derajat. Hindari backlight agar wajah jernih tanpa perlu beli lampu studio mahal."],
                    ["02", "bg-indigo-100 text-indigo-900", "Eye-Level Framing", "Posisikan lensa HP setinggi mata (gunakan tripod meja). Sisakan sedikit ruang di atas kepala (*headroom*)."],
                    ["03", "bg-emerald-100 text-emerald-900", "Audio Jernih & Teleprompter", "Gunakan mic lavalier clip-on murah (Rp80k-150k) dan letakkan HP sejajar layar laptop untuk membaca teks Karsa."],
                  ].map(([num, colorClass, title, desc], i) => (
                    <div key={i} className="bento-card p-4 sm:p-5 rounded-2xl space-y-2">
                      <div className={`w-7 h-7 rounded-lg ${colorClass} flex items-center justify-center font-bold text-xs`}>{num}</div>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-sand-900 font-sans">{title}</h3>
                      <p className="text-stone-600 font-sans text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Hook Formulas */}
              <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-3 font-mono text-xs">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase text-stone-500">Framework Psikologi Karsa</span>
                  <h3 className="font-serif font-bold text-lg sm:text-2xl text-sand-900 font-sans">Formula Hook Penahan Scroll 3 Detik</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-stone-700">
                  {[
                    ["1. The Common Mistake (Pola Penyangkalan)", <em key={0}>&quot;Berhenti lakukan [kebiasaan salah], ini alasan kenapa tokomu sepi...&quot;</em>],
                    ["2. The Radical Contrast (Perbandingan Ekstrem)", <em key={1}>&quot;Cara orang biasa vs cara brand 100 juta closing pembeli pertama...&quot;</em>],
                    ["3. Specific Callout (Pemanggilan Niche)", <em key={2}>&quot;Khusus buat kamu yang jualan [niche] tapi capek banting harga...&quot;</em>],
                    ["4. The Secret Shortcut (Jalan Pintas Efisien)", <em key={3}>&quot;Satu metode yang bikin aku hemat 20 jam kerja minggu ini...&quot;</em>],
                  ].map(([title, desc], i) => (
                    <div key={i} className="p-3 bg-sand-50 border border-sand-200 rounded-xl space-y-0.5">
                      <strong className="text-sand-900 block font-bold text-xs">{title}</strong>
                      <p className="font-sans text-xs">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* VIEW 5: PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-3xl font-serif text-sand-900 font-bold">Pengaturan Akun & Brand Vault</h2>
                <p className="text-[11px] sm:text-xs text-stone-600 font-mono">Kelola identitas diri, parameter brand bawaan, dan kontak pengiriman berkas.</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4 sm:space-y-6">
                {/* Avatar Card */}
                <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4">
                  <div>
                    <h3 className="text-sm sm:text-lg font-serif font-bold text-sand-900">Foto Profil & Identitas Visual</h3>
                    <p className="text-[10px] sm:text-xs text-stone-500 font-mono">Tampil di sudut navbar workspace dan kop invoice.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-1">
                    <div className="relative group">
                      <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-sand-900 text-sand-50 border-2 border-sand-300 flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold overflow-hidden shadow-sm">
                        {hasAvatar ? <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" /> : <span>{avatarInitial}</span>}
                      </div>
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-white border border-sand-300 rounded-full text-sand-900 shadow-md active:bg-sand-100" title="Ganti Foto">
                        <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3.5 py-2 bg-sand-900 active:bg-stone-800 text-sand-50 text-xs font-mono rounded-xl transition min-h-[44px]">
                          Unggah Foto
                        </button>
                        <button type="button" onClick={removeAvatar} className="px-3.5 py-2 border border-sand-300 active:bg-sand-200 text-stone-700 text-xs font-mono rounded-xl transition min-h-[44px]">
                          Hapus Foto
                        </button>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-stone-500 font-mono">Maksimal 2 MB (JPG/PNG/WEBP).</p>
                    </div>
                  </div>
                </section>

                {/* Personal Info */}
                <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4">
                  <div><h3 className="text-sm sm:text-lg font-serif font-bold text-sand-900">Informasi Pribadi</h3></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div>
                      <label className="block text-stone-700 mb-1 text-[10px] uppercase">Nama Lengkap *</label>
                      <input type="text" required value={inputFullName} onChange={(e) => setInputFullName(e.target.value)} placeholder="Contoh: Alaric Diaz" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                    </div>
                    <div>
                      <label className="block text-stone-700 mb-1 text-[10px] uppercase">Display Name *</label>
                      <input type="text" required value={inputDisplayName} onChange={(e) => setInputDisplayName(e.target.value)} placeholder="Contoh: Alaric" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-stone-700 text-[10px] uppercase mb-1">Bio Singkat / Peran</label>
                    <input type="text" value={inputRoleBio} onChange={(e) => setInputRoleBio(e.target.value)} placeholder="Contoh: Founder & Lead Brand Strategist" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                  </div>
                </section>

                {/* Contact */}
                <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4">
                  <div><h3 className="text-sm sm:text-lg font-serif font-bold text-sand-900">Kontak & Notifikasi Pengiriman</h3></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div>
                      <label className="block text-stone-700 mb-1 text-[10px] uppercase">Email Akun *</label>
                      <input type="email" required value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="nama@email.com" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                    </div>
                    <div>
                      <label className="block text-stone-700 mb-1 text-[10px] uppercase">Nomor WhatsApp *</label>
                      <input type="tel" required value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} placeholder="081234567890" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                    </div>
                  </div>
                </section>

                {/* Brand Vault */}
                <section className="bento-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4">
                  <div>
                    <h3 className="text-sm sm:text-lg font-serif font-bold text-sand-900">Brand Vault (Parameter Bawaan)</h3>
                    <p className="text-[10px] sm:text-xs text-stone-500 font-mono">Otomatis terisi saat kamu membuka form order batch baru.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div>
                      <label className="block text-stone-700 mb-1 text-[10px] uppercase">Nama Brand Utama</label>
                      <input type="text" value={inputDefaultBrand} onChange={(e) => setInputDefaultBrand(e.target.value)} placeholder="Contoh: Kopi Teras Senja" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                    </div>
                    <div>
                      <label className="block text-stone-700 mb-1 text-[10px] uppercase">Kategori Industri</label>
                      <select value={inputDefaultCategory} onChange={(e) => setInputDefaultCategory(e.target.value)} className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]">
                        <option value="Kuliner / F&B">Kuliner / F&B</option>
                        <option value="Fashion & Apparel">Fashion & Apparel</option>
                        <option value="Skincare & Beauty">Skincare & Beauty</option>
                        <option value="Jasa Profesional">Jasa Profesional</option>
                        <option value="Gadget / Elektronik">Gadget / Elektronik</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-stone-700 text-[10px] uppercase mb-1">1 Akun Kompetitor Acuan</label>
                    <input type="text" value={inputDefaultCompetitor} onChange={(e) => setInputDefaultCompetitor(e.target.value)} placeholder="@namakompetitor" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                  </div>
                </section>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className={`text-xs font-mono text-emerald-700 font-semibold text-center sm:text-left ${showSaveStatus ? "" : "hidden"}`}>
                    ✓ Pengaturan profil & Brand Vault berhasil disimpan!
                  </span>
                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end ml-auto">
                    <button type="button" onClick={() => switchMainTab("workspace")} className="w-1/2 sm:w-auto px-4 py-3 border border-sand-300 rounded-xl active:bg-sand-200 text-stone-700 font-mono text-xs transition text-center min-h-[48px]">
                      Kembali
                    </button>
                    <button type="submit" className="w-1/2 sm:w-auto px-5 py-3 bg-sand-900 active:bg-stone-800 text-sand-50 rounded-xl font-mono text-xs font-semibold transition shadow-sm min-h-[48px] flex items-center justify-center gap-1.5">
                      <Save className="w-4 h-4 text-emerald-400" />
                      <span>Simpan Data</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

        </main>

        {/* MOBILE BOTTOM NAV */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand-200 safe-bottom">
          <div className="grid grid-cols-5 h-16 items-center px-1 font-mono text-[10px]">
            <button onClick={() => switchMainTab("workspace")} className={`flex flex-col items-center justify-center gap-1 h-full ${mobNavBtnClass("workspace")}`}>
              <LayoutGrid className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button onClick={() => switchMainTab("tools")} className={`flex flex-col items-center justify-center gap-1 h-full ${mobNavBtnClass("tools")}`}>
              <Cpu className="w-4 h-4" />
              <span>Tools</span>
            </button>
            <div className="flex items-center justify-center">
              <button onClick={() => setModalOpen(true)} className="w-11 h-11 rounded-full bg-sand-900 text-sand-50 flex items-center justify-center shadow-lg active:scale-95 transition -translate-y-2 border-2 border-white">
                <Plus className="w-5 h-5 text-emerald-400" />
              </button>
            </div>
            <button onClick={() => switchMainTab("demo")} className={`flex flex-col items-center justify-center gap-1 h-full ${mobNavBtnClass("demo")}`}>
              <Sparkles className="w-4 h-4" />
              <span>Studio</span>
            </button>
            <button onClick={() => switchMainTab("profile")} className={`flex flex-col items-center justify-center gap-1 h-full ${mobNavBtnClass("profile")}`}>
              <User className="w-4 h-4" />
              <span>Akun</span>
            </button>
          </div>
        </nav>

        {/* ORDER MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 bg-sand-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white border-t sm:border border-sand-300 rounded-t-3xl sm:rounded-2xl max-w-xl w-full p-5 sm:p-8 shadow-2xl font-sans text-xs max-h-[90vh] overflow-y-auto safe-bottom">
              <div className="w-12 h-1.5 bg-sand-300 rounded-full mx-auto mb-3 sm:hidden"></div>
              <div className="flex justify-between items-center pb-3 border-b border-sand-200 mb-4">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase text-stone-500">Mulai Produksi 24 Jam</span>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-sand-900 mt-0.5">Formulir Brief Kalender 30 Hari</h3>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-sand-900 text-2xl p-1 min-w-[36px] min-h-[36px] flex items-center justify-center">&times;</button>
              </div>
              <form onSubmit={handleOrderSubmit} className="space-y-3.5 font-mono">
                <div>
                  <label className="block text-stone-700 text-xs mb-1">Nama Brand / Bisnis *</label>
                  <input type="text" required value={inBrand} onChange={(e) => setInBrand(e.target.value)} placeholder="Contoh: Kopi Teras Senja" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 text-xs mb-1">Kategori Industri *</label>
                    <select value={inCategory} onChange={(e) => setInCategory(e.target.value)} className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]">
                      <option value="Kuliner / F&B">Kuliner / F&B</option>
                      <option value="Fashion & Apparel">Fashion & Apparel</option>
                      <option value="Skincare & Beauty">Skincare & Beauty</option>
                      <option value="Jasa Profesional">Jasa Profesional</option>
                      <option value="Gadget / Elektronik">Gadget / Elektronik</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 text-xs mb-1">1 Akun Kompetitor</label>
                    <input type="text" value={inCompetitor} onChange={(e) => setInCompetitor(e.target.value)} placeholder="@namakompetitor" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-stone-700 text-xs mb-1">Deskripsi Produk & Target Pembeli *</label>
                  <textarea rows={3} required value={inDesc} onChange={(e) => setInDesc(e.target.value)} placeholder="Jelaskan produk unggulan, rentang harga, dan siapa pembeli utama Anda..." className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900"></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 text-xs mb-1">Email Penerima File *</label>
                    <input type="email" required value={inEmail} onChange={(e) => setInEmail(e.target.value)} placeholder="nama@email.com" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                  </div>
                  <div>
                    <label className="block text-stone-700 text-xs mb-1">Nomor WhatsApp Aktif *</label>
                    <input type="tel" required value={inPhone} onChange={(e) => setInPhone(e.target.value)} placeholder="081234567890" className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs font-sans text-sand-900 focus:outline-none focus:border-sand-900 min-h-[44px]" />
                  </div>
                </div>
                <div className="pt-3 border-t border-sand-200">
                  <button type="submit" className="w-full py-3.5 bg-sand-900 active:bg-stone-800 text-sand-50 rounded-xl font-medium transition flex items-center justify-center gap-2 text-xs min-h-[48px] shadow-sm">
                    <span>Kirim Brief & Buat Tagihan (Rp299.000)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-stone-500 mt-2 font-mono">Garansi kalibrasi penyesuaian sudut pesan 48 jam gratis.</p>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
