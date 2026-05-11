import fs from "fs";
import path from "path";
import type { CatalogData, Category, Product } from "@/lib/catalog-types";

let cache: CatalogData | null = null;

export function getCatalog(): CatalogData {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), "public/data/products.json");
  const raw = fs.readFileSync(filePath, "utf8");
  cache = JSON.parse(raw) as CatalogData;
  return cache;
}

export function getProductBySlug(slug: string): Product | null {
  return getCatalog().products.find((p) => p.slug === slug) ?? null;
}

export function getCategoryById(id: string): Category | undefined {
  return getCatalog().categories.find((c) => c.id === id);
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
