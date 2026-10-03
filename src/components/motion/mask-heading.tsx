"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";

// Heading slides up from behind a mask when it enters view, marking the start
// of a new section. Bottom padding keeps descenders clear of the mask.
export function MaskHeading({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  const mask = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".mask-inner", {
          yPercent: 105,
          duration: 1.1,
          ease: EASE,
          scrollTrigger: { trigger: mask.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: mask },
  );

  return (
    <Tag className={className}>
      <span ref={mask} className="block overflow-hidden pb-[0.12em]">
        <span className="mask-inner block">{children}</span>
      </span>
    </Tag>
  );
}
