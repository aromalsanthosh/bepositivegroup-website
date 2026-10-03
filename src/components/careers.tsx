import { roles, contactEmail } from "@/content/site";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { MaskHeading } from "@/components/motion/mask-heading";

export function Careers() {
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent("CV submission")}`;

  return (
    <section id="careers" className="border-y border-line">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
        <div className="lg:col-span-6">
          <MaskHeading className="font-display max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            Build a career in print, signage and fit-out.
          </MaskHeading>
          <Reveal>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
              We hire skilled people from Qatar and around the world. Send your CV and we
              will contact you when a suitable role opens.
            </p>
            <Button href={mailto} variant="secondary" className="mt-8">
              Send your CV
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <h3 className="text-[15px] text-muted">Roles we regularly hire for</h3>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {roles.map((role) => (
              <li key={role} className="border-t border-line py-3 text-lg">
                {role}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
