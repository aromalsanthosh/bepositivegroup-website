import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { brand, regions, verticals } from "@/content/site";
import { siteUrl } from "@/lib/seo";

// Holding page for a vertical that is not live yet (tourism.*, trading.*):
// logo, one line and an enquiry button, so links never land on nothing.
export function HoldingPage({ vertical }: { vertical: "Tourism" | "Trading" }) {
  const v = verticals.find((x) => x.name === vertical)!;
  const company = regions.flatMap((r) => r.companies).find((c) => c.name === `${brand.name} ${vertical}`)!;
  const enquiry = `${siteUrl}/?enquiry=${vertical.toLowerCase()}#contact`;

  return (
    <main id="main" className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_45%,rgba(29,91,240,0.1),transparent_70%)]" />

      <a href={siteUrl} aria-label={`${brand.name} home`} className="absolute top-6 left-1/2 -translate-x-1/2 sm:top-8">
        <Image src="/images/v2/brand/bpg-lockup.webp" alt={brand.name} width={1006} height={323} preload className="h-9 w-auto sm:h-10" />
      </a>

      <div className="animate-rise flex max-w-[640px] flex-col items-center">
        <span className="card rounded-[28px] p-2.5">
          <span className="flex h-28 w-44 items-center justify-center rounded-[20px] bg-white p-3">
            <Image src={company.logo} alt={`${company.name} logo`} width={560} height={300} preload className="h-full w-auto object-contain" />
          </span>
        </span>
        <p className="chip mt-8">
          <span className="size-1.5 rounded-full bg-blue" aria-hidden />
          Coming soon
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.04] font-semibold tracking-[-0.04em]">
          {brand.name} <span className="text-accent">{vertical}</span>
        </h1>
        <p className="mt-5 max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-relaxed text-muted">{v.description}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={enquiry} className="btn-primary group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold active:translate-y-px">
            Send an enquiry
            <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a href={siteUrl} className="btn-secondary inline-flex h-12 items-center rounded-full px-6 text-[15px] font-semibold active:translate-y-px">
            Visit {brand.name}
          </a>
        </div>
      </div>

      <p className="absolute bottom-6 text-[13px] text-muted">© {new Date().getFullYear()} {brand.name}</p>
    </main>
  );
}
