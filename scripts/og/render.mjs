// Renders og.html to src/app/opengraph-image.jpg and twitter-image.jpg (1200x630).
// Run: node scripts/og/render.mjs  (needs puppeteer-core and local Chrome)
import puppeteer from "puppeteer-core";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../..");
const png = path.join(dir, "og.png");

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--allow-file-access-from-files"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(`file://${path.join(dir, "og.html")}`, { waitUntil: "networkidle0" });
await page.screenshot({ path: png });
await browser.close();

for (const name of ["opengraph-image", "twitter-image"]) {
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "86", png, "--out", path.join(root, "src/app", `${name}.jpg`)]);
}
