import type { Metadata, Viewport } from "next";
import { Audiowide } from "next/font/google";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import "./globals.css";

// Closest Google Font to the BPG logo wordmark (wide, rounded, techno).
const audiowide = Audiowide({ variable: "--font-audiowide", subsets: ["latin"], weight: "400" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://media.bepositivegroup.com";
const title = "BPG Media | Kerala Boat Race Live Streaming";
const description =
  "Watch Champions Boat League races and Kerala's biggest water festivals streamed live by BPG Media, part of Be Positive Group. Free on YouTube.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "BPG Media",
    "Be Positive Group Media",
    "Kerala boat race live",
    "Champions Boat League live",
    "CBL live streaming",
    "Vallamkali live",
    "Nehru Trophy boat race live",
    "Pamba boat race live",
    "snake boat race",
    "Kerala live streaming",
    "multi-camera live production Kerala",
  ],
  applicationName: "BPG Media",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "BPG Media",
    title,
    description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#030407",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={audiowide.variable}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
