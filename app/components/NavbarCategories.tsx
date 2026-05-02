const categories = [
  "Oil & Ghee",
  "Honey",
  "Dates",
  "Spices",
  "Nuts & Seeds",
  "Beverage",
  "Rice",
  "Flours & Lentils",
  "Certified",
  "Pickle",
] as const;

export function NavbarCategories() {
  return (
    <nav
      className="navbar-categories w-full"
      aria-label="Product categories"
    >
      <div className="container-site">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 py-2.5 text-sm sm:justify-between sm:gap-x-0">
          {categories.map((name) => (
            <li key={name}>
              <a
                href={`/category/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"))}`}
                className="block whitespace-nowrap px-2 py-1 transition hover:text-accent sm:px-1"
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
