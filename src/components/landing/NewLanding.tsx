"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CalendarRange,
  Camera,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronDown,
  Clapperboard,
  ClipboardPenLine,
  Clock3,
  Eye,
  Mail,
  Menu,
  MessageCircle,
  MessagesSquare,
  Mic,
  PackageCheck,
  PenTool,
  Play,
  Plus,
  Radar,
  Repeat2,
  ScanSearch,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Store,
  Sun,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { generateOrderId } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const GOAL_OPTIONS = ["Edukasi & Awareness", "Leads & DM", "Penjualan Produk", "Positioning Brand", "Campuran"];
const TONE_OPTIONS = ["Edukasi & Tepercaya", "Santai & Conversational", "Bold & Direct", "Premium & Minimal", "Belum Yakin"];
const inputClassName =
  "w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-3 text-base sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-sans min-h-[46px]";

const MARQUEE_ITEMS = [
  "Kopi & Roastery",
  "Skincare Lokal",
  "Fashion Apparel",
  "Katering Harian",
  "Studio Interior",
  "Klinik Kecantikan",
  "Gym & Wellness",
  "Pastry & Bakery",
  "Batik Nusantara",
  "Bimbel Online",
  "Pet Grooming",
  "Mebel Jepara",
];

const FAQ_ITEMS: { q: string; a: string }[] = [
  { q: "Bagaimana format berkas yang akan saya terima?", a: "Kamu akan menerima tautan Notion Workspace terstruktur per hari (Day 01 hingga Day 30), lengkap dengan jadwal posting, video script kata-per-kata, caption AIDA, dan shot-list B-Roll. Kami juga menyertakan file cadangan Google Docs (.docx)." },
  { q: "Apakah saya harus merekam videonya sendiri?", a: "Ya. Karsa menyediakan video script kata-per-kata per detik yang siap dibaca langsung di teleprompter ponsel kamu. Kamu atau tim cukup berbicara di depan kamera HP mengikuti panduan visual dan intonasi yang telah kami siapkan." },
  { q: "Bagaimana jika ada naskah yang kurang cocok (Garansi Revisi)?", a: "Kami menyediakan garansi kalibrasi pesan selama 48 jam. Jika ada istilah teknis atau nada bicara yang ingin disesuaikan dengan persona brand kamu, tim kami akan memperbarui Notion dalam kurun waktu 12 jam kerja." },
  { q: "Bagaimana hak cipta dan kepemilikan materi konten?", a: "Hak pakai komersial materi menjadi milik kamu setelah dokumen diserahterimakan. Kamu bebas mempublikasikan, memodifikasi, atau menggunakannya sebagai materi promosi brand." },
  { q: "Berapa lama waktu pengerjaan dari pengisian brief (SLA)?", a: "Standar SLA pengiriman adalah maksimal 1x24 jam kerja. Waktu ini digunakan untuk memproses brief, menyusun naskah kata-per-kata, dan menjalankan kurasi kualitas sebelum link Notion dikirimkan ke email kamu." },
  { q: "Apakah ini sistem langganan yang memotong saldo otomatis?", a: "Bukan langganan mengikat dan tidak ada auto-debit. Kamu hanya membayar flat Rp299.000 per batch saat membutuhkan kalender konten 30 hari yang baru. Tidak ada biaya tersembunyi di bulan berikutnya." },
  { q: "Bagaimana jika industri bisnis saya sangat unik / niche?", a: "Di formulir brief, kamu dapat mencantumkan deskripsi produk sedetail mungkin dan menyertakan 1 akun kompetitor rujukan. Tim kami akan membedah target audiens dan pain point spesifik produkmu, apa pun industrinya." },
  { q: "Metode pembayaran apa saja yang didukung?", a: "Kami menerima pembayaran instan via QRIS serta Virtual Account dari bank utama di Indonesia. Detail metode pembayaran akan muncul di halaman checkout." },
  { q: "Apakah naskah ini bisa dipakai untuk iklan berbayar (Meta/TikTok Ads)?", a: "Sangat bisa. Struktur video script kami menggunakan pola hook psikologis dan direct CTA yang teruji menghasilkan Click-Through-Rate (CTR) tinggi saat dialihkan menjadi materi iklan berbayar." },
  { q: "Bagaimana jika pengiriman melebihi 24 jam kerja?", a: "Jika terjadi keterlambatan dari sisi tim internal kami, kamu akan mendapatkan 5 naskah video tambahan sebagai kompensasi sesuai kebijakan SLA." },
  { q: "Apa yang harus saya siapkan sebelum mengisi brief?", a: "Siapkan deskripsi produk, target pembeli, rentang harga, satu kompetitor acuan, dan contoh tone yang kamu suka. Semakin jelas konteksnya, semakin spesifik arah naskah yang bisa kami susun." },
  { q: "Apakah gaya bahasa bisa disesuaikan dengan brand saya?", a: "Bisa. Pilihan tone di brief menjadi acuan awal, lalu kamu bisa menjelaskan istilah, kata yang harus dihindari, dan cara brand kamu berbicara kepada audiens." },
  { q: "Berapa banyak penyesuaian yang termasuk dalam garansi?", a: "Garansi berfokus pada kalibrasi istilah produk, tone, dan sudut pesan yang kurang sesuai dengan brief. Untuk kebutuhan yang berubah jauh dari konteks awal, hubungi tim agar cakupannya bisa disepakati lebih dulu." },
  { q: "Kapan hitungan SLA 1x24 jam kerja dimulai?", a: "SLA mulai dihitung setelah brief terisi lengkap dan pembayaran terkonfirmasi. Jika ada informasi penting yang belum jelas, kami akan menghubungi kamu sebelum proses penulisan dimulai." },
  { q: "Apakah naskah bisa dipakai untuk LinkedIn, YouTube long-form, atau X/Threads?", a: "Kalender 30 hari difokuskan ke short-form (TikTok, Reels, Shorts) karena ROI tercepat untuk UMKM. Untuk LinkedIn atau YouTube, angle dan struktur naskah tetap bisa dipakai — bonus Content Repurposing Framework kami menjelaskan cara mengubah satu naskah menjadi beberapa format." },
  { q: "Apa bedanya Karsa dengan jasa konten bulanan atau agensi?", a: "Agensi biasanya kontrak bulanan Rp5-20 juta dan mengerjakan produksi secara menyeluruh. Karsa menjual satu sistem konten sekali bayar: riset, naskah, caption, SEO, dan template produksi — kamu yang merekam dan memposting. Lebih murah, tanpa kontrak, dan brand voice tetap di tangan kamu." },
  { q: "Apakah tersedia invoice dan faktur pajak?", a: "Ya. Setiap pembelian menghasilkan halaman invoice yang bisa dicetak atau diunduh. Untuk kebutuhan faktur pajak badan usaha, hubungi kami lewat email setelah checkout dan kami bantu prosesnya." },
  { q: "Bagaimana cara mengakses Notion Content OS?", a: "Kamu menerima tautan duplicate 1-klik — salin ke akun Notion kamu, lalu seluruh database (kalender, script, caption, SEO) siap dipakai. Panduan pemakaian 3 menit disertakan, dan semua file juga dikirim dalam format Docs/Markdown sebagai cadangan." },
  { q: "Apakah konten harus berbahasa Indonesia?", a: "Default konten ditulis dalam Bahasa Indonesia. Jika target pasar kamu membutuhkan bahasa Inggris atau campuran (seperti dialek Jawa, Sunda, atau istilah daerah), jelaskan di brief dan kami sesuaikan." },
  { q: "Apakah saya harus tampil di depan kamera?", a: "Tidak wajib. Banyak customer memakai format voiceover + B-Roll produk (tangan saja yang muncul), atau mempercayakan rekaman ke satu anggota tim. Panduan B-Roll kami menyediakan shot list untuk format tanpa wajah." },
  { q: "Bagaimana teknis pengajuan revisi kalibrasi?", a: "Kirim permintaan lewat form di Member Workspace atau balas email pengiriman. Sebutkan nomor Day dan bagian yang ingin disesuaikan (istilah, tone, sudut pesan). Tim kami memperbarui langsung di Notion kamu maksimal 12 jam kerja." },
  { q: "Apakah ada garansi uang kembali?", a: "Jika setelah kalibrasi 48 jam ternyata output tidak sesuai scope yang dijanjikan di halaman Jaminan SLA, hubungi kami — kami akan mengevaluasi dan menyelesaikannya, termasuk opsi pengembalian sesuai ketentuan kebijakan refund." },
  { q: "Bisa beli untuk beberapa brand sekaligus?", a: "Bisa. Setiap brand dihitung sebagai satu batch terpisah dengan brief masing-masing. Diskon paket 3 batch berlaku lintas brand, jadi kamu bisa mengelola 3 brand sekaligus dengan satu pembelian." },
  { q: "Kapan waktu terbaik untuk mulai?", a: "Hari ini. Batch diproses maksimal 24 jam kerja setelah pembayaran terkonfirmasi, jadi konten bisa mulai direkam minggu ini juga. Banyak customer memulai di awal bulan agar ritme 30 hari sejalan dengan jadwal produksi mereka." },
];

const TESTIMONI = [
  { name: "Rani A.", role: "Owner kedai kopi, Bandung", initial: "RA", bg: "bg-wasabi", quote: "\u201CDulu tiap hari Jumat aku buka laptop, stare 2 jam, hasilnya nol. Sekarang script tinggal dibaca di teleprompter. Minggu pertama langsung 12 video keposting.\u201D", dark: false },
  { name: "Salsa D.", role: "Founder skincare lokal, Surabaya", initial: "SD", bg: "bg-sunflower", quote: "\u201C4 artikel SEO-nya yang bikin beda. Artikel blog kami akhirnya muncul di halaman 1 Google untuk kata kunci 'skincare untuk kulit sensitif'. Traffic organik naik tiap bulan.\u201D", dark: false },
  { name: "Fajar P.", role: "Brand apparel, Yogyakarta", initial: "FP", bg: "bg-terracotta text-white", quote: "\u201CAwalnya ragu karena ini sistem, bukan jasa lengkap. Ternyata justru itu kelebihannya — kami tetap pegang kendali, tapi tidak mulai dari nol. Batch kedua langsung kami pesan.\u201D", dark: false },
  { name: "Dewi W.", role: "Katering harian, Jakarta", initial: "DW", bg: "bg-wasabi", quote: "\u201CKami bisnis katering, tidak ada yang jago kamera. Panduan B-Roll-nya bikin tim dapur bisa rekam sendiri. Konten jadi jauh lebih hidup dari sekadar foto menu.\u201D", dark: false },
  { name: "Hendra T.", role: "Bimbel online, Semarang", initial: "HT", bg: "bg-sunflower", quote: "\u201CYang saya suka: caption-nya bukan template kosong. Semua merujuk ke brief kami, ada kata-kata yang memang dipakai siswa kami. Terasa personal.\u201D", dark: false },
  { name: "Nadia K.", role: "Studio interior, Malang", initial: "NK", bg: "bg-wasabi", quote: "\u201CAudit kompetitor-nya jujur banget. Kami jadi tahu konten apa yang belum digarap kompetitor. Bulan ini DM bertanya harga produk naik 3x lipat.\u201D", dark: true },
];

const SAMPLE_DATA: Record<
  string,
  { title: string; niche: string; body: React.ReactNode }[]
> = {
  script: [
    {
      title: "[Contoh 1] Day 04 — Edukasi Solusi Nilai Produk",
      niche: "Niche: Artisan Roastery (F&B)",
      body: (
        <>
          <div><strong className="text-terracotta font-mono text-xs block mb-1">[VISUAL HOOK 00:00 - 00:03]</strong><p>Talent menuang kopi instan ke gelas tapi langsung menggumpal di dasar. Ekspresi heran.</p></div>
          <div className="mt-2"><strong className="text-ink font-mono text-xs block mb-1">[AUDIO / VOICEOVER]</strong><p>"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk? Ini alasan ilmiahnya..."</p></div>
          <div className="mt-2"><strong className="text-ink font-mono text-xs block mb-1">[VALUE & SOLUTION 00:04 - 00:20]</strong><p>Tunjukkan biji kopi cold brew asli. Jelaskan kadar asam yang 70% lebih rendah dibanding metode roasting konvensional.</p></div>
          <div className="mt-2"><strong className="text-terracotta font-mono text-xs block mb-1">[CALL TO ACTION 00:21 - 00:25]</strong><p>"Cek link di bio untuk coba sampler pack khusus lambung sensitif minggu ini."</p></div>
        </>
      ),
    },
    {
      title: "[Contoh 2] Day 09 — Myth Busting Skincare",
      niche: "Niche: D2C Skincare",
      body: (
        <>
          <div><strong className="text-terracotta font-mono text-xs block mb-1">[VISUAL HOOK 00:00 - 00:03]</strong><p>Talent mengoleskan 5 layer serum sekaligus ke wajah secara berlebihan, lalu membuat gestur 'stop'.</p></div>
          <div className="mt-2"><strong className="text-ink font-mono text-xs block mb-1">[AUDIO / VOICEOVER]</strong><p>"Makin banyak layer serum bikin skin barrier makin cepet sembuh? Kulit tidak bekerja seperti spons cuci piring."</p></div>
          <div className="mt-2"><strong className="text-ink font-mono text-xs block mb-1">[VALUE & SOLUTION 00:04 - 00:20]</strong><p>Perlihatkan tekstur Ceramide Barrier Gel yang menggabungkan 3 fungsi dalam 1 formula ringan.</p></div>
          <div className="mt-2"><strong className="text-terracotta font-mono text-xs block mb-1">[CALL TO ACTION 00:21 - 00:25]</strong><p>"Ketik 'BARRIER' di DM buat dapet panduan formulasi yang pas sesuai jenis kulitmu."</p></div>
        </>
      ),
    },
  ],
  caption: [
    {
      title: "[Contoh 1] Caption Instagram — F&B Coffee",
      niche: "Niche: Artisan Roastery",
      body: (
        <p className="leading-relaxed">
          Bukan kopi kamu yang salah. Cara ekstraksinya yang bikin lambung 'protes' tiap jam 2 siang. 👇<br /><br />
          Sebagian besar produsen mempercepat proses roasting dengan suhu ekstrem yang mengunci asam klorogenat berlebih.<br /><br />
          Metode slow-drip 12 jam kami memecah senyawa ini secara alami. Kafein tetap optimal tanpa drama asam lambung naik.<br /><br />
          📌 Simpan postingan ini untuk rekomendasi ngopi aman besok pagi!
        </p>
      ),
    },
    {
      title: "[Contoh 2] Caption Instagram — Skincare",
      niche: "Niche: D2C Skincare",
      body: (
        <p className="leading-relaxed">
          Kulit kamu lagi kemerahan setelah ganti produk? Jangan langsung panik borong 4 toner baru. 🛑<br /><br />
          Saat skin barrier rusak, hal paling penting adalah 'puasa aktif' dan fokus ke lipid seimbang: Ceramide &amp; Fatty Acids.<br /><br />
          💬 Bagikan pengalaman kamu di kolom komentar, apa pemicu breakout terbesar kulitmu bulan ini?
        </p>
      ),
    },
  ],
  seo: [
    {
      title: "[Contoh 1] Kerangka Artikel SEO F&B",
      niche: "Target Keyword: cara memilih kopi untuk lambung",
      body: (
        <>
          <h4 className="font-bold text-ink text-sm">H1: Panduan Lengkap Memilih Biji Kopi yang Aman untuk Asam Lambung</h4>
          <p className="text-xs text-stone-500 font-mono">Vol: 2.400/bln | Intent: Edukatif</p>
          <div className="pl-3 border-l-2 border-ink space-y-1 text-xs text-stone-700 mt-2">
            <p><strong>H2: Apa yang Menyebabkan Kopi Memicu Maag?</strong></p>
            <p><strong>H2: 3 Ciri Kopi Low-Acid yang Wajib Kamu Perhatikan</strong></p>
            <p><strong>H2: Cold Brew vs Americano: Mana yang Lebih Ramah di Perut?</strong></p>
          </div>
        </>
      ),
    },
    {
      title: "[Contoh 2] Kerangka Artikel SEO Skincare",
      niche: "Target Keyword: cara memperbaiki skin barrier rusak",
      body: (
        <>
          <h4 className="font-bold text-ink text-sm">H1: 5 Tanda Skin Barrier Rusak dan Cara Mengatasinya dalam 14 Hari</h4>
          <p className="text-xs text-stone-500 font-mono">Vol: 4.100/bln | Intent: Solusi Kulit</p>
          <div className="pl-3 border-l-2 border-ink space-y-1 text-xs text-stone-700 mt-2">
            <p><strong>H2: Ciri-ciri Skin Barrier Rusak yang Sering Salah Didiagnosis</strong></p>
            <p><strong>H2: Kandungan Skincare yang Wajib Dihindari Sementara Waktu</strong></p>
          </div>
        </>
      ),
    },
  ],
};

