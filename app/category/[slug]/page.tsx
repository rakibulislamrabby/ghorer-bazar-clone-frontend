import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SITE_CATEGORIES, categoryCollectionHref, categoryNameToSlug } from "@/lib/site-categories";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

function findCategoryBySlug(slug: string): string | null {
  const raw = decodeURIComponent(slug).toLowerCase();
  const found = SITE_CATEGORIES.find((name) => categoryNameToSlug(name) === raw);
  return found ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = findCategoryBySlug(slug);
  if (!name) return { title: "Category | Ghorer Bazar" };
  const collection = categoryCollectionHref(name);
  if (collection.startsWith("/collections/")) {
    return { title: `${name} | Ghorer Bazar` };
  }
  return {
    title: `${name} — Coming soon | Ghorer Bazar`,
    description: `${name} category is coming soon on Ghorer Bazar.`,
  };
}

export default async function CategoryPlaceholderPage({ params }: Props) {
  const { slug } = await params;
  const name = findCategoryBySlug(slug);
  if (!name) notFound();

  const collection = categoryCollectionHref(name);
  if (collection.startsWith("/collections/")) {
    redirect(collection);
  }

  return (
    <div className="container-site py-16 md:py-24">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card px-8 py-12 text-center shadow-sm md:px-12 md:py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Ghorer Bazar</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">Coming soon</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We are preparing this category for you. Please check back later or explore our other collections.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
