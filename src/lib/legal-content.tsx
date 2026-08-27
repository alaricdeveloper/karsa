import type { ReactNode } from "react";

export type LegalClause = {
  id: string;
  num: string;
  label: string;
  heading: string;
  searchText: string;
  body: ReactNode;
};

// Klausa Kebijakan Privasi (privacy page) — diekstrak dari versi monolit.
export const PRIVACY_CLAUSES: LegalClause[] = [
  {
    id: "bab-1",
    num: "BAB 01",
    label: "Ruang Lingkup &amp; Komitmen Privasi",
    heading: "1. Prinsip Perlindungan Data Karsa",
    searchText: "BAB 01 Ruang Lingkup Komitmen Privasi Prinsip Perlindungan Data Karsa Studio usekarsa.co",
    body: (
      <><p>
                      Karsa Studio (<span className="font-mono text-xs font-bold">usekarsa.co</span>) memegang
                      komitmen tertinggi dalam menjaga integritas, kerahasiaan, dan
                      keamanan informasi pribadi serta data komersial bisnis yang
                      dipercayakan oleh Klien.
                    </p>
                    <p>
                      Kebijakan Privasi ini menjelaskan secara transparan bagaimana
                      kami mengumpulkan, mengelola, memproses, menyimpan, dan
                      melindungi data pribadi sesuai ketentuan{" "}
                      <strong>
                        Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data
                        Pribadi (UU PDP)
                      </strong>
                      .
                    </p></>
    ),
  },
  {
    id: "bab-2",
    num: "BAB 02",
    label: "Kategori Data yang Dikumpulkan",
    heading: "2. Data yang Kami Peroleh dari Klien",
    searchText: "BAB 02 Kategori Data Dikumpulkan Data Peroleh Klien Identitas Akun Pribadi Parameter Brief Bisnis Transaksi Pembayaran",
    body: (
      <><p>
                      Kami hanya mengumpulkan data yang mutlak diperlukan untuk
                      mengeksekusi penyusunan 30 naskah konten dan pengiriman
                      deliverables:
                    </p>
                    <div className="space-y-2.5 font-mono text-xs mt-2">
                      <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                        <strong className="text-ink block font-bold">
                          A. Data Identitas & Akun Pribadi
                        </strong>
                        <p className="font-sans text-inkMuted mt-0.5">
                          Nama lengkap, nama display, alamat email aktif, nomor
                          WhatsApp terverifikasi, dan foto profil/avatar akun.
                        </p>
                      </div>
                      <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                        <strong className="text-ink block font-bold">
                          B. Data Parameter Brief Bisnis
                        </strong>
                        <p className="font-sans text-inkMuted mt-0.5">
                          Nama brand/produk, kategori industri, rentang harga
                          produk, target audiens spesifik, profil masalah konsumen,
                          dan nama 1 akun kompetitor acuan.
                        </p>
                      </div>
                      <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                        <strong className="text-ink block font-bold">
                          C. Data Transaksi & Pembayaran
                        </strong>
                        <p className="font-sans text-inkMuted mt-0.5">
                          Nomor invoice pesanan (<span className="font-mono font-bold text-terracotta">INV-XXXXXX</span>),
                          metode pembayaran (QRIS/VA), tanggal/waktu transaksi, dan
                          status verifikasi bayar. Kami <em>tidak pernah</em>{" "}
                          menyimpan nomor kartu kredit atau PIN m-Banking Klien.
                        </p>
                      </div>
                    </div></>
    ),
  },
  {
    id: "bab-3",
    num: "BAB 03",
    label: "Tujuan Pemrosesan Data",
    heading: "3. Landasan &amp; Pemanfaatan Data",
    searchText: "BAB 03 Tujuan Pemrosesan Data Landasan Pemanfaatan Data",
    body: (
      <><p>
                      Informasi yang diberikan Klien diproses secara sah untuk
                      tujuan:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-inkMuted font-sans">
                      <li>
                        Memetakan 4 pilar sudut pesan diferensiasi brand dan
                        menyusun 30 naskah video pendek kata-per-kata.
                      </li>
                      <li>
                        Membuat database ruang kerja Notion Content OS dan mengatur
                        hak akses Customer Hub.
                      </li>
                      <li>
                        Mengirimkan notifikasi status SLA pengerjaan, berkas invoice
                        resmi, dan tautan duplikasi via Email atau WhatsApp.
                      </li>
                      <li>
                        Memverifikasi transaksi keuangan bersama mitra payment
                        gateway resmi berlisensi Bank Indonesia.
                      </li>
                    </ul></>
    ),
  },
  {
    id: "bab-4",
    num: "BAB 04",
    label: "Kerahasiaan Brief &amp; Isolasi AI Engine",
    heading: "4. Perlakuan Data pada Sistem AI",
    searchText: "BAB 04 Kerahasiaan Brief Isolasi AI Engine Perlakuan Data Sistem AI Zero AI Training",
    body: (
      <><p>
                      Dalam proses drafting naskah, data brief Klien diproses
                      melalui infrastruktur <em>enterprise API</em> terisolasi.
                    </p>
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl font-mono text-xs space-y-1 text-inkMuted">
                      <strong className="text-ink font-bold block">
                        Zero AI Training Clause:
                      </strong>
                      <p className="font-sans text-xs sm:text-sm">
                        Parameter brief, rahasia dagang, strategi margin, dan nama
                        produk Klien{" "}
                        <strong>
                          tidak digunakan untuk melatih model AI publik (*zero
                          training retention*)
                        </strong>
                        . Data Klien bersifat privat dan hanya digunakan untuk
                        merancang kalender konten milik Klien bersangkutan.
                      </p>
                    </div></>
    ),
  },
  {
    id: "bab-5",
    num: "BAB 05",
    label: "Keamanan &amp; Enkripsi Data",
    heading: "5. Proteksi Teknis &amp; Operasional",
    searchText: "BAB 05 Keamanan Enkripsi Data Proteksi Teknis Operasional",
    body: (
      <><p>
                      Kami menerapkan standar keamanan berlapis untuk mencegah akses
                      tidak sah:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-inkMuted font-sans">
                      <li>
                        <strong>Enkripsi Transit:</strong> Seluruh lalu lintas data di{" "}
                        <span className="font-mono text-xs font-bold">usekarsa.co</span>{" "}
                        dilindungi enkripsi SSL/TLS 256-bit standar industri
                        perbankan.
                      </li>
                      <li>
                        <strong>Enkripsi Database:</strong> Informasi akun dan pesanan
                        disimpan dalam infrastruktur basis data terenkripsi
                        (*encryption at rest*).
                      </li>
                      <li>
                        <strong>Akses Terbatas:</strong> Hanya tim copywriter dan
                        kurator QC yang memiliki otorisasi tugas yang dapat mengakses
                        detail brief naskah.
                      </li>
                    </ul></>
    ),
  },
  {
    id: "bab-6",
    num: "BAB 06",
    label: "Pembagian Data Pihak Ketiga",
    heading: "6. Komitmen Nol Penjualan Data",
    searchText: "BAB 06 Pembagian Data Pihak Ketiga Komitmen Nol Penjualan",
    body: (
      <><p>
                      Karsa Studio{" "}
                      <strong>
                        tidak pernah dan tidak akan pernah menjual, menyewakan, atau
                        memperdagangkan data pribadi Klien
                      </strong>{" "}
                      kepada pihak ketiga, pengiklan, atau broker data mana pun.
                    </p>
                    <p>
                      Data hanya dibagikan secara terbatas kepada mitra
                      infrastruktur esensial berikut:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-inkMuted font-sans">
                      <li>
                        <strong>Payment Gateway:</strong> Untuk penerbitan kode QRIS
                        dinamis dan verifikasi Virtual Account otomatis.
                      </li>
                      <li>
                        <strong>Infrastruktur Hosting & Database:</strong> Penyedia
                        server cloud dengan standar keamanan SOC2 Type II.
                      </li>
                    </ul></>
    ),
  },
  {
    id: "bab-7",
    num: "BAB 07",
    label: "Hak Subjek Data Klien (UU PDP)",
    heading: "7. Hak Kendali Penuh Klien",
    searchText: "BAB 07 Hak Subjek Data Klien UU PDP Kendali Penuh Akses Portabilitas Pembaruan Penghapusan Penarikan Persetujuan",
    body: (
      <><p>
                      Sesuai dengan UU PDP Nomor 27 Tahun 2022, Klien memiliki hak
                      penuh untuk:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-1">
                      <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                        <strong className="text-ink block font-sans font-bold">
                          Hak Akses & Portabilitas
                        </strong>
                        <span className="text-inkMuted text-xs">
                          Meminta salinan data brief dan naskah milik akun Anda.
                        </span>
                      </div>
                      <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                        <strong className="text-ink block font-sans font-bold">
                          Hak Pembaruan Data
                        </strong>
                        <span className="text-inkMuted text-xs">
                          Mengubah profil dan nomor kontak di Pengaturan Profil.
                        </span>
                      </div>
                      <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                        <strong className="text-ink block font-sans font-bold">
                          Hak Penghapusan (Erasure)
                        </strong>
                        <span className="text-inkMuted text-xs">
                          Meminta penghapusan permanen riwayat akun dari basis data.
                        </span>
                      </div>
                      <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                        <strong className="text-ink block font-sans font-bold">
                          Hak Penarikan Persetujuan
                        </strong>
                        <span className="text-inkMuted text-xs">
                          Membatalkan izin penerimaan notifikasi operasional berkala.
                        </span>
                      </div>
                    </div></>
    ),
  },
  {
    id: "bab-8",
    num: "BAB 08",
    label: "Retensi &amp; Masa Simpan Data",
    heading: "8. Jangka Waktu Penyimpanan",
    searchText: "BAB 08 Retensi Masa Simpan Data Jangka Waktu Penyimpanan",
    body: (
      <><p>
                      Data riwayat naskah dan duplikasi Notion disimpan di Customer
                      Hub selama akun Klien aktif, guna memudahkan Klien mengakses
                      kembali arsip kalender konten di masa depan.
                    </p>
                    <p>
                      Jika Klien mengajukan permohonan penutupan akun, seluruh data
                      identitas dan arsip brief akan dihapus secara permanen dari
                      server aktif dalam waktu maksimal{" "}
                      <strong>14 hari kerja</strong>.
                    </p></>
    ),
  },
  {
    id: "bab-9",
    num: "BAB 09",
    label: "Penggunaan Cookies &amp; Analitik",
    heading: "9. Teknologi Penyimpanan Lokal",
    searchText: "BAB 09 Penggunaan Cookies Analitik Teknologi Penyimpanan Lokal",
    body: (
      <><p>
                      Kami menggunakan <em>Local Storage</em> browser dan cookies
                      fungsional untuk menyimpan preferensi sesi login dan data Brand
                      Vault lokal pengguna. Kami tidak menggunakan cookies pihak
                      ketiga yang bersifat melacak (*cross-site invasive tracking*).
                    </p></>
    ),
  },
  {
    id: "bab-10",
    num: "BAB 10",
    label: "Kontak Petugas Pelindungan Data (DPO)",
    heading: "10. Saluran Resmi Permohonan Data",
    searchText: "BAB 10 Kontak Petugas Pelindungan Data DPO Saluran Resmi Permohonan",
    body: (
      <><p>
                      Untuk mengajukan hak penghapusan data, pertanyaan privasi,
                      atau permintaan klarifikasi, hubungi Petugas Pelindungan Data
                      resmi kami melalui:
                    </p>
                    <div className="p-4 bg-canvas rounded-2xl border-2 border-ink font-mono text-xs space-y-1.5 text-inkMuted shadow-brutal-sm">
                      <p>
                        <strong>Email Tim Privasi:</strong>{" "}
                        hello.usekarsa@gmail.com
                      </p>
                      <p>
                        <strong>WhatsApp Data Officer:</strong> +62 812-8800-9920
                      </p>
                      <p>
                        <strong>Entitas Layanan:</strong> Karsa Studio Indonesia (
                        <span className="font-mono font-bold">usekarsa.co</span>)
                      </p>
                    </div></>
    ),
  },
];
