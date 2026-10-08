import { trustFacts } from "@/content/copy";

export default function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-5 gap-y-7 px-4 py-10 sm:px-8 lg:grid-cols-4 lg:py-16">
        {trustFacts.map((fact) => (
          <div key={fact.label}>
            <p className="text-sm text-slate">{fact.label}</p>
            <p className="mt-1.5 text-base leading-snug text-bone sm:text-lg">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
