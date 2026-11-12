import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { verticals, brand } from "@/content/site";

// Hero bento: the active vertical (Media) large, Tourism and Trading side by
// side beneath it, and a "Since 2010" badge. Each card fades up with a CSS
// animation so it starts on first paint; the Media photo is the LCP image and
// stays opaque (rise-solid).
export function HeroCards() {
  const [media, tourism, trading] = verticals;

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <a href={media.href} className="card group animate-rise-solid col-span-2 block overflow-hidden rounded-[28px] p-2.5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-navy">
            <Image
              src={media.image}
              alt={media.alt}
              fill
              // LCP image: preload link + high priority + never lazy.
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 540px, (min-width: 640px) 560px, calc(100vw - 64px)"
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
            <span className="chip absolute top-3 left-3">
              <span className="dot-live" aria-hidden />
              {media.status}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 px-3 pt-4 pb-2">
            <div>
              <p className="font-display text-[22px] font-semibold tracking-[-0.02em]">BPG {media.name}</p>
              <p className="text-[14px] text-muted">{media.tagline}</p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={18} weight="bold" aria-hidden />
            </span>
          </div>
        </a>

        {[tourism, trading].map((v, i) => (
          <a
            key={v.name}
            href={v.href}
            className="card group animate-rise block overflow-hidden rounded-[24px] p-2"
            style={{ animationDelay: `${300 + i * 120}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-navy">
              <Image
                src={v.image}
                alt={v.alt}
                fill
                sizes="(min-width: 1024px) 270px, 46vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
            </div>
            <div className="flex items-end justify-between gap-2 px-2 pt-3 pb-1.5">
              <div>
                <p className="text-[16px] font-semibold">{v.name}</p>
                <p className="text-[13px] text-muted">{v.status}</p>
              </div>
              <ArrowUpRight size={16} aria-hidden className="mb-1 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue" />
            </div>
          </a>
        ))}
      </div>

      {/* Since 2010 badge. */}
      <div className="animate-rise absolute -top-5 right-4 sm:-right-4" style={{ animationDelay: "520ms" }}>
        <div className="panel-navy animate-float rounded-[20px] px-4 py-3 text-center shadow-[0_18px_40px_-16px_rgba(7,41,108,0.7)] sm:px-5 sm:py-3.5">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-white/60 uppercase sm:text-[11px]">Since</p>
          <p className="font-display text-[26px] leading-none font-semibold tracking-[-0.03em] sm:text-[30px]">{brand.since}</p>
        </div>
      </div>
    </div>
  );
}
