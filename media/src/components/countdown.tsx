"use client";

import { useEffect, useState } from "react";

const LIVE_WINDOW_MS = 6 * 60 * 60 * 1000; // streams run up to ~6 hours

type Phase = "upcoming" | "live" | "ended";

function phaseOf(now: number, start: number): Phase {
  if (now < start) return "upcoming";
  if (now < start + LIVE_WINDOW_MS) return "live";
  return "ended";
}

// Big gradient countdown (cindori's lock-screen clock). Renders a neutral
// placeholder on the server, then ticks every second on the client.
export function Countdown({ start, watchUrl }: { start: string; watchUrl: string }) {
  const startMs = new Date(start).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const phase = now === null ? "upcoming" : phaseOf(now, startMs);

  if (phase === "live") {
    return (
      <a
        href={watchUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 rounded-full bg-live px-5 py-2.5 text-lg font-semibold text-white"
      >
        <span className="live-dot size-2.5 rounded-full bg-white" aria-hidden />
        Live now. Watch on YouTube
      </a>
    );
  }

  if (phase === "ended") {
    return (
      <a href={watchUrl} target="_blank" rel="noreferrer" className="text-lg font-semibold text-blue-bright hover:underline">
        Replay available on YouTube
      </a>
    );
  }

  const left = now === null ? null : Math.max(0, startMs - now);
  const parts = [
    { label: "days", value: left === null ? null : Math.floor(left / 86_400_000) },
    { label: "hrs", value: left === null ? null : Math.floor(left / 3_600_000) % 24 },
    { label: "min", value: left === null ? null : Math.floor(left / 60_000) % 60 },
    { label: "sec", value: left === null ? null : Math.floor(left / 1000) % 60 },
  ];

  return (
    <div role="timer" aria-label="Time until the stream starts" className="flex items-end gap-3 sm:gap-5">
      {parts.map((p) => (
        <div key={p.label} className="flex flex-col items-center">
          <span className="bg-gradient-to-b from-[#dfe8ff] to-[#6f9bff] bg-clip-text font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-none font-semibold tracking-[-0.04em] text-transparent tabular-nums">
            {p.value === null ? "--" : String(p.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[12px] font-semibold tracking-[0.08em] text-muted uppercase">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
