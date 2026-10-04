import type { Metadata } from "next";
import { sites, verticals } from "@/content/site";
import { HoldingPage } from "@/components/holding-page";

const v = verticals.find((x) => x.name === "Trading")!;

export const metadata: Metadata = {
  title: { absolute: "Be Positive Group Trading | Coming soon" },
  description: `${v.description} Be Positive Group Trading is coming soon. Send an enquiry to get in touch.`,
  alternates: { canonical: sites.trading },
  openGraph: { url: sites.trading, title: "Be Positive Group Trading | Coming soon" },
};

export default function TradingPage() {
  return <HoldingPage vertical="Trading" />;
}
