import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      // New races and streams are added through the season.
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/opengraph-image.jpg`],
    },
  ];
}
