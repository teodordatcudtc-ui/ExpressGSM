-- Categorii opționale: Tablete și Laptopuri
-- Rulează în Supabase Dashboard → SQL Editor dacă vrei aceste categorii pe site.

INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Tablete', 'tablete', 'Tablete și iPad-uri', NULL),
  ('Laptopuri', 'laptopuri', 'Laptopuri și notebook-uri', NULL)
ON CONFLICT (slug) DO NOTHING;
