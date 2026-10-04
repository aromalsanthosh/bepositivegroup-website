import { brand, fallbackStream } from "@/content/site";

export type Stream = { id: string; title: string; published: string; thumbnail: string };

const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${brand.youtubeChannelId}`;

const pick = (entry: string, tag: string) =>
  entry.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]?.trim() ?? "";

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// Titles read "മലയാളം | ENGLISH TITLE | CBL ...": keep the English part, title-cased.
function englishTitle(raw: string) {
  const parts = raw.split("|").map((p) => p.trim()).filter(Boolean);
  const latin = parts.find((p) => /[A-Za-z]{4,}/.test(p) && !/^BPG MEDIA/i.test(p)) ?? raw;
  const small = new Set(["a", "an", "and", "at", "for", "in", "of", "on", "the", "to"]);
  return latin
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => (i > 0 && small.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/**
 * Newest video on the BPG Media channel that has aired (scheduled streams show
 * 0 views). Revalidates hourly; falls back to a known stream if YouTube is
 * unreachable.
 */
export async function getLatestStream(): Promise<Stream> {
  try {
    const res = await fetch(FEED, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const xml = await res.text();
    for (const [, e] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const views = Number(e.match(/<media:statistics views="(\d+)"/)?.[1] ?? 0);
      if (!views) continue;
      const id = pick(e, "yt:videoId");
      return {
        id,
        title: englishTitle(decode(pick(e, "title"))),
        published: pick(e, "published"),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    }
    throw new Error("no aired videos");
  } catch {
    return fallbackStream;
  }
}
