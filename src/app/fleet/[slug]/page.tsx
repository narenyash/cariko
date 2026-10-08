import Link from "next/link";
import { notFound } from "next/navigation";
import { fleet, getVehicle, displayTitle, hasRealPhoto } from "@/content/fleet";
import { getCategory } from "@/content/categories";
import { categoryPricing, formatRange } from "@/content/pricing";
import VehicleGallery from "@/components/VehicleGallery";
import EnquiryPanel from "@/components/EnquiryPanel";
import FleetCard from "@/components/FleetCard";
import Footer from "@/components/Footer";
import { site } from "@/content/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return fleet.map((v) => ({ slug: v.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return {};
  const pricing = categoryPricing[vehicle.category];
  const title = displayTitle(vehicle);
  const description = `Rent the ${title} in ${site.city} — est. ${formatRange(pricing.low, pricing.high)} ${pricing.unit}. Enquire on WhatsApp, confirmed by our team.`;
  const images = hasRealPhoto(vehicle) ? [{ url: vehicle.images[0], alt: title }] : undefined;
  return {
    title,
    description,
    openGraph: { title: `${title} — ${site.brand}`, description, ...(images && { images }) },
    twitter: { title: `${title} — ${site.brand}`, description, ...(images && { images }) },
  };
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const category = getCategory(vehicle.category);
  const related = fleet
    .filter((v) => v.category === vehicle.category && v.id !== vehicle.id)
    .sort((a, b) => Number(hasRealPhoto(b)) - Number(hasRealPhoto(a)))
    .slice(0, 3);

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-slate">
          <Link href="/fleet" className="focus-ring hover:text-champagne">
            Fleet
          </Link>
          <span aria-hidden>/</span>
          {category && (
            <>
              <Link href={`/fleet?category=${category.id}`} className="focus-ring hover:text-champagne">
                {category.label}
              </Link>
              <span aria-hidden>/</span>
            </>
          )}
          <span className="truncate text-bone">{vehicle.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-10">
          <div>
            <VehicleGallery name={vehicle.name} images={vehicle.images} />

            <div className="mt-8 hidden lg:block">
              <About vehicle={vehicle} categoryLabel={category?.label} />
            </div>
          </div>

          <EnquiryPanel vehicle={vehicle} />

          <div className="lg:hidden">
            <About vehicle={vehicle} categoryLabel={category?.label} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-line pt-10 sm:mt-24">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl italic sm:text-4xl">More {category?.label.toLowerCase()}</h2>
              <Link
                href={`/fleet?category=${vehicle.category}`}
                className="focus-ring shrink-0 text-sm font-medium text-champagne hover:underline"
              >
                See all &rarr;
              </Link>
            </div>
            <div className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
              {related.map((v) => (
                <div key={v.id} className="w-[82%] shrink-0 snap-start sm:w-auto">
                  <FleetCard vehicle={v} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function About({
  vehicle,
  categoryLabel,
}: {
  vehicle: NonNullable<ReturnType<typeof getVehicle>>;
  categoryLabel?: string;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl italic">About this car</h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl border border-line bg-surface p-5 text-sm sm:grid-cols-3">
        <Spec label="Category" value={categoryLabel ?? vehicle.category} />
        <Spec label="Brand" value={vehicle.brand} />
        <Spec label="Seats" value={String(vehicle.seats)} />
        <Spec label="Transmission" value={vehicle.transmission} />
        <Spec label="Available" value={vehicle.available ? "Yes" : "On request"} />
      </dl>
      {vehicle.note && <p className="mt-4 text-bone/80">{vehicle.note}</p>}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate">{label}</dt>
      <dd className="mt-1 font-medium text-bone">{value}</dd>
    </div>
  );
}
