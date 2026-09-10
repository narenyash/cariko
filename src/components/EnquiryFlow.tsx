"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { displayTitle, type Vehicle, type Mode } from "@/content/fleet";
import { categoryPricing, formatRange } from "@/content/pricing";
import { site, waLink } from "@/content/site";

interface FormState {
  mode: Mode;
  eventDate: string;
  venue: string;
  carsNeeded: number;
  decorationWanted: boolean;
  pickupDate: string;
  hours: string;
  route: string;
  returnDate: string;
  licenceNumber: string;
  licenceFileName: string;
  depositAcknowledged: boolean;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}

const MODE_LABEL: Record<Mode, string> = {
  wedding: "Wedding & occasion",
  chauffeur: "Chauffeur-driven",
  "self-drive": "Self-drive",
};

const STEPS = ["Trip details", "Your details", "Review & send"] as const;

function storageKey(id: string, mode: Mode) {
  return `honey-travels-enquiry-${id}-${mode}`;
}

export default function EnquiryFlow({ vehicle }: { vehicle: Vehicle }) {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as Mode) || vehicle.modes[0];
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState<FormState>({
    mode: initialMode,
    eventDate: "",
    venue: "",
    carsNeeded: 1,
    decorationWanted: vehicle.decoration !== "not-offered",
    pickupDate: "",
    hours: "",
    route: "",
    returnDate: "",
    licenceNumber: "",
    licenceFileName: "",
    depositAcknowledged: false,
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey(vehicle.id, initialMode));
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, avoids SSR/client mismatch
        setForm((f) => ({ ...f, ...parsed }));
      } catch {
        // ignore malformed cache
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey(vehicle.id, form.mode), JSON.stringify(form));
  }, [form, vehicle.id]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const pricing = categoryPricing[vehicle.category];

  const canAdvanceStep0 =
    form.mode === "wedding"
      ? form.eventDate.length > 0 && form.venue.trim().length > 2
      : form.mode === "chauffeur"
        ? form.pickupDate.length > 0 && form.route.trim().length > 2
        : form.pickupDate.length > 0 && form.returnDate.length > 0 && form.depositAcknowledged;

  const canAdvanceStep1 = form.fullName.trim().length > 1 && form.phone.trim().length >= 10;

  const tripSummary =
    form.mode === "wedding"
      ? `Event date: ${form.eventDate || "—"}\nVenue: ${form.venue || "—"}\nCars needed: ${form.carsNeeded}\nDecoration: ${form.decorationWanted ? "Yes" : "No"}`
      : form.mode === "chauffeur"
        ? `Pickup date: ${form.pickupDate || "—"}\nEstimated hours: ${form.hours || "—"}\nRoute: ${form.route || "—"}`
        : `Pickup: ${form.pickupDate || "—"}\nReturn: ${form.returnDate || "—"}\nLicence: ${form.licenceNumber || "—"}\nDeposit acknowledged: ${form.depositAcknowledged ? "Yes" : "No"}`;

  const message = `Hi ${site.brand}, I'd like to enquire about the ${vehicle.name} (${MODE_LABEL[form.mode]}).\n\n${tripSummary}\n\nName: ${form.fullName}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ""}${form.notes ? `\nNotes: ${form.notes}` : ""}\n\nEstimated ${pricing.unit}: ${formatRange(pricing.low, pricing.high)} (please confirm exact rate).`;

  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center sm:px-8">
        <p className="text-sm text-champagne">Enquiry ready</p>
        <h1 className="mt-3 font-display text-4xl italic">Sent to {site.brand} on WhatsApp</h1>
        <p className="mt-4 text-bone/80">
          Our team will confirm exact pricing, availability for {form.mode === "wedding" ? form.eventDate : form.pickupDate},
          and next steps by WhatsApp or a call to {form.phone}.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-32 sm:px-8">
      <p className="text-sm text-slate">
        {displayTitle(vehicle)} · {MODE_LABEL[form.mode]}
      </p>
      <h1 className="mt-2 font-display text-4xl italic sm:text-5xl">Send an enquiry</h1>
      <p className="mt-3 max-w-xl text-bone/70">
        No payment now — this sends your details to our team on WhatsApp, and we confirm exact pricing and
        availability before anything is final.
      </p>

      {vehicle.modes.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {vehicle.modes.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => update("mode", m)}
              aria-pressed={form.mode === m}
              className={`focus-ring border px-3 py-1.5 text-sm transition-colors ${
                form.mode === m ? "border-champagne text-champagne" : "border-line text-bone/80 hover:border-slate"
              }`}
            >
              {MODE_LABEL[m]}
            </button>
          ))}
        </div>
      )}

      <ol className="mt-8 flex gap-6 border-b border-line pb-4 text-sm">
        {STEPS.map((label, i) => (
          <li key={label} className={i === step ? "text-champagne" : i < step ? "text-bone/60" : "text-slate"}>
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="mt-8 max-w-xl">
        {step === 0 && form.mode === "wedding" && (
          <div className="space-y-5">
            <Field label="Event date">
              <input
                type="date"
                value={form.eventDate}
                onChange={(e) => update("eventDate", e.target.value)}
                className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none [color-scheme:dark]"
              />
            </Field>
            <Field label="Venue">
              <input
                value={form.venue}
                onChange={(e) => update("venue", e.target.value)}
                placeholder="Venue name and area, Ahmedabad"
                className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none placeholder:text-slate"
              />
            </Field>
            <Field label="Cars needed">
              <input
                type="number"
                min={1}
                value={form.carsNeeded}
                onChange={(e) => update("carsNeeded", Math.max(1, Number(e.target.value)))}
                className="focus-ring tabular w-full border border-line bg-transparent px-3 py-2 text-bone outline-none"
              />
            </Field>
            {vehicle.decoration !== "not-offered" && (
              <label className="flex items-center gap-2 text-sm text-bone/80">
                <input
                  type="checkbox"
                  checked={form.decorationWanted}
                  onChange={(e) => update("decorationWanted", e.target.checked)}
                  className="focus-ring"
                />
                {vehicle.decoration === "included" ? "Decoration is included" : "Add decoration (extra charge)"}
              </label>
            )}
            <StepAction disabled={!canAdvanceStep0} onClick={() => setStep(1)}>
              Continue to your details
            </StepAction>
          </div>
        )}

        {step === 0 && form.mode === "chauffeur" && (
          <div className="space-y-5">
            <Field label="Pickup date">
              <input
                type="date"
                value={form.pickupDate}
                onChange={(e) => update("pickupDate", e.target.value)}
                className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none [color-scheme:dark]"
              />
            </Field>
            <Field label="Estimated hours">
              <input
                value={form.hours}
                onChange={(e) => update("hours", e.target.value)}
                placeholder="e.g. 4 hours, or full day"
                className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none placeholder:text-slate"
              />
            </Field>
            <Field label="Route / destination">
              <textarea
                value={form.route}
                onChange={(e) => update("route", e.target.value)}
                rows={3}
                placeholder="Pickup point, drop point, any stops"
                className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none placeholder:text-slate"
              />
            </Field>
            <StepAction disabled={!canAdvanceStep0} onClick={() => setStep(1)}>
              Continue to your details
            </StepAction>
          </div>
        )}

        {step === 0 && form.mode === "self-drive" && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Pickup date">
                <input
                  type="date"
                  value={form.pickupDate}
                  onChange={(e) => update("pickupDate", e.target.value)}
                  className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none [color-scheme:dark]"
                />
              </Field>
              <Field label="Return date">
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={(e) => update("returnDate", e.target.value)}
                  className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none [color-scheme:dark]"
                />
              </Field>
            </div>
            <Field label="Driving licence number">
              <input
                value={form.licenceNumber}
                onChange={(e) => update("licenceNumber", e.target.value)}
                className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none"
              />
            </Field>
            <label className="block">
              <span className="block text-sm text-slate">Driving licence photo (optional now, needed at pickup)</span>
              <div className="relative mt-1 flex items-center justify-between border border-line px-3 py-2">
                <span className="truncate text-sm text-bone/80">{form.licenceFileName || "No file selected"}</span>
                <span className="shrink-0 text-sm text-champagne">Choose</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  onChange={(e) => update("licenceFileName", e.target.files?.[0]?.name ?? "")}
                />
              </div>
            </label>
            <label className="flex items-start gap-2 text-sm text-bone/80">
              <input
                type="checkbox"
                checked={form.depositAcknowledged}
                onChange={(e) => update("depositAcknowledged", e.target.checked)}
                className="focus-ring mt-1"
              />
              <span>
                I understand a refundable security deposit (est. {pricing.depositLow && pricing.depositHigh ? formatRange(pricing.depositLow, pricing.depositHigh) : "TBC"}) is required at pickup, exact amount confirmed by the team.
              </span>
            </label>
            <StepAction disabled={!canAdvanceStep0} onClick={() => setStep(1)}>
              Continue to your details
            </StepAction>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <Field label="Full name">
              <input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="10-digit mobile number"
                  className="focus-ring tabular w-full border border-line bg-transparent px-3 py-2 text-bone outline-none placeholder:text-slate"
                />
                {form.phone.length > 0 && form.phone.trim().length < 10 && (
                  <p className="mt-1 text-xs text-champagne">Enter a full 10-digit mobile number.</p>
                )}
              </Field>
              <Field label="Email (optional)">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none"
                />
              </Field>
            </div>
            <Field label="Notes (optional)">
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                className="focus-ring w-full border border-line bg-transparent px-3 py-2 text-bone outline-none"
              />
            </Field>
            <div className="flex gap-3">
              <StepAction variant="secondary" onClick={() => setStep(0)}>
                Back
              </StepAction>
              <StepAction disabled={!canAdvanceStep1} onClick={() => setStep(2)}>
                Continue to review
              </StepAction>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="whitespace-pre-line border border-line p-5 text-sm text-bone/80">{tripSummary}</div>
            <div className="border-t border-line pt-4 text-sm">
              <p className="text-bone">{form.fullName}</p>
              <p className="text-bone/70">
                {form.phone}
                {form.email ? ` · ${form.email}` : ""}
              </p>
            </div>
            <p className="text-sm text-slate">
              Estimated {pricing.unit}: <span className="tabular text-champagne">{formatRange(pricing.low, pricing.high)}</span> —
              confirmed exactly by our team, not charged now.
            </p>
            <div className="flex gap-3">
              <StepAction variant="secondary" onClick={() => setStep(1)}>
                Back
              </StepAction>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  localStorage.removeItem(storageKey(vehicle.id, form.mode));
                  setSent(true);
                }}
                className="focus-ring flex-1 bg-champagne px-6 py-3 text-center text-sm font-medium text-graphite transition-opacity hover:opacity-90"
              >
                Send enquiry on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm text-slate">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function StepAction({
  onClick,
  children,
  disabled,
  variant = "primary",
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`focus-ring px-6 py-3 text-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40 ${
        variant === "primary"
          ? "bg-champagne font-medium text-graphite hover:opacity-90"
          : "border border-line text-bone hover:border-champagne hover:text-champagne"
      }`}
    >
      {children}
    </button>
  );
}
