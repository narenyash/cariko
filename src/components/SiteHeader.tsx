"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { site, waLink } from "@/content/site";
import { navLinks } from "@/content/copy";
import Logo from "@/components/Logo";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-8">
          <Link
            href="/"
            className="focus-ring"
            aria-label={`${site.brand} — home`}
          >
            <Logo priority size={36} wordmarkClassName="text-lg sm:text-xl" />
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "focus-ring transition-colors hover:text-champagne",
                  isActive(l.href)
                    ? "font-medium text-champagne"
                    : "text-bone/80",
                )}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phoneE164}`}
              className="focus-ring rounded-full bg-champagne px-4 py-2 font-semibold text-graphite transition hover:brightness-105"
            >
              Call {site.phoneDisplay}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="focus-ring -mr-2 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={clsx(
                  "absolute left-0 h-0.5 w-5 rounded bg-bone transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 h-0.5 w-5 rounded bg-bone transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 h-0.5 w-5 rounded bg-bone transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Sibling of <header>, not a child: the header's backdrop-filter would trap a fixed child inside it. */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        className={clsx(
          "fixed inset-x-0 bottom-0 top-14 z-50 overflow-y-auto bg-canvas transition-[opacity,transform] duration-300 md:hidden",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="flex min-h-full flex-col px-5 pb-10 pt-6">
          <ul className="divide-y divide-line border-y border-line">
            {[{ href: "/", label: "Home" }, ...navLinks].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "focus-ring flex items-center justify-between py-4 font-display text-3xl italic",
                    (l.href === "/" ? pathname === "/" : isActive(l.href)) &&
                      "text-champagne",
                  )}
                >
                  {l.label}
                  <span aria-hidden className="text-base not-italic text-slate">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3 pt-10">
            <a
              href={`tel:${site.phoneE164}`}
              className="focus-ring block rounded-full bg-champagne px-6 py-4 text-center font-semibold text-graphite"
            >
              Call {site.phoneDisplay}
            </a>
            <a
              href={waLink(
                `Hi ${site.brand}, I'd like to ask about a booking.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring block rounded-full border border-line bg-surface px-6 py-4 text-center font-medium"
            >
              Message on WhatsApp
            </a>
            <p className="pt-2 text-center text-sm text-slate">
              {site.hours} · {site.rating}★ from {site.reviewCount} reviews
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
