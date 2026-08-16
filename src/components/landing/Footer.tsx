"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Mail, MessageCircle, Clock, MessageSquare } from "lucide-react";

export function Footer() {
  const [modal, setModal] = useState<"terms" | "privacy" | "contact" | null>(null);

  return (
    <>
      <footer className="py-10 sm:py-12 bg-sand-50 text-xs font-mono text-stone-500 border-t border-sand-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-sand-900 text-base font-normal">Karsa Studio</span>
            <span>&mdash; Automated Operations</span>
          </div>
          <div>
            &copy; 2026 Karsa Inc. Hak Cipta Dilindungi.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-stone-700 font-medium">
            <button onClick={() => setModal("terms")} className="hover:text-sand-900 transition underline underline-offset-4 py-1">Terms</button>
            <button onClick={() => setModal("privacy")} className="hover:text-sand-900 transition underline underline-offset-4 py-1">Privacy</button>
            <button onClick={() => setModal("contact")} className="hover:text-sand-900 transition underline underline-offset-4 py-1">Support</button>
          </div>
        </div>
      </footer>

      {/* MODAL: TERMS */}
      <Modal open={modal === "terms"} onClose={() => setModal(null)} maxWidth="max-w-2xl">
        <div className="p-6 sm:p-8 flex flex-col max-h-[85vh]">
          <div className="flex justify-between items-center pb-4 border-b border-sand-200">
            <h3 className="text-base sm:text-lg font-bold text-sand-900 font-serif">Syarat dan Ketentuan Layanan</h3>
            <button onClick={() => setModal(null)} className="text-stone-400 hover:text-sand-900 text-2xl px-2">&times;</button>
          </div>
          <div className="overflow-y-auto py-4 text-xs text-stone-600 space-y-4 leading-relaxed pr-2">
            <p><strong>1. Cakupan Layanan:</strong> Karsa Studio menyediakan paket materi tertulis berupa naskah video pendek, takarir media sosial, artikel blog SEO, shot-list visual, dan riset kompetitor.</p>
            <p><strong>2. SLA Pengiriman:</strong> Seluruh berkas diserahkan maksimal dalam kurun waktu 1x24 jam kerja sejak pembayaran terverifikasi dan detail brief lengkap diterima.</p>
            <p><strong>3. Hak Cipta:</strong> Hak kepemilikan komersial 100% dialihkan kepada klien saat penyerahan berkas selesai.</p>
            <p><strong>4. Kebijakan Revisi:</strong> Penyesuaian materi tanpa biaya tambahan dilayani dalam jangka waktu 48 jam sejak berkas Notion diserahkan.</p>
          </div>
          <div className="pt-4 border-t border-sand-200 text-right">
            <button onClick={() => setModal(null)} className="w-full sm:w-auto px-5 py-3 bg-sand-900 text-sand-50 text-xs rounded-lg font-medium min-h-[44px]">Tutup</button>
          </div>
        </div>
      </Modal>

      {/* MODAL: PRIVACY */}
      <Modal open={modal === "privacy"} onClose={() => setModal(null)} maxWidth="max-w-2xl">
        <div className="p-6 sm:p-8 flex flex-col max-h-[85vh]">
          <div className="flex justify-between items-center pb-4 border-b border-sand-200">
            <h3 className="text-base sm:text-lg font-bold text-sand-900 font-serif">Kebijakan Privasi Data</h3>
            <button onClick={() => setModal(null)} className="text-stone-400 hover:text-sand-900 text-2xl px-2">&times;</button>
          </div>
          <div className="overflow-y-auto py-4 text-xs text-stone-600 space-y-4 leading-relaxed pr-2">
            <p><strong>1. Penggunaan Informasi:</strong> Data brief bisnis, alamat email, dan nomor kontak yang diinput hanya dimanfaatkan untuk memproduksi konten dan mengirimkan pemberitahuan pesanan.</p>
            <p><strong>2. Kerahasiaan Brief:</strong> Kami tidak membagikan rincian strategi, target pasar, atau identitas kompetitor klien kepada pihak ketiga mana pun.</p>
            <p><strong>3. Retensi File:</strong> Ruang kerja Notion dicadangkan di server privat selama 90 hari kalender agar klien dapat mengakses ulang arsip mereka bila diperlukan.</p>
          </div>
          <div className="pt-4 border-t border-sand-200 text-right">
            <button onClick={() => setModal(null)} className="w-full sm:w-auto px-5 py-3 bg-sand-900 text-sand-50 text-xs rounded-lg font-medium min-h-[44px]">Tutup</button>
          </div>
        </div>
      </Modal>

      {/* MODAL: CONTACT */}
      <Modal open={modal === "contact"} onClose={() => setModal(null)} maxWidth="max-w-md">
        <div className="p-6 sm:p-8 text-left">
          <div className="flex justify-between items-center pb-4 border-b border-sand-200">
            <h3 className="text-base sm:text-lg font-bold text-sand-900 font-serif">Bantuan &amp; Kontak Support</h3>
            <button onClick={() => setModal(null)} className="text-stone-400 hover:text-sand-900 text-2xl px-2">&times;</button>
          </div>
          <div className="py-4 space-y-3 text-xs text-stone-600">
            <p>Pertanyaan seputar brief atau konfirmasi transfer dapat langsung diajukan melalui kanal operasional kami:</p>

            <div className="p-3 bg-sand-50 border border-sand-200 rounded-xl space-y-2 font-mono text-[11px] sm:text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sand-900 shrink-0" />
                <span className="text-sand-900 font-semibold break-all">support@karsa.studio</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-sand-900 shrink-0" />
                <span className="text-sand-900 font-semibold">+62 812-8800-9920</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-stone-500">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Setiap Hari: 08.00 &ndash; 21.00 WIB</span>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-sand-200 flex flex-col sm:flex-row justify-end gap-2">
            <a href="https://wa.me/6281288009920" target="_blank" rel="noopener noreferrer" className="px-4 py-3 bg-sand-900 hover:bg-stone-800 text-sand-50 text-xs rounded-lg font-medium flex items-center justify-center gap-1.5 min-h-[44px]">
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}
