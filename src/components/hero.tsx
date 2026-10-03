import { Button } from "@/components/button";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { DotField } from "@/components/motion/dot-field";
import { quoteCta } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate mx-auto max-w-[1400px] px-5 pt-10 pb-16 lg:px-10 lg:pt-14 lg:pb-24">
      <DotField className="[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      <h1 className="font-display animate-rise max-w-[16ch] text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.02] text-balance">
        Printed, built and fitted out in Doha.
      </h1>

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
        <div
          className="animate-rise flex flex-col gap-8 lg:col-span-4"
          style={{ animationDelay: "120ms" }}
        >
          <p className="max-w-[40ch] text-lg leading-relaxed text-muted">
            Be Positive Group brings four specialist companies under one roof: commercial
            printing, signage, exhibition stands and interior fit-out, since 2010.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={quoteCta.href}>{quoteCta.label}</Button>
            <Button href="#companies" variant="secondary">
              Our companies
            </Button>
          </div>
        </div>

        <div
          className="animate-settle relative aspect-[4/3] overflow-hidden rounded bg-surface lg:col-span-8 lg:aspect-[16/9]"
          style={{ animationDelay: "200ms" }}
        >
          <ParallaxImage
            src="/images/work/showroom-signage.jpg"
            alt="Car showroom interior with illuminated wall signage and timber ceiling"
            preload
            amount={6}
            sizes="(min-width: 1400px) 880px, (min-width: 1024px) 64vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