const PROOFS = [
  { brand: "Brand Skincare Lokal", location: "Surabaya", time: "3 menit lalu" },
  { brand: "Kedai Kopi Artisan", location: "Jakarta Selatan", time: "11 menit lalu" },
  { brand: "Studio Interior", location: "Bandung", time: "24 menit lalu" },
  { brand: "Apparel Streetwear", location: "Yogyakarta", time: "42 menit lalu" },
];

const SECTORS = [
  { dot: "bg-amber-500", title: "F&B & Cafe", sub: "Menu, review, edukasi." },
  { dot: "bg-pink-500", title: "Skincare & Beauty", sub: "Ingredient, myth-busting." },
  { dot: "bg-indigo-500", title: "Fashion & Apparel", sub: "Styling, fit, detail bahan." },
  { dot: "bg-emerald-500", title: "Jasa & Edukasi", sub: "Konsultan, klinik, les." },
];

const GOALS = [
  { title: "Edukasi & Awareness", sub: "Buat audiens lebih paham.", href: "#isi-harian" },
  { title: "Leads & DM", sub: "Arahkan percakapan baru.", href: "#order" },
  { title: "Penjualan Produk", sub: "Perjelas value dan CTA.", href: "#order" },
  { title: "Cek Kecocokan", sub: "Lihat apakah Karsa untukmu.", href: "#cocok-untuk" },
];

const PRINCIPLES = [
  { title: "Prinsip 01 — Satu video, satu pesan", body: "Video yang mencoba menjelaskan 5 hal sekaligus akan diingat 0 hal. Pilih satu pesan per video, lalu pertahankan hook, konten, dan CTA-nya agar sejalan dengan pesan itu. Kalender Karsa menyusun 30 pesan berbeda sehingga feed kamu tidak berulang." },
  { title: "Prinsip 02 — Hook itu janji, bukan clickbait", body: "Clickbait menjanjikan sesuatu yang tidak ada — penonton pergi di detik ke-4 dan algoritma menghukum retention-mu. Hook yang jujur menjanjikan jawaban yang memang akan kamu berikan. Itu bedanya video yang di-save dan video yang di-skip." },
  { title: "Prinsip 03 — Jual masalah sebelum produk", body: "Orang tidak membeli produk; mereka membeli penyelesaian masalah yang sudah mereka rasakan. Buka masalahnya lebih dulu (kenapa ini mengganggu), lalu tawarkan solusimu sebagai jawaban. Produk yang dipasarkan seperti ini terasa relevan, bukan memaksa." },
  { title: "Prinsip 04 — Konsistensi mengalahkan viral", body: "Satu video 1 juta views tidak membangun toko. Tapi 30 video dengan 5.000 views yang konsisten — dengan pesan yang sama — membangun kepercayaan, pengikut, dan penjualan. Algoritma juga memberi bobot pada akun yang rutin memposting." },
  { title: "Prinsip 05 — Data mengalahkan perasaan", body: "\u201CMenurutku video ini bagus\u201D bukan metrik. Simpan (saves), waktu tonton, dan DM masuk — itulah data yang menentukan format mana yang diperbanyak di minggu berikutnya. Template produksi mingguan kami menyisihkan 30 menit khusus untuk membaca data ini." },
];

