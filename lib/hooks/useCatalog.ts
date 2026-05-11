"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCatalog } from "@/lib/api/fetchCatalog";
import type { Product } from "@/lib/catalog-types";

export function useCatalog() {
  return useQuery({
    queryKey: ["catalog", "products"],
    queryFn: fetchCatalog,
  });
}

const CAT_HONEY = "cat_1";
const CAT_OIL_GHEE = "cat_2";

export function useHoneyProducts() {
  const q = useCatalog();
  const products: Product[] = q.data?.products.filter((p) => p.categoryId === CAT_HONEY) ?? [];
  return { ...q, products };
}

export function useOilGheeProducts() {
  const q = useCatalog();
  const products: Product[] =
    q.data?.products.filter((p) => p.categoryId === CAT_OIL_GHEE) ?? [];
  return { ...q, products };
}
