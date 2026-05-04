import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="container-site py-10">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-md">
        <h1 className="text-xl font-bold text-foreground">Forgot password</h1>
        <p className="mt-2 text-sm text-muted-foreground">This flow will be connected to your backend soon.</p>
        <Link href="/login" className="mt-6 inline-block text-sm font-semibold text-accent hover:underline">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
