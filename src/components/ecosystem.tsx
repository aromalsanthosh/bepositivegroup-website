"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ecosystem } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

// "One brief" timeline. As the section scrolls through, a light beam runs
// along the track and each step lights up in turn (scrubbed, reversible).
export function Ecosystem() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const steps = gsap.utils.toArray<HTMLElement>(".eco-step");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
        });
        tl.fromTo(".eco-beam", { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: steps.length });
        steps.forEach((s, i) => {
          tl.fromTo(s, { opacity: 0.35 }, { opacity: 1, duration: 0.5 }, i)
            .fromTo(s.querySelector(".eco-dot"), { scale: 0.6, backgroundColor: "rgba(255,255,255,0.15)" }, { scale: 1, backgroundColor: "#7aa2ff", duration: 0.5 }, i);
        });
      });
    },
    { scope: ref },
  );

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading title="One brief." accent="One ecosystem." intro={ecosystem.body} />

      <div ref={ref} className="lg mt-14 rounded-[32px] p-6 sm:p-10">
        <ol className="relative grid gap-6 md:grid-cols-4 lg:grid-cols-8 lg:gap-3">
          {/* Track + beam: horizontal on desktop, vertical on small screens. */}
          <span aria-hidden className="absolute top-[7px] bottom-[7px] left-[7px] w-px bg-white/10 md:hidden" />
          <span aria-hidden className="eco-beam absolute top-[7px] bottom-[7px] left-[7px] w-px origin-top bg-blue-bright md:hidden" />
          <span aria-hidden className="absolute top-[7px] right-[6%] left-[2%] hidden h-px bg-white/10 lg:block" />
          <span aria-hidden className="eco-beam absolute top-[7px] right-[6%] left-[2%] hidden h-px origin-left bg-gradient-to-r from-blue-bright via-[#c9d6ff] to-blue-bright lg:block" />
          {ecosystem.steps.map((step, i) => (
            <li key={step} className="eco-step relative flex items-center gap-4 pl-0 md:flex-col md:items-start md:gap-5">
              <span className="eco-dot relative z-10 size-[15px] shrink-0 rounded-full bg-blue-bright ring-4 ring-bg" aria-hidden />
              <div>
                <p className="font-mono text-[13px] text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 text-[18px] font-semibold tracking-[-0.01em]">{step}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Reveal>
        <p className="mt-8 max-w-[56ch] text-[17px] leading-relaxed text-silver">{ecosystem.closing}</p>
      </Reveal>
    </section>
  );
}
