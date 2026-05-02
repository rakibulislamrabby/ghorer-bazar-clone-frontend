"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { validateBdMobile } from "@/lib/auth-validation";

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path
        d="M6.5 4h3l2 5-2.5 1.5a12 12 0 006 6L15 18l5 2v3h-3C8.5 23 3 17.5 3 10V7l3.5-3z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RegisterOtpForm() {
  const [error, setError] = useState<string | undefined>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get("phone") ?? "");
    const err = validateBdMobile(phone);
    setError(err ?? undefined);
    if (err) return;
    /* API: send OTP */
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div>
        <div
          className={
            error
              ? "flex items-center gap-2 rounded-lg border border-red-500 bg-muted/40 px-3 py-2.5 ring-2 ring-red-500/25"
              : "flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 transition focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/25"
          }
        >
          <span className="text-muted-foreground">
            <IconPhone className="h-5 w-5" />
          </span>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="01*********"
            required
            pattern="01[3-9]\d{8}"
            title="11-digit Bangladesh mobile number"
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? "reg-otp-phone-error" : undefined}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            onChange={() => setError(undefined)}
          />
        </div>
        {error ? (
          <p id="reg-otp-phone-error" className="mt-1 text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <button type="submit" className="btn-primary w-full rounded-lg py-3 text-sm font-semibold shadow-sm">
        Send OTP
      </button>
    </form>
  );
}
