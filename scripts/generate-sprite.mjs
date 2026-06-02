// Generates assets/icons-sprite.svg from @phosphor-icons/core (run `pnpm build`).
// Emits one <symbol> per selectable weight as `ph-{weight}-{name}`, plus a
// `ph-fill-{name}` for each FORCE_FILL icon. All weights ship in one sprite
// because Discourse inlines a theme's whole sprite — per-weight loading would
// need core support.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  FORCE_FILL,
  ICON_MAP,
  WEIGHTS,
} from "../javascripts/discourse/lib/icon-map.js";

const STATE_WEIGHT = "fill";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
// @phosphor-icons/core blocks deep imports via its exports map, so reach the
// raw SVG assets through node_modules directly.
const assetsDir = join(
  root,
  "node_modules",
  "@phosphor-icons",
  "core",
  "assets"
);

function svgPath(name, weight) {
  const file = weight === "regular" ? `${name}.svg` : `${name}-${weight}.svg`;
  return join(assetsDir, weight, file);
}

function buildSymbol(name, weight) {
  let raw;
  try {
    raw = readFileSync(svgPath(name, weight), "utf8");
  } catch {
    throw new Error(`Missing Phosphor asset: ${weight}/${name}`);
  }
  // Strip the outer <svg ...> wrapper, keeping only the inner shapes.
  const inner = raw
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim();
  return `  <symbol viewBox="0 0 256 256" fill="currentColor" id="ph-${weight}-${name}">${inner}</symbol>`;
}

const names = [...new Set(Object.values(ICON_MAP))].sort();
// The `fill` variant is only needed for the icons we force to a filled state.
const fillNames = [...new Set(FORCE_FILL.map((fa) => ICON_MAP[fa]))].sort();

const symbols = [];
for (const name of names) {
  for (const weight of WEIGHTS) {
    symbols.push(buildSymbol(name, weight));
  }
}
for (const name of fillNames) {
  symbols.push(buildSymbol(name, STATE_WEIGHT));
}

const sprite = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${symbols.join("\n")}
</svg>
`;

mkdirSync(join(root, "assets"), { recursive: true });
writeFileSync(join(root, "assets", "icons-sprite.svg"), sprite);

// eslint-disable-next-line no-console
console.log(
  `Wrote ${symbols.length} symbols (${names.length} icons × ${WEIGHTS.length} weights + ${fillNames.length} fill states).`
);
