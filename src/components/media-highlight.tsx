import { Broadcast, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { MaskHeading } from "@/components/motion/mask-heading";
import { Reveal } from "@/components/motion/reveal";
import { brand, media } from "@/content/site";

export function MediaHighlight() {
  return (
    <section id="media" className="px-3 py-16 sm:px-5 sm:py-24">
      <div className="relative isolate mx-auto max-w-[1340px] overflow-hidden rounded-[40px]">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage src="/images/v2/bg/media-projector.webp" alt="" amount={10} sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,10,0.55),rgba(2,4,10,0.85)_70%,rgba(2,4,10,0.95))]" />
        </div>

        <div className="px-6 py-24 sm:px-14 sm:py-32">
          <p className="text-[15px] font-semibold text-blue-bright">Be Positive Group Media</p>
          <MaskHeading className="mt-4 font-display text-[clamp(3.2rem,10vw,9rem)] leading-[0.92] font-semibold tracking-[-0.05em]">
            Ideas <span className="text-outline">into impact.</span>
          </MaskHeading>
          <Reveal>
            <p className="mt-8 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-silver">{media.body}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {media.disciplines.map((d) => (
                <li key={d} className="lg-thin rounded-full px-4 py-2 text-[14px] font-semibold text-text/90">
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={`${brand.mediaChannel}/streams`}
              target="_blank"
              rel="noreferrer"
              className="lg group mt-12 flex max-w-[560px] items-center gap-5 rounded-[26px] p-5"
            >
              <span className="btn-glass-blue inline-flex size-14 shrink-0 items-center justify-center rounded-2xl">
                <Broadcast size={26} aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block text-[17px] font-semibold">Watch BPG Media live</span>
                <span className="mt-0.5 block text-[14px] leading-snug text-muted">{media.live}</span>
              </span>
              <ArrowUpRight size={20} aria-hidden className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">(opens YouTube in a new tab)</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
