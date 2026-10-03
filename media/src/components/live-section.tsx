import Image from "next/image";
import { CalendarBlank, Broadcast } from "@phosphor-icons/react/ssr";
import { channel, season, upcoming } from "@/content/media";
import { formatIst } from "@/lib/format";
import { Countdown } from "@/components/countdown";
import { LivePlayer } from "@/components/live-player";
import { Pill } from "@/components/pill";
import { Reveal } from "@/components/motion/reveal";
import { DotField } from "@/components/motion/dot-field";

export function LiveSection() {
  const next = upcoming[0];
  const watchUrl = `https://www.youtube.com/watch?v=${next.id}`;

  return (
    <section id="live" className="relative isolate mx-auto max-w-[1200px] px-5 py-20 sm:py-28">
      <DotField className="[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)]" />
      <div className="text-center">
        <p className="text-[17px] font-semibold">Live &amp; upcoming</p>
        <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Next on BPG Media.
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-[17px] leading-snug font-semibold text-muted">
          Every race is streamed live with commentary, then kept on the channel as a full replay.
        </p>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        {/* Featured upcoming stream with countdown. */}
        <Reveal className="lg:col-span-7 lg:row-span-2">
          <article className="card ring flex h-full flex-col overflow-hidden rounded-[18px]">
            <div className="relative aspect-video">
              <Image
                src={next.thumbnail}
                alt={`${next.title} poster`}
                fill
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
              <div>
                <p className="flex items-center gap-2 text-[15px] font-semibold text-blue-bright">
                  <CalendarBlank size={18} aria-hidden />
                  {formatIst(next.start, { weekday: "long", day: "numeric", month: "long" })}, stream opens{" "}
                  {formatIst(next.start, { hour: "numeric", minute: "2-digit" })} IST
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.25rem)] leading-tight font-semibold tracking-[-0.02em]">
                  {next.title}
                </h3>
                <p className="mt-1 text-[15px] text-muted">
                  {next.series}
                  {next.host ? `. Live host ${next.host}` : ""}
                </p>
              </div>
              <Countdown start={next.start} watchUrl={watchUrl} />
              <div className="mt-auto flex flex-wrap gap-3">
                <Pill href={watchUrl} external>
                  Get notified
                </Pill>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Live player. */}
        <Reveal delay={0.08} className="lg:col-span-5">
          <article className="card flex h-full flex-col gap-5 rounded-[18px] p-6">
            <div>
              <h3 className="flex items-center gap-2 text-[19px] font-semibold tracking-[-0.01em]">
                <Broadcast size={20} className="text-live" aria-hidden />
                Watch live
              </h3>
              <p className="mt-1.5 text-[15px] leading-snug text-muted">
                The player switches to the live broadcast automatically on race day.
              </p>
            </div>
            <LivePlayer embedUrl={channel.liveEmbed} poster="/images/gallery/bpg-race-04.webp" title="BPG Media live stream" />
          </article>
        </Reveal>

        {/* Season fixtures. */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <article className="card h-full rounded-[18px] p-6">
            <h3 className="text-[19px] font-semibold tracking-[-0.01em]">
              {season.name} <span className="text-muted">{season.edition}</span>
            </h3>
            <ul className="mt-5 flex flex-col gap-2">
              {season.fixtures.map((f) => {
                const done = !upcoming.some((u) => u.id === f.videoId);
                return (
                  <li key={f.venue}>
                    <a
                      href={`https://www.youtube.com/watch?v=${f.videoId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="glass flex items-center justify-between gap-4 rounded-full px-4 py-2.5 text-[15px] transition-colors hover:bg-white/10"
                    >
                      <span className="font-semibold">{f.venue}</span>
                      <span className="text-muted">
                        {formatIst(`${f.date}T06:00:00Z`, { day: "numeric", month: "short" })}
                        <span className={done ? "ml-3 text-silver" : "ml-3 text-blue-bright"}>
                          {done ? "Replay" : "Upcoming"}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href={channel.streamsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block text-[15px] font-semibold text-blue-bright hover:underline"
            >
              Full schedule on YouTube
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
