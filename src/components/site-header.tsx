"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { cta, nav } from "@/content/site";

// Floating glass capsule, macOS-style: detached from the edge, frosted, with
// a sheet menu on small screens.
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-5">
      <div className="lg mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-3 rounded-full pr-2 pl-5 sm:gap-6">
        <Logo className="h-8 w-auto sm:h-9" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[15px] font-medium text-text/80">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 transition-colors duration-200 hover:bg-white/8 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={cta.href}
            className="btn-glass-blue hidden h-11 items-center whitespace-nowrap rounded-full px-5 text-[14px] font-semibold active:translate-y-px sm:inline-flex"
          >
            {cta.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full text-text transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="lg mx-auto mt-2 max-w-[1180px] rounded-[28px] p-3 lg:hidden"
        >
          <ul className="flex flex-col">
            {[...nav, cta].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3.5 text-[22px] font-semibold tracking-[-0.02em] transition-colors hover:bg-white/8"
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
