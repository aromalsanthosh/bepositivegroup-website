import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/ssr";
import { brand, leadership } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

// Founder portrait and message.
export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-12 sm:py-16">
      <Reveal>
        <div className="lg grid items-center gap-8 overflow-hidden rounded-[36px] p-6 sm:p-10 md:grid-cols-[auto_minmax(0,1fr)] lg:gap-14 lg:p-14">
          <div className="relative justify-self-center">
            <div aria-hidden className="absolute -inset-6 rounded-full bg-blue/30 blur-[60px]" />
            <Image
              src="/images/v2/leadership/solly-melpadom.webp"
              alt={`${leadership.name}, ${leadership.role}`}
              width={960}
              height={960}
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 240px"
              className="relative size-60 rounded-[32px] object-cover shadow-[0_30px_80px_-20px_rgba(29,91,240,0.6),inset_0_0_0_1px_rgba(255,255,255,0.12)] sm:size-72 sm:rounded-[40px] lg:size-80"
            />
          </div>

          <div>
            <p className="text-[14px] font-semibold tracking-[0.06em] text-blue-bright uppercase">Leadership</p>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1] font-semibold tracking-[-0.04em]">
              {leadership.name}
            </h2>
            <p className="mt-2.5 text-[16px] font-medium text-silver">{leadership.role}</p>
            <p className="mt-6 max-w-[58ch] border-t border-line pt-6 text-[17px] leading-[1.65] text-text/70">
              {leadership.statement}
            </p>
            <p className="mt-6 flex items-center gap-3 text-[clamp(1.15rem,1.8vw,1.5rem)] font-semibold tracking-[-0.02em]">
              <Quotes size={22} weight="fill" className="shrink-0 text-blue-bright" aria-hidden />
              <span className="text-sheen">{brand.tagline}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
