import Image from "next/image";
import Link from "next/link";

const informationLinks = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact us" },
  { href: "/company", label: "Company Information" },
  { href: "/stories", label: "Ghorer Bazar Stories" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/careers", label: "Careers" },
] as const;

const shopByLinks = [
  { href: "/collections/oil-ghee", label: "Oil & Ghee" },
  { href: "/collections/honey", label: "Honey" },
  { href: "/collections/dates", label: "Dates" },
  { href: "/category/spices", label: "Spices" },
  { href: "/category/nuts-seeds", label: "Nuts & Seeds" },
  { href: "/category/beverage", label: "Beverage" },
  { href: "/category/functional-foods", label: "Functional Foods" },
] as const;

const supportLinks = [
  { href: "/support", label: "Support Center" },
  { href: "/how-to-order", label: "How to Order" },
  { href: "/track", label: "Order Tracking" },
  { href: "/payment", label: "Payment" },
  { href: "/shipping", label: "Shipping" },
  { href: "/faq", label: "FAQ" },
] as const;

const policyLinks = [
  { href: "/happy-return", label: "Happy Return" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/exchange", label: "Exchange" },
  { href: "/cancellation", label: "Cancellation" },
  { href: "/pre-order", label: "Pre Order" },
  { href: "/extra-discount", label: "Extra Discount" },
] as const;

/** Abbreviated labels for payment methods — swap with logo strip assets when available */
const paymentMethods = [
  "Visa",
  "Mastercard",
  "Amex",
  "bKash",
  "Nagad",
  "Rocket",
  "DBBL",
  "UnionPay",
  "Discover",
  "JCB",
  "Tap",
  "Upay",
  "MCash",
  "OK Wallet",
  "City Touch",
  "AB Direct",
  "IB",
  "QCash",
  "MyCash",
  "SureCash",
] as const;

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6.5 4h3l2 5-2.5 1.5a12 12 0 006 6L15 18l5 2v3h-3C8.5 23 3 17.5 3 10V7l3.5-3z" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.2-1.5 1.6-1.5H17V4.8c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.9V11H7v3h2.5v8h4z" />
    </svg>
  );
}

function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 3h3.2l-7 8.2L23 21h-6.5l-5.1-6.7L5.5 21H2.2l7.5-8.7L1 3h6.6l4.6 6.1L18.9 3z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 7.2c2.48 0 2.78.01 3.76.05.91.04 1.4.2 1.73.33.44.17.75.38 1.08.71.33.33.54.64.71 1.08.13.33.29.82.33 1.73.04.98.05 1.28.05 3.76s-.01 2.78-.05 3.76c-.04.91-.2 1.4-.33 1.73a2.9 2.9 0 01-1.79 1.79c-.33.13-.82.29-1.73.33-.98.04-1.28.05-3.76.05s-2.78-.01-3.76-.05a4.3 4.3 0 01-1.73-.33 2.9 2.9 0 01-1.08-.71 2.9 2.9 0 01-.71-1.08 4.3 4.3 0 01-.33-1.73C7.21 14.78 7.2 14.48 7.2 12s.01-2.78.05-3.76c.04-.91.2-1.4.33-1.73.17-.44.38-.75.71-1.08.33-.33.64-.54 1.08-.71.33-.13.82-.29 1.73-.33.98-.04 1.28-.05 3.76-.05M12 5.4c-2.52 0-2.84.01-3.83.06-1 .04-1.66.22-2.25.47a4.5 4.5 0 00-1.63 1.06 4.5 4.5 0 00-1.06 1.63c-.25.59-.43 1.25-.47 2.25C5.01 9.16 5 9.48 5 12s.01 2.84.06 3.83c.04 1 .22 1.66.47 2.25.26.62.6 1.16 1.06 1.63.47.47 1.01.8 1.63 1.06.59.25 1.25.43 2.25.47.99.05 1.31.06 3.83.06s2.84-.01 3.83-.06c1-.04 1.66-.22 2.25-.47a4.5 4.5 0 001.63-1.06c.47-.47.8-1.01 1.06-1.63.25-.59.43-1.25.47-2.25.05-.99.06-1.31.06-3.83s-.01-2.84-.06-3.83c-.04-1-.22-1.66-.47-2.25a4.5 4.5 0 00-1.06-1.63 4.5 4.5 0 00-1.63-1.06c-.59-.25-1.25-.43-2.25-.47-.99-.05-1.31-.06-3.83-.06zM12 8.7a3.3 3.3 0 100 6.6 3.3 3.3 0 000-6.6zm0 5.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zm4.17-6.03a.77.77 0 11-1.54 0 .77.77 0 011.54 0z" />
    </svg>
  );
}

const socialBtnClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-sm ring-1 ring-black/[0.06] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ea8200] hover:shadow-md active:translate-y-0 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card";

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition hover:text-accent">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container-site py-12 lg:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block" title="Ghorer Bazar — home">
              <Image
                src="/assets/logo/logo.png"
                alt="Ghorer Bazar"
                width={3039}
                height={1220}
                className="h-9 w-auto sm:h-10"
              />
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              Ghorer Bazar is an e-commerce platform dedicated to providing safe and reliable food to every home.
            </p>
            <ul className="mb-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" aria-hidden />
                <span>Rampura, Dhaka, Bangladesh</span>
              </li>
              <li className="flex gap-2">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" aria-hidden />
                <a href="tel:09642922922" className="transition hover:text-accent">
                  09642922922
                </a>
              </li>
              <li className="flex gap-2">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" aria-hidden />
                <a href="mailto:contact@ghorerbazar.com" className="transition hover:text-accent">
                  contact@ghorerbazar.com
                </a>
              </li>
            </ul>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtnClass}
                aria-label="Facebook"
              >
                <IconFacebook className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtnClass}
                aria-label="Twitter / X"
              >
                <IconTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtnClass}
                aria-label="Instagram"
              >
                <IconInstagram className="h-[18px] w-[18px]" />
              </a>
            </div>
            <div className="mt-2">
              <p className="mb-2 text-xs font-medium text-foreground">Download App on Mobile :</p>
              <div className="flex flex-nowrap items-center gap-2 sm:gap-3">
                <a
                  href="#"
                  className="inline-flex shrink-0 items-center transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm"
                  aria-label="Get it on Google Play"
                >
                  <Image
                    src="/assets/logo/google-play.svg"
                    alt=""
                    width={129}
                    height={38}
                    className="h-10 w-auto shrink-0"
                  />
                </a>
                <a
                  href="#"
                  className="inline-flex shrink-0 items-center transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm"
                  aria-label="Download on the App Store"
                >
                  <Image
                    src="/assets/logo/app-store.svg"
                    alt=""
                    width={113}
                    height={38}
                    className="h-10 w-auto shrink-0"
                  />
                </a>
              </div>
            </div>
          </div>

          <FooterLinkList title="Information" links={informationLinks} />
          <FooterLinkList title="Shop By" links={shopByLinks} />
          <FooterLinkList title="Support" links={supportLinks} />
          <FooterLinkList title="Consumer Policy" links={policyLinks} />
        </div>
      </div>

      <div className="border-t border-border bg-muted/40">
        <div className="container-site flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-center text-sm text-muted-foreground lg:text-left">
            Copyright © {new Date().getFullYear()} GhorerBazar
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
            <span className="shrink-0 text-xs font-medium text-muted-foreground lg:pt-1">Pay With</span>
            <div className="flex max-w-xl flex-wrap justify-center gap-1.5 lg:justify-end">
              {paymentMethods.map((name) => (
                <span
                  key={name}
                  className="rounded border border-border bg-card px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
