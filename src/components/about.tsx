import { stats } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/motion/count-up";
import { ScrollText } from "@/components/motion/scroll-text";
import { DotField } from "@/components/motion/dot-field";

export function About() {
  return (
    <section
      id="about"
      className="relative isolate mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-32"
    >
      <DotField className="[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      <div className="grid gap-10 lg:grid-cols-12">
        <h2 className="text-[15px] text-muted lg:col-span-3">About the group</h2>
        <div className="lg:col-span-9">
          <ScrollText
            text="Four companies working from Doha's Industrial Area, covering printing, advertising, branding and interior fit-out."
            className="font-display max-w-[30ch] text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.15] text-balance"
          />
          <Reveal>
            <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-muted">
              Keeping production in-house gives clients one partner, one timeline and one
              standard of finish, from the first artwork file to the final installation on
              site.
            </p>
          </Reveal>
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 lg:mt-24 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <dt className="text-[15px] text-muted">{stat.label}</dt>
            <dd className="mt-2 font-mono text-[clamp(2.25rem,4vw,3.5rem)] leading-none tracking-tight">
              {stat.count === false ? stat.value : <CountUp value={stat.value} />}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
