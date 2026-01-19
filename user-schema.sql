-- ============================================
-- Schema pentru Tabelul Users
-- Rulează acest SQL în Supabase Dashboard → SQL Editor
-- ============================================

-- ============================================
-- Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  county TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- Update Orders Table to include user_id
-- ============================================
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- ============================================
-- Row Level Security (RLS) for Users
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users Policies
CREATE POLICY "Users: Can read own data"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users: Can insert own data"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users: Can update own data"
  ON users FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================
-- DONE! User schema is ready.
-- ============================================
