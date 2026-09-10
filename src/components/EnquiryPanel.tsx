"use client";

import { useState } from "react";
import Link from "next/link";
import type { Vehicle, Mode } from "@/content/fleet";
import { categoryPricing, formatRange } from "@/content/pricing";
import { site, waLink } from "@/content/site";

const MODE_LABEL: Record<Mode, string> = {
  wedding: "Wedding & occasion",
  chauffeur: "Chauffeur-driven",
  "self-drive": "Self-drive",
};

export default function EnquiryPanel({ vehicle }: { vehicle: Vehicle }) {
  const [mode, setMode] = useState<Mode>(vehicle.modes[0]);
  const pricing = categoryPricing[vehicle.category];

  return (
    <div className="border border-line bg-surface p-6 lg:sticky lg:top-24">
      <p className="text-sm text-slate">{vehicle.brand}</p>
      <h2 className="font-display text-3xl italic">{vehicle.name}</h2>
      {vehicle.note && <p className="mt-2 text-sm text-champagne">{vehicle.note}</p>}

      {vehicle.modes.length > 1 && (
        <div className="mt-6 flex flex-wrap border border-line">
          {vehicle.modes.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`focus-ring flex-1 px-3 py-2 text-sm transition-colors ${
                mode === m ? "bg-champagne text-graphite" : "text-bone/80 hover:text-champagne"
              }`}
            >
              {MODE_LABEL[m]}
            </button>
          ))}
        </div>
      )}
      {vehicle.modes.length === 1 && (
        <p className="mt-6 border border-line px-3 py-2 text-sm text-slate">{MODE_LABEL[vehicle.modes[0]]} only</p>
      )}

      <div className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
        <Row label={`Estimated ${pricing.unit}`} value={formatRange(pricing.low, pricing.high)} accent />
        {mode === "self-drive" && pricing.depositLow && pricing.depositHigh && (
          <Row label="Refundable deposit (estimated)" value={formatRange(pricing.depositLow, pricing.depositHigh)} />
        )}
        {pricing.kmIncluded && <Row label="Km included per day (typical)" value={`${pricing.kmIncluded} km`} />}
        {pricing.kmOverageNote && <p className="text-xs text-slate">{pricing.kmOverageNote}</p>}
        <Row
          label="Decoration"
          value={
            vehicle.decoration === "included"
              ? "Included"
              : vehicle.decoration === "extra"
                ? "Available, extra charge"
                : "Not offered"
          }
        />
        <p className="text-xs text-slate">
          These are estimated ranges, not a firm quote — every booking is confirmed by our team before it&rsquo;s final.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href={`/enquire/${vehicle.id}?mode=${mode}`}
          className="focus-ring bg-champagne px-6 py-3 text-center text-sm font-medium text-graphite transition-opacity hover:opacity-90"
        >
          Start enquiry
        </Link>
        <a
          href={waLink(`Hi ${site.brand}, I'd like a quote for the ${vehicle.name} (${MODE_LABEL[mode]}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring border border-line px-6 py-3 text-center text-sm text-bone transition-colors hover:border-champagne hover:text-champagne"
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-bone/80">{label}</span>
      <span className={`tabular shrink-0 ${accent ? "font-display text-xl italic text-champagne" : "text-bone"}`}>
        {value}
      </span>
    </div>
  );
}
