import { site, waLink } from "@/content/site";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-3 sm:px-8">
        <div>
          <Logo size={46} wordmarkClassName="text-2xl" />
          <p className="mt-3 text-sm text-bone/70">{site.address}</p>
          <p className="mt-1 text-sm text-slate">{site.hours}</p>
        </div>

        <div>
          <p className="text-sm text-slate">Locations served</p>
          <ul className="mt-3 space-y-1 text-bone/80">
            {site.locationsServed.map((loc) => (
              <li key={loc}>{loc}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-slate">Reach us</p>
          <a
            href={`tel:${site.phoneE164}`}
            className="focus-ring mt-3 block text-lg text-champagne underline-offset-4 hover:underline"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={waLink(`Hi ${site.brand}, I'd like to ask about a booking.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-2 block text-bone/80 underline-offset-4 hover:underline"
          >
            Message on WhatsApp
          </a>
          <a
            href={`https://instagram.com/${site.instagramHandle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-2 block text-bone/80 underline-offset-4 hover:underline"
          >
            {site.instagramHandle} on Instagram
          </a>
          <p className="mt-4 text-xs text-slate">{site.licence}</p>
        </div>
      </div>
    </footer>
  );
}
