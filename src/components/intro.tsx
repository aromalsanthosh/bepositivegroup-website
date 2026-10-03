import { Quotes } from "@phosphor-icons/react/ssr";
import { BrandEmblem } from "@/components/brand-emblem";
import { ScrollText } from "@/components/motion/scroll-text";
import { Reveal } from "@/components/motion/reveal";
import { intro } from "@/content/site";

export function Intro() {
  return (
    <section id="intro" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-3">
          <p className="text-[15px] font-semibold text-blue-bright">
            More than a business.
            <br />
            <span className="text-muted">A growing ecosystem.</span>
          </p>
          <BrandEmblem className="w-[min(72vw,300px)] self-center lg:-ml-6 lg:w-[calc(100%+3rem)] lg:max-w-none lg:self-start" />
        </div>
        <div className="lg:col-span-9">
          <ScrollText
            text={intro.statement}
            className="font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.03em]"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 md:items-end">
            <Reveal>
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted">{intro.body}</p>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Pull quote, not a card: a glass capsule here read as a button. */}
              <blockquote className="relative pl-6">
                <span aria-hidden className="absolute inset-y-1 left-0 w-[3px] rounded-full bg-gradient-to-b from-blue-bright to-blue-bright/10" />
                <Quotes size={28} weight="fill" className="text-blue-bright" aria-hidden />
                <p className="text-sheen mt-3 text-[clamp(1.4rem,2.2vw,1.85rem)] leading-snug font-semibold tracking-[-0.02em]">
                  {intro.principle}
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
