import { apiInitializer } from "discourse/lib/api";
import { FORCE_FILL, ICON_MAP, WEIGHTS } from "../lib/icon-map";

export default apiInitializer((api) => {
  const configuredWeight = WEIGHTS.includes(settings.weight)
    ? settings.weight
    : "regular";

  const forceFill = new Set(FORCE_FILL);

  const ignored = new Set(
    (settings.ignored_icons || "")
      .split("|")
      .map((name) => name.trim())
      .filter(Boolean)
  );

  Object.entries(ICON_MAP).forEach(([faIcon, phosphorIcon]) => {
    if (ignored.has(faIcon)) {
      return;
    }

    const weight = forceFill.has(faIcon) ? "fill" : configuredWeight;
    api.replaceIcon(faIcon, `ph-${weight}-${phosphorIcon}`);
  });
});
