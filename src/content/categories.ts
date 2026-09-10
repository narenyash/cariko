export type CategoryId =
  | "wedding"
  | "ultra-luxury"
  | "luxury-sedans"
  | "luxury-suvs"
  | "convertibles-sports"
  | "self-drive-everyday";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "wedding",
    label: "Wedding & occasion",
    blurb: "Vintage cars, limousines, and decorated entrances, booked per event.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },
  {
    id: "ultra-luxury",
    label: "Ultra luxury",
    blurb: "Rolls-Royce, Bentley, Maybach — the cars that end up in the reel.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
  },
  {
    id: "luxury-sedans",
    label: "Luxury sedans",
    blurb: "Mercedes, BMW, Audi, Jaguar — for corporate travel and quiet arrivals.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
  },
  {
    id: "luxury-suvs",
    label: "Luxury SUVs",
    blurb: "Range Rover, Defender, GLS, X5 — height and presence for a convoy.",
    image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=1200&q=80",
  },
  {
    id: "convertibles-sports",
    label: "Convertibles & sports",
    blurb: "Cabriolets and the only 2-seater in the fleet, for the photo op.",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80",
  },
  {
    id: "self-drive-everyday",
    label: "Self-drive & everyday",
    blurb: "Thar, XUV700, Scorpio, Fortuner — verified licence, keys in your hand.",
    image: "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=1200&q=80",
  },
];

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}
