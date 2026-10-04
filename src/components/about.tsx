import { about, brand } from "@/content/site";
import { BrandEmblem } from "@/components/brand-emblem";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

// Short "about the group": who we are, since 2010, vision and mission. The 3D
// crest stays outside Reveal: transformed wrappers break its screen blend.
export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 flex flex-col items-center lg:order-1 lg:col-span-5">
          <BrandEmblem className="w-[min(72vw,340px)] lg:w-full lg:max-w-[440px]" />
          <p className="mt-2 text-center">
            <span className="block text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">Established</span>
            <span className="text-sheen font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-none font-semibold tracking-[-0.04em]">
              {brand.since}
            </span>
          </p>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionHeading label="About the group" title="Who we are." />
          <Reveal>
            <div className="mt-7 max-w-[60ch] space-y-4 text-[17px] leading-relaxed text-muted">
              {about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              ["Our vision", about.vision],
              ["Our mission", about.mission],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={0.06 * (i + 1)} className="h-full">
                <div className="lg h-full rounded-[26px] p-6">
                  <h3 className="text-[15px] font-semibold text-blue-bright">{k}</h3>
                  <p className="mt-2.5 text-[16px] leading-relaxed font-medium tracking-[-0.005em]">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
