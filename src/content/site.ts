// Be Positive Group content. Structure follows "Be Positive Group Website -
// Changes" (Oct 2026); copy from the approved prototype
// (research/bpg-netlify/site-content.json). CONFIRM items need sign-off.

// Vertical subdomains. Tourism and Trading serve the holding pages in this
// app (/tourism, /trading) via host rewrites in next.config.ts.
export const sites = {
  media: "https://media.bepositivegroup.com",
  tourism: "https://tourism.bepositivegroup.com",
  trading: "https://trading.bepositivegroup.com",
};

export const brand = {
  name: "Be Positive Group",
  tagline: "Customer-Centric. Beyond Borders.",
  since: 2010,
  founder: "Solly Melpadom",
  // Group inbox from the previous bepositivegroup.com.
  email: "contact@bepositivegroup.qa",
  mediaEmail: "media@bepositivegroup.com",
  web: "www.bepositivegroup.com",
  mediaChannel: "https://www.youtube.com/@bepositivegroupmedia",
  youtubeChannelId: "UCc8u0odNIZPyuaTJslrfACA",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Verticals", href: "#verticals" },
  { label: "Companies", href: "#companies" },
  { label: "Leadership", href: "#leadership" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export const cta = { label: "Start a conversation", href: "#contact" };

export const hero = {
  eyebrow: "Customer-Centric. Beyond Borders.",
  lines: ["Building brands.", "Creating experiences.", "Connecting opportunities."],
  subtext:
    "A multi-vertical business group delivering solutions across Media, Tourism and Trading, connecting markets across India, Qatar and China.",
};

export type Vertical = {
  name: string;
  status: "Now active" | "Coming soon";
  tagline: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  /** Larger photo for the verticals tile, when it differs from the hero card. */
  feature?: { image: string; alt: string };
};

export const verticals: Vertical[] = [
  {
    name: "Media",
    status: "Now active",
    tagline: "Ideas, stories, experiences",
    description:
      "Integrated advertising, branding, digital, content, production, events and media solutions.",
    image: "/images/v2/verticals/media.webp",
    alt: "BPG Media broadcast: a snake boat crew charging head-on through the spray",
    href: sites.media,
    feature: {
      image: "/images/v2/verticals/media-feature.webp",
      alt: "Snake boat crew in red pulling hard at a Kerala boat race, crowds lining the bank",
    },
  },
  {
    name: "Tourism",
    status: "Coming soon",
    tagline: "Travel, hospitality, leisure",
    description: "Travel, hospitality, destination, wellness and experience-led tourism solutions.",
    image: "/images/v2/verticals/tourism.webp",
    alt: "Houseboat on a palm-lined Kerala backwater",
    href: sites.tourism,
  },
  {
    name: "Trading",
    status: "Coming soon",
    tagline: "Sourcing, logistics, distribution",
    description: "International sourcing, procurement, trading and supply solutions.",
    image: "/images/v2/verticals/trading.webp",
    alt: "Container port with cranes and stacked shipping containers",
    href: sites.trading,
  },
];

export const about = {
  body: [
    "Be Positive Group is a growing multi-vertical business group focused on building businesses, brands and opportunities across interconnected markets.",
    "Our group brings together three strategic verticals (Media, Tourism and Trading) supported by specialized businesses, partnerships and international connections.",
  ],
  vision:
    "To build a customer-centric, globally connected business group that creates lasting value through innovation, opportunity and responsible growth.",
  mission:
    "To connect people, businesses and markets through integrated solutions across Media, Tourism and Trading while continuously creating better experiences for our customers and partners.",
};

export const leadership = {
  name: "Solly Melpadom",
  role: "Founder, Be Positive Group",
  statement:
    "The vision of Be Positive Group is built around a customer-centric approach, entrepreneurial thinking and the ambition to connect opportunities beyond traditional market boundaries.",
};

export type Company = {
  name: string;
  focus: string;
  logo: string;
  url?: string;
  /** Shown instead of a link while a company site is not ready. */
  status?: "Coming soon" | "Website coming soon";
  note?: string;
};

export type Region = {
  id: "qatar" | "india" | "china";
  country: string;
  role: string;
  /** Map marker: [longitude, latitude]. */
  coords: readonly [number, number];
  companies: Company[];
};

// Each country with its companies directly underneath.
export const regions: Region[] = [
  {
    id: "qatar",
    country: "Qatar",
    role: "International business hub · Doha",
    coords: [51.53, 25.29],
    companies: [
      { name: "Green Print", focus: "Printing, packaging, promotional solutions", logo: "/images/v2/companies/green-print.webp", url: "https://www.greenprintqatar.com/" },
      { name: "Brandscape Advertising", focus: "Advertising, branding, signage, events", logo: "/images/v2/companies/brandscape.webp", url: "https://www.brandscape.qa/" },
    ],
  },
  {
    id: "india",
    country: "India",
    role: "Our foundation · Kerala",
    coords: [76.27, 9.93],
    companies: [
      { name: "Be Positive Group Media", focus: "Advertising, digital, content, events, production", logo: "/images/v2/companies/group-media.webp", url: sites.media },
      { name: "Be Positive Group Tourism", focus: "Travel, hospitality, leisure, wellness", logo: "/images/v2/companies/group-tourism.webp", url: sites.tourism, status: "Coming soon" },
      { name: "Be Positive Group Trading", focus: "Sourcing, warehousing, logistics, distribution", logo: "/images/v2/companies/group-trading.webp", url: sites.trading, status: "Coming soon" },
    ],
  },
  {
    id: "china",
    country: "China",
    role: "Sourcing & trading connection",
    coords: [113.26, 23.13],
    companies: [
      // majeeinternational.com still showed a parking page on 2026-10-04, so it
      // is not linked. Add url and drop status once the site is live.
      { name: "Majee International Trading Co. Ltd.", focus: "International trading, sourcing, procurement", logo: "/images/v2/companies/majee.webp", status: "Website coming soon", note: "In association with Be Positive Group" },
    ],
  },
];

export type NewsItem = { category: string; title: string; text: string; href: string; image: string; date?: string };

// Real updates only. Keep three; the latest stream is pulled from YouTube.
export const news: NewsItem[] = [
  {
    category: "Media",
    title: "16K+ views for the 67th Pamba Boat Race live stream",
    text: "BPG Media's live coverage of the Uthradam Thirunal Pamba Boat Race has passed sixteen thousand views on YouTube.",
    href: "https://www.youtube.com/watch?v=XwF68xOqJg0",
    image: "/images/v2/news/XwF68xOqJg0.webp",
    date: "2026-02-07",
  },
  {
    category: "Event",
    title: "Champions Boat League Season 6, live on BPG Media",
    text: "Season 6 races are broadcast live on the BPG Media channel, with full replays after every race.",
    href: "https://www.youtube.com/@bepositivegroupmedia/streams",
    image: "/images/v2/capabilities/06-broadcast.webp",
  },
  {
    category: "Group",
    title: "Three verticals, one group",
    text: "Media is now fully active, with Tourism and Trading being built as the next chapters of the group.",
    href: "#verticals",
    image: "/images/v2/verticals/tourism.webp",
  },
];

// Shown if the YouTube feed cannot be reached at build/revalidate time.
export const fallbackStream = {
  id: "7TlMjIDn7TU",
  title: "Champions Boat League 2026 at Karuvatta",
  published: "2026-09-19",
  thumbnail: "/images/v2/news/7TlMjIDn7TU.webp",
};

// CONFIRM: verified client list and official logo files still to be supplied.
// White transparent marks generated from the client JPGs.
export const clients = [
  { name: "Qatar Airways", src: "/images/v2/clients/qatar-airways.png", w: 267, h: 76 },
  { name: "Hamad International Airport", src: "/images/v2/clients/hamad-airport.png", w: 262, h: 94 },
  { name: "Ooredoo", src: "/images/v2/clients/ooredoo.png", w: 264, h: 47 },
  { name: "Qatar Foundation", src: "/images/v2/clients/qatar-foundation.png", w: 217, h: 158 },
  { name: "United Development Company", src: "/images/v2/clients/udc.png", w: 235, h: 151 },
  { name: "Qatar Duty Free", src: "/images/v2/clients/qatar-duty-free.png", w: 178, h: 159 },
];

export type EnquiryRoute = { id: string; label: string; to: string; company: string };

// The enquiry form sends each request to the company that handles it.
// CONFIRM: Tourism and Trading have no inbox yet and use the group address.
export const enquiryRoutes: EnquiryRoute[] = [
  { id: "media", label: "Media: advertising, digital, content, events, live", to: brand.mediaEmail, company: "Be Positive Group Media" },
  { id: "print", label: "Printing and packaging in Qatar", to: "info@greenprintqatar.com", company: "Green Print, Qatar" },
  { id: "signage", label: "Signage, branding and fit-out in Qatar", to: "admin@brandscape.qa", company: "Brandscape Advertising, Qatar" },
  { id: "tourism", label: "Tourism and hospitality", to: brand.email, company: "Be Positive Group Tourism" },
  { id: "trading", label: "Trading and sourcing", to: brand.email, company: "Be Positive Group Trading" },
  { id: "partnership", label: "Partnership", to: brand.email, company: "Be Positive Group" },
  { id: "general", label: "General enquiry", to: brand.email, company: "Be Positive Group" },
];

export const contact = {
  intro:
    "Have an idea, requirement or opportunity? Tell us what you're looking to achieve. Our team will connect you with the right people and capabilities within Be Positive Group.",
  presence: "India (Kerala), Qatar, China",
  countries: ["India", "Qatar", "China", "Other"],
};

// Not rendered until there are confirmed events or awards (see page.tsx).
export const awardsEvents = {
  intro: "Events we host, cover and take part in, and the recognition earned along the way.",
  featured: {
    label: "Media events & live coverage",
    title: "Kerala's boat races, broadcast live",
    text: "BPG Media covers the Champions Boat League and Kerala's traditional boat races with multi-camera live production.",
    href: "https://www.youtube.com/@bepositivegroupmedia/streams",
    image: "/images/v2/capabilities/06-broadcast.webp",
  },
  tabs: {
    Events: ["Upcoming events", "Events we participate in", "Media events & live coverage", "Corporate events"],
    Awards: ["Awards & recognitions", "Certifications", "Partner recognitions", "Milestones"],
  },
};

export const footer = {
  group: [
    { label: "About us", href: "#about" },
    { label: "Business verticals", href: "#verticals" },
    { label: "Companies", href: "#companies" },
    { label: "Leadership", href: "#leadership" },
    { label: "News", href: "#news" },
    { label: "Contact", href: "#contact" },
  ],
  media: [
    { label: "Watch live", href: `${sites.media}/#live` },
    { label: "Boat races", href: `${sites.media}/#races` },
    { label: "Gallery", href: `${sites.media}/#gallery` },
    { label: "Advertise with us", href: `${sites.media}/#advertise` },
    { label: "YouTube channel", href: brand.mediaChannel },
  ],
};
