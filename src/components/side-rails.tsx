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
              <li key={name}>
                {/* Native title tooltip: a custom bubble here would cover the
                    page content beside the narrow gutter. */}
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={name}
                  aria-label={`${brand.name} on ${name} (opens in a new tab)`}
                  className="grid size-10 place-items-center rounded-full text-text/45 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-blue hover:shadow-sm"
                >
                  <Icon size={21} weight="fill" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
        <span aria-hidden className="h-24 w-px bg-gradient-to-b from-text/25 to-transparent" />
      </div>

      <div aria-hidden={atFooter || undefined} className={`${rail} right-7`}>
        <a
          href={`mailto:${brand.email}`}
          className="py-2 font-mono text-[12px] tracking-[0.18em] text-text/45 transition duration-300 [writing-mode:vertical-rl] hover:-translate-y-0.5 hover:text-blue"
        >
          {brand.email}
        </a>
        <span aria-hidden className="h-24 w-px bg-gradient-to-b from-text/25 to-transparent" />
      </div>
    </>
  );
}
