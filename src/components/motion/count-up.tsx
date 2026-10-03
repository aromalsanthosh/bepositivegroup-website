"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

// Counts "530+" up from 0 the first time it enters view. Server HTML keeps the
// final value, so no-JS and reduced-motion visitors see the real figure.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const [, digits, suffix = ""] = value.match(/^(\d+)(.*)$/) ?? [];
      const el = ref.current;
      if (!el || !digits) return;

      gsap.matchMedia().add(MOTION_OK, () => {
        const counter = { n: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(counter, {
          n: Number(digits),
          duration: 1.8,
          ease: "expo.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.n)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
        return () => {
          el.textContent = value;
        };
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
