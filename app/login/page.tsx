import Link from "next/link";
import { GoogleSignInButton } from "@/app/components/auth/GoogleSignInButton";
import { LoginCredentialsForm } from "@/app/components/auth/LoginCredentialsForm";
import { LoginOtpForm } from "@/app/components/auth/LoginOtpForm";
import { OrDivider } from "@/app/components/auth/OrDivider";

function SignInBadgeIcon() {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent shadow-sm">
      <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M17 6l2 2M17 8l2-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container-site py-8 md:py-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-lg md:p-10">
        <div className="mb-8 flex gap-4">
          <SignInBadgeIcon />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Signin</h1>
            <p className="mt-1 text-sm text-muted-foreground">Access your account securely</p>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6">
          <section className="flex flex-1 flex-col gap-4">
            <h2 className="text-base font-semibold text-foreground">Login With Mobile Number</h2>
            <LoginOtpForm />
          </section>

          <OrDivider />

          <section className="flex flex-1 flex-col gap-4">
            <h2 className="text-base font-semibold text-foreground">Login With Credentials</h2>
            <LoginCredentialsForm />
          </section>
        </div>

        <div className="mt-10">
          <div className="relative mb-6 flex items-center">
            <div className="h-px flex-1 bg-border" />
            <span className="bg-card px-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              or signin with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="flex justify-center">
            <GoogleSignInButton action="signin" />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t have any account?{" "}
          <Link href="/register" className="font-semibold text-accent hover:underline">
            Register account
          </Link>
        </p>
      </div>
    </div>
  );
}
