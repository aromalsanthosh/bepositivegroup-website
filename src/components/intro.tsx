import { ScrollText } from "@/components/motion/scroll-text";
import { Reveal } from "@/components/motion/reveal";
import { intro } from "@/content/site";

export function Intro() {
  return (
    <section id="intro" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <p className="text-[15px] font-semibold text-blue-bright lg:col-span-3">More than a business</p>
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
              <blockquote className="lg rounded-[28px] p-7">
                <p className="text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-semibold tracking-[-0.02em]">
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
