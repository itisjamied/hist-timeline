import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
  },
  /* config options here */
   async rewrites() {
    return [
      {
        source: '/admin/:path*',      // url you’ll visit
        destination: '/studio/:path*' // actual Studio code
      }
    ]
  }
};

export default nextConfig;
