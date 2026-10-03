import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { network, type Company } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

function CompanyCard({ c }: { c: Company }) {
  const body = (
    <>
      {/* Logos are JPGs on white: shown on a white tile, like an app icon. */}
      <div className="flex h-24 items-center justify-center rounded-[18px] bg-white p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
        <Image src={c.logo} alt={`${c.name} logo`} width={560} height={300} className="h-full w-auto object-contain" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[17px] font-semibold tracking-[-0.01em]">{c.name}</h4>
          <p className="mt-1 text-[14px] leading-snug text-muted">{c.focus}</p>
          {c.note && <p className="mt-2 text-[13px] text-silver">{c.note}</p>}
        </div>
        {c.url ? (
          <ArrowUpRight size={18} aria-hidden className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        ) : (
          c.status && (
            <span className={`lg-thin shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${c.status === "Now active" ? "text-blue-bright" : "text-muted"}`}>
              {c.status}
            </span>
          )
        )}
      </div>
    </>
  );
  return c.url ? (
    <a href={c.url} target="_blank" rel="noreferrer" className="lg group block h-full rounded-[26px] p-4">
      {body}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <div className="lg h-full rounded-[26px] p-4">{body}</div>
  );
}

export function Network() {
  return (
    <section id="network" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading label="Group companies" title="Our business" accent="network." />
      <div className="mt-14 flex flex-col gap-12">
        {network.map((r) => (
          <div key={r.region} className="grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <h3 className="font-display text-[28px] font-semibold tracking-[-0.025em]">{r.region}</h3>
              <p className="text-[15px] text-muted">{r.role}</p>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
              {r.companies.map((c, i) => (
                <li key={c.name}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <CompanyCard c={c} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
