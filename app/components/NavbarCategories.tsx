import { SITE_CATEGORIES, categoryCollectionHref } from "@/lib/site-categories";

export function NavbarCategories() {
  return (
    <nav
      className="navbar-categories hidden w-full lg:block"
      aria-label="Product categories"
    >
      <div className="container-site">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 py-2.5 text-sm lg:justify-between lg:gap-x-0">
          {SITE_CATEGORIES.map((name) => (
            <li key={name}>
              <a
                href={categoryCollectionHref(name)}
                className="block whitespace-nowrap px-2 py-1 transition hover:text-accent lg:px-1"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
