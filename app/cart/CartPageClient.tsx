"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";
import { cartLineKey } from "@/lib/cart-types";
import { formatBdt } from "@/lib/format-bdt";

export function CartPageClient() {
  const { lines, isReady, subtotalBdt, setLineQty, removeLine } = useCart();

  if (!isReady) {
    return (
      <div className="container-site py-16">
        <p className="text-center text-muted-foreground">Loading cart…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-site py-12 md:py-16">
        <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-border">
              ›
            </li>
            <li className="font-medium text-foreground">Cart</li>
          </ol>
        </nav>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card px-8 py-12 text-center shadow-sm">
          <h1 className="text-xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">Add products from the shop to see them here.</p>
          <Link
            href="/search"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-site py-8 md:py-12">
      <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-border">
            ›
          </li>
          <li className="font-medium text-foreground">Cart</li>
        </ol>
      </nav>

      <h1 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">Shopping Cart</h1>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <span className="h-6 w-1 rounded-full bg-accent" aria-hidden />
            Order review
          </h2>
          <ul className="space-y-3">
            {lines.map((line) => {
              const key = cartLineKey(line);
              return (
                <li
                  key={key}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <Link
                    href={`/product/${line.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white"
                  >
                    <Image src={line.image} alt="" fill className="object-contain p-1" sizes="96px" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${line.slug}`} className="font-semibold text-foreground hover:text-accent">
                      {line.name}
                    </Link>
                    {line.variantLabel ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">{line.variantLabel}</p>
                    ) : null}
                    <p className="mt-1 text-sm font-bold text-accent">{formatBdt(line.unitPriceBdt)}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-lg border border-border bg-muted/40">
                        <button
                          type="button"
                          className="px-2.5 py-1.5 text-lg leading-none disabled:opacity-40"
                          onClick={() => setLineQty(key, line.qty - 1)}
                          disabled={line.qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                        <button
                          type="button"
                          className="px-2.5 py-1.5 text-lg leading-none"
                          onClick={() => setLineQty(key, line.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(key)}
                        className="text-sm font-medium text-red-600 transition hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-sm font-bold tabular-nums text-foreground">{formatBdt(line.unitPriceBdt * line.qty)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-foreground">
            <span className="h-5 w-1 rounded-full bg-accent" aria-hidden />
            Summary
          </h2>
          <div className="space-y-2 border-b border-border pb-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Sub total</span>
              <span className="tabular-nums text-foreground">{formatBdt(subtotalBdt)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span className="tabular-nums text-foreground">{formatBdt(0)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-base font-bold text-foreground">
            <span>Total</span>
            <span className="tabular-nums">{formatBdt(subtotalBdt)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-md bg-accent py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
          >
            Proceed to checkout
          </Link>
          <Link href="/search" className="mt-3 block text-center text-sm font-semibold text-accent hover:underline">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
