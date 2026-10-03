"use client";

import { useEffect, useRef } from "react";

const SPACING = 26; // px between dots
const BASE_R = 1; // resting dot radius
const RADIUS = 140; // cursor influence radius
const GROW = 2.2; // extra radius at the cursor
const PUSH = 9; // max displacement away from the cursor

type Rgb = [number, number, number];

function readRgb(el: Element, prop: string): Rgb {
  // Resolve a CSS custom property (hex) to RGB via a throwaway colour parse.
  const probe = document.createElement("span");
  probe.style.color = getComputedStyle(el).getPropertyValue(prop).trim();
  document.body.appendChild(probe);
  const m = getComputedStyle(probe).color.match(/\d+/g) ?? ["0", "0", "0"];
  probe.remove();
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}

// Halftone-style dot grid behind a section. Dots near the cursor grow, turn
// brand green and ease away from it, then settle back. One canvas, and the
// draw loop only runs while the cursor moves or dots are still settling, so an
// idle page costs nothing. Static (no interaction) on touch devices and under
// prefers-reduced-motion.
export function DotField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const interactive =
      matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dot: Rgb = [0, 0, 0];
    let accent: Rgb = [1, 198, 92];
    let dotAlpha = 0.3;

    // Pointer state in host coordinates: raw target, smoothed position, and an
    // influence amount that fades in on enter and out on leave.
    const target = { x: -9999, y: -9999, on: 0 };
    const cur = { x: -9999, y: -9999, on: 0 };
    let clientX = 0;
    let clientY = 0;
    let raf = 0;

    const readColors = () => {
      const root = document.documentElement;
      dot = readRgb(root, "--muted");
      accent = readRgb(root, "--accent");
      dotAlpha = root.dataset.theme === "dark" ? 0.35 : 0.28;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const offX = (width % SPACING) / 2;
      const offY = (height % SPACING) / 2;
      const r2 = RADIUS * RADIUS;
      const restFill = `rgba(${dot[0]},${dot[1]},${dot[2]},${dotAlpha})`;

      // Resting dots in one path (cheap), then the few near the cursor on top.
      ctx.fillStyle = restFill;
      ctx.beginPath();
      const near: [number, number, number][] = [];
      for (let y = offY; y < height; y += SPACING) {
        for (let x = offX; x < width; x += SPACING) {
          const dx = x - cur.x;
          const dy = y - cur.y;
          const d2 = dx * dx + dy * dy;
          if (cur.on > 0.001 && d2 < r2) {
            near.push([x, y, d2]);
            continue;
          }
          ctx.moveTo(x + BASE_R, y);
          ctx.arc(x, y, BASE_R, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      for (const [x, y, d2] of near) {
        const d = Math.sqrt(d2) || 1;
        const t = (1 - d / RADIUS) ** 2 * cur.on; // eased falloff
        const px = x + ((x - cur.x) / d) * PUSH * t;
        const py = y + ((y - cur.y) / d) * PUSH * t;
        const r = BASE_R + GROW * t;
        const mix = (i: number) => Math.round(dot[i] + (accent[i] - dot[i]) * t);
        ctx.fillStyle = `rgba(${mix(0)},${mix(1)},${mix(2)},${dotAlpha + (1 - dotAlpha) * t})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      const rect = host.getBoundingClientRect();
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      cur.on += (target.on - cur.on) * 0.12;
      draw();
      const settling =
        Math.abs(target.x - cur.x) > 0.3 ||
        Math.abs(target.y - cur.y) > 0.3 ||
        Math.abs(target.on - cur.on) > 0.005;
      raf = settling ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (target.on === 0) {
        // Start from the entry point instead of sweeping in from off-screen.
        const rect = host.getBoundingClientRect();
        cur.x = clientX - rect.left;
        cur.y = clientY - rect.top;
      }
      target.on = 1;
      kick();
    };
    const onLeave = () => {
      target.on = 0;
      kick();
    };

    readColors();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    // Recolour when the theme toggle flips data-theme on <html>.
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (interactive) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
    />
  );
}
