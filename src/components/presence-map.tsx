"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { brand, regions, type Company, type Region } from "@/content/site";

type Props = {
  dotsPath: string;
  width: number;
  height: number;
  points: Record<Region["id"], [number, number]>;
};

const domain = (url: string) => new URL(url).hostname.replace(/^www\./, "");

// Long subdomains may wrap on small phones: allow breaks only after a dot.
const breakable = (host: string) =>
  host.split(".").map((part, i, all) => (
    <span key={i}>
      {part}
      {i < all.length - 1 && <>.<wbr /></>}
    </span>
  ));

function CompanyRow({ c }: { c: Company }) {
  const linked = c.url && c.status !== "Website coming soon";
  const external = linked && !c.url!.includes("bepositivegroup.com");
  const body = (
    <>
      {/* Logos are JPGs on white: shown on a white tile, like an app icon. */}
      <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-[12px] bg-white p-1 shadow-[inset_0_0_0_1px_var(--line)] sm:h-14 sm:w-[72px] sm:rounded-[14px] sm:p-1.5">
        <Image src={c.logo} alt="" width={560} height={300} className="h-full w-auto object-contain" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] leading-snug font-semibold tracking-[-0.01em]">{c.name}</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{c.focus}</span>
        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
          {linked && <span className="text-[12px] font-semibold text-blue sm:text-[13px]">{breakable(domain(c.url!))}</span>}
          {c.status && (
            <span className="rounded-full bg-bg px-2 py-0.5 text-[12px] font-semibold text-muted shadow-[inset_0_0_0_1px_var(--line)]">{c.status}</span>
          )}
        </span>
        {c.note && <span className="mt-1 block text-[12px] text-muted/80">{c.note}</span>}
      </span>
      {linked && (
        <ArrowUpRight size={18} aria-hidden className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue" />
      )}
    </>
  );
  const row = "flex items-start gap-3 rounded-[18px] p-2.5 sm:gap-4 sm:p-3";
  return linked ? (
    <a href={c.url} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className={`group ${row} transition-colors hover:bg-bg`}>
      {body}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  ) : (
    <div className={row}>{body}</div>
  );
}

