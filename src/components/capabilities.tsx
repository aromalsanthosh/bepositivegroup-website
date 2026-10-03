"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus } from "@phosphor-icons/react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { capabilities, cta } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Pill } from "@/components/pill";

// Desktop: an accessible tablist (arrow keys work) driving a liquid-glass
// detail panel; switching animates the image and staggers the chips in.
// Below lg: a single-open accordion, every capability visible as a glass row.
export function Capabilities() {
  const [index, setIndex] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = capabilities[index];

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".cap-image",
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 0.9, ease: EASE },
        );
        gsap.fromTo(
          ".cap-text > *",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.05 },
        );
        gsap.fromTo(
          ".cap-chip",
          { opacity: 0, y: 10, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE, stagger: 0.025, delay: 0.1 },
        );
      });
    },
    { scope: panel, dependencies: [index] },
  );

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = capabilities.length;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % n
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + n) % n
          : null;
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

      <CapabilityAccordion />

      <div className="mt-14 hidden gap-5 lg:grid lg:grid-cols-12">
        <div
          role="tablist"
          aria-label="Media capabilities"
          aria-orientation="vertical"
          className="col-span-5 flex flex-col gap-2"
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
                className={`${on ? "lg" : "hover:bg-white/5"} flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors duration-300`}
              >
                <span
                  className={`font-mono text-[13px] tabular-nums ${on ? "text-blue-bright" : "text-muted"}`}
                >
                  {c.n}
                </span>
                <span className={`text-[16px] font-semibold ${on ? "text-white" : "text-text/70"}`}>
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={panel}
          id="cap-panel"
          role="tabpanel"
          aria-labelledby={`cap-tab-${index}`}
          className="lg col-span-7 overflow-hidden rounded-[32px] p-3"
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
              <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight font-semibold tracking-[-0.025em]">
                {current.name}
              </h3>
              <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-muted">
                {current.summary}
              </p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {current.services.map((s) => (
                <li
                  key={s}
                  className="cap-chip lg-thin rounded-full px-3.5 py-1.5 text-[14px] text-text/90"
                >
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

// Mobile accordion: one capability open at a time. The panel expands with a
// grid-rows transition; when a lower item opens, the page glides so its header
// sits just under the floating nav (content above may have collapsed).
function CapabilityAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const lenis = useLenis();
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const pending = useRef<number | null>(null);

  useEffect(() => {
    const i = pending.current;
    if (i === null) return;
    pending.current = null;
    const el = rows.current[i];
    if (!el) return;
    // Wait for the collapse/expand transition to settle before measuring.
    const t = setTimeout(() => {
      if (el.getBoundingClientRect().top < 90) lenis?.scrollTo(el, { offset: -96, duration: 0.6 });
    }, 320);
    return () => clearTimeout(t);
  }, [open, lenis]);

  const toggle = (i: number) => {
    pending.current = i;
    setOpen((cur) => (cur === i ? null : i));
  };

  return (
    <ul className="mt-12 flex flex-col gap-3 lg:hidden">
      {capabilities.map((c, i) => {
        const on = open === i;
        return (
          <li
            key={c.n}
            ref={(el) => {
              rows.current[i] = el;
            }}
            className="lg overflow-hidden rounded-[24px]"
            data-active={on}
          >
            <h3>
              <button
                type="button"
                id={`cap-acc-${i}`}
                aria-expanded={on}
                aria-controls={`cap-acc-panel-${i}`}
                onClick={() => toggle(i)}
                className="flex min-h-16 w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span
                  className={`font-mono text-[13px] tabular-nums ${on ? "text-blue-bright" : "text-muted"}`}
                >
                  {c.n}
                </span>
                <span className="flex-1 text-[17px] leading-snug font-semibold tracking-[-0.01em]">
                  {c.name}
                </span>
                <span
                  aria-hidden
                  className={`lg-thin inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${on ? "rotate-45 text-blue-bright" : "text-text/80"}`}
                >
                  <Plus size={16} weight="bold" />
                </span>
              </button>
            </h3>
            <div
              id={`cap-acc-panel-${i}`}
              role="region"
              aria-labelledby={`cap-acc-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!on}>
                <div className="px-3 pb-4">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-surface">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 600px, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="px-2 pt-4 text-[16px] leading-relaxed text-muted">{c.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2 px-2">
                    {c.services.map((sv) => (
                      <li
                        key={sv}
                        className="lg-thin rounded-full px-3 py-1.5 text-[13px] text-text/90"
                      >
                        {sv}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
