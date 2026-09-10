import { trustFacts } from "@/content/copy";

export default function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:py-16">
        {trustFacts.map((fact) => (
          <div key={fact.label}>
            <p className="text-sm text-slate">{fact.label}</p>
            <p className="mt-2 text-lg leading-snug text-bone">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
