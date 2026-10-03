import Image from "next/image";
import { clients } from "@/content/site";

// Client marks are pre-converted to transparent white PNGs, so they sit on the
// aurora directly. Replace with official SVGs when supplied.
function LogoSet({ hidden = false }: { hidden?: boolean }) {
  const items = [...clients, ...clients];
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-16 pr-16 motion-reduce:flex-wrap motion-reduce:justify-center ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {items.map((client, i) => (
        <li key={`${client.name}-${i}`} className={i >= clients.length ? "motion-reduce:hidden" : undefined}>
          <Image
            src={client.src}
            alt={hidden || i >= clients.length ? "" : client.name}
            width={client.w}
            height={client.h}
            // Equal visual weight: wide marks get shorter (max 48px tall / 160px wide).
            style={{ height: Math.min(48, (160 * client.h) / client.w), width: "auto" }}
            className="max-w-none opacity-55 transition-opacity duration-300 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="py-14">
      <h2 id="clients-heading" className="text-center text-[14px] font-semibold text-muted">
        Trusted by leading brands in Qatar
      </h2>
      <div className="group mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
