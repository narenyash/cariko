import Link from "next/link";
import { site, waLink } from "@/content/site";
import { navLinks } from "@/content/copy";
import { categories } from "@/content/categories";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <Logo size={46} wordmarkClassName="text-2xl" />
          <p className="mt-4 text-sm text-bone/70">{site.address}</p>
          <p className="mt-1 text-sm font-medium text-champagne">{site.hours}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-bone/75">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="focus-ring hover:text-champagne">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Fleet</p>
          <ul className="mt-3 space-y-2 text-sm text-bone/75">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/fleet?category=${c.id}`} className="focus-ring hover:text-champagne">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Reach us</p>
          <a
            href={`tel:${site.phoneE164}`}
            className="focus-ring mt-3 block text-lg font-semibold text-champagne underline-offset-4 hover:underline"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={waLink(`Hi ${site.brand}, I'd like to ask about a booking.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-2 block text-sm text-bone/75 underline-offset-4 hover:underline"
          >
            Message on WhatsApp
          </a>
          <a
            href={`https://instagram.com/${site.instagramHandle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-2 block text-sm text-bone/75 underline-offset-4 hover:underline"
          >
            {site.instagramHandle} on Instagram
          </a>
          <p className="mt-3 text-sm text-slate">Serving {site.locationsServed.join(", ")}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-slate sm:flex-row sm:justify-between sm:px-8">
          <p>
            &copy; {new Date().getFullYear()} {site.fullName}
          </p>
          <p>{site.licence}</p>
        </div>
      </div>
    </footer>
  );
}
