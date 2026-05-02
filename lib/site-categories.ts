export const SITE_CATEGORIES = [
  "Oil & Ghee",
  "Honey",
  "Dates",
  "Spices",
  "Nuts & Seeds",
  "Beverage",
  "Rice",
  "Flours & Lentils",
  "Certified",
  "Pickle",
] as const;

/** Categories that show a submenu chevron in the mobile drawer */
export const CATEGORY_HAS_SUBMENU = new Set<string>([
  "Honey",
  "Dates",
  "Spices",
  "Nuts & Seeds",
  "Beverage",
  "Flours & Lentils",
]);

export function categoryHref(name: string) {
  return `/category/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"))}`;
}
