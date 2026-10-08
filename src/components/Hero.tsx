"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { site, formatFollowers } from "@/content/site";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll("[data-word]");
    gsap.set(words, { yPercent: 110 });
    gsap.to(words, {
      yPercent: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.08,
      delay: 0.2,
    });
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <Image
        src="/fleet/rolls-royce-ghost.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-graphite/25" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-8 sm:pb-14">
        <p className="text-xs font-medium uppercase tracking-wide text-white/80 sm:text-sm">
          {site.city} · {formatFollowers(site.instagramFollowers)} followers on Instagram
        </p>
        <h1
          ref={headlineRef}
          className="mt-3 max-w-3xl overflow-hidden font-display text-[15vw] italic leading-[0.95] text-white sm:text-6xl md:text-7xl"
        >
          <span className="block overflow-hidden">
            <span data-word className="block">
              {site.brand}
            </span>
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
          {site.fleetSize} cars across {site.brandCount} brands — wedding convoys, chauffeur-driven days, and
          self-drive weekends, all out of {site.city}.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:max-w-lg">
          <Link
            href="/fleet?category=wedding"
            className="focus-ring flex-1 rounded-full bg-champagne px-6 py-4 text-center text-sm font-semibold text-graphite shadow-lg shadow-black/20 transition hover:brightness-105"
          >
            Planning a wedding
          </Link>
          <Link
            href="/fleet?category=self-drive-everyday&mode=self-drive"
            className="focus-ring flex-1 rounded-full border border-white/50 bg-white/10 px-6 py-4 text-center text-sm font-medium text-white backdrop-blur transition-colors hover:border-white hover:bg-white/20"
          >
            Self-drive a car
          </Link>
        </div>
        <Link href="/fleet" className="focus-ring mt-4 inline-block text-sm text-white/75 underline-offset-4 hover:text-champagne hover:underline">
          Or browse the full fleet
        </Link>
      </div>
    </section>
  );
}
