"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import clsx from "clsx";
import { fleet, getVehicle, displayTitle, type Vehicle } from "@/content/fleet";
import { categories, type CategoryId } from "@/content/categories";
import { categoryPricing, formatRange } from "@/content/pricing";
import { site, waLink } from "@/content/site";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID_CLIENT,
  EMAILJS_TEMPLATE_ID_OWNER,
  OWNER_EMAIL,
  PICKUP_LOCATIONS,
  SERVICE_TYPES,
  TERMS_AND_CONDITIONS,
  isEmailConfigured,
} from "@/content/booking";
import DateRangePicker, { formatDisplay } from "@/components/DateRangePicker";

const STEPS = [
  { id: 1, label: "Dates & service" },
  { id: 2, label: "Choose car" },
  { id: 3, label: "Your details" },
  { id: 4, label: "Confirmation" },
];

const MODE_TO_SERVICE: Record<string, string> = {
  "self-drive": "Self-drive",
  chauffeur: "Chauffeur-driven",
  wedding: "Wedding & occasion",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// EmailJS interpolates template fields as raw HTML with no escaping, so strip
// any markup out of free-text user input before it reaches the owner's inbox.
const sanitizeText = (str: string) => str.replace(/<[^>]*>/g, "").trim();

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function estimate(vehicle: Vehicle | null, days: number) {
  if (!vehicle) return null;
  const p = categoryPricing[vehicle.category];
  const mult = p.unit === "per day" ? days : 1;
  return { low: p.low * mult, high: p.high * mult, pricing: p };
}

type Errors = Partial<Record<"from" | "to" | "car" | "name" | "phone" | "email", string>>;
type EmailStatus = "idle" | "sending" | "sent" | "error";

export default function BookingFlow({ preselectedId }: { preselectedId?: string }) {
  const searchParams = useSearchParams();
  const preselectedCar = getVehicle(preselectedId ?? searchParams.get("car") ?? "") ?? null;

  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState<Vehicle | null>(preselectedCar);
  const [catFilter, setCatFilter] = useState<CategoryId | "all">("all");
  const [form, setForm] = useState({
    from: "",
    to: "",
    service: MODE_TO_SERVICE[searchParams.get("mode") ?? ""] ?? "Self-drive",
    pickup: PICKUP_LOCATIONS[0] as string,
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [emailErrorDetail, setEmailErrorDetail] = useState("");
  const [today] = useState(todayKey);

  const update = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };
  const updateDates = (from: string, to: string) => {
    setForm((p) => ({ ...p, from, to }));
    setErrors((p) => ({ ...p, from: "", to: "" }));
  };

  const days =
    form.from && form.to
      ? Math.max(1, Math.ceil((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86400000))
      : 1;
  const est = estimate(selectedCar, days);
  const totalText = est ? formatRange(est.low, est.high) : "—";

  const validate = (s: number) => {
    const e: Errors = {};
    if (s === 1) {
      if (!form.from) e.from = "Pick a pickup date";
      else if (!form.to) e.to = "Pick a return date";
      if (form.from && form.to && form.from > form.to) e.to = "Return date must be on or after pickup date";
    }
    if (s === 2 && !selectedCar) e.car = "Please select a car";
    if (s === 3) {
      if (!form.name.trim()) e.name = "Name required";
      if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit mobile number required";
      if (form.email && !EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address";
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === 1 && preselectedCar && selectedCar) setStep(3); // skip "Choose car" — already picked
    else setStep((s) => Math.min(s + 1, 4));
  };
  const back = () => {
    if (step === 3 && preselectedCar && selectedCar?.id === preselectedCar.id) setStep(1);
    else setStep((s) => Math.max(s - 1, 1));
  };

  const filteredCars = (catFilter === "all" ? fleet : fleet.filter((c) => c.category === catFilter)).filter(
    (c) => c.available,
  );
  const visibleSteps = preselectedCar ? STEPS.filter((s) => s.id !== 2) : STEPS;
  const visibleIndex = visibleSteps.findIndex((s) => s.id === step) + 1;

  const safeName = sanitizeText(form.name);
  const safeNotes = sanitizeText(form.notes);
  const carName = selectedCar ? displayTitle(selectedCar) : "";

  const bookingDetails =
    `Car: ${carName}\n` +
    `From: ${form.from} → To: ${form.to} (${days} day${days > 1 ? "s" : ""})\n` +
    `Service: ${form.service}\n` +
    `Pickup: ${form.pickup}\n` +
    `Name: ${safeName}\n` +
    `Phone: ${form.phone}\n` +
    `Est. total: ${totalText}\n` +
    (safeNotes ? `Notes: ${safeNotes}\n` : "");

  const waPriceMessage = `*Best price request — ${site.brand}*\n\n${bookingDetails}\nCould you please share your best price for this booking?`;

  // Sends the booking-confirmed email (owner always, client if they gave one).
  const sendConfirmationEmails = () => {
    if (emailStatus === "sending" || emailStatus === "sent") return;
    if (!isEmailConfigured()) {
      setEmailStatus("error");
      return;
    }

    const templateParams = {
      car_name: carName,
      from_date: form.from,
      to_date: form.to,
      days,
      service: form.service,
      pickup: form.pickup,
      customer_name: safeName,
      customer_phone: form.phone,
      customer_email: form.email || "Not provided",
      notes: safeNotes || "—",
      total: totalText,
      owner_email: OWNER_EMAIL,
      to_email: OWNER_EMAIL,
      business_name: site.brand,
    };

    setEmailStatus("sending");
    setEmailErrorDetail("");
    const sends = [emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_OWNER, templateParams, EMAILJS_PUBLIC_KEY)];
    if (form.email && EMAILJS_TEMPLATE_ID_CLIENT) {
      sends.push(emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_CLIENT, templateParams, EMAILJS_PUBLIC_KEY));
    }
    Promise.all(sends)
      .then(() => setEmailStatus("sent"))
      .catch((err) => {
        console.error("EmailJS send failed:", err);
        setEmailErrorDetail(err?.text || err?.message || JSON.stringify(err));
        setEmailStatus("error");
      });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-24 sm:px-8 sm:pt-32">
      <p className="text-sm font-medium uppercase tracking-widest text-champagne">Book a car</p>
      <h1 className="mt-2 font-display text-4xl italic sm:text-5xl">Reserve your car in {site.city}</h1>
      <p className="mt-3 max-w-xl text-bone/70">
        Complete the form below and we&rsquo;ll confirm availability within minutes. No payment required now.
      </p>

      {/* Step progress */}
      <div className="mt-8">
        <p className="text-sm text-slate">
          Step <span className="tabular">{visibleIndex}</span> of <span className="tabular">{visibleSteps.length}</span> —{" "}
          {STEPS.find((s) => s.id === step)?.label}
        </p>
        <ol className="mt-3 flex items-center">
          {visibleSteps.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            return (
              <li key={s.id} className={clsx("flex items-center", i < visibleSteps.length - 1 && "flex-1")}>
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={clsx(
                      "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                      done && "border-champagne bg-champagne text-graphite",
                      active && "border-champagne bg-champagne/15 text-champagne",
                      !done && !active && "border-line bg-surface text-slate",
                    )}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <span className={clsx("hidden text-xs sm:block", active ? "font-medium text-bone" : "text-slate")}>
                    {s.label}
                  </span>
                </div>
                {i < visibleSteps.length - 1 && (
                  <span
                    className={clsx("mx-2 mb-0 h-0.5 flex-1 rounded-full sm:mb-5", done ? "bg-champagne" : "bg-line")}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main form */}
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl italic">When do you need the car?</h2>

              {preselectedCar && selectedCar && (
                <div className="flex items-center gap-4 rounded-xl border border-champagne/40 bg-champagne/5 p-3">
                  <CarThumb vehicle={selectedCar} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{carName}</p>
                    <p className="text-sm text-champagne tabular">
                      {formatRange(categoryPricing[selectedCar.category].low, categoryPricing[selectedCar.category].high)}{" "}
                      <span className="text-slate">{categoryPricing[selectedCar.category].unit}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="focus-ring rounded-full border border-line px-3 py-1.5 text-sm hover:border-champagne hover:text-champagne"
                  >
                    Change
                  </button>
                </div>
              )}

              {preselectedCar && <Terms />}

              <div>
                <DateRangePicker from={form.from} to={form.to} minDate={today} onChange={updateDates} />
                {(errors.from || errors.to) && <Err>{errors.from || errors.to}</Err>}
              </div>

              <div>
                <Label>Service type</Label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SERVICE_TYPES.map((opt) => (
                    <label
                      key={opt}
                      className={clsx(
                        "cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-champagne",
                        form.service === opt
                          ? "border-champagne bg-champagne font-medium text-graphite"
                          : "border-line bg-surface text-bone/80 hover:border-champagne",
                      )}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={opt}
                        checked={form.service === opt}
                        onChange={() => update("service", opt)}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label>Pickup location</Label>
                <select
                  value={form.pickup}
                  onChange={(e) => update("pickup", e.target.value)}
                  className="focus-ring mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-bone outline-none"
                >
                  {PICKUP_LOCATIONS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl italic">Choose your car</h2>
              {errors.car && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errors.car}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {[{ id: "all" as const, label: "All" }, ...categories].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCatFilter(cat.id)}
                    aria-pressed={catFilter === cat.id}
                    className={clsx(
                      "focus-ring rounded-full border px-4 py-2 text-sm transition-colors",
                      catFilter === cat.id
                        ? "border-champagne bg-champagne font-medium text-graphite"
                        : "border-line bg-surface text-bone/80 hover:border-champagne",
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="max-h-[32rem] space-y-2 overflow-y-auto pr-1">
                {filteredCars.map((car) => {
                  const p = categoryPricing[car.category];
                  const selected = selectedCar?.id === car.id;
                  return (
                    <button
                      type="button"
                      key={car.id}
                      onClick={() => {
                        setSelectedCar(car);
                        setErrors((e) => ({ ...e, car: "" }));
                      }}
                      aria-pressed={selected}
                      className={clsx(
                        "focus-ring flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-colors",
                        selected ? "border-champagne bg-champagne/5" : "border-line hover:border-champagne/60",
                      )}
                    >
                      <CarThumb vehicle={car} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{displayTitle(car)}</p>
                        <p className="text-xs text-slate">
                          {car.transmission !== "N/A" && `${car.transmission} · `}
                          {car.seats} seats
                        </p>
                        <p className="text-sm text-champagne tabular">
                          {formatRange(p.low, p.high)} <span className="text-slate">{p.unit}</span>
                        </p>
                      </div>
                      <span
                        className={clsx(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs",
                          selected ? "border-champagne bg-champagne text-graphite" : "border-line",
                        )}
                      >
                        {selected && "✓"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Terms />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-display text-3xl italic">Your contact details</h2>
              <Field label="Full name" error={errors.name}>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Phone number" error={errors.phone}>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={clsx(inputCls, "tabular")}
                />
              </Field>
              <Field label="Email (optional)" error={errors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Special requests (optional)">
                <textarea
                  rows={4}
                  placeholder="Decoration, pickup time, extra driver, child seat..."
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-champagne/15 text-3xl text-champagne">
                &#10003;
              </span>
              <h2 className="mt-4 font-display text-3xl italic sm:text-4xl">Your booking is ready!</h2>
              <p className="mt-2 text-bone/70">
                Tap Confirm Booking to send it to our team — we&rsquo;ll be in touch within minutes.
              </p>

              <dl className="mx-auto mt-6 max-w-md divide-y divide-line rounded-2xl border border-line text-left text-sm">
                <Row label="Car" value={carName} />
                <Row label="From" value={formatDisplay(form.from) ?? ""} />
                <Row label="To" value={formatDisplay(form.to) ?? ""} />
                <Row label="Duration" value={`${days} day${days > 1 ? "s" : ""}`} />
                <Row label="Service" value={form.service} />
                <Row label="Pickup" value={form.pickup} />
                <Row label="Name" value={form.name} />
                <Row label="Phone" value={form.phone} />
                <Row label="Est. total" value={totalText} accent />
              </dl>

              <div className="mx-auto mt-6 flex max-w-md flex-col gap-3">
                <button
                  type="button"
                  onClick={sendConfirmationEmails}
                  disabled={emailStatus === "sending" || emailStatus === "sent"}
                  className="focus-ring rounded-full bg-champagne px-6 py-4 text-base font-semibold text-graphite transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {emailStatus === "sent" ? "Booking confirmed ✓" : emailStatus === "sending" ? "Sending…" : "Confirm booking"}
                </button>
                <a
                  href={waLink(waPriceMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded-full border border-line px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:border-[#25D366] hover:text-[#1da851]"
                >
                  Ask for best price on WhatsApp
                </a>
              </div>
              <p className="mt-3 text-xs text-slate">No payment required now. Confirm Booking emails our team directly.</p>

              {emailStatus === "sent" && (
                <p className="mx-auto mt-4 max-w-md rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                  Our team has been notified — this booking is confirmed by email. We&rsquo;ll call you on {form.phone}.
                </p>
              )}
              {emailStatus === "error" && (
                <p className="mx-auto mt-4 max-w-md rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  We couldn&rsquo;t send the confirmation email — please try again, or use WhatsApp above.
                  {emailErrorDetail && <span className="block text-xs opacity-70">({emailErrorDetail})</span>}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={back}
                  className="focus-ring rounded-full border border-line px-6 py-3.5 text-sm text-bone hover:border-champagne hover:text-champagne"
                >
                  &larr; Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={next}
                className="focus-ring rounded-full bg-champagne px-8 py-3.5 text-sm font-semibold text-graphite transition hover:brightness-105"
              >
                {step === 3 ? "Review & confirm" : "Continue"} &rarr;
              </button>
            </div>
          )}
          {step === 4 && emailStatus !== "sent" && (
            <div className="mt-6 text-center">
              <button type="button" onClick={() => setStep(3)} className="focus-ring text-sm text-slate hover:text-champagne">
                &larr; Edit details
              </button>
            </div>
          )}
        </div>

        {/* Sidebar summary */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <h3 className="font-display text-2xl italic">Booking summary</h3>
            {selectedCar ? (
              <>
                <div className="mt-4 flex items-center gap-3">
                  <CarThumb vehicle={selectedCar} />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{carName}</p>
                    <p className="text-xs text-slate">
                      {selectedCar.transmission !== "N/A" && `${selectedCar.transmission} · `}
                      {selectedCar.seats} seats
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                  {form.from && <SideRow label="From" value={formatDisplay(form.from) ?? ""} />}
                  {form.to && <SideRow label="To" value={formatDisplay(form.to) ?? ""} />}
                  {est && form.from && form.to && (
                    <>
                      {est.pricing.unit === "per day" && (
                        <p className="text-xs text-slate tabular">
                          {days} day{days > 1 ? "s" : ""} × {formatRange(est.pricing.low, est.pricing.high)}
                        </p>
                      )}
                      <div className="flex items-baseline justify-between gap-2 border-t border-line pt-2">
                        <span className="font-medium">Est. total</span>
                        <span className="tabular font-semibold text-champagne">{totalText}</span>
                      </div>
                      <p className="text-xs text-slate">Estimated range — exact rate confirmed by our team.</p>
                    </>
                  )}
                </div>
              </>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-slate">
                Select a car in step 2
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5">
            <h4 className="font-medium">Need help?</h4>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`tel:${site.phoneE164}`}
                className="focus-ring rounded-full bg-champagne px-4 py-2.5 text-center text-sm font-semibold text-graphite hover:brightness-105"
              >
                Call {site.phoneDisplay}
              </a>
              <a
                href={waLink(`Hi ${site.brand}, I need help with a booking.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-full border border-line px-4 py-2.5 text-center text-sm hover:border-champagne hover:text-champagne"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputCls =
  "focus-ring w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-bone outline-none placeholder:text-slate";

function Label({ children }: { children: React.ReactNode }) {
  return <span className="block text-sm text-slate">{children}</span>;
}

function Err({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-red-600">{children}</p>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <div className="mt-1">{children}</div>
      {error && <Err>{error}</Err>}
    </label>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-2.5">
      <dt className="text-slate">{label}</dt>
      <dd className={clsx("text-right", accent ? "tabular font-semibold text-champagne" : "font-medium text-bone")}>
        {value}
      </dd>
    </div>
  );
}

function SideRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-slate">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function CarThumb({ vehicle }: { vehicle: Vehicle }) {
  return (
    <span className="block h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-line">
      {vehicle.images[0] && (
        // eslint-disable-next-line @next/next/no-img-element -- small thumbnail, mixed local/remote sources
        <img src={vehicle.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
      )}
    </span>
  );
}

function Terms() {
  return (
    <div className="rounded-xl border border-champagne/30 bg-champagne/5 p-4">
      <h4 className="flex items-center gap-2 text-sm font-semibold">
        <span aria-hidden className="text-champagne">&#9888;</span> Terms &amp; conditions
      </h4>
      <ul className="mt-2 space-y-1.5 text-sm text-bone/80">
        {TERMS_AND_CONDITIONS.map((t) => (
          <li key={t.title}>
            <strong className="text-bone">{t.title}:</strong> {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
