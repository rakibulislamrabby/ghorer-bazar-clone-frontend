"use client";

import type { ChangeEventHandler } from "react";
import { useId, useState } from "react";

type Props = {
  id?: string;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  /** Server/client validation message shown below the field */
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export function PasswordField({
  id: idProp,
  name = "password",
  placeholder = "Password",
  autoComplete = "current-password",
  required,
  minLength = 8,
  error,
  onChange,
}: Props) {
  const genId = useId();
  const id = idProp ?? genId;
  const errorId = `${id}-error`;
  const [visible, setVisible] = useState(false);

  const wrapClass = error
    ? "flex items-center gap-2 rounded-lg border border-red-500 bg-muted/40 px-3 py-2.5 ring-2 ring-red-500/25"
    : "flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 transition focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/25";

  return (
    <div>
      <div className={wrapClass}>
        <span className="text-muted-foreground" aria-hidden>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" />
          </svg>
        </span>
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          onChange={onChange}
        />
        <button
          type="button"
          className="shrink-0 rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.4 10.4 0 0112 5c5 0 9.3 3 11 7a11.4 11.4 0 01-4.6 5.4M6.3 6.3C4.3 7.6 3 9.4 2 12c1.7 4 6 7 10 7 1.4 0 2.8-.3 4-.8" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
