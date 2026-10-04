import Image from "next/image";
import { ArrowUpRight, YoutubeLogo } from "@phosphor-icons/react/ssr";
import { brand, news } from "@/content/site";
import { getLatestStream } from "@/lib/youtube";
import { SectionHeading } from "@/components/section-heading";
import { StreamPlayer } from "@/components/stream-player";
import { Reveal } from "@/components/motion/reveal";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

// Latest from the group: the newest BPG Media stream plus three updates.
export async function News() {
  const stream = await getLatestStream();

  return (
    <section id="news" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading
        title="Latest from"
        accent="the group."
        intro="Updates from across the group, our verticals and the live events we cover."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <article className="lg flex h-full flex-col rounded-[30px] p-3">
            <StreamPlayer stream={stream} />
            <div className="flex flex-wrap items-end justify-between gap-4 p-4 sm:p-5">
              <div className="min-w-0">
                <p className="inline-flex items-center gap-2 text-[14px] font-semibold text-blue-bright">
                  <YoutubeLogo size={18} weight="fill" aria-hidden />
                  Latest stream · {fmt(stream.published)}
                </p>
                <h3 className="mt-1.5 text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-semibold tracking-[-0.02em]">{stream.title}</h3>
              </div>
              <a
                href={`${brand.mediaChannel}/streams`}
                target="_blank"
                rel="noreferrer"
                className="btn-glass inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[14px] font-semibold active:translate-y-px"
              >
                All streams
                <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        </Reveal>

        <ul className="flex flex-col gap-4 lg:col-span-5">
          {news.map((n, i) => {
            const external = n.href.startsWith("http");
            return (
              <li key={n.title} className="flex-1">
                <Reveal delay={0.06 * (i + 1)} className="h-full">
                  <a
                    href={n.href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="lg group flex h-full items-center gap-4 rounded-[24px] p-3"
                  >
                    <span className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-[16px] sm:aspect-[4/3] sm:w-36">
                      <Image
                        src={n.image}
                        alt=""
                        fill
                        sizes="144px"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      />
                    </span>
                    <span className="min-w-0 flex-1 py-1 pr-1">
                      <span className="block text-[13px] font-semibold text-blue-bright">
                        {n.category}
                        {n.date && <span className="font-medium text-muted"> · {fmt(n.date)}</span>}
                      </span>
                      <span className="mt-1 block text-[16px] leading-snug font-semibold tracking-[-0.01em]">{n.title}</span>
                      <span className="mt-1 line-clamp-2 text-[14px] leading-snug text-muted">{n.text}</span>
                    </span>
                    <ArrowUpRight size={18} aria-hidden className="mr-1 shrink-0 self-start text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
