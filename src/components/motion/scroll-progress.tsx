"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Page progress indicator along the bottom edge of the sticky header.
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      },
    );
  });

  return (
    <div
      ref={bar}
      aria-hidden
      // Initial scale inline: Tailwind's scale-x-* uses the `scale` property,
      // which would compound with GSAP's transform.
      style={{ transform: "scaleX(0)" }}
      className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent will-change-transform"
    />
  );
}
