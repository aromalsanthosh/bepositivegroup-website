import { about, brand } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading label="About us" title="Who we are." />
          <Reveal>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-muted">
              {about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-silver">{about.approach}</p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-6">
          <Reveal>
            <div className="lg flex items-end justify-between gap-6 rounded-[28px] p-7">
              <div>
                <p className="text-[14px] font-semibold text-muted">Established</p>
                <p className="text-sheen font-display text-[clamp(4rem,9vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
                  {brand.since}
                </p>
              </div>
              <p className="max-w-[20ch] pb-3 text-right text-[15px] leading-snug text-muted">The year Be Positive Group was established.</p>
            </div>
          </Reveal>
          {[
            ["Our vision", about.vision],
            ["Our mission", about.mission],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={0.06 * (i + 1)}>
              <div className="lg rounded-[28px] p-7">
                <h3 className="text-[15px] font-semibold text-blue-bright">{k}</h3>
                <p className="mt-3 text-[18px] leading-relaxed font-medium tracking-[-0.01em]">{v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Philosophy: five short values. */}
      <div className="mt-20">
        <Reveal>
          <h3 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-[-0.03em]">
            Customer-centric. <span className="text-sheen">Beyond borders.</span>
          </h3>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {about.values.map((v, i) => (
            <li key={v.title}>
              <Reveal delay={i * 0.05} className="h-full">
                <div className="lg-thin h-full rounded-[22px] p-6">
                  <p className="font-mono text-[13px] text-blue-bright tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-4 text-[18px] font-semibold tracking-[-0.01em]">{v.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{v.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
