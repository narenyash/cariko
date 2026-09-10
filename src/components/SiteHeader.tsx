import Link from "next/link";
import { site } from "@/content/site";
import Logo from "@/components/Logo";

export default function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="focus-ring" aria-label={`${site.brand} — home`}>
          <Logo priority size={38} />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/fleet" className="focus-ring text-bone/80 transition-colors hover:text-champagne">
            Fleet
          </Link>
          <a href={`tel:${site.phoneE164}`} className="focus-ring text-champagne">
            {site.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
