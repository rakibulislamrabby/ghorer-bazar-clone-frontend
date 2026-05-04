import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { MobileDrawer } from "./components/MobileDrawer";
import { MobileMenuProvider } from "./components/MobileMenuContext";
import { NavbarCategories } from "./components/NavbarCategories";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghorer Bazar | Safe and Reliable Food E-commerce Platform in Bangladesh",
  description:
    "Ghorer Bazar is an e-commerce platform dedicated to providing safe and reliable food to every home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <MobileMenuProvider>
            <div className="flex min-h-screen flex-col bg-page pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
              <Header />
              <NavbarCategories />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileDrawer />
              <MobileBottomNav />
            </div>
          </MobileMenuProvider>
        </Providers>
      </body>
    </html>
  );
}
