import { NextResponse } from 'next/server'

// This endpoint is no longer needed - database is initialized via SQL in Supabase
export async function POST() {
  return NextResponse.json({ 
    message: 'Database initialization is done via SQL in Supabase Dashboard. See SETUP.md for instructions.',
    note: 'Run supabase-schema.sql in Supabase SQL Editor'
  })
}
