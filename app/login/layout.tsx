import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Ghorer Bazar",
  description: "Access your Ghorer Bazar account securely.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
