"use client";

import { useRouter } from "next/navigation";
import type { ProductCartSnapshot } from "@/lib/cart-types";
import { useCart } from "@/app/components/CartProvider";

type Props = {
  snapshot: ProductCartSnapshot;
  addClassName?: string;
  buyClassName?: string;
};

export function AddToCartSnapshotButton({ snapshot, addClassName }: Pick<Props, "snapshot" | "addClassName">) {
  const { addOrMergeLine } = useCart();
  return (
    <button
      type="button"
      onClick={() =>
        addOrMergeLine({
          ...snapshot,
          qty: 1,
          variantId: null,
          variantLabel: null,
        })
      }
      className={
        addClassName ??
        "flex w-full items-center justify-center gap-2 rounded-md border-2 border-accent py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
      }
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 6h16l-2 12H6L4 6zM4 6L3 3H1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1" fill="currentColor" />
        <circle cx="18" cy="20" r="1" fill="currentColor" />
      </svg>
      Add To Cart
    </button>
  );
}

export function BuyNowSnapshotButton({ snapshot, buyClassName }: Pick<Props, "snapshot" | "buyClassName">) {
  const { addOrMergeLine } = useCart();
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        addOrMergeLine({
          ...snapshot,
          qty: 1,
          variantId: null,
          variantLabel: null,
        });
        router.push("/checkout");
      }}
      className={
        buyClassName ??
        "w-full rounded-md bg-accent py-2 text-sm font-semibold text-white transition hover:opacity-90"
      }
    >
      Buy now
    </button>
  );
}
