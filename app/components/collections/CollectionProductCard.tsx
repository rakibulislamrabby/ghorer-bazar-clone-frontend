import Image from "next/image";
import Link from "next/link";
import { AddToCartSnapshotButton } from "@/app/components/cart/CartSnapshotButtons";
import type { Product } from "@/lib/catalog-types";
import { formatBdt, salePrice, savePercent } from "@/lib/format-bdt";

type Props = { product: Product };

export function CollectionProductCard({ product }: Props) {
  const img = product.images[0] ?? "/assets/logo/logo.png";
  const pay = salePrice(product);
  const list = product.compareAtPrice;
  const showStrike = list != null && list > pay;
  const pct = savePercent(product);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full bg-white">
        <div className="absolute left-2 top-2 z-10 flex max-w-[55%] flex-col gap-1">
          {product.isNew ? (
            <span className="w-fit rounded bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
              New Arrival
            </span>
          ) : null}
          {product.isBestSelling ? (
            <span className="w-fit rounded bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
              Best Selling
            </span>
          ) : null}
        </div>
        {pct != null && pct > 0 ? (
          <span className="absolute right-2 top-2 z-10 rounded bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            Save {pct}%
          </span>
        ) : null}
        <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
          <Image src={img} alt={product.name} fill className="object-contain p-4" sizes="(max-width:640px) 50vw, 25vw" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 pt-2">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-[2.5rem] text-left text-sm font-semibold leading-snug text-foreground hover:text-accent"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-accent">{formatBdt(pay)}</span>
          {showStrike ? (
            <span className="text-sm text-muted-foreground line-through">{formatBdt(list)}</span>
          ) : null}
        </div>

        <AddToCartSnapshotButton
          snapshot={{
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: img,
            unitPriceBdt: pay,
          }}
          addClassName="mt-1 flex w-full items-center justify-center gap-2 rounded-md border-2 border-accent py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
        />
      </div>
    </article>
  );
}
