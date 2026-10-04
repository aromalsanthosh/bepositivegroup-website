import { HeroCards } from "@/components/hero-cards";
import { Pill } from "@/components/pill";
import { DotField } from "@/components/motion/dot-field";
import { hero, sites } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <DotField className="[mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="mx-auto grid min-h-[100dvh] max-w-[1240px] items-center gap-12 px-5 pt-32 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-28">
        <div className="lg:col-span-7">
          <p className="lg-thin animate-rise inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold text-text/90">
            <span className="size-1.5 rounded-full bg-blue-bright" aria-hidden />
            {hero.eyebrow}
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.2rem,3.9vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.04em]">
            {hero.lines.map((line, i) => (
              <span
                key={line}
                className={`animate-rise block ${i === hero.lines.length - 1 ? "text-sheen pb-[0.08em]" : ""}`}
                style={{ animationDelay: `${80 + i * 90}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>
          <p
            className="animate-rise mt-7 max-w-[44ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-muted"
            style={{ animationDelay: "380ms" }}
          >
            {hero.subtext}
          </p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "460ms" }}>
            <Pill href="#verticals" arrow>
              Explore our group
            </Pill>
            <Pill href={sites.media} variant="secondary">
              Explore Media
            </Pill>
          </div>
          <dl className="animate-rise mt-12 flex flex-wrap gap-x-10 gap-y-4" style={{ animationDelay: "540ms" }}>
            {[
              ["Markets", "India · Qatar · China"],
              ["Verticals", "Media · Tourism · Trading"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[13px] text-muted">{k}</dt>
                <dd className="mt-1 text-[15px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-5">
          <HeroCards />
        </div>
      </div>
    </section>
  );
}
