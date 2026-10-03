import { channel, pastRaces, upcoming, type Race } from "@/content/media";

const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.youtubeId}`;
const BOAT_RACE = /boat|race|vallam|jalo|cbl|ജലോ|ബോട്ട്/i;

function pick(entry: string, tag: string) {
  return entry.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]?.trim() ?? "";
}

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// "മലയാളം | ENGLISH TITLE | CBL ..." -> prefer the English part for the card title.
function englishTitle(raw: string) {
  const parts = raw.split("|").map((p) => p.trim()).filter(Boolean);
  const latin = parts.find((p) => /[A-Za-z]{4,}/.test(p) && !/^BPG MEDIA/i.test(p));
  const title = latin ?? raw;
  return title.charAt(0) + title.slice(1).toLowerCase().replace(/\b(\w)/g, (m) => m.toUpperCase());
}

/**
 * Past boat-race streams from the channel's RSS feed, newest first. Revalidates
 * hourly; falls back to the verified list if YouTube is unreachable.
 */
export async function getPastRaces(): Promise<Race[]> {
  try {
    const res = await fetch(FEED, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const xml = await res.text();
    const upcomingIds = new Set(upcoming.map((s) => s.id));
    const known = new Map(pastRaces.map((r) => [r.id, r]));

    const races = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, e]) => {
        const id = pick(e, "yt:videoId");
        const raw = decode(pick(e, "title"));
        const views = Number(e.match(/<media:statistics views="(\d+)"/)?.[1] ?? 0);
        const fallback = known.get(id);
        return {
          id,
          raw,
          race: {
            id,
            title: fallback?.title ?? englishTitle(raw),
            titleMl: fallback?.titleMl,
            date: fallback?.date ?? pick(e, "published"),
            views,
            durationMinutes: fallback?.durationMinutes,
            thumbnail: fallback?.thumbnail ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
          } satisfies Race,
        };
      })
      // Scheduled streams show 0 views until they air; keep those in "upcoming".
      .filter(({ id, raw, race }) => BOAT_RACE.test(raw) && !upcomingIds.has(id) && (race.views ?? 0) > 0)
      .map(({ race }) => race);

    return races.length ? races : pastRaces;
  } catch {
    return pastRaces;
  }
}
