import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Verticals } from "@/components/verticals";
import { Companies } from "@/components/companies";
import { ClientLogos } from "@/components/client-logos";
import { Leadership } from "@/components/leadership";
import { News } from "@/components/news";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { jsonLd } from "@/lib/seo";

// Section order per "Be Positive Group Website - Changes" (Oct 2026).
// Awards & Events (components/awards-events.tsx) stays hidden until there are
// confirmed events or awards to show.
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted object; escape "<" so it can never close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ScrollProgress />
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Verticals />
        <Companies />
        <ClientLogos />
        <Leadership />
        <News />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
