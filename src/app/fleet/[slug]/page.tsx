import { notFound } from "next/navigation";
import { fleet, getVehicle } from "@/content/fleet";
import { getCategory } from "@/content/categories";
import VehicleGallery from "@/components/VehicleGallery";
import EnquiryPanel from "@/components/EnquiryPanel";
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
  return { title: `${vehicle.name} — ${site.brand}` };
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const category = getCategory(vehicle.category);

  return (
    <>
      <main className="mx-auto max-w-6xl px-5 pt-28 pb-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <VehicleGallery name={vehicle.name} images={vehicle.images} />

            <div className="mt-12">
              <h2 className="font-display text-2xl italic">About this car</h2>
              <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
                <Spec label="Category" value={category?.label ?? vehicle.category} />
                <Spec label="Brand" value={vehicle.brand} />
                <Spec label="Seats" value={String(vehicle.seats)} />
                <Spec label="Transmission" value={vehicle.transmission} />
                <Spec label="Available" value={vehicle.available ? "Yes" : "Currently unavailable"} />
              </dl>
              {vehicle.note && <p className="mt-4 text-bone/80">{vehicle.note}</p>}
            </div>
          </div>

          <EnquiryPanel vehicle={vehicle} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate">{label}</dt>
      <dd className="mt-1 text-bone">{value}</dd>
    </div>
  );
}
