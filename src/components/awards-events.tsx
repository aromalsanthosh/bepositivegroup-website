"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Broadcast,
  Buildings,
  CalendarBlank,
  FlagBanner,
  Handshake,
  SealCheck,
  Trophy,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { awardsEvents } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

type Tab = keyof typeof awardsEvents.tabs;
const tabNames = Object.keys(awardsEvents.tabs) as Tab[];

const icons: Record<string, Icon> = {
  "Upcoming events": CalendarBlank,
  "Events we participate in": UsersThree,
  "Media events & live coverage": Broadcast,
  "Corporate events": Buildings,
  "Awards & recognitions": Trophy,
  Certifications: SealCheck,
  "Partner recognitions": Handshake,
  Milestones: FlagBanner,
};

// Featured live-coverage card beside an Events / Awards tablist. No confirmed
// entries exist yet, so each group says so plainly instead of inventing items.
export function AwardsEvents() {
  const [tab, setTab] = useState<Tab>("Events");
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { featured } = awardsEvents;

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".ae-card",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.06 },
        );
      });
    },
    { scope: panel, dependencies: [tab] },
  );

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabNames.length) % tabNames.length;
    setTab(tabNames[next]);
    tabs.current[next]?.focus();
  };

  return (
    <section id="awards-events" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading label="Awards & events" title="Moments that" accent="define us." intro={awardsEvents.intro} />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <a
            href={featured.href}
            target="_blank"
            rel="noreferrer"
            className="card group flex h-full flex-col overflow-hidden rounded-[30px] p-3"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px]">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <span className="bg-bg shadow-[inset_0_0_0_1px_var(--line)] absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold">
                <span className="size-1.5 rounded-full bg-blue-bright" aria-hidden />
                Featured
              </span>
            </div>
            <div className="flex flex-1 items-start justify-between gap-4 p-4 sm:p-6">
              <div>
                <p className="text-[14px] font-semibold text-blue">{featured.label}</p>
                <h3 className="mt-1.5 text-[clamp(1.35rem,2.2vw,1.75rem)] leading-snug font-semibold tracking-[-0.02em]">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-muted">{featured.text}</p>
              </div>
              <ArrowUpRight size={20} aria-hidden className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text" />
            </div>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-6">
          <div className="card flex h-full flex-col rounded-[30px] p-4 sm:p-6">
            <div role="tablist" aria-label="Awards and events" className="bg-bg shadow-[inset_0_0_0_1px_var(--line)] inline-flex self-start rounded-full p-1.5">
              {tabNames.map((name, i) => {
                const on = name === tab;
                return (
                  <button
                    key={name}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`ae-tab-${name}`}
                    aria-selected={on}
                    aria-controls="ae-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setTab(name)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`h-10 rounded-full px-5 text-[14px] font-semibold transition-colors duration-200 active:translate-y-px ${on ? "bg-navy text-white" : "text-text/75 hover:bg-white hover:text-text"}`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            <div
              ref={panel}
              id="ae-panel"
              role="tabpanel"
              aria-labelledby={`ae-tab-${tab}`}
              className="mt-5 grid flex-1 grid-cols-2 gap-3"
            >
              {awardsEvents.tabs[tab].map((group) => {
                const Glyph = icons[group];
                return (
                  <div key={group} className="ae-card bg-bg shadow-[inset_0_0_0_1px_var(--line)] flex flex-col rounded-[22px] p-4 sm:p-5">
                    <Glyph size={26} className="text-blue" aria-hidden />
                    <p className="mt-4 text-[15px] leading-snug font-semibold tracking-[-0.01em] sm:mt-5 sm:text-[17px]">{group}</p>
                    <p className="mt-auto pt-3 text-[13px] font-medium text-muted">Being added</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
