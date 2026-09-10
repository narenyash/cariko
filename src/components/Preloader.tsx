"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/content/site";
import Logo from "@/components/Logo";

const SESSION_KEY = "ht-preloaded";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Only run the intro once per browser tab session.
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    const finish = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      document.body.style.overflow = "";
      setDone(true);
    };

    if (alreadySeen) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = window.setTimeout(finish, 450);
      return () => window.clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const mark = root.querySelector("[data-logo-mark]");
      const words = root.querySelectorAll("[data-word]");
      const bar = root.querySelector("[data-bar]");

      gsap.set(words, { yPercent: 120 });
      gsap.set(mark, {
        transformOrigin: "50% 50%",
        scale: 0.2,
        rotate: -160,
        autoAlpha: 0,
      });

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(mark, {
        scale: 1,
        rotate: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "back.out(1.5)",
      })
        .to(
          mark,
          {
            boxShadow: "0 0 44px rgba(232,148,0,0.55)",
            duration: 0.35,
            yoyo: true,
            repeat: 1,
          },
          "-=0.25",
        )
        .to(
          words,
          { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.12 },
          "-=0.35",
        )
        .to(bar, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.5")
        .to(root, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, ">+0.15");
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  const [first, ...rest] = site.brand.split(" ");
  const second = rest.join(" ");

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite"
      style={{
        background:
          "radial-gradient(900px 520px at 50% 42%, #5a3a0d 0%, transparent 70%), var(--color-graphite)",
      }}
    >
      <Logo wordmark={false} priority size={128} />

      <div className="mt-6 text-center font-display text-[13vw] italic leading-none text-white sm:text-6xl">
        <span className="inline-flex overflow-hidden pb-[0.12em] align-bottom">
          <span data-word className="inline-block">
            {first}&nbsp;
          </span>
        </span>
        <span className="inline-flex overflow-hidden pb-[0.12em] align-bottom">
          <span data-word className="inline-block text-champagne">
            {second}
          </span>
        </span>
      </div>

      <div className="mt-9 h-[3px] w-40 overflow-hidden rounded-full bg-white/15">
        <div
          data-bar
          className="h-full w-full origin-left scale-x-0 bg-champagne"
        />
      </div>
    </div>
  );
}
