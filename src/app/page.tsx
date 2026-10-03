import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ClientLogos } from "@/components/client-logos";
import { About } from "@/components/about";
import { Companies } from "@/components/companies";
import { Capabilities } from "@/components/capabilities";
import { Careers } from "@/components/careers";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ClientLogos />
        <About />
        <Companies />
        <Capabilities />
        <Careers />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
