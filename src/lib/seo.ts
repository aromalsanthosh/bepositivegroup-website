import { brand, leadership, sites } from "@/content/site";

// Canonical origin. Set NEXT_PUBLIC_SITE_URL once the custom domain is live;
// until then Vercel's production URL keeps share previews working.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://www.bepositivegroup.com");

export const seo = {
  title: "Be Positive Group | Media, Tourism & Trading in India, Qatar & China",
  description:
    "Be Positive Group is a customer-centric business group delivering advertising, branding, digital, events, live broadcast, tourism and trading solutions across India, Qatar and China since 2010.",
  keywords: [
    "Be Positive Group",
    "BPG",
    "Be Positive Group Media",
    "BPG Media",
    "Be Positive Group Tourism",
    "Be Positive Group Trading",
    "multi-vertical business group",
    "advertising agency Kerala",
    "advertising agency Qatar",
    "branding agency Doha",
    "brand strategy and identity",
    "digital marketing agency Kerala",
    "social media marketing Qatar",
    "website development Kerala",
    "video production Kerala",
    "corporate film production",
    "event management Qatar",
    "BTL activation and events",
    "live streaming Kerala",
    "boat race live streaming",
    "Champions Boat League live",
    "Vallamkali live coverage",
    "multi-camera live production",
    "printing and signage Qatar",
    "exhibition stands and fabrication",
    "Kerala tourism and hospitality",
    "international sourcing China",
    "trading and procurement India Qatar China",
    "Solly Melpadom",
  ],
};

// schema.org graph: the organisation, its founder and the website.
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: brand.name,
      alternateName: ["BPG", "Be Positive Group Media"],
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icons/icon-512.png`, width: 512, height: 512 },
      image: `${siteUrl}/opengraph-image.jpg`,
      slogan: brand.tagline,
      description: seo.description,
      foundingDate: String(brand.since),
      founder: {
        "@type": "Person",
        name: leadership.name,
        jobTitle: "Founder",
        image: `${siteUrl}/images/v2/leadership/solly-melpadom.webp`,
      },
      subOrganization: [
        { "@type": "Organization", name: "Be Positive Group Media", url: sites.media },
        { "@type": "Organization", name: "Be Positive Group Tourism", url: sites.tourism },
        { "@type": "Organization", name: "Be Positive Group Trading", url: sites.trading },
      ],
      email: brand.email,
      areaServed: ["India", "Qatar", "China"].map((name) => ({ "@type": "Country", name })),
      knowsAbout: ["Advertising", "Branding", "Digital marketing", "Content production", "Live broadcasting", "Events", "Printing and signage", "Tourism", "International trading"],
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: brand.email },
      sameAs: [brand.mediaChannel],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: brand.name,
      description: seo.description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};
