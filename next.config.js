/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/politica-anulare', destination: '/politica-retur', permanent: true },
      { source: '/politica-livrare', destination: '/service-prin-curier', permanent: true },
    ]
  },
  images: {
    // Avoid Vercel Image Optimization quota limits by serving original image URLs.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Supabase is used as the database, no webpack externals needed
}

module.exports = nextConfig

