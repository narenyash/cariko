import clsx from "clsx";
import Image from "next/image";
import { site } from "@/content/site";

/**
 * Honey Travels brand mark (public/logo.jpg — the gold HT Luxury emblem).
 * The Preloader animates it by targeting the `data-logo-mark` hook.
 */
export default function Logo({
  className,
  size = 36,
  priority = false,
  wordmark = true,
  wordmarkClassName,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
  wordmark?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.jpg"
        alt={site.brand}
        width={size}
        height={size}
        priority={priority}
        data-logo-mark
        className="shrink-0 rounded-full ring-1 ring-champagne/40"
        style={{ width: size, height: size }}
      />
      {wordmark && (
        <span
          data-logo-word
          className={clsx("font-display text-xl italic leading-none", wordmarkClassName)}
        >
          {site.brand}
        </span>
      )}
    </span>
  );
}
