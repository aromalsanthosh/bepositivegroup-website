import { ArrowRight } from "@phosphor-icons/react/ssr";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  arrow?: boolean;
  external?: boolean;
  className?: string;
};

// Glass pill buttons (.btn-glass / .btn-glass-blue in globals.css).
const variants = {
  primary: "btn-glass-blue",
  secondary: "btn-glass",
};

export function Pill({ href, children, variant = "primary", arrow, external, className = "" }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em] active:translate-y-px ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          weight="bold"
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