export function NewLanding() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<Record<string, boolean>>({});
  const [hours, setHours] = useState(6);
  const [agencyPrice, setAgencyPrice] = useState(3500000);
  const [category, setCategory] = useState("script");
  const [sampleIdx, setSampleIdx] = useState(0);
  const [faqQuery, setFaqQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toast, setToast] = useState<{ brand: string; time: string } | null>(null);
  const [stickyHidden, setStickyHidden] = useState(false);
  const proofIdx = useRef(0);
  const proofShown = useRef(false);
  const [form, setForm] = useState({
    brand: "", category: CATEGORIES[0], competitor: "", description: "",
    goal: GOAL_OPTIONS[0], tone: TONE_OPTIONS[0], channel: "", email: "", phone: "",
  });
  const [formStatus, setFormStatus] = useState("");

  // Count-up stats
  useEffect(() => {
    const els = document.querySelectorAll("[data-count]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      els.forEach((el) => {
        const target = parseFloat((el as HTMLElement).dataset.count || "0");
        (el as HTMLElement).textContent = target.toLocaleString("id-ID") + ((el as HTMLElement).dataset.suffix || "");
      });
      return;
    }
    els.forEach((el) => {
      const target = parseFloat((el as HTMLElement).dataset.count || "0");
      const suffix = (el as HTMLElement).dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        (el as HTMLElement).textContent = val.toLocaleString("id-ID") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, []);

  // Social proof toast — hanya muncul setelah user scroll (tidak menimpa hero)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canShow = () => window.scrollY > Math.min(window.innerHeight * 0.6, 900);
    const showProof = () => {
      const data = PROOFS[proofIdx.current % PROOFS.length];
      setToast({ brand: `${data.brand} (${data.location})`, time: `Baru memesan batch 30 hari • ${data.time}` });
      window.setTimeout(() => setToast(null), 4500);
      proofIdx.current += 1;
    };
    const showOnce = () => {
      if (canShow() && !proofShown.current) {
        proofShown.current = true;
        showProof();
        window.removeEventListener("scroll", showOnce);
      }
    };
    window.addEventListener("scroll", showOnce, { passive: true });
    const fallback = window.setTimeout(showOnce, 15000);
    const rotation = window.setInterval(() => {
      if (proofShown.current) showProof();
    }, 12000);
    return () => {
      window.removeEventListener("scroll", showOnce);
      window.clearTimeout(fallback);
      window.clearInterval(rotation);
    };
  }, []);

  // Sticky CTA — sembunyi saat section order terlihat
  useEffect(() => {
    const order = document.getElementById("order");
    if (!order) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setStickyHidden(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    observer.observe(order);
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);
  const savedHours = hours * 4;
  const netSavings = agencyPrice - 299000;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormStatus("");
    if (!form.brand.trim() || !form.description.trim() || !form.email.trim() || !form.phone.trim()) {
      setFormStatus("Lengkapi semua kolom wajib terlebih dahulu.");
      return;
    }
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const orderId = generateOrderId();
      const orderData = {
        orderId,
        brand: form.brand.trim(),
        category: form.category,
        competitor: form.competitor.trim(),
        description: form.description.trim(),
        goal: form.goal,
        tone: form.tone,
        channel: form.channel.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        timestamp: new Date().toISOString(),
        status: "IN_PROGRESS",
      };
      localStorage.setItem("omni_order_" + orderId, JSON.stringify(orderData));
      localStorage.setItem("karsa_checkout_" + orderId, JSON.stringify(orderData));
      setFormStatus("Brief tersimpan. Mengarahkan kamu ke checkout...");
      window.setTimeout(() => {
        if (!user) {
          router.push("/login?redirect=/checkout&id=" + orderId);
        } else {
          router.push("/checkout?id=" + orderId);
        }
      }, 300);
    } catch {
      setFormStatus("Brief belum tersimpan. Coba lagi atau gunakan browser lain.");
    }
  };

  const setFormField = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const filteredFaqs = FAQ_ITEMS.filter((item) => item.q.toLowerCase().includes(faqQuery.toLowerCase()));
  const sample = SAMPLE_DATA[category][sampleIdx];

  return (
    <>
      {/* SKIP LINK */}
      <a
        href="#main-content"
        className="sr-only text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:bg-wasabi focus:text-ink focus:font-mono focus:text-xs focus:font-bold focus:rounded-xl focus:border-2 focus:border-ink"
      >
        Lewati ke konten utama
      </a>

      {/* TOP PROMO SLA TICKER */}
      <div className="bg-terracotta text-white text-[11px] sm:text-xs font-mono py-2 sm:py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-1.5 sm:gap-2 font-bold">
        <span className="inline-block px-1.5 sm:px-2 py-0.5 bg-wasabi text-ink text-[10px] rounded uppercase border border-ink shadow-brutal-sm shrink-0">SLA 24 Jam</span>
        <span className="truncate sm:overflow-visible">Brief lengkap diproses dalam maksimal 1x24 jam kerja. ⚡</span>
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">
          <a href="#main-content" className="flex items-center space-x-2 shrink-0 group">
            <span className="font-serif text-2xl sm:text-4xl xl:text-3xl 2xl:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">Karsa</span>
            <span className="badge-tag text-[10px] font-mono uppercase px-1.5 sm:px-2 py-0.5 bg-wasabi text-ink rounded font-bold">Studio</span>
          </a>

          <nav className="hidden xl:flex items-center gap-2.5 xl:gap-3 text-xs font-mono font-bold text-ink shrink-0">
            {/* DROPDOWN 1: MODUL OUTPUT */}
            <div className="relative group py-5">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openDropdown === "output"}
                onClick={() => setOpenDropdown(openDropdown === "output" ? null : "output")}
                className="flex items-center gap-1 hover:text-terracotta transition font-bold whitespace-nowrap"
              >
                <span>Isi Paket</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 transition-transform duration-200" />
              </button>
              <div id="outputMenu" className={`dropdown-menu absolute top-full left-0 w-[740px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal z-50 whitespace-normal ${openDropdown === "output" ? "nav-open" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <PackageCheck className="w-4 h-4 text-terracotta" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Output Utama</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <a href="#modul-video" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-wasabi text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">01</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">30 Video Scripts</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Hook, visual, audio, CTA.</span></span>
                      </a>
                      <a href="#modul-caption" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-sunflower text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">02</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">30 Caption &amp; Tagar</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">AIDA + 3 tier tagar.</span></span>
                      </a>
                      <a href="#modul-seo" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-canvas text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">03</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">4 Artikel Blog SEO</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Struktur H1-H3 + meta.</span></span>
                      </a>
                      <a href="#modul-radar" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-terracottaLight text-terracotta border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">04</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">Audit Gap Kompetitor</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Teardown 1 akun acuan.</span></span>
                      </a>
                      <a href="#modul-notion" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-sunflower text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">05</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">Notion Content OS</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Calendar + Kanban produksi.</span></span>
                      </a>
                      <a href="#modul-broll" onClick={() => setOpenDropdown(null)} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className="w-6 h-6 rounded-lg bg-wasabi text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">06</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">Panduan B-Roll HP</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">Shot-list untuk rekam sendiri.</span></span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <CalendarRange className="w-4 h-4 text-wasabiDark" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Strategi &amp; Sistem</span>
                    </div>
                    <div className="mt-2 space-y-1 font-sans">
                      <a href="#isi-harian" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Peta Konten 30 Hari</span><span className="block text-[10px] text-stone-500 mt-0.5">Foundation sampai conversion.</span></a>
                      <a href="#standar-kualitas" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Standar Setiap Output</span><span className="block text-[10px] text-stone-500 mt-0.5">Checklist sebelum dipakai tim.</span></a>
                      <a href="#cara-kerja" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Cara Kerja Karsa</span><span className="block text-[10px] text-stone-500 mt-0.5">Brief, riset, tulis, kirim.</span></a>
                      <a href="#cakupan" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Scope Layanan</span><span className="block text-[10px] text-stone-500 mt-0.5">Termasuk dan tidak termasuk.</span></a>
                      <a href="#anatomi-script" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Anatomi Script 25 Detik</span><span className="block text-[10px] text-stone-500 mt-0.5">Hook, value, CTA per detik.</span></a>
                      <a href="#pillar-konten" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Pilar Konten 30 Hari</span><span className="block text-[10px] text-stone-500 mt-0.5">4 pilar &amp; rasio mingguan.</span></a>
                      <a href="#alur-produksi" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Template Produksi</span><span className="block text-[10px] text-stone-500 mt-0.5">Senin-Jumat siap eksekusi.</span></a>
                      <a href="#garansi" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Garansi &amp; SLA</span><span className="block text-[10px] text-stone-500 mt-0.5">24 jam + kalibrasi 48 jam.</span></a>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <ChartNoAxesCombined className="w-4 h-4 text-terracotta" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Proof &amp; Keputusan</span>
                    </div>
                    <div className="mt-2 space-y-1 font-sans">
                      <a href="#compare-scripts" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Bandingkan Kualitas</span><span className="block text-[10px] text-stone-500 mt-0.5">Script generik vs Karsa.</span></a>
                      <a href="#studi-kasus" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Case Study Nyata</span><span className="block text-[10px] text-stone-500 mt-0.5">Metrik dari implementasi.</span></a>
                      <a href="#preview" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Contoh Output</span><span className="block text-[10px] text-stone-500 mt-0.5">Script, caption, dan SEO.</span></a>
                      <a href="#calculator" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Kalkulator Hemat</span><span className="block text-[10px] text-stone-500 mt-0.5">Bandingkan biaya per batch.</span></a>
                      <a href="#komparasi" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Karsa vs Agensi vs In-house</span><span className="block text-[10px] text-stone-500 mt-0.5">Tabel perbandingan jujur.</span></a>
                      <a href="#harga" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Harga &amp; Paket</span><span className="block text-[10px] text-stone-500 mt-0.5">1, 3, atau 6 batch.</span></a>
                      <a href="#testimoni" onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">Testimoni Customer</span><span className="block text-[10px] text-stone-500 mt-0.5">Kata mereka yang sudah pakai.</span></a>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono px-2">
                  <span className="font-bold text-terracotta">5 bonus eksklusif sudah termasuk dalam setiap batch.</span>
                  <a href="#bonus-stack" onClick={() => setOpenDropdown(null)} className="text-ink font-bold hover:underline">Lihat semua bonus &rarr;</a>
                </div>
              </div>
            </div>

            {/* DROPDOWN 2: SEKTOR BISNIS */}
            <div className="relative group py-5">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openDropdown === "sector"}
                onClick={() => setOpenDropdown(openDropdown === "sector" ? null : "sector")}
                className="flex items-center gap-1 hover:text-terracotta transition font-bold whitespace-nowrap"
              >
                <span>Untuk Bisnis</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 transition-transform duration-200" />
              </button>
              <div id="sectorMenu" className={`dropdown-menu absolute top-full left-0 w-[560px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal z-50 whitespace-normal ${openDropdown === "sector" ? "nav-open" : ""}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <Store className="w-4 h-4 text-terracotta" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Sektor Bisnis</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      {SECTORS.map((s) => (
                        <a key={s.title} href="#studi-kasus" onClick={() => setOpenDropdown(null)} className="p-2 rounded-xl hover:bg-canvas transition flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${s.dot} border border-ink shrink-0`}></span>
                          <span><span className="block font-bold text-ink font-sans text-xs">{s.title}</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">{s.sub}</span></span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                      <Target className="w-4 h-4 text-wasabiDark" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Tujuan Konten</span>
                    </div>
                    <div className="mt-2 space-y-1 font-sans">
                      {GOALS.map((g) => (
                        <a key={g.title} href={g.href} onClick={() => setOpenDropdown(null)} className="block p-2 rounded-xl hover:bg-canvas transition"><span className="block font-bold text-xs text-ink">{g.title}</span><span className="block text-[10px] text-stone-500 mt-0.5">{g.sub}</span></a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="w-px h-5 bg-ink/20 mx-0.5" aria-hidden="true"></span>
            <a href="#harga" className="hover:text-terracotta transition whitespace-nowrap">Harga</a>
            <a href="#testimoni" className="hover:text-terracotta transition whitespace-nowrap">Testimoni</a>
            <a href="#compare-scripts" className="hover:text-terracotta transition whitespace-nowrap">Lihat Kualitas</a>
            <a href="#cara-kerja" className="hover:text-terracotta transition whitespace-nowrap">Cara Kerja</a>
            <a href="#preview" className="hover:text-terracotta transition whitespace-nowrap">Contoh Konten</a>
            <a href="#faq" className="hover:text-terracotta transition whitespace-nowrap">FAQ</a>
          </nav>

          {/* CTA & MOBILE TOGGLE */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <Link href="/login" className="hidden xl:inline-flex text-xs font-mono font-bold text-ink hover:text-terracotta px-2.5 py-2 transition whitespace-nowrap">
              Member Workspace
            </Link>
            <a href="#order" className="badge-tag bg-ink text-canvas hover:bg-terracotta hover:text-white px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shadow-brutal-sm sm:shadow-brutal">
              <span>Mulai dengan Brief</span>
              <ArrowRight className="w-3.5 h-3.5 text-wasabi" />
            </a>
            <button
              type="button"
              id="mobileMenuToggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Tutup Menu" : "Buka Menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              className="xl:hidden p-2 rounded-xl text-ink border-2 border-ink bg-white focus:outline-none shadow-brutal-sm"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <div id="mobileMenu" className="xl:hidden bg-canvas border-b-2 border-ink px-4 pt-3 pb-6 space-y-2.5 font-bold text-xs font-mono text-ink shadow-brutal max-h-[85vh] overflow-y-auto">
            <div className="border-2 border-ink rounded-2xl bg-white p-3.5 shadow-brutal-sm">
              <button
                type="button"
                aria-expanded={!!mobileAcc.fitur}
                aria-controls="mob-fitur"
                className="w-full flex justify-between items-center text-left"
                onClick={() => setMobileAcc((prev) => ({ ...prev, fitur: !prev.fitur }))}
              >
                <span>Isi Paket (6 Komponen)</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAcc.fitur ? "rotate-180" : ""}`} />
              </button>
              <div id="mob-fitur" className={`mt-3 space-y-2 pt-2.5 border-t-2 border-ink text-[11px] ${mobileAcc.fitur ? "" : "hidden"}`}>
                <a href="#modul-video" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 30 Video Scripts Kata-per-Kata</a>
                <a href="#modul-caption" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 30 Captions AIDA &amp; Riset Tagar</a>
                <a href="#modul-seo" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; 4 Artikel Blog SEO Google</a>
                <a href="#modul-radar" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Audit Angle &amp; Gap Kompetitor</a>
                <a href="#modul-notion" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Notion Content OS</a>
                <a href="#modul-broll" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Panduan B-Roll Kamera HP</a>
                <a href="#isi-harian" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Peta Konten 30 Hari</a>
                <a href="#standar-kualitas" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Standar Setiap Output</a>
              </div>
            </div>

            <div className="border-2 border-ink rounded-2xl bg-white p-3.5 shadow-brutal-sm">
              <button
                type="button"
                aria-expanded={!!mobileAcc.sektor}
                aria-controls="mob-sektor"
                className="w-full flex justify-between items-center text-left"
                onClick={() => setMobileAcc((prev) => ({ ...prev, sektor: !prev.sektor }))}
              >
                <span>Untuk Bisnis &amp; Tujuan</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAcc.sektor ? "rotate-180" : ""}`} />
              </button>
              <div id="mob-sektor" className={`mt-3 space-y-2 pt-2.5 border-t-2 border-ink text-[11px] ${mobileAcc.sektor ? "" : "hidden"}`}>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; F&amp;B, Cafe &amp; Roastery</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Skincare &amp; Beauty</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Fashion &amp; Apparel</a>
                <a href="#studi-kasus" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Jasa Profesional &amp; Edukasi</a>
                <a href="#isi-harian" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Edukasi &amp; Awareness</a>
                <a href="#order" onClick={() => setMobileOpen(false)} className="block py-1 text-stone-600">&bull; Leads atau Penjualan</a>
              </div>
            </div>

            <a href="#anatomi-script" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Anatomi Script 25 Detik</a>
            <a href="#pillar-konten" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-sunflower border-2 border-ink shadow-brutal-sm">Pilar Konten 30 Hari</a>
            <a href="#alur-produksi" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Template Produksi Mingguan</a>
            <a href="#harga" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Harga &amp; Paket</a>
            <a href="#testimoni" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Testimoni Customer</a>
            <a href="#komparasi" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Karsa vs Agensi</a>
            <a href="#garansi" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-sunflower border-2 border-ink shadow-brutal-sm">Garansi &amp; SLA</a>
            <a href="#compare-scripts" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Lihat Kualitas Script</a>
            <a href="#cara-kerja" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-sunflower border-2 border-ink shadow-brutal-sm">Cara Kerja Karsa</a>
            <a href="#preview" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Contoh Output</a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">FAQ &amp; Bantuan</a>

            <div className="pt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 border-2 border-ink bg-white font-bold rounded-xl text-xs mb-2 shadow-brutal-sm">
                Buka Member Workspace
              </Link>
              <a href="#order" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3.5 bg-terracotta text-white font-bold rounded-xl text-xs shadow-brutal">
                Isi Brief &amp; Checkout (Rp299.000)
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="main-content">
        {/* HERO */}
        <section className="pt-8 pb-12 sm:pt-20 sm:pb-24 border-b-2 border-ink bg-canvas relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-wasabi/40 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 -left-12 w-64 h-64 rounded-full bg-sunflower/30 blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 badge-tag bg-sunflower px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold">
                  <span>👋 Stop pusing mikirin ide konten tiap malam!</span>
                </div>

                <h1 className="text-3xl sm:text-6xl lg:text-[62px] font-serif tracking-tight text-ink leading-[1.1] sm:leading-[1.08]">
                  30 Hari konten organik, <br className="hidden sm:inline" />
                  <span className="italic text-terracotta">naskah kata-per-kata siap rekam.</span>
                </h1>

                <p className="text-xs sm:text-base text-stone-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
                  Tinggalkan cara lama yang bikin burnout. Kamu dapat 30 video script vertikal (TikTok/Reels), 30 caption berstruktur AIDA, 4 artikel SEO, 5 bonus eksklusif, dan Notion OS yang rapi dalam 1x24 jam kerja.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 sm:pt-2">
                  <a href="#order" className="bento-pop bg-terracotta text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[50px]">
                    <span>Mulai dengan Brief (Rp299.000)</span>
                    <ArrowRight className="w-4 h-4 text-wasabi" />
                  </a>
                  <a href="#compare-scripts" className="badge-tag bg-white hover:bg-canvas text-ink px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[50px]">
                    <Eye className="w-4 h-4 text-stone-500" />
                    <span>Lihat Contoh Script</span>
                  </a>
                </div>

                <div className="pt-4 sm:pt-6 border-t-2 border-ink/20 grid grid-cols-3 gap-2 sm:gap-3 font-mono text-xs text-stone-600 max-w-lg mx-auto lg:mx-0">
                  <div className="p-2.5 sm:p-3 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
                    <span className="font-serif font-bold text-sm sm:text-xl text-ink block">30 Video Scripts</span>
                    <span className="text-[10px] text-stone-500">Format vertikal 9:16</span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-wasabi border-2 border-ink rounded-xl shadow-brutal-sm">
                    <span className="font-serif font-bold text-sm sm:text-xl text-ink block">&lt; 24 Jam</span>
                    <span className="text-[10px] text-wasabiDark font-bold">Turnaround SLA</span>
                  </div>
                  <div className="p-2.5 sm:p-3 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
                    <span className="font-serif font-bold text-sm sm:text-xl text-terracotta block">Rp299.000</span>
                    <span className="text-[10px] text-stone-500">Flat tanpa langganan</span>
                  </div>
                </div>
              </div>

              {/* TELEPROMPTER MOCKUP */}
              <div className="lg:col-span-5 flex justify-center pt-2 lg:pt-0">
                <div className="w-[280px] sm:w-[320px] h-[480px] sm:h-[540px] bg-ink rounded-[38px] sm:rounded-[44px] p-3.5 sm:p-4 shadow-brutal-lg border-4 border-ink relative overflow-hidden flex flex-col justify-between select-none">
                  <div className="flex justify-between items-center px-2 sm:px-3 pt-1 z-20 text-[10px] font-mono text-stone-400">
                    <span className="font-bold text-white">09:41</span>
                    <div className="w-20 sm:w-24 h-4 sm:h-5 bg-stone-900 rounded-full flex items-center justify-center gap-1.5 px-2 border border-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                      <span className="text-[8px] sm:text-[9px] text-white uppercase font-bold">Teleprompter</span>
                    </div>
                    <div className="flex items-center gap-1 text-wasabi font-bold text-[10px]">
                      <span>REC</span>
                    </div>
                  </div>

                  <div className="relative flex-1 overflow-hidden my-2 sm:my-3">
                    <div className="animate-teleprompter space-y-3 font-mono text-xs text-stone-300 px-1">
                      <div className="p-[14px] bg-stone-900 rounded-2xl">
                        <span className="text-[9px] font-bold text-sunflower uppercase block tracking-wider">[00:00 - 00:03] HOOK PENYANGKALAN</span>
                        <p className="text-white text-xs mt-1 leading-snug">"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk?"</p>
                      </div>
                      <div className="p-[14px] bg-stone-900 rounded-2xl">
                        <span className="text-[9px] font-bold text-wasabi uppercase block tracking-wider">[00:04 - 00:18] VALUE DELIVERY</span>
                        <p className="text-stone-200 text-xs mt-1 leading-snug">"Metode slow-drip 12 jam kami memecah asam klorogenat secara alami tanpa ngurangin kadar kafein."</p>
                      </div>
                      <div className="p-[14px] bg-stone-900 rounded-2xl">
                        <span className="text-[9px] font-bold text-terracotta uppercase block tracking-wider">[00:19 - 00:25] DIRECT CALL TO ACTION</span>
                        <p className="text-white text-xs mt-1 leading-snug">"Cek link di bio sekarang buat amankan sampler pack ramah lambung minggu ini!"</p>
                      </div>
                      <div className="p-[14px] bg-stone-900 rounded-2xl">
                        <span className="text-[9px] font-bold text-sunflower uppercase block tracking-wider">[00:00 - 00:03] HOOK PENYANGKALAN</span>
                        <p className="text-white text-xs mt-1 leading-snug">"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk?"</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-900 rounded-2xl p-[10px] sm:p-[12px] flex items-center justify-between text-stone-400 font-mono text-[9px] sm:text-[10px] z-20">
                    <div className="flex items-center gap-1 text-white font-bold">
                      <Play className="w-3.5 h-3.5 text-wasabi" />
                      <span>Speed: 1.0x</span>
                    </div>
                    <span className="px-2 py-0.5 bg-stone-800 text-stone-300 rounded font-bold">Day 04 / 30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="py-3.5 border-b-2 border-ink bg-wasabi/30 overflow-hidden">
          <div className="flex items-center px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="marquee-track flex gap-8 font-mono text-xs font-bold text-stone-600 whitespace-nowrap shrink-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => {
                const firstItem = i === 0 || i === MARQUEE_ITEMS.length;
                return (
                  <span key={i} className="flex items-center gap-8">
                    {firstItem && <span className="text-ink font-bold">{i === 0 ? "40+ Brand UMKM terlayani" : ""}</span>}
                    <span>{item}</span>
                    <span className="text-terracotta">•</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* STATS */}
        <section id="stats" className="py-10 sm:py-14 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="sr-only">Angka Karsa Studio</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
              <div className="bento-pop p-5 sm:p-6 rounded-2xl bg-white text-center">
                <span className="font-serif text-3xl sm:text-5xl text-ink block" data-count="30">0</span>
                <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold mt-2 block">Naskah video kata-per-kata</span>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-2xl bg-sunflower/60 text-center">
                <span className="font-serif text-3xl sm:text-5xl text-ink block" data-count="24" data-suffix=" Jam">0 Jam</span>
                <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold mt-2 block">SLA pengiriman maksimal</span>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-2xl bg-white text-center">
                <span className="font-serif text-3xl sm:text-5xl text-ink block" data-count="40" data-suffix="+">0+</span>
                <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold mt-2 block">Brand UMKM terlayani</span>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-2xl bg-wasabi/40 text-center">
                <span className="font-serif text-3xl sm:text-5xl text-ink block" data-count="92" data-suffix="%">0%</span>
                <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold mt-2 block">Customer kembali pesan batch</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="py-12 sm:py-20 bg-ink text-canvas border-b-2 border-ink">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Masalah yang Sering Terjadi</span>
                <h2 className="text-2xl sm:text-4xl font-serif mt-3 leading-tight">Bukan kurang niat. Sistem kontennya yang belum ada.</h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed font-sans max-w-md">
                  Saat semua keputusan harus dibuat dari nol, konten jadi pekerjaan yang selalu ditunda. Karsa mengubah brief singkat menjadi sistem produksi yang bisa langsung dijalankan.
                </p>
              </div>
              <div className="lg:col-span-7 grid sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border-2 border-stone-700">
                  <span className="text-terracotta font-mono font-bold text-xl">01</span>
                  <h3 className="font-bold font-serif text-lg mt-3">Ide mandek</h3>
                  <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Setiap minggu mulai lagi dari halaman kosong dan akhirnya tidak posting.</p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border-2 border-stone-700">
                  <span className="text-sunflower font-mono font-bold text-xl">02</span>
                  <h3 className="font-bold font-serif text-lg mt-3">Rekam tanpa arah</h3>
                  <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Sudah punya produk, tapi tidak tahu harus membuka video dengan kalimat apa.</p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border-2 border-stone-700">
                  <span className="text-wasabi font-mono font-bold text-xl">03</span>
                  <h3 className="font-bold font-serif text-lg mt-3">Posting tidak konsisten</h3>
                  <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Konten ada sesekali, tetapi tidak punya kalender, prioritas, atau alur produksi.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t-2 border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold text-wasabi">Dari brief mentah menjadi 30 hari konten siap eksekusi.</span>
              <a href="#deliverables" className="text-xs font-mono font-bold text-white hover:text-wasabi transition">Lihat isi paket &darr;</a>
            </div>
          </div>
        </section>

        {/* KENAPA VIDEO */}
        <section id="kenapa-video" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Pertanyaan Pertama</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3 leading-tight">Kenapa video pendek, bukan sekadar feed statis?</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">
                  Algoritma TikTok, Reels, dan Shorts memprioritaskan video yang membuat orang bertahan menonton. Untuk UMKM, artinya satu hal: video pendek memberi jangkauan terbesar dengan modal produksi terkecil.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3.5 border-2 border-ink rounded-xl bg-white shadow-brutal-sm">
                    <span className="font-serif text-2xl text-terracotta block">4x</span>
                    <span className="text-stone-600 text-[10px] font-bold">Jangkauan video vs foto statis</span>
                  </div>
                  <div className="p-3.5 border-2 border-ink rounded-xl bg-white shadow-brutal-sm">
                    <span className="font-serif text-2xl text-terracotta block">15-30s</span>
                    <span className="text-stone-600 text-[10px] font-bold">Durasi ideal yang ditonton sampai selesai</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bento-pop p-5 rounded-2xl bg-white">
                  <Radar className="w-6 h-6 text-terracotta mb-3" />
                  <h3 className="font-bold text-sm text-ink">Algoritma menyukai retention</h3>
                  <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Video 15-30 detik yang ditonton penuh memberi sinyal kuat ke algoritma — postingan berikutnya mendapat jangkauan lebih besar.</p>
                </div>
                <div className="bento-pop p-5 rounded-2xl bg-sunflower/40">
                  <MessagesSquare className="w-6 h-6 text-ink mb-3" />
                  <h3 className="font-bold text-sm text-ink">DM adalah aset penjualan</h3>
                  <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Setiap video bisa diakhiri ajakan DM. Percakapan di DM = calon pembeli hangat yang bisa ditindaklanjuti.</p>
                </div>
                <div className="bento-pop p-5 rounded-2xl bg-wasabi/30">
                  <Smartphone className="w-6 h-6 text-wasabiDark mb-3" />
                  <h3 className="font-bold text-sm text-ink">Modal HP sudah cukup</h3>
                  <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Tidak perlu kamera sinema. Panduan B-Roll Karsa dirancang untuk direkam dengan HP yang kamu miliki hari ini.</p>
                </div>
                <div className="bento-pop p-5 rounded-2xl bg-white">
                  <Repeat2 className="w-6 h-6 text-terracotta mb-3" />
                  <h3 className="font-bold text-sm text-ink">Satu ide, banyak format</h3>
                  <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Satu naskah bisa dipotong menjadi Reels, TikTok, Shorts, dan Story — bonus repurposing framework kami mengaturnya.</p>
                </div>
                <div className="bento-pop p-5 rounded-2xl bg-white sm:col-span-2">
                  <TrendingUp className="w-6 h-6 text-terracotta mb-3" />
                  <h3 className="font-bold text-sm text-ink">Konsistensi mengalahkan viral</h3>
                  <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Satu video viral tidak membangun bisnis. 30 video konsisten dengan pesan yang sama — itulah yang membangun kepercayaan dan penjualan. Kalender Karsa dirancang untuk konsistensi itu.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARE SCRIPTS */}
        <section id="compare-scripts" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Bandingkan Kualitas</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Script generik vs formula Karsa</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Setiap naskah punya alasan di balik hook, visual, ritme, dan CTA-nya.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs">
              <div className="bento-pop p-5 sm:p-6 rounded-3xl bg-rose-50/50 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center pb-2.5 border-b-2 border-ink">
                  <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-200 text-ink">❌ Script Biasa / Prompt AI Mentah</span>
                  <span className="text-rose-700 font-bold">Hook lemah</span>
                </div>
                <div className="space-y-2.5 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                  <div className="p-3 sm:p-3.5 bg-white rounded-2xl">
                    <strong className="font-mono text-rose-800 text-[11px] sm:text-xs block mb-1">Opening Basi &amp; Membosankan:</strong>
                    "Halo guys! Kali ini aku mau kenalin produk baru dari brand kita nih. Kopi ini dibuat dari biji pilihan berkualitas..."
                  </div>
                  <div className="p-3 sm:p-3.5 bg-white rounded-2xl">
                    <strong className="font-mono text-rose-800 text-[11px] sm:text-xs block mb-1">Tanpa Cue Visual:</strong>
                    Talent berdiri kaku di depan kamera sambil ngomong monoton tanpa variasi ekspresi atau angle rekam.
                  </div>
                </div>
                <p className="text-[11px] font-bold text-rose-800 pt-2 border-t-2 border-ink">Masalah: opening tidak memberi alasan untuk terus menonton.</p>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-3xl bg-wasabi/30 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center pb-2.5 border-b-2 border-ink">
                  <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-wasabi text-ink">✓ Formula Karsa Studio</span>
                  <span className="text-ink font-bold">Struktur jelas</span>
                </div>
                <div className="space-y-2.5 font-sans text-xs sm:text-sm text-stone-900 leading-relaxed">
                  <div className="p-3 sm:p-3.5 bg-white rounded-2xl">
                    <strong className="font-mono text-terracotta text-[11px] sm:text-xs block mb-1">[00:00 - 00:03] HOOK PENYANGKALAN:</strong>
                    "Berhenti minum kopi sachet kalau jam 2 siang lambungmu selalu kembung. Ini cara simpel ngatasinnya..."
                  </div>
                  <div className="p-3 sm:p-3.5 bg-white rounded-2xl">
                    <strong className="font-mono text-wasabiDark text-[11px] sm:text-xs block mb-1">[00:03 - 00:18] VALUE DELIVERY &amp; PROOF:</strong>
                    Tunjukkan visual es batu retak dalam gelas cold brew (ASMR) dan jelaskan alasan pH rendah asam secara visual.
                  </div>
                </div>
                <p className="text-[11px] font-bold text-ink pt-2 border-t-2 border-ink">Tujuan: membuat pesan lebih mudah dipahami dan ditindaklanjuti.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ANATOMI SCRIPT */}
        <section id="anatomi-script" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Di Balik Layar</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Anatomi 25 detik yang bikin orang berhenti scroll.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">Setiap naskah Karsa mengikuti struktur waktu ini — alasan di balik setiap detiknya.</p>
            </div>
            <div className="timeline-bar rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-4 font-mono text-xs">
              <div className="p-4 sm:p-5 bg-terracotta text-white">
                <span className="text-[9px] uppercase tracking-wider font-bold block">00:00 - 00:03</span>
                <h3 className="font-serif text-lg mt-1">HOOK</h3>
                <p className="text-white/85 text-[11px] mt-1.5 leading-relaxed font-sans">Pernyataan kontras, pertanyaan, atau klaim yang memicu rasa penasaran dalam 3 detik pertama.</p>
              </div>
              <div className="p-4 sm:p-5 bg-sunflower/70 text-ink">
                <span className="text-[9px] uppercase tracking-wider font-bold block">00:03 - 00:10</span>
                <h3 className="font-serif text-lg mt-1">KONTEKS</h3>
                <p className="text-stone-800 text-[11px] mt-1.5 leading-relaxed font-sans">Siapa ini untuk dan masalah apa yang dibuka. Audiens merasa "ini cerita saya".</p>
              </div>
              <div className="p-4 sm:p-5 bg-wasabi/70 text-ink">
                <span className="text-[9px] uppercase tracking-wider font-bold block">00:10 - 00:18</span>
                <h3 className="font-serif text-lg mt-1">VALUE</h3>
                <p className="text-stone-800 text-[11px] mt-1.5 leading-relaxed font-sans">Solusi, cara kerja, dan bukti. Disampaikan dengan visual yang mudah diikuti.</p>
              </div>
              <div className="p-4 sm:p-5 bg-ink text-canvas">
                <span className="text-[9px] uppercase tracking-wider font-bold block">00:18 - 00:25</span>
                <h3 className="font-serif text-lg mt-1">CTA</h3>
                <p className="text-stone-300 text-[11px] mt-1.5 leading-relaxed font-sans">Satu ajakan jelas: simpan, komentar, DM, atau kunjungi profil. Tidak pernah dua-duanya.</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs font-sans">
              <div className="p-4 rounded-2xl border-2 border-ink bg-white shadow-brutal-sm">
                <span className="font-mono text-[10px] font-bold text-terracotta block mb-2">PSIKOLOGI 01</span>
                <h3 className="font-bold text-ink text-sm">Curiosity gap</h3>
                <p className="text-stone-600 mt-1.5 leading-relaxed">Hook membuka pertanyaan di kepala penonton tanpa menjawabnya langsung — otak memaksa mereka bertahan.</p>
              </div>
              <div className="p-4 rounded-2xl border-2 border-ink bg-white shadow-brutal-sm">
                <span className="font-mono text-[10px] font-bold text-terracotta block mb-2">PSIKOLOGI 02</span>
                <h3 className="font-bold text-ink text-sm">Loss aversion</h3>
                <p className="text-stone-600 mt-1.5 leading-relaxed">"Jangan beli ini sebelum tahu…" memicu rasa takut ketinggalan informasi penting — retention naik drastis.</p>
              </div>
              <div className="p-4 rounded-2xl border-2 border-ink bg-white shadow-brutal-sm">
                <span className="font-mono text-[10px] font-bold text-terracotta block mb-2">PSIKOLOGI 03</span>
                <h3 className="font-bold text-ink text-sm">Satu pesan, satu aksi</h3>
                <p className="text-stone-600 mt-1.5 leading-relaxed">Penonton mengingat satu hal per video. CTA tunggal membuat langkah berikutnya tidak ambigu.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-wasabi/25">
              <span className="font-mono text-xs font-bold text-ink text-center sm:text-left">50 template hook ada di Bonus 01 — mulai dari penyangkalan, angka mengejutkan, sampai "stop doing X".</span>
              <a href="#bonus-stack" className="badge-tag bg-ink text-canvas px-4 py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-terracotta hover:text-white transition shrink-0">Lihat semua bonus &rarr;</a>
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section id="deliverables" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
              <div>
                <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Output Komplit</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">6 Output Utama yang Kamu Terima</h2>
              </div>
              <span className="text-xs font-mono text-stone-600 mt-2 md:mt-0 font-bold">Format: Notion Dynamic Database + Docs Backup</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              <div id="modul-video" className="md:col-span-2 bento-pop p-5 sm:p-8 rounded-3xl">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">01</div>
                  <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Video Scripts</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">30 Video Scripts Kata-per-Kata</h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                  Format vertikal 15-30 detik untuk TikTok, Reels, dan Shorts lengkap dengan pembagian per detik: Visual &amp; Audio Hook (0-3s), Problem Framing, Value Solution, dan Call To Action (CTA).
                </p>
                <div className="mt-4 p-[14px] sm:p-[16px] bg-canvas rounded-2xl font-mono text-xs space-y-1">
                  <div><strong className="text-terracotta">&bull; Hook:</strong> Pancingan scroll instan tanpa basa-basi.</div>
                  <div><strong className="text-ink">&bull; Audio Cues:</strong> Rekomendasi sound komersial aman lisensi.</div>
                </div>
              </div>
              <div id="modul-caption" className="bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">02</div>
                    <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Captions &amp; Copy</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">30 Captions AIDA &amp; 15 Tagar</h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                    Copywriting formula Attention, Interest, Desire, Action siap copy-paste ke Instagram &amp; Threads lengkap dengan 3 tier tagar relevan.
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-500 mt-4 block pt-3 border-t-2 border-ink">120-180 Kata per Post</span>
              </div>
              <div id="modul-seo" className="bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-canvas border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">03</div>
                    <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-wasabi rounded font-bold">Google Traffic</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">4 Artikel Blog SEO (1.000 Kata)</h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                    Artikel pilar panjang dengan susunan heading H1/H2/H3 dan meta deskripsi untuk mendatangkan traffic pembeli gratis dari Google.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-800 font-bold mt-4 block pt-3 border-t-2 border-ink">Format Markdown &amp; Docs</span>
              </div>
              <div id="modul-radar" className="bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-terracottaLight text-terracotta border-2 border-ink flex items-center justify-center font-mono font-bold shadow-brutal-sm">04</div>
                    <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Teardown</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">Audit Angle &amp; Gap Kompetitor</h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                    Analisis positioning 1 akun kompetitor utama untuk menemukan sudut pesan unik yang belum digarap di pasar tokomu.
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-500 mt-4 block pt-3 border-t-2 border-ink">Positioning Blueprint</span>
              </div>
              <div id="modul-notion" className="bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">05</div>
                    <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Database</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">Notion Content OS</h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                    Database Notion siap 1-klik duplicate dengan Calendar View, Kanban status produksi, dan kolom asset management yang rapi.
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-500 mt-4 block pt-3 border-t-2 border-ink">1-Click Duplicate</span>
              </div>
              <div id="modul-broll" className="md:col-span-2 bento-pop p-5 sm:p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">06</div>
                    <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Shot List</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink font-serif">Panduan B-Roll &amp; Visual Kamera HP</h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
                    Panduan sudut kamera, pencahayaan alami jendela, dan gestur visual yang gampang direkam sendiri pakai HP tanpa perlu sewa studio atau alat mahal.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-800 font-bold mt-4 block pt-3 border-t-2 border-ink">Level: Ramah Pemula Total</span>
              </div>
            </div>
          </div>
        </section>

        {/* PILAR KONTEN */}
        <section id="pillar-konten" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Sistem Bukan Acak</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">4 pilar yang mengisi 30 hari kalendermu.</h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Setiap video masuk salah satu pilar. Rasio antar pilar dijaga agar feed tidak jadi brosur iklan.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bento-pop p-5 rounded-2xl bg-amber-100/70">
                <span className="w-3 h-3 rounded-full bg-amber-500 border-2 border-ink inline-block"></span>
                <h3 className="font-serif text-lg text-ink mt-2">Edukasi Solusi</h3>
                <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Jawab pertanyaan yang sering ditanyakan calon pembeli. Bangun otoritas tanpa terlihat menggurui.</p>
                <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3">Porsi: 40% feed</span>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-indigo-100/70">
                <span className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-ink inline-block"></span>
                <h3 className="font-serif text-lg text-ink mt-2">Storytelling Nyata</h3>
                <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Cerita pelanggan, proses produksi, dan perjalanan brand. Emosi adalah bahan bakar engagement.</p>
                <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3">Porsi: 30% feed</span>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-emerald-100/70">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-ink inline-block"></span>
                <h3 className="font-serif text-lg text-ink mt-2">Penawaran Spesial</h3>
                <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Promo, produk baru, dan CTA langsung. Dibatasi porsinya agar tidak membuat audiens lelah.</p>
                <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3">Porsi: 15% feed</span>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-pink-100/70">
                <span className="w-3 h-3 rounded-full bg-pink-500 border-2 border-ink inline-block"></span>
                <h3 className="font-serif text-lg text-ink mt-2">Mitos vs Fakta</h3>
                <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Bongkar anggapan salah di industrimu. Format debunk ini mudah dibagikan dan memicu komentar.</p>
                <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3">Porsi: 15% feed</span>
              </div>
            </div>
            <div className="mt-6 bento-pop rounded-3xl bg-white p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">Rasio mingguan yang kami terapkan</span>
                <span className="text-[10px] font-mono text-stone-500">Aturan praktis: 70% value, 30% promosi</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-stone-600 mb-1"><span>Edukasi Solusi</span><span>12 hari / 30</span></div>
                  <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-ink"><div className="h-full bg-amber-500" style={{ width: "40%" }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-stone-600 mb-1"><span>Storytelling Nyata</span><span>9 hari / 30</span></div>
                  <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-ink"><div className="h-full bg-indigo-500" style={{ width: "30%" }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-stone-600 mb-1"><span>Penawaran Spesial</span><span>5 hari / 30</span></div>
                  <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-ink"><div className="h-full bg-emerald-500" style={{ width: "15%" }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-stone-600 mb-1"><span>Mitos vs Fakta</span><span>4 hari / 30</span></div>
                  <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-ink"><div className="h-full bg-pink-500" style={{ width: "15%" }}></div></div>
                </div>
              </div>
              <p className="text-[11px] font-sans text-stone-500 mt-4 leading-relaxed">Rasio ini menyesuaikan tujuan brief kamu (edukasi, leads, atau penjualan) dan dijelaskan per hari di dalam kalender.</p>
            </div>
          </div>
        </section>

        {/* ISI HARIAN */}
        <section id="isi-harian" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-4">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Bukan Ide Acak</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3 leading-tight">Setiap hari punya peran dalam kalender.</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">30 hari konten disusun sebagai rangkaian: kenalkan masalah, bangun kepercayaan, tunjukkan solusi, lalu arahkan audiens ke langkah berikutnya.</p>
                <a href="#preview" className="inline-flex items-center gap-2 mt-5 text-xs font-mono font-bold text-terracotta hover:underline">Lihat contoh output lengkap <span>&rarr;</span></a>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 sm:p-5 border-2 border-ink rounded-2xl bg-canvas">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-stone-500"><span>DAY 01-07</span><span className="text-terracotta">FOUNDATION</span></div>
                    <h3 className="font-serif text-xl text-ink mt-3">Kenalkan masalah</h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2">Konten pengenalan produk, pain point utama, mitos, dan pertanyaan yang sering muncul dari calon pembeli.</p>
                  </div>
                  <div className="p-4 sm:p-5 border-2 border-ink rounded-2xl bg-wasabi/25">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-stone-500"><span>DAY 08-15</span><span className="text-wasabiDark">EDUCATION</span></div>
                    <h3 className="font-serif text-xl text-ink mt-3">Bangun kepercayaan</h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2">Konten edukasi, breakdown bahan atau proses, perbandingan, dan bukti yang membuat value produk lebih mudah dipahami.</p>
                  </div>
                  <div className="p-4 sm:p-5 border-2 border-ink rounded-2xl bg-sunflower/35">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-stone-500"><span>DAY 16-23</span><span className="text-ink">PROOF</span></div>
                    <h3 className="font-serif text-xl text-ink mt-3">Tunjukkan solusi</h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2">Demo, use case, objection handling, social proof, dan angle yang membantu audiens membayangkan hasilnya.</p>
                  </div>
                  <div className="p-4 sm:p-5 border-2 border-ink rounded-2xl bg-terracottaLight">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-stone-500"><span>DAY 24-30</span><span className="text-terracotta">CONVERSION</span></div>
                    <h3 className="font-serif text-xl text-ink mt-3">Arahkan aksi</h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2">Konten penawaran, FAQ, urgency yang wajar, CTA, dan pengulangan value untuk membantu audiens mengambil keputusan.</p>
                  </div>
                </div>
                <details className="mt-4 bento-pop rounded-2xl bg-white group">
                  <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-center justify-between gap-4 font-mono text-xs font-bold text-ink">
                    <span>Contoh isi satu hari di Notion</span>
                    <span className="text-terracotta transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t-2 border-ink grid sm:grid-cols-2 gap-x-6 gap-y-3 text-xs font-sans text-stone-700">
                    <div><strong className="font-mono text-terracotta block mb-1">DAY 04 / EDUKASI</strong>Angle: kenapa masalah ini terjadi dan apa yang biasanya salah dilakukan audiens.</div>
                    <div><strong className="font-mono text-terracotta block mb-1">VIDEO SCRIPT</strong>Hook, voiceover per detik, arahan visual, cue audio, dan CTA.</div>
                    <div><strong className="font-mono text-terracotta block mb-1">CAPTION AIDA</strong>Caption siap copy-paste dengan ajakan menyimpan, berkomentar, atau mengunjungi profil.</div>
                    <div><strong className="font-mono text-terracotta block mb-1">SHOT LIST</strong>Urutan pengambilan gambar yang bisa direkam dengan HP dan alat yang tersedia.</div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* ALUR PRODUKSI */}
        <section id="alur-produksi" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Beban Kerja Terbagi</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Template produksi satu minggu: 4 hari kerja, 1 hari cadangan.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">30 naskah sudah membagi beban. Tim kamu tinggal mengikuti ritme produksi ini.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="bento-pop p-4 rounded-2xl bg-white">
                <span className="font-mono text-[10px] font-bold text-terracotta block">SENIN</span>
                <h3 className="font-bold text-sm text-ink mt-2">Rekam batch</h3>
                <p className="text-[11px] text-stone-600 font-sans mt-1.5 leading-relaxed">Rekam 4-6 video sekali jalan dengan teleprompter. Satu sesi 2-3 jam.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">Day 01-06</span>
              </div>
              <div className="bento-pop p-4 rounded-2xl bg-sunflower/40">
                <span className="font-mono text-[10px] font-bold text-terracotta block">SELASA</span>
                <h3 className="font-bold text-sm text-ink mt-2">Edit &amp; caption</h3>
                <p className="text-[11px] text-stone-700 font-sans mt-1.5 leading-relaxed">Potong di CapCut, tempel caption AIDA yang sudah jadi. Selesai lebih cepat.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">Day 01-06</span>
              </div>
              <div className="bento-pop p-4 rounded-2xl bg-white">
                <span className="font-mono text-[10px] font-bold text-terracotta block">RABU</span>
                <h3 className="font-bold text-sm text-ink mt-2">Jadwal posting</h3>
                <p className="text-[11px] text-stone-600 font-sans mt-1.5 leading-relaxed">Jadwalkan lewat Meta Business Suite / TikTok Scheduler sesuai jam terbaik.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">Day 07-09</span>
              </div>
              <div className="bento-pop p-4 rounded-2xl bg-wasabi/40">
                <span className="font-mono text-[10px] font-bold text-terracotta block">KAMIS</span>
                <h3 className="font-bold text-sm text-ink mt-2">Balas &amp; pantau</h3>
                <p className="text-[11px] text-stone-700 font-sans mt-1.5 leading-relaxed">Balas komentar &amp; DM dalam 24 jam. Catat video mana yang paling disimpan.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">Semua</span>
              </div>
              <div className="bento-pop p-4 rounded-2xl bg-ink text-canvas">
                <span className="font-mono text-[10px] font-bold text-wasabi block">JUMAT</span>
                <h3 className="font-bold text-sm mt-2">Review data</h3>
                <p className="text-[11px] text-stone-300 font-sans mt-1.5 leading-relaxed">Lihat retention &amp; saves. Pilih format terbaik untuk minggu depan.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">30 menit</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-wasabi/25">
              <span className="font-mono text-xs font-bold text-ink text-center sm:text-left">Hasilnya: 30 hari konten selesai dengan total &plusmn;10 jam produksi per bulan — bukan 40 jam brainstorming tanpa arah.</span>
              <a href="#cara-kerja" className="badge-tag bg-ink text-canvas px-4 py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-terracotta hover:text-white transition shrink-0">Lihat alur kerja Karsa &rarr;</a>
            </div>
          </div>
        </section>

        {/* CARA KERJA */}
        <section id="cara-kerja" className="py-12 sm:py-20 bg-ink text-canvas border-b-2 border-ink">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Alur Kerja</span>
                <h2 className="text-2xl sm:text-4xl font-serif mt-3">Dari brief sampai siap posting.</h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-mono max-w-sm leading-relaxed">Tidak perlu meeting panjang atau onboarding rumit. Cukup isi konteks bisnis, lalu tim Karsa mengerjakan sisanya.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-5 rounded-2xl bg-stone-900 border-2 border-stone-700 relative">
                <span className="absolute -top-3 -left-2 badge-tag bg-wasabi text-ink px-2 py-1 rounded-lg text-[10px] font-mono font-bold">01</span>
                <ClipboardPenLine className="w-7 h-7 text-wasabi mb-5" />
                <h3 className="font-bold font-serif text-lg">Isi brief</h3>
                <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Ceritakan produk, target pembeli, gaya komunikasi, dan kompetitor acuanmu.</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-900 border-2 border-stone-700 relative">
                <span className="absolute -top-3 -left-2 badge-tag bg-sunflower text-ink px-2 py-1 rounded-lg text-[10px] font-mono font-bold">02</span>
                <ScanSearch className="w-7 h-7 text-sunflower mb-5" />
                <h3 className="font-bold font-serif text-lg">Kami petakan angle</h3>
                <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Brief dibedah menjadi sudut pesan, tema, dan ide yang relevan dengan audiensmu.</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-900 border-2 border-stone-700 relative">
                <span className="absolute -top-3 -left-2 badge-tag bg-terracotta text-white px-2 py-1 rounded-lg text-[10px] font-mono font-bold">03</span>
                <PenTool className="w-7 h-7 text-terracotta mb-5" />
                <h3 className="font-bold font-serif text-lg">Naskah disusun</h3>
                <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Script, caption, SEO, dan shot-list dirangkai menjadi kalender 30 hari yang utuh.</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-900 border-2 border-stone-700 relative">
                <span className="absolute -top-3 -left-2 badge-tag bg-wasabi text-ink px-2 py-1 rounded-lg text-[10px] font-mono font-bold">04</span>
                <Send className="w-7 h-7 text-wasabi mb-5" />
                <h3 className="font-bold font-serif text-lg">Terima &amp; eksekusi</h3>
                <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Semua output dikirim dalam Notion Workspace dan backup Docs, siap dibagi ke tim.</p>
              </div>
            </div>
            <div className="mt-8 p-4 sm:p-5 rounded-2xl border-2 border-wasabi/60 bg-wasabi/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-wasabi font-bold">Komitmen pengerjaan</span>
                <p className="text-sm font-bold mt-1">Maksimal 1x24 jam kerja setelah brief dan pembayaran terkonfirmasi.</p>
              </div>
              <a href="#order" className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-wasabi text-ink font-mono text-xs font-bold hover:bg-white transition shrink-0">Isi brief sekarang &rarr;</a>
            </div>
          </div>
        </section>

        {/* TOOLS */}
        <section id="tools" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Modal Minimal</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Cukup HP yang kamu sudah punya.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Total investasi alat mulai dari Rp200 ribu, sekali beli.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <Smartphone className="w-6 h-6 text-terracotta mb-3" />
                <h3 className="font-bold text-sm text-ink">HP kamera 1080p</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Hampir semua HP keluaran 3 tahun terakhir sudah memenuhi. Rekam pakai kamera belakang, bukan selfie.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <Camera className="w-6 h-6 text-terracotta mb-3" />
                <h3 className="font-bold text-sm text-ink">Tripod ringan</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Tripod ponsel Rp100 ribuan dengan clamp yang kokoh sudah cukup untuk angle statis dan miring.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-sunflower/40">
                <Mic className="w-6 h-6 text-ink mb-3" />
                <h3 className="font-bold text-sm text-ink">Mic clip-on</h3>
                <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Mic lavalier wireless Rp150 ribuan membuat suara jauh lebih jelas daripada mic HP bawaan.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-wasabi/30">
                <Clapperboard className="w-6 h-6 text-wasabiDark mb-3" />
                <h3 className="font-bold text-sm text-ink">Aplikasi edit gratis</h3>
                <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">CapCut untuk potong &amp; subtitle otomatis. Tidak perlu langganan berbayar untuk kebutuhan dasar.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <Sun className="w-6 h-6 text-terracotta mb-3" />
                <h3 className="font-bold text-sm text-ink">Cahaya jendela</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Rekam menghadap jendela di siang hari. Cahaya alami gratis adalah light setup terbaik untuk pemula.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-ink text-canvas">
                <CheckCircle2 className="w-6 h-6 text-wasabi mb-3" />
                <h3 className="font-bold text-sm">Dan yang paling penting...</h3>
                <p className="text-xs text-stone-300 font-sans mt-1.5 leading-relaxed">Naskah yang jelas. Karsa menyediakan arahan visual, shot list, dan teleprompter — sisanya tinggal eksekusi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* STANDAR KUALITAS */}
        <section id="standar-kualitas" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracotta text-white">Standar Produksi</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3 leading-tight">Bukan cuma "ide konten". Ini sudah punya instruksi eksekusi.</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">Setiap output dibuat agar bisa langsung dipindahkan dari Notion ke proses produksi tanpa tim kamu harus menerjemahkan ulang maksudnya.</p>
                <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-ink text-canvas">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-wasabi font-bold">Definition of done</span>
                  <p className="font-serif text-xl mt-2">Kalau dibuka oleh orang lain di tim, mereka tetap tahu harus membuat apa.</p>
                </div>
              </div>
              <div className="lg:col-span-7 bg-white border-2 border-ink rounded-3xl overflow-hidden shadow-brutal">
                <div className="px-4 sm:px-6 py-4 border-b-2 border-ink flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-bold text-ink">CHECKLIST OUTPUT</span>
                  <span className="text-[10px] font-mono text-stone-500">Per video / post</span>
                </div>
                <div className="divide-y-2 divide-ink">
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">01</span><div><h3 className="font-bold text-sm text-ink">Hook dan angle</h3><p className="text-xs text-stone-600 font-sans mt-1">Alasan jelas kenapa audiens perlu berhenti scroll dan masalah apa yang sedang dibuka.</p></div></div>
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">02</span><div><h3 className="font-bold text-sm text-ink">Naskah per detik</h3><p className="text-xs text-stone-600 font-sans mt-1">Voiceover kata-per-kata, timing, intonasi, dan urutan penyampaian yang siap dibaca.</p></div></div>
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">03</span><div><h3 className="font-bold text-sm text-ink">Cue visual dan audio</h3><p className="text-xs text-stone-600 font-sans mt-1">Arahan gesture, B-Roll, framing, transisi, dan referensi audio untuk membantu proses rekam.</p></div></div>
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">04</span><div><h3 className="font-bold text-sm text-ink">Value dan proof</h3><p className="text-xs text-stone-600 font-sans mt-1">Penjelasan manfaat, contoh penggunaan, atau bukti yang membuat klaim produk lebih konkret.</p></div></div>
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">05</span><div><h3 className="font-bold text-sm text-ink">CTA yang sesuai konteks</h3><p className="text-xs text-stone-600 font-sans mt-1">Ajakan yang jelas: simpan, komentar, DM, kunjungi profil, atau beli sesuai tujuan kontennya.</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KOMPARASI */}
        <section id="komparasi" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Perbandingan Jujur</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Karsa vs Agensi vs In-house vs Prompt AI.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">Kami tunjukkan perbandingannya apa adanya, biar kamu yang memutuskan.</p>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="compare-table min-w-[760px]">
                <thead>
                  <tr>
                    <th className="w-[22%]">Aspek</th>
                    <th className="w-[24%]">Karsa Studio</th>
                    <th>Agensi</th>
                    <th>In-house</th>
                    <th>AI Prompt Mentah</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-sans">
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Biaya per bulan</td>
                    <td className="bg-wasabi/30 font-bold">Rp299 ribu sekali bayar</td>
                    <td className="text-stone-600">Rp5-20 juta</td>
                    <td className="text-stone-600">Rp4-8 juta (gaji 1 orang)</td>
                    <td className="text-stone-600">Rp0-500 ribu (langganan AI)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Waktu mulai</td>
                    <td className="bg-wasabi/30 font-bold">24 jam kerja</td>
                    <td className="text-stone-600">2-4 minggu</td>
                    <td className="text-stone-600">1-3 bulan rekrut &amp; ramp-up</td>
                    <td className="text-stone-600">Instan</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Riset kompetitor</td>
                    <td className="bg-wasabi/30 font-bold">Audit 1 akun acuan</td>
                    <td className="text-stone-600">Tergantung proposal</td>
                    <td className="text-stone-600">Manual, menyita waktu</td>
                    <td className="text-stone-600">Tidak ada</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Kualitas naskah</td>
                    <td className="bg-wasabi/30 font-bold">Kata-per-kata + cue visual/audio</td>
                    <td className="text-stone-600">Bervariasi per tim</td>
                    <td className="text-stone-600">Bergantung skill individu</td>
                    <td className="text-stone-600">Generik, butuh edit manual</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Kontrol brand voice</td>
                    <td className="bg-wasabi/30 font-bold">100% — kamu pegang tone &amp; kata</td>
                    <td className="text-stone-600">Medium — lewat rapat &amp; approval</td>
                    <td className="text-stone-600">Tinggi</td>
                    <td className="text-stone-600">Rendah — susah konsisten</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Kepemilikan aset</td>
                    <td className="bg-wasabi/30 font-bold">100% milik kamu setelah serah terima</td>
                    <td className="text-stone-600">Sering tertahan kontrak</td>
                    <td className="text-stone-600">100%</td>
                    <td className="text-stone-600">100%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">Komitmen kontrak</td>
                    <td className="bg-wasabi/30 font-bold">Tanpa kontrak, tanpa langganan</td>
                    <td className="text-stone-600">3-6 bulan minimal</td>
                    <td className="text-stone-600">Kontrak kerja</td>
                    <td className="text-stone-600">Tanpa kontrak</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="font-bold text-ink font-mono text-[11px]">SLA / garansi</td>
                    <td className="bg-wasabi/30 font-bold">24 jam + kalibrasi 48 jam</td>
                    <td className="text-stone-600">Tergantung kontrak</td>
                    <td className="text-stone-600">Tidak ada</td>
                    <td className="text-stone-600">Tidak ada</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-stone-500 font-mono mt-5">Perbandingan berdasarkan harga umum pasar Indonesia per 2026. Angka dapat berbeda sesuai kota dan skala kebutuhan.</p>
          </div>
        </section>

        {/* STUDI KASUS */}
        <section id="studi-kasus" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Case Study Nyata</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Output yang berubah menjadi hasil terukur.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 max-w-xl mx-auto leading-relaxed">Dua contoh implementasi berikut menunjukkan bagaimana kalender terstruktur membantu tim mengubah produk menjadi konten yang konsisten.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-canvas">
                <span className="badge-tag text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold text-ink">Case Study 01: Retail Fashion</span>
                <h3 className="text-base sm:text-lg font-bold text-ink mt-3 font-serif">Brand apparel lokal di Bandung</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                  Sebelumnya mengunggah foto katalog tanpa cerita. Setelah beralih ke 30 video script Karsa, konten diarahkan ke detail bahan dan panduan fitting tubuh.
                </p>
                <div className="mt-6 pt-4 border-t-2 border-ink grid grid-cols-2 gap-2 font-mono text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Saves rate</span>
                    <span className="text-ink font-bold text-base font-serif">+240%</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Waktu produksi</span>
                    <span className="text-terracotta font-bold text-base font-serif">Turun 80%</span>
                  </div>
                </div>
              </div>
              <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-canvas">
                <span className="badge-tag text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold text-ink">Case Study 02: F&amp;B Brand</span>
                <h3 className="text-base sm:text-lg font-bold text-ink mt-3 font-serif">Kedai kopi khusus cold brew</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                  Kalender konten diisi dengan naskah edukasi seputar pH kopi dan artikel SEO yang menjawab pertanyaan calon pembeli.
                </p>
                <div className="mt-6 pt-4 border-t-2 border-ink grid grid-cols-2 gap-2 font-mono text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Traffic Google</span>
                    <span className="text-ink font-bold text-base font-serif">1.800+/bln</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Posting teratur</span>
                    <span className="text-terracotta font-bold text-base font-serif">30 hari penuh</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-stone-500 font-mono mt-5">Metrik berasal dari implementasi project masing-masing. Hasil dapat berbeda sesuai konteks bisnis dan eksekusi.</p>
          </div>
        </section>

        {/* TESTIMONI */}
        <section id="testimoni" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Kata Mereka</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Dari tim kecil yang mulai berhenti panik tiap Minggu malam.</h2>
              <div className="mt-4 inline-flex items-center gap-2 badge-tag bg-white px-4 py-2 rounded-full font-mono text-xs font-bold text-ink">
                <span className="text-sunflower text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span>4.9/5 dari 40+ review batch</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {TESTIMONI.map((t) => (
                <div key={t.name} className={`bento-pop p-5 rounded-2xl ${t.dark ? "bg-ink text-canvas" : "bg-white"}`}>
                  <div className="flex items-center gap-1.5 text-sunflower text-xs mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className={`text-xs ${t.dark ? "text-stone-300" : "text-stone-700"} font-sans leading-relaxed`}>{t.quote}</p>
                  <div className={`mt-4 pt-3 border-t-2 ${t.dark ? "border-stone-700" : "border-ink"} flex items-center gap-2.5`}>
                    <span className={`w-8 h-8 rounded-full ${t.bg} border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] ${t.dark ? "text-ink" : ""}`}>{t.initial}</span>
                    <div><span className="block font-bold text-xs text-ink font-sans">{t.name}</span><span className={`block font-mono text-[10px] ${t.dark ? "text-stone-400" : "text-stone-500"}`}>{t.role}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-stone-500 font-mono mt-5">Testimoni dikumpulkan dari percakapan WhatsApp &amp; email customer. Nama disamarkan demi privasi.</p>
          </div>
        </section>

        {/* BONUS STACK */}
        <section id="bonus-stack" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Bonus Stack Eksklusif</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">5 Bonus Tambahan untuk Memaksimalkan Konten</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Semua bonus langsung masuk ke Notion Workspace kamu tanpa biaya ekstra.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <div className="bento-pop p-5 sm:p-6 rounded-3xl flex flex-col justify-between bg-canvas">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-stone-500 mb-2">
                    <span className="font-bold text-ink">Bonus 01</span>
                    <span className="line-through text-stone-400">Rp250.000</span>
                  </div>
                  <h3 className="font-bold text-ink font-serif text-lg">50 Template Hook untuk Membuka Video</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                    Koleksi 50 kalimat pembuka yang bisa kamu adaptasi untuk berbagai jenis promosi produk.
                  </p>
                </div>
                <span className="badge-tag text-[10px] font-mono text-ink font-bold bg-wasabi px-2.5 py-1 rounded-lg mt-4 inline-block text-center">SUDAH TERMASUK</span>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-3xl flex flex-col justify-between bg-canvas">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-stone-500 mb-2">
                    <span className="font-bold text-ink">Bonus 02</span>
                    <span className="line-through text-stone-400">Rp200.000</span>
                  </div>
                  <h3 className="font-bold text-ink font-serif text-lg">Panduan Optimasi Bio &amp; Highlight</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                    Struktur profil Instagram agar pengunjung langsung memahami value bisnismu dalam 5 detik.
                  </p>
                </div>
                <span className="badge-tag text-[10px] font-mono text-ink font-bold bg-wasabi px-2.5 py-1 rounded-lg mt-4 inline-block text-center">SUDAH TERMASUK</span>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-3xl flex flex-col justify-between bg-canvas">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-stone-500 mb-2">
                    <span className="font-bold text-ink">Bonus 03</span>
                    <span className="line-through text-stone-400">Rp300.000</span>
                  </div>
                  <h3 className="font-bold text-ink font-serif text-lg">Content Repurposing Framework</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                    SOP untuk mengubah satu ide video menjadi carousel Instagram, thread X, dan status WhatsApp.
                  </p>
                </div>
                <span className="badge-tag text-[10px] font-mono text-ink font-bold bg-wasabi px-2.5 py-1 rounded-lg mt-4 inline-block text-center">SUDAH TERMASUK</span>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-3xl flex flex-col justify-between bg-canvas">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-stone-500 mb-2">
                    <span className="font-bold text-ink">Bonus 04</span>
                    <span className="line-through text-stone-400">Rp350.000</span>
                  </div>
                  <h3 className="font-bold text-ink font-serif text-lg">Garansi Kalibrasi Sudut Pesan 48 Jam</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                    Penyesuaian istilah produk dan tone naskah jika ada bagian yang kurang pas dalam 48 jam pertama.
                  </p>
                </div>
                <span className="badge-tag text-[10px] font-mono text-ink font-bold bg-wasabi px-2.5 py-1 rounded-lg mt-4 inline-block text-center">SUDAH TERMASUK</span>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-3xl flex flex-col justify-between bg-canvas sm:col-span-2 lg:col-span-2">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-stone-500 mb-2">
                    <span className="font-bold text-ink">Bonus 05</span>
                    <span className="line-through text-stone-400">Rp350.000</span>
                  </div>
                  <h3 className="font-bold text-ink font-serif text-lg">Audio &amp; Pacing Blueprint</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                    Panduan memilih referensi audio dan tempo jeda bicara agar video terasa lebih hidup.
                  </p>
                </div>
                <span className="badge-tag text-[10px] font-mono text-ink font-bold bg-wasabi px-2.5 py-1 rounded-lg mt-4 inline-block text-center">SUDAH TERMASUK</span>
              </div>
            </div>
          </div>
        </section>

        {/* HARGA */}
        <section id="harga" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Harga Transparan</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Pilih ritme yang cocok dengan bisnismu.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Satu harga flat, tanpa langganan otomatis. Tidak ada kejutan di bulan berikutnya.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-white flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-500">Mulai Coba</span>
                <h3 className="font-serif text-2xl text-ink mt-1">1 Batch</h3>
                <div className="mt-3 font-mono"><span className="text-3xl font-bold font-serif text-ink">Rp299.000</span><span className="text-xs text-stone-500 block mt-1">sekali bayar / 30 hari konten</span></div>
                <ul className="mt-5 space-y-2.5 text-xs font-sans text-stone-700 flex-1">
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>30 script + 30 caption + 4 artikel SEO</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Audit kompetitor + Notion OS + B-Roll guide</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>5 bonus eksklusif + garansi kalibrasi 48 jam</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>SLA pengiriman 24 jam kerja</span></li>
                </ul>
                <a href="#order" className="mt-6 badge-tag bg-ink text-canvas hover:bg-terracotta hover:text-white text-center py-3 rounded-xl font-mono text-xs font-bold transition">Isi Brief Batch 1 &rarr;</a>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-wasabi/30 flex flex-col relative">
                <span className="absolute -top-3 left-5 badge-tag bg-terracotta text-white px-3 py-1 rounded-lg text-[10px] font-mono font-bold">PALING LARIS</span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-wasabiDark">Ritme 3 Bulan</span>
                <h3 className="font-serif text-2xl text-ink mt-1">3 Batch</h3>
                <div className="mt-3 font-mono"><span className="text-3xl font-bold font-serif text-ink">Rp799.000</span><span className="text-xs text-stone-600 block mt-1">hemat Rp98.000 &bull; 90 hari konten</span></div>
                <ul className="mt-5 space-y-2.5 text-xs font-sans text-stone-800 flex-1">
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Semua isi paket 1 Batch x3 (diproses bertahap)</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Prioritas antrean produksi</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Data belajar batch 1 dipakai untuk batch 2</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Kalibrasi pesan diperpanjang tiap batch</span></li>
                </ul>
                <a href="#order" className="mt-6 badge-tag bg-ink text-canvas hover:bg-terracotta hover:text-white text-center py-3 rounded-xl font-mono text-xs font-bold transition">Ambil 3 Batch &rarr;</a>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-ink text-canvas flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-wasabi">Program 6 Bulan</span>
                <h3 className="font-serif text-2xl mt-1">6 Batch</h3>
                <div className="mt-3 font-mono"><span className="text-3xl font-bold font-serif text-wasabi">Rp1.490.000</span><span className="text-xs text-stone-400 block mt-1">hemat Rp304.000 &bull; 180 hari konsisten</span></div>
                <ul className="mt-5 space-y-2.5 text-xs font-sans text-stone-300 flex-1">
                  <li className="flex gap-2"><span className="text-wasabi font-bold">+</span><span>Semua isi paket 3 Batch</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">+</span><span>1 sesi kalibrasi strategi 30 menit per 2 bulan</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">+</span><span>Laporan tren performa konten per batch</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">+</span><span>Harga terkunci untuk penambahan batch</span></li>
                </ul>
                <a href="#order" className="mt-6 badge-tag bg-wasabi text-ink hover:bg-white text-center py-3 rounded-xl font-mono text-xs font-bold transition">Tanya Program 6 Bulan &rarr;</a>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-white shadow-brutal-sm">
              <span className="font-mono text-xs font-bold text-ink text-center sm:text-left">Bandingkan: agensi konten bulanan rata-rata Rp5-20 juta. 3 batch Karsa = Rp799 ribu, sekali bayar.</span>
              <a href="#calculator" className="text-xs font-mono font-bold text-terracotta hover:underline shrink-0">Hitung penghematanmu &rarr;</a>
            </div>
          </div>
        </section>

        {/* VALUE STACK */}
        <section id="value-stack" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Rincian Paket</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Satu batch, semua fondasi kontenmu.</h2>
            </div>
            <div className="bento-pop rounded-3xl overflow-hidden font-mono text-xs">
              <div className="p-3.5 sm:p-5 bg-ink text-canvas flex justify-between items-center font-bold">
                <span>Komponen yang Kamu Terima</span>
                <span>Nilai Referensi</span>
              </div>
              <div className="divide-y-2 divide-ink p-2 sm:p-4 text-ink bg-white">
                <div className="py-2.5 px-2 flex justify-between"><span>30 Naskah Video Pendek Terstruktur</span><span className="font-bold">Rp1.500.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>30 Caption AIDA &amp; Riset Tagar</span><span className="font-bold">Rp600.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>4 Artikel Blog SEO (1.000 kata)</span><span className="font-bold">Rp800.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>Audit Angle &amp; Gap Kompetitor</span><span className="font-bold">Rp400.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>Notion Dynamic Content OS Template</span><span className="font-bold">Rp300.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>Panduan Shot List B-Roll Kamera HP</span><span className="font-bold">Rp250.000</span></div>
                <div className="py-2.5 px-2 flex justify-between text-terracotta font-bold"><span>5 Bonus Eksklusif Tambahan</span><span>Rp1.450.000</span></div>
              </div>
              <div className="p-4 sm:p-6 bg-wasabi/40 border-t-2 border-ink flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-stone-600 block text-[11px] font-bold">Total Nilai Referensi:</span>
                  <span className="line-through text-stone-400 text-sm sm:text-base">Rp5.300.000</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-stone-600 block text-[11px] font-bold">Harga satu kali per batch:</span>
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-ink">Rp299.000</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GARANSI */}
        <section id="garansi" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Komitmen Kami</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Garansi yang tertulis, bukan sekadar janji.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">Tiga lapis perlindungan sebelum dan sesudah kamu memesan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-white">
                <span className="w-10 h-10 rounded-xl bg-terracotta text-white border-2 border-ink flex items-center justify-center"><Clock3 className="w-5 h-5" /></span>
                <h3 className="font-serif text-xl text-ink mt-4">SLA 24 Jam</h3>
                <p className="text-xs text-stone-600 font-sans mt-2 leading-relaxed">Deliverable dikirim maksimal 1x24 jam kerja setelah brief lengkap &amp; pembayaran terkonfirmasi.</p>
                <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] font-bold text-terracotta">Terlambat? +5 naskah gratis</div>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-wasabi/25">
                <span className="w-10 h-10 rounded-xl bg-wasabi text-ink border-2 border-ink flex items-center justify-center"><SlidersHorizontal className="w-5 h-5" /></span>
                <h3 className="font-serif text-xl text-ink mt-4">Kalibrasi 48 Jam</h3>
                <p className="text-xs text-stone-700 font-sans mt-2 leading-relaxed">Tone, istilah produk, dan sudut pesan bisa dikalibrasi dalam 48 jam pertama. Update kembali ke Notion maksimal 12 jam kerja.</p>
                <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] font-bold text-wasabiDark">Gratis, sudah termasuk</div>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-white">
                <span className="w-10 h-10 rounded-xl bg-sunflower text-ink border-2 border-ink flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></span>
                <h3 className="font-serif text-xl text-ink mt-4">Hak Cipta &amp; Privasi</h3>
                <p className="text-xs text-stone-600 font-sans mt-2 leading-relaxed">Semua materi menjadi milik kamu setelah serah terima. Brief tidak dibagikan ke pihak lain. Opsi NDA tersedia.</p>
                <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] font-bold text-ink">Detail di halaman Jaminan SLA</div>
              </div>
            </div>
            <div className="mt-6 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-canvas flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold text-ink text-center sm:text-left">Proses pengerjaan bisa dipantau dari Member Workspace — status order kamu update di tiap tahap.</span>
              <Link href="/login" className="text-xs font-mono font-bold text-terracotta hover:underline shrink-0">Buka Member Workspace &rarr;</Link>
            </div>
          </div>
        </section>

        {/* COCOK UNTUK */}
        <section id="cocok-untuk" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Apakah Ini Buat Kamu?</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3">Satu sistem untuk tim kecil yang ingin bergerak cepat.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">Karsa paling cocok untuk bisnis yang sudah punya produk, tetapi belum punya waktu atau sistem untuk mengubahnya menjadi konten rutin.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-wasabi/25">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-wasabiDark mb-4">
                  <span className="w-6 h-6 rounded-full bg-wasabi border-2 border-ink flex items-center justify-center">✓</span>
                  Cocok untuk kamu jika...
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-800 font-sans">
                  <li className="flex gap-2"><span className="font-bold text-terracotta">01</span><span>Punya produk atau layanan yang siap dipasarkan.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-terracotta">02</span><span>Bisa merekam sendiri dengan HP atau punya satu orang talent.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-terracotta">03</span><span>Butuh arah yang jelas untuk posting konsisten selama 30 hari.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-terracotta">04</span><span>Ingin menghemat waktu tanpa menyerahkan seluruh brand voice ke agensi.</span></li>
                </ul>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-canvas">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-terracotta mb-4">
                  <span className="w-6 h-6 rounded-full bg-terracotta text-white border-2 border-ink flex items-center justify-center">!</span>
                  Kurang cocok jika...
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-sans">
                  <li className="flex gap-2"><span className="font-bold text-stone-400">01</span><span>Yang kamu cari adalah jasa shooting, editing, atau talent di lokasi.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-stone-400">02</span><span>Produk belum siap dijual atau positioning-nya masih berubah setiap hari.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-stone-400">03</span><span>Kamu membutuhkan konten real-time untuk berita atau tren harian.</span></li>
                </ul>
                <p className="pt-4 mt-4 border-t-2 border-ink text-[11px] font-mono text-stone-500">Kalau kebutuhanmu di luar cakupan ini, tetap boleh konsultasi lewat brief.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HASIL */}
        <section id="hasil" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Sebelum &amp; Sesudah</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Apa yang berubah dalam 30 hari.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Bukan janji viral. Ini perubahan sistem yang bisa kamu rasakan langsung.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Postingan bulanan</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Dari 0-4 posting sporadis menjadi 30 video terencana dengan tanggal jelas di kalender.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Ide konten</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Dari "stuck tiap Minggu malam" menjadi 30 angle siap pakai yang tinggal direkam.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Proses rekam</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Dari improvisasi di depan kamera menjadi naskah per detik + shot list yang menghilangkan tebak-tebakan.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-wasabi/25">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Caption &amp; tagar</h3>
                <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Dari caption asal-asalan menjadi copywriting AIDA + riset tagar 3 tier siap tempel.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-sunflower/30">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Traffic Google</h3>
                <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Dari blog kosong menjadi 4 artikel SEO yang mulai mendatangkan pembeli dari pencarian.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-ink text-canvas">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-400">SEBELUM</span><span className="text-stone-500">&rarr;</span><span className="text-wasabi">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm mt-3">Tim &amp; sistem</h3>
                <p className="text-xs text-stone-300 font-sans mt-1.5 leading-relaxed">Dari "siapa yang ngurus konten?" menjadi SOP produksi mingguan yang bisa dijalankan siapa pun.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CAKUPAN */}
        <section id="cakupan" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Biar Ekspektasinya Jelas</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3">Apa yang termasuk dan apa yang tidak?</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">Kejelasan scope membuat proses lebih cepat dan hasil lebih mudah dipakai oleh tim kamu.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-wasabi/25">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-ink">
                  <span className="w-7 h-7 rounded-full bg-wasabi border-2 border-ink flex items-center justify-center font-bold">✓</span>
                  <h3 className="font-serif text-xl text-ink">Termasuk dalam batch</h3>
                </div>
                <ul className="mt-5 space-y-3 text-xs sm:text-sm font-sans text-stone-800">
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Riset angle dan audit satu akun kompetitor acuan.</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>30 video script, caption AIDA, dan riset tagar.</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>4 artikel SEO, Notion Content OS, dan backup Docs.</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Shot-list B-Roll, 5 bonus, dan kalibrasi pesan 48 jam.</span></li>
                </ul>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-canvas">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-ink">
                  <span className="w-7 h-7 rounded-full bg-terracotta text-white border-2 border-ink flex items-center justify-center font-bold">-</span>
                  <h3 className="font-serif text-xl text-ink">Tidak termasuk dalam batch</h3>
                </div>
                <ul className="mt-5 space-y-3 text-xs sm:text-sm font-sans text-stone-700">
                  <li className="flex gap-2"><span className="text-stone-400 font-bold">-</span><span>Shooting, talent, atau produksi video di lokasi.</span></li>
                  <li className="flex gap-2"><span className="text-stone-400 font-bold">-</span><span>Editing video, desain aset, dan pengelolaan posting harian.</span></li>
                  <li className="flex gap-2"><span className="text-stone-400 font-bold">-</span><span>Budget iklan, pembelian media, atau jaminan angka performa tertentu.</span></li>
                  <li className="flex gap-2"><span className="text-stone-400 font-bold">-</span><span>Penulisan ulang di luar kalibrasi tone dan istilah brand.</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-5 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-canvas flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta font-bold">Sebelum mulai</span>
                <p className="text-xs sm:text-sm text-stone-700 font-sans mt-1">Siapkan deskripsi produk, target pembeli, satu kompetitor acuan, dan akses komunikasi yang aktif.</p>
              </div>
              <a href="#order" className="text-xs font-mono font-bold text-ink hover:text-terracotta transition shrink-0">Isi brief &rarr;</a>
            </div>
          </div>
        </section>

        {/* REGIONAL */}
        <section id="regional" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
              <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-white">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Jangkauan</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-ink mt-3 leading-tight">Untuk brand di seluruh Indonesia.</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">Pengerjaan sepenuhnya jarak jauh dan asinkron — kamu tidak perlu datang ke mana pun. Semua komunikasi lewat WhatsApp &amp; email, deliverables dikirim sebagai tautan.</p>
                <div className="mt-5 grid grid-cols-3 gap-2.5 font-mono text-[10px] font-bold text-center">
                  <div className="p-3 rounded-xl border-2 border-ink bg-canvas"><span className="block text-terracotta text-sm">09.00-18.00</span>Jam kerja WIB</div>
                  <div className="p-3 rounded-xl border-2 border-ink bg-canvas"><span className="block text-terracotta text-sm">&le; 4 Jam</span>Balasan WhatsApp</div>
                  <div className="p-3 rounded-xl border-2 border-ink bg-canvas"><span className="block text-terracotta text-sm">100%</span>Jarak jauh</div>
                </div>
              </div>
              <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-ink text-canvas">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Keamanan Data</span>
                <h2 className="text-2xl sm:text-3xl font-serif mt-3 leading-tight">Brief kamu adalah milik kamu.</h2>
                <p className="text-xs sm:text-sm text-stone-300 font-sans mt-3 leading-relaxed">Isi brief, data kontak, dan dokumen kerja hanya dipakai untuk mengerjakan batch kamu — tidak dijual, tidak dibagikan, tidak dipakai untuk produk lain.</p>
                <ul className="mt-5 space-y-2.5 text-xs font-sans text-stone-200">
                  <li className="flex gap-2"><span className="text-wasabi font-bold">&#10003;</span><span>Kontak hanya untuk checkout &amp; pengiriman hasil</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">&#10003;</span><span>Hak komersial materi jadi milikmu setelah serah terima</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">&#10003;</span><span>Opsi NDA untuk brief sensitif</span></li>
                </ul>
                <Link href="/privacy" className="inline-flex items-center gap-2 mt-5 text-xs font-mono font-bold text-wasabi hover:underline">Baca kebijakan privasi <span>&rarr;</span></Link>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section id="calculator" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Kalkulator Penghematan</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Hitung waktu dan biaya yang bisa kamu pangkas.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Bandingkan biaya satu batch Karsa dengan biaya perencanaan konten yang biasanya kamu keluarkan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono text-xs">
              <div className="bento-pop p-5 sm:p-6 rounded-3xl bg-surface space-y-4 sm:space-y-5">
                <div>
                  <div className="flex justify-between font-bold text-ink mb-2">
                    <span>Jam Merencanakan Konten / Minggu:</span>
                    <span className="text-terracotta text-sm font-bold">{hours} Jam</span>
                  </div>
                  <input type="range" id="sliderHours" aria-label="Jam merencanakan konten per minggu" min={2} max={15} step={1} value={hours} onChange={(event) => setHours(parseInt(event.target.value))} className="w-full accent-terracotta cursor-pointer py-1.5" />
                </div>
                <div>
                  <div className="flex justify-between font-bold text-ink mb-2">
                    <span>Biaya Tim / Agensi per Bulan:</span>
                    <span className="text-terracotta text-sm font-bold">Rp{agencyPrice.toLocaleString("id-ID")}</span>
                  </div>
                  <input type="range" id="sliderAgency" aria-label="Biaya tim atau agensi per bulan" min={1500000} max={8000000} step={250000} value={agencyPrice} onChange={(event) => setAgencyPrice(parseInt(event.target.value))} className="w-full accent-terracotta cursor-pointer py-1.5" />
                </div>
              </div>
              <div className="bento-pop p-5 sm:p-6 rounded-3xl flex flex-col justify-between space-y-4 bg-wasabi/20">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                    <span className="text-stone-700 font-bold">Waktu Perencanaan / Bulan:</span>
                    <span className="text-sm sm:text-base font-bold text-ink font-serif">{savedHours} Jam / Bulan</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                    <span className="text-stone-700 font-bold">Biaya Karsa Studio:</span>
                    <span className="text-sm sm:text-base font-bold text-ink font-serif">Rp299.000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                    <span className="text-stone-700 font-bold">Selisih Biaya:</span>
                    <span className="text-lg sm:text-2xl font-bold text-terracotta font-serif">Rp{netSavings.toLocaleString("id-ID")} / Bulan</span>
                  </div>
                </div>
                <a href="#order" className="bento-pop bg-ink text-canvas hover:bg-terracotta hover:text-white py-3.5 rounded-2xl font-bold transition flex items-center justify-center gap-2 text-center min-h-[46px] sm:min-h-[48px]">
                  <span>Lihat paket &amp; isi brief &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EDUKASI / CONTENT SCHOOL */}
        <section id="edukasi" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Content School</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">5 prinsip konten yang bertahan (gratis dibaca).</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Ini prinsip yang dipakai tim Karsa di setiap naskah. Bisa kamu pakai bahkan tanpa memesan.</p>
            </div>
            <div className="space-y-3">
              {PRINCIPLES.map((item) => (
                <details key={item.title} className="bento-pop rounded-2xl bg-white group">
                  <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-center justify-between gap-4 font-mono text-xs font-bold text-ink">
                    <span>{item.title}</span>
                    <span className="text-terracotta transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t-2 border-ink text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                    {item.body}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* PREVIEW */}
        <section id="preview" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6 sm:mb-8">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Transparansi Mutu</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Lihat contoh output sebelum kamu memesan.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 max-w-xl mx-auto leading-relaxed">Preview ini menunjukkan format dan kedalaman pengerjaan. Topik, angle, dan tone akan disesuaikan dengan brief bisnis kamu.</p>
            </div>
            <div role="tablist" aria-label="Jenis output" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:justify-center mb-3">
              {(["script", "caption", "seo"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  id={`tab-${cat}`}
                  role="tab"
                  aria-selected={category === cat}
                  aria-controls="samplePanel"
                  onClick={() => { setCategory(cat); setSampleIdx(0); }}
                  className={`tab-btn ${category === cat ? "active badge-tag bg-ink text-white" : "badge-tag bg-white text-ink"} px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition shrink-0`}
                >
                  {cat === "script" ? "Video Scripts" : cat === "caption" ? "Captions AIDA" : "Struktur SEO"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:justify-center mb-4 sm:mb-5 font-mono text-xs">
              {SAMPLE_DATA[category].map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-pressed={sampleIdx === idx}
                  onClick={() => setSampleIdx(idx)}
                  className={`sample-pill ${sampleIdx === idx ? "active px-3 py-1.5 rounded-lg border-2 border-ink bg-ink text-white" : "px-3 py-1.5 rounded-lg border-2 border-ink bg-white text-ink"} font-bold shrink-0`}
                >
                  {category === "script" ? `Contoh ${idx + 1}: ${idx === 0 ? "Kuliner (F&B)" : "Skincare / D2C"}` : category === "caption" ? `Contoh ${idx + 1}: ${idx === 0 ? "Kuliner (F&B)" : "Skincare / D2C"}` : `Contoh ${idx + 1}: ${idx === 0 ? "Kuliner (F&B)" : "Skincare / D2C"}`}
                </button>
              ))}
            </div>
            <div id="samplePanel" role="tabpanel" aria-live="polite" className="bento-pop p-5 sm:p-8 rounded-3xl bg-white font-mono text-xs min-h-[240px]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 sm:pb-3 border-b-2 border-ink text-stone-500 gap-1 mb-3 sm:mb-4">
                <span id="sampleTitle" className="font-bold text-ink sm:font-normal">{sample.title}</span>
                <span id="sampleBadge" className="text-[10px] badge-tag bg-wasabi px-2 py-0.5 rounded text-ink font-bold self-start sm:self-auto">{sample.niche}</span>
              </div>
              <div id="sampleBody" className="space-y-3 sm:space-y-4 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                {sample.body}
              </div>
            </div>
          </div>
        </section>

        {/* ORDER FORM */}
        <section id="order" className="py-12 sm:py-20 bg-canvas border-b-2 border-ink">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracotta text-white">SLA Maks. 24 Jam</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Mulai dengan brief singkat.</h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 font-mono">Jawabanmu membantu tim Karsa menulis kalender yang terasa spesifik untuk bisnis kamu.</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
              <form id="orderForm" onSubmit={handleSubmit} className="lg:col-span-7 bento-pop p-5 sm:p-10 rounded-3xl space-y-4 bg-white">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputBrand">Nama Brand / Bisnis *</label>
                  <input id="inputBrand" type="text" required autoComplete="organization" value={form.brand} onChange={(event) => setFormField("brand", event.target.value)} placeholder="Contoh: Kopi Teras Senja" className={inputClassName} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCategory">Kategori Industri *</label>
                    <select id="inputCategory" required value={form.category} onChange={(event) => setFormField("category", event.target.value)} className={inputClassName}>
                      {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCompetitor">1 Akun Kompetitor Utama</label>
                    <input id="inputCompetitor" type="text" value={form.competitor} onChange={(event) => setFormField("competitor", event.target.value)} placeholder="@namakompetitor" className={inputClassName} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputDesc">Produk Utama &amp; Target Pembeli *</label>
                  <textarea id="inputDesc" rows={3} required value={form.description} onChange={(event) => setFormField("description", event.target.value)} placeholder="Jelaskan produk unggulan, rentang harga, dan target pembeli utama kamu..." className={inputClassName}></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputGoal">Tujuan Konten Utama *</label>
                    <select id="inputGoal" required value={form.goal} onChange={(event) => setFormField("goal", event.target.value)} className={inputClassName}>
                      {GOAL_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputTone">Tone Komunikasi *</label>
                    <select id="inputTone" required value={form.tone} onChange={(event) => setFormField("tone", event.target.value)} className={inputClassName}>
                      {TONE_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputChannel">Platform Prioritas</label>
                  <input id="inputChannel" type="text" value={form.channel} onChange={(event) => setFormField("channel", event.target.value)} placeholder="Contoh: Instagram Reels, TikTok, Threads" className={inputClassName} />
                  <p className="text-[10px] text-stone-500 font-sans mt-1">Boleh dikosongkan kalau kamu ingin kami bantu menentukan prioritasnya.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputEmail">Email Penerima File *</label>
                    <input id="inputEmail" type="email" required autoComplete="email" value={form.email} onChange={(event) => setFormField("email", event.target.value)} placeholder="nama@email.com" className={inputClassName} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputPhone">Nomor WhatsApp Aktif *</label>
                    <input id="inputPhone" type="tel" required autoComplete="tel" value={form.phone} onChange={(event) => setFormField("phone", event.target.value)} placeholder="081234567890" className={inputClassName} />
                  </div>
                </div>
                <div className="pt-2 sm:pt-3">
                  <button type="submit" className="w-full py-4 bg-terracotta hover:bg-ink text-white font-mono font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[50px] shadow-brutal">
                    <span>Kirim Brief &amp; Lanjut ke Checkout (Rp299.000)</span>
                    <ArrowRight className="w-4 h-4 text-wasabi" />
                  </button>
                  <p id="formStatus" role="status" aria-live="polite" className="text-center text-[10px] sm:text-[11px] text-stone-600 mt-2.5 min-h-4">{formStatus}</p>
                  <p className="text-center text-[10px] sm:text-[11px] font-mono text-stone-500 mt-2.5 sm:mt-3 font-bold">
                    Garansi kalibrasi sudut pesan selama 48 jam sudah termasuk.
                  </p>
                  <p className="text-center text-[10px] text-stone-500 mt-2 leading-relaxed">Data kontak hanya digunakan untuk checkout dan pengiriman hasil. Lihat <Link href="/privacy" className="underline hover:text-terracotta">kebijakan privasi</Link>.</p>
                </div>
              </form>
              <aside className="lg:col-span-5 space-y-4">
                <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-ink text-canvas">
                  <div className="flex items-center justify-between gap-3 pb-4 border-b-2 border-stone-700">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-wasabi font-bold">Karsa Content Batch</span>
                      <h3 className="font-serif text-2xl mt-1">30 Hari Siap Jalan</h3>
                    </div>
                    <span className="text-xl font-bold font-mono text-wasabi">Rp299.000</span>
                  </div>
                  <ul className="space-y-3 mt-5 text-xs font-sans text-stone-200">
                    <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>30 video script kata-per-kata</span></li>
                    <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>30 caption AIDA dan riset tagar</span></li>
                    <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>4 artikel SEO dan Notion Content OS</span></li>
                    <li className="flex gap-2"><span className="text-wasabi font-bold">✓</span><span>5 bonus, shot-list, dan audit angle</span></li>
                  </ul>
                  <div className="mt-5 pt-4 border-t-2 border-stone-700 text-[11px] font-mono text-stone-400 leading-relaxed">
                    Satu kali bayar. Tidak ada langganan otomatis. Brief diproses setelah pembayaran terkonfirmasi.
                  </div>
                </div>
                <div className="p-5 rounded-2xl border-2 border-ink bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-ink" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Brief kamu aman dan terarah.</h4>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed mt-1">Kami memakai jawabanmu sebagai acuan tone, target, dan sudut pesan. Kalau ada yang perlu dikalibrasi, kamu punya waktu 48 jam setelah file diterima.</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6 sm:mb-8">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Pusat Informasi</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">24 Pertanyaan Sebelum Kamu Memesan</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Ketahui segala detail sebelum kamu memesan batch konten 30 hari.</p>
            </div>
            <div className="max-w-md mx-auto mb-6 sm:mb-8 relative">
              <label htmlFor="faqSearch" className="sr-only">Cari pertanyaan FAQ</label>
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input type="text" id="faqSearch" value={faqQuery} onChange={(event) => setFaqQuery(event.target.value)} placeholder="Cari: revisi, tone, format, SLA, pembayaran, invoice, bahasa..." className="w-full bg-canvas border-2 border-ink rounded-xl pl-10 pr-4 py-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-mono transition min-h-[44px]" />
            </div>
            <div className="space-y-3" id="faqContainer" aria-live="polite">
              {filteredFaqs.map((item) => {
                const originalIdx = FAQ_ITEMS.indexOf(item);
                return (
                  <button
                    key={item.q}
                    type="button"
                    className="faq-item bento-pop w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left"
                    aria-expanded={openFaq === originalIdx}
                    aria-controls={`faq-answer-${originalIdx + 1}`}
                    onClick={() => toggleFaq(originalIdx)}
                  >
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-xs font-mono font-bold text-terracotta">{String(originalIdx + 1).padStart(2, "0")}</span>
                      <h3 className="text-xs sm:text-base font-bold text-ink flex-1">{item.q}</h3>
                      <Plus className={`w-4 h-4 text-ink transition-transform shrink-0 ${openFaq === originalIdx ? "rotate-45" : ""}`} />
                    </div>
                    {openFaq === originalIdx && (
                      <p id={`faq-answer-${originalIdx + 1}`} className="text-xs sm:text-sm text-stone-600 mt-2.5 sm:mt-3 pl-5 sm:pl-8 leading-relaxed font-sans">
                        {item.a}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
            {filteredFaqs.length === 0 && (
              <p id="faqEmptyState" className="text-center text-xs text-stone-500 font-mono mt-5">Tidak ada pertanyaan yang cocok. Coba kata kunci lain seperti revisi atau pembayaran.</p>
            )}
          </div>
        </section>

        {/* KONTAK */}
        <section id="kontak" className="py-10 sm:py-14 border-b-2 border-ink bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bento-pop rounded-3xl p-5 sm:p-8 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
              <div>
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Butuh Bantuan?</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-3">Tim kami balas &le; 4 jam kerja.</h2>
              </div>
              <div className="font-mono text-xs space-y-2.5">
                <div className="flex items-center gap-2.5"><span className="w-7 h-7 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center shrink-0"><MessageCircle className="w-3.5 h-3.5 text-ink" /></span><span>WhatsApp: <strong className="text-ink">+62 812-3456-7890</strong></span></div>
                <div className="flex items-center gap-2.5"><span className="w-7 h-7 rounded-lg bg-sunflower border-2 border-ink flex items-center justify-center shrink-0"><Mail className="w-3.5 h-3.5 text-ink" /></span><span>Email: <strong className="text-ink">halo@usekarsa.co</strong></span></div>
                <div className="flex items-center gap-2.5"><span className="w-7 h-7 rounded-lg bg-terracottaLight border-2 border-ink flex items-center justify-center shrink-0"><CalendarClock className="w-3.5 h-3.5 text-terracotta" /></span><span>Senin-Jumat, 09.00-18.00 WIB</span></div>
              </div>
              <div className="md:text-right">
                <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Slot produksi mingguan terbatas</div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed max-w-xs md:ml-auto">Batch diproses sesuai urutan pembayaran. Pesan lebih awal agar antrean tidak menunda tanggal mulai kamu.</p>
                <a href="#order" className="mt-3 inline-flex items-center gap-2 badge-tag bg-ink text-canvas px-4 py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-terracotta hover:text-white transition">Amankan slot minggu ini &rarr;</a>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="final-cta" className="py-12 sm:py-20 bg-terracotta text-white border-b-2 border-ink">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bento-pop rounded-3xl p-6 sm:p-10 bg-terracotta text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-wasabi text-ink">Satu keputusan untuk 30 hari ke depan</span>
                <h2 className="text-3xl sm:text-5xl font-serif mt-3 leading-tight">Berhenti mulai dari nol setiap minggu.</h2>
                <p className="text-xs sm:text-sm text-white/85 font-sans leading-relaxed mt-3">Isi brief hari ini. Setelah diproses, kamu punya kalender konten yang jelas untuk direkam, ditulis, dan dipublikasikan.</p>
              </div>
              <div className="shrink-0 md:text-right">
                <div className="font-mono text-xs font-bold text-white/75 mb-2">Karsa Content Batch</div>
                <div className="font-serif text-3xl text-wasabi">Rp299.000</div>
                <a href="#order" className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ink text-canvas font-mono text-xs font-bold hover:bg-wasabi hover:text-ink transition shadow-brutal-sm">Isi brief sekarang <span>&rarr;</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10 sm:py-14 bg-ink text-stone-300 text-xs font-mono border-t-2 border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-canvas text-2xl font-normal">Karsa</span>
                <span className="badge-tag text-[9px] font-mono uppercase px-1.5 py-0.5 bg-wasabi text-ink rounded font-bold">Studio</span>
              </div>
              <p className="text-[11px] text-stone-400 font-sans mt-3 leading-relaxed">Sistem konten siap eksekusi untuk UMKM Indonesia. 30 hari naskah kata-per-kata, tanpa kontrak, tanpa langganan.</p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-stone-400">
                <span className="inline-block px-2 py-1 bg-wasabi text-ink rounded font-bold border border-ink">SLA 24 Jam</span>
                <span className="inline-block px-2 py-1 bg-terracotta text-white rounded font-bold border border-ink">Kalibrasi 48 Jam</span>
              </div>
            </div>
            <div>
              <h3 className="text-canvas font-bold uppercase tracking-wider text-[10px] mb-3">Navigasi</h3>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#deliverables" className="hover:text-wasabi transition">Isi Paket (6 Output)</a></li>
                <li><a href="#pillar-konten" className="hover:text-wasabi transition">Pilar Konten 30 Hari</a></li>
                <li><a href="#anatomi-script" className="hover:text-wasabi transition">Anatomi Script</a></li>
                <li><a href="#cara-kerja" className="hover:text-wasabi transition">Cara Kerja</a></li>
                <li><a href="#preview" className="hover:text-wasabi transition">Contoh Output</a></li>
                <li><a href="#faq" className="hover:text-wasabi transition">FAQ (24 Pertanyaan)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-canvas font-bold uppercase tracking-wider text-[10px] mb-3">Keputusan</h3>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#harga" className="hover:text-wasabi transition">Harga &amp; Paket</a></li>
                <li><a href="#komparasi" className="hover:text-wasabi transition">Karsa vs Agensi vs In-house</a></li>
                <li><a href="#testimoni" className="hover:text-wasabi transition">Testimoni Customer</a></li>
                <li><a href="#studi-kasus" className="hover:text-wasabi transition">Case Study</a></li>
                <li><a href="#garansi" className="hover:text-wasabi transition">Garansi &amp; SLA</a></li>
                <li><a href="#calculator" className="hover:text-wasabi transition">Kalkulator Penghematan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-canvas font-bold uppercase tracking-wider text-[10px] mb-3">Layanan &amp; Kontak</h3>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/login" className="hover:text-wasabi transition">Member Workspace</Link></li>
                <li><a href="#order" className="hover:text-wasabi transition">Isi Brief (Rp299.000)</a></li>
                <li><Link href="/terms" className="hover:text-wasabi transition">Syarat &amp; Ketentuan</Link></li>
                <li><Link href="/privacy" className="hover:text-wasabi transition">Kebijakan Privasi</Link></li>
                <li><Link href="/refund" className="hover:text-wasabi transition">Jaminan SLA &amp; Refund</Link></li>
                <li className="pt-1"><span className="text-stone-400">WA: +62 812-3456-7890</span><br /><span className="text-stone-400">halo@usekarsa.co</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t-2 border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-stone-500 text-center sm:text-left">
            <span>&copy; 2026 Karsa Studio (<span className="text-canvas font-bold">usekarsa.co</span>). All rights reserved.</span>
            <span>Dibuat di Indonesia &mdash; melayani brand di seluruh Nusantara.</span>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div
        id="stickyCta"
        className={`fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t-2 border-ink xl:hidden z-30 flex items-center justify-between shadow-brutal transition-transform duration-300 ${stickyHidden ? "translate-y-full" : ""}`}
      >
        <div>
          <div className="text-[10px] font-mono uppercase text-stone-500 font-bold">30 Naskah + 4 SEO Docs</div>
          <div className="text-sm font-bold font-mono text-terracotta">Rp299.000</div>
        </div>
        <a href="#order" className="px-4 sm:px-5 py-2.5 bg-ink text-canvas text-xs font-mono font-bold rounded-xl shadow-brutal flex items-center gap-1">
          Isi Brief &rarr;
        </a>
      </div>

      {/* LIVE PROOF TOAST */}
      {toast && (
        <div id="liveProofToast" role="status" aria-live="polite" aria-atomic="true" className="fixed bottom-20 sm:bottom-24 xl:bottom-6 left-4 z-30 bg-white border-2 border-ink p-2.5 sm:p-3 rounded-2xl shadow-brutal flex items-center gap-2.5 sm:gap-3 max-w-[280px] sm:max-w-xs">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-wasabi text-ink border-2 border-ink flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm">✓</div>
          <div className="font-mono text-[9px] sm:text-[10px] leading-tight">
            <span className="font-bold text-ink block truncate">{toast.brand}</span>
            <span className="text-stone-500">{toast.time}</span>
          </div>
          <button type="button" aria-label="Tutup notifikasi order" onClick={() => setToast(null)} className="p-1 text-stone-400 hover:text-ink transition shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}