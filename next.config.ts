import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Images: allow Next.js <Image> to serve /public/uploads/* without
  //    optimization pipeline errors (user-uploaded files, not remote URLs)
  images: {
    unoptimized: true,
  },

  // ── Upload body-size limits for Server Actions ────────────────────────────
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },

  // ── Static cache headers for uploaded files ───────────────────────────────
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
