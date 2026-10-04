import { YoutubeLogo } from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/logo";
import { channel, nav } from "@/content/media";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo className="h-10 w-auto" />
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-muted">
              BPG Media is the live streaming arm of{" "}
              <a href="https://bepositivegroup.com" target="_blank" rel="noreferrer" className="text-text hover:underline">
                Be Positive Group
              </a>
              .
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-[14px] sm:grid-cols-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-text/80 hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={channel.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-text/80 hover:text-white">
                  <YoutubeLogo size={16} aria-hidden />
                  YouTube
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Be Positive Group. All rights reserved.</p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://aromalsanthosh.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-text underline-offset-4 hover:underline"
            >
              Aromal S<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
