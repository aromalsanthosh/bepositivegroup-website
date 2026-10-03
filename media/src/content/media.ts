// BPG Media site content. Stream data verified against the channel on
// 2026-10-03 (RSS feed + watch pages). Items marked CONFIRM need sign-off.

export const channel = {
  name: "BPG Media",
  youtubeId: "UCc8u0odNIZPyuaTJslrfACA",
  url: "https://www.youtube.com/@bepositivegroupmedia",
  subscribeUrl: "https://www.youtube.com/@bepositivegroupmedia?sub_confirmation=1",
  streamsUrl: "https://www.youtube.com/@bepositivegroupmedia/streams",
  // Always points at whatever the channel is broadcasting (or its next scheduled stream).
  liveEmbed:
    "https://www.youtube.com/embed/live_stream?channel=UCc8u0odNIZPyuaTJslrfACA&autoplay=1",
};

// CONFIRM: a media-specific advertising inbox. Group address used for now.
export const advertisingEmail = "contact@bepositivegroup.qa";

export const nav = [
  { label: "Live", href: "#live" },
  { label: "Races", href: "#races" },
  { label: "Gallery", href: "#gallery" },
  { label: "Advertise", href: "#advertise" },
  { label: "FAQ", href: "#faq" },
];

export type Stream = {
  id: string;
  title: string;
  titleMl: string;
  series: string;
  venue: string;
  /** ISO start time (UTC) */
  start: string;
  host?: string;
  thumbnail: string;
};

// CONFIRM: YouTube schedules the stream for 1:00 PM IST; the race poster says
// coverage runs from 2:30 PM.
export const upcoming: Stream[] = [
  {
    id: "lqhvSLz8RTs",
    title: "Kottapuram Boat Race",
    titleMl: "കോട്ടപ്പുറം ജലോത്സവം",
    series: "Champions Boat League, Season 6",
    venue: "Kottapuram",
    start: "2026-10-04T07:30:00Z",
    host: "Resmin Bai",
    thumbnail: "/images/races/lqhvSLz8RTs.webp",
  },
];

export type Race = {
  id: string;
  title: string;
  titleMl?: string;
  date: string;
  views?: number;
  durationMinutes?: number;
  thumbnail: string;
};

// Fallback when the YouTube feed is unreachable; the page prefers live RSS data.
export const pastRaces: Race[] = [
  {
    id: "7TlMjIDn7TU",
    title: "Champions Boat League 2026 at Karuvatta",
    titleMl: "ചാമ്പ്യൻസ് ബോട്ട് ലീഗ് 2026 കരുവാറ്റ",
    date: "2026-09-19T08:56:17Z",
    views: 2939,
    durationMinutes: 240,
    thumbnail: "/images/races/7TlMjIDn7TU.webp",
  },
  {
    id: "XwF68xOqJg0",
    title: "67th Uthradam Thirunal Pamba Boat Race 2026",
    titleMl: "67-ാം ഉത്രാടം തിരുനാൾ പമ്പ ജലോത്സവം",
    date: "2026-02-07T09:11:03Z",
    views: 16237,
    durationMinutes: 122,
    thumbnail: "/images/races/XwF68xOqJg0.webp",
  },
];

// Season 6 fixtures known so far (from the channel). Add races as they are announced.
export const season = {
  name: "Champions Boat League",
  edition: "Season 6",
  fixtures: [
    { venue: "Karuvatta", date: "2026-09-19", videoId: "7TlMjIDn7TU" },
    { venue: "Kottapuram", date: "2026-10-04", videoId: "lqhvSLz8RTs" },
  ],
};

// Real reach figures from the channel. CONFIRM ad formats with the sales team.
export const reach = [
  { value: "16K+", label: "views on the 67th Pamba Boat Race live stream" },
  { value: "4 hrs", label: "of continuous live coverage from CBL Karuvatta" },
  { value: "Season 6", label: "of the Champions Boat League on air" },
  { value: "Free", label: "to watch on YouTube, on any phone, laptop or TV" },
];

export const adFormats = [
  "On-screen branding during live coverage",
  "Sponsored race segments and replays",
  "On-air mentions by the live host",
  "Brand placement in highlight videos",
];

export const faqs = [
  {
    q: "Where can I watch the races?",
    a: "Every stream goes out live on the BPG Media YouTube channel and plays right here on this page. Full replays stay on the channel after each race.",
  },
  {
    q: "Is it free to watch?",
    a: "Yes. All live streams and replays are free on YouTube.",
  },
  {
    q: "Which races do you stream?",
    a: "Champions Boat League races and major Kerala water festivals such as the Uthradam Thirunal Pamba Boat Race. Upcoming streams are listed above as soon as they are scheduled.",
  },
  {
    q: "How do I get notified when a race goes live?",
    a: "Subscribe to the channel and tap the bell, or open an upcoming stream on YouTube and choose Notify me.",
  },
  {
    q: "How can my brand advertise during a stream?",
    a: "Email the BPG Media team with your brand, budget and the races you are interested in, and we will send available slots and rates.",
  },
];
