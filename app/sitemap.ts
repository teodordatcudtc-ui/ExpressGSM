import { MetadataRoute } from 'next'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface ProductSitemap {
  slug: string
  updated_at: string | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ecranul.ro'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/despre-noi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servicii`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politica-cookie`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termeni-conditii`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = []
  
  try {
    if (isSupabaseConfigured()) {
      const { data: products, error } = await supabase
        .from('products')
        .select('slug, updated_at')
        .eq('active', 1)
        .order('updated_at', { ascending: false })

      if (!error && products) {
        productPages = (products as ProductSitemap[]).map((product) => ({
          url: `${baseUrl}/shop/${product.slug}`,
          lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    // Continue without product pages if there's an error
  }

  return [...staticPages, ...productPages]
}
