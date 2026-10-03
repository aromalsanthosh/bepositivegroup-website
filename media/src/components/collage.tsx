import Image from "next/image";
import { collageRows, type Photo } from "@/content/photos";

function Row({ items, direction }: { items: Photo[]; direction: "left" | "right" }) {
  // Two identical halves per track so the -50% translate loops seamlessly.
  return (
    <div className="flex overflow-hidden">
      <ul
        className={`${direction === "left" ? "marquee-left" : "marquee-right"} flex w-max shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((p, i) => (
          <li
            key={`${p.src}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className="relative aspect-[16/10] w-[260px] shrink-0 overflow-hidden rounded-[12px] bg-card shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] sm:w-[320px]"
          >
            <Image
              src={p.src}
              alt={i >= items.length ? "" : p.alt}
              fill
              sizes="320px"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Moving photo collage under the hero (cindori's wallpaper rows). CSS only,
// pauses on hover, static under reduced motion.
export function Collage() {
  return (
    <section aria-labelledby="collage-heading" className="py-16 sm:py-20">
      <h2
        id="collage-heading"
        className="px-5 text-center text-[13px] font-semibold tracking-[0.08em] text-muted uppercase"
      >
        <span className="text-text">16,000+</span> views on a single race day
      </h2>
      <div className="group mt-10 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <Row items={collageRows[0]} direction="left" />
        <Row items={collageRows[1]} direction="right" />
      </div>
    </section>
  );
}
