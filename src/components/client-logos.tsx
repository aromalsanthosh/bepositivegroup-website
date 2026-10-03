import Image from "next/image";
import { clients } from "@/content/site";

// Logos are JPGs on white; multiply/screen blending lets them sit on either theme.
// Replace with official SVG logos when the client provides them.
function LogoSet({ hidden = false }: { hidden?: boolean }) {
  // Each half of the track holds the list twice so it is always wider than the
  // viewport, which keeps the -50% loop seamless on large screens.
  const items = [...clients, ...clients];
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-16 pr-16 motion-reduce:flex-wrap motion-reduce:justify-center ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {items.map((client, i) => (
        <li
          key={`${client.name}-${i}`}
          className={i >= clients.length ? "motion-reduce:hidden" : undefined}
        >
          <Image
            src={client.src}
            alt={hidden || i >= clients.length ? "" : client.name}
            width={268}
            height={160}
            className="h-20 w-auto max-w-none opacity-70 mix-blend-multiply grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-80 dark:mix-blend-screen dark:invert dark:hover:grayscale"
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="border-y border-line">
      <div className="mx-auto max-w-[1400px] px-5 pt-12 lg:px-10 lg:pt-14">
        <h2 id="clients-heading" className="text-[15px] text-muted">
          Trusted by
        </h2>
      </div>

      {/* Continuous right-to-left marquee; pauses on hover, static under reduced motion. */}
      <div className="group mt-6 overflow-hidden pb-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] lg:pb-14">
        {/* bg-paper: the moving track is its own stacking context, so the logos'
            multiply/screen blend needs a backdrop inside it. */}
        <div className="animate-marquee flex w-max bg-paper group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
