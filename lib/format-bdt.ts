export function formatBdt(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function salePrice(p: { price: number; discountPrice: number | null }) {
  return p.discountPrice ?? p.price;
}

export function savePercent(p: { compareAtPrice: number | null; price: number; discountPrice: number | null }) {
  const list = p.compareAtPrice;
  if (list == null || list <= 0) return null;
  const pay = p.discountPrice ?? p.price;
  if (pay >= list) return null;
  return Math.round(((list - pay) / list) * 100);
}
