// Be Positive Group content, from the approved prototype
// (research/bpg-netlify/site-content.json). CONFIRM items need sign-off.

export const brand = {
  name: "Be Positive Group",
  tagline: "Customer-Centric. Beyond Borders.",
  since: 2010,
  founder: "Solly Melpadom",
  // CONFIRM: the prototype only lists the media inbox; ask for a group address.
  email: "media@bepositivegroup.com",
  web: "www.bepositivegroup.com",
  mediaChannel: "https://www.youtube.com/@bepositivegroupmedia",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Verticals", href: "#verticals" },
  { label: "Media", href: "#media" },
  { label: "Network", href: "#network" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export const cta = { label: "Start a conversation", href: "#contact" };

export const hero = {
  eyebrow: "Customer-Centric. Beyond Borders.",
  lines: ["Building brands.", "Creating experiences.", "Connecting opportunities."],
  subtext:
    "A multi-vertical group delivering Media, Tourism and Trading solutions across India, Qatar and China.",
};

export const intro = {
  statement:
    "Be Positive Group brings together Media, Tourism and Trading to create a connected ecosystem for brands, businesses and communities.",
  body: "From communication and creative production to travel, hospitality, sourcing and international trade, every business in the group is built around one principle.",
  principle: "Put the customer at the centre of every opportunity.",
};

export type Vertical = {
  name: string;
  status: "Now active" | "Coming soon";
  tagline: string;
  description: string;
  image: string;
  alt: string;
};

export const verticals: Vertical[] = [
  {
    name: "Media",
    status: "Now active",
    tagline: "Ideas, stories, experiences",
    description:
      "Integrated advertising, branding, digital, content, production, events and live media solutions.",
    image: "/images/v2/verticals/media.webp",
    alt: "BPG Media broadcast: a snake boat crew charging head-on through the spray",
  },
  {
    name: "Tourism",
    status: "Coming soon",
    tagline: "Travel, hospitality, leisure",
    description: "Travel, hospitality, destination, wellness and experience-led tourism solutions.",
    image: "/images/v2/verticals/tourism.webp",
    alt: "Houseboat on a palm-lined Kerala backwater",
  },
  {
    name: "Trading",
    status: "Coming soon",
    tagline: "Sourcing, logistics, distribution",
    description: "International sourcing, procurement, trading and supply solutions.",
    image: "/images/v2/verticals/trading.webp",
    alt: "Container port with cranes and stacked shipping containers",
  },
];

// Map markers: [longitude, latitude].
export const markets = [
  { id: "qatar", country: "Qatar", city: "Doha", role: "International business hub", focus: "Media, advertising, printing, branding, events", coords: [51.53, 25.29] as const },
  { id: "india", country: "India", city: "Kerala", role: "Our foundation", focus: "Media, tourism, trading", coords: [76.27, 9.93] as const },
  { id: "china", country: "China", city: "Guangzhou", role: "Sourcing and trading connection", focus: "International sourcing, trading, procurement", coords: [113.26, 23.13] as const },
];

export const media = {
  body: "Be Positive Group Media brings together strategy, creativity, technology, production and activation, so brands communicate with clarity and connect with their audiences.",
  live: "Live coverage of Kerala's boat races, from the Champions Boat League to the Pamba Boat Race.",
  disciplines: ["Strategy", "Creative", "Digital", "Content", "Production", "Events", "Broadcast", "Print"],
};

export type Capability = {
  n: string;
  name: string;
  summary: string;
  services: string[];
  image: string;
};

export const capabilities: Capability[] = [
  { n: "01", name: "Brand Strategy & Identity", summary: "Build brands with purpose. We shape the identity, positioning and communication direction a business needs to stand out.", services: ["Brand Strategy", "Brand Concept Development", "Brand Positioning", "Corporate Identity", "Naming & Taglines", "Visual Identity", "Brand Communication", "Personal Branding", "Market Research"], image: "/images/v2/capabilities/01-brand.webp" },
  { n: "02", name: "Advertising & Campaigns", summary: "Make the message impossible to ignore, connecting strategy, creative and media execution to reach the right audience.", services: ["Television", "Radio", "Newspaper", "Magazine", "Outdoor", "Billboards", "Cinema", "Transit", "Media Planning", "Campaign Management"], image: "/images/v2/capabilities/02-advertising.webp" },
  { n: "03", name: "Digital & Technology", summary: "Build the brand for the digital world with platforms that strengthen presence, engagement and conversion.", services: ["Website Development", "E-Commerce", "Landing Pages", "Tourism Platforms", "Booking Platforms", "SEO", "Google Business", "CRM Integration", "Automation", "Mobile Applications"], image: "/images/v2/capabilities/03-digital.webp" },
  { n: "04", name: "Social Media & Digital Marketing", summary: "Turn attention into engagement with content-led campaigns that keep brands relevant, visible and connected.", services: ["Social Media Strategy", "Content Planning", "Digital Campaigns", "Paid Advertising", "SEM", "Influencer Marketing", "Email Marketing", "WhatsApp Marketing", "Lead Generation", "Analytics"], image: "/images/v2/capabilities/04-social.webp" },
  { n: "05", name: "Content & Media Production", summary: "Stories worth watching, from a single social video to a complete brand film.", services: ["Creative Content", "Reels & Shorts", "Long-form Video", "Corporate Films", "Commercials", "Product Photography", "Interviews", "Podcasts", "Testimonials", "Documentaries", "Motion Graphics", "AI-Assisted Content"], image: "/images/v2/capabilities/05-content.webp" },
  { n: "06", name: "Photography, Film & Broadcast", summary: "Capture the moment and broadcast the experience, from multi-camera live production to cinematic storytelling.", services: ["Event Photography", "Event Videography", "Multi-Camera Production", "Live Streaming", "Sports Coverage", "Cultural Events", "Corporate Events", "Vallamkali Coverage", "Religious Broadcasting", "Webinars", "Hybrid Events", "Drone Production", "Documentary Production", "Cinematic Storytelling"], image: "/images/v2/capabilities/06-broadcast.webp" },
  { n: "07", name: "BTL, Activation & Events", summary: "Take the brand beyond the screen with physical experiences that bring audiences closer.", services: ["Product Launches", "Brand Activations", "Road Shows", "Sampling", "Mall Activations", "Experiential Marketing", "Exhibitions", "Trade Shows", "Event Production", "Event Branding", "Conferences", "Seminars"], image: "/images/v2/capabilities/07-events.webp" },
  { n: "08", name: "Print, Fabrication & Brand Environment", summary: "From screen to physical space: print, signage and fabrication delivered with our group companies.", services: ["Large Format Printing", "Digital Printing", "Indoor / Outdoor Printing", "Signage", "UV Printing", "Fabric Printing", "Offset Printing", "Packaging", "Exhibition Structures", "LED Signage", "Interior Branding", "Retail Branding", "Fit-Out", "Display Units", "Kiosks"], image: "/images/v2/capabilities/08-print.webp" },
];

export const ecosystem = {
  body: "A campaign can begin with strategy, become an identity, move into digital, come alive at an event, reach audiences through media and finally stand in the physical world as print and signage.",
  steps: ["Strategy", "Creative", "Digital", "Content", "Media", "Events", "Print", "Experience"],
  closing: "One brief moves from idea to delivery with one accountable team.",
};

export const pillars = [
  { title: "Customer centric", text: "Every solution begins with understanding the customer's requirement.", icon: "user" },
  { title: "Integrated capabilities", text: "Multiple business capabilities working together under one group.", icon: "stack" },
  { title: "Cross-border connections", text: "Presence and partnerships across India, Qatar and China.", icon: "globe" },
  { title: "Creative and execution", text: "From ideas and strategy through to production and delivery.", icon: "pen" },
  { title: "Technology enabled", text: "Modern digital, production and communication technology.", icon: "cpu" },
  { title: "Long-term partnerships", text: "Relationships that last beyond individual projects.", icon: "handshake" },
] as const;

export const about = {
  body: [
    "Be Positive Group is a growing multi-vertical business group building businesses, brands and opportunities across interconnected markets.",
    "Three strategic verticals, Media, Tourism and Trading, are supported by specialised businesses, partnerships and international connections.",
  ],
  approach: "Understand the opportunity, build the right solution and create meaningful value for the customer.",
  vision:
    "To build a customer-centric, globally connected business group that creates lasting value through innovation, opportunity and responsible growth.",
  mission:
    "To connect people, businesses and markets through integrated solutions across Media, Tourism and Trading, creating better experiences for customers and partners.",
  values: [
    { title: "Customer first", text: "We begin by understanding." },
    { title: "Think beyond", text: "We look past conventional solutions." },
    { title: "Build together", text: "Collaboration creates stronger outcomes." },
    { title: "Execute with purpose", text: "Ideas matter when they become reality." },
    { title: "Grow responsibly", text: "We aim to create sustainable value." },
  ],
};

export const leadership = {
  name: "Solly Melpadom",
  role: "Founder, Be Positive Group",
  statement:
    "The vision of Be Positive Group is built on a customer-centric approach, entrepreneurial thinking and the ambition to connect opportunities beyond traditional market boundaries.",
  // CONFIRM: official portrait still to be supplied.
};

export type Company = { name: string; focus: string; logo: string; url?: string; status?: string; note?: string };

export const network: { region: string; role: string; companies: Company[] }[] = [
  {
    region: "Qatar",
    role: "International business hub",
    companies: [
      { name: "Green Print", focus: "Printing, packaging, promotional solutions", logo: "/images/v2/companies/green-print.webp", url: "https://www.greenprintqatar.com/" },
      { name: "Brandscape", focus: "Advertising, branding, signage, events", logo: "/images/v2/companies/brandscape.webp", url: "https://www.brandscape.qa/" },
    ],
  },
  {
    region: "India",
    role: "Our foundation, Kerala",
    companies: [
      { name: "Be Positive Group Media", focus: "Advertising, digital, content, events, production", logo: "/images/v2/companies/group-media.webp", status: "Now active" },
      { name: "Be Positive Group Tourism", focus: "Travel, hospitality, leisure, wellness", logo: "/images/v2/companies/group-tourism.webp", status: "Coming soon" },
      { name: "Be Positive Group Trading", focus: "Sourcing, warehousing, logistics, distribution", logo: "/images/v2/companies/group-trading.webp", status: "Coming soon" },
    ],
  },
  {
    region: "China",
    role: "Sourcing and trading connection",
    companies: [
      { name: "Majee International Trading Co. Ltd.", focus: "International trading, sourcing, procurement", logo: "/images/v2/companies/majee.webp", url: "https://www.majeeinternational.com/", note: "In association with Be Positive Group" },
    ],
  },
];

// The prototype's news and awards are placeholders; these are real updates.
export const news = [
  {
    category: "Media",
    title: "BPG Media streams the Champions Boat League live",
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

// White transparent marks generated from the client JPGs. Swap for official SVGs.
export const clients = [
  { name: "Qatar Airways", src: "/images/v2/clients/qatar-airways.png", w: 267, h: 76 },
  { name: "Hamad International Airport", src: "/images/v2/clients/hamad-airport.png", w: 262, h: 94 },
  { name: "Ooredoo", src: "/images/v2/clients/ooredoo.png", w: 264, h: 47 },
  { name: "Qatar Foundation", src: "/images/v2/clients/qatar-foundation.png", w: 217, h: 158 },
  { name: "United Development Company", src: "/images/v2/clients/udc.png", w: 235, h: 151 },
  { name: "Qatar Duty Free", src: "/images/v2/clients/qatar-duty-free.png", w: 178, h: 159 },
];

export const contact = {
  intro:
    "Have an idea, requirement or opportunity? Tell us what you want to achieve and we will connect you with the right people across the group.",
  presence: "India (Kerala), Qatar, China",
  countries: ["India", "Qatar", "China", "Other"],
  interests: ["Media", "Tourism", "Trading", "Partnership", "General enquiry"],
};

export const footer = {
  columns: {
    Group: [
      { label: "About", href: "#about" },
      { label: "Verticals", href: "#verticals" },
      { label: "Presence", href: "#presence" },
      { label: "News", href: "#news" },
      { label: "Contact", href: "#contact" },
    ],
    Media: [
      { label: "Brand strategy", href: "#capabilities" },
      { label: "Advertising", href: "#capabilities" },
      { label: "Digital", href: "#capabilities" },
      { label: "Content production", href: "#capabilities" },
      { label: "Broadcast", href: "#capabilities" },
      { label: "Print & fabrication", href: "#capabilities" },
    ],
  },
};
