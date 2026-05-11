"use client";

import { useHoneyProducts } from "@/lib/hooks/useCatalog";
import { CollectionPage } from "./CollectionPage";

const TYPE_OPTIONS = [
  "Organic Honey",
  "Raw Honey",
  "Mixed Flower",
  "Black Seed Honey",
  "Litchi Honey",
  "Wild Honey",
  "Combo",
] as const;

const BRAND_OPTIONS = ["Ghorer Bazar", "Ceylon Naturals", "Nature Pure", "Forest Gold"] as const;

export function HoneyCollection() {
  const { isPending, isError, error, products } = useHoneyProducts();

  return (
    <CollectionPage
      title="Honey"
      breadcrumbLabel="Honey"
      typeOptions={TYPE_OPTIONS}
      brandOptions={BRAND_OPTIONS}
      typeMatch="exact"
      products={products}
      isPending={isPending}
      isError={isError}
      error={error}
    />
  );
}
