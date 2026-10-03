import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory confuses root detection.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
