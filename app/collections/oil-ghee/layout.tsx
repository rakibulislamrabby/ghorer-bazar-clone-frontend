import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oil & Ghee | Ghorer Bazar",
  description: "Shop cooking oils, mustard oil, ghee, coconut oil, and olive oil.",
};

export default function OilGheeLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full bg-white">{children}</div>;
}
