"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Read error from URL (e.g. middleware redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlError = params.get("error");
    if (urlError) {
      setError(urlError);
      window.history.replaceState({}, "", "/login");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: "customer",
            },
          },
        });
        if (error) throw error;

        if (data.session) {
          const params = new URLSearchParams(window.location.search);
          const redirectUrl = params.get("redirect") || "/dashboard";
          const orderId = params.get("id");
          const url = orderId ? `${redirectUrl}?id=${orderId}` : redirectUrl;
          window.location.replace(url);
          return;
        }

        setError("");
        alert("Akun berhasil dibuat! Silakan cek email Anda jika diperlukan verifikasi, lalu masuk.");
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get("redirect");
        const orderId = params.get("id");

        if (redirectUrl && redirectUrl.startsWith("/")) {
          const url = orderId ? `${redirectUrl}?id=${orderId}` : redirectUrl;
          window.location.replace(url);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profile?.role === "admin") {
          window.location.replace("/console");
        } else {
          window.location.replace("/dashboard");
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif text-sand-900">Karsa Studio</h1>
        <p className="text-stone-500 text-sm mt-2 font-mono">
          {isSignUp ? "Buat akun baru" : "Masuk ke akun Anda"}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6 sm:p-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-stone-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-sand-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sand-400 focus:border-transparent"
              placeholder="email@anda.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-stone-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 pr-10 bg-sand-50 border border-sand-200 rounded-xl text-sm text-sand-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sand-400 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-sand-300 text-sand-900 focus:ring-sand-400"
              />
              <span className="text-xs text-stone-500">Ingat di perangkat ini</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-sand-900 text-white rounded-xl text-sm font-medium hover:bg-sand-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {loading
              ? "Memproses..."
              : isSignUp
              ? "Buat Akun"
              : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-xs text-stone-500 hover:text-sand-900 transition-colors"
          >
            {isSignUp
              ? "Sudah punya akun? Masuk"
              : "Belum punya akun? Daftar"}
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-stone-400 mt-6">
        <a href="/" className="hover:text-sand-900 transition-colors">
          ← Kembali ke beranda
        </a>
      </p>
    </div>
  );
}
