import { Logo } from "@/components/logo";
import { brand, footer } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="px-3 pb-6 sm:px-5">
      <div className="lg mx-auto max-w-[1340px] rounded-[36px] px-6 py-12 sm:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="h-11 w-auto" />
            <p className="mt-6 text-[17px] font-semibold tracking-[-0.01em]">{brand.tagline}</p>
            <p className="mt-1 text-[14px] tracking-[0.08em] text-muted uppercase">Media | Tourism | Trading</p>
          </div>
          {Object.entries(footer.columns).map(([title, links]) => (
            <nav key={title} aria-label={title} className="lg:col-span-2">
              <h2 className="text-[14px] font-semibold text-silver">{title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-text/70 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-3">
            <h2 className="text-[14px] font-semibold text-silver">Connect</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
              <li>
                <a href={`mailto:${brand.email}`} className="text-text/70 transition-colors hover:text-white">
                  {brand.email}
                </a>
              </li>
              <li className="text-text/70">India (Kerala) · Qatar · China</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Be Positive Group. All rights reserved.</p>
          <p>
            Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <a href="https://aromalsanthosh.com" target="_blank" rel="noreferrer" className="font-semibold text-text underline-offset-4 hover:underline">
              Aromal S<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
