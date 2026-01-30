-- ============================================
-- Metodă livrare la comenzi
-- Rulează în Supabase Dashboard → SQL Editor
-- ============================================

-- Valori: 'curier_rapid' (Livrare la adresă, 28 lei) sau 'ridicare_personala' (Ridicare din depozit)
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'curier_rapid';

-- Metodă plată: 'ramburs' (La ramburs) sau 'card_online' (Plată cu cardul online)
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'ramburs';
