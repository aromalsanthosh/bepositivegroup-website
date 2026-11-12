import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { brand } from "@/content/site";
import { seo, siteUrl } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["400", "500", "600", "700"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${brand.name}` },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: brand.name,
  authors: [{ name: brand.name, url: siteUrl }],
  creator: brand.name,
  publisher: brand.name,
  category: "business",
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand.name,
    title: seo.title,
    description: seo.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Add the token from Google Search Console as GOOGLE_SITE_VERIFICATION.
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  themeColor: "#f6f7fa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
