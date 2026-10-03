import Image from "next/image";
import { Quotes, UserCircle } from "@phosphor-icons/react/ssr";
import { brand, leadership } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

// Crest | statement | portrait. Below lg the crest and portrait sit side by
// side above the text.
export function Leadership() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 sm:py-16">
      <Reveal>
        <div className="lg grid grid-cols-2 items-center gap-5 overflow-hidden rounded-[36px] p-5 sm:gap-8 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10 lg:p-12 xl:gap-14">
          <div className="relative order-1 justify-self-center">
            <div aria-hidden className="absolute -inset-6 rounded-full bg-blue/30 blur-[60px]" />
            <Image
              src="/images/v2/brand/bpg-crest.webp"
              alt="Be Positive Group crest"
              width={480}
              height={480}
              className="relative aspect-square w-full max-w-[200px] rounded-[32px] shadow-[0_30px_80px_-20px_rgba(29,91,240,0.6),inset_0_0_0_1px_rgba(255,255,255,0.12)] lg:w-36 lg:rounded-[30px] xl:w-52 xl:rounded-[36px]"
            />
          </div>

          <div className="order-3 col-span-2 lg:order-2 lg:col-span-1">
            <p className="text-[14px] font-semibold tracking-[0.06em] text-blue-bright uppercase">Leadership</p>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1] font-semibold tracking-[-0.04em]">
              {leadership.name}
            </h2>
            <p className="mt-2.5 text-[16px] font-medium text-silver">{leadership.role}</p>
            <p className="mt-6 max-w-[50ch] border-t border-line pt-6 text-[17px] leading-[1.65] text-text/70">
              {leadership.statement}
            </p>
            <p className="mt-6 flex items-center gap-3 text-[clamp(1.15rem,1.7vw,1.4rem)] font-semibold tracking-[-0.02em]">
              <Quotes size={22} weight="fill" className="shrink-0 text-blue-bright" aria-hidden />
              <span className="text-sheen">{brand.tagline}</span>
            </p>
          </div>

          {/* CONFIRM: replace with Solly Melpadom's official portrait (4:5). */}
          <div className="order-2 w-full max-w-[200px] justify-self-center lg:order-3 lg:w-44 lg:max-w-none xl:w-60">
            <div className="lg-thin flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-white/15 p-4 text-center">
              <UserCircle size={52} weight="thin" className="text-silver/70" aria-hidden />
              <p className="text-[13px] leading-snug font-medium text-muted">
                Portrait of {leadership.name}
                <span className="block text-[12px] text-muted/70">Coming soon</span>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
