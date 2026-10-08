import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/copy";

export default function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-24">
      {heading && (
        <>
          <h2 className="font-display text-4xl italic sm:text-5xl">Three ways to ride</h2>
          <p className="mt-3 max-w-xl text-slate">
            Pick how you want the day to go &mdash; we&rsquo;ll match the car, the driver and the paperwork.
          </p>
        </>
      )}

      <div className="mt-8 grid gap-5 sm:mt-12 md:grid-cols-3 md:gap-6">
        {services.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            className="focus-ring group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl text-white sm:min-h-[420px]"
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-transparent" />
            <div className="relative p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-champagne">{s.kicker}</p>
              <h3 className="mt-2 font-display text-3xl italic">{s.title}</h3>
              <p className="mt-2 text-sm text-white/85">{s.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                See the cars <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
