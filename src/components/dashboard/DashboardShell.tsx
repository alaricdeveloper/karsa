"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Cpu, LayoutGrid, LogOut, Plus, Sparkles, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  DEFAULT_PROFILE,
  loadProfileFromStorage,
  fetchOrdersFromSupabase,
  PANELS,
  PANEL_ACCENTS,
  type MainTab,
  type DemoTab,
  type DemoDay,
  type Profile,
  type Order,
} from "./dashboard-lib";
import { WorkspaceTab } from "./WorkspaceTab";
import { MicroToolsTab } from "./MicroToolsTab";
import { DemoStudioTab } from "./DemoStudioTab";
import { ResourcesTab } from "./ResourcesTab";
import { ProfileVaultTab } from "./ProfileVaultTab";
import { NewOrderModal } from "./NewOrderModal";

export function DashboardShell() {
  const router = useRouter();
  const loadedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingAvatarRef = useRef<string>("");

  const [activeTab, setActiveTab] = useState<MainTab>("workspace");
  const [activeDemoTab, setActiveDemoTab] = useState<DemoTab>("script");
  const [activeDemoDay, setActiveDemoDay] = useState<DemoDay>("01");
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showSaveStatus, setShowSaveStatus] = useState(false);

  // Profile form inputs
  const [inputFullName, setInputFullName] = useState(DEFAULT_PROFILE.fullName);
  const [inputDisplayName, setInputDisplayName] = useState(DEFAULT_PROFILE.displayName);
  const [inputRoleBio, setInputRoleBio] = useState(DEFAULT_PROFILE.roleBio);
  const [inputEmail, setInputEmail] = useState(DEFAULT_PROFILE.email);
  const [inputPhone, setInputPhone] = useState(DEFAULT_PROFILE.phone);
  const [inputDefaultBrand, setInputDefaultBrand] = useState(DEFAULT_PROFILE.defaultBrand);
  const [inputDefaultCategory, setInputDefaultCategory] = useState(DEFAULT_PROFILE.defaultCategory);
  const [inputDefaultCompetitor, setInputDefaultCompetitor] = useState(DEFAULT_PROFILE.defaultCompetitor);

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
  }, [router]);

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
  const hasAvatar = Boolean(profile.avatarUrl && profile.avatarUrl.trim() !== "");

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
    localStorage.setItem("karsa_user_profile", JSON.stringify(updated));
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
        <div className={activeTab !== "workspace" ? "hidden" : ""}>
          <WorkspaceTab
            orders={orders}
            profile={profile}
            onOpenNewOrder={() => setModalOpen(true)}
            onGoToTools={() => switchMainTab("tools")}
          />
        </div>
        <div className={activeTab !== "tools" ? "hidden" : ""}>
          <MicroToolsTab onOpenNewOrder={() => setModalOpen(true)} />
        </div>
        <div className={activeTab !== "demo" ? "hidden" : ""}>
          <DemoStudioTab
            activeDemoTab={activeDemoTab}
            activeDemoDay={activeDemoDay}
            onSwitchDemoTab={switchDemoTab}
            onSwitchDemoDay={switchDemoDay}
          />
        </div>
        <div className={activeTab !== "resources" ? "hidden" : ""}>
          <ResourcesTab />
        </div>
        <div className={activeTab !== "profile" ? "hidden" : ""}>
          <ProfileVaultTab
            profile={profile}
            hasAvatar={hasAvatar}
            avatarInitial={avatarInitial}
            showSaveStatus={showSaveStatus}
            fileInputRef={fileInputRef}
            inputFullName={inputFullName}
            setInputFullName={setInputFullName}
            inputDisplayName={inputDisplayName}
            setInputDisplayName={setInputDisplayName}
            inputRoleBio={inputRoleBio}
            setInputRoleBio={setInputRoleBio}
            inputEmail={inputEmail}
            setInputEmail={setInputEmail}
            inputPhone={inputPhone}
            setInputPhone={setInputPhone}
            inputDefaultBrand={inputDefaultBrand}
            setInputDefaultBrand={setInputDefaultBrand}
            inputDefaultCategory={inputDefaultCategory}
            setInputDefaultCategory={setInputDefaultCategory}
            inputDefaultCompetitor={inputDefaultCompetitor}
            setInputDefaultCompetitor={setInputDefaultCompetitor}
            onSubmit={handleProfileSubmit}
            onAvatarUpload={handleAvatarUpload}
            onRemoveAvatar={removeAvatar}
            onPickAvatar={() => fileInputRef.current?.click()}
            onBackToWorkspace={() => switchMainTab("workspace")}
          />
        </div>
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
      <NewOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaults={{
          brand: profile.defaultBrand,
          category: profile.defaultCategory,
          competitor: profile.defaultCompetitor,
          email: profile.email,
          phone: profile.phone,
        }}
      />
    </div>
  );
}