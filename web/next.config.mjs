/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true, // Disabled optimization for local development
  },
};

export default nextConfig;
