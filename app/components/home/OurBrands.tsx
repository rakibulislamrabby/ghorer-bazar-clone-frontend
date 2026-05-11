"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const BRAND_SLIDES: { name: string; image: string }[][] = [
  [
    { name: "Ghorer Bazar", image: "/assets/allbrand/ghorer-bazar.png" },
    { name: "Glarvest", image: "/assets/allbrand/glarvest.png" },
    { name: "Khejuri", image: "/assets/allbrand/khejuri.png" },
    { name: "Shosti", image: "/assets/allbrand/shostifood.png" },
  ],
  [
    { name: "Honey Raj", image: "/assets/allbrand/honeyraj.png" },
    { name: "Mac Coffee", image: "/assets/allbrand/maccoffie.png" },
    { name: "Bragg", image: "/assets/allbrand/bragg.png" },
    { name: "Palermo", image: "/assets/allbrand/palermo.png" },
  ],
];

export function OurBrands() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, pointerId: 0 });

  const syncActiveFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const i = Math.round(el.scrollLeft / w);
    setActiveSlide(Math.max(0, Math.min(i, BRAND_SLIDES.length - 1)));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncActiveFromScroll();
    el.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", syncActiveFromScroll);
  }, [syncActiveFromScroll]);

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
  }, []);

  function goToSlide(index: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, BRAND_SLIDES.length - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }

  function onPointerDown(e: React.PointerEvent) {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      pointerId: e.pointerId,
    };
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
    <section className="bg-page py-10 md:py-12" aria-labelledby="our-brands-heading">
      <div className="container-site">
        <h2 id="our-brands-heading" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          <span className="border-b-[3px] border-accent pb-0.5">Our</span>
          <span className="pl-1.5">Brands</span>
        </h2>
        <div className="mt-3 border-b border-border" aria-hidden />

        <div
          ref={scrollerRef}
          role="region"
          aria-label="Brand logos — drag or scroll sideways"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex flex-nowrap snap-x snap-mandatory overflow-x-auto pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab touch-pan-x active:cursor-grabbing select-none"
        >
          {BRAND_SLIDES.map((slide, slideIdx) => (
            <div
              key={slideIdx}
              className="grid w-full min-w-full shrink-0 grow-0 snap-start grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 md:gap-6"
            >
              {slide.map((brand) => (
                <div
                  key={brand.name}
                  className="flex min-h-[64px] items-center justify-center rounded-lg border border-border bg-card px-3 py-3 shadow-sm sm:min-h-[68px] md:min-h-[72px]"
                >
                  <div className="pointer-events-none relative h-7 w-full max-w-[140px] sm:h-8 md:h-9">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width:640px) 40vw, 140px"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Brand slides">
          {BRAND_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeSlide === i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goToSlide(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                activeSlide === i ? "bg-accent" : "border-2 border-accent bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
