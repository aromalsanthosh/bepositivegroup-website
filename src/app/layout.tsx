import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { GlassSpotlight } from "@/components/glass-spotlight";
import { Aurora } from "@/components/aurora";
import "./globals.css";

export const metadata: Metadata = {
  title: "Be Positive Group | Media, Tourism and Trading across India, Qatar and China",
  description:
    "Be Positive Group is a customer-centric, multi-vertical business group delivering Media, Tourism and Trading solutions across India, Qatar and China since 2010.",
};

export const viewport: Viewport = {
  themeColor: "#02040a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Aurora />
        <GlassSpotlight />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
