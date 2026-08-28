"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Info,
  Kanban,
  KeyRound,
  LockKeyhole,
  LogIn,
  Mail,
  MailCheck,
  Orbit,
  ShieldCheck,
  UserPlus,
  UserRound,
  Vault,
} from "lucide-react";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

type AuthMode = "login" | "signup" | "reset" | "update";
type Notice = { type: "error" | "success"; message: string } | null;

function getDestination(defaultPath: string) {
  const params = new URLSearchParams(window.location.search);
  const requestedPath = params.get("redirect");
  const redirectPath =
    requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : defaultPath;
  const orderId = params.get("id");

  if (!orderId) return redirectPath;

  const separator = redirectPath.includes("?") ? "&" : "?";
  return `${redirectPath}${separator}id=${encodeURIComponent(orderId)}`;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas" aria-busy="true" />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<Notice>(() => {
    const urlError = searchParams.get("error");
    return urlError ? { type: "error", message: urlError } : null;
  });
  const [authMode, setAuthMode] = useState<AuthMode>(
    searchParams.get("mode") === "update" ? "update" : "login"
  );
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlError = params.get("error");

    if (urlError) {
      params.delete("error");
      const query = params.toString();
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`
      );
    }
  }, []);

  const changeMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setNotice(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleOAuth = async (provider: "google" | "github") => {
    if (!supabase) {
      setNotice({ type: "error", message: "Layanan login belum tersedia. Coba lagi sebentar." });
      return;
    }
    setLoading(true);
    setNotice(null);
    const dest = getDestination("/dashboard");
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", dest);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: callbackUrl.toString() },
    });
    if (error) {
      setNotice({
        type: "error",
        message: `Gagal membuka ${provider === "google" ? "Google" : "GitHub"}: ${error.message}`,
      });
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!supabase) {
      setNotice({ type: "error", message: "Layanan login belum tersedia. Coba lagi sebentar." });
      return;
    }
    if (!email.trim()) {
      setNotice({ type: "error", message: "Isi alamat email dulu, lalu tekan kirim link masuk." });
      return;
    }
    setLoading(true);
    setNotice(null);
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", getDestination("/dashboard"));
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: callbackUrl.toString() },
    });
    if (error) {
      setNotice({ type: "error", message: "Gagal mengirim link masuk: " + error.message });
    } else {
      setNotice({
        type: "success",
        message: "Link masuk sudah dikirim ke " + email.trim() + ". Cek inbox (atau folder spam), lalu klik link-nya.",
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setNotice(null);

    try {
      if (!supabase) {
        throw new Error("Layanan login belum tersedia. Coba lagi sebentar.");
      }

      if (authMode === "reset") {
        const callbackUrl = new URL("/auth/callback", window.location.origin);
        callbackUrl.searchParams.set("next", "/login?mode=update");
        const { error } = await supabase.auth.resetPasswordForEmail(
          email.trim(),
          { redirectTo: callbackUrl.toString() }
        );
        if (error) throw error;

        setNotice({
          type: "success",
          message:
            "Instruksi reset sudah dikirim. Periksa inbox kamu, lalu ikuti tautannya untuk membuat password baru.",
        });
        return;
      }

      if (authMode === "update") {
        if (password !== confirmPassword) {
          throw new Error("Password belum sama. Periksa kembali kolom konfirmasi.");
        }

        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;

        setPassword("");
        setConfirmPassword("");
        setAuthMode("login");
        setNotice({
          type: "success",
          message: "Password berhasil diperbarui. Silakan masuk dengan password baru.",
        });
        return;
      }

      if (authMode === "signup") {
        if (fullName.trim().length < 2) {
          throw new Error("Isi nama lengkap agar workspace bisa menyapa kamu dengan benar.");
        }
        if (password !== confirmPassword) {
          throw new Error("Password belum sama. Periksa kembali kolom konfirmasi.");
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              role: "customer",
              name: fullName.trim(),
            },
          },
        });
        if (error) throw error;

        if (data.session) {
          window.location.replace(getDestination("/dashboard"));
          return;
        }

        changeMode("login");
        setNotice({
          type: "success",
          message:
            "Akun berhasil dibuat. Periksa email kamu jika verifikasi diperlukan, lalu masuk.",
        });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;

        const redirectPath = new URLSearchParams(window.location.search).get(
          "redirect"
        );
        if (
          redirectPath?.startsWith("/") &&
          !redirectPath.startsWith("//")
        ) {
          window.location.replace(getDestination("/dashboard"));
          return;
        }

        const res = await fetch("/api/me", {
          headers: { Authorization: "Bearer " + data.session.access_token },
        });
        const me = res.ok ? await res.json() : null;

        if (me?.role === "admin") {
          window.location.replace("/console");
        } else {
          window.location.replace("/dashboard");
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setNotice({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  const isSignup = authMode === "signup";
  const isReset = authMode === "reset";
  const isUpdate = authMode === "update";

  const authTitle = isSignup
    ? "Buat akun workspace."
    : isReset
      ? "Pulihkan akses workspace."
      : isUpdate
        ? "Buat password baru."
        : "Masuk ke workspace.";
  const authSubtitle = isSignup
    ? "Simpan semua batch dan aset brand dalam satu ruang kerja."
    : isReset
      ? "Masukkan email dan kami siapkan instruksi pemulihan akses."
      : isUpdate
        ? "Pilih password baru untuk mengamankan akses workspace kamu."
        : "Lanjutkan dari tempat terakhir kamu bekerja.";
  const submitLabel = loading
    ? isReset
      ? "Mengirim instruksi..."
      : isUpdate
        ? "Memperbarui password..."
        : "Memproses..."
    : isSignup
      ? "Buat Akun & Lanjut"
      : isReset
        ? "Kirim Instruksi Reset"
        : isUpdate
          ? "Simpan Password Baru"
          : "Masuk ke Workspace";

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#auth-panel"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:bg-wasabi focus:text-ink focus:font-mono focus:text-xs focus:font-bold focus:rounded-xl focus:border-2 focus:border-ink"
      >
        Lewati ke form masuk
      </a>

      <header className="border-b-2 border-ink bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="font-serif text-3xl sm:text-4xl tracking-tight group-hover:rotate-1 transition-transform">
              Karsa
            </span>
            <span className="badge-tag bg-wasabi text-ink rounded px-2 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase font-bold">
              Studio
            </span>
          </Link>
          <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono font-bold">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-stone-500">
              <span className="w-2 h-2 rounded-full bg-wasabi border border-ink" />
              Member access
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 border-2 border-ink bg-white rounded-xl hover:bg-sunflower transition shadow-brutal-sm"
            >
              Kembali ke beranda <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <main
        id="auth-panel"
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-20 flex-1"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <section
            className="lg:col-span-6 order-2 lg:order-1"
            aria-labelledby="workspace-title"
          >
            <div className="max-w-xl">
              <span className="badge-tag inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunflower text-ink text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wide">
                <Orbit className="w-3.5 h-3.5" aria-hidden="true" />
                Member Workspace
              </span>
              <h1
                id="workspace-title"
                className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[0.98] tracking-tight mt-5"
              >
                Semua kerja kontenmu,
                <br />
                <span className="italic text-terracotta">satu ruang kendali.</span>
              </h1>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-5 max-w-lg">
                Masuk untuk melihat batch yang sedang berjalan, membuka Brand Vault,
                memakai micro-tools, dan mengatur seluruh inventaris konten 30 harimu.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bento-pop rounded-2xl bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-500">
                      01 / Track
                    </span>
                    <Kanban className="w-4 h-4 text-terracotta" aria-hidden="true" />
                  </div>
                  <h2 className="font-serif text-xl mt-3">Pantau batch</h2>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1.5">
                    Lihat status brief, proses produksi, revisi, hingga file final.
                  </p>
                </div>
                <div className="bento-pop rounded-2xl bg-wasabi/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-wasabiDark">
                      02 / Organize
                    </span>
                    <Vault className="w-4 h-4 text-wasabiDark" aria-hidden="true" />
                  </div>
                  <h2 className="font-serif text-xl mt-3">Simpan Brand Vault</h2>
                  <p className="text-xs text-stone-700 leading-relaxed mt-1.5">
                    Jaga tone, detail brand, dan referensi produk tetap konsisten.
                  </p>
                </div>
              </div>

              <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-ink text-canvas border-2 border-ink shadow-brutal flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-sunflower text-ink flex items-center justify-center shrink-0 border-2 border-ink">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold text-sm">
                    Workspace yang rapi, bukan inbox yang berantakan.
                  </h2>
                  <p className="text-xs text-stone-300 leading-relaxed mt-1">
                    Satu tempat untuk brief, output, catatan, dan langkah berikutnya.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            className="lg:col-span-6 order-1 lg:order-2"
            aria-labelledby="auth-title"
          >
            <div className="max-w-xl lg:max-w-md lg:ml-auto">
              <div className="bento-pop rounded-3xl bg-white p-5 sm:p-8 lg:p-9">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta font-bold">
                      Workspace access
                    </span>
                    <h2 id="auth-title" className="font-serif text-3xl sm:text-4xl mt-2">
                      {authTitle}
                    </h2>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      {authSubtitle}
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-wasabi border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
                    <LockKeyhole className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>

                {!isReset && !isUpdate && (
                  <div
                    className="grid grid-cols-2 gap-2 p-1.5 bg-canvas border-2 border-ink rounded-2xl mb-6"
                    role="tablist"
                    aria-label="Mode autentikasi"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={!isSignup}
                      onClick={() => changeMode("login")}
                      className={`rounded-xl py-2.5 text-xs font-mono font-bold transition ${
                        !isSignup
                          ? "bg-ink text-canvas -translate-y-px shadow-[2px_2px_0_#E75A3C]"
                          : "text-stone-600 hover:text-ink"
                      }`}
                    >
                      Masuk
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isSignup}
                      onClick={() => changeMode("signup")}
                      className={`rounded-xl py-2.5 text-xs font-mono font-bold transition ${
                        isSignup
                          ? "bg-ink text-canvas -translate-y-px shadow-[2px_2px_0_#E75A3C]"
                          : "text-stone-600 hover:text-ink"
                      }`}
                    >
                      Buat Akun
                    </button>
                  </div>
                )}

                {!isReset && !isUpdate && (
                  <div className="mb-5 space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleOAuth("google")}
                        disabled={loading}
                        className="w-full py-3 rounded-xl border-2 border-ink bg-white hover:bg-canvas text-ink font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[44px] shadow-brutal-sm disabled:opacity-60 disabled:cursor-wait"
                      >
                        <GoogleIcon className="w-4 h-4" />
                        <span>{isSignup ? "Daftar dengan Google" : "Masuk dengan Google"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOAuth("github")}
                        disabled={loading}
                        className="w-full py-3 rounded-xl border-2 border-ink bg-ink hover:bg-terracotta text-canvas font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[44px] shadow-brutal-sm disabled:opacity-60 disabled:cursor-wait"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        <span>{isSignup ? "Daftar dengan GitHub" : "Masuk dengan GitHub"}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[10px] text-stone-500 font-bold" aria-hidden="true">
                      <span className="flex-1 border-t-2 border-dashed border-ink/20" />
                      <span>atau pakai email</span>
                      <span className="flex-1 border-t-2 border-dashed border-ink/20" />
                    </div>
                  </div>
                )}

                {notice && (
                  <div
                    role={notice.type === "error" ? "alert" : "status"}
                    aria-live="polite"
                    className={`mb-4 p-3 rounded-xl border-2 border-ink text-xs leading-relaxed flex items-start gap-2 ${
                      notice.type === "error"
                        ? "bg-terracottaLight text-terracotta"
                        : "bg-wasabi/40 text-wasabiDark"
                    }`}
                  >
                    {notice.type === "error" ? (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    ) : (
                      <MailCheck className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    )}
                    <span>{notice.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading}>
                  {isSignup && (
                    <div>
                      <label
                        htmlFor="inputName"
                        className="block text-xs font-mono font-bold text-ink mb-1.5"
                      >
                        Nama Lengkap <span aria-hidden="true">*</span>
                      </label>
                      <div className="flex items-center gap-2 bg-canvas border-2 border-ink rounded-xl px-3 transition focus-within:-translate-y-px focus-within:shadow-[3px_3px_0_#E75A3C]">
                        <UserRound className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true" />
                        <input
                          id="inputName"
                          type="text"
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                          required
                          autoComplete="name"
                          placeholder="Contoh: Alaric Diaz"
                          className="w-full bg-transparent py-3 text-sm text-ink focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {!isUpdate && (
                    <div>
                      <label
                        htmlFor="inputEmail"
                        className="block text-xs font-mono font-bold text-ink mb-1.5"
                      >
                        Email Workspace <span aria-hidden="true">*</span>
                      </label>
                      <div className="flex items-center gap-2 bg-canvas border-2 border-ink rounded-xl px-3 transition focus-within:-translate-y-px focus-within:shadow-[3px_3px_0_#E75A3C]">
                        <Mail className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true" />
                        <input
                          id="inputEmail"
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                          autoComplete="email"
                          placeholder="nama@brand.com"
                          className="w-full bg-transparent py-3 text-sm text-ink focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {!isReset && (
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <label
                          htmlFor="inputPassword"
                          className="block text-xs font-mono font-bold text-ink"
                        >
                          {isUpdate ? "Password Baru" : "Password"} <span aria-hidden="true">*</span>
                        </label>
                        {authMode === "login" && (
                          <button
                            type="button"
                            onClick={() => changeMode("reset")}
                            className="text-[10px] font-mono font-bold text-terracotta hover:underline"
                          >
                            Lupa password?
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 bg-canvas border-2 border-ink rounded-xl pl-3 pr-1 transition focus-within:-translate-y-px focus-within:shadow-[3px_3px_0_#E75A3C]">
                        <KeyRound className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true" />
                        <input
                          id="inputPassword"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                          minLength={6}
                          autoComplete={isUpdate ? "new-password" : "current-password"}
                          placeholder="Minimal 6 karakter"
                          className="w-full bg-transparent py-3 text-sm text-ink focus:outline-none"
                        />
                        <button
                          type="button"
                          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                          onClick={() => setShowPassword((visible) => !visible)}
                          className="min-w-11 min-h-11 rounded-lg text-stone-500 hover:bg-wasabi hover:text-ink flex items-center justify-center transition"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Eye className="w-4 h-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {(isSignup || isUpdate) && (
                    <div>
                      <label
                        htmlFor="inputConfirm"
                        className="block text-xs font-mono font-bold text-ink mb-1.5"
                      >
                        Ulangi Password <span aria-hidden="true">*</span>
                      </label>
                      <div className="flex items-center gap-2 bg-canvas border-2 border-ink rounded-xl pl-3 pr-1 transition focus-within:-translate-y-px focus-within:shadow-[3px_3px_0_#E75A3C]">
                        <ShieldCheck className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true" />
                        <input
                          id="inputConfirm"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          required
                          minLength={6}
                          autoComplete="new-password"
                          placeholder="Ketik ulang password"
                          className="w-full bg-transparent py-3 text-sm text-ink focus:outline-none"
                        />
                        <button
                          type="button"
                          aria-label={
                            showConfirmPassword
                              ? "Sembunyikan konfirmasi password"
                              : "Tampilkan konfirmasi password"
                          }
                          onClick={() => setShowConfirmPassword((visible) => !visible)}
                          className="min-w-11 min-h-11 rounded-lg text-stone-500 hover:bg-wasabi hover:text-ink flex items-center justify-center transition"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Eye className="w-4 h-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {authMode === "login" && (
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <label className="inline-flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(event) => setRememberMe(event.target.checked)}
                          className="w-4 h-4 accent-terracotta"
                        />
                        <span>Ingat di perangkat ini</span>
                      </label>
                      <span className="text-[10px] font-mono text-stone-400">Akses aman</span>
                    </div>
                  )}

                  {isSignup && (
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        id="acceptTerms"
                        type="checkbox"
                        required
                        className="w-4 h-4 mt-0.5 accent-terracotta"
                      />
                      <label htmlFor="acceptTerms" className="text-[11px] text-stone-600 leading-relaxed">
                        Saya setuju dengan {" "}
                        <Link href="/terms" className="underline hover:text-terracotta">
                          Syarat
                        </Link>{" "}
                        dan {" "}
                        <Link href="/privacy" className="underline hover:text-terracotta">
                          Kebijakan Privasi
                        </Link>{" "}
                        Karsa.
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full min-h-[50px] py-3.5 bg-terracotta hover:bg-ink text-white rounded-2xl border-2 border-ink shadow-brutal font-mono text-xs font-bold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-wait"
                  >
                    {loading ? (
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        aria-hidden="true"
                      />
                    ) : isSignup ? (
                      <UserPlus className="w-4 h-4 text-wasabi" aria-hidden="true" />
                    ) : isReset ? (
                      <MailCheck className="w-4 h-4 text-wasabi" aria-hidden="true" />
                    ) : isUpdate ? (
                      <ShieldCheck className="w-4 h-4 text-wasabi" aria-hidden="true" />
                    ) : (
                      <LogIn className="w-4 h-4 text-wasabi" aria-hidden="true" />
                    )}
                    {submitLabel}
                  </button>
                </form>
                {!isReset && !isUpdate && !isSignup && (
                  <div className="pt-2 border-t-2 border-ink">
                    <button
                      type="button"
                      onClick={handleMagicLink}
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-terracotta hover:text-ink transition py-2 disabled:opacity-60 disabled:cursor-wait"
                    >
                      <MailCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Gak hafal password? Kirim link masuk ke email</span>
                    </button>
                  </div>
                )}


                {isReset || isUpdate ? (
                  <div className="text-center mt-5">
                    <button
                      type="button"
                      onClick={() => changeMode("login")}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-terracotta hover:underline"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      Kembali ke masuk
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 pt-5 border-t-2 border-ink text-center text-xs font-mono text-stone-500">
                    {isSignup ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
                    <button
                      type="button"
                      onClick={() => changeMode(isSignup ? "login" : "signup")}
                      className="font-bold text-ink hover:text-terracotta underline underline-offset-2"
                    >
                      {isSignup ? "Masuk" : "Buat akun gratis"}
                    </button>
                  </div>
                )}

                <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-mono text-stone-500">
                  <Info className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Akses workspace dilindungi autentikasi Supabase.</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t-2 border-ink bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="font-mono text-[10px] sm:text-xs text-stone-500">
            Karsa Studio / Member Workspace
          </span>
          <div className="flex items-center gap-4 text-[10px] sm:text-xs font-mono font-bold">
            <Link href="/terms" className="hover:text-terracotta underline underline-offset-2">
              Syarat
            </Link>
            <Link href="/privacy" className="hover:text-terracotta underline underline-offset-2">
              Privasi
            </Link>
            <Link href="/refund" className="hover:text-terracotta underline underline-offset-2">
              Jaminan SLA
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
