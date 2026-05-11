"use client";

import { useDatesProducts } from "@/lib/hooks/useCatalog";
import { CollectionPage } from "./CollectionPage";

const TYPE_OPTIONS = ["Medjool", "Sukkari", "Ajwa", "Mabroom", "Safawi/kalmi"] as const;

const BRAND_OPTIONS = ["Khejuri", "Ghorer Bazar"] as const;

export function DatesCollection() {
  const { isPending, isError, error, products } = useDatesProducts();

  return (
    <CollectionPage
      title="Dates"
      breadcrumbLabel="Dates"
      typeOptions={TYPE_OPTIONS}
      brandOptions={BRAND_OPTIONS}
      typeMatch="exact"
      products={products}
      isPending={isPending}
      isError={isError}
      error={error}
      priceFilterMode="slider"
      priceSliderCeiling={2700}
      showNewArrivalFilter
    />
  );
}
