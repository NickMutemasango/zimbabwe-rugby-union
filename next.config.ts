import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Images ──────────────────────────────────────────────────────────────────
  // Allow Next.js <Image> to load Cloudinary URLs (uploaded player photos, etc.)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    // Also allow unoptimized local uploads during local dev (e.g. /uploads/*)
    unoptimized: false,
  },

  // ── Body-size limit for multipart form uploads (Server Actions) ─────────────
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
