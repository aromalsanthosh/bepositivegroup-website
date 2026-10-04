"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { verticals, brand } from "@/content/site";

// Stack of floating liquid-glass cards. Each card fades up with a CSS
// animation (starts on first paint, unlike a JS tween that waits for
// hydration and delays LCP); GSAP drives only scroll depth and pointer tilt. On desktop each layer sits at a
// different depth: they tilt toward the pointer (quickTo, no React state) and
// drift apart on scroll. Below lg the cards fall back to a clean grid (Media
// full width, Tourism and Trading side by side) so nothing overlaps.
export function HeroCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [media, tourism, trading] = verticals;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Scroll depth (desktop layered composition only): deeper layers move less.
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        gsap.utils.toArray<HTMLElement>(".hc").forEach((el) => {
          const depth = Number(el.dataset.depth ?? 1);
          gsap.to(el, {
            yPercent: -18 * depth,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        });
      });

      mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
        const stage = ref.current!;
        const rx = gsap.quickTo(stage, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(stage, "rotationY", { duration: 0.8, ease: "power3.out" });
        const layers = gsap.utils.toArray<HTMLElement>(".hc-shift").map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          d: Number(el.dataset.depth ?? 1),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rx(-ny * 8);
          ry(nx * 10);
          layers.forEach((l) => {
            l.x(nx * 22 * l.d);
            l.y(ny * 16 * l.d);
          });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: ref },
  );

  return (
    <div className="relative mx-auto w-full max-w-[560px] [perspective:1600px]">
      <div
        ref={ref}
        className="relative grid grid-cols-2 gap-3 pt-5 sm:gap-4 lg:block lg:aspect-[1/1.28] lg:pt-0 [transform-style:preserve-3d]"
      >
        {/* Media: the active vertical, front and centre. */}
        <div
          className="hc relative z-20 col-span-2 lg:absolute lg:inset-x-[4%] lg:top-[7%]"
          data-depth="1.4"
        >
          <div className="animate-rise-solid">
            <div className="hc-shift" data-depth="1.4">
              <div className="lg animate-float overflow-hidden rounded-[30px] p-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[22px]">
                  <Image
                    src={media.image}
                    alt={media.alt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 480px, 92vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-1.5">
                  <div>
                    <p className="text-[19px] font-semibold tracking-[-0.01em]">{media.name}</p>
                    <p className="text-[14px] text-muted">{media.tagline}</p>
                  </div>
                  <span className="lg-thin inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap text-blue-bright">
                    <span className="size-1.5 rounded-full bg-blue-bright" aria-hidden />
                    {media.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tourism and Trading tiles, deeper in the stack. */}
        <div
          className="hc relative z-30 lg:absolute lg:bottom-[2%] lg:left-0 lg:w-[42%]"
          data-depth="2"
        >
          <div className="animate-rise" style={{ animationDelay: "370ms" }}>
            <div className="hc-shift" data-depth="2">
              <div className="lg animate-float overflow-hidden rounded-[24px] p-2.5 [animation-delay:-2.5s]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                  <Image
                    src={tourism.image}
                    alt={tourism.alt}
                    fill
                    sizes="(min-width: 1024px) 240px, 46vw"
                    className="object-cover"
                  />
                </div>
                <p className="px-1.5 pt-3 text-[15px] font-semibold">{tourism.name}</p>
                <p className="px-1.5 pb-1 text-[13px] text-muted">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hc relative z-10 lg:absolute lg:right-[2%] lg:bottom-0 lg:w-[40%]"
          data-depth="0.8"
        >
          <div className="animate-rise" style={{ animationDelay: "490ms" }}>
            <div className="hc-shift" data-depth="0.8">
              <div className="lg animate-float overflow-hidden rounded-[24px] p-2.5 [animation-delay:-4.5s]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                  <Image
                    src={trading.image}
                    alt={trading.alt}
                    fill
                    sizes="(min-width: 1024px) 230px, 46vw"
                    className="object-cover"
                  />
                </div>
                <p className="px-1.5 pt-3 text-[15px] font-semibold">{trading.name}</p>
                <p className="px-1.5 pb-1 text-[13px] text-muted">Coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Since 2010 badge. */}
        <div className="hc absolute top-0 right-2 z-30 lg:right-[2%]" data-depth="2.4">
          <div className="animate-rise" style={{ animationDelay: "610ms" }}>
            <div className="hc-shift" data-depth="2.4">
              <div className="lg animate-float rounded-[18px] px-3.5 py-2.5 text-center [animation-delay:-1.2s] lg:rounded-[22px] lg:px-5 lg:py-4">
                <p className="text-[10px] font-semibold tracking-[0.08em] text-muted uppercase lg:text-[12px]">
                  Since
                </p>
                <p className="text-sheen font-display text-[24px] leading-none font-semibold tracking-[-0.03em] lg:text-[34px]">
                  {brand.since}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
