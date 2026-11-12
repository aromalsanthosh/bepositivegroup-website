import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/ssr";
import { brand, leadership } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

// Founder portrait and message, on the navy brand panel.
export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-12 sm:py-16">
      <Reveal>
        <div className="panel-navy relative grid items-center gap-8 overflow-hidden rounded-[36px] p-6 sm:p-10 md:grid-cols-[auto_minmax(0,1fr)] lg:gap-14 lg:p-14">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_80%_50%,black,transparent_70%)]" />
          <div className="relative justify-self-center">
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[32px] bg-blue/60 sm:rounded-[40px]" />
            <Image
              src="/images/v2/leadership/solly-melpadom.webp"
              alt={`${leadership.name}, ${leadership.role}`}
              width={960}
              height={960}
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 240px"
              className="relative size-60 rounded-[32px] object-cover shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)] sm:size-72 sm:rounded-[40px] lg:size-80"
            />
          </div>

          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-blue-bright">
              <span className="size-1.5 rounded-full bg-blue-bright" aria-hidden />
              Leadership
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1] font-semibold tracking-[-0.04em]">
              {leadership.name}
            </h2>
            <p className="mt-2.5 text-[16px] font-medium text-white/65">{leadership.role}</p>
            <p className="mt-6 max-w-[58ch] border-t border-white/15 pt-6 text-[17px] leading-[1.65] text-white/80">
              {leadership.statement}
            </p>
            <p className="mt-6 flex items-center gap-3 text-[clamp(1.15rem,1.8vw,1.5rem)] font-semibold tracking-[-0.02em]">
              <Quotes size={22} weight="fill" className="shrink-0 text-blue-bright" aria-hidden />
              <span>{brand.tagline}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
