"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/catalog-types";
import { salePrice } from "@/lib/format-bdt";
import { CollectionProductCard } from "./CollectionProductCard";

export type CollectionTypeMatch = "oil-ghee" | "exact";

export type PriceFilterMode = "inputs" | "slider";

export type CollectionPageProps = {
  title: string;
  breadcrumbLabel: string;
  typeOptions: readonly string[];
  brandOptions: readonly string[];
  typeMatch: CollectionTypeMatch;
  products: Product[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  /** Default: min/max number fields + Go */
  priceFilterMode?: PriceFilterMode;
  /** Upper bound for the price slider (BDT). Default 2700. */
  priceSliderCeiling?: number;
  /** Sidebar checkbox: only products with `isNew` */
  showNewArrivalFilter?: boolean;
};

type SortKey = "default" | "price-asc" | "price-desc" | "name";

function matchesTypeOilGhee(p: Product, selected: Set<string>) {
  if (selected.size === 0) return true;
  const ft = p.filterType ?? "";
  for (const t of selected) {
    if (t === "Cooking Oil") {
      if (ft === "Mustard Oil" || ft === "Cooking Oil") return true;
    } else if (ft === t) return true;
  }
  return false;
}

function matchesTypeExact(p: Product, selected: Set<string>) {
  if (selected.size === 0) return true;
  const ft = p.filterType ?? "";
  return selected.has(ft);
}

function matchesBrand(p: Product, selected: Set<string>) {
  if (selected.size === 0) return true;
  return selected.has(p.brand);
}

function inPriceRange(p: Product, min: number | null, max: number | null) {
  const price = salePrice(p);
  if (min != null && price < min) return false;
  if (max != null && price > max) return false;
  return true;
}

function sortProducts(list: Product[], key: SortKey) {
  const copy = [...list];
  if (key === "price-asc") copy.sort((a, b) => salePrice(a) - salePrice(b));
  else if (key === "price-desc") copy.sort((a, b) => salePrice(b) - salePrice(a));
  else if (key === "name") copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
}

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-lg border border-border bg-card" open>
      <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between">
          {title}
          <span className="text-muted-foreground transition group-open:rotate-180">▼</span>
        </span>
      </summary>
      <div className="border-t border-border px-3 py-3">{children}</div>
    </details>
  );
}

