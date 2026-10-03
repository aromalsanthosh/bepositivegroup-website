"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { markets } from "@/content/site";

type Props = {
  dotsPath: string;
  width: number;
  height: number;
  points: Record<string, [number, number]>;
};

// Dotted map with flight arcs Qatar -> India -> China. Arcs draw in when the
// map enters view; hovering a market card or marker highlights its city.
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
            {
              scale: 0,
              transformOrigin: "center",
              transformBox: "fill-box",
              stagger: 0.15,
              duration: 0.6,
              ease: "back.out(2)",
            },
            "-=0.6",
          )
          // fromTo with an explicit end: .from() would read the start state
          // mid-revert under React StrictMode and could end at opacity 0.
          .fromTo(
            ".marker-label",
            { opacity: 0 },
            { opacity: 1, stagger: 0.15, duration: 0.5, ease: "power2.out" },
            "<",
          )
          .to(
            paths,
            { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.25 },
            "-=0.2",
          )
          .from(
            ".market-card",
            { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "expo.out" },
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
            <path
              className="map-dots"
              d={dotsPath}
              stroke="rgba(201,206,216,0.42)"
              strokeWidth="4.4"
              strokeLinecap="round"
              fill="none"
            />
            {arcs.map((d, i) => (
              <path
                key={i}
                className="arc"
                d={d}
                stroke="url(#arc-grad)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            ))}
            {markets.map((m) => {
              const [x, y] = points[m.id];
              const on = active === m.id;
              return (
                <g
                  key={m.id}
                  className="marker cursor-pointer"
                  onPointerEnter={() => setActive(m.id)}
                  onPointerLeave={() => setActive(null)}
                >
                  <circle cx={x} cy={y} r="9" fill="#7aa2ff" className="pulse-ring" opacity="0.6" />
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? 9 : 6.5}
                    fill="#7aa2ff"
                    stroke="#fff"
                    strokeWidth="2"
                    style={{ transition: "r 0.3s" }}
                  />
                </g>
              );
            })}
          </svg>
          {/* Labels as HTML over the map, so they stay readable at any width. */}
          {markets.map((m) => {
            const [x, y] = points[m.id];
            return (
              <span
                key={m.id}
                aria-hidden
                className={`marker-label pointer-events-none absolute -translate-y-[130%] translate-x-3 text-[13px] font-semibold whitespace-nowrap sm:text-[15px] ${active === m.id ? "text-white" : "text-white/80"}`}
                style={{ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }}
              >
                {m.country}
              </span>
            );
          })}
        </div>
      </div>

      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {markets.map((m) => (
          <li
            key={m.id}
            className="market-card lg rounded-[24px] p-6 transition-transform duration-300"
            data-active={active === m.id}
            onPointerEnter={() => setActive(m.id)}
            onPointerLeave={() => setActive(null)}
          >
            <p className="text-[14px] font-semibold text-blue-bright">{m.role}</p>
            <h3 className="mt-1 font-display text-[26px] font-semibold tracking-[-0.025em]">
              {m.country} <span className="text-[17px] font-medium text-muted">{m.city}</span>
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.focus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
