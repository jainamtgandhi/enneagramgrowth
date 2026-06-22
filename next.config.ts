import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/enneagram/types/:path*", destination: "/types/:path*", permanent: true },
      { source: "/enneagram/relationships/:path*", destination: "/relationships/:path*", permanent: true },
      { source: "/enneagram/compare", destination: "/relationships/compare", permanent: true },
      { source: "/enneagram/workplace", destination: "/workplace", permanent: true },
      { source: "/enneagram/coping", destination: "/coping", permanent: true },
      { source: "/enneagram/growth-practices", destination: "/growth", permanent: true },
      { source: "/enneagram/what-is-it", destination: "/library/what-is-it", permanent: true },
      { source: "/enneagram/centers", destination: "/library/centers", permanent: true },
      { source: "/enneagram/wings", destination: "/library/wings", permanent: true },
      { source: "/enneagram/arrows", destination: "/library/arrows", permanent: true },
      { source: "/enneagram/instincts", destination: "/library/instincts", permanent: true },
      { source: "/enneagram/mistyping", destination: "/library/mistyping", permanent: true },
      { source: "/enneagram/glossary", destination: "/library/glossary", permanent: true },
      { source: "/enneagram/responsible-use", destination: "/library/responsible-use", permanent: true },
      { source: "/enneagram", destination: "/library", permanent: true },
    ];
  },
};

export default nextConfig;
