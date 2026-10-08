"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";
import { reels } from "@/content/reels";
import { site, formatFollowers } from "@/content/site";

type InstgrmWindow = Window & {
  instgrm?: { Embeds: { process: () => void } };
};

function processEmbeds() {
  (window as InstgrmWindow).instgrm?.Embeds.process();
}

export default function ReelRail() {
  useEffect(() => {
    // Re-process when navigating back to a page where the script already loaded.
    processEmbeds();
  }, []);

  return (
    <section className="border-t border-line bg-surface">
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processEmbeds}
      />

      <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl italic sm:text-5xl">On the road</h2>
          <p className="mt-2 max-w-xl text-slate">
            Real reels from {site.instagramHandle} — weddings, handovers, and long drives across Ahmedabad.
          </p>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="w-[min(326px,calc(100vw-2rem))] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-canvas shadow-sm"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={reel.permalink}
                data-instgrm-version="14"
                style={{ margin: 0, width: "100%", minWidth: "100%", border: 0 }}
              >
                <a href={reel.permalink} target="_blank" rel="noopener noreferrer">
                  {reel.caption}
                </a>
              </blockquote>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate">
          <a
            href={`https://instagram.com/${site.instagramHandle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring font-medium text-champagne underline-offset-4 hover:underline"
          >
            {site.instagramHandle} · {formatFollowers(site.instagramFollowers)} followers
          </a>
          <Link
            href="/fleet"
            className="focus-ring underline-offset-4 hover:text-champagne hover:underline"
          >
            Browse the full fleet &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
