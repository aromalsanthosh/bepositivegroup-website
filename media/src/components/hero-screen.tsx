"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

// Broadcast monitor showing the next stream's poster. As the hero scrolls away
// the screen eases forward and settles flat, like the device in cindori's hero.
export function HeroScreen({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".screen",
          { rotateX: 14, scale: 0.94, y: 0 },
          {
            rotateX: 0,
            scale: 1,
            y: -24,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 25%", scrub: 0.4 },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[clamp(280px,calc((100dvh-540px)*1.75),620px)] [perspective:1400px]">
      {/* Soft blue spill under the screen. */}
      <div
        aria-hidden
        className="absolute inset-x-[8%] -bottom-10 h-24 rounded-full bg-blue/40 blur-[60px]"
      />
      <div className="screen relative origin-bottom rounded-[22px] bg-[#0b0d13] p-2.5 shadow-[0_40px_120px_-30px_rgba(29,91,240,0.45),inset_0_0_0_1px_rgba(255,255,255,0.08)] will-change-transform sm:p-3">
        <div className="relative aspect-video overflow-hidden rounded-[14px] bg-card">
          <Image
            src={src}
            alt={alt}
            fill
            preload
            sizes="(min-width: 660px) 600px, 94vw"
            className="object-cover"
          />
        </div>
      </div>
      <div aria-hidden className="mx-auto h-3 w-[40%] rounded-b-[14px] bg-[#0b0d13]" />
    </div>
  );
}
