"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, waLink } from "@/content/site";
import { getVehicle } from "@/content/fleet";

/**
 * Thumb-reach Call / WhatsApp bar on phones. On a vehicle page the primary
 * action becomes "Enquire" for that car; hidden inside the enquiry flow,
 * which has its own send button.
 */
export default function MobileActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/enquire")) return null;

  const vehicleSlug = pathname.match(/^\/fleet\/([^/]+)$/)?.[1];
  const vehicle = vehicleSlug ? getVehicle(vehicleSlug) : undefined;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 px-3 pt-2.5 backdrop-blur pb-[max(0.625rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="flex gap-2">
        <a
          href={`tel:${site.phoneE164}`}
          className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-full border border-line bg-surface py-3 text-sm font-semibold"
        >
          <PhoneIcon />
          Call
        </a>
        {vehicle ? (
          <Link
            href={`/enquire/${vehicle.id}`}
            className="focus-ring flex flex-[1.6] items-center justify-center rounded-full bg-champagne py-3 text-sm font-semibold text-graphite"
          >
            Enquire for this car
          </Link>
        ) : (
          <a
            href={waLink(`Hi ${site.brand}, I'd like to ask about a booking.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex flex-[1.6] items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon />
            WhatsApp us
          </a>
        )}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.2 12C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.8 9.8zM20.3 3.7A11.8 11.8 0 0 0 12 .2C5.5.2.2 5.5.2 12c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.6a11.8 11.8 0 0 0 5.6 1.4c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3z" />
    </svg>
  );
}
