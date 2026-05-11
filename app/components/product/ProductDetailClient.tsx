"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/app/components/CartProvider";
import type { Product } from "@/lib/catalog-types";
import { formatBdt, salePrice } from "@/lib/format-bdt";
import type { ProductDetailSections } from "@/lib/product-detail-sections";
import { CollectionProductCard } from "@/app/components/collections/CollectionProductCard";
type Props = {
  product: Product;
  categoryName: string;
  categoryHref: string;
  sections: ProductDetailSections;
  related: Product[];
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "8801517831868";
const ORDER_PHONE = process.env.NEXT_PUBLIC_ORDER_PHONE ?? "+8809612345678";

function collectImages(product: Product, variantIdx: number | null): string[] {
  const seen = new Set<string>();
  const add = (u: string) => {
    if (u) seen.add(u);
  };
  for (const u of product.images) add(u);
  if (variantIdx != null && product.variants[variantIdx]) {
    for (const u of product.variants[variantIdx].images) add(u);
  }
  const list = Array.from(seen);
  return list.length ? list : ["/assets/logo/logo.png"];
}

export function ProductDetailClient({ product, categoryName, categoryHref, sections, related }: Props) {
  const router = useRouter();
  const { addOrMergeLine, totalQty, subtotalBdt } = useCart();
  const [variantIdx, setVariantIdx] = useState<number | null>(
    product.variants.length > 0 ? 0 : null,
  );
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState<"desc" | "reviews">("desc");

  const images = useMemo(() => collectImages(product, variantIdx), [product, variantIdx]);

  const unitPrice = useMemo(() => {
    if (variantIdx != null && product.variants[variantIdx]) {
      return product.variants[variantIdx].price;
    }
    return salePrice(product);
  }, [product, variantIdx]);

  const listPrice = useMemo(() => {
    if (variantIdx != null && product.variants[variantIdx]) {
      return product.variants[variantIdx].compareAtPrice;
    }
    return product.compareAtPrice;
  }, [product, variantIdx]);

  const stock =
    variantIdx != null && product.variants[variantIdx]
      ? product.variants[variantIdx].stock
      : product.stock;

  const maxQty = Math.max(1, stock);
  const canPurchase = stock > 0;

  const variant = variantIdx != null ? product.variants[variantIdx] : null;
  const cartImage = images[0] ?? "/assets/logo/logo.png";

  function addCurrentToCart() {
    if (!canPurchase) return;
    addOrMergeLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: cartImage,
      unitPriceBdt: unitPrice,
      qty,
      variantId: variant?.id ?? null,
      variantLabel: variant?.label ?? null,
      maxQty: stock,
    });
  }

  const waText = useMemo(
    () =>
      `Hello Ghorer Bazar, I want to order: ${product.name} (${product.sku}) x${qty}. Price shown: ${formatBdt(unitPrice)} each.`,
    [product.name, product.sku, qty, unitPrice],
  );

  const waDigits = WA_NUMBER.replace(/\D/g, "");
  const waHref = `https://wa.me/${waDigits}?text=${encodeURIComponent(waText)}`;
  const chatHref = `https://wa.me/${waDigits}?text=${encodeURIComponent("Hello Ghorer Bazar, I need help with an order.")}`;
  const telHref = ORDER_PHONE.replace(/\s/g, "").startsWith("+")
    ? `tel:${ORDER_PHONE.replace(/\s/g, "")}`
    : `tel:+${ORDER_PHONE.replace(/\D/g, "")}`;

  function bumpQty(delta: number) {
    setQty((q) => Math.min(maxQty, Math.max(1, q + delta)));
  }

  function onVariantChange(index: number) {
    setVariantIdx(index);
    setImgIdx(0);
    setQty(1);
  }

  const mainImg = images[imgIdx] ?? images[0];
  const r = product.ratings;
  const hist = r.histogram ?? {};
  const totalRated = [5, 4, 3, 2, 1].reduce((acc, k) => acc + (hist[String(k)] ?? 0), 0);

  return (
    <div className="relative pb-24 lg:pb-12">
      {/* Breadcrumb */}
      <nav className="container-site mb-4 pt-3 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-border">
            ›
          </li>
          <li>
            <Link href="/search" className="transition hover:text-accent">
              Products
            </Link>
          </li>
          <li aria-hidden className="text-border">
            ›
          </li>
          <li>
            <Link href={categoryHref} className="transition hover:text-accent">
              {categoryName}
            </Link>
          </li>
          <li aria-hidden className="text-border">
            ›
          </li>
          <li className="font-medium text-foreground line-clamp-1">{product.name}</li>
        </ol>
      </nav>

      <div className="container-site">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6 lg:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* Gallery */}
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-[52%]">
              <div className="flex flex-row gap-2 sm:flex-col sm:overflow-y-auto">
                {images.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setImgIdx(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white sm:h-20 sm:w-20 ${
                      i === imgIdx ? "border-accent" : "border-border"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-contain p-1" sizes="80px" />
                  </button>
                ))}
              </div>
              <div className="relative min-h-[280px] flex-1 sm:min-h-[360px] lg:min-h-[420px]">
                <Image
                  src={mainImg}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm transition hover:bg-muted"
                  onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm transition hover:bg-muted"
                  onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                >
                  ›
                </button>
              </div>
            </div>

            {/* Buy box */}
            <div className="min-w-0 flex-1 space-y-5">
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{product.name}</h1>

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-accent">{formatBdt(unitPrice)}</span>
                {listPrice != null && listPrice > unitPrice ? (
                  <span className="text-lg text-muted-foreground line-through">{formatBdt(listPrice)}</span>
                ) : null}
                {qty > 1 ? (
                  <span className="text-sm font-medium text-foreground">
                    Total: {formatBdt(unitPrice * qty)}
                  </span>
                ) : null}
              </div>

              {product.variants.length > 0 ? (
                <div className="max-w-md">
                  <label htmlFor="variant" className="mb-1 block text-sm font-medium text-foreground">
                    Size / pack
                  </label>
                  <select
                    id="variant"
                    value={variantIdx ?? 0}
                    onChange={(e) => onVariantChange(Number(e.target.value))}
                    className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  >
                    {product.variants.map((v, i) => (
                      <option key={v.id} value={i}>
                        {v.label} — {formatBdt(v.price)}
                        {v.stock <= 0 ? " (out of stock)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="inline-flex items-center rounded-lg border border-border bg-muted/40">
                  <button
                    type="button"
                    className="px-3 py-2 text-lg leading-none text-foreground disabled:opacity-40"
                    onClick={() => bumpQty(-1)}
                    disabled={qty <= 1}
                  >
                    −
                  </button>
                  <span className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums">{qty}</span>
                  <button
                    type="button"
                    className="px-3 py-2 text-lg leading-none text-foreground disabled:opacity-40"
                    onClick={() => bumpQty(1)}
                    disabled={qty >= maxQty}
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">{stock} available</span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:max-w-xl">
                <button
                  type="button"
                  disabled={!canPurchase}
                  onClick={addCurrentToCart}
                  className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4 6h16l-2 12H6L4 6zM4 6L3 3H1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  ADD TO CART
                </button>
                <button
                  type="button"
                  disabled={!canPurchase}
                  onClick={() => {
                    addCurrentToCart();
                    router.push("/checkout");
                  }}
                  className="rounded-lg bg-nav px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  BUY NOW
                </button>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order On WhatsApp
                </a>
                <a
                  href={telHref}
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.44 12.44 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.44 12.44 0 002.81.7A2 2 0 0122 16.92z" strokeLinejoin="round" />
                  </svg>
                  Call For Order
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <span className="text-sm font-medium text-muted-foreground">Brand:</span>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-sm font-bold text-accent">
                    {product.brand.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{product.brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex border-b border-border">
            <button
              type="button"
              onClick={() => setTab("desc")}
              className={`px-5 py-3 text-sm font-semibold transition sm:px-8 ${
                tab === "desc"
                  ? "border-b-2 border-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setTab("reviews")}
              className={`px-5 py-3 text-sm font-semibold transition sm:px-8 ${
                tab === "reviews"
                  ? "border-b-2 border-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Customer Reviews ({r.count})
            </button>
          </div>

          <div className="p-5 md:p-8">
            {tab === "desc" ? (
              <div className="space-y-6 text-foreground">
                <div>
                  <h2 className="inline-block border-b-[3px] border-accent pb-1 text-lg font-bold">
                    Product Details
                  </h2>
                </div>
                <p className="text-base leading-relaxed">
                  <strong>{product.name}</strong>
                  <span className="text-muted-foreground"> — </span>
                  {sections.introLine}
                </p>
                {sections.descriptionParagraphs.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
                <div className="space-y-2">
                  <p className="font-bold text-foreground">Key Features:</p>
                  {sections.keyFeatures.map((line, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-foreground">Health Benefits:</p>
                  {sections.healthBenefits.map((line, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-foreground">Usage &amp; Storage:</p>
                  {sections.usageStorage.map((line, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4 rounded-xl border border-border bg-muted/20 p-5">
                  <p className="text-3xl font-bold tabular-nums">{r.average.toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < Math.round(r.average) ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommendation snapshot — share your experience after purchase.
                  </p>
                  <div className="space-y-2 pt-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const c = hist[String(stars)] ?? 0;
                      const pct = totalRated > 0 ? Math.round((c / totalRated) * 100) : 0;
                      return (
                        <div key={stars} className="flex items-center gap-2 text-xs">
                          <span className="w-8 tabular-nums">{stars}★</span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-10 text-right tabular-nums text-muted-foreground">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="inline-block border-b-[3px] border-accent pb-1 text-base font-bold">
                    Submit Your Review
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Your email address will not be published. Required fields are marked *
                  </p>
                  <label className="block text-sm font-medium text-foreground">
                    Write your opinion about the product
                    <textarea
                      rows={5}
                      placeholder="Write Your Review Here..."
                      className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                  <label className="block text-sm font-medium text-foreground">
                    Your Rating:
                    <select className="mt-1 w-full max-w-xs rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20">
                      <option>Select One</option>
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    className="rounded-lg bg-zinc-800 px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white"
                  >
                    SUBMIT REVIEW
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 ? (
          <section className="mt-10">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-xl font-bold text-foreground">Related Products</h2>
              <Link href="/search" className="text-sm font-semibold text-accent transition hover:underline">
                More Products →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {related.map((p) => (
                <CollectionProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Floating widgets (reference layout) */}
      <aside className="pointer-events-none fixed bottom-6 right-4 z-[60] flex flex-col items-end gap-3">
        <Link
          href="/cart"
          className="pointer-events-auto flex flex-col items-center rounded-l-lg border border-accent bg-accent px-2 py-3 text-[10px] font-semibold text-white shadow-lg transition hover:opacity-95"
        >
          <span>{totalQty} {totalQty === 1 ? "item" : "items"}</span>
          <span className="tabular-nums">{formatBdt(subtotalBdt)}</span>
        </Link>
        <a
          href={chatHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-accent bg-card py-2 pl-3 pr-4 text-sm font-medium text-foreground shadow-lg transition hover:bg-muted/40"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Chat with us
        </a>
      </aside>
    </div>
  );
}
