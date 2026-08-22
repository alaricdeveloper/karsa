-- Karsa Studio Seed Data
-- Run this in Supabase SQL Editor

-- ============================================
-- SCHEMA
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  competitor TEXT,
  description TEXT NOT NULL,
  content_goal TEXT,
  content_tone TEXT,
  priority_channel TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING_PAYMENT'
    CHECK (status IN ('PENDING_PAYMENT', 'IN_PROGRESS', 'QC_REVIEW', 'COMPLETED')),
  notion_url TEXT,
  notes TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  day_number INT NOT NULL CHECK (day_number BETWEEN 1 AND 30),
  pillar TEXT NOT NULL,
  hook TEXT,
  body TEXT,
  cta TEXT,
  caption TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (order_id, day_number)
);

CREATE TABLE IF NOT EXISTS public.seo_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  article_number INT NOT NULL CHECK (article_number BETWEEN 1 AND 4),
  article_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  outline TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (order_id, article_number)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON public.orders(order_id);
CREATE INDEX IF NOT EXISTS idx_content_items_order_id ON public.content_items(order_id);
CREATE INDEX IF NOT EXISTS idx_seo_articles_order_id ON public.seo_articles(order_id);

-- ============================================
-- RLS POLICIES
-- ============================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Admin full access" ON public.orders;
DROP POLICY IF EXISTS "Admin full access" ON public.content_items;
DROP POLICY IF EXISTS "Admin full access" ON public.seo_articles;
DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Public read content" ON public.content_items;
DROP POLICY IF EXISTS "Public read seo" ON public.seo_articles;

-- Admin full access (service role bypasses RLS)
CREATE POLICY "Admin full access" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON public.content_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access" ON public.seo_articles FOR ALL USING (true) WITH CHECK (true);

-- Public read access (restrict in production)
CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public read content" ON public.content_items FOR SELECT USING (true);
CREATE POLICY "Public read seo" ON public.seo_articles FOR SELECT USING (true);

-- ============================================
-- SEED DATA: 34 ORDERS + CONTENT + SEO
-- All in one DO block (single statement)
-- ============================================
DO $$
BEGIN
  -- Clear any partial data from failed runs
  TRUNCATE public.content_items CASCADE;
  TRUNCATE public.seo_articles CASCADE;
  TRUNCATE public.orders CASCADE;
END $$;

