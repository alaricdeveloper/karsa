import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

type SeedOrder = {
  order_id: string;
  brand: string;
  category: string;
  competitor: string;
  description: string;
  email: string;
  phone: string;
  status: string;
  notion_url: string;
  notes: string;
  hoursAgo: number;
  daysAgo: number;
};

const ORDERS: SeedOrder[] = [
  { order_id: "INV-993810", brand: "Aroma Sambal Tempong Ibu Sri", category: "Kuliner / F&B", competitor: "@sambal_bu_rudy", description: "Sambal tempong khas Banyuwangi botolan pedas segar tanpa pengawet. Target pecinta kuliner pedas usia 22-45 tahun.", email: "sri.tempong@gmail.com", phone: "081298112233", status: "IN_PROGRESS", notion_url: "", notes: "Fokus pada video ASMR tuang sambal dan edukasi masa simpan chiller.", hoursAgo: 2, daysAgo: 0 },
  { order_id: "INV-982104", brand: "Lumina Skin Barrier Lab", category: "Skincare & Beauty", competitor: "@somethincofficial", description: "Ceramide Barrier Gel perbaikan kulit kemerahan dan jerawat hormonal wanita usia 18-28 tahun.", email: "founder@luminaskin.id", phone: "081377889900", status: "IN_PROGRESS", notion_url: "", notes: "Periksa kesesuaian istilah dermatologis sebelum dikirim.", hoursAgo: 5, daysAgo: 0 },
  { order_id: "INV-971482", brand: "Karsa Modular Studio", category: "Fashion & Apparel", competitor: "@dekoruma", description: "Meja kerja modular hemat tempat untuk apartemen studio. Target remote workers muda.", email: "hello@karsa.design", phone: "081122334455", status: "IN_PROGRESS", notion_url: "", notes: "Sudut video: unboxing dan perakitan kilat 5 menit tanpa obeng.", hoursAgo: 7, daysAgo: 0 },
  { order_id: "INV-960291", brand: "PajakMudah Konsultan UMKM", category: "Jasa Profesional", competitor: "@klikpajak", description: "Jasa pembukuan dan pelaporan SPT tahunan badan untuk UMKM omset di bawah 4,8M.", email: "tax@pajakmudah.co.id", phone: "081288990011", status: "IN_PROGRESS", notion_url: "", notes: "Tone edukatif & otoritatif. Jelaskan risiko denda keterlambatan dengan bahasa santai.", hoursAgo: 11, daysAgo: 0 },
  { order_id: "INV-952819", brand: "Cold Drop Artisan Roastery", category: "Kuliner / F&B", competitor: "@kopikenangan.id", description: "Cold brew botolan rendah asam untuk lambung sensitif. Target pekerja SCBD usia 24-35 tahun.", email: "dimas.roastery@gmail.com", phone: "081298887711", status: "QC_REVIEW", notion_url: "https://notion.so/karsa/cold-drop-qc-workspace", notes: "Naskah 30 hari sudah selesai di-generate, tinggal verifikasi 4 kerangka artikel SEO.", hoursAgo: 16, daysAgo: 0 },
  { order_id: "INV-941092", brand: "FitDaily Meal Prep Diet", category: "Kuliner / F&B", competitor: "@yellowfitkitchen", description: "Katering diet harian kalori terukur 450 kkal per box dengan cita rasa nusantara.", email: "admin@fitdailymeal.com", phone: "081399001122", status: "QC_REVIEW", notion_url: "https://notion.so/karsa/fitdaily-qc-draft", notes: "Cek tabel nutrisi mikro pada caption Day 12-18.", hoursAgo: 19, daysAgo: 0 },
  { order_id: "INV-930419", brand: "Zenith Gadget Armor", category: "Gadget / Elektronik", competitor: "@spigen_id", description: "Casing titanium bumper magnetik anti-benturan dengan garansi seumur hidup.", email: "zenithcase@yahoo.com", phone: "085711223344", status: "PENDING_PAYMENT", notion_url: "", notes: "Menunggu konfirmasi transfer via VA Mandiri.", hoursAgo: 1, daysAgo: 0 },
  { order_id: "INV-920188", brand: "Nala Baby Organic Wear", category: "Fashion & Apparel", competitor: "@littlepalmerhaus", description: "Pakaian bayi dari serat bambu organik anti-alergi dan anti-gerah.", email: "marketing@nalababy.id", phone: "081277665544", status: "PENDING_PAYMENT", notion_url: "", notes: "Brief masuk dari campaign Instagram Ads.", hoursAgo: 3, daysAgo: 0 },
  { order_id: "INV-881920", brand: "Bakso Goreng Anugerah", category: "Kuliner / F&B", competitor: "@baksogorenggajah", description: "Bakso goreng mekar renyah frozen isi ayam udang halal.", email: "anugerah.bakso@gmail.com", phone: "081211223344", status: "COMPLETED", notion_url: "https://notion.so/karsa/bakso-anugerah-completed", notes: "Terkirim via WA & Email. Klien puas dengan hook video unboxing.", hoursAgo: 0, daysAgo: 2 },
  { order_id: "INV-873910", brand: "Sora Japanese Hair Studio", category: "Jasa Profesional", competitor: "@onepiecehair", description: "Salon potong rambut gaya Jepang spesialis teknik layering wolfcut di Jaksel.", email: "sora.hairstudio@gmail.com", phone: "081322334455", status: "COMPLETED", notion_url: "https://notion.so/karsa/sora-studio-final", notes: "Kalender fokus ke tips perawatan rambut diwarnai dan konsultasi bentuk wajah.", hoursAgo: 0, daysAgo: 3 },
  { order_id: "INV-864019", brand: "Aethel Linen & Cotton Wear", category: "Fashion & Apparel", competitor: "@cottonink", description: "Kemeja dan celana linen kasual bernapas untuk iklim tropis.", email: "sales@aethel.id", phone: "081199887766", status: "COMPLETED", notion_url: "https://notion.so/karsa/aethel-completed", notes: "Deliverable diserahkan dalam 3 jam kerja.", hoursAgo: 0, daysAgo: 4 },
  { order_id: "INV-852918", brand: "Veloce Auto Detailing", category: "Jasa Profesional", competitor: "@scuto.id", description: "Nano ceramic coating dan salon detailing mobil panggilan ke rumah.", email: "veloce.detailing@gmail.com", phone: "081244556677", status: "COMPLETED", notion_url: "https://notion.so/karsa/veloce-detailing", notes: "Naskah video fokus pada uji coba efek daun talas (hydrophobic test).", hoursAgo: 0, daysAgo: 5 },
  { order_id: "INV-841098", brand: "Glow Botanic Herbal Soap", category: "Skincare & Beauty", competitor: "@sensatia_botanicals", description: "Sabun batang cold-process berbahan minyak kelapa murni dan oat pereda eksim.", email: "support@glowbotanic.id", phone: "081988776655", status: "COMPLETED", notion_url: "https://notion.so/karsa/glowbotanic-final", notes: "SEO artikel masuk halaman 1 Google untuk keyword: sabun untuk kulit sensitif eksim.", hoursAgo: 0, daysAgo: 6 },
  { order_id: "INV-830291", brand: "Kopi Susu Tetangga Senja", category: "Kuliner / F&B", competitor: "@kopituku", description: "Kopi susu gula aren botolan 1 liter kemasan hemat untuk stok mingguan kantor.", email: "senjakopi@yahoo.co.id", phone: "081233445566", status: "COMPLETED", notion_url: "https://notion.so/karsa/kopi-senja-workspace", notes: "Selesai tanpa revisi.", hoursAgo: 0, daysAgo: 7 },
  { order_id: "INV-821948", brand: "Urban Leather Craft", category: "Fashion & Apparel", competitor: "@revoltindustry", description: "Dompet dan cardholder kulit sapi pull-up asli dengan garansi jahitan 5 tahun.", email: "urbanleather@gmail.com", phone: "081266778899", status: "COMPLETED", notion_url: "https://notion.so/karsa/urbanleather-done", notes: "Video hook perbandingan kulit sintetis vs kulit asli.", hoursAgo: 0, daysAgo: 8 },
  { order_id: "INV-810482", brand: "Dentika Dental Clinic", category: "Jasa Profesional", competitor: "@farsdent", description: "Klinik gigi ramah anak dan spesialis pemasangan behel transparan (aligner).", email: "klinikdentika@gmail.com", phone: "081344556677", status: "COMPLETED", notion_url: "https://notion.so/karsa/dentika-clinic", notes: "Edukatif, mitos vs fakta seputar tambal gigi dan karang gigi.", hoursAgo: 0, daysAgo: 9 },
  { order_id: "INV-799102", brand: "Kyoto Matcha Bar Tangerang", category: "Kuliner / F&B", competitor: "@matchabae", description: "Ceremonial grade matcha latte murni tanpa perisa artifisial.", email: "kyoto.tgr@gmail.com", phone: "081288991122", status: "COMPLETED", notion_url: "https://notion.so/karsa/kyoto-matcha", notes: "Terkirim.", hoursAgo: 0, daysAgo: 11 },
  { order_id: "INV-788291", brand: "ErgoDesk Indonesia", category: "Gadget / Elektronik", competitor: "@oxihom", description: "Standing desk elektrik dengan dual motor dan memory controller.", email: "ergodesk.id@gmail.com", phone: "081122339900", status: "COMPLETED", notion_url: "https://notion.so/karsa/ergodesk-workspace", notes: "Menekankan bahaya duduk statis 8 jam dan produktivitas postur tubuh.", hoursAgo: 0, daysAgo: 12 },
  { order_id: "INV-777102", brand: "Seroja Hijab Syar'i", category: "Fashion & Apparel", competitor: "@kamiidea", description: "Gamis dan khimar bahan babydoll premium anti-terawang untuk acara formal.", email: "marketing@serojahijab.com", phone: "081377881122", status: "COMPLETED", notion_url: "https://notion.so/karsa/serojahijab-done", notes: "Sudut: tutorial styling hijab 60 detik tanpa jarum pentul ribet.", hoursAgo: 0, daysAgo: 14 },
  { order_id: "INV-766190", brand: "PureWater RO Filter Rumahan", category: "Lainnya", competitor: "@coway_id", description: "Filter air minum pemurni teknologi Reverse Osmosis tanpa perlu galon berat.", email: "purewater.id@gmail.com", phone: "081299002233", status: "COMPLETED", notion_url: "https://notion.so/karsa/purewater-notion", notes: "Kalkulator penghematan beli galon vs pasang filter RO per tahun.", hoursAgo: 0, daysAgo: 15 },
  { order_id: "INV-755481", brand: "Roti Sisir Mentega Surabaya", category: "Kuliner / F&B", competitor: "@roti_matahari", description: "Roti sisir jadul lembut dengan butter wijsman asli tanpa pengembang kimia.", email: "rotisisir.sby@gmail.com", phone: "081333445566", status: "COMPLETED", notion_url: "https://notion.so/karsa/rotisisir-sby", notes: "Sentimen nostalgia masa kecil.", hoursAgo: 0, daysAgo: 17 },
  { order_id: "INV-744019", brand: "Kalyana Yoga & Pilates", category: "Jasa Profesional", competitor: "@celebrityfitness", description: "Studio privat reformer pilates khusus wanita untuk perbaikan postur tubuh.", email: "kalyana.studio@gmail.com", phone: "081188776655", status: "COMPLETED", notion_url: "https://notion.so/karsa/kalyana-yoga", notes: "Fokus ke edukasi saraf kejepit dan pereda sakit pinggang pekerja kantor.", hoursAgo: 0, daysAgo: 18 },
  { order_id: "INV-733910", brand: "Nusantara Heritage Batik Pria", category: "Fashion & Apparel", competitor: "@danarhadi", description: "Kemeja batik cap katun primisima modern potongan slim-fit.", email: "nusantarabatik@yahoo.com", phone: "081255667788", status: "COMPLETED", notion_url: "https://notion.so/karsa/nusantara-batik", notes: "Panduan padu-padan batik untuk acara kasual non-kondangan.", hoursAgo: 0, daysAgo: 19 },
  { order_id: "INV-722109", brand: "DermaCleanse Micellar Water", category: "Skincare & Beauty", competitor: "@garnierindonesia", description: "Pembersih wajah bebas alkohol dan bebas pewangi untuk kulit rentan fungal acne.", email: "dermacleanse@gmail.com", phone: "081388990011", status: "COMPLETED", notion_url: "https://notion.so/karsa/dermacleanse-final", notes: "Selesai.", hoursAgo: 0, daysAgo: 21 },
  { order_id: "INV-711902", brand: "PawPal Pet Care & Grooming", category: "Jasa Profesional", competitor: "@petkingdom", description: "Salon grooming kucing & anjing bebas stres dengan pemantauan CCTV live untuk pemilik.", email: "pawpal.grooming@gmail.com", phone: "081299881100", status: "COMPLETED", notion_url: "https://notion.so/karsa/pawpal-notion", notes: "Video pendek seputar bahaya kutu dan jamur kulit anabul.", hoursAgo: 0, daysAgo: 22 },
  { order_id: "INV-700291", brand: "SnackSehat Keripik Jamur Tiram", category: "Kuliner / F&B", competitor: "@kriuk_id", description: "Camilan jamur tiram renyah non-MSG digoreng dengan minyak kelapa higienis.", email: "snacksehat.id@gmail.com", phone: "081322110099", status: "COMPLETED", notion_url: "https://notion.so/karsa/snacksehat-done", notes: "Target ibu-ibu muda untuk bekal sehat anak sekolah.", hoursAgo: 0, daysAgo: 24 },
  { order_id: "INV-699102", brand: "AeroFit Activewear Gym", category: "Fashion & Apparel", competitor: "@gymshark", description: "Legging seamless anti-menerawang dan sports bra high-support untuk lari marathon.", email: "aerofit.id@gmail.com", phone: "081244332211", status: "COMPLETED", notion_url: "https://notion.so/karsa/aerofit-workspace", notes: "Selesai.", hoursAgo: 0, daysAgo: 25 },
  { order_id: "INV-688190", brand: "Solusi Akun Kursus Mandarin", category: "Jasa Profesional", competitor: "@cakap_id", description: "Kursus kilat Mandarin percakapan bisnis untuk profesional muda via Zoom privat.", email: "kursusmandarin@yahoo.com", phone: "081377665544", status: "COMPLETED", notion_url: "https://notion.so/karsa/mandarin-business", notes: "Pola tips pelafalan nada (tones) Mandarin dalam 30 detik.", hoursAgo: 0, daysAgo: 26 },
  { order_id: "INV-677019", brand: "Dapur Brownies Fudgy Lumer", category: "Kuliner / F&B", competitor: "@fudgybro", description: "Brownies panggang sekat dengan 5 topping premium (Nutella, Lotus Biscoff, Keju, Almond).", email: "dapurbrownies@gmail.com", phone: "081299887722", status: "COMPLETED", notion_url: "https://notion.so/karsa/dapurbrownies-final", notes: "Terkirim.", hoursAgo: 0, daysAgo: 27 },
  { order_id: "INV-666192", brand: "SoundWave TWS Bluetooth Earbuds", category: "Gadget / Elektronik", competitor: "@soundcore_id", description: "Earphone TWS ANC peredam bising aktif dengan ketahanan baterai 32 jam.", email: "soundwave.tws@gmail.com", phone: "081199001122", status: "COMPLETED", notion_url: "https://notion.so/karsa/soundwave-earbuds", notes: "Pesanan pertama bulan ini.", hoursAgo: 0, daysAgo: 28 },
  { order_id: "INV-655102", brand: "Koleksi Sandal Kulit Pria Java", category: "Fashion & Apparel", competitor: "@portblue", description: "Sandal slide kulit asli dengan insole anatomi busa memori.", email: "javasandal@gmail.com", phone: "081288334411", status: "COMPLETED", notion_url: "https://notion.so/karsa/javasandal-done", notes: "Selesai.", hoursAgo: 0, daysAgo: 28 },
  { order_id: "INV-644190", brand: "Camilan Keripik Tempe Mendoan Oven", category: "Kuliner / F&B", competitor: "@tempe_crispy", description: "Keripik tempe non-goreng rendah kalori untuk program diet sehat.", email: "tempeoven@yahoo.com", phone: "081377884422", status: "COMPLETED", notion_url: "https://notion.so/karsa/tempeoven-final", notes: "Selesai.", hoursAgo: 0, daysAgo: 29 },
  { order_id: "INV-633019", brand: "Optik Mata Sehat Express", category: "Jasa Profesional", competitor: "@optik_seis", description: "Layanan ganti lensa kacamata anti-radiasi bluechromic 30 menit jadi.", email: "optikmatasehat@gmail.com", phone: "081199003344", status: "COMPLETED", notion_url: "https://notion.so/karsa/optiksehat-workspace", notes: "Selesai.", hoursAgo: 0, daysAgo: 29 },
  { order_id: "INV-622108", brand: "Dapur Sambal Bawang Bu Broto", category: "Kuliner / F&B", competitor: "@sambal_bu_rudy", description: "Sambal bawang ulek kasar dengan minyak kelapa murni.", email: "sambalbubroto@gmail.com", phone: "081244559900", status: "COMPLETED", notion_url: "https://notion.so/karsa/sambal-bubroto", notes: "Batch inisiasi pertama kali.", hoursAgo: 0, daysAgo: 30 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== "karsa-setup-2024") {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    // Clear old data
    await supabase.from("content_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("seo_articles").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("orders").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // Insert orders with SLA-accurate timestamps (hours ago for live queue, days ago for completed)
    const now = Date.now();
    const ordersWithDates = ORDERS.map((o) => {
      const ts = o.hoursAgo > 0
        ? new Date(now - o.hoursAgo * 3600000).toISOString()
        : new Date(now - o.daysAgo * 86400000).toISOString();
      return {
        order_id: o.order_id,
        brand: o.brand,
        category: o.category,
        competitor: o.competitor,
        description: o.description,
        email: o.email,
        phone: o.phone,
        status: o.status,
        notion_url: o.notion_url || null,
        notes: o.notes,
        created_at: ts,
        updated_at: ts,
      };
    });

    const { data: insertedOrders, error: orderErr } = await supabase
      .from("orders")
      .insert(ordersWithDates)
      .select("id, brand, category, description");

    if (orderErr) {
      return NextResponse.json({ error: `Orders insert failed: ${orderErr.message}` }, { status: 500 });
    }

    // Insert content items (30 per order)
    const contentItems: {
      order_id: string;
      day_number: number;
      pillar: string;
      hook: string;
      body: string;
      cta: string;
      caption: string;
    }[] = [];

    for (const order of insertedOrders) {
      for (let day = 1; day <= 30; day++) {
        const pillarIdx = (day - 1) % 4;
        const pillars = ["Edukasi Solusi", "Storytelling Nyata", "Penawaran Spesial", "Mitos vs Fakta"];
        contentItems.push({
          order_id: order.id,
          day_number: day,
          pillar: pillars[pillarIdx],
          hook: `[Hook 3s] Kenapa banyak orang masih salah pakai produk di industri ${order.category}? Ini perbandingan nyatanya...`,
          body: `Di ${order.brand}, kami merancang: "${order.description}". Hasilnya jauh lebih praktis dan hemat waktu tanpa drama.`,
          cta: `"Ketik 'MAU' di DM ${order.brand} untuk klaim penawaran batch ini sekarang juga!"`,
          caption: `${order.description}\n\nSimpan postingan ini dan bagikan ke teman yang butuh solusi serupa di ${order.category}!\n\n#${order.brand.replace(/ /g, "")} #umkmindonesia #kontenviral`,
        });
      }
    }

    // Batch insert content (500 at a time)
    for (let i = 0; i < contentItems.length; i += 500) {
      const batch = contentItems.slice(i, i + 500);
      const { error: contentErr } = await supabase.from("content_items").insert(batch);
      if (contentErr) {
        return NextResponse.json({ error: `Content insert failed at batch ${i}: ${contentErr.message}` }, { status: 500 });
      }
    }

    // Insert SEO articles (4 per order)
    const seoArticles: {
      order_id: string;
      article_number: number;
      article_type: string;
      title: string;
      description: string;
      outline: string;
    }[] = [];

    const articleTemplates = [
      { article_number: 1, article_type: "Pillar Content", titleTpl: "Panduan Lengkap Memilih Produk di Sektor {category}", descTpl: "Artikel komprehensif 1.000+ kata tentang panduan memilih produk berkualitas.", outlineTpl: "H1: Panduan Lengkap Memilih Produk di Sektor {category}\nH2: Mengapa Kualitas Penting\nH2: 5 Ciri Produk Berkualitas\nH2: Rekomendasi Terbaik\nH2: Tips Membeli" },
      { article_number: 2, article_type: "Commercial Intent", titleTpl: "Mengapa {brand} Lebih Efisien Dibanding Kompetitor", descTpl: "Analisis komparatif yang menunjukkan keunggulan produk/layanan.", outlineTpl: "H1: Mengapa {brand} Lebih Efisien\nH2: Perbandingan dengan Kompetitor\nH2: Keunggulan Produk\nH2: Testimoni Pelanggan\nH2: Cara Memesan" },
      { article_number: 3, article_type: "Problem Solving", titleTpl: "5 Kesalahan Umum Saat Membeli Produk {category}", descTpl: "Edukasi tentang kesalahan umum dan solusinya.", outlineTpl: "H1: 5 Kesalahan Umum\nH2: Kesalahan #1: Terlalu Murah\nH2: Kesalahan #2: Tanpa Riset\nH2: Kesalahan #3: Ikut-ikutan\nH2: Solusi yang Tepat" },
      { article_number: 4, article_type: "How-To Guide", titleTpl: "Tips Perawatan & Penggunaan Maksimal untuk Hasil Terbaik", descTpl: "Panduan pasca-pembelian untuk retensi pelanggan.", outlineTpl: "H1: Tips Perawatan & Penggunaan\nH2: Cara Perawatan Dasar\nH2: Tips Advanced\nH2: Tanda Perlu Ganti\nH2: Rekomendasi Produk Pendukung" },
    ];

    for (const order of insertedOrders) {
      for (const tpl of articleTemplates) {
        seoArticles.push({
          order_id: order.id,
          article_number: tpl.article_number,
          article_type: tpl.article_type,
          title: tpl.titleTpl.replace("{brand}", order.brand).replace("{category}", order.category),
          description: tpl.descTpl.replace("{category}", order.category),
          outline: tpl.outlineTpl.replace(/{brand}/g, order.brand).replace(/{category}/g, order.category),
        });
      }
    }

    // Batch insert SEO articles
    for (let i = 0; i < seoArticles.length; i += 500) {
      const batch = seoArticles.slice(i, i + 500);
      const { error: seoErr } = await supabase.from("seo_articles").insert(batch);
      if (seoErr) {
        return NextResponse.json({ error: `SEO insert failed at batch ${i}: ${seoErr.message}` }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${insertedOrders.length} orders, ${contentItems.length} content items, ${seoArticles.length} SEO articles`,
    });
  } catch (err) {
    return NextResponse.json({ error: `Unexpected: ${err}` }, { status: 500 });
  }
}