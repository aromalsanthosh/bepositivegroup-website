import Image from "next/image";
import { ownPhotos } from "@/content/photos";
import { Reveal } from "@/components/motion/reveal";

// Original BPG race photography. 4-col bento: 7 photos, 12 cells, no gaps.
const layout = [
  { n: 4, span: "lg:col-span-2 lg:row-span-2" },
  { n: 6, span: "" },
  { n: 7, span: "" },
  { n: 2, span: "lg:col-span-2" },
  { n: 5, span: "" },
  { n: 3, span: "lg:col-span-2" },
  { n: 1, span: "" },
];

export function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-[1200px] px-5 py-20 sm:py-28">
      <div className="text-center">
        <p className="text-[17px] font-semibold">Gallery</p>
        <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Race day, up close.
        </h2>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
        {layout.map(({ n, span }, i) => {
          const photo = ownPhotos[n - 1];
          return (
            <li key={photo.src} className={`${span} ${i === 0 ? "sm:col-span-2" : ""}`}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <div className="group relative aspect-[4/3] h-full overflow-hidden rounded-[18px] bg-card shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] lg:aspect-auto">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={span.includes("col-span-2") ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
