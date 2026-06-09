# Discourse Phosphor Icons

A Discourse theme component. Replaces the default Font Awesome icons with the open-source [Phosphor](https://phosphoricons.com/) icon set.

The `weight` setting lets you pick the Phosphor style used across the whole site: `light`, `regular`, `bold`, or `duotone`. Phosphor's `fill` weight isn't offered as a global style — filled is treated as a product state and applied only to "active" icons (a liked heart, a bookmarked post, a checked box, etc.), so those stay solid regardless of the chosen weight.

## Settings

- **weight** — the Phosphor weight to apply (`light`, `regular`, `bold`, `duotone`).
- **ignored_icons** — Font Awesome icons to leave untouched (keeps the default icon instead of the Phosphor replacement).

Not every Font Awesome icon has a direct Phosphor equivalent. To map additional icons, see [Replace Discourse's default SVG icons with custom icons in a theme](https://meta.discourse.org/t/replace-discourses-default-svg-icons-with-custom-icons-in-a-theme/115905).

## Developing

The Font Awesome → Phosphor mappings live in [`javascripts/discourse/lib/icon-map.js`](javascripts/discourse/lib/icon-map.js) (used both at runtime by the initializer and at build time). After editing them, regenerate the sprite from [`@phosphor-icons/core`](https://github.com/phosphor-icons/core):

```sh
pnpm install
pnpm build
```

`pnpm build` runs [`scripts/generate-sprite.mjs`](scripts/generate-sprite.mjs), which writes `assets/icons-sprite.svg`. The initializer (`javascripts/discourse/api-initializers/phosphor-icons.js`) is a regular source file — no codegen.

## Attribution

This theme component includes icon assets from [Phosphor Icons](https://phosphoricons.com/).

See [LICENSE_PHOSPHOR](LICENSE_PHOSPHOR) for the Phosphor license text.
