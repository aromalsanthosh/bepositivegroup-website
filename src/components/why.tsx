import { Cpu, GlobeHemisphereEast, Handshake, PenNib, Stack, UserFocus } from "@phosphor-icons/react/ssr";
import { pillars } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

const icons = { user: UserFocus, stack: Stack, globe: GlobeHemisphereEast, pen: PenNib, cpu: Cpu, handshake: Handshake };

// 4-column bento, 6 cards in 8 cells: wide / narrow / narrow, then narrow /
// narrow / wide. Glass highlight follows the pointer across every card.
const spans = ["lg:col-span-2", "", "", "", "", "lg:col-span-2"];

export function Why() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading title="Built around" accent="the customer." center />
      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => {
          const Icon = icons[p.icon];
          return (
            <li key={p.title} className={spans[i]}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <div className="lg flex h-full flex-col rounded-[28px] p-7">
                  <span className="lg-thin inline-flex size-12 items-center justify-center rounded-2xl text-blue-bright">
                    <Icon size={24} weight="duotone" aria-hidden />
                  </span>
                  <h3 className="mt-8 text-[21px] font-semibold tracking-[-0.015em]">{p.title}</h3>
                  <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
