"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  validateAddress,
  validateEmailOrPhone,
  validateFullName,
  validatePassword,
} from "@/lib/auth-validation";
import { PasswordField } from "./PasswordField";

function IconPerson({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 20c0-3.5 3.5-5 6-5s6 1.5 6 5" strokeLinecap="round" />
    </svg>
  );
}

function IconEnvelope({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

export function RegisterAccountForm() {
  const [nameError, setNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [addressError, setAddressError] = useState<string | undefined>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("fullName") ?? "");
    const emailOrPhone = String(fd.get("emailOrPhone") ?? "");
    const password = String(fd.get("password") ?? "");
    const address = String(fd.get("address") ?? "");

    const eName = validateFullName(fullName);
    const eEmail = validateEmailOrPhone(emailOrPhone);
    const ePass = validatePassword(password);
    const eAddr = validateAddress(address);

    setNameError(eName ?? undefined);
    setEmailError(eEmail ?? undefined);
    setPasswordError(ePass ?? undefined);
    setAddressError(eAddr ?? undefined);

    if (eName || eEmail || ePass || eAddr) return;
    /* API: register */
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div>
        <div
          className={
            nameError
              ? "flex items-center gap-2 rounded-lg border border-red-500 bg-muted/40 px-3 py-2.5 ring-2 ring-red-500/25"
              : "flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 transition focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/25"
          }
        >
          <span className="text-muted-foreground">
            <IconPerson className="h-5 w-5" />
          </span>
          <input
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Full Name"
            required
            minLength={2}
            aria-invalid={nameError ? "true" : undefined}
            aria-describedby={nameError ? "reg-name-error" : undefined}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            onChange={() => setNameError(undefined)}
          />
        </div>
        {nameError ? (
          <p id="reg-name-error" className="mt-1 text-xs text-red-600" role="alert">
            {nameError}
          </p>
        ) : null}
      </div>

      <div>
        <div
          className={
            emailError
              ? "flex items-center gap-2 rounded-lg border border-red-500 bg-muted/40 px-3 py-2.5 ring-2 ring-red-500/25"
              : "flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 transition focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/25"
          }
        >
          <span className="text-muted-foreground">
            <IconEnvelope className="h-5 w-5" />
          </span>
          <input
            name="emailOrPhone"
            type="text"
            autoComplete="email"
            placeholder="Email or Phone Number"
            required
            aria-invalid={emailError ? "true" : undefined}
            aria-describedby={emailError ? "reg-email-error" : undefined}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            onChange={() => setEmailError(undefined)}
          />
        </div>
        {emailError ? (
          <p id="reg-email-error" className="mt-1 text-xs text-red-600" role="alert">
            {emailError}
          </p>
        ) : null}
      </div>

      <PasswordField
        name="password"
        autoComplete="new-password"
        placeholder="Password"
        error={passwordError}
        minLength={8}
        required
        onChange={() => setPasswordError(undefined)}
      />

      <div>
        <div
          className={
            addressError
              ? "flex items-center gap-2 rounded-lg border border-red-500 bg-muted/40 px-3 py-2.5 ring-2 ring-red-500/25"
              : "flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 transition focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/25"
          }
        >
          <span className="text-muted-foreground">
            <IconPin className="h-5 w-5" />
          </span>
          <input
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="Address"
            required
            minLength={5}
            aria-invalid={addressError ? "true" : undefined}
            aria-describedby={addressError ? "reg-address-error" : undefined}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            onChange={() => setAddressError(undefined)}
          />
        </div>
        {addressError ? (
          <p id="reg-address-error" className="mt-1 text-xs text-red-600" role="alert">
            {addressError}
          </p>
        ) : null}
      </div>

      <button type="submit" className="btn-primary w-full rounded-lg py-3 text-sm font-semibold shadow-sm">
        Register account
      </button>
    </form>
  );
}
