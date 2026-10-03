import { ArrowRight } from "@phosphor-icons/react/ssr";
import { SectionHeading } from "@/components/section-heading";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { verticals } from "@/content/site";

// Asymmetric bento: the active vertical (Media) is the hero tile, the two
// upcoming verticals stack beside it.
export function Verticals() {
  const [media, ...next] = verticals;

  return (
    <section id="verticals" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading
        title="Three verticals."
        accent="One group."
        intro="Media is our first fully active vertical. Tourism and Trading are being built as the next chapters of the group."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
        <Reveal className="lg:col-span-7 lg:row-span-2">
          <a href="#media" className="lg group flex h-full flex-col overflow-hidden rounded-[32px] p-3">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[24px] lg:aspect-auto lg:flex-1">
              <ParallaxImage
                src={media.image}
                alt={media.alt}
                amount={6}
                sizes="(min-width: 1024px) 700px, 100vw"
                imageClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6 p-5 sm:p-7">
              <div>
                <p className="inline-flex items-center gap-2 text-[14px] font-semibold text-blue-bright">
                  <span className="size-1.5 rounded-full bg-blue-bright" aria-hidden />
                  {media.status}
                </p>
                <h3 className="mt-2 font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-semibold tracking-[-0.03em]">
                  {media.name}
                </h3>
                <p className="mt-1 text-[15px] text-silver">{media.tagline}</p>
                <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-muted">{media.description}</p>
              </div>
              <span className="btn-glass-blue inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold">
                Explore Media
                <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        </Reveal>

        {next.map((v, i) => (
          <Reveal key={v.name} delay={0.08 * (i + 1)} className="lg:col-span-5">
            <article className="lg flex h-full flex-col gap-5 overflow-hidden rounded-[32px] p-3 sm:flex-row lg:flex-col xl:flex-row">
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-[24px] sm:aspect-auto sm:w-[44%] lg:aspect-[16/9] lg:w-auto xl:aspect-auto xl:w-[44%]">
                <ParallaxImage
                  src={v.image}
                  alt={v.alt}
                  amount={5}
                  sizes="(min-width: 1280px) 220px, (min-width: 1024px) 460px, (min-width: 640px) 280px, 100vw"
                  imageClassName="saturate-[0.75]"
                />
              </div>
              <div className="flex flex-col justify-center p-3 pr-4">
                <p className="text-[14px] font-semibold text-muted">{v.status}</p>
                <h3 className="mt-1 font-display text-[28px] font-semibold tracking-[-0.025em]">{v.name}</h3>
                <p className="text-[15px] text-silver">{v.tagline}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
