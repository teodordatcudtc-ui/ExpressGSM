-- ============================================
-- Adaugă coloana discount în tabelul products
-- Rulează acest SQL în Supabase Dashboard → SQL Editor
-- ============================================

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS discount DECIMAL(5, 2) DEFAULT 0;

-- Discount este un procent (0-100)
-- Exemplu: 15.5 = 15.5% reducere
