import { Play } from "@phosphor-icons/react/ssr";
import { HeroScreen } from "@/components/hero-screen";
import { Pill } from "@/components/pill";
import { DotField } from "@/components/motion/dot-field";
import { upcoming } from "@/content/media";
import { formatIst } from "@/lib/format";

export function Hero() {
  const next = upcoming[0];

  return (
    <section className="relative isolate overflow-hidden">
      {/* Navy-to-black backdrop drawn from the logo blue. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(29,91,240,0.28),transparent_70%),radial-gradient(60%_50%_at_50%_100%,rgba(7,41,108,0.55),transparent_75%)]"
      />
      <DotField className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)]" />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 pt-8 pb-16 text-center sm:pt-10">
        <div className="animate-rise w-full">
          <HeroScreen src="/images/gallery/bpg-race-07.webp" alt="PBC Pallathuruthy crew in perfect sync at the prow" />
        </div>

        <a
          href={`https://www.youtube.com/watch?v=${next.id}`}
          target="_blank"
          rel="noreferrer"
          className="glass animate-rise mt-8 inline-flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-[14px] transition-colors hover:bg-white/10"
          style={{ animationDelay: "120ms" }}
        >
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-white text-[#0b0d12]">
            <Play size={12} weight="fill" aria-hidden />
          </span>
          <span className="font-semibold text-blue-bright">{next.title}</span>
          <span className="text-muted">
            {formatIst(next.start, { weekday: "short", day: "numeric", month: "short" })}
          </span>
        </a>

        <h1
          className="animate-rise mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,5.4vw,4rem)] leading-[1.04] font-semibold tracking-[-0.03em]"
          style={{ animationDelay: "180ms" }}
        >
          Kerala&apos;s boat races, live.
        </h1>
        <p
          className="animate-rise mt-4 max-w-[40ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-snug font-semibold tracking-[-0.01em] text-muted"
          style={{ animationDelay: "240ms" }}
        >
          <span className="text-text">Champions Boat League</span> and Kerala&apos;s biggest water
          festivals, streamed live by BPG Media. Free on YouTube.
        </p>
        <div
          className="animate-rise mt-7 flex flex-wrap justify-center gap-3"
          style={{ animationDelay: "300ms" }}
        >
          <Pill href="#races" variant="white">
            Previous races
          </Pill>
          <Pill href="#live">Watch live</Pill>
        </div>
      </div>
    </section>
  );
}
