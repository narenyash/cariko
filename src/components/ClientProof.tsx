import { clientMoments } from "@/content/clients";
import { site, formatFollowers } from "@/content/site";

export default function ClientProof() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-4xl italic sm:text-5xl">Who we&rsquo;ve driven</h2>
        <p className="tabular text-sm text-slate">
          {formatFollowers(site.instagramFollowers)} followers · {site.rating} average, {site.reviewCount} reviews
        </p>
      </div>
      <p className="mt-3 max-w-xl text-sm text-slate">
        Named only where we hold written permission for the name and photo — otherwise described, not named.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clientMoments.map((m) => (
          <div key={m.role + m.occasion} className="border-t border-line pt-4">
            <p className="text-bone/90">{m.role}</p>
            <p className="text-sm text-slate">{m.occasion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
