import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Honey | Ghorer Bazar",
  description: "Shop pure honey, organic honey, raw honey, litchi honey, and specialty combos.",
};

export default function HoneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
