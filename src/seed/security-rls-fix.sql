-- ============================================================
-- Karsa Studio — SECURITY: RLS hardening
-- Run this in Supabase Dashboard → SQL Editor (or via psql).
-- Closes the PII/data-exposure holes:
--   1. Drop "public read" policies on orders/content_items/seo_articles
--      (the anon key is public — anyone could dump all customer
--      orders with emails + phones straight from the API)
--   2. Drop open "authenticated insert" policies (app writes via
--      service-role API routes only; direct client inserts no longer
--      allowed)
--   3. Drop "Anyone can read profiles" (email/role enumeration) —
--      users keep reading their own profile only
--   4. Revoke anon write grants on all business tables
-- ============================================================

-- ---- ORDERS ----
DROP POLICY IF EXISTS "Public read orders" ON orders;
DROP POLICY IF EXISTS "Public read for all statuses" ON orders;

DROP POLICY IF EXISTS "Authenticated user can insert orders" ON orders;
DROP POLICY IF EXISTS "Authenticated user can insert order" ON orders;

-- ---- CONTENT ITEMS ----
DROP POLICY IF EXISTS "Public read content_items" ON content_items;
DROP POLICY IF EXISTS "Public read content" ON content_items;
DROP POLICY IF EXISTS "Public read for all statuses" ON content_items;

DROP POLICY IF EXISTS "Authenticated user can insert content_items" ON content_items;
DROP POLICY IF EXISTS "Authenticated user can insert content" ON content_items;

-- ---- SEO ARTICLES ----
DROP POLICY IF EXISTS "Public read seo_articles" ON seo_articles;
DROP POLICY IF EXISTS "Public read seo" ON seo_articles;
DROP POLICY IF EXISTS "Public read for all statuses" ON seo_articles;

DROP POLICY IF EXISTS "Authenticated user can insert seo_articles" ON seo_articles;
DROP POLICY IF EXISTS "Authenticated user can insert seo" ON seo_articles;

-- ---- PROFILES ----
DROP POLICY IF EXISTS "Anyone can read profiles" ON profiles;

-- ---- GRANTS (belt & suspenders) ----
REVOKE ALL ON public.orders FROM anon;
GRANT SELECT ON public.orders TO anon;

REVOKE ALL ON public.content_items FROM anon;
GRANT SELECT ON public.content_items TO anon;

REVOKE ALL ON public.seo_articles FROM anon;
GRANT SELECT ON public.seo_articles TO anon;

REVOKE ALL ON public.profiles FROM anon;
GRANT SELECT ON public.profiles TO anon;
-- ============================================================
-- LANJUTAN — POLICY AUTHENTICATED (diperlukan agar aplikasi tetap
-- berfungsi setelah policy publik dijatuhkan):
--   * profil: user hanya bisa baca/ubah profilnya sendiri
--   * orders/content/seo: user hanya bisa baca miliknya (via email JWT)
--   * semua akses admin tetap lewat API server (service role / anon+token)
-- ============================================================

-- ---- PROFILES: baca & perbarui profil sendiri ----
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- ---- ORDERS: baca order milik sendiri (ownership via email JWT) ----
DROP POLICY IF EXISTS "Users can read own orders" ON orders;
CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- ---- CONTENT ITEMS: baca konten dari order milik sendiri ----
DROP POLICY IF EXISTS "Users can read own content" ON content_items;
CREATE POLICY "Users can read own content"
  ON content_items FOR SELECT TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- ---- SEO ARTICLES: baca artikel dari order milik sendiri ----
DROP POLICY IF EXISTS "Users can read own seo" ON seo_articles;
CREATE POLICY "Users can read own seo"
  ON seo_articles FOR SELECT TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- ---- VERIFIKASI ----
-- Setelah dijalankan:
--   anon key        : TIDAK bisa baca apa pun (orders/content/seo/profiles)
--   user login      : bisa baca profil sendiri + order/content/seo miliknya
--   admin console   : tetap jalan (API pakai service role)
--   dashboard       : fallback client-side ikut jalan (policy di atas)
