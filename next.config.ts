import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://interview.staging.derilinx.com/:path*',
      },
    ]
  },
}

export default nextConfig;

