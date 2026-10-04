import type { Metadata } from "next";
import { sites, verticals } from "@/content/site";
import { HoldingPage } from "@/components/holding-page";

const v = verticals.find((x) => x.name === "Tourism")!;

export const metadata: Metadata = {
  title: { absolute: "Be Positive Group Tourism | Coming soon" },
  description: `${v.description} Be Positive Group Tourism is coming soon. Send an enquiry to get in touch.`,
  alternates: { canonical: sites.tourism },
  openGraph: { url: sites.tourism, title: "Be Positive Group Tourism | Coming soon" },
};

export default function TourismPage() {
  return <HoldingPage vertical="Tourism" />;
}
