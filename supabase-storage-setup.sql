-- ============================================
-- Supabase Storage Setup pentru Imagini
-- Rulează acest SQL în Supabase Dashboard → SQL Editor
-- ============================================

-- Creează bucket-ul pentru produse (dacă nu există deja)
-- NOTĂ: Bucket-ul trebuie creat manual în Supabase Dashboard → Storage
-- 
-- Pași manuali:
-- 1. Mergi la Storage în Supabase Dashboard
-- 2. Click pe "New bucket"
-- 3. Nume: "products"
-- 4. Public bucket: DA (bifează)
-- 5. Click "Create bucket"
--
-- După ce ai creat bucket-ul, rulează următoarele policy-uri:

-- Policy pentru a permite citire publică
CREATE POLICY "Products images are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Policy pentru a permite upload (inserare)
CREATE POLICY "Anyone can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products');

-- Policy pentru a permite ștergere
CREATE POLICY "Anyone can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'products');

-- ============================================
-- DONE! Storage este configurat.
-- ============================================

