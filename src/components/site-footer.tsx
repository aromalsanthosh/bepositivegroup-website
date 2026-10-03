import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/logo";
import { nav, social } from "@/content/site";

const icons = { Instagram: InstagramLogo, Facebook: FacebookLogo } as const;

export function SiteFooter() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="h-12 w-auto" />
            <p className="mt-6 max-w-[38ch] leading-relaxed text-muted">
              Printing, advertising, branding and interior fit-out in Qatar since 2010.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4">
            <ul className="grid grid-cols-2 gap-y-3 text-[15px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-3 lg:col-span-3 lg:justify-end">
            {social.map((item) => {
              const Icon = icons[item.label as keyof typeof icons];
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${item.label} (opens in a new tab)`}
                    className="inline-flex size-11 items-center justify-center rounded border border-line transition-colors hover:border-ink"
                  >
                    <Icon size={20} aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-14 border-t border-line pt-6 text-sm text-muted">
          © {new Date().getFullYear()} Be Positive Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
