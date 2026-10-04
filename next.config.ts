import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory confuses root detection.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // YouTube thumbnails for the latest-stream card.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  // tourism.* and trading.* serve their holding pages from this app.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: [{ type: "host", value: "tourism\\..*" }], destination: "/tourism" },
        { source: "/", has: [{ type: "host", value: "trading\\..*" }], destination: "/trading" },
      ],
    };
  },
};

export default nextConfig;
