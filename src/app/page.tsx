import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Hero } from "@/components/hero";
import { ClientLogos } from "@/components/client-logos";
import { Intro } from "@/components/intro";
import { Verticals } from "@/components/verticals";
import { Presence } from "@/components/presence";
import { MediaHighlight } from "@/components/media-highlight";
import { Capabilities } from "@/components/capabilities";
import { Ecosystem } from "@/components/ecosystem";
import { Why } from "@/components/why";
import { About } from "@/components/about";
import { Leadership } from "@/components/leadership";
import { Network } from "@/components/network";
import { News } from "@/components/news";
import { AwardsEvents } from "@/components/awards-events";
import { Contact } from "@/components/contact";
import { ClosingBanner } from "@/components/closing-banner";
import { SiteFooter } from "@/components/site-footer";
import { jsonLd } from "@/lib/seo";

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
        <ClientLogos />
        <Intro />
        <Verticals />
        <Presence />
        <MediaHighlight />
        <Capabilities />
        <Ecosystem />
        <Why />
        <About />
        <Leadership />
        <Network />
        <News />
        <AwardsEvents />
        <Contact />
        <ClosingBanner />
      </main>
      <SiteFooter />
    </>
  );
}
