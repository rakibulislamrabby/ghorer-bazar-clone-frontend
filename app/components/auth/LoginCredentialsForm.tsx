"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { validateEmailOrPhone, validatePassword } from "@/lib/auth-validation";
import { PasswordField } from "./PasswordField";

function IconPerson({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20c0-3.5 3.5-5 6-5s6 1.5 6 5" strokeLinecap="round" />
    </svg>
  );
}

export function LoginCredentialsForm() {
  const [identifierError, setIdentifierError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const identifier = String(fd.get("identifier") ?? "");
    const password = String(fd.get("password") ?? "");

    const idErr = validateEmailOrPhone(identifier);
    const pwErr = validatePassword(password);

    setIdentifierError(idErr ?? undefined);
    setPasswordError(pwErr ?? undefined);

    if (idErr || pwErr) return;
    /* API: login */
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div>
        <div
          className={
            identifierError
              ? "flex items-center gap-2 rounded-lg border border-red-500 bg-muted/40 px-3 py-2.5 ring-2 ring-red-500/25"
              : "flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 transition focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/25"
          }
        >
          <span className="text-muted-foreground">
            <IconPerson className="h-5 w-5" />
          </span>
          <input
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="Email or phone number"
            required
            minLength={1}
            aria-invalid={identifierError ? "true" : undefined}
            aria-describedby={identifierError ? "login-id-error" : undefined}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            onChange={() => setIdentifierError(undefined)}
          />
        </div>
        {identifierError ? (
          <p id="login-id-error" className="mt-1 text-xs text-red-600" role="alert">
            {identifierError}
          </p>
        ) : null}
      </div>

      <PasswordField
        error={passwordError}
        minLength={8}
        required
        onChange={() => setPasswordError(undefined)}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="font-medium text-accent hover:underline">
          Forgotten password?
        </Link>
      </div>

      <button type="submit" className="btn-primary w-full rounded-lg py-3 text-sm font-semibold shadow-sm">
        Login
      </button>
    </form>
  );
}