-- Orders (single INSERT with VALUES)
INSERT INTO public.orders (order_id, brand, category, competitor, description, email, phone, status, notion_url, created_at)
VALUES
  ('INV-993810', 'Aroma Sambal Tempong Ibu Sri', 'Kuliner / F&B', '@sambal_bu_rudy', 'Sambal tempong pedas khas Jawa Timur dengan cita rasa autentik dan kemasan modern.', 'ibusrisambal@gmail.com', '081234567890', 'IN_PROGRESS', NULL, now() - interval '2 hours'),
  ('INV-982104', 'Lumina Skin Barrier Lab', 'Skincare & Beauty', '@somethincofficial', 'Skincare barrier-repair dengan 7 ingredients essential, diformulasikan untuk kulit sensitif Indonesia.', 'lumina.skincare@gmail.com', '081234567891', 'IN_PROGRESS', NULL, now() - interval '5 hours'),
  ('INV-971482', 'Karsa Modular Studio', 'Fashion & Apparel', '@dekoruma', 'Furniture modular custom untuk apartemen urban dengan desain scandinavian minimalis.', 'karsa.modular@gmail.com', '081234567892', 'IN_PROGRESS', NULL, now() - interval '7 hours'),
  ('INV-960291', 'PajakMudah Konsultan UMKM', 'Jasa Profesional', '@klikpajak', 'Konsultan pajak UMKM dengan layanan konsultasi online dan pelaporan SPT tahunan.', 'pajakmudah@gmail.com', '081234567893', 'IN_PROGRESS', NULL, now() - interval '11 hours'),
  ('INV-952819', 'Cold Drop Artisan Roastery', 'Kuliner / F&B', '@kopikenangan.id', 'Artisan coffee roastery dengan precision roasting technology dan single-origin beans.', 'coldbrew.drop@gmail.com', '081234567894', 'QC_REVIEW', 'https://notion.so/workspace/cold-drop', now() - interval '16 hours'),
  ('INV-941092', 'FitDaily Meal Prep Diet', 'Kuliner / F&B', '@yellowfitkitchen', 'Meal prep sehat dengan kalori terkontrol, dikirim segar setiap minggu ke Jabodetabek.', 'fitdaily.meal@gmail.com', '081234567895', 'QC_REVIEW', 'https://notion.so/workspace/fitdaily', now() - interval '19 hours'),
  ('INV-930419', 'Zenith Gadget Armor', 'Gadget / Elektronik', '@spigen_id', 'Casing dan pelindung gadget premium dengan material military-grade dan desain tipis.', 'zenith.gadget@gmail.com', '081234567896', 'PENDING_PAYMENT', NULL, now() - interval '1 hours'),
  ('INV-920188', 'Nala Baby Organic Wear', 'Fashion & Apparel', '@littlepalmerhaus', 'Pakaian bayi organik dengan sertifikasi GOTS, aman untuk kulit sensitif newborn.', 'nala.baby@gmail.com', '081234567897', 'PENDING_PAYMENT', NULL, now() - interval '3 hours'),
  ('INV-881920', 'Bakso Goreng Anugerah', 'Kuliner / F&B', '@baksogorenggajah', 'Bakso goreng renyah dengan isian daging sapi pilihan, franchise nasional.', 'bakso.goreng@gmail.com', '081234567898', 'COMPLETED', 'https://notion.so/workspace/bakso-anugerah', now() - interval '2 days'),
  ('INV-873910', 'Sora Japanese Hair Studio', 'Jasa Profesional', '@onepiecehair', 'Salon Jepang premium dengan teknologi perawatan rambut terbaru dan stylist bersertifikat.', 'sora.hair@gmail.com', '081234567899', 'COMPLETED', 'https://notion.so/workspace/sora-hair', now() - interval '3 days'),
  ('INV-864019', 'Aethel Linen & Cotton Wear', 'Fashion & Apparel', '@cottonink', 'Pakaian linen dan katun premium untuk pria modern dengan desain timeless.', 'aethel.wear@gmail.com', '081234567900', 'COMPLETED', 'https://notion.so/workspace/aethel', now() - interval '4 days'),
  ('INV-852918', 'Veloce Auto Detailing', 'Jasa Profesional', '@scuto.id', 'Auto detailing premium dengan nano-ceramic coating dan paint protection film.', 'veloce.detail@gmail.com', '081234567901', 'COMPLETED', 'https://notion.so/workspace/veloce', now() - interval '5 days'),
  ('INV-841098', 'Glow Botanic Herbal Soap', 'Skincare & Beauty', '@sensatia_botanicals', 'Sabun herbal handmade dengan bahan organik, ramah lingkungan dan kulit sensitif.', 'glow.botanic@gmail.com', '081234567902', 'COMPLETED', 'https://notion.so/workspace/glow-botanic', now() - interval '6 days'),
  ('INV-830291', 'Kopi Susu Tetangga Senja', 'Kuliner / F&B', '@kopituku', 'Kopi susu kekinian dengan resep turun-temurun dan harga terjangkau untuk anak muda.', 'tetangga.senja@gmail.com', '081234567903', 'COMPLETED', 'https://notion.so/workspace/tetangga-senja', now() - interval '7 days'),
  ('INV-821948', 'Urban Leather Craft', 'Fashion & Apparel', '@revoltindustry', 'Aksesoris kulit handmade premium untuk pria dan wanita urban.', 'urban.leather@gmail.com', '081234567904', 'COMPLETED', 'https://notion.so/workspace/urban-leather', now() - interval '8 days'),
  ('INV-810482', 'Dentika Dental Clinic', 'Jasa Profesional', '@farsdent', 'Klinik gigi modern dengan teknologi digital dentistry dan layanan estetik gigi.', 'dentika.clinic@gmail.com', '081234567905', 'COMPLETED', 'https://notion.so/workspace/dentika', now() - interval '9 days'),
  ('INV-799102', 'Kyoto Matcha Bar Tangerang', 'Kuliner / F&B', '@matchabae', 'Matcha bar autentik Jepang dengan ceremonial grade matcha dan dessert fusion.', 'kyoto.matcha@gmail.com', '081234567906', 'COMPLETED', 'https://notion.so/workspace/kyoto-matcha', now() - interval '11 days'),
  ('INV-788291', 'ErgoDesk Indonesia', 'Gadget / Elektronik', '@oxihom', 'Meja kerja ergonomis standing desk dengan motor elektrik dan integrated cable management.', 'ergodesk.id@gmail.com', '081234567907', 'COMPLETED', 'https://notion.so/workspace/ergodesk', now() - interval '12 days'),
  ('INV-777102', 'Seroja Hijab Syar''i', 'Fashion & Apparel', '@kamiidea', 'Hijab syar''i premium dengan bahan premium dan desain elegan untuk muslimah modern.', 'seroja.hijab@gmail.com', '081234567908', 'COMPLETED', 'https://notion.so/workspace/seroja', now() - interval '14 days'),
  ('INV-766190', 'PureWater RO Filter Rumahan', 'Lainnya', '@coway_id', 'Sistem filter air RO untuk rumah tangga dengan teknologi 5 tahap penyaringan.', 'purewater.ro@gmail.com', '081234567909', 'COMPLETED', 'https://notion.so/workspace/purewater', now() - interval '15 days'),
  ('INV-755481', 'Roti Sisir Mentega Surabaya', 'Kuliner / F&B', '@roti_matahari', 'Roti sisir mentega khas Surabaya dengan resep turun-temurun dan topping kekinian.', 'roti.sisir@gmail.com', '081234567910', 'COMPLETED', 'https://notion.so/workspace/roti-sisir', now() - interval '17 days'),
  ('INV-744019', 'Kalyana Yoga & Pilates', 'Jasa Profesional', '@celebrityfitness', 'Studio yoga dan pilates premium dengan instruktur bersertifikat internasional.', 'kalyana.yoga@gmail.com', '081234567911', 'COMPLETED', 'https://notion.so/workspace/kalyana', now() - interval '18 days'),
  ('INV-733910', 'Nusantara Heritage Batik Pria', 'Fashion & Apparel', '@danarhadi', 'Batik pria premium dengan motif tradisional yang diinterpretasikan dalam desain kontemporer.', 'heritage.batik@gmail.com', '081234567912', 'COMPLETED', 'https://notion.so/workspace/heritage-batik', now() - interval '19 days'),
  ('INV-722109', 'DermaCleanse Micellar Water', 'Skincare & Beauty', '@garnierindonesia', 'Micellar water gentle cleanser untuk kulit sensitif Indonesia dengan ekstrak aloe vera.', 'dermacleanse@gmail.com', '081234567913', 'COMPLETED', 'https://notion.so/workspace/dermacleanse', now() - interval '21 days'),
  ('INV-711902', 'PawPal Pet Care & Grooming', 'Jasa Profesional', '@petkingdom', 'Layanan grooming hewan peliharaan premium dengan home service dan perawatan holistic.', 'pawpal.pet@gmail.com', '081234567914', 'COMPLETED', 'https://notion.so/workspace/pawpal', now() - interval '22 days'),
  ('INV-700291', 'SnackSehat Keripik Jamur Tiram', 'Kuliner / F&B', '@kriuk_id', 'Keripik jamur tiram sehat tanpa MSG, diproses dengan teknologi vacuum frying.', 'snacksehat@gmail.com', '081234567915', 'COMPLETED', 'https://notion.so/workspace/snacksehat', now() - interval '24 days'),
  ('INV-699102', 'AeroFit Activewear Gym', 'Fashion & Apparel', '@gymshark', 'Activewear gym premium dengan material moisture-wicking dan desain yang memotivasi.', 'aerofit.wear@gmail.com', '081234567916', 'COMPLETED', 'https://notion.so/workspace/aerofit', now() - interval '25 days'),
  ('INV-688190', 'Solusi Akun Kursus Mandarin', 'Jasa Profesional', '@cakap_id', 'Kursus Mandarin online dengan native speaker dan kurikulum HSK terstruktur.', 'solusi.mandarin@gmail.com', '081234567917', 'COMPLETED', 'https://notion.so/workspace/mandarin', now() - interval '26 days'),
  ('INV-677019', 'Dapur Brownies Fudgy Lumer', 'Kuliner / F&B', '@fudgybro', 'Brownies fudgy premium dengan topping premium dan pengiriman same-day Jabodetabek.', 'dapur.brownies@gmail.com', '081234567918', 'COMPLETED', 'https://notion.so/workspace/brownies', now() - interval '27 days'),
  ('INV-666192', 'SoundWave TWS Bluetooth Earbuds', 'Gadget / Elektronik', '@soundcore_id', 'TWS earbuds dengan active noise cancellation dan battery life 36 jam total.', 'soundwave.tws@gmail.com', '081234567919', 'COMPLETED', 'https://notion.so/workspace/soundwave', now() - interval '28 days'),
  ('INV-655102', 'Koleksi Sandal Kulit Pria Java', 'Fashion & Apparel', '@portblue', 'Sandal kulit handmade pria dengan desain casual premium dan comfort insole.', 'java.sandal@gmail.com', '081234567920', 'COMPLETED', 'https://notion.so/workspace/java-sandal', now() - interval '28 days'),
  ('INV-644190', 'Camilan Keripik Tempe Mendoan Oven', 'Kuliner / F&B', '@tempe_crispy', 'Keripik tempe mendoan panggang oven dengan rasa rempah tradisional dan tekstur renyah.', 'tempe.mendoan@gmail.com', '081234567921', 'COMPLETED', 'https://notion.so/workspace/tempe-mendoan', now() - interval '29 days'),
  ('INV-633019', 'Optik Mata Sehat Express', 'Jasa Profesional', '@optik_seis', 'Optik modern dengan layanan pemeriksaan mata cepat dan kacamata ready-stock.', 'mata.sehat@gmail.com', '081234567922', 'COMPLETED', 'https://notion.so/workspace/optik-sehat', now() - interval '29 days'),
  ('INV-622108', 'Dapur Sambal Bawang Bu Broto', 'Kuliner / F&B', '@sambal_bu_rudy', 'Sambal bawang pedas khas Jogja dengan resep warisan turun-temurun dan kemasan higienis.', 'sambal.broto@gmail.com', '081234567923', 'COMPLETED', 'https://notion.so/workspace/sambal-broto', now() - interval '30 days');

