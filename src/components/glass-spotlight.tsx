"use client";

import { useEffect } from "react";

// One pointer listener for the whole page: the glass panel under the pointer
// gets --mx / --my so its specular highlight and rim light follow the cursor
// (see .lg in globals.css). Writes CSS variables directly, never React state.
export function GlassSpotlight() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let last: HTMLElement | null = null;
    let x = 0;
    let y = 0;
    let target: EventTarget | null = null;

    const apply = () => {
      raf = 0;
      const el = (target as HTMLElement | null)?.closest?.<HTMLElement>(".lg") ?? null;
      if (last && last !== el) {
        last.style.removeProperty("--mx");
        last.style.removeProperty("--my");
        last.style.removeProperty("--rim");
      }
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${x - r.left}px`);
        el.style.setProperty("--my", `${y - r.top}px`);
        el.style.setProperty("--rim", "0.95");
      }
      last = el;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      target = e.target;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
