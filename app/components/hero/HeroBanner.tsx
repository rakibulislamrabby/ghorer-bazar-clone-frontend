"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const CAROUSEL_SLIDES = [
  { src: "/assets/banner/banner-1.jpg", alt: "Ghorer Bazar — featured honey & natural products" },
  { src: "/assets/banner/banner-2.png", alt: "Seasonal offers and organic picks" },
  { src: "/assets/banner/banner-3.jpeg", alt: "Pure honey collection" },
  { src: "/assets/banner/banner-4.jpeg", alt: "Shop trusted grocery essentials" },
] as const;

const RIGHT_BANNER = {
  src: "/assets/banner/rightside-banner.png",
  alt: "Featured product spotlight",
  href: "/category/honey",
} as const;

const AUTO_MS = 6000;

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroBanner() {
  const [index, setIndex] = useState(0);
  const n = CAROUSEL_SLIDES.length;

  const goNext = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);

  useEffect(() => {
    const t = setInterval(goNext, AUTO_MS);
    return () => clearInterval(t);
  }, [goNext]);

  return (
    <section className="container-site py-4 md:py-6" aria-label="Featured banners">
      <div className="flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-stretch lg:gap-4">
        {/* Carousel ~70% */}
        <div className="relative min-h-0 flex-[1_1_100%] lg:flex-[2.35]">
          <div className="relative h-[200px] w-full overflow-hidden rounded-xl shadow-md sm:h-[240px] md:h-[280px] lg:h-[300px] xl:h-[320px]">
            {CAROUSEL_SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === index ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
                }`}
                aria-hidden={i !== index}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 72vw"
                  className="object-cover"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-accent shadow-md transition hover:bg-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-accent shadow-md transition hover:bg-white"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-3 z-10 flex gap-2" role="tablist" aria-label="Carousel slides">
              {CAROUSEL_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? "bg-white shadow-sm" : "bg-white/45 hover:bg-white/70"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Static banner ~30% */}
        <div className="relative min-h-0 flex-[1_1_100%] lg:flex-[1] lg:max-w-md xl:max-w-none">
          <Link
            href={RIGHT_BANNER.href}
            className="relative block h-[200px] w-full overflow-hidden rounded-xl shadow-md sm:h-[240px] md:h-[280px] lg:h-[300px] xl:h-[320px]"
            aria-label={RIGHT_BANNER.alt}
          >
            <Image
              src={RIGHT_BANNER.src}
              alt={RIGHT_BANNER.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 28vw"
              className="object-cover transition hover:opacity-95"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
