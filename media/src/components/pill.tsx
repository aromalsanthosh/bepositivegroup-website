import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "blue" | "white" | "glass";
  external?: boolean;
  className?: string;
};

const variants = {
  blue: "bg-blue text-white hover:bg-[#2b68ff]",
  white: "bg-white text-[#0b0d12] hover:bg-[#e6e9f0]",
  glass: "glass text-text hover:bg-white/10",
};

// Cindori-style pill button (980px radius, 17px semibold label).
export function Pill({ href, children, variant = "blue", external, className = "" }: Props) {
  const cls = `inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200 active:translate-y-px ${variants[variant]} ${className}`;
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
