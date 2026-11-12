import Image from "next/image";
import Link from "next/link";

// Be Positive Group crest lockup (from BPG-BS-GP 2025.ai). "light" is for
// light backgrounds: the same lockup with the wordmark and frame in brand
// navy, as in the official common-use logo. "dark" is the reversed original.
// Swap for the vector master once supplied.
export function Logo({
  className = "h-9 w-auto",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link href="/" aria-label="Be Positive Group home" className="inline-flex shrink-0">
      <Image
        src={tone === "light" ? "/images/v2/brand/bpg-lockup.webp" : "/images/v2/brand/bpg-lockup-reversed.webp"}
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
