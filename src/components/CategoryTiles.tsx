"use client";

import { useRef } from "react";
import Link from "next/link";
import { categories, type Category } from "@/content/categories";
import { fleet, hasRealPhoto } from "@/content/fleet";
import FleetCard from "@/components/FleetCard";

export default function CategoryTiles() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <h2 className="font-display text-4xl italic sm:text-5xl">The fleet, by category</h2>
      <p className="mt-3 max-w-xl text-slate">
        Every car we run, grouped by how people book it. Swipe each row &mdash; prices are estimates,
        confirmed on enquiry.
      </p>

      <div className="mt-14 space-y-16">
        {categories.map((category) => (
          <CategoryRow key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const railRef = useRef<HTMLDivElement>(null);

  const inCategory = fleet.filter((v) => v.category === category.id);
  // Front page is a demo — lead with cars that have real photos.
  const withPhotos = inCategory.filter(hasRealPhoto);
  const cars = withPhotos.length >= 2 ? withPhotos : inCategory;
  if (cars.length === 0) return null;

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
        <div>
          <h3 className="font-display text-2xl italic sm:text-3xl">{category.label}</h3>
          <p className="mt-1 max-w-md text-sm text-slate">{category.blurb}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Scroll ${category.label} left`}
            onClick={() => scrollBy(-1)}
            className="focus-ring hidden h-9 w-9 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:border-champagne hover:text-champagne sm:flex"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label={`Scroll ${category.label} right`}
            onClick={() => scrollBy(1)}
            className="focus-ring hidden h-9 w-9 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:border-champagne hover:text-champagne sm:flex"
          >
            &rarr;
          </button>
          <Link
            href={`/fleet?category=${category.id}`}
            className="focus-ring ml-1 shrink-0 rounded-full border border-line px-4 py-2 text-sm font-medium text-graphite transition-colors hover:border-champagne hover:text-champagne"
          >
            View all {inCategory.length} &rarr;
          </Link>
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cars.map((vehicle) => (
          <div key={vehicle.id} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
            <FleetCard vehicle={vehicle} />
          </div>
        ))}
      </div>
    </div>
  );
}
