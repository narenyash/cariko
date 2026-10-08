import { Suspense } from "react";
import Link from "next/link";
import { fleet, hasRealPhoto, type Mode } from "@/content/fleet";
import type { CategoryId } from "@/content/categories";
import { getCategory } from "@/content/categories";
import FleetFilters from "@/components/FleetFilters";
import FleetCard from "@/components/FleetCard";
import Footer from "@/components/Footer";
import { site } from "@/content/site";

export const metadata = {
  title: "The fleet",
};

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function FleetPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? (params.category as CategoryId) : undefined;
  const brand = typeof params.brand === "string" ? params.brand : undefined;
  const modes = toArray(params.mode) as Mode[];

  const results = fleet.filter((v) => {
    if (category && v.category !== category) return false;
    if (brand && v.brand !== brand) return false;
    if (modes.length && !modes.some((m) => v.modes.includes(m))) return false;
    return true;
  }).sort((a, b) => Number(hasRealPhoto(b)) - Number(hasRealPhoto(a)));

  const activeCategory = category ? getCategory(category) : undefined;

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
        <h1 className="font-display text-4xl italic sm:text-5xl">
          {activeCategory ? activeCategory.label : "The fleet"}
        </h1>
        <p className="mt-3 max-w-xl text-bone/70">
          {activeCategory ? activeCategory.blurb : `${site.fleetSize} cars across ${site.brandCount} brands, filtered by occasion, brand, and how you want to be driven.`}
        </p>

        <Suspense fallback={<div className="mt-8 h-16 border-b border-line" />}>
          <div className="mt-6 sm:mt-8">
            <FleetFilters />
          </div>
        </Suspense>

        <p className="mt-6 text-sm text-slate">
          {results.length} car{results.length === 1 ? "" : "s"}
        </p>

        {results.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-line p-8 text-center">
            <p className="text-bone/80">No cars match those filters right now.</p>
            <Link href="/fleet" className="focus-ring mt-3 inline-block font-medium text-champagne hover:underline">
              Clear all filters
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {results.map((vehicle, i) => (
              <FleetCard key={vehicle.id} vehicle={vehicle} priority={i === 0} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
