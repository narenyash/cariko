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
    <div className="space-y-4 border-b border-line pb-6">
      <div className="flex flex-wrap gap-2">
        <Chip active={!activeCategory} onClick={() => update("category", null)}>
          All categories
        </Chip>
        {categories.map((c) => (
          <Chip key={c.id} active={activeCategory === c.id} onClick={() => update("category", c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate">Drive</span>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <Chip key={m.value} active={activeModes.has(m.value)} onClick={() => toggleMode(m.value)}>
                {m.label}
              </Chip>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate">
          Brand
          <select
            value={activeBrand}
            onChange={(e) => update("brand", e.target.value || null)}
            className="focus-ring border border-line bg-transparent px-3 py-2 text-bone"
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
      className={`focus-ring border px-3 py-1.5 text-sm transition-colors ${
        active ? "border-champagne text-champagne" : "border-line text-bone/80 hover:border-slate"
      }`}
    >
      {children}
    </button>
  );
}
