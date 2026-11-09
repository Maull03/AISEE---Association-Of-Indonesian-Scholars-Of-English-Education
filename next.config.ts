import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================================
  // Cloudflare Caching — Cache-Control Headers
  // ISR pages: s-maxage = revalidate window, stale-while-revalidate
  // Static pages: long-lived cache
  // Auth & dynamic pages: no-store
  // ============================================================
  async headers() {
    return [
      // ── Public static assets ─────────────────────────────
      {
        source: "/:path*.(ico|png|jpg|jpeg|svg|webp|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ── SSG pages (about, contact) ───────────────────────
      {
        source: "/about",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/contact",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },

      // ── ISR pages — revalidate=60 ─────────────────────────
      // Home, publications listing: 60s stale-while-revalidate=1y
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/publications",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/publications/:id",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/news",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/news/:slug",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=31536000",
          },
        ],
      },

      // ── Auth & private pages — no cache ──────────────────
      {
        source:
          "/(login|register|profile|membership|membership/:path*|admin|admin/:path*)",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, must-revalidate",
          },
        ],
      },

      // ── Security headers (all pages) ─────────────────────
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // ============================================================
  // Images — allow backend domain
  // ============================================================
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // ============================================================
  // Turbopack (already default in Next.js 16)
  // ============================================================
  experimental: {
    // Enable partial prerendering for better ISR granularity
    // ppr: true, // uncomment when stable
  },
};

export default nextConfig;
