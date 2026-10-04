import Image from "next/image";
import { clients } from "@/content/site";

const DIR = "/images/v2/clients";

// Official colour logos on frosted light-glass tiles: translucent enough to
// sit in the page's glass language, light enough for every brand colour to
// read. Each tile opens the client's website in a new tab.
function LogoSet({ hidden = false }: { hidden?: boolean }) {
  const items = [...clients, ...clients];
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-5 py-3 pr-5 motion-reduce:flex-wrap motion-reduce:justify-center ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {items.map((client, i) => {
        const copy = hidden || i >= clients.length;
        // Equal visual weight: wide marks get shorter. Logos with fine print
        // (client.boost) get a larger box so their small text stays legible.
        const boost = client.boost ?? 1;
        const h = Math.min(44 * boost, (136 * boost * client.h) / client.w);
        const w = Math.round((h * client.w) / client.h);
        return (
          <li key={`${client.name}-${i}`} className={i >= clients.length ? "motion-reduce:hidden" : undefined}>
            <a
              href={client.url}
              target="_blank"
              rel="noreferrer"
              tabIndex={copy ? -1 : undefined}
              className="flex h-[70px] w-[152px] items-center justify-center rounded-[20px] bg-gradient-to-b from-white/[0.92] to-white/[0.78] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_0_0_1px_rgba(255,255,255,0.35),0_14px_34px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:from-white hover:to-white/95 sm:h-[84px] sm:w-[184px]"
            >
              <Image
                src={`${DIR}/${client.src}-color.png`}
                alt={copy ? "" : client.name}
                width={client.w}
                height={client.h}
                // Lazy loading misses tiles that slide in via the marquee transform.
                loading="eager"
                // Small pre-sized PNGs: serve as-is, skipping the optimiser cache.
                unoptimized
                // Scaled to 82% on phones, where the tiles are smaller.
                style={{ "--w": `${w}px`, "--h": `${h}px` } as React.CSSProperties}
                className="h-[calc(var(--h)*0.82)] w-[calc(var(--w)*0.82)] object-contain sm:h-(--h) sm:w-(--w)"
              />
              {!copy && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="py-14">
      <h2 id="clients-heading" className="text-center text-[14px] font-semibold text-muted">
        Trusted by leading brands in Qatar
      </h2>
      <div className="group mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
