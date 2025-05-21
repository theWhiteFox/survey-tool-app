import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://your-external-site.com/:path*'
            }
        ]
    }
}

export default nextConfig;

