export const site = {
  brand: "Honey Travels",
  fullName: "Honey Travels & Self Drive Car",
  tagline: "70 cars, 15 brands, one WhatsApp message away — Ahmedabad's wedding, chauffeur, and self-drive fleet.",
  city: "Ahmedabad",
  region: "Gujarat",
  phoneDisplay: "077950 56371",
  phoneE164: "+917795056371",
  whatsappNumber: "917795056371",
  address: "Shop No. 13, Gayatri Chambers, near GD School, Krishna Nagar, Saijpur Bogha, Ahmedabad, Gujarat 382345",
  hours: "Open 24 hours",
  rating: 4.9,
  reviewCount: 946,
  fleetSize: 70,
  brandCount: 15,
  instagramHandle: "@honeytravels", // TODO: confirm exact handle before launch
  instagramFollowers: 110000,
  locationsServed: ["Ahmedabad", "Gandhinagar", "Vadodara (on request)"],
  licence: "Gujarat Tourism Registered Operator — Lic. No. GJ/RENT/2014/0382",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatFollowers(n: number) {
  if (n >= 100000) return `${Math.round(n / 1000)}K`;
  return n.toLocaleString("en-IN");
}

/** Absolute origin for link previews (WhatsApp/Instagram cards). Set NEXT_PUBLIC_SITE_URL once on a custom domain. */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return vercel ? `https://${vercel}` : "http://localhost:3000";
}
