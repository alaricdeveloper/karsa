"use client";

import { useRef } from "react";
import { Download, Upload, RotateCcw, Save } from "lucide-react";
import type { Order } from "@/lib/types";
import { DB_VERSION } from "./console-lib";

const TONES = [
  "Casual Authentic (Storytelling)",
  "Educational & Authoritative",
  "High Conversion Direct-Response",
];

export function SettingsView({
  orders,
  waTemplate,
  onWaTemplate,
  onResetWaTemplate,
  defaultTone,
  onDefaultTone,
  lastSync,
  onSyncDemo,
  onResetDemo,
  onExportBackup,
  onImportBackup,
}: {
  orders: Order[];
  waTemplate: string;
  onWaTemplate: (v: string) => void;
  onResetWaTemplate: () => void;
  defaultTone: string;
  onDefaultTone: (v: string) => void;
  lastSync: string;
  onSyncDemo: () => void;
  onResetDemo: () => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const syncLabel = lastSync
    ? new Date(lastSync).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
    : "Belum pernah";

  return (
    <section className="space-y-4">
      <div className="plate-pop p-5 sm:p-8 rounded-3xl space-y-5">
        <div>
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-ink text-canvas">
            Mesin &amp; Sinkronisasi
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-ink mt-2">Pengaturan Konsol</h2>
          <p className="text-xs text-stone-600 font-mono mt-1">Sinkronkan ulang dataset demo atau periksa kondisi mesin data lokal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border-2 border-ink rounded-2xl p-4 bg-canvas shadow-brutal-sm">
            <span className="text-stone-600 font-bold uppercase tracking-wide block text-[10px]">Versi Database Lokal</span>
            <span className="font-bold text-ink text-sm block mt-1">{DB_VERSION}</span>
          </div>
          <div className="border-2 border-ink rounded-2xl p-4 bg-canvas shadow-brutal-sm">
            <span className="text-stone-600 font-bold uppercase tracking-wide block text-[10px]">Total Order Tersimpan</span>
            <span className="font-bold text-ink text-sm block mt-1">{orders.length}</span>
          </div>
          <div className="border-2 border-ink rounded-2xl p-4 bg-canvas shadow-brutal-sm">
            <span className="text-stone-600 font-bold uppercase tracking-wide block text-[10px]">Sinkron Terakhir</span>
            <span className="font-bold text-wasabiDark text-sm block mt-1">{syncLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border-2 border-ink rounded-2xl p-4 bg-white shadow-brutal-sm flex flex-col justify-between gap-3">
            <div>
              <h3 className="font-serif text-base text-ink">Backup Data (JSON)</h3>
              <p className="text-xs text-stone-600 mt-0.5">Unduh seluruh data order + pengaturan ke file JSON.</p>
            </div>
            <button
              onClick={onExportBackup}
              className="px-4 py-3 bg-sunflower hover:bg-wasabi text-ink border-2 border-ink rounded-xl font-bold transition flex items-center gap-1.5 min-h-[44px] shadow-brutal-sm"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Backup</span>
            </button>
          </div>
          <div className="border-2 border-ink rounded-2xl p-4 bg-white shadow-brutal-sm flex flex-col justify-between gap-3">
            <div>
              <h3 className="font-serif text-base text-ink">Restore Data</h3>
              <p className="text-xs text-stone-600 mt-0.5">Muat file backup JSON — menimpa data saat ini.</p>
            </div>
            <label className="px-4 py-3 bg-terracotta hover:bg-ink text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 min-h-[44px] shadow-brutal cursor-pointer">
              <Upload className="w-4 h-4 text-wasabi" />
              <span>Pilih File Backup</span>
              <input
                ref={fileRef}
                type="file"
                accept=".json,application/json"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onImportBackup(f);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
          <div className="border-2 border-ink rounded-2xl p-4 bg-white shadow-brutal-sm flex flex-col justify-between gap-3">
            <div>
              <h3 className="font-serif text-base text-ink">Reset ke Demo</h3>
              <p className="text-xs text-stone-600 mt-0.5">Hapus semua data lokal dan kembalikan 34 seed bulan pertama.</p>
            </div>
            <button
              onClick={onResetDemo}
              className="px-4 py-3 bg-terracottaLight hover:bg-ink hover:text-canvas text-terracotta border-2 border-ink rounded-xl font-bold transition min-h-[44px] shadow-brutal-sm"
            >
              Reset Semua Data
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-ink rounded-2xl p-4 bg-white shadow-brutal-sm">
          <div>
            <h3 className="font-serif text-base text-ink">Template Pesan WhatsApp</h3>
            <p className="text-xs text-stone-600 font-mono mt-0.5">
              Dipakai tombol &quot;Kirim Notifikasi WA&quot;. Placeholder: {"{brand}, {orderId}, {notionUrl}."}
            </p>
          </div>
          <button
            onClick={onResetWaTemplate}
            className="px-4 py-3 border-2 border-ink bg-white hover:bg-canvas text-ink rounded-xl font-bold transition min-h-[44px] shadow-brutal-sm"
          >
            Reset Default
          </button>
        </div>
        <textarea
          aria-label="Template pesan WhatsApp"
          rows={5}
          value={waTemplate}
          onChange={(e) => onWaTemplate(e.target.value)}
          className="w-full bg-canvas border-2 border-ink rounded-2xl p-4 text-base sm:text-xs font-mono text-ink focus:outline-none focus:ring-2 focus:ring-terracotta leading-relaxed"
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-ink rounded-2xl p-4 bg-white shadow-brutal-sm">
          <div>
            <h3 className="font-serif text-base text-ink">Simpan Template WA</h3>
            <p className="text-xs text-stone-600 font-mono mt-0.5">Tersimpan lokal dan dipakai tombol kirim WA di detail order.</p>
          </div>
          <button
            onClick={() => {
              localStorage.setItem("omni_wa_template", waTemplate.trim());
              onWaTemplate(waTemplate.trim());
            }}
            className="px-5 py-3 bg-terracotta hover:bg-ink text-white rounded-xl font-bold transition flex items-center gap-1.5 min-h-[44px] shadow-brutal"
          >
            <Save className="w-4 h-4 text-wasabi" />
            <span>Simpan Template</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-ink rounded-2xl p-4 bg-white shadow-brutal-sm">
          <div>
            <h3 className="font-serif text-base text-ink">Tone Default Prompt Studio</h3>
            <p className="text-xs text-stone-600 font-mono mt-0.5">Tone ini otomatis terpilih di plat 03 saat konsol dibuka.</p>
          </div>
          <select
            aria-label="Tone default prompt studio"
            value={defaultTone}
            onChange={(e) => onDefaultTone(e.target.value)}
            className="w-full sm:w-auto bg-canvas border-2 border-ink rounded-xl px-3 py-2 text-base sm:text-xs font-mono font-bold text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]"
          >
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-ink rounded-2xl p-4 bg-white shadow-brutal-sm">
          <div>
            <h3 className="font-serif text-base text-ink">Sinkronkan Ulang 34 Data Demo</h3>
            <p className="text-xs text-stone-600 font-mono mt-0.5">Menimpa semua data dengan seed 34 pesanan bulan pertama.</p>
          </div>
          <button
            onClick={onSyncDemo}
            className="px-4 py-3 bg-sunflower hover:bg-wasabi text-ink border-2 border-ink rounded-xl font-bold transition flex items-center gap-1.5 min-h-[44px] shadow-brutal-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Sinkronkan Ulang</span>
          </button>
        </div>
      </div>
    </section>
  );
}