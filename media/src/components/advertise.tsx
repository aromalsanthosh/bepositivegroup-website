import { EnvelopeSimple } from "@phosphor-icons/react/ssr";
import { adFormats, advertisingEmail, reach } from "@/content/media";
import { Pill } from "@/components/pill";
import { Reveal } from "@/components/motion/reveal";
import { DotField } from "@/components/motion/dot-field";

export function Advertise() {
  const mailto = `mailto:${advertisingEmail}?subject=${encodeURIComponent("Advertising on BPG Media live streams")}`;

  return (
    <section id="advertise" className="relative isolate overflow-hidden py-20 sm:py-28">
      <DotField className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_100%,rgba(7,41,108,0.5),transparent_75%)]"
      />
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="text-center">
          <p className="text-[17px] font-semibold">Advertise</p>
          <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Put your brand in every race.
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[17px] leading-snug font-semibold text-muted">
            Reach thousands of boat race fans across Kerala and the diaspora, live and on replay.
          </p>
        </div>

        {/* Stat cards, cindori "Performance" style. */}
        <ul className="mx-auto mt-14 grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2">
          {reach.map((r, i) => (
            <li key={r.label}>
              <Reveal delay={(i % 2) * 0.06} className="h-full">
                <div className="card flex h-full flex-col items-center justify-center rounded-[18px] px-6 py-10 text-center">
                  <span className="bg-gradient-to-b from-white to-[#9fb8ff] bg-clip-text font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-semibold tracking-[-0.03em] text-transparent">
                    {r.value}
                  </span>
                  <span className="mt-3 max-w-[26ch] text-[15px] leading-snug font-semibold text-muted">{r.label}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mx-auto mt-4 max-w-[900px]">
          <div className="card flex flex-col gap-8 rounded-[18px] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em]">Ways to advertise</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {adFormats.map((f) => (
                  <li key={f} className="glass rounded-full px-4 py-2 text-[14px] font-semibold text-text/90">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Pill href={mailto} className="shrink-0">
              <EnvelopeSimple size={18} aria-hidden />
              Advertise with us
            </Pill>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
