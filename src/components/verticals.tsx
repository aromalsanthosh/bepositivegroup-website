import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { SectionHeading } from "@/components/section-heading";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { verticals } from "@/content/site";

// Asymmetric bento: the active vertical (Media) is the hero tile, the two
// upcoming verticals stack beside it. Each card opens its subdomain.
export function Verticals() {
  const [media, ...next] = verticals;

  return (
    <section id="verticals" className="relative isolate py-24 sm:py-32">
      {/* Full-bleed white band to separate it from the sections around it. */}
      <div aria-hidden className="absolute inset-0 -z-10 border-y border-line bg-surface" />
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Business verticals"
            title="Three verticals."
            accent="One group."
            intro="Media is our first fully active vertical. Tourism and Trading are being built as the next chapters of the group."
          />
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <a href={media.href} className="group relative flex h-full min-h-[480px] flex-col justify-end overflow-hidden rounded-[32px] bg-navy text-white">
              <ParallaxImage
                src={media.feature?.image ?? media.image}
                alt={media.feature?.alt ?? media.alt}
                amount={6}
                sizes="(min-width: 1024px) 700px, 100vw"
                imageClassName="object-[50%_68%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
              <span className="chip absolute top-5 left-5">
                <span className="dot-live" aria-hidden />
                {media.status}
              </span>
              <div className="relative flex flex-wrap items-end justify-between gap-6 p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-semibold tracking-[-0.03em]">
                    {media.name}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium text-blue-bright">{media.tagline}</p>
                  <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-white/75">{media.description}</p>
                </div>
                <span className="btn-light inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold">
                  Visit BPG Media
                  <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </Reveal>

          {next.map((v, i) => (
            <Reveal key={v.name} delay={0.08 * (i + 1)} className="lg:col-span-5">
              <a href={v.href} className="card group flex h-full flex-col gap-5 overflow-hidden rounded-[28px] p-2.5 sm:flex-row lg:flex-col xl:flex-row">
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-[20px] bg-navy sm:aspect-auto sm:w-[44%] lg:aspect-[16/9] lg:w-auto xl:aspect-auto xl:w-[44%]">
                  <ParallaxImage
                    src={v.image}
                    alt={v.alt}
                    amount={5}
                    sizes="(min-width: 1280px) 220px, (min-width: 1024px) 460px, (min-width: 640px) 280px, 100vw"
                    imageClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="relative flex flex-1 flex-col justify-center p-3 pr-4">
                  <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-bg text-muted transition duration-300 group-hover:rotate-45 group-hover:bg-navy group-hover:text-white">
                    <ArrowUpRight size={16} weight="bold" aria-hidden />
                  </span>
                  <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted">
                    <span className="size-1.5 rounded-full bg-silver" aria-hidden />
                    {v.status}
                  </p>
                  <h3 className="mt-1.5 font-display text-[28px] font-semibold tracking-[-0.025em]">{v.name}</h3>
                  <p className="text-[15px] font-medium text-blue">{v.tagline}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.description}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
