import Image from "next/image";
import Link from "next/link";

// Raster logo derived from the client's PNG. Swap for the vector master once supplied.
export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Be Positive Group home" className="inline-flex shrink-0">
      <Image
        src="/images/brand/logo.png"
        alt="Be Positive Group"
        width={733}
        height={346}
        preload
        className={`${className} dark:hidden`}
      />
      <Image
        src="/images/brand/logo-on-dark.png"
        alt="Be Positive Group"
        width={733}
        height={346}
        className={`${className} hidden dark:block`}
      />
    </Link>
  );
}
