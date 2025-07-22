import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false, // Set to true if you want to bypass build errors (not recommended)
  },
};

export default nextConfig;
