"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Desktop, Moon, Sun } from "@phosphor-icons/react";

const order = ["system", "light", "dark"] as const;
type Mode = (typeof order)[number];

const labels: Record<Mode, string> = {
  system: "Theme: match system",
  light: "Theme: light",
  dark: "Theme: dark",
};

const icons = { system: Desktop, light: Sun, dark: Moon };

const subscribe = () => () => {};

// Cycles system -> light -> dark. The stored theme is only known on the client,
// so the server renders a neutral placeholder to avoid a hydration mismatch.
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const current: Mode = mounted && order.includes(theme as Mode) ? (theme as Mode) : "system";
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon = icons[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`${labels[current]}. Switch to ${next}.`}
      title={labels[current]}
      className="inline-flex size-10 items-center justify-center rounded border border-line text-muted transition-colors hover:border-ink hover:text-ink lg:size-10"
    >
      {mounted ? <Icon size={18} aria-hidden /> : <span className="size-[18px]" />}
    </button>
  );
}
