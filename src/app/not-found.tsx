import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 pt-28 pb-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-champagne">404</p>
        <h1 className="mt-2 font-display text-5xl italic">Wrong turn</h1>
        <p className="mt-3 text-bone/75">That page isn&rsquo;t on our route. The cars are this way.</p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/fleet" className="focus-ring rounded-full bg-champagne px-6 py-3.5 text-sm font-semibold text-graphite">
            Browse the fleet
          </Link>
          <Link href="/" className="focus-ring rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-medium">
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
