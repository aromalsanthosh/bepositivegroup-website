import { MaskHeading } from "@/components/motion/mask-heading";
import { Reveal } from "@/components/motion/reveal";

// Shared section header: optional small label chip, masked headline (second
// line in the accent blue), optional intro. Stacked, never split.
export function SectionHeading({
  label,
  title,
  accent,
  intro,
  center = false,
  tone = "light",
}: {
  label?: string;
  title: string;
  accent?: string;
  intro?: string;
  center?: boolean;
  /** "dark" for headings placed on the navy panel. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={center ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]"}>
      {label && (
        <p
          className={`mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
            dark ? "bg-white/10 text-blue-bright" : "bg-sky text-navy"
          }`}
        >
          <span className={`size-1.5 rounded-full ${dark ? "bg-blue-bright" : "bg-blue"}`} aria-hidden />
          {label}
        </p>
      )}
      <MaskHeading
        className={`font-display text-[clamp(2.3rem,4.8vw,4rem)] leading-[1.04] font-semibold tracking-[-0.035em] ${dark ? "text-white" : ""}`}
      >
        {title}
        {accent && (
          <>
            <br />
            <span className={dark ? "text-blue-bright" : "text-accent"}>{accent}</span>
          </>
        )}
      </MaskHeading>
      {intro && (
        <Reveal>
          <p
            className={`mt-6 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed ${dark ? "text-white/70" : "text-muted"} ${
              center ? "mx-auto max-w-[56ch]" : "max-w-[56ch]"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
