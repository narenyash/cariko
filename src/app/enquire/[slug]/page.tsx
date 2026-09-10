import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fleet, getVehicle } from "@/content/fleet";
import EnquiryFlow from "@/components/EnquiryFlow";
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
  return { title: `Enquire — ${vehicle.name} — ${site.brand}` };
}

export default async function EnquirePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  return (
    <Suspense fallback={null}>
      <EnquiryFlow vehicle={vehicle} />
    </Suspense>
  );
}
