import { faqs } from "@/content/copy";

export default function Faq() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-8 sm:py-24">
      <h2 className="font-display text-4xl italic sm:text-5xl">Good to know</h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group">
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-champagne transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="-mt-1 pb-5 pr-10 text-bone/75">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
