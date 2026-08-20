# Discourse Phosphor Icons

A Discourse theme component. Replaces the default Font Awesome icons with the open-source [Phosphor](https://phosphoricons.com/) icon set.

The `weight` setting lets you pick the Phosphor style used across the whole site: `light`, `regular`, `bold`, or `duotone`. Phosphor's `fill` weight isn't offered as a global style — filled is treated as a product state and applied only to "active" icons (a liked heart, a bookmarked post, a checked box, etc.), so those stay solid regardless of the chosen weight.

## Requirements

Requires a Discourse version that supports the `icon_set` declaration in `about.json`. Discourse 2026.8 and earlier are pinned automatically to the previous runtime implementation through `d-compat` branches; core must ship `icon_set` support before this component's main branch is used on a later version.

## Settings

- **weight** — the Phosphor weight to apply (`light`, `regular`, `bold`, `duotone`).
- **ignored_icons** — Font Awesome icons to leave untouched (keeps the default icon instead of the Phosphor replacement).

Not every Font Awesome icon has a direct Phosphor equivalent. To map additional icons, see [Replace Discourse's default SVG icons with custom icons in a theme](https://meta.discourse.org/t/replace-discourses-default-svg-icons-with-custom-icons-in-a-theme/115905).

## Developing

The Font Awesome → Phosphor mappings live in [`scripts/icon-map.mjs`](scripts/icon-map.mjs). After editing them, regenerate the build output from [`@phosphor-icons/core`](https://github.com/phosphor-icons/core):

```sh
pnpm install
pnpm build
```

`pnpm build` runs [`scripts/generate-sprite.mjs`](scripts/generate-sprite.mjs), which writes two committed files: `assets/icons-sprite.svg` (one `<symbol>` per weight) and `assets/icon-map.json` (the map `about.json` points at). Commit both.

The component ships no JavaScript. `about.json` declares an `icon_set`, and Discourse resolves that map server-side, serving each mapped glyph under its canonical icon id — so only the weight actually in use is bundled. Raw `ph-*` ids are not shipped automatically, so a client-only call such as `api.replaceIcon("x", "ph-duotone-star")` will not make that target available. Downstream code should use canonical icon ids or explicitly register a raw source id server-side.

## Attribution

This theme component includes icon assets from [Phosphor Icons](https://phosphoricons.com/).

See [LICENSE_PHOSPHOR](LICENSE_PHOSPHOR) for the Phosphor license text.
