"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { cta, nav } from "@/content/site";

// Floating white capsule: detached from the edge, a soft shadow once the page
// scrolls, and the link for the section in view marked active (scroll-spy).
// Sheet menu on small screens.
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    // Touch React state only when the shadow actually toggles, not on every
    // scroll event.
    const onScroll = () => {
      const next = window.scrollY > 12;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      // A band across the middle of the viewport decides the active section.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-5">
      <div
        className={`mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-3 rounded-full border bg-white/95 pr-2 pl-5 transition-shadow duration-300 sm:gap-6 ${
          scrolled ? "border-white shadow-[0_14px_40px_-20px_rgba(10,20,48,0.35)]" : "border-line shadow-none"
        }`}
      >
        <Logo className="h-8 w-auto sm:h-9" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center text-[14px] font-medium whitespace-nowrap xl:gap-1 xl:text-[15px]">
            {nav.map((item) => {
              const on = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={on ? "true" : undefined}
                    className={`relative rounded-full px-2.5 py-2 transition-colors duration-200 xl:px-3.5 ${
                      on ? "bg-sky text-navy" : "text-text/70 hover:bg-bg hover:text-text"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={cta.href}
            className="btn-primary group hidden h-11 items-center gap-2 rounded-full pr-2 pl-5 text-[14px] font-semibold whitespace-nowrap active:translate-y-px sm:inline-flex"
          >
            {cta.label}
            <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={14} weight="bold" aria-hidden />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full bg-bg text-text transition-colors hover:bg-sky lg:hidden"
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
        className={`card mx-auto mt-2 max-w-[1180px] origin-top rounded-[28px] p-3 transition-[opacity,translate,scale,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:hidden ${
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
                className={`block rounded-2xl px-4 py-3.5 font-display text-[22px] font-semibold tracking-[-0.02em] transition-colors ${
                  item === cta ? "mt-1 bg-navy text-white" : "hover:bg-bg"
                }`}
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
