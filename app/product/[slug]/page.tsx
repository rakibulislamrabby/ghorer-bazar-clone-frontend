import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/app/components/product/ProductDetailClient";
import { getCatalog, getCategoryById, getProductBySlug, getRelatedProducts } from "@/lib/get-catalog";
import { buildProductDetailSections } from "@/lib/product-detail-sections";
import { categoryCollectionHref } from "@/lib/site-categories";

type Props = { params: Promise<{ slug: string }> };

/** Allow any catalog slug (e.g. new JSON rows) without rebuilding static paths first. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const { products } = getCatalog();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product | Ghorer Bazar" };
  const title = product.seo?.metaTitle ?? `${product.name} | Ghorer Bazar`;
  const description = product.seo?.metaDescription ?? product.shortDescription;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryById(product.categoryId);
  const categoryName = category?.name ?? "Products";
  const categoryHref = category ? categoryCollectionHref(category.name) : "/search";
  const related = getRelatedProducts(product);
  const sections = buildProductDetailSections(product);

  return (
    <ProductDetailClient
      product={product}
      categoryName={categoryName}
      categoryHref={categoryHref}
      sections={sections}
      related={related}
    />
  );
}
