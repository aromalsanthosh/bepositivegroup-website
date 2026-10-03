// All times are shown in India Standard Time, where the races happen.
// Fixed time zone keeps server and client output identical (no hydration drift).
export function formatIst(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", ...opts }).format(new Date(iso));
}

export function formatViews(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h} hr${h > 1 ? "s" : ""}${m ? ` ${m} min` : ""}` : `${m} min`;
}
