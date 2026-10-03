import { MapPin } from "@phosphor-icons/react/ssr";
import { address, contactEmail, offices, quoteCta } from "@/content/site";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { MaskHeading } from "@/components/motion/mask-heading";
import { DotField } from "@/components/motion/dot-field";

export function Contact() {
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent("Quote request")}`;

  return (
    <section
      id="contact"
      className="relative isolate mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-32"
    >
      <DotField className="[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      <MaskHeading className="font-display max-w-[16ch] text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02]">
        Tell us what you need produced.
      </MaskHeading>
      <Reveal>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
          Send a brief, drawings or a rough idea and the right team will get back to you.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href={mailto}>{quoteCta.label}</Button>
          <a
            href={`mailto:${contactEmail}`}
            className="text-[15px] font-medium underline-offset-4 hover:underline"
          >
            {contactEmail}
          </a>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        <div>
          <h3 className="text-[15px] text-muted">Visit us</h3>
          <address className="mt-3 leading-relaxed not-italic">
            {address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={address.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-11 items-center gap-2 text-[15px] font-medium underline-offset-4 hover:underline"
          >
            <MapPin size={18} aria-hidden />
            Open in Google Maps
          </a>
        </div>

        {offices.map((office) => (
          <div key={office.name}>
            <h3 className="text-[15px] text-muted">{office.name}</h3>
            <p className="mt-3 leading-relaxed">{office.building}</p>
            <p className="leading-relaxed">
              <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:underline">
                {office.phone}
              </a>
            </p>
            <p className="leading-relaxed">
              <a href={`mailto:${office.email}`} className="break-all hover:underline">
                {office.email}
              </a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