export function CollectionPage({
  title,
  breadcrumbLabel,
  typeOptions,
  brandOptions,
  typeMatch,
  products,
  isPending,
  isError,
  error,
  priceFilterMode = "inputs",
  priceSliderCeiling = 2700,
  showNewArrivalFilter = false,
}: CollectionPageProps) {
  const [types, setTypes] = useState<Set<string>>(() => new Set());
  const [brands, setBrands] = useState<Set<string>>(() => new Set());
  const [minDraft, setMinDraft] = useState("");
  const [maxDraft, setMaxDraft] = useState("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(priceSliderCeiling);
  const [onlyNewArrival, setOnlyNewArrival] = useState(false);

  const filtered = useMemo(() => {
    const typeOk =
      typeMatch === "oil-ghee"
        ? (p: Product) => matchesTypeOilGhee(p, types)
        : (p: Product) => matchesTypeExact(p, types);
    const priceMin = priceFilterMode === "slider" ? sliderMin : minPrice;
    const priceMax = priceFilterMode === "slider" ? sliderMax : maxPrice;
    let list = products.filter((p) => {
      if (!typeOk(p) || !matchesBrand(p, brands)) return false;
      if (showNewArrivalFilter && onlyNewArrival && !p.isNew) return false;
      return inPriceRange(p, priceMin, priceMax);
    });
    list = sortProducts(list, sortKey);
    return list;
  }, [
    products,
    types,
    brands,
    minPrice,
    maxPrice,
    sortKey,
    typeMatch,
    priceFilterMode,
    sliderMin,
    sliderMax,
    showNewArrivalFilter,
    onlyNewArrival,
  ]);

  function toggle(set: Set<string>, v: string, setter: (s: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    setter(next);
  }

  function applyPrice() {
    const mn = minDraft.trim() === "" ? null : Number(minDraft);
    const mx = maxDraft.trim() === "" ? null : Number(maxDraft);
    setMinPrice(Number.isFinite(mn as number) && !Number.isNaN(mn) ? mn : null);
    setMaxPrice(Number.isFinite(mx as number) && !Number.isNaN(mx) ? mx : null);
  }

  return (
    <div className="container-site pb-6 pt-3 md:pb-8 md:pt-4">
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="transition hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="font-medium text-foreground">{breadcrumbLabel}</li>
          </ol>
        </nav>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 space-y-3 lg:sticky lg:top-4 lg:w-64 xl:w-72">
          <FilterBlock title="Filter By Category">
            <ul className="space-y-2">
              {typeOptions.map((t) => (
                <li key={t}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={types.has(t)}
                      onChange={() => toggle(types, t, setTypes)}
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    {t}
                  </label>
                </li>
              ))}
            </ul>
          </FilterBlock>

          <FilterBlock title="Price">
            {priceFilterMode === "slider" ? (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>৳{sliderMin.toLocaleString("en-BD")}</span>
                  <span>৳{sliderMax.toLocaleString("en-BD")}</span>
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-muted-foreground">
                    Min
                    <input
                      type="range"
                      min={0}
                      max={priceSliderCeiling}
                      value={sliderMin}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setSliderMin(Math.min(v, sliderMax));
                      }}
                      className="mt-1 h-2 w-full cursor-pointer accent-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    Max
                    <input
                      type="range"
                      min={0}
                      max={priceSliderCeiling}
                      value={sliderMax}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setSliderMax(Math.max(v, sliderMin));
                      }}
                      className="mt-1 h-2 w-full cursor-pointer accent-accent"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-end gap-2">
                <label className="flex min-w-[4rem] flex-1 flex-col gap-1 text-xs text-muted-foreground">
                  min
                  <input
                    value={minDraft}
                    onChange={(e) => setMinDraft(e.target.value)}
                    type="number"
                    min={0}
                    placeholder="0"
                    className="rounded-md border border-border bg-muted/50 px-2 py-1.5 text-sm text-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </label>
                <label className="flex min-w-[4rem] flex-1 flex-col gap-1 text-xs text-muted-foreground">
                  max
                  <input
                    value={maxDraft}
                    onChange={(e) => setMaxDraft(e.target.value)}
                    type="number"
                    min={0}
                    placeholder="99999"
                    className="rounded-md border border-border bg-muted/50 px-2 py-1.5 text-sm text-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </label>
                <button type="button" onClick={applyPrice} className="btn-primary shrink-0 rounded-md px-4 py-2 text-sm font-semibold">
                  Go
                </button>
              </div>
            )}
          </FilterBlock>

          <FilterBlock title="Brands">
            <ul className="space-y-2">
              {brandOptions.map((b) => (
                <li key={b}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={brands.has(b)}
                      onChange={() => toggle(brands, b, setBrands)}
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    {b}
                  </label>
                </li>
              ))}
            </ul>
          </FilterBlock>

          {showNewArrivalFilter ? (
            <FilterBlock title="Product Flag">
              <ul className="space-y-2">
                <li>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={onlyNewArrival}
                      onChange={(e) => setOnlyNewArrival(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    New Arrival
                  </label>
                </li>
              </ul>
            </FilterBlock>
          ) : null}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="shrink-0 font-medium">Sort By</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="min-w-[10rem] rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          {isPending ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-lg bg-muted/60" />
              ))}
            </div>
          ) : null}

          {isError ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              {error instanceof Error ? error.message : "Could not load products."}
            </p>
          ) : null}

          {!isPending && !isError ? (
            filtered.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">No products match your filters.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <CollectionProductCard key={p.id} product={p} />
                ))}
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
