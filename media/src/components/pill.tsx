import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

// Glass buttons (see .btn-glass / .btn-glass-blue in globals.css).
const variants = {
  primary: "btn-glass-blue",
  secondary: "btn-glass",
};

// Cindori-style glass pill button (980px radius, semibold label).
export function Pill({ href, children, variant = "primary", external, className = "" }: Props) {
  const cls = `inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[15px] font-semibold tracking-[-0.01em] active:translate-y-px ${variants[variant]} ${className}`;
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
