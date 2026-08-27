"use client";

import type { RefObject } from "react";
import { Camera, Save } from "lucide-react";
import type { Profile } from "./dashboard-lib";

type Props = {
  profile: Profile;
  hasAvatar: boolean;
  avatarInitial: string;
  showSaveStatus: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  inputFullName: string;
  setInputFullName: (v: string) => void;
  inputDisplayName: string;
  setInputDisplayName: (v: string) => void;
  inputRoleBio: string;
  setInputRoleBio: (v: string) => void;
  inputEmail: string;
  setInputEmail: (v: string) => void;
  inputPhone: string;
  setInputPhone: (v: string) => void;
  inputDefaultBrand: string;
  setInputDefaultBrand: (v: string) => void;
  inputDefaultCategory: string;
  setInputDefaultCategory: (v: string) => void;
  inputDefaultCompetitor: string;
  setInputDefaultCompetitor: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAvatar: () => void;
  onPickAvatar: () => void;
  onBackToWorkspace: () => void;
};

export function ProfileVaultTab(props: Props) {
  const {
    profile, hasAvatar, avatarInitial, showSaveStatus, fileInputRef,
    inputFullName, setInputFullName, inputDisplayName, setInputDisplayName,
    inputRoleBio, setInputRoleBio, inputEmail, setInputEmail, inputPhone, setInputPhone,
    inputDefaultBrand, setInputDefaultBrand, inputDefaultCategory, setInputDefaultCategory,
    inputDefaultCompetitor, setInputDefaultCompetitor,
    onSubmit, onAvatarUpload, onRemoveAvatar, onPickAvatar, onBackToWorkspace,
  } = props;

  return (
<section id="view-profile" role="tabpanel" aria-labelledby="tab-nav-profile" className="space-y-5 sm:space-y-6">
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm shrink-0">05</span>
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Akun & Brand Vault</h2>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Dossier member — identitas, kontak, dan parameter brand bawaan.</p>
            </div>
          </header>

          <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
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
                  <button type="button" onClick={onPickAvatar} className="absolute bottom-0 right-0 p-2 bg-sunflower border-2 border-ink rounded-full text-ink shadow-brutal-sm active:bg-wasabi" title="Ganti Foto" aria-label="Ganti foto profil">
                    <Camera className="w-4 h-4" />
                  </button>
                  <input type="file" id="fileAvatarInput" accept="image/*" className="hidden" ref={fileInputRef} onChange={onAvatarUpload} />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                    <button type="button" onClick={onPickAvatar} className="px-4 py-2.5 bg-ink active:bg-terracotta text-canvas text-xs font-mono font-bold rounded-xl transition min-h-[44px] shadow-brutal-sm">
                      Unggah Foto
                    </button>
                    <button type="button" onClick={onRemoveAvatar} className="px-4 py-2.5 border-2 border-ink bg-white active:bg-canvas text-ink text-xs font-mono font-bold rounded-xl transition min-h-[44px] shadow-brutal-sm">
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
                <button type="button" onClick={onBackToWorkspace} className="w-1/2 sm:w-auto px-5 py-3.5 border-2 border-ink rounded-2xl bg-white active:bg-canvas text-ink font-mono text-xs font-bold transition text-center min-h-[48px] shadow-brutal-sm">
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
  );
}
