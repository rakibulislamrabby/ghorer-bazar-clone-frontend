import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container-site py-16 text-center">
      <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
      <p className="mt-2 text-muted-foreground">This item may have moved or is no longer available.</p>
      <Link href="/" className="mt-6 inline-block font-semibold text-accent hover:underline">
        Back to home
      </Link>
    </div>
  );
}
