"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { capabilities, cta } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Pill } from "@/components/pill";

// Interactive capability switcher: an accessible tablist (arrow keys work)
// driving a liquid-glass detail panel. Switching animates the image and
// staggers the service chips in.
export function Capabilities() {
  const [index, setIndex] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = capabilities[index];

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(".cap-image", { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.9, ease: EASE });
        gsap.fromTo(".cap-text > *", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.05 });
        gsap.fromTo(".cap-chip", { opacity: 0, y: 10, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE, stagger: 0.025, delay: 0.1 });
      });
    },
    { scope: panel, dependencies: [index] },
  );

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = capabilities.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : null;
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="capabilities" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading
        label="Media capabilities"
        title="Eight capabilities."
        accent="One media partner."
        intro="Each works on its own. Together they cover a brand's whole journey, from strategy to the physical world."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <div
          role="tablist"
          aria-label="Media capabilities"
          aria-orientation="vertical"
          className="flex snap-x gap-2 overflow-x-auto pb-2 lg:col-span-5 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {capabilities.map((c, i) => {
            const on = i === index;
            return (
              <button
                key={c.n}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`cap-tab-${i}`}
                aria-selected={on}
                aria-controls="cap-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => onKey(e, i)}
                data-active={on}
                className={`${on ? "lg" : "hover:bg-white/5"} flex shrink-0 snap-start items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors duration-300 lg:w-full`}
              >
                <span className={`font-mono text-[13px] tabular-nums ${on ? "text-blue-bright" : "text-muted"}`}>{c.n}</span>
                <span className={`text-[16px] font-semibold whitespace-nowrap lg:whitespace-normal ${on ? "text-white" : "text-text/70"}`}>{c.name}</span>
              </button>
            );
          })}
        </div>

        <div
          ref={panel}
          id="cap-panel"
          role="tabpanel"
          aria-labelledby={`cap-tab-${index}`}
          className="lg overflow-hidden rounded-[32px] p-3 lg:col-span-7"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-surface">
            <Image
              key={current.image}
              src={current.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 680px, 100vw"
              className="cap-image object-cover"
            />
            <span className="absolute right-5 bottom-3 font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-semibold tracking-[-0.05em] text-white/90 [text-shadow:0_8px_40px_rgba(0,0,0,0.5)]">
              {current.n}
            </span>
          </div>
          <div className="p-5 sm:p-7">
            <div className="cap-text">
              <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight font-semibold tracking-[-0.025em]">{current.name}</h3>
              <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-muted">{current.summary}</p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {current.services.map((s) => (
                <li key={s} className="cap-chip lg-thin rounded-full px-3.5 py-1.5 text-[14px] text-text/90">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Pill href={cta.href} variant="secondary" arrow>
          Discuss a media project
        </Pill>
      </div>
    </section>
  );
}
