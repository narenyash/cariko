"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function VehicleGallery({ name, images }: { name: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const isPlaceholder = images.every((src) => !src.startsWith("/fleet/"));

  function step(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) step(delta > 0 ? -1 : 1);
    dragStartX.current = null;
  }

  return (
    <div
      className="focus-ring relative aspect-[4/3] cursor-grab touch-pan-y select-none overflow-hidden rounded-2xl border border-line bg-surface active:cursor-grabbing lg:aspect-auto lg:h-[60vh] lg:min-h-[420px]"
      role="group"
      aria-label={`${name}, drag or use arrow keys to browse photos`}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      {images.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt={i === 0 ? name : ""}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className={`object-cover transition-opacity duration-150 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {images.length > 1 && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-champagne" : "bg-white/50"}`} />
          ))}
        </div>
      )}
      {isPlaceholder && (
        <p className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/40 px-2 py-1 text-xs text-white/80 backdrop-blur">
          Representative photo
        </p>
      )}
    </div>
  );
}
