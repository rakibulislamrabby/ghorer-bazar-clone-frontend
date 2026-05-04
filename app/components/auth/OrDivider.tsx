/** Vertical OR on desktop, horizontal on mobile */
export function OrDivider() {
  return (
    <>
      <div className="relative my-2 flex items-center lg:hidden">
        <div className="h-px flex-1 bg-border" />
        <span className="mx-4 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-sm">
          OR
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="relative hidden min-h-[240px] w-px shrink-0 self-stretch bg-border lg:block">
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-sm">
          OR
        </span>
      </div>
    </>
  );
}
