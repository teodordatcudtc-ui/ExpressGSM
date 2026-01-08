/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Supabase is used as the database, no webpack externals needed
}

module.exports = nextConfig

