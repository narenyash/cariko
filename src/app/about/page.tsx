import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import TrustStrip from "@/components/TrustStrip";
import ClientProof from "@/components/ClientProof";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { site, formatFollowers } from "@/content/site";

export const metadata = {
  title: "About",
  description: `${site.fullName} — ${site.city}'s wedding, chauffeur and self-drive fleet.`,
};

const values = [
  {
    title: "Cars that show up spotless",
    body: "Every car is cleaned and checked before a handover. Wedding cars are decorated on the day of the function, not the night before.",
  },
  {
    title: "A price before a commitment",
    body: "You see an estimated range before you share a single detail, and the exact rate in writing before anything is booked.",
  },
  {
    title: "Someone always picks up",
    body: `We're ${site.hours.toLowerCase()} — late-night airport runs and last-minute baraat changes included.`,
  },
];

const photos = ["/fleet/rolls-royce-phantom.jpg", "/fleet/range-rover-vogue.jpg", "/fleet/lincoln-limousine.jpg"];

export default function AboutPage() {
  return (
    <>
      <PageIntro kicker="About us" title={`${site.city}'s go-to fleet`}>
        {site.fullName} has driven weddings, film shoots, delegations and weekend road trips across Gujarat &mdash;{" "}
        {site.reviewCount} reviews at {site.rating}&#9733; and {formatFollowers(site.instagramFollowers)} people
        following along on Instagram.
      </PageIntro>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-8">
        {photos.map((src, i) => (
          <div key={src} className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i > 0 ? "hidden sm:block" : ""}`}>
            <Image src={src} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-24">
        <h2 className="font-display text-4xl italic sm:text-5xl">How we work</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-2xl italic">{v.title}</h3>
              <p className="mt-2 text-bone/75">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <TrustStrip />
      <ClientProof />
      <CtaBand title="Let's plan your drive" />
      <Footer />
    </>
  );
}
