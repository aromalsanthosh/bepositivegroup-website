"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { companies } from "@/content/site";
import { CompanyLogo } from "@/components/company-logo";
import { MaskHeading } from "@/components/motion/mask-heading";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Pinned, scroll-scrubbed slider on tall desktop screens: each photo wipes up
// over the previous one as you scroll, and snaps to the nearest company when
// scrolling stops. Elsewhere (mobile, short screens, reduced motion) it is a
// plain list; desktop keeps a hover-driven crossfade.
const PIN_MEDIA =
  "(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";
const HEADER_OFFSET = 72;

export function Companies() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef<Lenis | undefined>(undefined);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useGSAP(
    () => {
      gsap.matchMedia().add(PIN_MEDIA, () => {
        setPinned(true);
        const panes = gsap.utils.toArray<HTMLElement>(".pane");
        const inners = gsap.utils.toArray<HTMLElement>(".pane-inner");
        const steps = panes.length - 1;

        // Incoming photo: frame slides up while the photo counter-slides, so it
        // reads as a curtain wipe; it also settles from a slight zoom.
        gsap.set(panes.slice(1), { yPercent: 100 });
        gsap.set(inners.slice(1), { yPercent: -100, scale: 1.15 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage.current,
            start: `top ${HEADER_OFFSET}px`,
            end: () => `+=${steps * window.innerHeight * 0.8}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.round(self.progress * steps);
              setActive((prev) => (prev === next ? prev : next));
            },
          },
        });

        panes.slice(1).forEach((pane, i) => {
          tl.to(pane, { yPercent: 0 }, i)
            .to(inners[i + 1], { yPercent: 0, scale: 1 }, i)
            .to(inners[i], { scale: 1.08 }, i);
        });

        // Snap through Lenis (ScrollTrigger's own snap fights Lenis for the
        // scroll position). When scrolling stops mid-transition, glide to the
        // next company in the scroll direction: one slide at a time, so a fast
        // flick can never blink past several photos.
        const st = tl.scrollTrigger!;
        const settle = () => {
          const lenis = lenisRef.current;
          if (!lenis || !st.isActive) return;
          const at = st.progress * steps;
          if (Math.abs(at - Math.round(at)) < 0.01) return;
          const step = st.direction > 0 ? Math.ceil(at) : Math.floor(at);
          lenis.scrollTo(st.start + (step / steps) * (st.end - st.start), {
            duration: 0.8,
            easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
          });
        };
        ScrollTrigger.addEventListener("scrollEnd", settle);

        return () => {
          ScrollTrigger.removeEventListener("scrollEnd", settle);
          setPinned(false);
        };
      });
    },
    { scope: stage },
  );

  return (
    <section id="companies" className="bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 pt-20 lg:px-10 lg:pt-32">
        <MaskHeading className="font-display max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
          Four companies, one standard of work.
        </MaskHeading>
      </div>

      <div
        ref={stage}
        className="mx-auto grid max-w-[1400px] gap-10 px-5 pt-12 pb-20 lg:grid-cols-12 lg:px-10 lg:pt-16 lg:pb-32"
      >
        <ul className="border-t border-line lg:col-span-7">
          {companies.map((company, i) => {
            const isActive = i === active;
            const dim = pinned && !isActive;
            return (
              <li
                key={company.name}
                onMouseEnter={pinned ? undefined : () => setActive(i)}
                onFocus={pinned ? undefined : () => setActive(i)}
                className="border-b border-line"
              >
                <div className="grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:items-start lg:py-5">
                  <div className={`transition-opacity duration-500 ${dim ? "opacity-45" : ""}`}>
                    <p
                      className={`text-[15px] transition-colors duration-500 ${isActive ? "text-accent-ink" : "text-muted"}`}
                    >
                      {company.discipline}
                    </p>
                    <h3 className="font-display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">
                      {company.name}
                    </h3>
                    <p className="mt-3 max-w-[52ch] leading-relaxed text-muted">
                      {company.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <CompanyLogo logo={company.logo} />
                    {company.url ? (
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center gap-1.5 text-[15px] font-medium underline-offset-4 hover:underline"
                      >
                        Visit site
                        <ArrowUpRight size={16} weight="bold" aria-hidden />
                        <span className="sr-only"> for {company.name} (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded lg:hidden">
                  <Image
                    src={company.image.src}
                    alt={company.image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="relative hidden overflow-hidden rounded bg-paper lg:col-span-5 lg:block">
          {companies.map((company, i) => (
            <div
              key={company.name}
              aria-hidden={i !== active}
              className={`pane absolute inset-0 overflow-hidden will-change-transform ${
                pinned ? "" : `transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`
              }`}
              style={{ zIndex: i }}
            >
              <div className="pane-inner absolute inset-0 will-change-transform">
                <Image
                  src={company.image.src}
                  alt={company.image.alt}
                  fill
                  sizes="(min-width: 1400px) 540px, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
