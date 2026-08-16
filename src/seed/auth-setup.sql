-- ============================================
-- AUTH SETUP FOR KARSA STUDIO
-- Run this AFTER seed.sql
-- ============================================

-- 1. Add user_id column to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 2. Create profiles table (role management)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.content_items TO service_role;
GRANT ALL ON public.seo_articles TO service_role;
GRANT SELECT ON public.orders TO anon;
GRANT SELECT ON public.content_items TO anon;
GRANT SELECT ON public.seo_articles TO anon;

-- 5. Drop ALL old policies first (idempotent)
-- ORDERS
DROP POLICY IF EXISTS "Admin full access" ON orders;
DROP POLICY IF EXISTS "Admin full access on orders" ON orders;
DROP POLICY IF EXISTS "Public read for all statuses" ON orders;
DROP POLICY IF EXISTS "Public read orders" ON orders;
DROP POLICY IF EXISTS "Customer sees own orders" ON orders;
DROP POLICY IF EXISTS "Customer sees own order" ON orders;
DROP POLICY IF EXISTS "Authenticated user can insert orders" ON orders;
DROP POLICY IF EXISTS "Authenticated user can insert order" ON orders;

CREATE POLICY "Admin full access on orders" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customer sees own orders" ON orders
  FOR SELECT USING (user_id = auth.uid());

-- Allow insert for authenticated users (order creation)
CREATE POLICY "Authenticated user can insert orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Public read access (needed before auth is fully wired)
CREATE POLICY "Public read orders" ON orders
  FOR SELECT USING (true);

-- CONTENT ITEMS
DROP POLICY IF EXISTS "Admin full access" ON content_items;
DROP POLICY IF EXISTS "Admin full access on content_items" ON content_items;
DROP POLICY IF EXISTS "Public read for all statuses" ON content_items;
DROP POLICY IF EXISTS "Public read content" ON content_items;
DROP POLICY IF EXISTS "Public read content_items" ON content_items;
DROP POLICY IF EXISTS "Customer sees own content_items" ON content_items;
DROP POLICY IF EXISTS "Customer sees own content" ON content_items;
DROP POLICY IF EXISTS "Authenticated user can insert content_items" ON content_items;
DROP POLICY IF EXISTS "Authenticated user can insert content" ON content_items;

CREATE POLICY "Admin full access on content_items" ON content_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customer sees own content_items" ON content_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = content_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Allow insert for authenticated users
CREATE POLICY "Authenticated user can insert content_items" ON content_items
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Public read access
CREATE POLICY "Public read content_items" ON content_items
  FOR SELECT USING (true);

-- SEO ARTICLES
DROP POLICY IF EXISTS "Admin full access" ON seo_articles;
DROP POLICY IF EXISTS "Admin full access on seo_articles" ON seo_articles;
DROP POLICY IF EXISTS "Public read for all statuses" ON seo_articles;
DROP POLICY IF EXISTS "Public read seo" ON seo_articles;
DROP POLICY IF EXISTS "Public read seo_articles" ON seo_articles;
DROP POLICY IF EXISTS "Customer sees own seo_articles" ON seo_articles;
DROP POLICY IF EXISTS "Customer sees own seo" ON seo_articles;
DROP POLICY IF EXISTS "Authenticated user can insert seo_articles" ON seo_articles;
DROP POLICY IF EXISTS "Authenticated user can insert seo" ON seo_articles;

CREATE POLICY "Admin full access on seo_articles" ON seo_articles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Customer sees own seo_articles" ON seo_articles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = seo_articles.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Allow insert for authenticated users
CREATE POLICY "Authenticated user can insert seo_articles" ON seo_articles
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Public read access
CREATE POLICY "Public read seo_articles" ON seo_articles
  FOR SELECT USING (true);

-- PROFILES
DROP POLICY IF EXISTS "User can read own profile" ON profiles;
DROP POLICY IF EXISTS "Admin can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Anyone can read profiles" ON profiles;

GRANT ALL ON public.profiles TO service_role;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO anon;

-- Simple policies — no self-referencing to avoid infinite recursion
CREATE POLICY "User can read own profile" ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Anyone can read profiles" ON profiles
  FOR SELECT USING (true);

-- 6. To seed admin user, run AFTER creating the user in Supabase Dashboard:
-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@karsa.my.id';
