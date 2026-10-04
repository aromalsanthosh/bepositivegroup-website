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
          <ul className="flex items-center text-[14px] font-medium whitespace-nowrap text-text/80 xl:gap-1 xl:text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-2.5 py-2 transition-colors xl:px-3.5 duration-200 hover:bg-white/8 hover:text-white"
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
            {/* Icons cross-fade and rotate into each other. */}
            <span className="relative size-[22px]" aria-hidden>
              <List
                size={22}
                className={`absolute inset-0 transition duration-300 ease-out motion-reduce:transition-none ${open ? "scale-50 rotate-90 opacity-0" : "opacity-100"}`}
              />
              <X
                size={22}
                className={`absolute inset-0 transition duration-300 ease-out motion-reduce:transition-none ${open ? "opacity-100" : "scale-50 -rotate-90 opacity-0"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Always mounted so it can animate out; inert while closed keeps it out
          of the tab order and away from screen readers. */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        inert={!open}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className={`lg mx-auto mt-2 max-w-[1180px] origin-top rounded-[28px] p-3 transition-[opacity,translate,scale,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:hidden ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-3 scale-[0.97] opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {[...nav, cta].map((item, i) => (
            <li
              key={item.label}
              className={`transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              // Stagger in on open; leave together on close.
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
            >
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
    </header>
  );
}
