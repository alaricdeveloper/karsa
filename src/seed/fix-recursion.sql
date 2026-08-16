-- KILL the recursive policies on profiles
DROP POLICY IF EXISTS "User can read own profile" ON profiles;
DROP POLICY IF EXISTS "Admin can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Anyone can read profiles" ON profiles;

-- Simple: everyone can read profiles (no self-reference)
CREATE POLICY "Anyone can read profiles" ON profiles
  FOR SELECT USING (true);

-- Same for orders/content/seo: drop ALL old policies, recreate clean
-- ORDERS
DROP POLICY IF EXISTS "Admin full access" ON orders;
DROP POLICY IF EXISTS "Admin full access on orders" ON orders;
DROP POLICY IF EXISTS "Public read for all statuses" ON orders;
DROP POLICY IF EXISTS "Public read orders" ON orders;
DROP POLICY IF EXISTS "Customer sees own orders" ON orders;
DROP POLICY IF EXISTS "Customer sees own order" ON orders;
DROP POLICY IF EXISTS "Authenticated user can insert orders" ON orders;
DROP POLICY IF EXISTS "Authenticated user can insert order" ON orders;

CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Authenticated insert orders" ON orders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update orders" ON orders FOR UPDATE USING (auth.uid() IS NOT NULL);

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

CREATE POLICY "Public read content_items" ON content_items FOR SELECT USING (true);
CREATE POLICY "Authenticated insert content_items" ON content_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

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

CREATE POLICY "Public read seo_articles" ON seo_articles FOR SELECT USING (true);
CREATE POLICY "Authenticated insert seo_articles" ON seo_articles FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
