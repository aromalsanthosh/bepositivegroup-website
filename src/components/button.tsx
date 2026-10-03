import { ArrowRight } from "@phosphor-icons/react/ssr";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded px-5 text-[15px] font-medium transition-[background-color,color,transform] duration-200 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink";

const variants = {
  primary: "bg-accent text-on-accent hover:bg-ink hover:text-paper",
  secondary:
    "border border-line text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRight
        size={16}
        weight="bold"
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </a>
  );
}
