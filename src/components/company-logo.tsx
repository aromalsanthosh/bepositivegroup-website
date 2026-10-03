import Image from "next/image";
import type { Company } from "@/content/site";

// Official logos in their own colours. Each is fitted into the same box
// (max 150 x 60) so tall and wide lockups carry similar weight. In dark mode the
// logo sits on a light plate so the brand colours stay exact and legible.
// Empty alt: the company name is already the row's heading.
export function CompanyLogo({ logo }: { logo: Company["logo"] }) {
  const ratio = logo.width / logo.height;
  const height = Math.round(Math.min(60, 150 / ratio));
  const width = Math.round(height * ratio);

  return (
    <span className="inline-flex rounded dark:bg-[#f4f5f2] dark:p-2">
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        sizes={`${width}px`}
        style={{ width, height }}
      />
    </span>
  );
}
