// Supabase Client - Simple and Direct
import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'https://placeholder.supabase.co' && 
    supabaseAnonKey !== 'placeholder-key' &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20)
}

// Only create client if properly configured
let supabaseClient: ReturnType<typeof createClient> | null = null

if (isSupabaseConfigured()) {
  supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!)
} else {
  // Create a mock client that throws helpful errors
  console.warn(
    '⚠️  Supabase not configured!\n' +
    'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  )
  
  // Create a client that will fail gracefully
  supabaseClient = createClient(
    'https://placeholder.supabase.co',
    'placeholder-key',
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  )
}

export const supabase = supabaseClient

export default supabase

