import type { CategoryId } from "./categories";

/**
 * These are visibly-labeled ESTIMATED ranges, not confirmed rates — the
 * business has not yet supplied per-vehicle pricing, deposits, or km caps.
 * Every place these are shown must say "estimated" and push to an enquiry,
 * never present a number as a firm quote.
 */
export interface CategoryPricing {
  category: CategoryId;
  unit: "per event" | "per day";
  low: number;
  high: number;
  depositLow?: number;
  depositHigh?: number;
  kmIncluded?: number;
  kmOverageNote?: string;
}

export const categoryPricing: Record<CategoryId, CategoryPricing> = {
  wedding: {
    category: "wedding",
    unit: "per event",
    low: 15000,
    high: 150000,
    kmOverageNote: "Hours and kilometres covered vary by car and function — confirmed on enquiry.",
  },
  "ultra-luxury": {
    category: "ultra-luxury",
    unit: "per day",
    low: 40000,
    high: 120000,
    depositLow: 200000,
    depositHigh: 500000,
    kmIncluded: 150,
  },
  "luxury-sedans": {
    category: "luxury-sedans",
    unit: "per day",
    low: 8000,
    high: 26000,
    depositLow: 40000,
    depositHigh: 80000,
    kmIncluded: 250,
  },
  "luxury-suvs": {
    category: "luxury-suvs",
    unit: "per day",
    low: 10000,
    high: 30000,
    depositLow: 50000,
    depositHigh: 90000,
    kmIncluded: 250,
  },
  "convertibles-sports": {
    category: "convertibles-sports",
    unit: "per day",
    low: 15000,
    high: 45000,
    depositLow: 100000,
    depositHigh: 300000,
    kmIncluded: 150,
  },
  "self-drive-everyday": {
    category: "self-drive-everyday",
    unit: "per day",
    low: 2500,
    high: 8500,
    depositLow: 10000,
    depositHigh: 50000,
    kmIncluded: 250,
  },
};

export function formatRange(low: number, high: number) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
  return `${fmt(low)} – ${fmt(high)}`;
}
