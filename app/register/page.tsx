import Link from "next/link";
import { GoogleSignInButton } from "@/app/components/auth/GoogleSignInButton";
import { OrDivider } from "@/app/components/auth/OrDivider";
import { RegisterAccountForm } from "@/app/components/auth/RegisterAccountForm";
import { RegisterOtpForm } from "@/app/components/auth/RegisterOtpForm";

function RegisterBadgeIcon() {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent shadow-sm">
      <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M6 19v0a4 4 0 014-4h2a4 4 0 014 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M18 8v6M15 11h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="container-site py-8 md:py-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-lg md:p-10">
        <div className="mb-8 flex gap-4">
          <RegisterBadgeIcon />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create New Account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Register to get started</p>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6">
          <section className="flex flex-1 flex-col gap-4">
            <h2 className="text-base font-semibold text-foreground">Signup With Mobile Number</h2>
            <RegisterOtpForm />
          </section>

          <OrDivider />

          <section className="flex flex-1 flex-col gap-4">
            <h2 className="text-base font-semibold text-foreground">Register a new account</h2>
            <RegisterAccountForm />
          </section>
        </div>

        <div className="mt-10">
          <div className="relative mb-6 flex items-center">
            <div className="h-px flex-1 bg-border" />
            <span className="bg-card px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              or signup with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="flex justify-center">
            <GoogleSignInButton action="signup" />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
