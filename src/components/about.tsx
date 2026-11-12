import { Eye, Target } from "@phosphor-icons/react/ssr";
import { about, brand } from "@/content/site";
import { BrandEmblem } from "@/components/brand-emblem";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

// Short "about the group": who we are, since 2010, vision and mission. The 3D
// crest sits on a navy panel (its screen blend needs a dark backdrop) and
// stays outside Reveal: transformed wrappers break the blend.
export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="panel-navy relative flex flex-col items-center overflow-hidden rounded-[32px] px-6 pt-8 pb-10">
            <BrandEmblem className="w-[min(70vw,320px)] lg:w-full lg:max-w-[380px]" />
            <p className="-mt-2 text-center">
              <span className="block text-[12px] font-semibold tracking-[0.12em] text-white/60 uppercase">Established</span>
              <span className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-none font-semibold tracking-[-0.04em]">
                {brand.since}
              </span>
            </p>
          </div>
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { k: "Our vision", v: about.vision, Icon: Eye },
              { k: "Our mission", v: about.mission, Icon: Target },
            ].map(({ k, v, Icon }, i) => (
              <Reveal key={k} delay={0.06 * (i + 1)} className="h-full">
                <div className="card card-hover h-full rounded-[24px] p-6">
                  <span className="grid size-11 place-items-center rounded-2xl bg-sky text-navy">
                    <Icon size={22} weight="duotone" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[15px] font-semibold text-blue">{k}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed font-medium tracking-[-0.005em]">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
