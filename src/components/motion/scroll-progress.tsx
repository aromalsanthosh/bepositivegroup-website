"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Page progress indicator along the top edge of the viewport.
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
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-navy via-blue to-blue-bright will-change-transform"
    />
  );
}
