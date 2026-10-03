import { capabilities } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { MaskHeading } from "@/components/motion/mask-heading";
import { ParallaxImage } from "@/components/motion/parallax-image";

// 4-column bento on desktop: 7 items, 12 cells, no gaps (2x2 + 1 + 1 / 2 / 2 + 1 + 1).
export function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-32">
      <MaskHeading className="font-display max-w-[20ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
        From business cards to boardrooms.
      </MaskHeading>

      <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:auto-rows-[20rem] lg:grid-cols-4 lg:gap-y-8">
        {capabilities.map((item, i) => (
          <li key={item.title} className={`${item.span} sm:[&:first-child]:col-span-2`}>
            <Reveal delay={(i % 4) * 0.05} className="flex h-full flex-col">
              <div className="group relative aspect-[4/3] overflow-hidden rounded bg-surface lg:aspect-auto lg:flex-1">
                <ParallaxImage
                  src={item.image.src}
                  alt={item.image.alt}
                  amount={6}
                  sizes={
                    item.span.includes("col-span-2")
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  }
                  imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 truncate text-[15px] text-muted">{item.note}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
