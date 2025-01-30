import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_DOMAIN as string, // ✅ Using  remotePatterns instead of domains
      },
    ],
  },
};

export default nextConfig;
