import fs from "fs";
import path from "path";
import type { CatalogData, Category, Product } from "@/lib/catalog-types";

let cache: CatalogData | null = null;
/** `mtimeMs` of `products.json` when `cache` was loaded — stale after edits until reload. */
let cacheSourceMtimeMs: number | null = null;

export function getCatalog(): CatalogData {
  const filePath = path.join(process.cwd(), "public/data/products.json");
  const mtimeMs = fs.statSync(filePath).mtimeMs;
  if (cache != null && cacheSourceMtimeMs === mtimeMs) {
    return cache;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  cache = JSON.parse(raw) as CatalogData;
  cacheSourceMtimeMs = mtimeMs;
  return cache;
}

export function getProductBySlug(slug: string): Product | null {
  return getCatalog().products.find((p) => p.slug === slug) ?? null;
}

export function getCategoryById(id: string): Category | undefined {
  return getCatalog().categories.find((c) => c.id === id);
}

/** Homepage “Top Selling” order; unknown slugs are ignored and remaining best-sellers fill the grid. */
const TOP_SELLING_SLUG_PRIORITY = [
  "gawa-ghee-1kg",
  "deshi-mustard-oil-5-liter",
  "sundarban-organic-honey",
  "premium-ajwa-dates-500g",
  "african-organic-wild-honey",
  "black-seed-honey-1kg",
] as const;

export function getTopSellingProducts(limit = 4): Product[] {
  const cat = getCatalog();
  const best = cat.products.filter((p) => p.isBestSelling);
  const rank = (slug: string) => {
    const i = TOP_SELLING_SLUG_PRIORITY.indexOf(slug as (typeof TOP_SELLING_SLUG_PRIORITY)[number]);
    return i === -1 ? 999 : i;
  };
  best.sort((a, b) => {
    const ra = rank(a.slug);
    const rb = rank(b.slug);
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name);
  });
  return best.slice(0, limit);
}

export function getRelatedProducts(product: Product): Product[] {
  const cat = getCatalog();
  const byId = new Map(cat.products.map((p) => [p.id, p]));
  const wanted = product.relatedProductIds ?? [];
  const out: Product[] = [];
  for (const id of wanted) {
    const p = byId.get(id);
    if (p && p.id !== product.id) out.push(p);
  }
  for (const p of cat.products) {
    if (out.length >= 8) break;
    if (p.id === product.id) continue;
    if (p.categoryId !== product.categoryId) continue;
    if (out.some((x) => x.id === p.id)) continue;
    out.push(p);
  }
  return out.slice(0, 8);
}
