import { createClient } from "@supabase/supabase-js";

export interface DeliverableOrder {
  id: string;
  brand: string;
  category: string;
  description: string;
}

export async function generateDeliverables(order: DeliverableOrder): Promise<{ ok: boolean; error?: string }> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const pillars = ["Edukasi Solusi", "Storytelling Nyata", "Penawaran Spesial", "Mitos vs Fakta"];

  const contentItems: {
    order_id: string;
    day_number: number;
    pillar: string;
    hook: string;
    body: string;
    cta: string;
    caption: string;
  }[] = [];

  for (let day = 1; day <= 30; day++) {
    const pillarIdx = (day - 1) % 4;
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

  const { error: contentErr } = await supabase.from("content_items").insert(contentItems);
  if (contentErr) {
    return { ok: false, error: contentErr.message };
  }

  const articleTemplates = [
    { article_number: 1, article_type: "Pillar Content", titleTpl: "Panduan Lengkap Memilih Produk di Sektor {category}", descTpl: "Artikel komprehensif 1.000+ kata tentang panduan memilih produk berkualitas.", outlineTpl: "H1: Panduan Lengkap Memilih Produk di Sektor {category}\nH2: Mengapa Kualitas Penting\nH2: 5 Ciri Produk Berkualitas\nH2: Rekomendasi Terbaik\nH2: Tips Membeli" },
    { article_number: 2, article_type: "Commercial Intent", titleTpl: "Mengapa {brand} Lebih Efisien Dibanding Kompetitor", descTpl: "Analisis komparatif yang menunjukkan keunggulan produk/layanan.", outlineTpl: "H1: Mengapa {brand} Lebih Efisien\nH2: Perbandingan dengan Kompetitor\nH2: Keunggulan Produk\nH2: Testimoni Pelanggan\nH2: Cara Memesan" },
    { article_number: 3, article_type: "Problem Solving", titleTpl: "5 Kesalahan Umum Saat Membeli Produk {category}", descTpl: "Edukasi tentang kesalahan umum dan solusinya.", outlineTpl: "H1: 5 Kesalahan Umum\nH2: Kesalahan #1: Terlalu Murah\nH2: Kesalahan #2: Tanpa Riset\nH2: Kesalahan #3: Ikut-ikutan\nH2: Solusi yang Tepat" },
    { article_number: 4, article_type: "How-To Guide", titleTpl: "Tips Perawatan & Penggunaan Maksimal untuk Hasil Terbaik", descTpl: "Panduan pasca-pembelian untuk retensi pelanggan.", outlineTpl: "H1: Tips Perawatan & Penggunaan\nH2: Cara Perawatan Dasar\nH2: Tips Advanced\nH2: Tanda Perlu Ganti\nH2: Rekomendasi Produk Pendukung" },
  ];

  const seoArticles: {
    order_id: string;
    article_number: number;
    article_type: string;
    title: string;
    description: string;
    outline: string;
  }[] = [];

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

  const { error: seoErr } = await supabase.from("seo_articles").insert(seoArticles);
  if (seoErr) {
    return { ok: false, error: seoErr.message };
  }

  return { ok: true };
}