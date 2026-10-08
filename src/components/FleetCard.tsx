import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/content/fleet";
import { categoryPricing, formatRange } from "@/content/pricing";
import { getCategory } from "@/content/categories";
import { site, waLink } from "@/content/site";

export default function FleetCard({ vehicle, priority }: { vehicle: Vehicle; priority?: boolean }) {
  const pricing = categoryPricing[vehicle.category];
  const category = getCategory(vehicle.category);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-champagne/60 hover:shadow-xl hover:shadow-black/10">
      <Link href={`/fleet/${vehicle.id}`} className="focus-ring block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={vehicle.images[0]}
            alt={vehicle.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/40 via-transparent to-transparent" />

          {category && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-graphite backdrop-blur">
              {category.label}
            </span>
          )}

          <span
            className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${
              vehicle.available
                ? "bg-emerald-500/90 text-white"
                : "bg-graphite/80 text-white/80"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {vehicle.available ? "Available now" : "On request"}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/fleet/${vehicle.id}`} className="focus-ring">
          <h3 className="font-display text-2xl italic leading-tight">{vehicle.name}</h3>
        </Link>
        <p className="mt-2 text-sm text-slate">
          {vehicle.seats} seats &middot; {vehicle.transmission}
        </p>
        {vehicle.note && <p className="mt-1 text-xs font-medium text-champagne">{vehicle.note}</p>}

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="tabular text-xl font-semibold text-graphite">
              {formatRange(pricing.low, pricing.high)}
            </p>
            <p className="text-xs text-slate">est. {pricing.unit} &middot; confirmed on enquiry</p>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            href={`/enquire/${vehicle.id}`}
            className="focus-ring flex-1 rounded-full bg-champagne px-4 py-2.5 text-center text-sm font-semibold text-graphite transition hover:brightness-105"
          >
            Book now
          </Link>
          <a
            href={waLink(`Hi ${site.brand}, is the ${vehicle.name} available?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex-1 rounded-full border border-line px-4 py-2.5 text-center text-sm font-medium text-bone transition-colors hover:border-[#25D366] hover:text-[#1da851]"
          >
            Enquire on WhatsApp
          </a>
        </div>
        <Link
          href={`/fleet/${vehicle.id}`}
          className="focus-ring mt-3 self-center text-sm text-slate transition-colors hover:text-champagne"
        >
          View details &rarr;
        </Link>
      </div>
    </article>
  );
}
