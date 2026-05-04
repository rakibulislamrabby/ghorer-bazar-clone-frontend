"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CATEGORY_HAS_SUBMENU, SITE_CATEGORIES, categoryCollectionHref } from "@/lib/site-categories";
import { useMobileMenu } from "./MobileMenuContext";

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAbout({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 10h8M8 14h5" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 019-0 4.5 4.5 0 019 0c0 5.5-7 10-7 10z" strokeLinejoin="round" />
    </svg>
  );
}

function IconFaq({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M10 10a2 2 0 114 0c0 2-2 2-2 4M12 17h.01" strokeLinecap="round" />
    </svg>
  );
}

export function MobileDrawer() {
  const { open, closeMenu } = useMobileMenu();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close menu"
        onClick={closeMenu}
      />
      <aside className="absolute left-0 top-0 z-[101] flex h-full w-[min(85vw,20rem)] flex-col bg-white shadow-2xl">
        <div className="shrink-0 rounded-br-2xl bg-accent px-4 pb-4 pt-5 text-white">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 rounded-full bg-white/95 ring-2 ring-white/40" aria-hidden />
            <div>
              <p className="text-base font-bold">Hello there!</p>
              <Link
                href="/login"
                className="text-sm text-white/95 underline-offset-2 hover:underline"
                onClick={closeMenu}
              >
                Signin
              </Link>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 pt-4">
          <div className="overflow-hidden rounded-xl border border-border bg-muted/50">
            <ul className="divide-y divide-border">
              {SITE_CATEGORIES.map((name) => (
                <li key={name}>
                  <Link
                    href={categoryCollectionHref(name)}
                    className="flex items-center justify-between gap-2 px-3 py-3 text-sm font-medium text-foreground active:bg-muted"
                    onClick={closeMenu}
                  >
                    <span>{name}</span>
                    {CATEGORY_HAS_SUBMENU.has(name) ? (
                      <IconChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="relative mb-3 pl-1 text-sm font-semibold text-foreground">
              Quick Links
              <span className="absolute -bottom-1 left-1 h-0.5 w-10 rounded-full bg-accent" aria-hidden />
            </h2>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <ul className="divide-y divide-border">
                <li>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-3 py-3 text-sm text-foreground active:bg-muted"
                    onClick={closeMenu}
                  >
                    <IconAbout className="h-5 w-5 text-muted-foreground" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 px-3 py-3 text-sm text-foreground active:bg-muted"
                    onClick={closeMenu}
                  >
                    <IconHeart className="h-5 w-5 text-muted-foreground" />
                    Wishlists
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="flex items-center gap-3 px-3 py-3 text-sm text-foreground active:bg-muted"
                    onClick={closeMenu}
                  >
                    <IconFaq className="h-5 w-5 text-muted-foreground" />
                    Faqs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <button
        type="button"
        className="absolute right-3 top-3 z-[102] flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md"
        onClick={closeMenu}
        aria-label="Close menu"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
