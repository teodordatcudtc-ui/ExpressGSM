import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dbPath = path.join(process.cwd(), 'data', 'shop.db')
const dbDir = path.dirname(dbPath)

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize database tables
export function initDatabase() {
  // Categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      price REAL NOT NULL,
      image TEXT,
      category_id INTEGER NOT NULL,
      stock INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `)

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT NOT NULL UNIQUE,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_address TEXT NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `)

  // Insert default categories if they don't exist
  const categoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number }
  if (categoryCount.count === 0) {
    const insertCategory = db.prepare(`
      INSERT INTO categories (name, slug, description) 
      VALUES (?, ?, ?)
    `)
    
    const defaultCategories = [
      ['Ecrane', 'ecrane', 'Ecrane originale și compatibile pentru toate modelele'],
      ['Baterii', 'baterii', 'Baterii noi și performante'],
      ['Accesorii', 'accesorii', 'Huse, încărcătoare, căști și multe altele'],
    ]
    
    const insertMany = db.transaction((categories) => {
      for (const category of categories) {
        insertCategory.run(category[0], category[1], category[2])
      }
    })
    
    insertMany(defaultCategories)
  }

  // Remove Reparații category if it exists (it's a service, not a product)
  const reparatiiCategory = db.prepare('SELECT id FROM categories WHERE slug = ?').get('reparatii') as { id: number } | undefined
  if (reparatiiCategory) {
    // Delete products in this category first
    db.prepare('DELETE FROM products WHERE category_id = ?').run(reparatiiCategory.id)
    // Then delete the category
    db.prepare('DELETE FROM categories WHERE id = ?').run(reparatiiCategory.id)
  }
}

// Initialize on import
initDatabase()

export default db

