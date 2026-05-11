"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/components/CartProvider";
import { cartLineKey } from "@/lib/cart-types";
import { formatBdt } from "@/lib/format-bdt";

export function CheckoutPageClient() {
  const { lines, isReady, subtotalBdt, setLineQty, removeLine, clearCart } = useCart();
  const [payment, setPayment] = useState<"cod" | "online" | "bkash">("cod");
  const [agreed, setAgreed] = useState(false);
  const [placed, setPlaced] = useState(false);

  if (!isReady) {
    return (
      <div className="container-site py-16">
        <p className="text-center text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (lines.length === 0 && !placed) {
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
            <li className="font-medium text-foreground">Checkout</li>
          </ol>
        </nav>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card px-8 py-12 text-center shadow-sm">
          <h1 className="text-xl font-bold text-foreground">Nothing to checkout</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your cart is empty. Add items from a product page or the shop.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-md border border-accent px-6 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/10"
            >
              View cart
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container-site py-12 md:py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card px-8 py-12 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Demo only</p>
          <h1 className="mt-2 text-2xl font-bold text-foreground">Thank you</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            No payment was processed. This checkout is a placeholder for the real store flow.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-site py-8 md:py-12">
      <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-border">
            ›
          </li>
          <li className="font-medium text-foreground">Checkout</li>
        </ol>
      </nav>
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">Checkout</h1>

      <div className="mb-6 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-foreground md:flex md:items-center md:justify-between md:gap-4">
        <span className="text-muted-foreground">Have an account? Please login or register.</span>
        <span className="mt-2 flex gap-2 md:mt-0">
          <Link href="/login" className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90">
            Login
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-accent px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/10"
          >
            Register
          </Link>
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="h-6 w-1 rounded-full bg-accent" aria-hidden />
              Order review
            </h2>
            <ul className="space-y-4">
              {lines.map((line) => {
                const key = cartLineKey(line);
                return (
                  <li key={key} className="flex gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image src={line.image} alt="" fill className="object-contain p-1" sizes="80px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground">{line.name}</p>
                      {line.variantLabel ? (
                        <p className="text-xs text-muted-foreground">{line.variantLabel}</p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center rounded border border-border text-sm">
                          <button
                            type="button"
                            className="px-2 py-1 disabled:opacity-40"
                            onClick={() => setLineQty(key, line.qty - 1)}
                            disabled={line.qty <= 1}
                          >
                            −
                          </button>
                          <span className="min-w-[1.75rem] text-center tabular-nums">{line.qty}</span>
                          <button type="button" className="px-2 py-1" onClick={() => setLineQty(key, line.qty + 1)}>
                            +
                          </button>
                        </div>
                        <button type="button" onClick={() => removeLine(key)} className="text-red-600" aria-label="Remove">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" strokeLinecap="round" />
                            <path d="M10 11v6M14 11v6" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-bold tabular-nums text-accent">{formatBdt(line.unitPriceBdt * line.qty)}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="h-6 w-1 rounded-full bg-accent" aria-hidden />
              Shipping address
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Your full name *</span>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Phone *</span>
                <input
                  type="tel"
                  placeholder="8801XXXXXXXXX"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
              </label>
              <label>
                <span className="mb-1 block text-xs font-medium text-muted-foreground">District</span>
                <select className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20">
                  <option>Select district</option>
                </select>
              </label>
              <label>
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Thana (optional)</span>
                <select className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20">
                  <option>Select thana</option>
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Address</span>
                <textarea
                  rows={3}
                  placeholder="House / road / area"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="h-6 w-1 rounded-full bg-accent" aria-hidden />
              Billing address
            </h2>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input type="radio" name="billing" defaultChecked className="accent-accent" />
              Same as shipping address
            </label>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-foreground">
              <span className="h-5 w-1 rounded-full bg-accent" aria-hidden />
              Payment method
            </h2>
            <div className="space-y-2">
              {(
                [
                  { id: "cod" as const, label: "Cash on delivery" },
                  { id: "online" as const, label: "Online payment" },
                  { id: "bkash" as const, label: "bKash" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPayment(opt.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
                    payment === opt.id ? "border-accent bg-accent/10 ring-1 ring-accent" : "border-border hover:bg-muted/40"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      payment === opt.id ? "border-accent bg-accent text-white" : "border-border"
                    }`}
                  >
                    {payment === opt.id ? "✓" : ""}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <details className="text-sm">
              <summary className="cursor-pointer font-semibold text-foreground">Have a coupon or gift voucher?</summary>
              <p className="mt-2 text-muted-foreground">Coupons are not applied in this demo.</p>
            </details>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <h2 className="mb-4 text-base font-bold text-foreground">Order summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Sub total</span>
                <span className="tabular-nums text-foreground">{formatBdt(subtotalBdt)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery cost</span>
                <span className="tabular-nums text-foreground">{formatBdt(0)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground">
                <span>Total</span>
                <span className="tabular-nums">{formatBdt(subtotalBdt)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-foreground">
              <span className="h-5 w-1 rounded-full bg-accent" aria-hidden />
              Special notes (optional)
            </h2>
            <textarea
              rows={3}
              placeholder="Delivery instructions…"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            />
          </section>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
            <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-accent"
              />
              <span>
                I have read and agree to the{" "}
                <Link href="/" className="font-semibold text-accent hover:underline">
                  Terms
                </Link>
                ,{" "}
                <Link href="/" className="font-semibold text-accent hover:underline">
                  Privacy
                </Link>{" "}
                &amp;{" "}
                <Link href="/" className="font-semibold text-accent hover:underline">
                  Refund policy
                </Link>
                .
              </span>
            </label>
            <button
              type="button"
              disabled={!agreed}
              onClick={() => {
                clearCart();
                setPlaced(true);
              }}
              className="mt-4 w-full rounded-md bg-accent py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Place order
            </button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">Demo checkout — no real order is placed.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
