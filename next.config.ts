import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true, // Enabling SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Additional security for SVGs
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }, experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

};

export default nextConfig;
