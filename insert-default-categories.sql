-- ============================================
-- Script pentru inserarea categoriilor și subcategoriilor default
-- Rulează acest SQL în Supabase Dashboard → SQL Editor
-- ============================================

-- 1. Categorii principale pentru SHOP
-- ============================================

-- Telefoane (categorie principală)
INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Telefoane', 'telefoane', 'Telefoane noi și second-hand de toate mărcile', NULL)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Display (categorie principală)
INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Display', 'display', 'Ecrane și display-uri pentru toate modelele', NULL)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Promoția zilei (categorie principală)
INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Promoția zilei', 'promotia-zilei', 'Produse la prețuri speciale', NULL)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. Subcategorii pentru TELEFOANE
-- ============================================
INSERT INTO categories (name, slug, description, parent_id)
SELECT 
  subcat_name,
  'telefoane-' || LOWER(REPLACE(REPLACE(subcat_name, ' ', '-'), '&', 'si')),
  'Telefoane ' || subcat_name,
  (SELECT id FROM categories WHERE slug = 'telefoane' LIMIT 1)
FROM (VALUES 
  ('iPhone'),
  ('Samsung'),
  ('Huawei'),
  ('Xiaomi'),
  ('Redmi'),
  ('Motorola'),
  ('Oppo'),
  ('Cu butoane'),
  ('100-200 LEI')
) AS subcats(subcat_name)
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'telefoane')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 3. Subcategorii pentru DISPLAY
-- ============================================
INSERT INTO categories (name, slug, description, parent_id)
SELECT 
  subcat_name,
  'display-' || LOWER(REPLACE(subcat_name, ' ', '-')),
  'Display pentru ' || subcat_name,
  (SELECT id FROM categories WHERE slug = 'display' LIMIT 1)
FROM (VALUES 
  ('iPhone'),
  ('Samsung'),
  ('Huawei'),
  ('Redmi'),
  ('Motorola'),
  ('Oppo')
) AS subcats(subcat_name)
WHERE EXISTS (SELECT 1 FROM categories WHERE slug = 'display')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 4. Categorii pentru REPARAȚII
-- ============================================
-- Aceste categorii pot fi folosite pentru organizarea serviciilor de reparații

INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Reparații Display', 'reparatii-display', 'Reparații și înlocuire display-uri', NULL),
  ('Reparații Placă Bază', 'reparatii-placa-baza', 'Reparații plăci de bază și componente electronice', NULL),
  ('Reparații Baterie', 'reparatii-baterie', 'Reparații și înlocuire baterii', NULL),
  ('Reparații Difuzor', 'reparatii-difuzor', 'Reparații difuzoare și componente audio', NULL),
  ('Reparații Încărcare', 'reparatii-incarcare', 'Reparații porturi de încărcare și componente de alimentare', NULL),
  ('Reparații Camere', 'reparatii-camere', 'Reparații camere foto și componente optice', NULL)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- ============================================
-- Verificare: Afișează toate categoriile create
-- ============================================
-- SELECT 
--   c.id,
--   c.name,
--   c.slug,
--   c.parent_id,
--   p.name as parent_name
-- FROM categories c
-- LEFT JOIN categories p ON c.parent_id = p.id
-- ORDER BY c.parent_id NULLS FIRST, c.name;
