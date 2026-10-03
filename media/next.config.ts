import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory confuses root detection.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Race thumbnails pulled live from the channel's RSS feed.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
