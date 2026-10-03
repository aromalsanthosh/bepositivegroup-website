"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  /** Travel in % of the frame height, in each direction. */
  amount?: number;
  imageClassName?: string;
};

// Fills its (relatively positioned, overflow-hidden) parent. The image is
// oversized by `amount` and drifts against the scroll for depth.
export function ParallaxImage({
  src,
  alt,
  sizes,
  preload,
  amount = 8,
  imageClassName = "",
}: Props) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const travel = () => ((frame.current?.offsetHeight ?? 0) * amount) / 100;
        gsap.fromTo(
          ".parallax-inner",
          { y: () => -travel() },
          {
            y: () => travel(),
            ease: "none",
            scrollTrigger: {
              trigger: frame.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className="absolute inset-0">
      <div
        className="parallax-inner absolute inset-x-0 will-change-transform"
        style={{ top: `-${amount}%`, bottom: `-${amount}%` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          preload={preload}
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
        />
      </div>
    </div>
  );
}
