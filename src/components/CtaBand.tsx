import Link from "next/link";
import { site, waLink } from "@/content/site";

export default function CtaBand({ title = "Got a date in mind?" }: { title?: string }) {
  return (
    <section className="px-4 pb-14 sm:px-8 sm:pb-24">
      <div
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-12 text-center text-white sm:px-12 sm:py-16"
        style={{
          background:
            "radial-gradient(700px 360px at 50% 0%, #6b4510 0%, transparent 70%), var(--color-graphite)",
        }}
      >
        <h2 className="font-display text-4xl italic sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-white/75">
          Tell us the car and the day. We reply on WhatsApp with the exact rate &mdash; {site.hours.toLowerCase()}.
        </p>
        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <a
            href={waLink(`Hi ${site.brand}, I'd like to check availability.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex-1 rounded-full bg-champagne px-6 py-3.5 text-sm font-semibold text-graphite transition hover:brightness-105"
          >
            Check availability
          </a>
          <Link
            href="/fleet"
            className="focus-ring flex-1 rounded-full border border-white/30 px-6 py-3.5 text-sm font-medium transition-colors hover:border-white"
          >
            Browse the fleet
          </Link>
        </div>
      </div>
    </section>
  );
}
