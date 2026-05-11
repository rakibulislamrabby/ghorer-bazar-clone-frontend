import { notFound, redirect } from "next/navigation";
import { getCatalog } from "@/lib/get-catalog";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { products } = getCatalog();
  return products.map((p) => ({ id: p.id }));
}

/** Canonical URLs use `/product/[slug]`; this route resolves catalog IDs for convenience. */
export default async function ProductByIdPage({ params }: Props) {
  const { id } = await params;
  const product = getCatalog().products.find((p) => p.id === id);
  if (!product) notFound();
  redirect(`/product/${product.slug}`);
}
