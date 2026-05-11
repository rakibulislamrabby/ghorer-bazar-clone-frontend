export type ProductCartSnapshot = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  unitPriceBdt: number;
};

export type CartLine = ProductCartSnapshot & {
  qty: number;
  variantId: string | null;
  variantLabel: string | null;
};

export function cartLineKey(line: Pick<CartLine, "productId" | "variantId">): string {
  return `${line.productId}::${line.variantId ?? ""}`;
}
