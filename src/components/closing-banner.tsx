import { ParallaxImage } from "@/components/motion/parallax-image";
import { MaskHeading } from "@/components/motion/mask-heading";
import { Pill } from "@/components/pill";
import { cta } from "@/content/site";

export function ClosingBanner() {
  return (
    <section className="px-3 pb-16 sm:px-5 sm:pb-24">
      <div className="relative isolate mx-auto max-w-[1340px] overflow-hidden rounded-[40px]">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage src="/images/v2/bg/contact.webp" alt="" amount={10} sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,10,0.9),rgba(2,4,10,0.55)_60%,rgba(2,4,10,0.35))]" />
        </div>
        <div className="flex flex-col items-start gap-8 px-6 py-24 sm:px-14 sm:py-28">
          <MaskHeading className="max-w-[14ch] font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
            Have an idea? <span className="text-sheen">Let&apos;s make it happen.</span>
          </MaskHeading>
          <Pill href={cta.href} arrow>
            {cta.label}
          </Pill>
        </div>
      </div>
    </section>
  );
}
