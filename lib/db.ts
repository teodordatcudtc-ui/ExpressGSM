// Database Helper - Simple Supabase wrapper
import { supabase } from './supabase'

export const db = {
  // Get all rows from a table (range explicit ca să nu se aplice limita implicită PostgREST ~25)
  async getAll(table: string, orderBy?: string) {
    let query = supabase.from(table).select('*').range(0, 9999)
    if (orderBy) {
      const [column, direction] = orderBy.split(' ')
      query = query.order(column, { ascending: direction?.toLowerCase() !== 'desc' })
    }
    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  // Get one row by ID
  async getById(table: string, id: number) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  // Get rows with filter (range explicit pentru a returna toate rândurile)
  async getWhere(table: string, filters: Record<string, any>, orderBy?: string) {
    let query = supabase.from(table).select('*').range(0, 9999)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    if (orderBy) {
      const [column, direction] = orderBy.split(' ')
      query = query.order(column, { ascending: direction?.toLowerCase() !== 'desc' })
    }
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  // Insert one row
  async insert(table: string, data: Record<string, any>) {
    const { data: result, error } = await (supabase
      .from(table) as any)
      .insert(data)
      .select()
      .single()
    if (error) throw error
    return result
  },

  // Update rows
  async update(table: string, id: number, data: Record<string, any>) {
    const { data: result, error } = await (supabase
      .from(table) as any)
      .update(data)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return result
  },

  // Delete row
  async delete(table: string, id: number) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    if (error) throw error
    return { success: true }
  },

  // Count rows
  async count(table: string, filters?: Record<string, any>) {
    let query = supabase.from(table).select('*', { count: 'exact', head: true })
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    const { count, error } = await query
    if (error) throw error
    return count || 0
  },
}

export default db

