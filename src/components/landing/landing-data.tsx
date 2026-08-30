import type { ReactNode } from "react";

export const MARQUEE_ITEMS = [
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

export const FAQ_ITEMS: { q: string; a: string }[] = [
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

export const TESTIMONI = [
  { name: "Rani A.", role: "Owner kedai kopi, Bandung", initial: "RA", bg: "bg-wasabi", quote: "\u201CDulu tiap hari Jumat aku buka laptop, stare 2 jam, hasilnya nol. Sekarang script tinggal dibaca di teleprompter. Minggu pertama langsung 12 video keposting.\u201D", dark: false },
  { name: "Salsa D.", role: "Founder skincare lokal, Surabaya", initial: "SD", bg: "bg-sunflower", quote: "\u201C4 artikel SEO-nya yang bikin beda. Artikel blog kami akhirnya muncul di halaman 1 Google untuk kata kunci 'skincare untuk kulit sensitif'. Traffic organik naik tiap bulan.\u201D", dark: false },
  { name: "Fajar P.", role: "Brand apparel, Yogyakarta", initial: "FP", bg: "bg-terracotta text-ink", quote: "\u201CAwalnya ragu karena ini sistem, bukan jasa lengkap. Ternyata justru itu kelebihannya — kami tetap pegang kendali, tapi tidak mulai dari nol. Batch kedua langsung kami pesan.\u201D", dark: false },
  { name: "Dewi W.", role: "Katering harian, Jakarta", initial: "DW", bg: "bg-wasabi", quote: "\u201CKami bisnis katering, tidak ada yang jago kamera. Panduan B-Roll-nya bikin tim dapur bisa rekam sendiri. Konten jadi jauh lebih hidup dari sekadar foto menu.\u201D", dark: false },
  { name: "Hendra T.", role: "Bimbel online, Semarang", initial: "HT", bg: "bg-sunflower", quote: "\u201CYang saya suka: caption-nya bukan template kosong. Semua merujuk ke brief kami, ada kata-kata yang memang dipakai siswa kami. Terasa personal.\u201D", dark: false },
  { name: "Nadia K.", role: "Studio interior, Malang", initial: "NK", bg: "bg-wasabi", quote: "\u201CAudit kompetitor-nya jujur banget. Kami jadi tahu konten apa yang belum digarap kompetitor. Bulan ini DM bertanya harga produk naik 3x lipat.\u201D", dark: true },
];

export const SAMPLE_DATA: Record<
  string,
  { title: string; niche: string; body: ReactNode }[]
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

export const PROOFS = [
  { brand: "Brand Skincare Lokal", location: "Surabaya", time: "3 menit lalu" },
  { brand: "Kedai Kopi Artisan", location: "Jakarta Selatan", time: "11 menit lalu" },
  { brand: "Studio Interior", location: "Bandung", time: "24 menit lalu" },
  { brand: "Apparel Streetwear", location: "Yogyakarta", time: "42 menit lalu" },
];

export const SECTORS = [
  { dot: "bg-amber-500", title: "F&B & Cafe", sub: "Menu, review, edukasi." },
  { dot: "bg-pink-500", title: "Skincare & Beauty", sub: "Ingredient, myth-busting." },
  { dot: "bg-indigo-500", title: "Fashion & Apparel", sub: "Styling, fit, detail bahan." },
  { dot: "bg-emerald-500", title: "Jasa & Edukasi", sub: "Konsultan, klinik, les." },
];

export const GOALS = [
  { title: "Edukasi & Awareness", sub: "Buat audiens lebih paham.", href: "#isi-harian" },
  { title: "Leads & DM", sub: "Arahkan percakapan baru.", href: "#order" },
  { title: "Penjualan Produk", sub: "Perjelas value dan CTA.", href: "#order" },
  { title: "Cek Kecocokan", sub: "Lihat apakah Karsa untukmu.", href: "#cocok-untuk" },
];

export const PRINCIPLES = [
  { title: "Prinsip 01 — Satu video, satu pesan", body: "Video yang mencoba menjelaskan 5 hal sekaligus akan diingat 0 hal. Pilih satu pesan per video, lalu pertahankan hook, konten, dan CTA-nya agar sejalan dengan pesan itu. Kalender Karsa menyusun 30 pesan berbeda sehingga feed kamu tidak berulang." },
  { title: "Prinsip 02 — Hook itu janji, bukan clickbait", body: "Clickbait menjanjikan sesuatu yang tidak ada — penonton pergi di detik ke-4 dan algoritma menghukum retention-mu. Hook yang jujur menjanjikan jawaban yang memang akan kamu berikan. Itu bedanya video yang di-save dan video yang di-skip." },
  { title: "Prinsip 03 — Jual masalah sebelum produk", body: "Orang tidak membeli produk; mereka membeli penyelesaian masalah yang sudah mereka rasakan. Buka masalahnya lebih dulu (kenapa ini mengganggu), lalu tawarkan solusimu sebagai jawaban. Produk yang dipasarkan seperti ini terasa relevan, bukan memaksa." },
  { title: "Prinsip 04 — Konsistensi mengalahkan viral", body: "Satu video 1 juta views tidak membangun toko. Tapi 30 video dengan 5.000 views yang konsisten — dengan pesan yang sama — membangun kepercayaan, pengikut, dan penjualan. Algoritma juga memberi bobot pada akun yang rutin memposting." },
  { title: "Prinsip 05 — Data mengalahkan perasaan", body: "\u201CMenurutku video ini bagus\u201D bukan metrik. Simpan (saves), waktu tonton, dan DM masuk — itulah data yang menentukan format mana yang diperbanyak di minggu berikutnya. Template produksi mingguan kami menyisihkan 30 menit khusus untuk membaca data ini." },
];

