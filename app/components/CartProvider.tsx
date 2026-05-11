"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, ProductCartSnapshot } from "@/lib/cart-types";
import { cartLineKey } from "@/lib/cart-types";

const STORAGE_KEY = "ghorer-bazar-cart-v1";

function parseStored(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is CartLine =>
        row &&
        typeof row === "object" &&
        typeof (row as CartLine).productId === "string" &&
        typeof (row as CartLine).slug === "string" &&
        typeof (row as CartLine).name === "string" &&
        typeof (row as CartLine).image === "string" &&
        typeof (row as CartLine).unitPriceBdt === "number" &&
        typeof (row as CartLine).qty === "number" &&
        ((row as CartLine).variantId === null || typeof (row as CartLine).variantId === "string") &&
        ((row as CartLine).variantLabel === null || typeof (row as CartLine).variantLabel === "string"),
    );
  } catch {
    return [];
  }
}

type AddInput = ProductCartSnapshot & {
  qty?: number;
  variantId?: string | null;
  variantLabel?: string | null;
  /** When merging with an existing line, total qty will not exceed this (e.g. stock). */
  maxQty?: number;
};

type CartContextValue = {
  lines: CartLine[];
  isReady: boolean;
  totalQty: number;
  subtotalBdt: number;
  addOrMergeLine: (input: AddInput) => void;
  setLineQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setLines(parseStored(localStorage.getItem(STORAGE_KEY)));
      setIsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, isReady]);

  const addOrMergeLine = useCallback((input: AddInput) => {
    const qtyAdd = Math.max(1, input.qty ?? 1);
    const variantId = input.variantId ?? null;
    const variantLabel = input.variantLabel ?? null;
    const key = cartLineKey({ productId: input.productId, variantId });
    const cap = input.maxQty;

    setLines((prev) => {
      const idx = prev.findIndex((l) => cartLineKey(l) === key);
      if (idx === -1) {
        const q = cap != null ? Math.min(qtyAdd, Math.max(1, cap)) : qtyAdd;
        const line: CartLine = {
          productId: input.productId,
          slug: input.slug,
          name: input.name,
          image: input.image,
          unitPriceBdt: input.unitPriceBdt,
          qty: q,
          variantId,
          variantLabel,
        };
        return [...prev, line];
      }
      const next = [...prev];
      const merged = next[idx].qty + qtyAdd;
      const capped = cap != null ? Math.min(merged, Math.max(1, cap)) : merged;
      next[idx] = { ...next[idx], qty: Math.max(1, capped) };
      return next;
    });
  }, []);

  const setLineQty = useCallback((key: string, qty: number) => {
    setLines((prev) => {
      if (qty < 1) return prev.filter((l) => cartLineKey(l) !== key);
      return prev.map((l) => (cartLineKey(l) === key ? { ...l, qty } : l));
    });
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => cartLineKey(l) !== key));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalQty = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const subtotalBdt = useMemo(() => lines.reduce((s, l) => s + l.unitPriceBdt * l.qty, 0), [lines]);

  const value = useMemo(
    () => ({
      lines,
      isReady,
      totalQty,
      subtotalBdt,
      addOrMergeLine,
      setLineQty,
      removeLine,
      clearCart,
    }),
    [lines, isReady, totalQty, subtotalBdt, addOrMergeLine, setLineQty, removeLine, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
