import { HeroCards } from "@/components/hero-cards";
import { Pill } from "@/components/pill";
import { hero, sites } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Quiet backdrop: dotted texture fading out, soft brand-blue light. */}
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_35%,black,transparent)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_85%_30%,rgba(29,91,240,0.12),transparent_70%),radial-gradient(35%_40%_at_5%_90%,rgba(122,162,255,0.14),transparent_70%)]"
      />
      <div className="mx-auto grid min-h-[100dvh] max-w-[1240px] items-center gap-14 px-5 pt-32 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-28">
        <div className="lg:col-span-7">
          <p className="chip animate-rise">
            <span className="size-1.5 rounded-full bg-blue" aria-hidden />
            {hero.eyebrow}
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.4rem,4.6vw,4.1rem)] leading-[1.04] font-semibold tracking-[-0.04em]">
            {hero.lines.map((line, i) => (
              <span
                key={line}
                className={`animate-rise block ${i === hero.lines.length - 1 ? "text-accent pb-[0.08em]" : ""}`}
                style={{ animationDelay: `${80 + i * 90}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>
          <p
            className="animate-rise mt-7 max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-muted"
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
          <dl className="animate-rise mt-12 grid max-w-lg grid-cols-2 gap-4" style={{ animationDelay: "540ms" }}>
            {[
              ["Markets", "India · Qatar · China"],
              ["Verticals", "Media · Tourism · Trading"],
            ].map(([k, v]) => (
              <div key={k} className="border-l-2 border-blue/30 pl-4">
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
