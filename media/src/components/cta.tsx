import Image from "next/image";
import { YoutubeLogo } from "@phosphor-icons/react/ssr";
import { channel } from "@/content/media";
import { Pill } from "@/components/pill";
import { Reveal } from "@/components/motion/reveal";

// Closing card with the crest as an "app icon", after cindori's final CTA.
export function Cta() {
  return (
    <section className="mx-auto max-w-[1000px] px-5 py-20 sm:py-24">
      <Reveal>
        <div className="card relative grid items-center gap-10 overflow-hidden rounded-[18px] px-8 py-12 sm:px-14 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
              Never miss a race.
            </h2>
            <p className="mt-3 max-w-[36ch] text-[17px] leading-snug font-semibold text-muted">
              Subscribe and turn on notifications to get an alert the moment we go live.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Pill href={channel.subscribeUrl} variant="secondary" external>
                <YoutubeLogo size={20} weight="fill" className="text-[#ff0033]" aria-hidden />
                Subscribe on YouTube
              </Pill>
              <Pill href="#live">Watch live</Pill>
            </div>
          </div>
          <div className="relative mx-auto">
            <div aria-hidden className="absolute -inset-6 rounded-full bg-blue/30 blur-[50px]" />
            <Image
              src="/images/brand/bpg-crest.webp"
              alt="Be Positive Group crest"
              width={480}
              height={480}
              className="relative size-40 rounded-[36px] shadow-[0_30px_80px_-20px_rgba(29,91,240,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1)] sm:size-48"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
