import Image from "next/image";
import { ArrowUpRight, Play } from "@phosphor-icons/react/ssr";
import { channel } from "@/content/media";
import { getPastRaces } from "@/lib/youtube";
import { formatDuration, formatIst, formatViews } from "@/lib/format";
import { Reveal } from "@/components/motion/reveal";

// Previous races as a cindori-style "collections" panel. Pulls the channel feed
// (revalidated hourly) so new replays appear without a redeploy.
export async function Races() {
  const races = await getPastRaces();

  return (
    <section id="races" className="mx-auto max-w-[1200px] px-5 py-20 sm:py-28">
      <div className="text-center">
        <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Relive every race.
        </h2>
        <p className="mx-auto mt-4 max-w-[44ch] text-[17px] leading-snug font-semibold text-muted">
          Full broadcasts from past races, start to finish, free on YouTube.
        </p>
      </div>

      <Reveal className="mt-14">
        <div className="card rounded-[18px] p-5 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-[19px] font-semibold tracking-[-0.01em]">Previous races</h3>
            <a
              href={channel.streamsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-blue-bright hover:underline"
            >
              All streams
              <ArrowUpRight size={14} weight="bold" aria-hidden />
            </a>
          </div>

          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {races.map((race) => (
              <li key={race.id}>
                <a
                  href={`https://www.youtube.com/watch?v=${race.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden rounded-[12px] bg-surface shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                    <Image
                      src={race.thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 560px, 100vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="glass inline-flex size-14 items-center justify-center rounded-full text-white">
                        <Play size={22} weight="fill" aria-hidden />
                      </span>
                    </span>
                  </div>
                  <h4 className="mt-4 text-[17px] leading-snug font-semibold tracking-[-0.01em] group-hover:text-blue-bright">
                    {race.title}
                  </h4>
                  {race.titleMl && (
                    <p lang="ml" className="mt-0.5 text-[14px] text-muted">
                      {race.titleMl}
                    </p>
                  )}
                  <p className="mt-2 text-[13px] text-muted">
                    {formatIst(race.date, { day: "numeric", month: "short", year: "numeric" })}
                    {race.durationMinutes ? ` · ${formatDuration(race.durationMinutes)}` : ""}
                    {race.views ? ` · ${formatViews(race.views)} views` : ""}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
