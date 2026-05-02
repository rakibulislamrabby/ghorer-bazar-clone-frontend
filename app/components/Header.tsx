import Image from "next/image";
import type { ReactNode } from "react";

function IconTrackOrder({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v4l2 2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function IconUser({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20c0-3.5 3.5-5 6-5s6 1.5 6 5" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 019-0 4.5 4.5 0 019 0c0 5.5-7 10-7 10z" strokeLinejoin="round" />
    </svg>
  );
}

function IconCart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 6h2l1.5 12h12L21 8H8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 7h16M4 12h11M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}

type NavItemProps = {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: number;
};

function HeaderNavItem({ href, label, icon, badge }: NavItemProps) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-1 text-muted-foreground transition hover:text-foreground"
    >
      <span className="relative flex h-9 w-9 items-center justify-center text-foreground">
        {icon}
        {badge !== undefined && badge > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none text-white">
            {badge > 99 ? "99+" : badge}
          </span>
        ) : null}
      </span>
      <span className="max-w-[4.5rem] text-center text-[11px] leading-tight">{label}</span>
    </a>
  );
}

export function Header() {
  return (
    <header className="w-full bg-card">
      <div className="h-1 w-full bg-header-strip" aria-hidden />
      <div className="border-b border-border">
        <div className="container-site flex flex-col gap-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <a href="/" className="relative block h-10 w-[148px] shrink-0 sm:h-11 sm:w-[164px]">
            <Image
              src="/assets/logo/logo.png"
              alt="Ghorer Bazar"
              fill
              sizes="164px"
              className="object-contain object-left"
              priority
            />
          </a>

          <div className="relative min-w-0 flex-1 sm:mx-2 sm:max-w-xl lg:max-w-2xl">
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="Search In..."
              className="w-full rounded-full border border-transparent bg-muted py-2.5 pl-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-accent/30 transition focus:border-accent/40 focus:ring-2"
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              <IconSearch className="h-5 w-5" />
            </span>
          </div>

          <nav
            className="flex flex-wrap items-start justify-center gap-5 sm:justify-end sm:gap-6 md:gap-7"
            aria-label="Account and cart"
          >
            <HeaderNavItem href="/track" label="Track Order" icon={<IconTrackOrder className="h-6 w-6" />} />
            <HeaderNavItem href="/sign-in" label="Sign In" icon={<IconUser className="h-6 w-6" />} />
            <HeaderNavItem href="/wishlist" label="Wishlist" icon={<IconHeart className="h-6 w-6" />} />
            <HeaderNavItem href="/cart" label="Cart" icon={<IconCart className="h-6 w-6" />} badge={1} />
            <HeaderNavItem href="#menu" label="More" icon={<IconMenu className="h-6 w-6" />} />
          </nav>
        </div>
      </div>
    </header>
  );
}
