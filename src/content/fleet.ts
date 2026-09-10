import type { CategoryId } from "./categories";

export type Transmission = "Automatic" | "Manual" | "N/A";
export type Mode = "wedding" | "chauffeur" | "self-drive";
export type Decoration = "included" | "extra" | "not-offered";

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  seats: number;
  transmission: Transmission;
  modes: Mode[];
  decoration: Decoration;
  note?: string;
  images: string[];
  available: boolean;
}

/**
 * Stock placeholder photography — the real catalog images are decorated,
 * low-resolution WhatsApp exports. Every car below needs two real shoots
 * (clean + decorated) before this pool is retired. See build notes.
 */
const PHOTO_POOL = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=80",
  "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=1400&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&q=80",
  "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=1400&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1400&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1400&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1400&q=80",
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1400&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1400&q=80",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1400&q=80",
  "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1400&q=80",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1400&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1400&q=80",
  "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1400&q=80",
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1400&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1400&q=80",
  "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=1400&q=80",
  "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1400&q=80",
  "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=1400&q=80",
];

let cursor = 0;
function photos(count = 2): string[] {
  const picked: string[] = [];
  for (let i = 0; i < count; i++) {
    picked.push(PHOTO_POOL[cursor % PHOTO_POOL.length]);
    cursor++;
  }
  return picked;
}

/**
 * Still stock, still not the client's actual car, but at least the right
 * body shape (SUV art for an SUV listing, a convertible for a convertible).
 * Deliberately excluded from REAL_PHOTOS so the gallery keeps showing the
 * "placeholder" flag — these are a closer-guess placeholder, not a real one.
 */
const PREFERRED_STOCK: Record<string, string> = {
  "mercedes-g-wagon": "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1400&q=80",
  "toyota-fortuner-new-model": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1400&q=80",
  "land-rover-defender-brand-new": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1400&q=80",
  "kia-seltos": "https://images.unsplash.com/photo-1600661653561-629509216228?w=1400&q=80",
  "mg-hector": "https://images.unsplash.com/photo-1600661653561-629509216228?w=1400&q=80",
  "bmw-z4-convertible": "https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=1400&q=80",
  "audi-a3-cabriolet": "https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=1400&q=80",
  "porsche-911": "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=1400&q=80",
  "dc-avanti": "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=1400&q=80",
  "ferrari-replica": "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1400&q=80",
  "bmw-320d": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1400&q=80",
  "audi-tt": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1400&q=80",
};

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface RawVehicle {
  name: string;
  brand: string;
  category: CategoryId;
  seats: number;
  transmission: Transmission;
  modes: Mode[];
  decoration: Decoration;
  note?: string;
  available?: boolean;
}

