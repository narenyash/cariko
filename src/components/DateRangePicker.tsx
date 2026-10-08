"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function buildMonthGrid(year: number, month: number) {
  const startDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = Array(startDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(toKey(year, month, d));
  return cells;
}

export function formatDisplay(key: string) {
  if (!key) return null;
  const [y, m, d] = key.split("-").map(Number);
  return `${d} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
}

interface Props {
  from: string;
  to: string;
  minDate: string;
  onChange: (from: string, to: string) => void;
}

export default function DateRangePicker({ from, to, onChange, minDate }: Props) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => Number((from || minDate).split("-")[0]));
  const [viewMonth, setViewMonth] = useState(() => Number((from || minDate).split("-")[1]) - 1);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
  };

  const pickDay = (key: string) => {
    if (key < minDate) return;
    if (!from || (from && to)) onChange(key, "");
    else if (key < from) onChange(key, "");
    else {
      onChange(from, key);
      setOpen(false);
    }
  };

  const cells = buildMonthGrid(viewYear, viewMonth);
  const prevDisabled =
    viewYear === Number(minDate.split("-")[0]) && viewMonth === Number(minDate.split("-")[1]) - 1;

  const field = (label: string, value: string) => (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className={clsx(
        "focus-ring flex flex-1 items-center gap-3 rounded-xl border bg-surface px-4 py-3 text-left transition-colors",
        open ? "border-champagne" : "border-line hover:border-champagne",
      )}
    >
      <span aria-hidden className="text-champagne">&#128197;</span>
      <span className="flex flex-col">
        <span className="text-xs text-slate">{label}</span>
        <span className={clsx("text-base", value ? "text-bone" : "text-slate")}>
          {formatDisplay(value) || "Select date"}
        </span>
      </span>
    </button>
  );

  return (
    <div className="relative" ref={wrapRef}>
      <div className="flex items-stretch gap-2">
        {field("Pickup date", from)}
        <span className="self-center text-slate" aria-hidden>&rarr;</span>
        {field("Return date", to)}
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 rounded-2xl border border-line bg-surface p-4 shadow-xl sm:right-auto sm:w-80">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              disabled={prevDisabled}
              aria-label="Previous month"
              className="focus-ring h-8 w-8 rounded-full text-bone hover:bg-champagne/15 disabled:opacity-30"
            >
              &lsaquo;
            </button>
            <span className="font-medium">{MONTHS[viewMonth]} {viewYear}</span>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="focus-ring h-8 w-8 rounded-full text-bone hover:bg-champagne/15"
            >
              &rsaquo;
            </button>
          </div>
          <div className="mt-3 grid grid-cols-7 text-center text-xs text-slate">
            {WEEKDAYS.map((w, i) => <span key={i}>{w}</span>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-sm">
            {cells.map((key, i) => {
              if (!key) return <span key={`empty-${i}`} />;
              const disabled = key < minDate;
              const selected = key === from || key === to;
              const inRange = from && to && key > from && key < to;
              return (
                <button
                  type="button"
                  key={key}
                  disabled={disabled}
                  onClick={() => pickDay(key)}
                  className={clsx(
                    "focus-ring tabular h-9 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-30",
                    selected && "bg-champagne font-semibold text-graphite",
                    !selected && inRange && "rounded-none bg-champagne/15 text-bone",
                    !selected && !inRange && "hover:bg-champagne/10",
                  )}
                >
                  {Number(key.split("-")[2])}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-slate">
            <span>{from && !to ? "Now pick your return date" : "Select a pickup & return date"}</span>
            {(from || to) && (
              <button type="button" onClick={() => onChange("", "")} className="focus-ring text-champagne">
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
