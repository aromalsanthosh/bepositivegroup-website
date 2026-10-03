import type { Metadata, Viewport } from "next";
import { Audiowide } from "next/font/google";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import "./globals.css";

// Closest Google Font to the BPG logo wordmark (wide, rounded, techno).
const audiowide = Audiowide({ variable: "--font-audiowide", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "BPG Media | Kerala Boat Race Live Streaming",
  description:
    "Watch Champions Boat League races and Kerala's biggest water festivals streamed live by BPG Media, part of Be Positive Group. Free on YouTube.",
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
