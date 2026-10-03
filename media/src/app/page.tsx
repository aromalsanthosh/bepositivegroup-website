import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Collage } from "@/components/collage";
import { LiveSection } from "@/components/live-section";
import { Races } from "@/components/races";
import { Gallery } from "@/components/gallery";
import { Advertise } from "@/components/advertise";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";

// Re-render hourly so race status and the YouTube feed stay current.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Collage />
        <LiveSection />
        <Races />
        <Gallery />
        <Advertise />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