const raw: RawVehicle[] = [
  // ---- Wedding & occasion: vintage ----
  { name: "Vintage Rolls-Royce (white)", brand: "Rolls-Royce", category: "wedding", seats: 4, transmission: "Manual", modes: ["wedding"], decoration: "included" },
  { name: "Vintage Rolls-Royce (red)", brand: "Rolls-Royce", category: "wedding", seats: 4, transmission: "Manual", modes: ["wedding"], decoration: "included" },
  { name: "Chevrolet Impala (vintage)", brand: "Chevrolet", category: "wedding", seats: 5, transmission: "Automatic", modes: ["wedding"], decoration: "included" },
  { name: "Vintage car (assorted)", brand: "Assorted", category: "wedding", seats: 4, transmission: "Manual", modes: ["wedding"], decoration: "included", note: "Several vintage cars rotate through this listing — ask which is available for your date." },

  // ---- Wedding & occasion: limousines ----
  { name: "Limousine (white & blue)", brand: "Limousine", category: "wedding", seats: 8, transmission: "Automatic", modes: ["wedding"], decoration: "included" },
  { name: "Lincoln Limousine", brand: "Lincoln", category: "wedding", seats: 8, transmission: "Automatic", modes: ["wedding"], decoration: "included" },
  { name: "Audi Limousine", brand: "Audi", category: "wedding", seats: 6, transmission: "Automatic", modes: ["wedding"], decoration: "included", note: "A rare car in Ahmedabad." },
  { name: "Stretch Limousine (white)", brand: "Limousine", category: "wedding", seats: 8, transmission: "Automatic", modes: ["wedding"], decoration: "included" },

  // ---- Wedding & occasion: open and novelty ----
  { name: "Open Jeep", brand: "Jeep", category: "wedding", seats: 6, transmission: "Manual", modes: ["wedding"], decoration: "included" },
  { name: "Golden Jeep", brand: "Jeep", category: "wedding", seats: 6, transmission: "Manual", modes: ["wedding"], decoration: "included" },
  { name: "Monster Jeep (broad tyres)", brand: "Jeep", category: "wedding", seats: 4, transmission: "Manual", modes: ["wedding"], decoration: "included" },
  { name: "Baraat on Wheels", brand: "Novelty", category: "wedding", seats: 10, transmission: "Automatic", modes: ["wedding"], decoration: "included" },
  { name: "Vanity Van (picnic vehicle)", brand: "Novelty", category: "wedding", seats: 12, transmission: "Automatic", modes: ["wedding"], decoration: "not-offered" },

  // ---- Wedding & occasion: air ----
  { name: "Helicopter (3+1 seater)", brand: "Aviation", category: "wedding", seats: 4, transmission: "N/A", modes: ["wedding"], decoration: "not-offered", note: "Subject to weather clearance and landing-site approval." },

  // ---- Ultra luxury ----
  { name: "Rolls-Royce Ghost", brand: "Rolls-Royce", category: "ultra-luxury", seats: 4, transmission: "Automatic", modes: ["wedding", "chauffeur"], decoration: "extra" },
  { name: "Rolls-Royce Phantom", brand: "Rolls-Royce", category: "ultra-luxury", seats: 4, transmission: "Automatic", modes: ["wedding", "chauffeur"], decoration: "extra" },
  { name: "Rolls-Royce (golden)", brand: "Rolls-Royce", category: "ultra-luxury", seats: 4, transmission: "Automatic", modes: ["wedding", "chauffeur"], decoration: "extra" },
  { name: "Bentley", brand: "Bentley", category: "ultra-luxury", seats: 4, transmission: "Automatic", modes: ["wedding", "chauffeur"], decoration: "extra" },
  { name: "Mercedes-Maybach S-Class", brand: "Mercedes-Benz", category: "ultra-luxury", seats: 4, transmission: "Automatic", modes: ["wedding", "chauffeur"], decoration: "extra" },
  { name: "Porsche Panamera (grey)", brand: "Porsche", category: "ultra-luxury", seats: 4, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Porsche 911", brand: "Porsche", category: "ultra-luxury", seats: 2, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Mercedes G-Wagon", brand: "Mercedes-Benz", category: "ultra-luxury", seats: 5, transmission: "Automatic", modes: ["wedding", "chauffeur", "self-drive"], decoration: "extra" },
  { name: "Hummer H3", brand: "Hummer", category: "ultra-luxury", seats: 5, transmission: "Automatic", modes: ["wedding", "chauffeur", "self-drive"], decoration: "extra" },
  { name: "DC Avanti", brand: "DC", category: "ultra-luxury", seats: 2, transmission: "Manual", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Ferrari (replica)", brand: "Ferrari", category: "ultra-luxury", seats: 2, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered", note: "Replica body kit — disclosed upfront, ask for details." },

  // ---- Luxury sedans: Mercedes ----
  { name: "Mercedes S-Class", brand: "Mercedes-Benz", category: "luxury-sedans", seats: 4, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Mercedes E-Class (brand new)", brand: "Mercedes-Benz", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Mercedes C-Class 2023 (brand new)", brand: "Mercedes-Benz", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Mercedes CLA", brand: "Mercedes-Benz", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },

  // ---- Luxury sedans: BMW ----
  { name: "BMW 5 Series (G30)", brand: "BMW", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "BMW 320d", brand: "BMW", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "BMW GT", brand: "BMW", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },

  // ---- Luxury sedans: Audi ----
  { name: "Audi A6", brand: "Audi", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered", note: "The budget-friendly luxury option." },
  { name: "Audi A7 Sportback", brand: "Audi", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered", note: "Rare in Ahmedabad." },

  // ---- Luxury sedans: Jaguar ----
  { name: "Jaguar XJL", brand: "Jaguar", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Jaguar XF (new model)", brand: "Jaguar", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Jaguar XF (budget friendly)", brand: "Jaguar", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered", note: "The value pick in the Jaguar line-up." },
  { name: "Jaguar XE (new model)", brand: "Jaguar", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },

  // ---- Luxury sedans: other ----
  { name: "Volvo S90 (brand new)", brand: "Volvo", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Honda Civic", brand: "Honda", category: "luxury-sedans", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },

  // ---- Luxury SUVs ----
  { name: "Range Rover Vogue", brand: "Land Rover", category: "luxury-suvs", seats: 5, transmission: "Automatic", modes: ["wedding", "chauffeur", "self-drive"], decoration: "extra" },
  { name: "Range Rover Evoque (brand new)", brand: "Land Rover", category: "luxury-suvs", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Land Rover Defender (brand new)", brand: "Land Rover", category: "luxury-suvs", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Mercedes GLS", brand: "Mercedes-Benz", category: "luxury-suvs", seats: 7, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "BMW X5 (2023, brand new)", brand: "BMW", category: "luxury-suvs", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Audi Q7 (new model)", brand: "Audi", category: "luxury-suvs", seats: 7, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Audi Q5", brand: "Audi", category: "luxury-suvs", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Toyota Vellfire (brand new)", brand: "Toyota", category: "luxury-suvs", seats: 7, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered", note: "The most comfortable car in the fleet." },

  // ---- Convertibles & sports ----
  { name: "Audi A3 Cabriolet", brand: "Audi", category: "convertibles-sports", seats: 4, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "Audi TT", brand: "Audi", category: "convertibles-sports", seats: 4, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "BMW Z4 Convertible", brand: "BMW", category: "convertibles-sports", seats: 2, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered", note: "The only 2-seater in the fleet." },
  { name: "BMW Convertible", brand: "BMW", category: "convertibles-sports", seats: 4, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },
  { name: "MG Hector", brand: "MG", category: "convertibles-sports", seats: 5, transmission: "Automatic", modes: ["chauffeur", "self-drive"], decoration: "not-offered" },

  // ---- Self-drive & everyday: Mahindra ----
  { name: "Thar 4x4 Automatic", brand: "Mahindra", category: "self-drive-everyday", seats: 4, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Thar Rox", brand: "Mahindra", category: "self-drive-everyday", seats: 5, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Thar (new model)", brand: "Mahindra", category: "self-drive-everyday", seats: 4, transmission: "Manual", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "XUV 700", brand: "Mahindra", category: "self-drive-everyday", seats: 7, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Scorpio Classic S11", brand: "Mahindra", category: "self-drive-everyday", seats: 7, transmission: "Manual", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Scorpio (black)", brand: "Mahindra", category: "self-drive-everyday", seats: 7, transmission: "Manual", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },

  // ---- Self-drive & everyday: Tata ----
  { name: "Tata Safari (7 seater)", brand: "Tata", category: "self-drive-everyday", seats: 7, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Tata Harrier", brand: "Tata", category: "self-drive-everyday", seats: 5, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },

  // ---- Self-drive & everyday: Toyota ----
  { name: "Toyota Fortuner (new model)", brand: "Toyota", category: "self-drive-everyday", seats: 7, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Innova Crysta (2024)", brand: "Toyota", category: "self-drive-everyday", seats: 7, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered", note: "Also offered as a taxi for local and outstation trips." },

  // ---- Self-drive & everyday: Kia ----
  { name: "Kia Carnival (brand new)", brand: "Kia", category: "self-drive-everyday", seats: 7, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Kia Seltos", brand: "Kia", category: "self-drive-everyday", seats: 5, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },

  // ---- Self-drive & everyday: Hyundai / Skoda ----
  { name: "Hyundai Verna (2023, sunroof)", brand: "Hyundai", category: "self-drive-everyday", seats: 5, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Hyundai i20 (sunroof, top model, petrol)", brand: "Hyundai", category: "self-drive-everyday", seats: 5, transmission: "Manual", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
  { name: "Skoda Slavia (auto, sunroof)", brand: "Skoda", category: "self-drive-everyday", seats: 5, transmission: "Automatic", modes: ["self-drive", "chauffeur"], decoration: "not-offered" },
];

/**
 * Real catalog photos, dropped in by the business — one per vehicle so far.
 * Everything not listed here still falls back to the Unsplash placeholder
 * pool until a real photo is supplied. Paths are served from /public/fleet.
 */
const REAL_PHOTOS: Record<string, string[]> = {
  "audi-a3-cabriolet": ["/fleet/audi-a3-cabriolet.jpg"],
  "audi-a7-sportback": ["/fleet/audi-a7-sportback.jpg"],
  "audi-q7-new-model": ["/fleet/audi-q7-new-model.jpg"],
  "scorpio-black": ["/fleet/scorpio-black.jpg"],
  "jaguar-xjl": ["/fleet/jaguar-xjl.jpg"],
  "jaguar-xf-new-model": ["/fleet/jaguar-xf-new-model.jpg"],
  "limousine-white-blue": ["/fleet/limousine-white-blue.jpg"],
  "mercedes-cla": ["/fleet/mercedes-cla.jpg"],
  "mercedes-s-class": ["/fleet/mercedes-s-class.jpg"],
  "mercedes-c-class-2023-brand-new": ["/fleet/mercedes-c-class-2023-brand-new.jpg"],
  "tata-harrier": ["/fleet/tata-harrier.jpg"],
  "tata-safari-7-seater": ["/fleet/tata-safari-7-seater.jpg"],
  "thar-new-model": ["/fleet/thar-new-model.jpg"],
  "volvo-s90-brand-new": ["/fleet/volvo-s90-brand-new.jpg"],
  "xuv-700": ["/fleet/xuv-700.jpg"],
  bentley: ["/fleet/bentley.jpg"],
  "bmw-5-series-g30": ["/fleet/bmw-5-series-g30.jpg"],
  "bmw-convertible": ["/fleet/bmw-convertible.jpg"],
  "bmw-x5-2023-brand-new": ["/fleet/bmw-x5-2023-brand-new.jpg"],
  "stretch-limousine-white": ["/fleet/stretch-limousine-white.jpg"],
  "lincoln-limousine": ["/fleet/lincoln-limousine.jpg"],
  "range-rover-evoque-brand-new": ["/fleet/range-rover-evoque-brand-new.jpg"],
  "range-rover-vogue": ["/fleet/range-rover-vogue.jpg"],
  "rolls-royce-golden": ["/fleet/rolls-royce-golden.jpg"],
  "rolls-royce-phantom": ["/fleet/rolls-royce-phantom.jpg"],
  "rolls-royce-ghost": ["/fleet/rolls-royce-ghost.jpg"],
  "audi-q5": ["/fleet/audi-q5.jpg"],
  "bmw-gt": ["/fleet/bmw-gt.jpg"],
  "chevrolet-impala-vintage": ["/fleet/chevrolet-impala-vintage.jpg"],
  "mercedes-gls": ["/fleet/mercedes-gls.jpg"],
  "thar-4x4-automatic": ["/fleet/thar-4x4-automatic.jpg"],
  "mercedes-g-wagon": ["/fleet/mercedes-g-wagon.jpg"],
  "hummer-h3": ["/fleet/hummer-h3.jpg"],
  "ferrari-replica": ["/fleet/ferrari-replica.jpg"],
  "toyota-vellfire-brand-new": ["/fleet/toyota-vellfire-brand-new.jpg"],
  "audi-limousine": ["/fleet/audi-limousine.jpg"],
};

/** True when the vehicle has a real catalog photo (not an Unsplash placeholder). */
export function hasRealPhoto(vehicle: Vehicle) {
  return vehicle.images[0]?.startsWith("/fleet/") ?? false;
}

export const fleet: Vehicle[] = raw.map((v) => {
  const id = slug(v.name);
  return {
    ...v,
    id,
    available: v.available ?? true,
    images: REAL_PHOTOS[id] ?? (PREFERRED_STOCK[id] ? [PREFERRED_STOCK[id]] : photos(2)),
  };
});

export const brands = Array.from(new Set(fleet.map((v) => v.brand))).sort();

export function getVehicle(id: string) {
  return fleet.find((v) => v.id === id);
}

/** Avoids "Mahindra Mahindra Thar"-style duplication when name already includes the brand. */
export function displayTitle(vehicle: Vehicle) {
  return vehicle.name.toLowerCase().startsWith(vehicle.brand.toLowerCase())
    ? vehicle.name
    : `${vehicle.brand} ${vehicle.name}`;
}
