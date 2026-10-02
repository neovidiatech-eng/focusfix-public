import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Serve images from public folder without optimization restrictions */
  images: {
    unoptimized: true,
  },
  /* Trailing slash for cleaner URLs */
  trailingSlash: false,
};

export default nextConfig;