// Two-column presence module: the dotted map with flight arcs on the navy
// brand panel, and a country switcher listing each market's companies.
// Choosing a tab, marker or label selects that country on both sides.
export function PresenceMap({ dotsPath, width, height, points }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<Region["id"]>("india");
  const companyCount = regions.reduce((n, r) => n + r.companies.length, 0);

  const arc = (a: [number, number], b: [number, number], lift: number) => {
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2 - lift;
    return `M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`;
  };
  const arcs = [
    arc(points.qatar, points.india, 120),
    arc(points.india, points.china, 150),
    arc(points.qatar, points.china, 230),
  ];

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + regions.length) % regions.length;
    setActive(regions[next].id);
    tabs.current[next]?.focus();
  };

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const paths = gsap.utils.toArray<SVGPathElement>(".arc");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        });
        tl.from(".map-dots", { opacity: 0, duration: 1.2, ease: "power2.out" })
          .from(
            ".marker",
            { scale: 0, transformOrigin: "center", transformBox: "fill-box", stagger: 0.15, duration: 0.6, ease: "back.out(2)" },
            "-=0.6",
          )
          // fromTo with an explicit end: .from() would read the start state
          // mid-revert under React StrictMode and could end at opacity 0.
          .fromTo(".marker-label", { opacity: 0 }, { opacity: 1, stagger: 0.15, duration: 0.5, ease: "power2.out" }, "<")
          .to(paths, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.25 }, "-=0.2")
          .fromTo(".region-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, "-=1.4");
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid items-stretch gap-5 lg:grid-cols-12">
      {/* Map */}
      <div className="panel-navy relative flex flex-col overflow-hidden rounded-[32px] p-3 sm:p-5 lg:col-span-7">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_55%_45%,rgba(122,162,255,0.18),transparent_70%)]" />
        <div className="relative my-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full"
            role="img"
            aria-label="Map showing Be Positive Group's presence in Qatar, India and China"
          >
            <defs>
              <linearGradient id="arc-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#7aa2ff" stopOpacity="0.15" />
                <stop offset="0.5" stopColor="#dbe5ff" />
                <stop offset="1" stopColor="#7aa2ff" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path className="map-dots" d={dotsPath} stroke="rgba(255,255,255,0.17)" strokeWidth="4.4" strokeLinecap="round" fill="none" />
            {arcs.map((d, i) => (
              <path key={i} className="arc" d={d} stroke="url(#arc-grad)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            ))}
            {regions.map((r) => {
              const [x, y] = points[r.id];
              const on = active === r.id;
              return (
                <g key={r.id} className="marker cursor-pointer" onClick={() => setActive(r.id)}>
                  {/* Generous invisible hit area. */}
                  <circle cx={x} cy={y} r="26" fill="transparent" />
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? 10 : 7}
                    fill={on ? "#ffffff" : "#7aa2ff"}
                    stroke={on ? "#7aa2ff" : "#04173f"}
                    strokeWidth="3"
                    style={{ transition: "r 0.3s, fill 0.3s" }}
                  />
                </g>
              );
            })}
          </svg>
          {/* Marker pulses as HTML, not SVG: a CSS transform on its own layer
              runs on the compositor, while an animated SVG child would
              repaint the whole ~2,500-dot map every frame. */}
          {regions.map((r) => {
            const [x, y] = points[r.id];
            return (
              <span
                key={`pulse-${r.id}`}
                aria-hidden
                className={`pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 sm:size-5 ${active === r.id ? "opacity-80" : "opacity-35"}`}
                style={{ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }}
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-blue-bright motion-reduce:animate-none" />
              </span>
            );
          })}
          {/* Labels as HTML over the map, so they stay readable at any width.
              Pointer shortcuts only; the tabs are the keyboard controls. */}
          {regions.map((r) => {
            const [x, y] = points[r.id];
            const on = active === r.id;
            return (
              <span
                key={r.id}
                aria-hidden
                onClick={() => setActive(r.id)}
                className={`marker-label absolute -translate-y-[135%] translate-x-3 cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap transition-colors duration-300 sm:text-[14px] ${
                  on ? "bg-white text-navy shadow-lg" : "bg-white/10 text-white/85 hover:bg-white/20"
                }`}
                style={{ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }}
              >
                {r.country}
              </span>
            );
          })}
        </div>

        <dl className="relative mt-4 grid grid-cols-3 gap-3 border-t border-white/10 px-2 pt-4 pb-1">
          {[
            ["Markets", regions.length],
            ["Companies", companyCount],
            ["Since", brand.since],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <dt className="text-[12px] font-medium text-white/55 sm:text-[13px]">{k}</dt>
              <dd className="order-first font-display text-[26px] leading-tight font-semibold sm:text-[32px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Country switcher */}
      <div className="region-card card flex flex-col rounded-[32px] p-3 sm:p-5 lg:col-span-5">
        <div role="tablist" aria-label="Countries" className="grid grid-cols-3 gap-1 rounded-full bg-bg p-1 shadow-[inset_0_0_0_1px_var(--line)]">
          {regions.map((r, i) => {
            const on = active === r.id;
            return (
              <button
                key={r.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${r.id}`}
                aria-selected={on}
                aria-controls={`panel-${r.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(r.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`flex h-11 items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-colors duration-200 sm:text-[15px] ${
                  on ? "bg-navy text-white shadow-[0_8px_20px_-10px_rgba(7,41,108,0.8)]" : "text-muted hover:bg-white hover:text-text"
                }`}
              >
                {r.country}
                <span
                  className={`grid size-5 place-items-center rounded-full text-[11px] ${on ? "bg-white/20 text-white" : "bg-white text-muted shadow-[inset_0_0_0_1px_var(--line)]"}`}
                >
                  {r.companies.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* All panels share one grid cell, so the card (and the map beside
            it) keeps the height of the tallest country on every tab change.
            Inactive panels stay in the HTML (crawlable) but are invisible and
            inert; re-adding animate-rise replays the entrance. */}
        <div className="grid">
          {regions.map((r) => {
            const on = active === r.id;
            return (
              <div
                key={r.id}
                role="tabpanel"
                id={`panel-${r.id}`}
                aria-labelledby={`tab-${r.id}`}
                aria-hidden={!on}
                inert={!on}
                className={`[grid-area:1/1] px-1.5 pt-6 sm:px-2 ${on ? "animate-rise" : "invisible"}`}
              >
                <p className="text-[13px] font-semibold tracking-[0.04em] text-blue uppercase">{r.role}</p>
                <h3 className="mt-1 font-display text-[30px] font-semibold tracking-[-0.025em]">{r.country}</h3>
                <ul className="mt-4 flex flex-col gap-1 border-t border-line pt-3">
                  {r.companies.map((c) => (
                    <li key={c.name}>
                      <CompanyRow c={c} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
