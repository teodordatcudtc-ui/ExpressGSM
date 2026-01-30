-- ============================================
-- Tip reducere: procent SAU preț redus
-- Rulează în Supabase Dashboard → SQL Editor
-- ============================================

-- Tip: 'percent' = reducere în %, 'fixed' = preț redus direct
ALTER TABLE products
ADD COLUMN IF NOT EXISTS discount_type TEXT DEFAULT 'percent';

-- Prețul redus (folosit când discount_type = 'fixed')
ALTER TABLE products
ADD COLUMN IF NOT EXISTS price_reduced DECIMAL(10, 2);

-- Produsele existente rămân cu discount_type = 'percent' și discount ca procent
