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

const SHORT_LABEL: Record<Mode, string> = {
  wedding: "Wedding",
  chauffeur: "Chauffeur",
  "self-drive": "Self-drive",
};

export default function EnquiryPanel({ vehicle }: { vehicle: Vehicle }) {
  const [mode, setMode] = useState<Mode>(vehicle.modes[0]);
  const pricing = categoryPricing[vehicle.category];

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
      <p className="text-sm text-slate">{vehicle.brand}</p>
      <h1 className="font-display text-3xl italic leading-tight sm:text-4xl">{vehicle.name}</h1>
      {vehicle.note && <p className="mt-2 text-sm text-champagne">{vehicle.note}</p>}

      {vehicle.modes.length > 1 && (
        <div className="mt-6 grid auto-cols-fr grid-flow-col gap-1 rounded-full border border-line p-1">
          {vehicle.modes.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`focus-ring rounded-full px-2 py-2 text-xs font-medium transition-colors sm:text-sm ${
                mode === m ? "bg-champagne text-graphite" : "text-bone/80 hover:text-champagne"
              }`}
            >
              {SHORT_LABEL[m]}
            </button>
          ))}
        </div>
      )}
      {vehicle.modes.length === 1 && (
        <p className="mt-6 rounded-full border border-line px-4 py-2 text-center text-sm text-slate">{MODE_LABEL[vehicle.modes[0]]} only</p>
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
          className="focus-ring rounded-full bg-champagne px-6 py-3.5 text-center text-sm font-semibold text-graphite transition hover:brightness-105"
        >
          Book this car
        </Link>
        <a
          href={waLink(`Hi ${site.brand}, I'd like a quote for the ${vehicle.name} (${MODE_LABEL[mode]}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring rounded-full border border-line px-6 py-3.5 text-center text-sm font-medium text-bone transition-colors hover:border-champagne hover:text-champagne"
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <span className="text-bone/80">{label}</span>
      <span className={`tabular shrink-0 ${accent ? "font-display text-xl italic text-champagne" : "text-bone"}`}>
        {value}
      </span>
    </div>
  );
}
