-- Add multiple images support for products
-- Run in Supabase Dashboard → SQL Editor

ALTER TABLE products
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';

-- Optional: backfill from existing single image
UPDATE products
SET images = jsonb_build_array(image)
WHERE image IS NOT NULL
  AND (images IS NULL OR images = '[]'::jsonb);
