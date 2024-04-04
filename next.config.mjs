/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hmkrejoaprtoeniopyap.supabase.co',
      },
    ],
  },
}

export default nextConfig
