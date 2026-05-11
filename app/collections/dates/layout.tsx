import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dates | Ghorer Bazar",
  description: "Shop Medjool, Ajwa, Sukkari, Mabroom, and Safawi dates — premium quality for Ramadan and everyday snacking.",
};

export default function DatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
