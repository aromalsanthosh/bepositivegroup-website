import { Logo } from "@/components/logo";
import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/ssr";
import { brand, footer, regions, social } from "@/content/site";

const socialIcons = { YouTube: YoutubeLogo, Instagram: InstagramLogo, LinkedIn: LinkedinLogo, Facebook: FacebookLogo };

const link = "text-text/70 transition-colors hover:text-white";
const isExternal = (href: string) => href.startsWith("http") && !href.includes("bepositivegroup.com");

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[14px] font-semibold text-silver">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} {...(isExternal(l.href) ? { target: "_blank", rel: "noreferrer" } : {})} className={link}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-3 pb-6 sm:px-5">
      <div className="lg mx-auto max-w-[1340px] rounded-[36px] px-6 py-12 sm:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-3">
            <Logo className="h-11 w-auto" />
            <p className="mt-6 text-[17px] font-semibold tracking-[-0.01em]">{brand.tagline}</p>
            <p className="mt-1 text-[14px] tracking-[0.08em] text-muted uppercase">Media | Tourism | Trading</p>
            <div className="mt-9">
              <h2 className="text-[14px] font-semibold text-silver">Connect</h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
                <li>
                  <a href={`mailto:${brand.email}`} className={link}>
                    {brand.email}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${brand.mediaEmail}`} className={link}>
                    {brand.mediaEmail}
                  </a>
                </li>
                <li>
                  <a href="#contact" className={link}>
                    Send an enquiry
                  </a>
                </li>
              </ul>
              <ul aria-label="Social media" className="mt-6 flex gap-2.5">
                {social.map(({ name, href }) => {
                  const Icon = socialIcons[name];
                  return (
                    <li key={name} className="group/tip relative">
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${brand.name} on ${name} (opens in a new tab)`}
                        className="lg-thin grid size-11 place-items-center rounded-full text-text/80 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                      >
                        <Icon size={20} weight="fill" aria-hidden />
                      </a>
                      <span aria-hidden className="pointer-events-none absolute z-10 rounded-full bg-[#0d1530] px-3 py-1.5 text-[13px] whitespace-nowrap text-text opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_0_1px_rgba(255,255,255,0.12),0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-200 bottom-full left-1/2 mb-2.5 -translate-x-1/2 translate-y-1 group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100 group-hover/tip:translate-y-0 group-hover/tip:opacity-100">
                        {name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Column title="Group" links={footer.group} />
          </div>

          {/* All companies, grouped by country. */}
          <nav aria-label="Companies" className="sm:col-span-2 lg:col-span-5">
            <h2 className="text-[14px] font-semibold text-silver">Companies</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-3 lg:grid-cols-2">
              {regions.map((r) => (
                <div key={r.id} className={r.id === "india" ? "lg:row-span-2" : undefined}>
                  <p className="text-[12px] font-semibold tracking-[0.08em] text-muted uppercase">{r.country}</p>
                  <ul className="mt-2 flex flex-col gap-2 text-[15px]">
                    {r.companies.map((c) =>
                      c.url && c.status !== "Website coming soon" ? (
                        <li key={c.name}>
                          <a href={c.url} {...(isExternal(c.url) ? { target: "_blank", rel: "noreferrer" } : {})} className={link}>
                            {c.name}
                          </a>
                        </li>
                      ) : (
                        <li key={c.name} className="text-text/50">
                          {c.name}
                          <span className="block text-[12px]">{c.status}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div className="lg:col-span-2">
            <Column title="Media" links={footer.media} />
          </div>

        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Be Positive Group. All rights reserved.</p>
          <p>
            Designed and developed by{" "}
            <a href="https://aromalsanthosh.com" target="_blank" rel="noreferrer" className="font-semibold text-text underline-offset-4 hover:underline">
              Aromal S<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
