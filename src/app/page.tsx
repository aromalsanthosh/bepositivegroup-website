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
import { Contact } from "@/components/contact";
import { ClosingBanner } from "@/components/closing-banner";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
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
        <Contact />
        <ClosingBanner />
      </main>
      <SiteFooter />
    </>
  );
}