-- ============================================
-- SEED DATA: CONTENT ITEMS (30 per order)
-- ============================================
INSERT INTO public.content_items (order_id, day_number, pillar, hook, body, cta, caption)
SELECT
  o.id,
  d.day_number,
  CASE (d.day_number - 1) % 4
    WHEN 0 THEN 'Edukasi Solusi'
    WHEN 1 THEN 'Storytelling Nyata'
    WHEN 2 THEN 'Penawaran Spesial'
    WHEN 3 THEN 'Mitos vs Fakta'
  END as pillar,
  '[Hook 3s] Kenapa banyak orang masih salah pakai produk di industri ' || o.category || '? Ini perbandingan nyatanya...' as hook,
  'Di ' || o.brand || ', kami merancang: "' || o.description || '". Hasilnya jauh lebih praktis dan hemat waktu tanpa drama.' as body,
  '"Ketik ''MAU'' di DM ' || o.brand || ' untuk klaim penawaran batch ini sekarang juga!"' as cta,
  o.description || E'\n\nSimpan postingan ini dan bagikan ke teman yang butuh solusi serupa di ' || o.category || '!\n\n#' || replace(o.brand, ' ', '') || ' #umkmindonesia #kontenviral' as caption
FROM public.orders o
CROSS JOIN generate_series(1, 30) as d(day_number);

