import Image from "next/image";
import Link from "next/link";

// Be Positive Group lockup (from BPG-BS-GP 2025.ai), reversed for the dark
// theme: crest square as supplied, wordmark and border in white.
export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Link href="/" aria-label="BPG Media home" className="inline-flex shrink-0">
      <Image
        src="/images/brand/bpg-lockup-reversed.webp"
        alt="Be Positive Group"
        width={1006}
        height={323}
        preload
        className={className}
      />
    </Link>
  );
}
