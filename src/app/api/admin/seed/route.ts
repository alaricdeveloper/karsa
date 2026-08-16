import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const ORDERS = [
  { order_id: "INV-993810", brand: "Aroma Sambal Tempong Ibu Sri", category: "Kuliner / F&B", competitor: "@sambal_bu_rudy", description: "Sambal tempong pedas khas Jawa Timur dengan cita rasa autentik dan kemasan modern.", email: "ibusrisambal@gmail.com", phone: "081234567890", status: "IN_PROGRESS" },
  { order_id: "INV-982104", brand: "Lumina Skin Barrier Lab", category: "Skincare & Beauty", competitor: "@somethincofficial", description: "Skincare barrier-repair dengan 7 ingredients essential, diformulasikan untuk kulit sensitif Indonesia.", email: "lumina.skincare@gmail.com", phone: "081234567891", status: "IN_PROGRESS" },
  { order_id: "INV-971482", brand: "Karsa Modular Studio", category: "Fashion & Apparel", competitor: "@dekoruma", description: "Furniture modular custom untuk apartemen urban dengan desain scandinavian minimalis.", email: "karsa.modular@gmail.com", phone: "081234567892", status: "IN_PROGRESS" },
  { order_id: "INV-960291", brand: "PajakMudah Konsultan UMKM", category: "Jasa Profesional", competitor: "@klikpajak", description: "Konsultan pajak UMKM dengan layanan konsultasi online dan pelaporan SPT tahunan.", email: "pajakmudah@gmail.com", phone: "081234567893", status: "IN_PROGRESS" },
  { order_id: "INV-952819", brand: "Cold Drop Artisan Roastery", category: "Kuliner / F&B", competitor: "@kopikenangan.id", description: "Artisan coffee roastery dengan precision roasting technology dan single-origin beans.", email: "coldbrew.drop@gmail.com", phone: "081234567894", status: "QC_REVIEW", notion_url: "https://notion.so/workspace/cold-drop" },
  { order_id: "INV-941092", brand: "FitDaily Meal Prep Diet", category: "Kuliner / F&B", competitor: "@yellowfitkitchen", description: "Meal prep sehat dengan kalori terkontrol, dikirim segar setiap minggu ke Jabodetabek.", email: "fitdaily.meal@gmail.com", phone: "081234567895", status: "QC_REVIEW", notion_url: "https://notion.so/workspace/fitdaily" },
  { order_id: "INV-930419", brand: "Zenith Gadget Armor", category: "Gadget / Elektronik", competitor: "@spigen_id", description: "Casing dan pelindung gadget premium dengan material military-grade dan desain tipis.", email: "zenith.gadget@gmail.com", phone: "081234567896", status: "PENDING_PAYMENT" },
  { order_id: "INV-920188", brand: "Nala Baby Organic Wear", category: "Fashion & Apparel", competitor: "@littlepalmerhaus", description: "Pakaian bayi organik dengan sertifikasi GOTS, aman untuk kulit sensitif newborn.", email: "nala.baby@gmail.com", phone: "081234567897", status: "PENDING_PAYMENT" },
  { order_id: "INV-881920", brand: "Bakso Goreng Anugerah", category: "Kuliner / F&B", competitor: "@baksogorenggajah", description: "Bakso goreng renyah dengan isian daging sapi pilihan, franchise nasional.", email: "bakso.goreng@gmail.com", phone: "081234567898", status: "COMPLETED", notion_url: "https://notion.so/workspace/bakso-anugerah" },
  { order_id: "INV-873910", brand: "Sora Japanese Hair Studio", category: "Jasa Profesional", competitor: "@onepiecehair", description: "Salon Jepang premium dengan teknologi perawatan rambut terbaru dan stylist bersertifikat.", email: "sora.hair@gmail.com", phone: "081234567899", status: "COMPLETED", notion_url: "https://notion.so/workspace/sora-hair" },
  { order_id: "INV-864019", brand: "Aethel Linen & Cotton Wear", category: "Fashion & Apparel", competitor: "@cottonink", description: "Pakaian linen dan katun premium untuk pria modern dengan desain timeless.", email: "aethel.wear@gmail.com", phone: "081234567900", status: "COMPLETED", notion_url: "https://notion.so/workspace/aethel" },
  { order_id: "INV-852918", brand: "Veloce Auto Detailing", category: "Jasa Profesional", competitor: "@scuto.id", description: "Auto detailing premium dengan nano-ceramic coating dan paint protection film.", email: "veloce.detail@gmail.com", phone: "081234567901", status: "COMPLETED", notion_url: "https://notion.so/workspace/veloce" },
  { order_id: "INV-841098", brand: "Glow Botanic Herbal Soap", category: "Skincare & Beauty", competitor: "@sensatia_botanicals", description: "Sabun herbal handmade dengan bahan organik, ramah lingkungan dan kulit sensitif.", email: "glow.botanic@gmail.com", phone: "081234567902", status: "COMPLETED", notion_url: "https://notion.so/workspace/glow-botanic" },
  { order_id: "INV-830291", brand: "Kopi Susu Tetangga Senja", category: "Kuliner / F&B", competitor: "@kopituku", description: "Kopi susu kekinian dengan resep turun-temurun dan harga terjangkau untuk anak muda.", email: "tetangga.senja@gmail.com", phone: "081234567903", status: "COMPLETED", notion_url: "https://notion.so/workspace/tetangga-senja" },
  { order_id: "INV-821948", brand: "Urban Leather Craft", category: "Fashion & Apparel", competitor: "@revoltindustry", description: "Aksesoris kulit handmade premium untuk pria dan wanita urban.", email: "urban.leather@gmail.com", phone: "081234567904", status: "COMPLETED", notion_url: "https://notion.so/workspace/urban-leather" },
  { order_id: "INV-810482", brand: "Dentika Dental Clinic", category: "Jasa Profesional", competitor: "@farsdent", description: "Klinik gigi modern dengan teknologi digital dentistry dan layanan estetik gigi.", email: "dentika.clinic@gmail.com", phone: "081234567905", status: "COMPLETED", notion_url: "https://notion.so/workspace/dentika" },
  { order_id: "INV-799102", brand: "Kyoto Matcha Bar Tangerang", category: "Kuliner / F&B", competitor: "@matchabae", description: "Matcha bar autentik Jepang dengan ceremonial grade matcha dan dessert fusion.", email: "kyoto.matcha@gmail.com", phone: "081234567906", status: "COMPLETED", notion_url: "https://notion.so/workspace/kyoto-matcha" },
  { order_id: "INV-788291", brand: "ErgoDesk Indonesia", category: "Gadget / Elektronik", competitor: "@oxihom", description: "Meja kerja ergonomis standing desk dengan motor elektrik dan integrated cable management.", email: "ergodesk.id@gmail.com", phone: "081234567907", status: "COMPLETED", notion_url: "https://notion.so/workspace/ergodesk" },
  { order_id: "INV-777102", brand: "Seroja Hijab Syar'i", category: "Fashion & Apparel", competitor: "@kamiidea", description: "Hijab syar'i premium dengan bahan premium dan desain elegan untuk muslimah modern.", email: "seroja.hijab@gmail.com", phone: "081234567908", status: "COMPLETED", notion_url: "https://notion.so/workspace/seroja" },
  { order_id: "INV-766190", brand: "PureWater RO Filter Rumahan", category: "Lainnya", competitor: "@coway_id", description: "Sistem filter air RO untuk rumah tangga dengan teknologi 5 tahap penyaringan.", email: "purewater.ro@gmail.com", phone: "081234567909", status: "COMPLETED", notion_url: "https://notion.so/workspace/purewater" },
  { order_id: "INV-755481", brand: "Roti Sisir Mentega Surabaya", category: "Kuliner / F&B", competitor: "@roti_matahari", description: "Roti sisir mentega khas Surabaya dengan resep turun-temurun dan topping kekinian.", email: "roti.sisir@gmail.com", phone: "081234567910", status: "COMPLETED", notion_url: "https://notion.so/workspace/roti-sisir" },
  { order_id: "INV-744019", brand: "Kalyana Yoga & Pilates", category: "Jasa Profesional", competitor: "@celebrityfitness", description: "Studio yoga dan pilates premium dengan instruktur bersertifikat internasional.", email: "kalyana.yoga@gmail.com", phone: "081234567911", status: "COMPLETED", notion_url: "https://notion.so/workspace/kalyana" },
  { order_id: "INV-733910", brand: "Nusantara Heritage Batik Pria", category: "Fashion & Apparel", competitor: "@danarhadi", description: "Batik pria premium dengan motif tradisional yang diinterpretasikan dalam desain kontemporer.", email: "heritage.batik@gmail.com", phone: "081234567912", status: "COMPLETED", notion_url: "https://notion.so/workspace/heritage-batik" },
  { order_id: "INV-722109", brand: "DermaCleanse Micellar Water", category: "Skincare & Beauty", competitor: "@garnierindonesia", description: "Micellar water gentle cleanser untuk kulit sensitif Indonesia dengan ekstrak aloe vera.", email: "dermacleanse@gmail.com", phone: "081234567913", status: "COMPLETED", notion_url: "https://notion.so/workspace/dermacleanse" },
  { order_id: "INV-711902", brand: "PawPal Pet Care & Grooming", category: "Jasa Profesional", competitor: "@petkingdom", description: "Layanan grooming hewan peliharaan premium dengan home service dan perawatan holistic.", email: "pawpal.pet@gmail.com", phone: "081234567914", status: "COMPLETED", notion_url: "https://notion.so/workspace/pawpal" },
  { order_id: "INV-700291", brand: "SnackSehat Keripik Jamur Tiram", category: "Kuliner / F&B", competitor: "@kriuk_id", description: "Keripik jamur tiram sehat tanpa MSG, diproses dengan teknologi vacuum frying.", email: "snacksehat@gmail.com", phone: "081234567915", status: "COMPLETED", notion_url: "https://notion.so/workspace/snacksehat" },
  { order_id: "INV-699102", brand: "AeroFit Activewear Gym", category: "Fashion & Apparel", competitor: "@gymshark", description: "Activewear gym premium dengan material moisture-wicking dan desain yang memotivasi.", email: "aerofit.wear@gmail.com", phone: "081234567916", status: "COMPLETED", notion_url: "https://notion.so/workspace/aerofit" },
  { order_id: "INV-688190", brand: "Solusi Akun Kursus Mandarin", category: "Jasa Profesional", competitor: "@cakap_id", description: "Kursus Mandarin online dengan native speaker dan kurikulum HSK terstruktur.", email: "solusi.mandarin@gmail.com", phone: "081234567917", status: "COMPLETED", notion_url: "https://notion.so/workspace/mandarin" },
  { order_id: "INV-677019", brand: "Dapur Brownies Fudgy Lumer", category: "Kuliner / F&B", competitor: "@fudgybro", description: "Brownies fudgy premium dengan topping premium dan pengiriman same-day Jabodetabek.", email: "dapur.brownies@gmail.com", phone: "081234567918", status: "COMPLETED", notion_url: "https://notion.so/workspace/brownies" },
  { order_id: "INV-666192", brand: "SoundWave TWS Bluetooth Earbuds", category: "Gadget / Elektronik", competitor: "@soundcore_id", description: "TWS earbuds dengan active noise cancellation dan battery life 36 jam total.", email: "soundwave.tws@gmail.com", phone: "081234567919", status: "COMPLETED", notion_url: "https://notion.so/workspace/soundwave" },
  { order_id: "INV-655102", brand: "Koleksi Sandal Kulit Pria Java", category: "Fashion & Apparel", competitor: "@portblue", description: "Sandal kulit handmade pria dengan desain casual premium dan comfort insole.", email: "java.sandal@gmail.com", phone: "081234567920", status: "COMPLETED", notion_url: "https://notion.so/workspace/java-sandal" },
  { order_id: "INV-644190", brand: "Camilan Keripik Tempe Mendoan Oven", category: "Kuliner / F&B", competitor: "@tempe_crispy", description: "Keripik tempe mendoan panggang oven dengan rasa rempah tradisional dan tekstur renyah.", email: "tempe.mendoan@gmail.com", phone: "081234567921", status: "COMPLETED", notion_url: "https://notion.so/workspace/tempe-mendoan" },
  { order_id: "INV-633019", brand: "Optik Mata Sehat Express", category: "Jasa Profesional", competitor: "@optik_seis", description: "Optik modern dengan layanan pemeriksaan mata cepat dan kacamata ready-stock.", email: "mata.sehat@gmail.com", phone: "081234567922", status: "COMPLETED", notion_url: "https://notion.so/workspace/optik-sehat" },
  { order_id: "INV-622108", brand: "Dapur Sambal Bawang Bu Broto", category: "Kuliner / F&B", competitor: "@sambal_bu_rudy", description: "Sambal bawang pedas khas Jogja dengan resep warisan turun-temurun dan kemasan higienis.", email: "sambal.broto@gmail.com", phone: "081234567923", status: "COMPLETED", notion_url: "https://notion.so/workspace/sambal-broto" },
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

    // Insert orders
    const now = new Date();
    const ordersWithDates = ORDERS.map((o, i) => ({
      ...o,
      created_at: new Date(now.getTime() - (i * 3600000 * (2 + Math.random() * 6))).toISOString(),
      updated_at: new Date(now.getTime() - (i * 3600000 * (2 + Math.random() * 6))).toISOString(),
    }));

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
