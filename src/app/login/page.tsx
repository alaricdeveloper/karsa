"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";
import { createClient } from "@supabase/supabase-js";

export default function Page() {

  useEffect(() => {
    const sbClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
    let currentAuthMode = "login";

    const switchAuthMode = (mode: string) => {
      currentAuthMode = mode;
      const tabLogin = document.getElementById("tabLogin");
      const tabRegister = document.getElementById("tabRegister");
      const fieldBrand = document.getElementById("fieldBrand");
      const inputBrandName = document.getElementById("inputBrandName") as HTMLInputElement | null;
      const submitBtnText = document.getElementById("submitBtnText");
      const toggleTextHelper = document.getElementById("toggleTextHelper");
      const btnToggleHelper = document.getElementById("btnToggleHelper");
      const authStatus = document.getElementById("authStatus");
      if (authStatus) authStatus.textContent = "";
      if (mode === "login") {
        tabLogin?.setAttribute("class", "rounded-xl py-2.5 transition bg-ink text-brutalYellow shadow-brutal-sm");
        tabLogin?.setAttribute("aria-selected", "true");
        tabRegister?.setAttribute("class", "rounded-xl py-2.5 transition text-stone-600 hover:text-ink");
        tabRegister?.setAttribute("aria-selected", "false");
        fieldBrand?.classList.add("hidden");
        inputBrandName?.removeAttribute("required");
        if (submitBtnText) submitBtnText.textContent = "Masuk ke Workspace";
        if (toggleTextHelper) toggleTextHelper.textContent = "Belum punya akun workspace?";
        if (btnToggleHelper) btnToggleHelper.textContent = "Daftar sekarang";
      } else {
        tabRegister?.setAttribute("class", "rounded-xl py-2.5 transition bg-ink text-brutalYellow shadow-brutal-sm");
        tabRegister?.setAttribute("aria-selected", "true");
        tabLogin?.setAttribute("class", "rounded-xl py-2.5 transition text-stone-600 hover:text-ink");
        tabLogin?.setAttribute("aria-selected", "false");
        fieldBrand?.classList.remove("hidden");
        inputBrandName?.setAttribute("required", "true");
        if (submitBtnText) submitBtnText.textContent = "Buat Akun Workspace";
        if (toggleTextHelper) toggleTextHelper.textContent = "Sudah memiliki akun workspace?";
        if (btnToggleHelper) btnToggleHelper.textContent = "Masuk di sini";
      }
    };

    const togglePasswordVisibility = () => {
      const passwordInput = document.getElementById("inputPassword") as HTMLInputElement | null;
      if (!passwordInput) return;
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    };

    const getDestination = () => {
      const params = new URLSearchParams(window.location.search);
      const redirectPath = params.get("redirect");
      const orderId = params.get("orderId");
      let dest = "/dashboard";
      if (redirectPath && redirectPath.startsWith("/") && !redirectPath.startsWith("//")) dest = redirectPath;
      if (orderId) dest += (dest.includes("?") ? "&" : "?") + "id=" + encodeURIComponent(orderId);
      return dest;
    };

    const handleOAuth = async (provider: string) => {
      const authStatus = document.getElementById("authStatus");
      try {
        const callbackUrl = new URL("/auth/callback", window.location.origin);
        callbackUrl.searchParams.set("next", getDestination());
        const { error } = await sbClient.auth.signInWithOAuth({
          provider: provider as "google" | "github",
          options: { redirectTo: callbackUrl.toString() },
        });
        if (error && authStatus) {
          authStatus.textContent = "Gagal membuka " + provider + ": " + error.message;
          authStatus.className = "text-center text-xs font-mono text-brutalPink font-bold";
        }
      } catch (err) {
        if (authStatus) {
          authStatus.textContent = "Gagal membuka " + provider;
          authStatus.className = "text-center text-xs font-mono text-brutalPink font-bold";
        }
      }
    };

    const handleAuthSubmit = async (e: Event) => {
      e.preventDefault();
      const emailEl = document.getElementById("inputEmail") as HTMLInputElement | null;
      const passwordEl = document.getElementById("inputPassword") as HTMLInputElement | null;
      const brandEl = document.getElementById("inputBrandName") as HTMLInputElement | null;
      const authStatus = document.getElementById("authStatus");
      const submitBtn = document.getElementById("btnSubmitAuth") as HTMLButtonElement | null;
      if (!emailEl || !passwordEl) return;
      const email = emailEl.value.trim();
      const password = passwordEl.value;
      const brandName = brandEl?.value.trim() || "";
      if (!authStatus) return;
      if (submitBtn) submitBtn.disabled = true;
      authStatus.textContent = currentAuthMode === "login" ? "Memverifikasi kredensial workspace..." : "Membuat akun workspace...";
      authStatus.className = "text-center text-xs font-mono text-ink font-bold";
      try {
        if (currentAuthMode === "register") {
          if (brandName.length < 2) throw new Error("Isi nama brand/bisnis agar brief batch bisa disusun dengan benar.");
          const { data, error } = await sbClient.auth.signUp({
            email,
            password,
            options: { data: { role: "customer", brand: brandName } },
          });
          if (error) throw error;
          if (data.session) {
            window.location.replace(getDestination());
            return;
          }
          switchAuthMode("login");
          authStatus.textContent = "Akun berhasil dibuat. Periksa email untuk verifikasi, lalu masuk.";
          authStatus.className = "text-center text-xs font-mono text-ink font-bold";
        } else {
          const { data, error } = await sbClient.auth.signInWithPassword({ email, password });
          if (error) throw error;
          const res = await fetch("/api/me", { headers: { Authorization: "Bearer " + data.session.access_token } });
          const me = res.ok ? await res.json() : null;
          if (me && me.role === "admin") window.location.replace("/console");
          else window.location.replace(getDestination());
        }
      } catch (err) {
        authStatus.textContent = err instanceof Error ? err.message : "Terjadi kesalahan";
        authStatus.className = "text-center text-xs font-mono text-brutalPink font-bold";
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    };

    const handleForgotPassword = async () => {
      const emailEl = document.getElementById("inputEmail") as HTMLInputElement | null;
      const authStatus = document.getElementById("authStatus");
      if (!authStatus) return;
      if (!emailEl || !emailEl.value.trim()) {
        authStatus.textContent = "Isi alamat email dulu untuk reset password.";
        authStatus.className = "text-center text-xs font-mono text-brutalPink font-bold";
        return;
      }
      authStatus.textContent = "Mengirim instruksi reset...";
      authStatus.className = "text-center text-xs font-mono text-ink font-bold";
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", "/login?mode=update");
      const { error } = await sbClient.auth.resetPasswordForEmail(emailEl.value.trim(), { redirectTo: callbackUrl.toString() });
      if (error) {
        authStatus.textContent = error.message;
        authStatus.className = "text-center text-xs font-mono text-brutalPink font-bold";
      } else {
        authStatus.textContent = "Instruksi reset dikirim. Periksa inbox untuk membuat password baru.";
        authStatus.className = "text-center text-xs font-mono text-ink font-bold";
      }
    };

    const handlers: Array<[Element, EventListener]> = [];
    document.querySelectorAll('[data-action="auth-mode"]').forEach((el) => {
      const h = () => switchAuthMode(el.getAttribute("data-mode") || "login");
      el.addEventListener("click", h);
      handlers.push([el, h]);
    });
    document.querySelectorAll('[data-action="auth-toggle"]').forEach((el) => {
      const h = () => switchAuthMode(currentAuthMode === "login" ? "register" : "login");
      el.addEventListener("click", h);
      handlers.push([el, h]);
    });
    document.querySelectorAll('[data-action="auth-toggle-password"]').forEach((el) => {
      const h = togglePasswordVisibility;
      el.addEventListener("click", h);
      handlers.push([el, h]);
    });
    document.querySelectorAll('[data-action="auth-oauth"]').forEach((el) => {
      const h = () => handleOAuth(el.getAttribute("data-provider") || "google");
      el.addEventListener("click", h);
      handlers.push([el, h]);
    });
    document.querySelectorAll('[data-action="auth-forgot"]').forEach((el) => {
      const h = () => handleForgotPassword();
      el.addEventListener("click", h);
      handlers.push([el, h]);
    });
    const form = document.getElementById("authForm");
    if (form) {
      form.addEventListener("submit", handleAuthSubmit);
      handlers.push([form, handleAuthSubmit]);
    }
    return () => handlers.forEach(([el, h]) => el.removeEventListener("click", h));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">


  {/* TOP STATUS TICKER */}
  <div className="bg-brutalYellow text-ink text-[11px] sm:text-xs font-mono py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-2 font-bold relative z-30">
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-brutalYellow text-[10px] uppercase font-mono font-black border border-ink shadow-brutal-sm shrink-0">
      <Icon name="shield-check" className="w-3.5 h-3.5" /> PORTAL MEMBER
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Akses terenkripsi ke Notion Content OS, Brand Vault, dan pemantauan SLA produksi.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalYellow text-ink rounded font-bold">Studio</span>
      </a>

      {/* Status & Back Button */}
      <div className="flex items-center gap-3 text-xs font-mono font-bold">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>Sistem: <strong className="text-ink">Online 24/7</strong></span>
        </div>
        <a className="btn-press inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-ink rounded-xl font-bold transition" href="/">
          <Icon name="arrow-left" className="w-4 h-4" />
          <span className="hidden xs:inline">Kembali ke Beranda</span>
          <span className="xs:hidden">Beranda</span>
        </a>
      </div>

    </div>
  </header>

  {/* MAIN AUTH CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 lg:py-20 brutal-grid relative overflow-hidden flex items-center">
    
    {/* Floating Brutalist Stickers & Geometry */}
    <div className="hidden lg:flex absolute top-10 left-10 w-28 h-28 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal animate-pulse pointer-events-none">
      100%<br />TERKUNCI
    </div>
    <div className="hidden xl:flex absolute bottom-12 right-10 badge-brutal bg-white px-3.5 py-2 rounded-xl items-center gap-2 -rotate-6 z-10 shadow-brutal">
      <div className="w-6 h-6 rounded bg-ink text-brutalYellow flex items-center justify-center font-mono font-black text-xs">N</div>
      <span className="font-mono font-bold text-xs">Notion OS Database</span>
    </div>
    <div className="absolute top-1/4 left-2 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>
    <div className="absolute bottom-1/4 right-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-20">✛</div>
    <div className="hidden lg:block absolute bottom-8 left-1/4 w-5 h-5 rounded-full border-2 border-ink bg-brutalCyan rotate-45 pointer-events-none shadow-brutal-sm"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Side: Workspace Features & Benefit Cards (6 Cols) */}
        <section className="lg:col-span-6 space-y-6 text-center lg:text-left" aria-labelledby="workspace-title">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 badge-brutal bg-brutalYellow px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold text-ink">
              <Icon name="layout-dashboard" className="w-4 h-4 text-ink" />
              <span>WORKSPACE DASHBOARD</span>
            </div>

            <h1 id="workspace-title" className="text-3xl sm:text-5xl lg:text-[54px] font-display font-extrabold tracking-tight text-ink leading-[1.1]">
              Semua eksekusi konten, <br className="hidden sm:inline" />
              <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">satu ruang kendali.</span>
            </h1>

            <div className="max-w-lg mx-auto lg:mx-0">
              <p className="bg-white border-2 border-ink rounded-2xl shadow-brutal-sm px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-stone-800 leading-relaxed font-sans font-medium flex items-start gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brutalYellow border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0 mt-0.5"><Icon name="calendar" className="w-4 h-4 text-ink" /></span>
                <span>Akses langsung kalender naskah 30 hari kamu, salin database Notion Content OS, simpan Brand Vault, dan pantau SLA produksi real-time.</span>
              </p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
            
            <div className="bento-card p-5 rounded-3xl bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold text-stone-500">01 / TRACK</span>
                  <div className="w-8 h-8 rounded-xl bg-brutalCyan/30 border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                    <Icon name="kanban" className="w-4 h-4 text-ink" />
                  </div>
                </div>
                <h2 className="font-display font-bold text-lg sm:text-xl text-ink">Pantau Pipeline</h2>
                <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1.5">
                  Cek status konfirmasi brief, penulisan script, hingga link file serah terima final.
                </p>
              </div>
              <span className="font-mono text-[10px] text-stone-500 mt-4 pt-2.5 border-t-2 border-ink block font-bold">
                Update SLA Real-Time
              </span>
            </div>

            <div className="bento-card p-5 rounded-3xl bg-brutalYellow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold text-ink">02 / VAULT</span>
                  <div className="w-8 h-8 rounded-xl bg-white border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                    <Icon name="archive" className="w-4 h-4 text-ink" />
                  </div>
                </div>
                <h2 className="font-display font-bold text-lg sm:text-xl text-ink">Brand Vault</h2>
                <p className="text-xs text-stone-800 font-sans leading-relaxed mt-1.5">
                  Simpan persona, target pembeli, dan kamus istilah brand kamu untuk batch berikutnya.
                </p>
              </div>
              <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">
                1-Click Preset Load
              </span>
            </div>

          </div>

          {/* Bottom Trust Banner */}
          <div className="bento-card p-4 sm:p-5 rounded-2xl bg-white flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-brutalGreen border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
              <Icon name="shield-alert" className="w-5 h-5 text-ink" />
            </div>
            <div>
              <span className="block font-display font-bold text-sm sm:text-base text-ink">Keamanan Data Terisolasi</span>
              <span className="block text-xs text-stone-600 font-sans leading-relaxed">
                Brief, dokumen, & repositori naskah hanya dapat diakses oleh akun terverifikasi kamu.
              </span>
            </div>
          </div>

        </section>

        {/* Right Side: Auth Form Box (6 Cols) */}
        <section className="lg:col-span-6 flex justify-center lg:justify-end" aria-labelledby="auth-title">
          <div className="w-full max-w-md bento-card p-6 sm:p-8 rounded-3xl bg-white relative shadow-brutal-lg">
            
            {/* Auth Form Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 font-bold">Autentikasi Member</span>
                <h2 id="auth-title" className="font-display font-extrabold text-2xl sm:text-3xl text-ink mt-1">Masuk ke Workspace</h2>
                <p className="text-xs text-stone-600 mt-1 font-mono">Lanjutkan manajemen batch konten kamu.</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-brutalYellow border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
                <Icon name="key" className="w-5 h-5 text-ink" />
              </div>
            </div>

            {/* Tab Switcher (Masuk vs Buat Akun) */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-canvas border-2 border-ink rounded-2xl mb-5 font-mono text-xs font-bold" role="tablist" aria-label="Mode Autentikasi">
              <button type="button" id="tabLogin" data-action="auth-mode" data-mode="login" role="tab" aria-selected="true" className="rounded-xl py-2.5 transition bg-ink text-brutalYellow shadow-brutal-sm">
                Masuk
              </button>
              <button type="button" id="tabRegister" data-action="auth-mode" data-mode="register" role="tab" aria-selected="false" className="rounded-xl py-2.5 transition text-stone-600 hover:text-ink">
                Buat Akun
              </button>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-2.5 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button type="button" data-action="auth-oauth" data-provider="google" className="btn-press w-full py-2.5 px-3 rounded-xl bg-white text-ink font-mono text-xs font-bold flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
                    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
                    <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button type="button" data-action="auth-oauth" data-provider="github" className="btn-press w-full py-2.5 px-3 rounded-xl bg-ink text-white font-mono text-xs font-bold flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              <div className="flex items-center gap-3 font-mono text-[10px] text-stone-500 font-bold py-1" aria-hidden="true">
                <span className="flex-1 border-t-2 border-dashed border-ink/20"></span>
                <span>atau via email</span>
                <span className="flex-1 border-t-2 border-dashed border-ink/20"></span>
              </div>
            </div>

            {/* Email & Password Form */}
            <form id="authForm" className="space-y-3.5" onsubmit="handleAuthSubmit(event)">
              
              {/* Brand Name field (shown on register mode) */}
              <div id="fieldBrand" className="hidden">
                <label htmlFor="inputBrandName" className="block text-xs font-mono font-bold text-ink mb-1.5">Nama Brand / Bisnis *</label>
                <div className="flex items-center gap-2 bg-canvas border-2 border-ink rounded-xl px-3 focus-within:ring-2 focus-within:ring-ink">
                  <Icon name="briefcase" className="w-4 h-4 text-stone-500 shrink-0" />
                  <input id="inputBrandName" type="text" placeholder="Contoh: Kopi Teras Senja" className="w-full bg-transparent py-2.5 text-sm text-ink focus:outline-none font-sans" />
                </div>
              </div>

              <div>
                <label htmlFor="inputEmail" className="block text-xs font-mono font-bold text-ink mb-1.5">Email Workspace *</label>
                <div className="flex items-center gap-2 bg-canvas border-2 border-ink rounded-xl px-3 focus-within:ring-2 focus-within:ring-ink">
                  <Icon name="mail" className="w-4 h-4 text-stone-500 shrink-0" />
                  <input id="inputEmail" type="email" required autoComplete="email" placeholder="nama@brand.com" className="w-full bg-transparent py-2.5 text-sm text-ink focus:outline-none font-sans" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label htmlFor="inputPassword" className="block text-xs font-mono font-bold text-ink">Password *</label>
                  <button type="button" data-action="auth-forgot" className="text-[10px] font-mono font-bold text-stone-600 hover:text-ink hover:underline">Lupa password?</button>
                </div>
                <div className="flex items-center gap-2 bg-canvas border-2 border-ink rounded-xl pl-3 pr-1.5 focus-within:ring-2 focus-within:ring-ink">
                  <Icon name="lock" className="w-4 h-4 text-stone-500 shrink-0" />
                  <input id="inputPassword" type="password" required minLength={6} autoComplete="current-password" placeholder="Minimal 6 karakter" className="w-full bg-transparent py-2.5 text-sm text-ink focus:outline-none font-sans" />
                  <button type="button" data-action="auth-toggle-password" aria-label="Lihat Password" className="p-1.5 rounded-lg text-stone-500 hover:bg-brutalYellow hover:text-ink transition">
                    <Icon name="eye" className="w-4 h-4" id="eyeIcon" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1 text-xs">
                <label className="inline-flex items-center gap-2 text-stone-700 cursor-pointer select-none">
                  <input type="checkbox" checked className="w-4 h-4 accent-ink rounded border-2 border-ink" />
                  <span className="font-medium">Ingat perangkat ini</span>
                </label>
                <span className="font-mono text-[10px] font-bold text-stone-500">256-Bit SSL</span>
              </div>

              <button type="submit" id="btnSubmitAuth" className="btn-press w-full py-3.5 bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink font-mono text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2">
                <Icon name="log-in" className="w-4 h-4" />
                <span id="submitBtnText">Masuk ke Workspace</span>
              </button>

              <p id="authStatus" role="status" className="text-center text-xs font-mono text-stone-600 min-h-4"></p>
            </form>

            {/* Bottom Mode Switcher */}
            <div className="mt-5 pt-4 border-t-2 border-ink text-center text-xs font-mono text-stone-600">
              <span id="toggleTextHelper">Belum punya akun workspace?</span>
              <button type="button" data-action="auth-toggle" id="btnToggleHelper" className="font-bold text-ink underline hover:text-stone-800 ml-1">
                Daftar sekarang
              </button>
            </div>

          </div>
        </section>

      </div>
    </div>
  </main>

  {/* FOOTER */}
  <footer className="border-t-2 border-ink bg-canvas py-6 brutal-grid">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-mono text-stone-600">
      <div>
        <span>&copy; 2026 Karsa Studio (usekarsa.co). Member Auth Console.</span>
      </div>
      <div className="flex items-center gap-4 font-bold">
        <a href="/terms" className="hover:underline hover:text-ink">Syarat</a>
        <a href="/privacy" className="hover:underline hover:text-ink">Privasi</a>
        <a href="/refund" className="hover:underline hover:text-ink">Jaminan SLA</a>
      </div>
    </div>
  </footer>

  

    </div>
  );
}
