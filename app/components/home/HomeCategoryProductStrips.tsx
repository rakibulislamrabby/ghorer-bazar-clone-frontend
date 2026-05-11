"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AddToCartSnapshotButton } from "@/app/components/cart/CartSnapshotButtons";
import type { Product } from "@/lib/catalog-types";
import { formatBdt, salePrice, savePercent } from "@/lib/format-bdt";
import { useDatesProducts, useHoneyProducts } from "@/lib/hooks/useCatalog";

const PER_SLIDE = 5;
const MAX_ITEMS = 15;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

function StripProductCard({ product }: { product: Product }) {
  const img = product.images[0] ?? "/assets/logo/logo.png";
  const pay = salePrice(product);
  const list = product.compareAtPrice;
  const showStrike = list != null && list > pay;
  const pct = savePercent(product);
  const href = `/product/${product.slug}`;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="relative aspect-square w-full max-h-[120px] bg-white sm:max-h-[132px] md:max-h-[140px]">
        {pct != null && pct > 0 ? (
          <span className="absolute right-1.5 top-1.5 z-10 rounded bg-green-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow sm:text-[10px]">
            Save {pct}%
          </span>
        ) : null}
        <Link href={href} className="relative block h-full min-h-[100px] w-full sm:min-h-[110px]">
          <Image src={img} alt={product.name} fill className="object-contain p-2 sm:p-3" sizes="(max-width:768px) 45vw, 20vw" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5 pt-1.5 sm:p-3">
        <Link href={href} className="line-clamp-2 text-left text-xs font-semibold leading-snug text-foreground hover:text-accent sm:text-sm">
          {product.name}
        </Link>

        <div className="mt-auto flex flex-wrap items-baseline gap-1.5">
          <span className="text-sm font-bold text-accent sm:text-base">{formatBdt(pay)}</span>
          {showStrike ? (
            <span className="text-xs text-muted-foreground line-through sm:text-sm">{formatBdt(list)}</span>
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
          addClassName="mt-0.5 flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-accent py-1.5 text-xs font-semibold text-accent transition hover:bg-accent hover:text-white sm:py-2 sm:text-sm"
        />
      </div>
    </article>
  );
}

type StripProps = {
  title: string;
  viewAllHref: string;
  products: Product[];
  isPending: boolean;
  sectionId: string;
};

function CategoryProductStrip({ title, viewAllHref, products, isPending, sectionId }: StripProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const slides = useMemo(() => chunk(products.slice(0, MAX_ITEMS), PER_SLIDE), [products]);

  const syncActiveFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0 || slides.length === 0) return;
    const i = Math.round(el.scrollLeft / w);
    setActiveSlide(Math.max(0, Math.min(i, slides.length - 1)));
  }, [slides.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncActiveFromScroll();
    el.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", syncActiveFromScroll);
  }, [syncActiveFromScroll, slides.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [slides.length]);

  const firstWord = title.split(/\s+/)[0] ?? title;
  const restTitle = title.slice(firstWord.length).trimStart();

  function goToSlide(index: number) {
    const el = scrollerRef.current;
    if (!el || slides.length === 0) return;
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }

  function onPointerDown(e: React.PointerEvent) {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  }

  function onPointerUp(e: React.PointerEvent) {
    const el = scrollerRef.current;
    if (!drag.current.active) return;
    drag.current.active = false;
    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  }

  return (
    <section className="bg-page py-8 md:py-10" aria-labelledby={sectionId}>
      <div className="container-site">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 id={sectionId} className="text-lg font-bold tracking-tight text-foreground md:text-xl lg:text-2xl">
            <span className="border-b-[3px] border-accent pb-0.5">{firstWord}</span>
            {restTitle ? <span className="pl-1">{restTitle}</span> : null}
          </h2>
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-accent transition hover:opacity-90 sm:text-sm"
          >
            View all items
            <span aria-hidden className="text-base leading-none">
              →
            </span>
          </Link>
        </div>

        {isPending ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5">
            {Array.from({ length: PER_SLIDE }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-lg bg-muted/50 sm:h-60" />
            ))}
          </div>
        ) : slides.length === 0 ? (
          <p className="text-sm text-muted-foreground">No products in this category yet.</p>
        ) : (
          <>
            <div
              ref={scrollerRef}
              role="region"
              aria-label={`${title} products — drag or scroll sideways`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="flex flex-nowrap snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab touch-pan-x active:cursor-grabbing select-none"
            >
              {slides.map((slide, slideIdx) => (
                <div
                  key={slideIdx}
                  className="grid w-full min-w-full shrink-0 grow-0 snap-start grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5"
                >
                  {slide.map((p) => (
                    <StripProductCard key={p.id} product={p} />
                  ))}
                </div>
              ))}
            </div>

            {slides.length > 1 ? (
              <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label={`${title} pages`}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={activeSlide === i}
                    aria-label={`Page ${i + 1}`}
                    onClick={() => goToSlide(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      activeSlide === i ? "bg-accent" : "border-2 border-accent bg-transparent"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}

export function HomeHoneyShowcase() {
  const { products, isPending } = useHoneyProducts();
  return (
    <CategoryProductStrip
      title="All Natural Honey"
      viewAllHref="/collections/honey"
      products={products}
      isPending={isPending}
      sectionId="home-honey-showcase-heading"
    />
  );
}

export function HomeDatesShowcase() {
  const { products, isPending } = useDatesProducts();
  return (
    <CategoryProductStrip
      title="Premium Dates"
      viewAllHref="/collections/dates"
      products={products}
      isPending={isPending}
      sectionId="home-dates-showcase-heading"
    />
  );
}
