import Image from "next/image";
import Link from "next/link";
import { services, type Service } from "@/content/copy";
import { fleet, type Mode } from "@/content/fleet";
import { categoryPricing } from "@/content/pricing";
import { formatINR } from "@/lib/format";
import PageIntro from "@/components/PageIntro";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { site, waLink } from "@/content/site";

export const metadata = {
  title: "Services",
  description: `Wedding cars, chauffeur-driven and self-drive rentals in ${site.city}.`,
};

const MODE_FOR: Record<Service["id"], Mode> = {
  weddings: "wedding",
  chauffeur: "chauffeur",
  "self-drive": "self-drive",
};

const PRICE_FROM: Record<Service["id"], number> = {
  weddings: categoryPricing.wedding.low,
  chauffeur: categoryPricing["luxury-sedans"].low,
  "self-drive": categoryPricing["self-drive-everyday"].low,
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro kicker="What we do" title="Services">
        From a decorated Rolls-Royce at the baraat to a Thar for the weekend &mdash; {site.fleetSize} cars, three
        ways to book.
      </PageIntro>

      <nav className="mx-auto mt-6 flex w-full max-w-6xl gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
        {services.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="focus-ring shrink-0 rounded-full border border-line bg-surface px-4 py-2 text-sm hover:border-champagne"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-12 sm:space-y-24 sm:px-8 sm:py-20">
        {services.map((s, i) => {
          const count = fleet.filter((v) => v.modes.includes(MODE_FOR[s.id])).length;
          return (
            <section key={s.id} id={s.id} className="grid scroll-mt-24 items-center gap-6 md:grid-cols-2 md:gap-12">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={s.image} alt={s.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-champagne">{s.kicker}</p>
                <h2 className="mt-2 font-display text-4xl italic sm:text-5xl">{s.title}</h2>
                <p className="mt-3 text-bone/80">{s.body}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm">
                      <span aria-hidden className="text-champagne">
                        &#10003;
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-slate">
                  {count} cars &middot; from{" "}
                  <span className="tabular font-semibold text-bone">{formatINR(PRICE_FROM[s.id])}</span> (est.)
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={s.href}
                    className="focus-ring rounded-full bg-champagne px-6 py-3.5 text-center text-sm font-semibold text-graphite transition hover:brightness-105"
                  >
                    See the cars
                  </Link>
                  <a
                    href={waLink(`Hi ${site.brand}, I'd like to ask about ${s.title.toLowerCase()}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring rounded-full border border-line bg-surface px-6 py-3.5 text-center text-sm font-medium hover:border-champagne"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <HowItWorks />
      <Faq />
      <CtaBand />
      <Footer />
    </>
  );
}
