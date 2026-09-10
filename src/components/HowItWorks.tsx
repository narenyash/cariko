import { howItWorks } from "@/content/copy";

export default function HowItWorks() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32">
        <h2 className="font-display text-4xl italic sm:text-5xl">How it works</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {howItWorks.map((item, i) => (
            <div key={item.step} className="border-t border-line pt-6">
              <p className="tabular text-sm text-champagne">{`0${i + 1}`}</p>
              <h3 className="mt-3 font-display text-2xl italic">{item.step}</h3>
              <p className="mt-3 text-bone/80">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
