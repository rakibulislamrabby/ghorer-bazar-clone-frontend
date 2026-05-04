"use client";

import Link from "next/link";
import { useMobileMenu } from "./MobileMenuContext";

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" strokeLinejoin="round" />
    </svg>
  );
}

function IconMenuGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
    </svg>
  );
}

function IconCartBag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 8h15l-1.5 12H7.5L6 8zm0 0L5 4H2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1" fill="currentColor" />
      <circle cx="17" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}

function IconAccount({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20c0-3.5 3.5-5 6-5s6 1.5 6 5" strokeLinecap="round" />
    </svg>
  );
}

const cartCount = 1;

export function MobileBottomNav() {
  const { openMenu } = useMobileMenu();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/15 bg-accent lg:hidden"
      aria-label="Mobile navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex max-w-lg items-end justify-between px-2 pt-2 pb-1">
        <Link href="/" className="flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1 text-white">
          <IconHome className="h-6 w-6" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Home</span>
        </Link>

        <button
          type="button"
          className="flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1 text-white"
          onClick={openMenu}
        >
          <IconMenuGrid className="h-6 w-6" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Menu</span>
        </button>

        <Link href="/cart" className="relative flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1 text-white">
          <span className="relative">
            <IconCartBag className="h-6 w-6" />
            {cartCount > 0 ? (
              <span className="absolute -right-1.5 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-nav px-0.5 text-[9px] font-bold leading-none text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            ) : null}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide">Cart</span>
        </Link>

        <Link href="/search" className="flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1 text-white">
          <IconSearch className="h-6 w-6" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Search</span>
        </Link>

        <Link href="/login" className="flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1 text-white">
          <IconAccount className="h-6 w-6" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Account</span>
        </Link>
      </div>
    </nav>
  );
}
