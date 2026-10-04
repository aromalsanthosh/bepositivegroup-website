"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { regions, type Company, type Region } from "@/content/site";

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
      <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-[12px] bg-white p-1 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] sm:h-14 sm:w-[72px] sm:rounded-[14px] sm:p-1.5">
        <Image src={c.logo} alt="" width={560} height={300} className="h-full w-auto object-contain" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] leading-snug font-semibold tracking-[-0.01em]">{c.name}</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{c.focus}</span>
        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
          {linked && <span className="text-[12px] font-semibold text-blue-bright sm:text-[13px]">{breakable(domain(c.url!))}</span>}
          {c.status && (
            <span className="lg-thin rounded-full px-2 py-0.5 text-[12px] font-semibold text-muted">{c.status}</span>
          )}
        </span>
        {c.note && <span className="mt-1 block text-[12px] text-silver/80">{c.note}</span>}
      </span>
      {linked && (
        <ArrowUpRight size={18} aria-hidden className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
      )}
    </>
  );
  const row = "flex items-start gap-3 rounded-[18px] p-2.5 sm:gap-4 sm:p-3";
  return linked ? (
    <a href={c.url} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className={`group ${row} transition-colors hover:bg-white/6`}>
      {body}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  ) : (
    <div className={row}>{body}</div>
  );
}

// Dotted map with flight arcs Qatar -> India -> China, then each country with
// its companies directly underneath. Hovering a country lights its marker.
export function PresenceMap({ dotsPath, width, height, points }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

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
          .fromTo(
            ".region-card",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out" },
            "-=1.2",
          );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div className="lg overflow-hidden rounded-[32px] p-2 sm:p-4">
        <div className="relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full"
            role="img"
            aria-label="Map showing Be Positive Group's presence in Qatar, India and China"
          >
            <defs>
              <linearGradient id="arc-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#7aa2ff" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#c9d6ff" />
                <stop offset="1" stopColor="#7aa2ff" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path className="map-dots" d={dotsPath} stroke="rgba(201,206,216,0.42)" strokeWidth="4.4" strokeLinecap="round" fill="none" />
            {arcs.map((d, i) => (
              <path key={i} className="arc" d={d} stroke="url(#arc-grad)" strokeWidth="2" fill="none" strokeLinecap="round" />
            ))}
            {regions.map((r) => {
              const [x, y] = points[r.id];
              const on = active === r.id;
              return (
                <g
                  key={r.id}
                  className="marker cursor-pointer"
                  onPointerEnter={() => setActive(r.id)}
                  onPointerLeave={() => setActive(null)}
                >
                  <circle cx={x} cy={y} r="9" fill="#7aa2ff" className="pulse-ring" opacity="0.6" />
                  <circle cx={x} cy={y} r={on ? 9 : 6.5} fill="#7aa2ff" stroke="#fff" strokeWidth="2" style={{ transition: "r 0.3s" }} />
                </g>
              );
            })}
          </svg>
          {/* Labels as HTML over the map, so they stay readable at any width. */}
          {regions.map((r) => {
            const [x, y] = points[r.id];
            return (
              <span
                key={r.id}
                aria-hidden
                className={`marker-label pointer-events-none absolute -translate-y-[130%] translate-x-3 text-[13px] font-semibold whitespace-nowrap sm:text-[15px] ${active === r.id ? "text-white" : "text-white/80"}`}
                style={{ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }}
              >
                {r.country}
              </span>
            );
          })}
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        {regions.map((r) => (
          <li
            key={r.id}
            className="region-card lg rounded-[28px] p-2.5 sm:p-4"
            data-active={active === r.id}
            onPointerEnter={() => setActive(r.id)}
            onPointerLeave={() => setActive(null)}
          >
            <div className="px-3 pt-2 pb-3">
              <h3 className="font-display text-[26px] font-semibold tracking-[-0.025em]">{r.country}</h3>
              <p className="text-[14px] font-medium text-blue-bright">{r.role}</p>
            </div>
            <ul className="flex flex-col gap-1 border-t border-line pt-2">
              {r.companies.map((c) => (
                <li key={c.name}>
                  <CompanyRow c={c} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
