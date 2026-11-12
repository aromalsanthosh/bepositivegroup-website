import { EnvelopeSimple, Globe, MapPin } from "@phosphor-icons/react/ssr";
import { brand, contact } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";

export function Contact() {
  const items = [
    { icon: EnvelopeSimple, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { icon: Globe, label: "Web", value: brand.web, href: `https://${brand.web}` },
    { icon: MapPin, label: "Presence", value: contact.presence },
  ];

  return (
    <section id="contact" className="relative isolate mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_20%_40%,black,transparent_65%)]" />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading label="Contact" title="Let's create" accent="something positive." intro={contact.intro} />
          <Reveal>
            <ul className="mt-10 flex flex-col gap-3">
              {items.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} className="card flex items-center gap-4 rounded-[20px] p-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky text-navy"><Icon size={22} weight="duotone" aria-hidden /></span>
                      <span>
                        <span className="block text-[13px] text-muted">{label}</span>
                        <span className="block text-[16px] font-semibold">{value}</span>
                      </span>
                    </a>
                  ) : (
                    <div className="card flex items-center gap-4 rounded-[20px] p-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky text-navy"><Icon size={22} weight="duotone" aria-hidden /></span>
                      <span>
                        <span className="block text-[13px] text-muted">{label}</span>
                        <span className="block text-[16px] font-semibold">{value}</span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
