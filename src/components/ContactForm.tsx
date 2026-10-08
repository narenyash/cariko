"use client";

import { useState } from "react";
import { site, waLink } from "@/content/site";

const SERVICES = ["Wedding / occasion", "Chauffeur-driven", "Self-drive", "Not sure yet"];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const valid = name.trim().length > 1 && phone.replace(/\D/g, "").length >= 10;

  const text = `Hi ${site.brand}, I'd like to enquire.\n\nService: ${service}${date ? `\nDate: ${date}` : ""}${
    message ? `\nDetails: ${message}` : ""
  }\n\nName: ${name}\nPhone: ${phone}`;

  const input =
    "focus-ring w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-bone outline-none placeholder:text-slate";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) window.open(waLink(text), "_blank", "noopener,noreferrer");
      }}
      className="space-y-4 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-7"
    >
      <h2 className="font-display text-3xl italic">Quick enquiry</h2>
      <p className="-mt-2 text-sm text-slate">Opens WhatsApp with your details filled in. Nothing is booked yet.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-slate">Your name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required className={`mt-1 ${input}`} />
        </label>
        <label className="block">
          <span className="text-sm text-slate">Mobile number</span>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile"
            required
            className={`mt-1 tabular ${input}`}
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm text-slate">What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={service === s}
              onClick={() => setService(s)}
              className={`focus-ring rounded-full border px-4 py-2 text-sm transition-colors ${
                service === s
                  ? "border-champagne bg-champagne font-medium text-graphite"
                  : "border-line bg-canvas text-bone/80 hover:border-champagne"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-sm text-slate">Date (optional)</span>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`mt-1 [color-scheme:light] ${input}`} />
      </label>

      <label className="block">
        <span className="text-sm text-slate">Anything else? (optional)</span>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Car you have in mind, venue, number of cars…"
          className={`mt-1 ${input}`}
        />
      </label>

      <button
        type="submit"
        disabled={!valid}
        className="focus-ring w-full rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send on WhatsApp
      </button>
    </form>
  );
}
