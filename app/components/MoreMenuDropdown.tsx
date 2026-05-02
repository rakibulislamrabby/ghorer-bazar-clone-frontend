"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

function IconAbout({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="12" cy="11" r="2" />
      <path d="M8 17h8" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 019-0 4.5 4.5 0 019 0c0 5.5-7 10-7 10z" strokeLinejoin="round" />
    </svg>
  );
}

function IconFaq({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M10 10a2 2 0 114 0c0 2-2 2-2 4M12 17h.01" strokeLinecap="round" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path
        d="M6.5 4h3l2 5-2.5 1.5a12 12 0 006 6L15 18l5 2v3h-3C8.5 23 3 17.5 3 10V7l3.5-3z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconMenuLines({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 7h16M4 12h11M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

const PHONE = "09642922922";
const WHATSAPP_HREF = "https://wa.me/8809642922922";

type Props = {
  /** Icon-only trigger (mobile header strip) */
  compact?: boolean;
};

export function MoreMenuDropdown({ compact }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const panel = (
    <div
      id={menuId}
      role="menu"
      className="absolute right-0 top-full z-[80] mt-1.5 min-w-[13.5rem] overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg"
    >
      <ul className="divide-y divide-border">
        <li role="none">
          <Link
            role="menuitem"
            href="/about"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <IconAbout className="h-5 w-5 shrink-0 text-muted-foreground" />
            About Us
          </Link>
        </li>
        <li role="none">
          <Link
            role="menuitem"
            href="/wishlist"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <IconHeart className="h-5 w-5 shrink-0 text-muted-foreground" />
            Wishlists
          </Link>
        </li>
        <li role="none">
          <Link
            role="menuitem"
            href="/faq"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <IconFaq className="h-5 w-5 shrink-0 text-muted-foreground" />
            Faqs
          </Link>
        </li>
        <li role="none">
          <a
            role="menuitem"
            href={`tel:${PHONE}`}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <IconPhone className="h-5 w-5 shrink-0 text-muted-foreground" />
            Call Us
          </a>
        </li>
        <li role="none">
          <a
            role="menuitem"
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <IconWhatsApp className="h-5 w-5 shrink-0" />
            WhatsApp
          </a>
        </li>
      </ul>
    </div>
  );

  if (compact) {
    return (
      <div className="relative shrink-0" ref={rootRef}>
        <button
          type="button"
          className={`flex h-10 w-9 shrink-0 items-center justify-center rounded-lg sm:w-10 ${
            open ? "text-accent" : "text-foreground"
          } active:bg-muted`}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={open ? menuId : undefined}
          aria-label="More options"
          onClick={() => setOpen((o) => !o)}
        >
          <IconMenuLines className="h-[22px] w-[22px]" />
        </button>
        {open ? panel : null}
      </div>
    );
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className={`group flex flex-col items-center gap-1 transition ${
          open ? "text-accent" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={`relative flex h-9 w-9 items-center justify-center ${open ? "text-accent" : "text-foreground"}`}
        >
          <IconMenuLines className="h-6 w-6" />
        </span>
        <span className="max-w-[4.5rem] text-center text-[11px] leading-tight">More</span>
      </button>
      {open ? panel : null}
    </div>
  );
}
