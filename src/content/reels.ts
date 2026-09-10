/**
 * Real Instagram reels from @honeytravels. Each is rendered with Instagram's
 * official embed (see ReelRail). To add one, copy its share link and drop the
 * permalink below — the shortcode is the part after /reel/.
 */
export interface Reel {
  id: string;
  permalink: string;
  caption: string;
}

const shortcodes = [
  "DbP5GQetrKE",
  "CdYvAPYAfsL",
  "Cdkv_iFgAN4",
  "Dc7dt_yyc-7",
  "Dcygd78N7oc",
];

export const reels: Reel[] = shortcodes.map((code) => ({
  id: `reel-${code}`,
  permalink: `https://www.instagram.com/reel/${code}/`,
  caption: "On the road with Honey Travels",
}));
