import axios from "axios";
import type { CatalogData } from "@/lib/catalog-types";

/** Client-side catalog fetch (same-origin `/public/data/products.json`). */
export async function fetchCatalog(): Promise<CatalogData> {
  const { data } = await axios.get<CatalogData>("/data/products.json", {
    headers: { Accept: "application/json" },
    timeout: 15_000,
  });
  return data;
}
