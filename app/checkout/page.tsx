import type { Metadata } from "next";
import { CheckoutPageClient } from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout | Ghorer Bazar",
  description: "Complete your order (demo checkout).",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
