import PageIntro from "@/components/PageIntro";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { site, waLink } from "@/content/site";

export const metadata = {
  title: "Contact",
  description: `Call, WhatsApp or visit ${site.brand} in ${site.city} — ${site.hours.toLowerCase()}.`,
};

const mapQuery = encodeURIComponent(`${site.fullName}, ${site.address}`);

export default function ContactPage() {
  const channels = [
    { label: "Call", value: site.phoneDisplay, href: `tel:${site.phoneE164}`, external: false },
    {
      label: "WhatsApp",
      value: "Message us",
      href: waLink(`Hi ${site.brand}, I'd like to ask about a booking.`),
      external: true,
    },
    {
      label: "Instagram",
      value: site.instagramHandle,
      href: `https://instagram.com/${site.instagramHandle.replace("@", "")}`,
      external: true,
    },
  ];

  return (
    <>
      <PageIntro kicker={site.hours} title="Get in touch">
        The fastest way is WhatsApp &mdash; send the car and the date, and we reply with the exact rate.
      </PageIntro>

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                className="focus-ring flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-champagne"
              >
                <span>
                  <span className="block text-sm text-slate">{c.label}</span>
                  <span className="mt-0.5 block font-semibold">{c.value}</span>
                </span>
                <span aria-hidden className="text-champagne">
                  &rarr;
                </span>
              </a>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <iframe
              title={`Map to ${site.brand}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 sm:h-72"
            />
            <div className="p-5">
              <p className="text-sm font-semibold">Visit the office</p>
              <p className="mt-1 text-sm text-bone/75">{site.address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-3 inline-block text-sm font-medium text-champagne hover:underline"
              >
                Get directions &rarr;
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>

      <Footer />
    </>
  );
}
