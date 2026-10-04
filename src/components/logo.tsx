import Image from "next/image";
import Link from "next/link";

// Be Positive Group crest lockup (from BPG-BS-GP 2025.ai), reversed for the
// dark theme. Swap for the vector master once supplied.
export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Be Positive Group home" className="inline-flex shrink-0">
      <Image
        src="/images/v2/brand/bpg-lockup-reversed.webp"
        alt="Be Positive Group"
        width={1006}
        height={323}
        // Shown at ~120-150px wide: offer small candidates, not 1080/2048.
        sizes="160px"
        preload
        className={className}
      />
    </Link>
  );
}
