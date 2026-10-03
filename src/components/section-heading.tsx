import { MaskHeading } from "@/components/motion/mask-heading";
import { Reveal } from "@/components/motion/reveal";

// Shared section header: optional small label, masked headline (second line
// in the sheen gradient), optional intro. Stacked, never split.
export function SectionHeading({
  label,
  title,
  accent,
  intro,
  center = false,
}: {
  label?: string;
  title: string;
  accent?: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]"}>
      {label && <p className="mb-4 text-[15px] font-semibold text-blue-bright">{label}</p>}
      <MaskHeading className="font-display text-[clamp(2.4rem,5.2vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
        {title}
        {accent && (
          <>
            <br />
            <span className="text-sheen">{accent}</span>
          </>
        )}
      </MaskHeading>
      {intro && (
        <Reveal>
          <p className={`mt-6 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-muted ${center ? "mx-auto max-w-[56ch]" : "max-w-[56ch]"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
