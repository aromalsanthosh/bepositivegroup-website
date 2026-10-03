import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/ssr";
import { brand, leadership } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function Leadership() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 sm:py-16">
      <Reveal>
        <div className="lg grid items-center gap-10 overflow-hidden rounded-[36px] p-6 sm:p-10 md:grid-cols-[auto_1fr] lg:gap-16 lg:p-14">
          {/* CONFIRM: replace the crest with the founder's official portrait. */}
          <div className="relative mx-auto">
            <div aria-hidden className="absolute -inset-8 rounded-full bg-blue/30 blur-[60px]" />
            <Image
              src="/images/v2/brand/bpg-crest.webp"
              alt="Be Positive Group crest"
              width={480}
              height={480}
              className="relative size-44 rounded-[40px] shadow-[0_30px_80px_-20px_rgba(29,91,240,0.6),inset_0_0_0_1px_rgba(255,255,255,0.12)] sm:size-56"
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-blue-bright">Leadership</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
              {leadership.name}
            </h2>
            <p className="mt-1 text-[16px] text-silver">{leadership.role}</p>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-muted">{leadership.statement}</p>
            <p className="mt-8 flex items-start gap-3 text-[clamp(1.3rem,2.2vw,1.75rem)] leading-snug font-semibold tracking-[-0.02em]">
              <Quotes size={28} weight="fill" className="mt-1 shrink-0 text-blue-bright" aria-hidden />
              <span className="text-sheen">{brand.tagline}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
