"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { nav, quoteCta } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 lg:h-[72px] lg:px-10">
        <Logo className="h-9 w-auto lg:h-10" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted transition-colors hover:text-ink focus-visible:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={quoteCta.href}
            className="hidden h-10 items-center rounded bg-ink px-4 text-[14px] font-medium whitespace-nowrap text-paper transition-colors hover:bg-accent hover:text-on-accent sm:inline-flex"
          >
            {quoteCta.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded border border-line lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <ScrollProgress />

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="border-t border-line lg:hidden"
        >
          <ul className="mx-auto flex max-w-[1400px] flex-col px-5 py-4">
            {[...nav, quoteCta].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display block py-3 text-2xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
