import mapData from "@/content/map-dots.json";
import { markets } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { PresenceMap } from "@/components/presence-map";

// Equirectangular projection of the cropped region (Gulf to China). The dot
// grid is precomputed from Natural Earth land data (public domain) and drawn
// as ONE path of zero-length round-capped segments: thousands of dots, one node.
const W = 1080;
const [LON0, LON1, LAT0, LAT1] = mapData.bounds;
const H = Math.round((W * (LAT1 - LAT0)) / (LON1 - LON0));
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H;

const dotsPath = (mapData.dots as [number, number][])
  .map(([lon, lat]) => `M${px(lon).toFixed(1)} ${py(lat).toFixed(1)}h0`)
  .join("");

const points = Object.fromEntries(
  markets.map((m) => [m.id, [px(m.coords[0]), py(m.coords[1])] as [number, number]]),
);

export function Presence() {
  return (
    <section id="presence" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading
        label="Our presence"
        title="Connecting markets."
        accent="Crossing borders."
        intro="Rooted in Kerala, with an international hub in Doha and a sourcing connection in China."
      />
      <div className="mt-14">
        <PresenceMap dotsPath={dotsPath} width={W} height={H} points={points} />
      </div>
    </section>
  );
}
