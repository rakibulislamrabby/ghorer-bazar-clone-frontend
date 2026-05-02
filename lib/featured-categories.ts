import { categoryHref } from "./site-categories";

/** Order matches homepage featured carousel; images live under `public/assets/categories-icon/` */
export const FEATURED_CATEGORY_ITEMS = [
  { label: "Oil & Ghee", image: "/assets/categories-icon/ghee.png", href: categoryHref("Oil & Ghee") },
  { label: "Organic", image: "/assets/categories-icon/organic.png", href: "/category/organic" },
  { label: "Honey", image: "/assets/categories-icon/honey.png", href: categoryHref("Honey") },
  { label: "Dates", image: "/assets/categories-icon/dates.png", href: categoryHref("Dates") },
  { label: "Spices", image: "/assets/categories-icon/spices.png", href: categoryHref("Spices") },
  { label: "Nuts & Seeds", image: "/assets/categories-icon/nuts.png", href: categoryHref("Nuts & Seeds") },
  { label: "Beverage", image: "/assets/categories-icon/beverage.png", href: categoryHref("Beverage") },
  { label: "Rice", image: "/assets/categories-icon/rice.png", href: categoryHref("Rice") },
  { label: "Flours & Lentils", image: "/assets/categories-icon/functiona-food.png", href: categoryHref("Flours & Lentils") },
] as const;