-- ============================================
-- SEED DATA: SEO ARTICLES (4 per order)
-- ============================================
INSERT INTO public.seo_articles (order_id, article_number, article_type, title, description, outline)
SELECT
  o.id,
  a.article_number,
  a.article_type,
  replace(replace(a.title, '{brand}', o.brand), '{category}', o.category) as title,
  replace(a.description, '{category}', o.category) as description,
  replace(replace(a.outline, '{brand}', o.brand), '{category}', o.category) as outline
FROM public.orders o
CROSS JOIN (VALUES
  (1, 'Pillar Content', 'Panduan Lengkap Memilih Produk di Sektor {category}', 'Artikel komprehensif 1.000+ kata tentang panduan memilih produk berkualitas.', 'H1: Panduan Lengkap Memilih Produk di Sektor {category}\nH2: Mengapa Kualitas Penting\nH2: 5 Ciri Produk Berkualitas\nH2: Rekomendasi Terbaik\nH2: Tips Membeli'),
  (2, 'Commercial Intent', 'Mengapa {brand} Lebih Efisien Dibanding Kompetitor', 'Analisis komparatif yang menunjukkan keunggulan produk/layangan.', 'H1: Mengapa {brand} Lebih Efisien\nH2: Perbandingan dengan Kompetitor\nH2: Keunggulan Produk\nH2: Testimoni Pelanggan\nH2: Cara Memesan'),
  (3, 'Problem Solving', '5 Kesalahan Umum Saat Membeli Produk {category}', 'Edukasi tentang kesalahan umum dan solusinya.', 'H1: 5 Kesalahan Umum\nH2: Kesalahan #1: Terlalu Murah\nH2: Kesalahan #2: Tanpa Riset\nH2: Kesalahan #3: Ikut-ikutan\nH2: Solusi yang Tepat'),
  (4, 'How-To Guide', 'Tips Perawatan & Penggunaan Maksimal untuk Hasil Terbaik', 'Panduan pasca-pembelian untuk retensi pelanggan.', 'H1: Tips Perawatan & Penggunaan\nH2: Cara Perawatan Dasar\nH2: Tips Advanced\nH2: Tanda Perlu Ganti\nH2: Rekomendasi Produk Pendukung')
) a(article_number, article_type, title, description, outline);

-- ============================================
-- HELPER FUNCTION: Updated timestamp trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
