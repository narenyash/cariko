"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { categories } from "@/content/categories";
import { brands } from "@/content/fleet";

const MODES = [
  { value: "wedding", label: "Wedding" },
  { value: "chauffeur", label: "Chauffeur-driven" },
  { value: "self-drive", label: "Self-drive" },
];

export default function FleetFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function update(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleMode(value: string) {
    const current = new Set(searchParams.getAll("mode"));
    if (current.has(value)) current.delete(value);
    else current.add(value);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("mode");
    current.forEach((v) => params.append("mode", v));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const activeCategory = searchParams.get("category") ?? "";
  const activeBrand = searchParams.get("brand") ?? "";
  const activeModes = new Set(searchParams.getAll("mode"));

  return (
    <div className="space-y-3 border-b border-line pb-5 sm:space-y-4 sm:pb-6">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
        <Chip active={!activeCategory} onClick={() => update("category", null)}>
          All categories
        </Chip>
        {categories.map((c) => (
          <Chip key={c.id} active={activeCategory === c.id} onClick={() => update("category", c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-sm text-slate sm:w-auto">Drive</span>
          <div className="-mr-4 flex gap-2 overflow-x-auto pr-4 [scrollbar-width:none] sm:mr-0 sm:flex-wrap sm:pr-0 [&::-webkit-scrollbar]:hidden">
            {MODES.map((m) => (
              <Chip key={m.value} active={activeModes.has(m.value)} onClick={() => toggleMode(m.value)}>
                {m.label}
              </Chip>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate">
          <span className="w-12 shrink-0 sm:w-auto">Brand</span>
          <select
            value={activeBrand}
            onChange={(e) => update("brand", e.target.value || null)}
            className="focus-ring min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2 text-base text-bone sm:flex-none sm:text-sm"
          >
            <option value="" className="bg-surface text-bone">
              All brands
            </option>
            {brands.map((b) => (
              <option key={b} value={b} className="bg-surface text-bone">
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-champagne bg-champagne font-medium text-graphite"
          : "border-line bg-surface text-bone/80 hover:border-champagne"
      }`}
    >
      {children}
    </button>
  );
}
