import Image from "next/image";
import Link from "next/link";
import { AddToCartSnapshotButton, BuyNowSnapshotButton } from "@/app/components/cart/CartSnapshotButtons";
import type { Product } from "@/lib/catalog-types";
import { formatBdt, salePrice } from "@/lib/format-bdt";
import { getTopSellingProducts } from "@/lib/get-catalog";

function saveAmountBdt(p: Product): number | null {
  const list = p.compareAtPrice;
  if (list == null || list <= 0) return null;
  const pay = salePrice(p);
  if (pay >= list) return null;
  return list - pay;
}

function TopSellingCard({ product }: { product: Product }) {
  const img = product.images[0] ?? "/assets/logo/logo.png";
  const pay = salePrice(product);
  const list = product.compareAtPrice;
  const showStrike = list != null && list > pay;
  const saveAmt = saveAmountBdt(product);
  const href = `/product/${product.slug}`;

  return (
    <article className="flex overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md">
      <Link href={href} className="relative block w-[42%] shrink-0 self-stretch bg-white sm:w-[40%]">
        <div className="relative aspect-square h-full min-h-[140px] w-full sm:min-h-[160px]">
          <Image src={img} alt={product.name} fill className="object-contain p-3" sizes="(max-width:640px) 42vw, 200px" />
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={href}
              className="line-clamp-2 min-w-0 flex-1 text-sm font-bold leading-snug text-foreground hover:text-accent sm:text-base"
            >
              {product.name}
            </Link>
            {product.isBestSelling ? (
              <span className="shrink-0 rounded bg-badge px-1.5 py-0.5 text-[8px] font-bold uppercase leading-tight text-white shadow sm:text-[10px]">
                <span className="inline-flex items-center gap-0.5">
                  <span aria-hidden>★</span>
                  Best Selling
                </span>
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-bold text-accent sm:text-xl">{formatBdt(pay)}</span>
            {showStrike ? (
              <span className="text-sm text-muted-foreground line-through">{formatBdt(list)}</span>
            ) : null}
          </div>
          {saveAmt != null && saveAmt > 0 ? (
            <p className="mt-1.5 inline-block rounded-full bg-green-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              Save {formatBdt(saveAmt)}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <AddToCartSnapshotButton
            snapshot={{
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: img,
              unitPriceBdt: pay,
            }}
            addClassName="flex items-center justify-center gap-1 rounded-md border-2 border-accent py-2 text-center text-[11px] font-semibold text-accent transition hover:bg-accent hover:text-white sm:text-xs"
          />
          <BuyNowSnapshotButton
            snapshot={{
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: img,
              unitPriceBdt: pay,
            }}
            buyClassName="rounded-md bg-accent py-2 text-center text-[11px] font-semibold text-white transition hover:opacity-90 sm:text-xs"
          />
        </div>
      </div>
    </article>
  );
}

export function TopSellingProducts() {
  const products = getTopSellingProducts(4);

  if (products.length === 0) return null;

  return (
    <section className="bg-page  py-10 md:py-12" aria-labelledby="top-selling-heading">
      <div className="container-site">
        <h2 id="top-selling-heading" className="mb-8 text-center text-xl font-bold text-foreground md:text-2xl">
          Top Selling Products
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {products.map((p) => (
            <TopSellingCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
