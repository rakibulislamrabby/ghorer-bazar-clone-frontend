"use client";

import { useOilGheeProducts } from "@/lib/hooks/useCatalog";
import { CollectionPage } from "./CollectionPage";

const TYPE_OPTIONS = ["Cooking Oil", "Coconut Oil", "Olive Oil", "Ghee", "Mustard Oil"] as const;
const BRAND_OPTIONS = [
  "Applied Nutrition",
  "Ceylon Naturals",
  "Ghorer Bazar",
  "Glarvest",
  "Olitalla",
  "Palermo",
] as const;

export function OilGheeCollection() {
  const { isPending, isError, error, products } = useOilGheeProducts();

  return (
    <CollectionPage
      title="Oil & Ghee"
      breadcrumbLabel="Oil & Ghee"
      typeOptions={TYPE_OPTIONS}
      brandOptions={BRAND_OPTIONS}
      typeMatch="oil-ghee"
      products={products}
      isPending={isPending}
      isError={isError}
      error={error}
    />
  );
}
