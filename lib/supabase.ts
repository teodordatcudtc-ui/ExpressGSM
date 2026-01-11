// Supabase Client - Simple and Direct
import { createClient } from '@supabase/supabase-js'

// Use fallback values for build time if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only throw error at runtime, not at build time
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn(
      'Warning: Missing Supabase environment variables!\n' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    )
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase

