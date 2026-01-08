-- ============================================
-- Supabase Schema pentru ecranul.ro
-- Rulează acest SQL în Supabase Dashboard → SQL Editor
-- ============================================

-- ============================================
-- 1. Categories Table
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- ============================================
-- 2. Products Table
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  stock INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- ============================================
-- 3. Orders Table
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ============================================
-- 4. Order Items Table
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- ============================================
-- 5. Insert Default Categories
-- ============================================
INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Ecrane', 'ecrane', 'Ecrane originale și compatibile pentru toate modelele', NULL),
  ('Baterii', 'baterii', 'Baterii noi și performante', NULL),
  ('Accesorii', 'accesorii', 'Huse, încărcătoare, căști și multe altele', NULL),
  ('Telefoane', 'telefoane', 'Telefoane noi și second-hand de toate mărcile', NULL)
ON CONFLICT (slug) DO NOTHING;

-- Insert Phone Brands as Subcategories
INSERT INTO categories (name, slug, description, parent_id)
SELECT 
  brand_name,
  'telefoane-' || LOWER(REPLACE(brand_name, ' ', '-')),
  'Telefoane ' || brand_name,
  (SELECT id FROM categories WHERE slug = 'telefoane' LIMIT 1)
FROM (VALUES 
  ('iPhone'),
  ('Samsung'),
  ('Huawei'),
  ('Xiaomi'),
  ('Oppo'),
  ('OnePlus'),
  ('Google Pixel'),
  ('Alte Mărci')
) AS brands(brand_name)
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'telefoane')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 6. Row Level Security (RLS)
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Categories Policies
CREATE POLICY "Categories: Everyone can read"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Categories: Everyone can insert"
  ON categories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Categories: Everyone can update"
  ON categories FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Categories: Everyone can delete"
  ON categories FOR DELETE
  USING (true);

-- Products Policies
CREATE POLICY "Products: Everyone can read"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Products: Everyone can insert"
  ON products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Products: Everyone can update"
  ON products FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Products: Everyone can delete"
  ON products FOR DELETE
  USING (true);

-- Orders Policies
CREATE POLICY "Orders: Everyone can read"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Orders: Everyone can insert"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Orders: Everyone can update"
  ON orders FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Orders: Everyone can delete"
  ON orders FOR DELETE
  USING (true);

-- Order Items Policies
CREATE POLICY "Order Items: Everyone can read"
  ON order_items FOR SELECT
  USING (true);

CREATE POLICY "Order Items: Everyone can insert"
  ON order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Order Items: Everyone can update"
  ON order_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Order Items: Everyone can delete"
  ON order_items FOR DELETE
  USING (true);

-- ============================================
-- DONE! Schema is ready.
-- ============================================

