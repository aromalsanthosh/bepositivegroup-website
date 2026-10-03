// Homepage content. Sourced from bepositivegroup.com and the group company
// sites (see research/bepositivegroup). Items marked CONFIRM need sign-off
// from the client before launch.

export const nav = [
  { label: "About", href: "#about" },
  { label: "Companies", href: "#companies" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export const quoteCta = {
  label: "Request a quote",
  href: "#contact",
};

export const contactEmail = "contact@bepositivegroup.qa";

export const clients = [
  { name: "Qatar Airways", src: "/images/clients/qatar-airways.jpg" },
  { name: "Hamad International Airport", src: "/images/clients/hamad-airport.jpg" },
  { name: "Ooredoo", src: "/images/clients/ooredoo.jpg" },
  { name: "Qatar Foundation", src: "/images/clients/qatar-foundation.jpg" },
  { name: "United Development Company", src: "/images/clients/udc.jpg" },
  { name: "Qatar Duty Free", src: "/images/clients/qatar-duty-free.jpg" },
];

// CONFIRM: projects and clients come from brandscape.qa. Replace with
// group-wide figures once the client provides them.
export const stats = [
  { value: "2010", label: "Established in Doha", count: false },
  { value: "4", label: "Specialist companies" },
  { value: "530+", label: "Projects delivered" },
  { value: "450+", label: "Clients served" },
];

export type Company = {
  name: string;
  discipline: string;
  description: string;
  url?: string;
  // Official logo (from the group site's company cards) on a transparent background.
  logo: { src: string; width: number; height: number };
  image: { src: string; alt: string };
};

export const companies: Company[] = [
  {
    name: "Green Print",
    logo: { src: "/images/companies/green-print.png", width: 289, height: 197 },
    discipline: "Commercial printing",
    description:
      "Offset, digital and screen printing, premium packaging, PU-leather goods and corporate gifts.",
    url: "https://www.greenprintqatar.com/",
    image: {
      src: "/images/work/print-production.jpg",
      alt: "Large-format printer heads printing a full-colour banner",
    },
  },
  {
    name: "Brandscape Advertising",
    logo: { src: "/images/companies/brandscape-advertising.png", width: 387, height: 141 },
    discipline: "Signage and brand activation",
    description:
      "Signage fabrication, LED signboards, vehicle branding, kiosks, exhibition stands and event production.",
    url: "http://brandscape.qa/",
    image: {
      src: "/images/work/ooredoo-kiosk.jpg",
      alt: "Branded Ooredoo retail kiosk with illuminated red graphics",
    },
  },
  {
    name: "Brandscape Fitout",
    logo: { src: "/images/companies/brandscape-fitout.png", width: 382, height: 94 },
    discipline: "Interior design and fit-out",
    description:
      "Space planning, interior design, design and build, MEP works and bespoke joinery for workplaces and retail.",
    url: "http://brandscapefitout.com/",
    image: {
      src: "/images/work/boardroom-fitout.jpg",
      alt: "Boardroom fit-out with timber slatted ceiling and long meeting table",
    },
  },
  {
    // CONFIRM: brandscape.shop currently returns a DNS error, so no link yet.
    name: "Brandscape.Shop",
    logo: { src: "/images/companies/brandscape-shop.png", width: 354, height: 55 },
    discipline: "Furniture",
    description:
      "Functional, well-made furniture for offices, retail spaces and hospitality.",
    image: {
      src: "/images/work/furniture-lounge.jpg",
      alt: "Lounge interior with sofa, timber cabinetry and a red rug",
    },
  },
];

export type Capability = {
  title: string;
  note: string;
  image: { src: string; alt: string };
  span: string;
};

// CONFIRM: project notes are inferred from the group's portfolio images.
export const capabilities: Capability[] = [
  {
    title: "Interior fit-out",
    note: "Ooredoo customer service centre",
    image: {
      src: "/images/work/ooredoo-service-centre.jpg",
      alt: "Ooredoo customer service centre with red branded walls and service desks",
    },
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Signage",
    note: "Pylon sign for Coastal Qatar",
    image: {
      src: "/images/work/coastal-pylon.jpg",
      alt: "Tall red and white Coastal Qatar pylon sign against a blue sky",
    },
    span: "",
  },
  {
    title: "Exhibition stands",
    note: "Qatar Airways stand design",
    image: {
      src: "/images/work/qatar-airways-stand.jpg",
      alt: "Qatar Airways exhibition stand with white lounge seating",
    },
    span: "",
  },
  {
    title: "Commercial printing",
    note: "Offset, digital and UV printing in-house",
    image: {
      src: "/images/work/uv-printing.jpg",
      alt: "Flatbed UV printer in the production workshop",
    },
    span: "lg:col-span-2",
  },
  {
    title: "Retail and kiosks",
    note: "Ooredoo flagship store",
    image: {
      src: "/images/work/ooredoo-store.jpg",
      alt: "Ooredoo store front with red signage and branded displays",
    },
    span: "lg:col-span-2",
  },
  {
    title: "Vehicle branding",
    note: "Qatar Airways fleet graphics",
    image: {
      src: "/images/work/qatar-airways-bus.jpg",
      alt: "Coach wrapped in Qatar Airways livery",
    },
    span: "",
  },
  {
    title: "Gifts and promotional",
    note: "Branded merchandise and packaging",
    image: {
      src: "/images/work/corporate-gifts.png",
      alt: "Branded caps, polo shirts, umbrellas, bottles and bags",
    },
    span: "",
  },
];

// From the group's recruitment poster.
export const roles = [
  "Fit-out supervisors",
  "Finishing carpenters",
  "Signage technicians",
  "Aluminium fabricators",
  "Spray painters",
  "Electricians",
  "Print operators",
  "Project managers",
];

export const address = {
  lines: [
    "Street 38, Zone 57, Industrial Area",
    "Near New Industrial Area Gate",
    "P.O. Box 40725, Doha, Qatar",
  ],
  mapUrl: "https://maps.google.com/?q=25.172736,51.418754",
};

export const offices = [
  {
    name: "Brandscape Advertising",
    building: "Building 25",
    phone: "+974 4465 5701",
    email: "admin@brandscape.qa",
  },
  {
    name: "Green Print",
    building: "Building 63",
    phone: "+974 4441 2120",
    email: "info@greenprintqatar.com",
  },
  {
    name: "Brandscape Fitout",
    building: "Building 90",
    phone: "+974 4441 2120",
    email: "info@brandscapefitout.com",
  },
];

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/bepositivegroupqa/" },
  { label: "Facebook", href: "https://www.facebook.com/bepositivegroupqa" },
];
