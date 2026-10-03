import { Plus } from "@phosphor-icons/react/ssr";
import { faqs } from "@/content/media";

// Native <details> accordion: keyboard and screen-reader friendly, no JS.
export function Faq() {
  return (
    <section id="faq" className="bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-[720px] px-5">
        <h2 className="text-center font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Frequently asked questions
        </h2>
        <ul className="mt-12 divide-y divide-white/10">
          {faqs.map((f) => (
            <li key={f.q}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-white/40 transition-transform duration-300 group-open:rotate-45">
                    <Plus size={14} weight="bold" aria-hidden />
                  </span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-muted">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
