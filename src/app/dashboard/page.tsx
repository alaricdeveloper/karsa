"use client";

import { useState, useEffect, useRef, useCallback, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/api-client";
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
  Send,
  Zap,
  SlidersHorizontal,
  Play,
  ChevronDown,
  CalendarDays,
  Copy,
  X,
  FileText,
  Globe,
  Radar,
  Database,
  MonitorPlay,
  Sun,
  Frame,
  Mic,
  Image,
  Hand,
  Clapperboard,
  Music2,
  PlaySquare,
  AtSign,
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
type DemoDay = "01" | "04" | "09" | "21" | "26";

const PANELS: MainTab[] = ["workspace", "tools", "demo", "resources", "profile"];
const PANEL_ACCENTS: Record<MainTab, string> = {
  workspace: "bg-terracotta",
  tools: "bg-wasabi",
  demo: "bg-sunflower",
  resources: "bg-terracottaLight",
  profile: "bg-wasabi",
};

const DEMO_DAYS: DemoDay[] = ["01", "04", "09", "21", "26"];

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
    const res = await authFetch("/api/my-orders");
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

const NOTION_PILLAR_CLASSES = [
  "bg-sunflower", "bg-sunflower", "bg-sunflower", "bg-sunflower", "bg-sunflower", "bg-sunflower", "bg-sunflower",
  "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white", "bg-white",
  "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40", "bg-sunflower/40",
  "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi", "bg-wasabi",
];

export default function DashboardPage() {
  const router = useRouter();
  const loadedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingAvatarRef = useRef<string>("");
  const userEmailRef = useRef<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<MainTab>("workspace");
  const [activeDemoTab, setActiveDemoTab] = useState<DemoTab>("script");
  const [activeDemoDay, setActiveDemoDay] = useState<DemoDay>("01");
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showSaveStatus, setShowSaveStatus] = useState(false);

  // Hook generator
  const [hookBrand, setHookBrand] = useState("");
  const [hookCategory, setHookCategory] = useState("Kuliner / Minuman");
  const [hookProblem, setHookProblem] = useState("");
  const [hookResults, setHookResults] = useState<React.ReactNode | null>(null);

  // Idea calendar generator
  const [ideBrand, setIdeBrand] = useState("");
  const [ideProblem, setIdeProblem] = useState("");
  const [ideResults, setIdeResults] = useState<React.ReactNode | null>(null);

  // AIDA caption generator
  const [capBrand, setCapBrand] = useState("");
  const [capProduct, setCapProduct] = useState("");
  const [capOffer, setCapOffer] = useState("");
  const [capResults, setCapResults] = useState<React.ReactNode | null>(null);

  // ROI calculator
  const [roiHours, setRoiHours] = useState(6);
  const [roiAgency, setRoiAgency] = useState(3500000);

  // Audit score
  const [auditQ1, setAuditQ1] = useState(25);
  const [auditQ2, setAuditQ2] = useState(10);
  const [auditQ3, setAuditQ3] = useState(20);

  // Profile form inputs
  const [inputFullName, setInputFullName] = useState(DEFAULT_PROFILE.fullName);
  const [inputDisplayName, setInputDisplayName] = useState(DEFAULT_PROFILE.displayName);
  const [inputRoleBio, setInputRoleBio] = useState(DEFAULT_PROFILE.roleBio);
  const [inputEmail, setInputEmail] = useState(DEFAULT_PROFILE.email);
  const [inputPhone, setInputPhone] = useState(DEFAULT_PROFILE.phone);
  const [inputDefaultBrand, setInputDefaultBrand] = useState(DEFAULT_PROFILE.defaultBrand);
  const [inputDefaultCategory, setInputDefaultCategory] = useState(DEFAULT_PROFILE.defaultCategory);
  const [inputDefaultCompetitor, setInputDefaultCompetitor] = useState(DEFAULT_PROFILE.defaultCompetitor);

  // Order form inputs
  const [inBrand, setInBrand] = useState("");
  const [inCategory, setInCategory] = useState("Kuliner / F&B");
  const [inCompetitor, setInCompetitor] = useState("");
  const [inDesc, setInDesc] = useState("");
  const [inEmail, setInEmail] = useState("");
  const [inPhone, setInPhone] = useState("");

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
        fetchOrdersFromSupabase(user.email || "").then((o) => {
          setOrders(o);
        }).catch(() => {});
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      const isOpen = !modalRef.current.classList.contains("hidden");
      if (e.key === "Escape" && isOpen) {
        setModalOpen(false);
        document.body.classList.remove("overflow-hidden");
        return;
      }
      if (e.key === "Tab" && isOpen) {
        const focusables = modalRef.current.querySelectorAll("input, select, textarea, button, a[href]");
        const list = Array.from(focusables).filter((el) => (el as HTMLElement).offsetParent !== null);
        if (list.length === 0) return;
        const first = list[0] as HTMLElement;
        const last = list[list.length - 1] as HTMLElement;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("overflow-hidden");
      document.getElementById("inBrand")?.focus();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [modalOpen]);

  const switchMainTab = useCallback((tab: MainTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const switchDemoTab = useCallback((tab: DemoTab) => {
    setActiveDemoTab(tab);
  }, []);

  const switchDemoDay = useCallback((day: DemoDay) => {
    setActiveDemoDay(day);
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
        <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1.5 shadow-brutal-sm">
          <div className="flex justify-between items-center gap-2">
            <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-bold bg-sunflower text-ink">Formula Penyangkalan</span>
            <span className="text-[10px] text-stone-600 font-mono font-bold shrink-0">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-ink leading-relaxed">"Berhenti buang uang buat [kebiasaan lama]. Ini alasan kenapa pelanggan {brand} gak pernah ngeluh {problem}..."</p>
        </div>

        <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1.5 shadow-brutal-sm">
          <div className="flex justify-between items-center gap-2">
            <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-bold bg-wasabi text-ink">Formula Callout Niche</span>
            <span className="text-[10px] text-stone-600 font-mono font-bold shrink-0">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-ink leading-relaxed">"Khusus buat kamu yang lagi nyari {category} tapi capek kena masalah {problem} tiap hari..."</p>
        </div>

        <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1.5 shadow-brutal-sm">
          <div className="flex justify-between items-center gap-2">
            <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-bold bg-terracottaLight text-terracotta">Formula Secret Shortcut</span>
            <span className="text-[10px] text-stone-600 font-mono font-bold shrink-0">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-ink leading-relaxed">"Trik sederhana dari {brand} yang bikin kamu bebas dari {problem} tanpa ribet!"</p>
        </div>

        <div className="pt-2 text-center">
          <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-terracotta underline underline-offset-4">
            <span>Dapatkan 30 Naskah Lengkap untuk {brand}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </>
    );
  };

  const generateIdeaCalendar = () => {
    const brand = ideBrand.trim() || "Brand Anda";
    const problem = ideProblem.trim() || "masalah utama pembeli";

    const pillars = [
      { name: "Edukasi Solusi", range: "Hari 1 — 7", chip: "bg-sunflower text-ink", ideas: [
        `Kesalahan #1 yang bikin tokomu sepi padahal produknya bagus — ${problem}`,
        `Cara ${brand} menyelesaikan ${problem} dalam 3 langkah sederhana`,
        `Kenapa kamu salah pilih produk untuk ${problem} selama ini`
      ]},
      { name: "Bukti Sosial & Kredibilitas", range: "Hari 8 — 14", chip: "bg-canvas text-ink", ideas: [
        `Apa kata 3 pembeli pertama ${brand} — tanpa diedit`,
        `Di balik proses produksi ${brand}: 24 jam dari brief ke jadi`,
        `5 pertanyaan yang paling sering ditanya pembeli ${brand}, dijawab`
      ]},
      { name: "Hiburan Ringan", range: "Hari 15 — 22", chip: "bg-sunflower/40 text-ink", ideas: [
        `POV: kamu baru tahu fungsi ini setelah beli ${brand}`,
        `Tantangan 7 hari tanpa ${problem} — coba ikut?`,
        `Tebak: mana yang bener, mitos atau fakta soal ${problem}`
      ]},
      { name: "Jualan & CTA", range: "Hari 23 — 30", chip: "bg-wasabi text-ink", ideas: [
        `Sisa slot minggu ini — kenapa batch ${brand} selalu abis duluan`,
        `Hitung-hitungan jujur: biaya ${brand} vs bikin konten sendiri`,
        `Penawaran terbatas: apa isi paket ${brand} dan garansinya`
      ]}
    ];

    setIdeResults(
      <>
        {pillars.map((p) => (
          <div key={p.name} className="p-4 bg-white border-2 border-ink rounded-2xl space-y-2 shadow-brutal-sm">
            <div className="flex items-center justify-between gap-2">
              <span className={`badge-tag px-2 py-0.5 rounded text-[10px] font-bold ${p.chip}`}>{p.range}</span>
              <span className="text-[10px] text-stone-600 font-mono font-bold">{p.name}</span>
            </div>
            <ul className="space-y-1.5 text-xs font-sans text-stone-700 leading-relaxed">
              {p.ideas.map((i, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-ink rounded-full shrink-0 mt-1.5"></span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="pt-1 text-center">
          <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-terracotta underline underline-offset-4">
            <span>Terima 30 ide lengkap + naskah jadi untuk {brand}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </>
    );
  };

  const generateAidaCaption = () => {
    const brand = capBrand.trim() || "Brand Anda";
    const product = capProduct.trim() || "produk unggulan";
    const offer = capOffer.trim() || "penawaran minggu ini";

    setCapResults(
      <>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl space-y-3 shadow-brutal-sm">
          <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-ink">
            <span className="text-[10px] font-mono font-bold text-stone-600">TAKARIR SIAP SALIN · FORMULA AIDA</span>
            <button onClick={copyCaptionResult} className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-ink bg-canvas border-2 border-ink rounded-lg px-2 py-1">
              <Copy className="w-3 h-3" />
              <span>Salin</span>
            </button>
          </div>
          <div className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
            {`${brand} bukan soal ${product} biasa — ini soal kamu yang udah capek coba banyak cara tapi hasilnya gitu-gitu aja. 👇

Coba perhatiin: kebanyakan orang fokus ke produknya, padahal yang bikin kamu maju itu rutinitas yang konsisten dan formula yang udah teruji.

Di ${brand}, kami meracik ${product} dengan fokus ke hasil nyata — bukan janji manis. Pembeli kamu bakal ngerasain bedanya sejak minggu pertama.

✨ ${offer}. Kuota terbatas, dan selalu habis duluan di akhir pekan.

📌 Klik link di bio dan mulai hari ini!
#kontenbrand #umkmindonesia #belanjacerdas #rekomendasiproduk`}
          </div>
        </div>
        <div className="pt-1 text-center">
          <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-terracotta underline underline-offset-4">
            <span>30 takarir AIDA khusus brand-mu, jadi dalam 24 jam</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </>
    );
  };

  const copyCaptionResult = () => {
    const text = document.getElementById("capResultText")?.innerText;
    if (!text) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Takarir disalin ke clipboard!");
      });
    } else {
      alert("Browser kamu tidak mendukung salin otomatis.");
    }
  };

  const roiSavedHours = roiHours * 4;
  const roiNetSavings = roiAgency - 299000;
  const auditTotal = auditQ1 + auditQ2 + auditQ3;

  const getOrderStatusLabel = (status: string) => {
    switch (status) {
      case "IN_PROGRESS": return "Sedang Disusun (AI + QC)";
      case "QC_REVIEW": return "Tahap Kurasi Akhir";
      case "COMPLETED": return "Selesai & Siap Akses";
      default: return "Menunggu Bayar";
    }
  };

  const getOrderStatusClass = (status: string) => {
    switch (status) {
      case "IN_PROGRESS": return "bg-sunflower text-ink border-ink";
      case "QC_REVIEW": return "bg-terracottaLight text-terracotta border-ink";
      case "COMPLETED": return "bg-wasabi text-ink border-ink";
      default: return "bg-white text-stone-600 border-ink";
    }
  };

  const orderStageIndex = (status: string) => {
    if (status === "IN_PROGRESS") return 2;
    if (status === "QC_REVIEW") return 3;
    if (status === "COMPLETED") return 4;
    return 1;
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

  const mainTabBtnClass = (tab: MainTab) => {
    const active = activeTab === tab;
    return [
      "main-tab-nav tab-lever flex items-center gap-2 px-3.5 py-3 border-b-[3px] shrink-0",
      active ? "border-terracotta text-ink" : "border-transparent text-stone-600 hover:text-ink transition",
    ].join(" ");
  };

  const tabNumClass = (tab: MainTab) => {
    const active = activeTab === tab;
    return [
      "tab-num border-2 border-ink rounded-md px-1.5 py-0.5 text-[10px]",
      active ? `${PANEL_ACCENTS[tab]} text-ink shadow-brutal-sm` : "bg-white text-ink",
    ].join(" ");
  };

  const mobNavClass = (tab: MainTab) => {
    const active = activeTab === tab;
    return [
      "flex flex-col items-center justify-center gap-1 h-full min-h-[44px]",
      active ? "text-terracotta" : "text-stone-600",
    ].join(" ");
  };

  const sampleTabClass = (tab: DemoTab) => {
    const active = activeDemoTab === tab;
    return [
      "sample-tab-btn badge-tag px-4 py-2 rounded-xl text-xs font-mono font-bold transition",
      active ? "active bg-ink text-white" : "bg-white text-ink",
    ].join(" ");
  };

  const dayTabClass = (day: DemoDay) => {
    const active = activeDemoDay === day;
    return [
      "day-tab-btn sample-tab-btn badge-tag px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold transition shrink-0",
      active ? "active bg-ink text-white" : "bg-white text-ink",
    ].join(" ");
  };

  return (
    <div className="member-console">
      {/* SKIP LINK */}
      <a href="#view-workspace" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-canvas focus:px-4 focus:py-2 focus:rounded-xl focus:font-mono focus:text-xs focus:font-bold">
        Lewati ke konten utama
      </a>

      {/* TOP APP BAR */}
      <header className="sticky top-0 z-30 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">
          <a href="/" className="flex items-center space-x-2.5 shrink-0 group">
            <span className="font-serif text-2xl sm:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">Karsa</span>
            <span className="badge-tag hidden sm:inline text-[10px] font-mono uppercase px-2 py-0.5 bg-wasabi text-ink rounded font-bold">Workspace</span>
          </a>

          <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono">
            <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-terracotta hover:bg-ink text-white rounded-xl transition font-bold shadow-brutal">
              <Plus className="w-3.5 h-3.5 text-wasabi" />
              <span className="hidden sm:inline">Mulai Batch (Rp299k)</span>
              <span className="sm:hidden">Order</span>
            </button>

            <button onClick={() => switchMainTab("profile")} className="flex items-center gap-1.5 px-2 sm:px-3 py-2 bg-white border-2 border-ink rounded-xl hover:bg-canvas transition text-ink font-bold shadow-brutal-sm" aria-label="Buka pengaturan akun">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-ink text-canvas flex items-center justify-center text-[10px] font-bold overflow-hidden font-serif">
                {hasAvatar ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{avatarInitial}</span>
                )}
              </span>
              <span className="hidden lg:inline">{profile.displayName || profile.fullName}</span>
            </button>

            <button onClick={handleLogout} className="p-2 border-2 border-ink rounded-xl hover:bg-canvas transition bg-white text-ink shadow-brutal-sm" title="Keluar" aria-label="Keluar dari workspace">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* DESKTOP PANEL LEVERS */}
      <div className="hidden md:block border-b-2 border-ink bg-surface sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-3 text-xs font-mono font-bold overflow-x-auto no-scrollbar whitespace-nowrap" role="tablist" aria-label="Panel workspace">
          <button role="tab" aria-selected={activeTab === "workspace"} aria-controls="view-workspace" onClick={() => switchMainTab("workspace")} id="tab-nav-workspace" className={mainTabBtnClass("workspace")}>
            <span className={tabNumClass("workspace")}>01</span>
            <span>Workspace & Inventaris</span>
          </button>
          <button role="tab" aria-selected={activeTab === "tools"} aria-controls="view-tools" onClick={() => switchMainTab("tools")} id="tab-nav-tools" className={mainTabBtnClass("tools")}>
            <span className={tabNumClass("tools")}>02</span>
            <span>Micro-Tools & ROI</span>
          </button>
          <button role="tab" aria-selected={activeTab === "demo"} aria-controls="view-demo" onClick={() => switchMainTab("demo")} id="tab-nav-demo" className={mainTabBtnClass("demo")}>
            <span className={tabNumClass("demo")}>03</span>
            <span>Deliverables & Demo</span>
          </button>
          <button role="tab" aria-selected={activeTab === "resources"} aria-controls="view-resources" onClick={() => switchMainTab("resources")} id="tab-nav-resources" className={mainTabBtnClass("resources")}>
            <span className={tabNumClass("resources")}>04</span>
            <span>Panduan Rekam & Formula</span>
          </button>
          <button role="tab" aria-selected={activeTab === "profile"} aria-controls="view-profile" onClick={() => switchMainTab("profile")} id="tab-nav-profile" className={mainTabBtnClass("profile")}>
            <span className={tabNumClass("profile")}>05</span>
            <span>Akun & Brand Vault</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* ============ PANEL 01: WORKSPACE & INVENTORY ============ */}
        <section id="view-workspace" tabIndex={-1} role="tabpanel" aria-labelledby="tab-nav-workspace" className={`space-y-6 sm:space-y-8 ${activeTab !== "workspace" ? "hidden" : ""}`}>
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-terracotta border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm shrink-0">01</span>
            <div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Workspace & Inventaris</h1>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Konsol kalender 30 hari: status, antrean, dan pipeline produksi.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="lg:col-span-2 bento-pop p-5 sm:p-8 rounded-3xl bg-white flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-ink bg-wasabi border-2 border-ink px-3 py-1 rounded-full font-bold shadow-brutal-sm">
                  <span className="w-2 h-2 rounded-full bg-terracotta pulse-dot border border-ink"></span>
                  SLA 24 Jam: Siap Menerima Brief
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-serif text-ink leading-[1.1]">
                  Selamat datang, <span className="italic text-terracotta">{profile.displayName || "Kreator"}</span>.
                  <span className="block text-stone-700 text-lg sm:text-2xl mt-2 font-normal">Inventaris konten 30 harimu siap diorkestrasi.</span>
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-xl">
                  Kirim formulir brief bisnismu untuk menerima 30 naskah video kata-per-kata, 30 takarir AIDA, 4 artikel SEO, dan Notion Content OS dalam 1&times;24 jam kerja.
                </p>
              </div>
            </div>

            <aside className="bg-terracotta border-2 border-ink rounded-3xl shadow-brutal p-5 sm:p-7 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight">Batch baru,<br />24 jam jadi.</h3>
                <p className="text-xs text-ink leading-relaxed font-medium">30 naskah + 30 takarir AIDA + 4 artikel SEO + Notion Content OS.</p>
                <p className="font-mono text-lg sm:text-xl font-bold text-ink">Rp299.000 <span className="text-ink text-xs font-bold">/ 30 hari</span></p>
              </div>
              <div className="space-y-2.5">
                <button onClick={() => setModalOpen(true)} className="w-full px-5 py-4 bg-ink hover:bg-canvas hover:text-ink text-canvas rounded-2xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[48px] shadow-brutal-sm">
                  <Sparkles className="w-4 h-4 text-wasabi" />
                  <span>Mulai Order Batch</span>
                </button>
                <button onClick={() => switchMainTab("tools")} className="w-full px-5 py-3 border-2 border-ink bg-white hover:bg-canvas text-ink rounded-2xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[44px]">
                  <Wand2 className="w-4 h-4" />
                  <span>Coba Generator Hook Gratis</span>
                </button>
              </div>
            </aside>
          </div>

          <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
            <div className="readout-grid font-mono text-xs">
              <div className="readout-cell">
                <span className="text-[10px] text-stone-600 uppercase font-bold block tracking-wide">Batch Aktif</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-ink mt-1 block">{orders.length} Batch</span>
                <span className="text-[10px] text-stone-600 block">Antrean real-time</span>
              </div>
              <div className="readout-cell">
                <span className="text-[10px] text-stone-600 uppercase font-bold block tracking-wide">Deliverables</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-ink mt-1 block">30 Naskah</span>
                <span className="text-[10px] text-stone-600 block">Visual + audio hook</span>
              </div>
              <div className="readout-cell bg-wasabi">
                <span className="text-[10px] text-wasabiDark uppercase font-bold block tracking-wide">Turnaround</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-ink mt-1 block">&lt; 24 Jam</span>
                <span className="text-[10px] text-wasabiDark font-bold block">QC tim copywriter</span>
              </div>
              <div className="readout-cell">
                <span className="text-[10px] text-stone-600 uppercase font-bold block tracking-wide">Kalibrasi</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-terracotta mt-1 block">48 Jam</span>
                <span className="text-[10px] text-stone-600 block">Bebas revisi sudut</span>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Perjalanan Batch Kamu</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="readout-grid font-mono text-xs">
                <div className="readout-cell space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0">
                      <Send className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-ink">Kirim Brief</span>
                  </div>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Form 5 menit, Brand Vault mengisi otomatis, cukup tambah deskripsi produk.</p>
                </div>
                <div className="readout-cell space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-ink">Produksi 24 Jam</span>
                  </div>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">AI drafting + kurasi copywriter senior. Timer berjalan begitu brief masuk.</p>
                </div>
                <div className="readout-cell space-y-2 bg-wasabi/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center shrink-0">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-ink">Kalibrasi 48 Jam</span>
                  </div>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Bebas revisi sudut pesan sampai tone-nya pas dengan karakter tokomu.</p>
                </div>
                <div className="readout-cell space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-ink">Rekam & Posting</span>
                  </div>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Baca naskah langsung dari teleprompter di Customer Hub, rekam pakai HP.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Anatomi Kalender 30 Hari: 4 Pilar</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="readout-grid font-mono text-xs">
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-sunflower text-ink font-bold text-[10px]">Hari 1 — 7</span>
                  <h4 className="font-serif font-bold text-base text-ink">Edukasi Solusi</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Naskah yang mendidik sekaligus menjual: bangun otoritas sejak hari pertama.</p>
                  <p className="text-stone-500 font-sans text-[11px] italic leading-relaxed">Contoh: "Mengapa [masalah umum] bikin pembelimu rugi setiap minggu."</p>
                </div>
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Hari 8 — 14</span>
                  <h4 className="font-serif font-bold text-base text-ink">Bukti Sosial & Kredibilitas</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Testimoni, proses produksi, behind-the-scene: buktikan kamu bukan abal-abal.</p>
                  <p className="text-stone-500 font-sans text-[11px] italic leading-relaxed">Contoh: "3 pembeli pertama kami bilang hal yang sama tentang produk ini."</p>
                </div>
                <div className="readout-cell space-y-2 bg-sunflower/20">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-sunflower text-ink font-bold text-[10px]">Hari 15 — 22</span>
                  <h4 className="font-serif font-bold text-base text-ink">Hiburan Ringan</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Meme, tren, dan interaksi: jaga akun tetap hidup dan relatable.</p>
                  <p className="text-stone-500 font-sans text-[11px] italic leading-relaxed">Contoh: "POV: kamu baru tahu cara pakai produk ini yang bener."</p>
                </div>
                <div className="readout-cell space-y-2 bg-wasabi/40">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-wasabi text-ink font-bold text-[10px]">Hari 23 — 30</span>
                  <h4 className="font-serif font-bold text-base text-ink">Jualan & CTA</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Penawaran, promo, dan urgency: konversi penonton jadi pembeli.</p>
                  <p className="text-stone-500 font-sans text-[11px] italic leading-relaxed">Contoh: "Batch minggu ini tersisa [X] slot — amankan sebelum tutup."</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex justify-between items-center gap-3">
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Inventaris Batch Konten Saya</h3>
              <span className="badge-tag px-3 py-1 bg-sunflower text-ink rounded-xl text-xs font-mono font-bold shrink-0">{orders.length} Batch</span>
            </div>

            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="bento-pop p-8 sm:p-12 rounded-3xl text-center space-y-4 bg-white">
                  <div className="w-12 h-12 rounded-2xl bg-canvas border-2 border-ink flex items-center justify-center mx-auto text-stone-600 shadow-brutal-sm">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-ink">Belum Ada Pesanan Aktif</h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Kirim brief pertamamu sekarang untuk mendapatkan inventaris kalender 30 hari siap pakai.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 px-6 py-3.5 bg-terracotta text-white text-xs font-mono font-bold rounded-2xl hover:bg-ink transition shadow-brutal min-h-[44px]">
                      <Plus className="w-4 h-4 text-wasabi" />
                      <span>Kirim Parameter Brief (Rp299k)</span>
                    </button>
                  </div>
                </div>
              ) : (
                orders.map((order) => {
                  const stage = orderStageIndex(order.status);
                  const stageDots = [1, 2, 3, 4].map((s) => (
                    <span key={s} className={`pipe-dot ${s <= stage ? "on" : ""}`}></span>
                  ));
                  return (
                    <div key={order.orderId} className="bento-pop hoverable p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 font-mono text-xs text-stone-600">
                          <span className="font-bold text-ink">{order.orderId}</span>
                          <span>{order.category}</span>
                        </div>
                        <h4 className="font-serif font-bold text-lg text-ink truncate">{order.brand}</h4>
                        <p className="text-xs text-stone-600 truncate">{order.description}</p>
                        <div className="flex items-center gap-1.5 pt-1" aria-label={`Progress produksi: tahap ${stage} dari 4`}>
                          {stageDots}
                          <span className="text-[10px] text-stone-600 font-bold ml-1">Tahap {stage}/4</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t-2 sm:border-t-0 border-ink shrink-0">
                        <span className={`border-2 ${getOrderStatusClass(order.status)} px-3 py-1 rounded-xl text-xs font-mono font-bold`}>
                          {getOrderStatusLabel(order.status)}
                        </span>
                        <a href={`/portal/${order.orderId}`} className="px-4 py-2.5 bg-ink text-canvas hover:bg-terracotta hover:text-white text-xs font-mono font-bold rounded-xl transition flex items-center gap-1.5 min-h-[40px] shadow-brutal-sm">
                          <span>Buka Hub</span>
                          <ArrowRight className="w-3.5 h-3.5 text-wasabi" />
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Alur Kerja Produksi 24 Jam Kami</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="readout-grid font-mono text-xs">
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Jam 00 — 04</span>
                  <h4 className="font-serif font-bold text-base text-ink">Audit Celah & Positioning</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Pembedahan akun kompetitor dan penetapan 4 pilar sudut pandang diferensiasi brand.</p>
                </div>
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Jam 04 — 12</span>
                  <h4 className="font-serif font-bold text-base text-ink">AI Script Drafting Engine</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Penyusunan 30 naskah video per detik, 30 takarir AIDA, dan 4 artikel SEO.</p>
                </div>
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Jam 12 — 20</span>
                  <h4 className="font-serif font-bold text-base text-ink">Human QC & Polish</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Kurasi oleh tim copywriter senior untuk memastikan nada bicara alami.</p>
                </div>
                <div className="readout-cell space-y-2 bg-wasabi/40">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-wasabi text-ink font-bold text-[10px]">Jam 20 — 24</span>
                  <h4 className="font-serif font-bold text-base text-ink">Notion & Studio Delivery</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Pengiriman link Notion Database dan akses Teleprompter interaktif.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bento-pop rounded-3xl bg-canvas overflow-hidden p-0">
            <div className="trio-grid">
              <div className="trio-cell flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
                  <Clock className="w-5 h-5 text-ink" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-ink">Garansi Tepat Waktu 24 Jam</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">Jika pengiriman lewat 24 jam, dapatkan ekstra 5 naskah video gratis.</p>
                </div>
              </div>
              <div className="trio-cell flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
                  <RefreshCw className="w-5 h-5 text-ink" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-ink">Garansi Kalibrasi 48 Jam</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">Bebas revisi sudut pesan jika belum sesuai dengan karakter tokomu.</p>
                </div>
              </div>
              <div className="trio-cell flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-terracottaLight border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
                  <CheckCircle2 className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-ink">Naskah Kata-per-Kata</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">Bukan poin kasar. Naskah siap dibaca langsung di teleprompter HP.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Pertanyaan Umum Member</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <details className="faq-item border-b-2 border-ink last:border-b-0">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 cursor-pointer list-none font-mono text-xs font-bold text-ink hover:bg-canvas transition">
                  <span>Kalau naskahnya nggak cocok sama tone toko saya?</span>
                  <ChevronDown className="faq-chev w-4 h-4 shrink-0 transition-transform" />
                </summary>
                <div className="px-5 sm:px-7 pb-5 -mt-1 text-xs text-stone-600 font-sans leading-relaxed max-w-3xl">
                  Tenang, ada garansi kalibrasi 48 jam. Tim copywriter merevisi sudut pesan gratis sampai nadanya pas dengan karakter brand kamu. Bukan revisi token, tapi paham sudut.
                </div>
              </details>
              <details className="faq-item border-b-2 border-ink last:border-b-0">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 cursor-pointer list-none font-mono text-xs font-bold text-ink hover:bg-canvas transition">
                  <span>Kapan batch mulai diproduksi setelah saya kirim brief?</span>
                  <ChevronDown className="faq-chev w-4 h-4 shrink-0 transition-transform" />
                </summary>
                <div className="px-5 sm:px-7 pb-5 -mt-1 text-xs text-stone-600 font-sans leading-relaxed max-w-3xl">
                  Begitu brief masuk, timer 24 jam langsung berjalan. Pengiriman via email dan WhatsApp: link Notion Content OS siap duplicate + akses teleprompter Customer Hub.
                </div>
              </details>
              <details className="faq-item border-b-2 border-ink last:border-b-0">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 cursor-pointer list-none font-mono text-xs font-bold text-ink hover:bg-canvas transition">
                  <span>Saya cuma punya HP. Bisa bikin kontennya?</span>
                  <ChevronDown className="faq-chev w-4 h-4 shrink-0 transition-transform" />
                </summary>
                <div className="px-5 sm:px-7 pb-5 -mt-1 text-xs text-stone-600 font-sans leading-relaxed max-w-3xl">
                  Bisa, malah itu skenario utama kami. Semua naskah ditulis untuk direkam pakai kamera HP, dibaca langsung dari teleprompter di Customer Hub, dengan panduan rekam di Panel 04.
                </div>
              </details>
              <details className="faq-item">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 cursor-pointer list-none font-mono text-xs font-bold text-ink hover:bg-canvas transition">
                  <span>Bisa pesan batch lagi bulan depan?</span>
                  <ChevronDown className="faq-chev w-4 h-4 shrink-0 transition-transform" />
                </summary>
                <div className="px-5 sm:px-7 pb-5 -mt-1 text-xs text-stone-600 font-sans leading-relaxed max-w-3xl">
                  Bisa. Batch bersifat bulanan, dan karena Brand Vault menyimpan parameter tokomu, brief batch berikutnya tinggal 1 menit; tim kami juga menyiapkan sudut baru tiap bulan biar nggak monoton.
                </div>
              </details>
            </div>
          </section>
        </section>

        {/* ============ PANEL 02: MICRO-TOOLS & ROI ============ */}
        <section id="view-tools" role="tabpanel" aria-labelledby="tab-nav-tools" className={`space-y-6 sm:space-y-8 ${activeTab !== "tools" ? "hidden" : ""}`}>
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm shrink-0">02</span>
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Micro-Tools & Kalkulator</h2>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Bench instrumen member: generator, kalkulator, dan audit kesiapan.</p>
            </div>
          </header>

          <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-5 bg-white">
            <div className="max-w-2xl space-y-1.5">
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Generator Hook Video Viral Instan</h3>
              <p className="text-xs sm:text-sm text-stone-600">Ketik nama bisnismu dan lihat bagaimana formula psikologi Karsa menyusun pembuka video dalam hitungan detik.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
              <div className="md:col-span-1 space-y-3.5 bg-canvas p-5 rounded-2xl border-2 border-ink">
                <div>
                  <label htmlFor="toolBrand" className="block text-ink mb-1 font-bold">Nama Brand / Produk</label>
                  <input type="text" id="toolBrand" placeholder="Contoh: Kopi Teras" value={hookBrand} onChange={(e) => setHookBrand(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="toolCategory" className="block text-ink mb-1 font-bold">Kategori Bisnis</label>
                  <select id="toolCategory" value={hookCategory} onChange={(e) => setHookCategory(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]">
                    <option value="Kuliner / Minuman">Kuliner / Minuman</option>
                    <option value="Fashion & Aksesoris">Fashion & Aksesoris</option>
                    <option value="Skincare & Perawatan">Skincare & Perawatan</option>
                    <option value="Jasa / Layanan">Jasa / Layanan</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="toolProblem" className="block text-ink mb-1 font-bold">Masalah Terbesar Pembeli</label>
                  <input type="text" id="toolProblem" placeholder="Contoh: gampang kembung / mahal" value={hookProblem} onChange={(e) => setHookProblem(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <button type="button" onClick={generateDemoHooks} className="w-full py-3.5 bg-terracotta hover:bg-ink text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
                  <Wand2 className="w-4 h-4 text-wasabi" />
                  <span>Generate 3 Hook Video</span>
                </button>
              </div>

              <div className="md:col-span-2 space-y-3">
                {hookResults ?? (
                  <div className="h-full min-h-[220px] border-2 border-dashed border-ink rounded-2xl flex flex-col items-center justify-center p-6 text-center text-stone-500 space-y-2 bg-canvas">
                    <Sparkles className="w-8 h-8 text-stone-400" />
                    <p className="text-xs font-mono font-bold text-stone-600">Isi parameter di samping lalu tekan tombol Generate.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-5 bg-white">
            <div className="max-w-2xl space-y-1.5">
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Generator Ide Kalender 30 Hari</h3>
              <p className="text-xs sm:text-sm text-stone-600">Lihat bagaimana 4 pilar Karsa disusun untuk brand-mu: pratinjau 12 dari 30 ide naskah yang akan kamu terima.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
              <div className="md:col-span-1 space-y-3.5 bg-canvas p-5 rounded-2xl border-2 border-ink">
                <div>
                  <label htmlFor="ideBrand" className="block text-ink mb-1 font-bold">Nama Brand / Produk</label>
                  <input type="text" id="ideBrand" placeholder="Contoh: Kopi Teras" value={ideBrand} onChange={(e) => setIdeBrand(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="ideProblem" className="block text-ink mb-1 font-bold">Masalah Utama Pembeli</label>
                  <input type="text" id="ideProblem" placeholder="Contoh: ngantuk saat kerja" value={ideProblem} onChange={(e) => setIdeProblem(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <button type="button" onClick={generateIdeaCalendar} className="w-full py-3.5 bg-ink hover:bg-terracotta text-canvas rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
                  <CalendarDays className="w-4 h-4 text-wasabi" />
                  <span>Generate 12 Ide Naskah</span>
                </button>
                <p className="text-[10px] text-stone-600 font-sans text-center">Simulasi gratis; output lengkap 30 hari ada di dalam batch.</p>
              </div>

              <div className="md:col-span-2 space-y-3">
                {ideResults ?? (
                  <div className="h-full min-h-[220px] border-2 border-dashed border-ink rounded-2xl flex flex-col items-center justify-center p-6 text-center text-stone-500 space-y-2 bg-canvas">
                    <CalendarDays className="w-8 h-8 text-stone-400" />
                    <p className="text-xs font-mono font-bold text-stone-600">Isi nama brand lalu tekan Generate untuk melihat peta 30 harimu.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-5 bg-canvas">
            <div className="max-w-2xl space-y-1.5">
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Generator Takarir AIDA</h3>
              <p className="text-xs sm:text-sm text-stone-600">Rasakan kualitas takarir Karsa: Attention, Interest, Desire, Action — dibuat dari parameter brand-mu dalam hitungan detik.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
              <div className="md:col-span-1 space-y-3.5 bg-surface p-5 rounded-2xl border-2 border-ink">
                <div>
                  <label htmlFor="capBrand" className="block text-ink mb-1 font-bold">Nama Brand / Produk</label>
                  <input type="text" id="capBrand" placeholder="Contoh: Glow Skincare" value={capBrand} onChange={(e) => setCapBrand(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="capProduct" className="block text-ink mb-1 font-bold">Produk Unggulan</label>
                  <input type="text" id="capProduct" placeholder="Contoh: Serum niacinamide 10%" value={capProduct} onChange={(e) => setCapProduct(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="capOffer" className="block text-ink mb-1 font-bold">Penawaran / CTA</label>
                  <input type="text" id="capOffer" placeholder="Contoh: Diskon 15% minggu ini" value={capOffer} onChange={(e) => setCapOffer(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <button type="button" onClick={generateAidaCaption} className="w-full py-3.5 bg-terracotta hover:bg-ink text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
                  <MessageSquare className="w-4 h-4 text-wasabi" />
                  <span>Generate Takarir AIDA</span>
                </button>
              </div>

              <div className="md:col-span-2 space-y-3">
                {capResults ?? (
                  <div className="h-full min-h-[220px] border-2 border-dashed border-ink rounded-2xl flex flex-col items-center justify-center p-6 text-center text-stone-500 space-y-2 bg-white">
                    <MessageSquare className="w-8 h-8 text-stone-400" />
                    <p className="text-xs font-mono font-bold text-stone-600">Isi parameter di samping lalu tekan Generate untuk lihat takarir siap salin.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section id="calculator-section" className="bento-pop p-5 sm:p-8 rounded-3xl space-y-5 bg-canvas">
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Berapa Banyak Waktu & Uang yang Kamu Hemat?</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-mono text-xs">
              <div className="space-y-4 bg-surface p-5 rounded-2xl border-2 border-ink shadow-brutal-sm">
                <div>
                  <div className="flex justify-between font-bold text-ink mb-2">
                    <label htmlFor="sliderHours">Jam Merancang Konten / Minggu:</label>
                    <span className="text-terracotta text-sm">{roiHours} Jam</span>
                  </div>
                  <input type="range" id="sliderHours" min={2} max={15} value={roiHours} step={1} onChange={(e) => setRoiHours(Number(e.target.value))} className="w-full py-2" />
                </div>
                <div>
                  <div className="flex justify-between font-bold text-ink mb-2">
                    <label htmlFor="sliderAgency">Biaya Hire Agensi Bulanan:</label>
                    <span className="text-terracotta text-sm">Rp {roiAgency.toLocaleString("id-ID")}</span>
                  </div>
                  <input type="range" id="sliderAgency" min={1500000} max={8000000} value={roiAgency} step={250000} onChange={(e) => setRoiAgency(Number(e.target.value))} className="w-full py-2" />
                </div>
              </div>

              <div className="bg-wasabi/30 border-2 border-ink rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2.5 border-b-2 border-ink">
                    <span className="text-stone-700 font-bold">Total Waktu Dihemat:</span>
                    <span className="text-base font-bold text-ink font-serif">{roiSavedHours} Jam / Bulan</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b-2 border-ink">
                    <span className="text-stone-700 font-bold">Biaya Karsa Studio:</span>
                    <span className="text-base font-bold text-ink font-serif">Rp 299.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-700 font-bold">Penghematan Finansial:</span>
                    <span className="text-xl sm:text-2xl font-bold text-terracotta font-serif">Rp {roiNetSavings.toLocaleString("id-ID")} / Bulan</span>
                  </div>
                </div>

                <button onClick={() => setModalOpen(true)} className="w-full py-3.5 bg-ink hover:bg-terracotta hover:text-white text-canvas rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
                  <Check className="w-4 h-4 text-wasabi" />
                  <span>Klaim Penghematan & Order Batch</span>
                </button>
              </div>
            </div>
          </section>

          <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-4 bg-white">
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink">Audit Kesiapan Konten Brand</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 font-mono text-xs">
              <div className="bg-canvas p-4 rounded-2xl border-2 border-ink space-y-2">
                <label htmlFor="auditQ1" className="font-bold text-ink block">1. Konsistensi Posting</label>
                <select id="auditQ1" value={auditQ1} onChange={(e) => setAuditQ1(Number(e.target.value))} className="w-full bg-white border-2 border-ink rounded-xl p-2.5 text-xs text-ink font-bold min-h-[44px]">
                  <option value="10">Jarang (&lt; 2 video/minggu)</option>
                  <option value="25">Kadang-kadang (3-4 video/minggu)</option>
                  <option value="40">Setiap hari konsisten</option>
                </select>
              </div>
              <div className="bg-canvas p-4 rounded-2xl border-2 border-ink space-y-2">
                <label htmlFor="auditQ2" className="font-bold text-ink block">2. Struktur Naskah Video</label>
                <select id="auditQ2" value={auditQ2} onChange={(e) => setAuditQ2(Number(e.target.value))} className="w-full bg-white border-2 border-ink rounded-xl p-2.5 text-xs text-ink font-bold min-h-[44px]">
                  <option value="10">Spontan / Tanpa naskah</option>
                  <option value="25">Poin garis besar saja</option>
                  <option value="40">Naskah kata-per-kata & CTA</option>
                </select>
              </div>
              <div className="bg-canvas p-4 rounded-2xl border-2 border-ink space-y-2">
                <label htmlFor="auditQ3" className="font-bold text-ink block">3. Pemahaman Target</label>
                <select id="auditQ3" value={auditQ3} onChange={(e) => setAuditQ3(Number(e.target.value))} className="w-full bg-white border-2 border-ink rounded-xl p-2.5 text-xs text-ink font-bold min-h-[44px]">
                  <option value="10">Masih umum / Semua orang</option>
                  <option value="20">Paham usia & demografi</option>
                  <option value="20">Paham pain-point emosional</option>
                </select>
              </div>
            </div>

            <div className="p-5 bg-wasabi/30 border-2 border-ink rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-xl bg-ink text-canvas flex items-center justify-center font-bold text-lg font-serif shrink-0 border-2 border-ink">
                  {auditTotal}%
                </div>
                <div>
                  <span className="font-bold text-ink block text-sm">{auditTotal < 60 ? "Status: Perlu Sistematisasi Naskah" : "Status: Siap Skalasi Produksi Batch"}</span>
                  <span className="text-stone-600 text-xs block">{auditTotal < 60 ? "Kalender Karsa 30 hari akan menyusun inventaris kontenmu agar konsisten tanpa mikir ide dari nol." : "Tokomu punya pondasi bagus, batch Karsa akan mempercepat pembuatan naskah video jadi 1 hari."}</span>
                </div>
              </div>
              <button onClick={() => setModalOpen(true)} className="w-full sm:w-auto px-5 py-3.5 bg-terracotta text-white rounded-xl active:bg-ink hover:bg-ink transition font-bold min-h-[44px] flex items-center justify-center gap-2 shadow-brutal font-mono">
                Tingkatkan Skor Sekarang
                <ArrowRight className="w-4 h-4 text-wasabi" />
              </button>
            </div>
          </section>
        </section>

        {/* ============ PANEL 03: DELIVERABLES & DEMO ============ */}
        <section id="view-demo" role="tabpanel" aria-labelledby="tab-nav-demo" className={`space-y-6 sm:space-y-8 ${activeTab !== "demo" ? "hidden" : ""}`}>
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm shrink-0">03</span>
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Deliverables & Studio Demo</h2>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Spesimen mutu: semua yang siap digunakan dalam 24 jam.</p>
            </div>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Semua yang Siap Digunakan dalam 24 Jam</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">30 Naskah Video Pendek</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Format kata-per-kata: Visual Hook (0-3s), Problem Framing, Solution, dan CTA.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">30 Takarir AIDA & 15 Tagar</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Copywriting Attention, Interest, Desire, Action siap salin ke Instagram & Threads.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-canvas border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">4 Artikel SEO Website</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Artikel 1.000 kata lengkap dengan susunan heading H1/H2/H3 dan meta deskripsi.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-terracottaLight border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Radar className="w-4 h-4 text-terracotta" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Audit Celah Kompetitor</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Pembedahan 1 akun kompetitor untuk menemukan sudut pesan yang belum tergarap.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Notion Content OS</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Database Notion dengan Calendar Matrix View siap 1-click duplicate.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Panduan Shot-List B-Roll</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Panduan sudut kamera dan pencahayaan yang mudah direkam pakai kamera HP.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Tampilan Naskah & Takarir Karsa</h3>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" role="tablist" aria-label="Contoh deliverables">
                <button role="tab" aria-selected={activeDemoTab === "script"} aria-controls="dview-script" onClick={() => switchDemoTab("script")} id="dtab-script" className={sampleTabClass("script")}>Naskah Video</button>
                <button role="tab" aria-selected={activeDemoTab === "caption"} aria-controls="dview-caption" onClick={() => switchDemoTab("caption")} id="dtab-caption" className={sampleTabClass("caption")}>Takarir AIDA</button>
                <button role="tab" aria-selected={activeDemoTab === "seo"} aria-controls="dview-seo" onClick={() => switchDemoTab("seo")} id="dtab-seo" className={sampleTabClass("seo")}>Artikel SEO</button>
              </div>
            </div>

            <div className="bento-pop p-5 sm:p-8 rounded-3xl font-mono text-xs space-y-4 bg-white">
              <div id="dview-script" role="tabpanel" aria-labelledby="dtab-script" className={`space-y-4 ${activeDemoTab !== "script" ? "hidden" : ""}`}>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" role="tablist" aria-label="Pilih contoh hari">
                  {DEMO_DAYS.map((d) => (
                    <button key={d} role="tab" aria-selected={activeDemoDay === d} aria-controls={`dview-day-${d}`} onClick={() => switchDemoDay(d)} id={`dday-${d}`} className={dayTabClass(d)}>
                      {d === "01" && "Day 01 · Edukasi"}
                      {d === "04" && "Day 04 · Edukasi"}
                      {d === "09" && "Day 09 · Bukti Sosial"}
                      {d === "21" && "Day 21 · Hiburan"}
                      {d === "26" && "Day 26 · Jualan"}
                    </button>
                  ))}
                </div>

                <div id="dview-day-01" role="tabpanel" aria-labelledby="dday-01" className={`space-y-4 ${activeDemoDay !== "01" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sunflower text-ink">Pilar: Edukasi Solusi</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 01 — Kesalahan Nomor 1 Pemilik Toko Online</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">20-25s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent menunjuk ke arah kamera dengan tumpukan HP di meja: <em>"Kesalahan nomor 1 yang bikin tokomu sepi padahal produknya bagus banget..."</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY</strong>
                      <p>Potong ke layar: <em>"Bukan produknya — tapi caramu ngomong. Kebanyakan toko jual fitur, padahal pembeli cuma peduli masalah mereka keselesaikan."</em> Lalu satu contoh: <em>"Kamu jualan serum, tapi yang mereka beli itu 'pagi tanpa muka kusam'."</em></p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] CALL TO ACTION</strong>
                      <p><em>"Follow dulu — besok gue bongkar rumus naskah yang ngejual tanpa jualan."</em></p>
                    </div>
                  </div>
                </div>

                <div id="dview-day-04" role="tabpanel" aria-labelledby="dday-04" className={`space-y-4 ${activeDemoDay !== "04" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sunflower text-ink">Pilar: Edukasi Solusi</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 04 — Mengapa Produk Konvensional Membebani Pengguna</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">20-25s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent menunjukkan tumpukan catatan manual berantakan: <em>"Kenapa masih buang waktu 2 jam tiap malam cuma buat mikirin ide konten besok?"</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY</strong>
                      <p>Tunjukkan kalender 30 hari Karsa: <em>"Di Karsa, kamu dapet 30 naskah per detik, takarir AIDA, dan panduan rekam HP langsung dalam 24 jam."</em></p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] CALL TO ACTION</strong>
                      <p><em>"Cek link di bio kami sekarang buat amankan batch tokomu sebelum kuota minggu ini ditutup!"</em></p>
                    </div>
                  </div>
                </div>

                <div id="dview-day-09" role="tabpanel" aria-labelledby="dday-09" className={`space-y-4 ${activeDemoDay !== "09" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-canvas text-ink">Pilar: Bukti Sosial & Kredibilitas</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 09 — Apa Kata Pembeli Pertama Kami</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">20-25s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent memegang 3 tangkapan layar chat pembeli: <em>"3 pembeli pertama kami bilang hal yang sama — dan itu bikin kami deg-degan."</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY</strong>
                      <p>Zoom ke chat: <em>"'Awalnya ragu karena murah, ternyata hasilnya di luar ekspektasi.'"</em> Lanjut proses produksi: <em>"Di balik tiap batch, ada audit kompetitor dan QC copywriter — bukan naskah instan generik."</em></p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] CALL TO ACTION</strong>
                      <p><em>"Tanya apa pun soal batch kami di kolom komentar — dijawab langsung sama tim, bukan bot."</em></p>
                    </div>
                  </div>
                </div>

                <div id="dview-day-21" role="tabpanel" aria-labelledby="dday-21" className={`space-y-4 ${activeDemoDay !== "21" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sunflower text-ink">Pilar: Hiburan Ringan</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 21 — POV: Kamu Baru Tahu Fungsi Ini</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">15-20s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent memasang ekspresi terkejut sambil menunjuk produk: <em>"POV: kamu baru tahu fungsi ini setelah 3 bulan beli."</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:15] VALUE DELIVERY</strong>
                      <p>Demonstrasi cepat dengan gestur lucu: <em>"Ternyata begini cara pakainya — dan sekarang aku paham kenapa orang repeat order."</em> Satu fakta ringan soal produk diselipkan tanpa terasa jualan.</p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:15 - 00:20] CALL TO ACTION</strong>
                      <p><em>"Simpan video ini biar nggak lupa pas butuh."</em></p>
                    </div>
                  </div>
                </div>

                <div id="dview-day-26" role="tabpanel" aria-labelledby="dday-26" className={`space-y-4 ${activeDemoDay !== "26" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-wasabi text-ink">Pilar: Jualan & CTA</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 26 — Amankan Batch Sebelum Kuota Tutup</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">20-25s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent menunjukkan kalender dengan 3 slot tersisa: <em>"Sisa 3 slot batch minggu ini — dan selalu abis duluan di hari Jumat."</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY</strong>
                      <p>Bongkar isi batch sambil pegang barang: <em>"30 naskah, 30 takarir, 4 artikel SEO, semua jadi dalam 24 jam. Kalau nggak cocok? Revisi sudut 48 jam gratis."</em></p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] CALL TO ACTION</strong>
                      <p><em>"Klik link di bio, isi brief 5 menit, konten 30 harimu mulai diproduksi hari ini."</em></p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="dview-caption" role="tabpanel" aria-labelledby="dtab-caption" className={`space-y-3 ${activeDemoTab !== "caption" ? "hidden" : ""}`}>
                <div className="pb-3 border-b-2 border-ink font-serif font-bold text-base text-ink">
                  Takarir Instagram & Threads — Formula AIDA
                </div>
                <div className="p-4 bg-canvas border-2 border-ink rounded-2xl font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                  {`Bukan produk Anda yang sepi peminat, cara penyampaian pesannya yang belum menyentuh masalah utama audiens. 👇

Saat Anda menjual fitur, orang bosan. Saat Anda menjual penghematan waktu dan kejelasan solusi, mereka langsung checkout.

Di Karsa Studio, kami menyusun 30 hari kalender konten berdasarkan audit celah kompetitor dan psikologi audiens spesifik Anda.

📌 Simpan postingan ini untuk referensi menyusun naskah minggu depan!
#karsastudio #kontenmarketing #umkmindonesia #strategibisnis`}
                </div>
                <div className="p-4 bg-white border-2 border-ink rounded-2xl font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                  {`Kulit kusam itu bukan karena kamu malas skincare-an — tapi karena rutinitas pagimu melewatkan satu langkah kecil. 👇

Kebanyakan orang pakai serum tanpa menyiapkan skin barrier-nya dulu. Hasilnya? Bahan aktif nggak terserap optimal, dan kamu menuduh produknya nggak ngefek.

Makanya Glow Skincare meracik serum dengan [bahan aktif] yang diformulasikan khusus untuk pemula — aman dipakai setiap hari tanpa iritasi.

✨ Minggu ini ada penawaran khusus: beli 2 serum gratis [bonus produk]. Kuota terbatas 50 paket.

📌 Klik link di bio sebelum promo berakhir!
#skincareroutine #glowingskin #skincareindonesia #beautytips`}
                </div>
              </div>

              <div id="dview-seo" role="tabpanel" aria-labelledby="dtab-seo" className={`space-y-3 ${activeDemoTab !== "seo" ? "hidden" : ""}`}>
                <div className="pb-3 border-b-2 border-ink font-serif font-bold text-base text-ink">
                  Kerangka Artikel SEO (1.000 Kata Siap Rank Google)
                </div>
                <div className="p-4 bg-canvas border-2 border-ink rounded-2xl font-mono text-xs space-y-2 text-stone-800">
                  <div className="font-bold text-ink text-sm sm:text-base">H1: Panduan Lengkap Memilih Strategi Konten untuk UMKM 2026</div>
                  <div className="text-xs text-stone-500">Volume Pencarian: 3.200/bln | Intent: Komersial & Solutif | Target: 1.000 kata</div>
                  <div className="p-3 bg-sunflower/20 border-2 border-ink rounded-xl text-xs text-stone-700 font-sans">
                    <strong className="text-ink font-mono block mb-1 text-[10px]">META DESCRIPTION (155 Karakter)</strong>
                    Bingung pilih strategi konten untuk UMKM? Ini 3 kesalahan fatal, perbandingan agensi vs kalender productized, dan cara rekam video profesional modal HP.
                  </div>
                  <div className="pl-4 space-y-1 text-stone-700 font-sans text-xs sm:text-sm mt-3">
                    <p><strong>H2: 3 Kesalahan Fatal yang Sering Dilakukan Pemilik Bisnis Baru</strong></p>
                    <p className="pl-4 text-stone-600">H3: Jual fitur, bukan solusi — cara membalik sudut pesan</p>
                    <p className="pl-4 text-stone-600">H3: Posting tanpa struktur: kenapa kalender 4 pilar mengalahkan posting acak</p>
                    <p><strong>H2: Perbandingan Efisiensi: Agensi Bulanan vs Kalender Productized</strong></p>
                    <p className="pl-4 text-stone-600">H3: Biaya riil agensi untuk UMKM + waktu tunggu revisi</p>
                    <p className="pl-4 text-stone-600">H3: Model 30 hari fixed-price: apa yang kamu terima di hari ke-1</p>
                    <p><strong>H2: Cara Merekam Video Profesional Hanya Bermodalkan Kamera Ponsel</strong></p>
                    <p className="pl-4 text-stone-600">H3: Pencahayaan window light tanpa beli lampu studio</p>
                    <p className="pl-4 text-stone-600">H3: Teleprompter HP: baca naskah tanpa terlihat membaca</p>
                    <p className="pt-1 text-terracotta font-bold font-mono text-[10px] uppercase tracking-wide">Bonus: FAQ Schema + internal link ke halaman order</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Pratinjau Sistem yang Kamu Terima</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-white space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-ink leading-tight">Notion Content OS</h4>
                      <p className="text-[10px] font-mono text-stone-600 font-bold">Calendar Matrix View — siap 1-click duplicate</p>
                    </div>
                  </div>
                  <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-canvas text-ink shrink-0">Demo</span>
                </div>

                <div className="border-2 border-ink rounded-2xl bg-canvas p-3 sm:p-4 space-y-2.5">
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-bold text-stone-600">
                    <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {NOTION_PILLAR_CLASSES.map((cls, i) => (
                      <span key={i} className={`h-6 sm:h-7 flex items-center justify-center rounded-md border border-ink text-[10px] font-bold ${cls}`}>{i + 1}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1.5 font-mono text-[10px] font-bold text-stone-600">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-sunflower border border-ink"></span>Edukasi</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-white border border-ink"></span>Bukti</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-sunflower/40 border border-ink"></span>Hiburan</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-wasabi border border-ink"></span>Jualan</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">Setiap sel berisi naskah + takarir + shot-list lengkap. Klik hari, salin, rekam. Semua status produksi terpantau dari sini.</p>
              </div>

              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-canvas space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                      <MonitorPlay className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-ink leading-tight">Teleprompter Customer Hub</h4>
                      <p className="text-[10px] font-mono text-stone-600 font-bold">Baca naskah sambil rekam, tanpa terlihat membaca</p>
                    </div>
                  </div>
                  <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-canvas text-ink shrink-0">Demo</span>
                </div>

                <div className="flex justify-center pt-1">
                  <div className="w-full max-w-[280px] bg-ink border-2 border-ink rounded-[2rem] p-2.5 shadow-brutal">
                    <div className="bg-ink rounded-[1.6rem] border border-stone-700 px-5 py-7 space-y-5">
                      <div className="flex items-center justify-between font-mono text-[10px] text-stone-400 font-bold">
                        <span>DAY 04 · 20-25s</span>
                        <span className="text-wasabi">1.0x</span>
                      </div>
                      <div className="space-y-3 text-center">
                        <p className="text-canvas text-base sm:text-lg leading-relaxed font-medium">"Kenapa masih buang waktu <span className="text-wasabi">2 jam tiap malam</span> cuma buat mikirin ide konten besok?"</p>
                        <p className="text-stone-400 text-xs leading-relaxed">Tunjukkan kalender 30 hari Karsa: <em>"Di Karsa, kamu dapet 30 naskah per detik dalam 24 jam."</em></p>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 pt-1">
                        <span className="pipe-dot on"></span><span className="pipe-dot on"></span><span className="pipe-dot on"></span><span className="pipe-dot"></span>
                      </div>
                      <div className="text-center font-mono text-[10px] text-stone-500 font-bold">Gulir otomatis menyesuaikan kecepatan bacamu</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">Mode gulir otomatis dengan kontrol kecepatan, besaran teks, dan pencahayaan — dirancang buat direkam pakai HP di depan jendela.</p>
              </div>
            </div>
          </section>
        </section>

        {/* ============ PANEL 04: PANDUAN REKAM & FORMULA ============ */}
        <section id="view-resources" role="tabpanel" aria-labelledby="tab-nav-resources" className={`space-y-6 sm:space-y-8 ${activeTab !== "resources" ? "hidden" : ""}`}>
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-terracottaLight border-2 border-ink flex items-center justify-center font-mono font-bold text-sm text-ink shadow-brutal-sm shrink-0">04</span>
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Panduan Rekam & Formula</h2>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Field manual member — rekam pakai HP, hook penahan scroll.</p>
            </div>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Panduan Rekam Video Modal Kamera HP</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Sun className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Pencahayaan Alami (Window Light)</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Duduk menghadap jendela besar 45 derajat. Hindari backlight agar wajah jernih tanpa perlu beli lampu studio mahal.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Frame className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Eye-Level Framing</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Posisikan lensa HP setinggi mata (gunakan tripod meja). Sisakan sedikit ruang di atas kepala (*headroom*).</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-terracottaLight border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Mic className="w-4 h-4 text-terracotta" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Audio Jernih & Teleprompter</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Gunakan mic lavalier clip-on murah dan letakkan HP sejajar layar laptop untuk membaca teks Karsa di Customer Hub.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Image className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Ruang & Backdrop Berlapis</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Latar bersih dengan jarak 1—2 meter dari dinding. Satu objek brand (packaging, logo) di frame sudah cukup — jangan penuh barang.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Hand className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Gestur & Ekspresi</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Angkat produk saat menyebut namanya, tunjuk ke arah teks saat poin penting. Ekspresi dibuat 20% lebih besar dari yang terasa wajar.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-8 h-8 rounded-lg bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Clapperboard className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Take Cadangan & B-Roll</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Rekam 2—3 take per naskah dan 5 detik b-roll produk di sela adegan — bahan cadangan cut yang bikin video terasa profesional.</p>
              </div>
            </div>
          </section>

          <section className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
            <div className="readout-grid font-mono text-xs">
              <div className="readout-cell space-y-2">
                <div className="flex items-center gap-2">
                  <Clapperboard className="w-4 h-4 text-terracotta" />
                  <span className="font-bold text-ink">Instagram Reels</span>
                </div>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">9:16 · 15—90 detik<br />Naskah dipotong hook 3 detik terkuat di frame pertama.</p>
              </div>
              <div className="readout-cell space-y-2">
                <div className="flex items-center gap-2">
                  <Music2 className="w-4 h-4 text-ink" />
                  <span className="font-bold text-ink">TikTok</span>
                </div>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">9:16 · 15—60 detik<br />Caption padat + 3 tagar relevan, teks hook besar di 2 detik awal.</p>
              </div>
              <div className="readout-cell space-y-2 bg-wasabi/30">
                <div className="flex items-center gap-2">
                  <PlaySquare className="w-4 h-4" />
                  <span className="font-bold text-ink">YouTube Shorts</span>
                </div>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">9:16 · maks 60 detik<br />Judul + deskripsi SEO sudah disiapkan tiap video.</p>
              </div>
              <div className="readout-cell space-y-2">
                <div className="flex items-center gap-2">
                  <AtSign className="w-4 h-4 text-terracotta" />
                  <span className="font-bold text-ink">Threads / X</span>
                </div>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Teks + gambar<br />Takarir AIDA dipisah jadi thread 3—4 bagian siap salin.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Waktu Posting Terbaik untuk UMKM</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="readout-grid font-mono text-xs">
                <div className="readout-cell space-y-1.5">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-sunflower text-ink font-bold text-[10px]">06.00 — 09.00</span>
                  <h4 className="font-serif font-bold text-base text-ink">Pagi · Edukasi</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Konten edukasi & tips — orang cari solusi sebelum mulai kerja.</p>
                </div>
                <div className="readout-cell space-y-1.5">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">11.00 — 13.00</span>
                  <h4 className="font-serif font-bold text-base text-ink">Siang · Hiburan</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Jam istirahat — konten ringan, meme, dan behind-the-scene.</p>
                </div>
                <div className="readout-cell space-y-1.5 bg-sunflower/20">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-sunflower text-ink font-bold text-[10px]">16.00 — 19.00</span>
                  <h4 className="font-serif font-bold text-base text-ink">Sore · Bukti Sosial</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Pulang kerja — testimoni, review, dan proses produksi paling dicari.</p>
                </div>
                <div className="readout-cell space-y-1.5 bg-wasabi/40">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-wasabi text-ink font-bold text-[10px]">19.00 — 22.00</span>
                  <h4 className="font-serif font-bold text-base text-ink">Malam · Jualan</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Jam keputusan beli tertinggi — tempatkan naskah CTA & promo di sini.</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-stone-600 font-sans">Kalender 30 hari Karsa sudah menyusun pilar konten sesuai jam posting ini — kamu tinggal rekam dan unggah.</p>
          </section>

          <section className="bento-pop p-6 sm:p-8 rounded-3xl space-y-4 font-mono text-xs bg-canvas">
            <h3 className="font-serif font-bold text-xl sm:text-3xl text-ink">Formula Hook Penahan Scroll 3 Detik</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 text-stone-800">
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-terracotta block font-bold text-xs">1. The Common Mistake (Pola Penyangkalan)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Berhenti lakukan [kebiasaan salah], ini alasan kenapa tokomu sepi..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-wasabiDark block font-bold text-xs">2. The Radical Contrast (Perbandingan Ekstrem)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Cara orang biasa vs cara brand 100 juta closing pembeli pertama..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-ink block font-bold text-xs">3. Specific Callout (Pemanggilan Niche)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Khusus buat kamu yang jualan [niche] tapi capek banting harga..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-terracotta block font-bold text-xs">4. The Secret Shortcut (Jalan Pintas Efisien)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Satu metode yang bikin aku hemat 20 jam kerja minggu ini..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-wasabiDark block font-bold text-xs">5. Before-After Transformation (Transformasi Nyata)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Dulu [kondisi buruk], sekarang [hasil] — perubahan dalam 30 hari..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-ink block font-bold text-xs">6. Number Stack (Tumpukan Langkah)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"3 langkah sederhana buat [hasil] tanpa [usaha besar]..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-terracotta block font-bold text-xs">7. Proof Challenge (Tantangan Bukti)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Buktikan sendiri dalam 7 hari — kalau nggak [hasil], [konsekuensi]..."</em></p>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1 shadow-brutal-sm">
                <strong className="text-wasabiDark block font-bold text-xs">8. Question Hook (Pertanyaan Menusuk)</strong>
                <p className="font-sans text-xs leading-relaxed"><em>"Pernah ngerasain [masalah] padahal udah coba segalanya?..."</em></p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Anatomi Takarir AIDA</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="space-y-0 divide-y-2 divide-ink">
                <div className="p-5 sm:p-6 flex items-start gap-4">
                  <span className="badge-tag px-2.5 py-1 rounded bg-sunflower text-ink font-mono text-[10px] font-bold shrink-0">A</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink">Attention — 1 kalimat pembuka yang menghentikan scroll</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">"Bukan produk Anda yang sepi peminat, cara penyampaian pesannya yang belum menyentuh masalah utama audiens."</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex items-start gap-4">
                  <span className="badge-tag px-2.5 py-1 rounded bg-canvas text-ink font-mono text-[10px] font-bold shrink-0">I</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink">Interest — jaga rasa penasaran dengan kontras</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">"Saat Anda menjual fitur, orang bosan. Saat Anda menjual penghematan waktu, mereka langsung checkout."</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex items-start gap-4">
                  <span className="badge-tag px-2.5 py-1 rounded bg-terracottaLight text-ink font-mono text-[10px] font-bold shrink-0">D</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink">Desire — bangun keinginan dengan bukti konkret</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">"Kami menyusun 30 hari kalender konten berdasarkan audit celah kompetitor dan psikologi audiens spesifik Anda."</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex items-start gap-4 bg-wasabi/40">
                  <span className="badge-tag px-2.5 py-1 rounded bg-wasabi text-ink font-mono text-[10px] font-bold shrink-0">A</span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink">Action — satu ajakan spesifik + tagar</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">"📌 Simpan postingan ini untuk referensi minggu depan! #karsastudio #kontenmarketing #umkmindonesia"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* ============ PANEL 05: AKUN & BRAND VAULT ============ */}
        <section id="view-profile" role="tabpanel" aria-labelledby="tab-nav-profile" className={`space-y-5 sm:space-y-6 ${activeTab !== "profile" ? "hidden" : ""}`}>
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm shrink-0">05</span>
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Akun & Brand Vault</h2>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Dossier member — identitas, kontak, dan parameter brand bawaan.</p>
            </div>
          </header>

          <form onSubmit={handleProfileSubmit} className="space-y-5 sm:space-y-6">
            <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-4 bg-white">
              <div>
                <h3 className="text-base sm:text-xl font-serif font-bold text-ink">Foto Profil & Identitas Visual</h3>
                <p className="text-xs text-stone-600 font-mono">Tampil di sudut navbar workspace dan kop invoice.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 pt-1">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-ink text-canvas border-4 border-ink flex items-center justify-center font-serif text-3xl font-bold overflow-hidden shadow-brutal">
                    {hasAvatar ? (
                      <img src={profile.avatarUrl} alt="Foto profil" className="w-full h-full object-cover" />
                    ) : (
                      <span>{avatarInitial}</span>
                    )}
                  </div>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-sunflower border-2 border-ink rounded-full text-ink shadow-brutal-sm active:bg-wasabi" title="Ganti Foto" aria-label="Ganti foto profil">
                    <Camera className="w-4 h-4" />
                  </button>
                  <input type="file" id="fileAvatarInput" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarUpload} />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2.5 bg-ink active:bg-terracotta text-canvas text-xs font-mono font-bold rounded-xl transition min-h-[44px] shadow-brutal-sm">
                      Unggah Foto
                    </button>
                    <button type="button" onClick={removeAvatar} className="px-4 py-2.5 border-2 border-ink bg-white active:bg-canvas text-ink text-xs font-mono font-bold rounded-xl transition min-h-[44px] shadow-brutal-sm">
                      Hapus Foto
                    </button>
                  </div>
                  <p className="text-xs text-stone-600 font-mono">Maksimal 2 MB (JPG/PNG/WEBP).</p>
                </div>
              </div>
            </section>

            <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-4 bg-white">
              <div>
                <h3 className="text-base sm:text-xl font-serif font-bold text-ink">Informasi Pribadi</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label htmlFor="inputFullName" className="block text-ink mb-1 uppercase font-bold">Nama Lengkap *</label>
                  <input type="text" id="inputFullName" required placeholder="Contoh: Alaric Diaz" value={inputFullName} onChange={(e) => setInputFullName(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="inputDisplayName" className="block text-ink mb-1 uppercase font-bold">Display Name *</label>
                  <input type="text" id="inputDisplayName" required placeholder="Contoh: Alaric" value={inputDisplayName} onChange={(e) => setInputDisplayName(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
              </div>
              <div>
                <label htmlFor="inputRoleBio" className="block font-mono text-ink text-xs uppercase mb-1 font-bold">Bio Singkat / Peran</label>
                <input type="text" id="inputRoleBio" placeholder="Contoh: Founder & Lead Brand Strategist" value={inputRoleBio} onChange={(e) => setInputRoleBio(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
              </div>
            </section>

            <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-4 bg-white">
              <div>
                <h3 className="text-base sm:text-xl font-serif font-bold text-ink">Kontak & Notifikasi Pengiriman</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label htmlFor="inputEmail" className="block text-ink mb-1 uppercase font-bold">Email Akun *</label>
                  <input type="email" id="inputEmail" required placeholder="nama@email.com" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="inputPhone" className="block text-ink mb-1 uppercase font-bold">Nomor WhatsApp *</label>
                  <input type="tel" id="inputPhone" required placeholder="081234567890" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
              </div>
            </section>

            <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-4 bg-white">
              <div>
                <h3 className="text-base sm:text-xl font-serif font-bold text-ink">Brand Vault (Parameter Bawaan)</h3>
                <p className="text-xs text-stone-600 font-mono">Otomatis terisi saat kamu membuka form order batch baru.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label htmlFor="inputDefaultBrand" className="block text-ink mb-1 uppercase font-bold">Nama Brand Utama</label>
                  <input type="text" id="inputDefaultBrand" placeholder="Contoh: Kopi Teras Senja" value={inputDefaultBrand} onChange={(e) => setInputDefaultBrand(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
                </div>
                <div>
                  <label htmlFor="inputDefaultCategory" className="block text-ink mb-1 uppercase font-bold">Kategori Industri</label>
                  <select id="inputDefaultCategory" value={inputDefaultCategory} onChange={(e) => setInputDefaultCategory(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px] font-bold">
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
                <label htmlFor="inputDefaultCompetitor" className="block font-mono text-ink text-xs uppercase mb-1 font-bold">1 Akun Kompetitor Acuan</label>
                <input type="text" id="inputDefaultCompetitor" placeholder="@namakompetitor" value={inputDefaultCompetitor} onChange={(e) => setInputDefaultCompetitor(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
              </div>
            </section>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className={`text-xs font-mono text-ink font-bold hidden text-center sm:text-left badge-tag bg-wasabi px-3 py-1.5 rounded-xl ${showSaveStatus ? "" : "hidden"}`}>
                Pengaturan profil & Brand Vault berhasil disimpan!
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end ml-auto">
                <button type="button" onClick={() => switchMainTab("workspace")} className="w-1/2 sm:w-auto px-5 py-3.5 border-2 border-ink rounded-2xl bg-white active:bg-canvas text-ink font-mono text-xs font-bold transition text-center min-h-[48px] shadow-brutal-sm">
                  Kembali
                </button>
                <button type="submit" className="w-1/2 sm:w-auto px-6 py-3.5 bg-terracotta active:bg-ink text-white rounded-2xl font-mono text-xs font-bold transition shadow-brutal min-h-[48px] flex items-center justify-center gap-2">
                  <Save className="w-4 h-4 text-wasabi" />
                  <span>Simpan Data</span>
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>

      {/* MOBILE BOTTOM CONSOLE BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-canvas/95 backdrop-blur-md border-t-2 border-ink" aria-label="Navigasi panel mobile">
        <div className="grid grid-cols-5 h-16 items-center px-1 font-mono text-[10px] font-bold">
          <button role="tab" aria-selected={activeTab === "workspace"} aria-controls="view-workspace" onClick={() => switchMainTab("workspace")} id="mob-nav-workspace" className={mobNavClass("workspace")}>
            <LayoutGrid className="w-4 h-4" />
            <span>Beranda</span>
          </button>
          <button role="tab" aria-selected={activeTab === "tools"} aria-controls="view-tools" onClick={() => switchMainTab("tools")} id="mob-nav-tools" className={mobNavClass("tools")}>
            <Cpu className="w-4 h-4" />
            <span>Alat</span>
          </button>
          <button role="tab" aria-selected={activeTab === "demo"} aria-controls="view-demo" onClick={() => switchMainTab("demo")} id="mob-nav-demo" className={mobNavClass("demo")}>
            <Sparkles className="w-4 h-4" />
            <span>Studio</span>
          </button>
          <button role="tab" aria-selected={activeTab === "resources"} aria-controls="view-resources" onClick={() => switchMainTab("resources")} id="mob-nav-resources" className={mobNavClass("resources")}>
            <BookOpen className="w-4 h-4" />
            <span>Panduan</span>
          </button>
          <button role="tab" aria-selected={activeTab === "profile"} aria-controls="view-profile" onClick={() => switchMainTab("profile")} id="mob-nav-profile" className={mobNavClass("profile")}>
            <User className="w-4 h-4" />
            <span>Akun</span>
          </button>
        </div>
      </nav>

      {/* MODAL: NEW BATCH ORDER BRIEF */}
      <div ref={modalRef} id="modalNewBatch" role="dialog" aria-modal="true" aria-labelledby="modalNewBatchTitle" className={`fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 ${modalOpen ? "" : "hidden"}`}>
        <div className="bg-white border-t-2 sm:border-2 border-ink rounded-t-3xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-brutal-lg font-sans text-xs max-h-[90vh] overflow-y-auto">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-3 sm:hidden" aria-hidden="true"></div>

          <div className="flex justify-between items-center pb-3 border-b-2 border-ink mb-4">
            <div>
              <span className="badge-tag px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-sunflower text-ink">SLA 24 Jam</span>
              <h3 id="modalNewBatchTitle" className="text-base sm:text-xl font-bold font-serif text-ink mt-1">Formulir Brief Kalender 30 Hari</h3>
            </div>
            <button onClick={() => setModalOpen(false)} className="text-stone-600 hover:text-ink p-1.5 min-w-[40px] min-h-[40px] flex items-center justify-center font-bold border-2 border-ink rounded-xl bg-canvas" aria-label="Tutup formulir"><X className="w-4 h-4" /></button>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-4 font-mono">
            <div>
              <label htmlFor="inBrand" className="block text-ink text-xs mb-1 font-bold">Nama Brand / Bisnis *</label>
              <input type="text" id="inBrand" required placeholder="Contoh: Kopi Teras Senja" value={inBrand} onChange={(e) => setInBrand(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="inCategory" className="block text-ink text-xs mb-1 font-bold">Kategori Industri *</label>
                <select id="inCategory" value={inCategory} onChange={(e) => setInCategory(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px] font-bold">
                  <option value="Kuliner / F&B">Kuliner / F&B</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                  <option value="Skincare & Beauty">Skincare & Beauty</option>
                  <option value="Jasa Profesional">Jasa Profesional</option>
                  <option value="Gadget / Elektronik">Gadget / Elektronik</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label htmlFor="inCompetitor" className="block text-ink text-xs mb-1 font-bold">1 Akun Kompetitor</label>
                <input type="text" id="inCompetitor" placeholder="@namakompetitor" value={inCompetitor} onChange={(e) => setInCompetitor(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
              </div>
            </div>

            <div>
              <label htmlFor="inDesc" className="block text-ink text-xs mb-1 font-bold">Deskripsi Produk & Target Pembeli *</label>
              <textarea id="inDesc" rows={3} required placeholder="Jelaskan produk unggulan, rentang harga, dan siapa pembeli utama Anda..." value={inDesc} onChange={(e) => setInDesc(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="inEmail" className="block text-ink text-xs mb-1 font-bold">Email Penerima File *</label>
                <input type="email" id="inEmail" required placeholder="nama@email.com" value={inEmail} onChange={(e) => setInEmail(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
              </div>
              <div>
                <label htmlFor="inPhone" className="block text-ink text-xs mb-1 font-bold">Nomor WhatsApp Aktif *</label>
                <input type="tel" id="inPhone" required placeholder="081234567890" value={inPhone} onChange={(e) => setInPhone(e.target.value)} className="w-full bg-canvas border-2 border-ink rounded-xl p-3 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
              </div>
            </div>

            <div className="pt-3 border-t-2 border-ink">
              <button type="submit" className="w-full py-4 bg-terracotta hover:bg-ink text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 text-xs sm:text-sm min-h-[48px] shadow-brutal font-mono">
                <span>Kirim Brief & Buat Tagihan (Rp299.000)</span>
                <ArrowRight className="w-4 h-4 text-wasabi" />
              </button>
              <p className="text-center text-[10px] text-stone-600 mt-2 font-mono font-bold">Garansi kalibrasi penyesuaian sudut pesan 48 jam gratis.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}