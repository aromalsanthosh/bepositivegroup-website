import type { MetadataRoute } from "next";
import { brand } from "@/content/site";
import { seo } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: "BPG",
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7fa",
    theme_color: "#07296c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
