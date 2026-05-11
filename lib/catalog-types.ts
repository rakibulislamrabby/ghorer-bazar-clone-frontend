export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export type SubCategory = {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  label: string;
  size: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  images: string[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  subCategoryId: string | null;
  brand: string;
  brandSlug: string;
  images: string[];
  price: number;
  compareAtPrice: number | null;
  discountPrice: number | null;
  currency: string;
  vatPercent: number;
  stock: number;
  sku: string;
  barcode?: string;
  allowBackorder: boolean;
  lowStockThreshold: number;
  ratings: { average: number; count: number; histogram?: Record<string, number> };
  tags: string[];
  isFeatured: boolean;
  isBestSelling: boolean;
  isNew: boolean;
  isOffered: boolean;
  variants: ProductVariant[];
  specifications?: { name: string; value: string }[];
  shipping?: Record<string, unknown>;
  seo?: Record<string, string>;
  relatedProductIds?: string[];
  createdAt: string;
  updatedAt: string;
  /** Sidebar filter: Mustard Oil | Ghee | Coconut Oil | Olive Oil | Cooking Oil */
  filterType?: string;
};

export type CatalogData = {
  version: string;
  currencyDefault: string;
  categories: Category[];
  subCategories: SubCategory[];
  products: Product[];
  collectionFilters?: {
    "oil-ghee": {
      types: string[];
      brands: string[];
    };
    honey: {
      types: string[];
      brands: string[];
    };
    dates: {
      types: string[];
      brands: string[];
    };
  };
};
