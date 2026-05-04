"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { FEATURED_CATEGORY_ITEMS } from "@/lib/featured-categories";

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FeaturedCategories() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-category-card]");
    const step = card ? card.offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  }, []);

  return (
    <section className="container-site py-8 md:py-10" aria-labelledby="featured-categories-heading">
      <h2 id="featured-categories-heading" className="section-title">
        Featured Categories
      </h2>

      <div className="relative">
        <button
          type="button"
          className="absolute left-0 top-[42%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-accent/90 text-white shadow-md transition hover:bg-accent sm:h-10 sm:w-10 md:left-1 lg:left-2"
          aria-label="Scroll categories left"
          onClick={() => scrollByDir(-1)}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          type="button"
          className="absolute right-0 top-[42%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-accent/90 text-white shadow-md transition hover:bg-accent sm:h-10 sm:w-10 md:right-1 lg:right-2"
          aria-label="Scroll categories right"
          onClick={() => scrollByDir(1)}
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-10 pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-11 md:gap-5 md:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {FEATURED_CATEGORY_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-category-card
              className="group flex w-[calc((100%-2rem)/3)] max-w-[118px] shrink-0 snap-start flex-col items-center gap-2.5 sm:w-[calc((100%-3rem)/4)] sm:max-w-[132px] md:w-[140px] md:max-w-none lg:w-[148px]"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-card shadow-md ring-1 ring-border/70 transition group-hover:shadow-lg">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width:640px) 33vw, 148px"
                  className="object-contain p-3 transition group-hover:scale-[1.03]"
                />
              </div>
              <span className="max-w-full truncate px-0.5 text-center text-[11px] font-semibold leading-tight text-foreground sm:text-xs md:text-sm">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
