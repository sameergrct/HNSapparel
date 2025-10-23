/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 enables static HTML export for App Router

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['images.pexels.com'],
    unoptimized: true, // 👈 required for static export (Next Image won't break)
  },
};

module.exports = nextConfig;
