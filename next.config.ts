import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Images ──────────────────────────────────────────────────────────────────
  // Allow Next.js <Image> to load Vercel Blob URLs (uploaded player photos, etc.)
  images: {
    remotePatterns: [
      {
        // Vercel Blob public storage
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },

  // ── Body-size limit for multipart form uploads (Server Actions) ─────────────
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
