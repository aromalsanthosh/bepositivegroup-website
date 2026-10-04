"use client";

import { useEffect, useState } from "react";
import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react";
import { brand, social } from "@/content/site";

const icons = { YouTube: YoutubeLogo, Instagram: InstagramLogo, LinkedIn: LinkedinLogo, Facebook: FacebookLogo };

// Fixed side rails on wide screens: social links down the left edge, the
// group email set vertically on the right, each trailing a hairline to the
// bottom of the viewport. Below 1400px there is no gutter for them, and the
// footer carries the same links, so the rails also step aside while the
// footer is on screen.
export function SideRails() {
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const rail = `fixed bottom-0 z-30 hidden flex-col items-center gap-5 transition-opacity duration-500 min-[1400px]:flex ${atFooter ? "pointer-events-none opacity-0" : "opacity-100"}`;

  return (
    <>
      <div aria-hidden={atFooter || undefined} className={`${rail} left-7`}>
        <ul aria-label="Social media" className="flex flex-col items-center gap-2">
          {social.map(({ name, href }) => {
            const Icon = icons[name];
            return (
              <li key={name} className="group/tip relative">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${brand.name} on ${name} (opens in a new tab)`}
                  className="grid size-10 place-items-center rounded-full text-text/60 transition duration-300 hover:-translate-y-0.5 hover:bg-white/8 hover:text-blue-bright"
                >
                  <Icon size={21} weight="fill" aria-hidden />
                </a>
                <span aria-hidden className="pointer-events-none absolute z-10 rounded-full bg-[#0d1530] px-3 py-1.5 text-[13px] whitespace-nowrap text-text opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_0_1px_rgba(255,255,255,0.12),0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-200 top-1/2 left-full ml-3 -translate-x-1 -translate-y-1/2 group-focus-within/tip:translate-x-0 group-focus-within/tip:opacity-100 group-hover/tip:translate-x-0 group-hover/tip:opacity-100">
                  {name}
                </span>
              </li>
            );
          })}
        </ul>
        <span aria-hidden className="h-24 w-px bg-gradient-to-b from-white/40 to-white/5" />
      </div>

      <div aria-hidden={atFooter || undefined} className={`${rail} right-7`}>
        <a
          href={`mailto:${brand.email}`}
          className="py-2 font-mono text-[12px] tracking-[0.18em] text-text/60 transition duration-300 [writing-mode:vertical-rl] hover:-translate-y-0.5 hover:text-blue-bright"
        >
          {brand.email}
        </a>
        <span aria-hidden className="h-24 w-px bg-gradient-to-b from-white/40 to-white/5" />
      </div>
    </>
  );
}
