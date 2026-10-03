"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { nav } from "@/content/media";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-bar sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <Logo className="h-9 w-auto sm:h-10" />
          <span className="hidden font-brand text-[19px] leading-none tracking-[0.06em] text-silver uppercase sm:inline">
            Media
          </span>
        </div>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9 text-[15px] font-medium text-text/80">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a
            href="#live"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-blue px-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#2b68ff] sm:gap-2 sm:px-4 sm:text-[14px]"
          >
            <span className="live-dot size-1.5 rounded-full bg-white sm:size-2" aria-hidden />
            Watch live
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full text-text md:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="border-t border-line md:hidden"
        >
          <ul className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-xl font-semibold tracking-[-0.02em]"
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
