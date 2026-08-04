import { Link } from "@tanstack/react-router";
import { HandHeart } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Start" },
  { to: "/dopasowanie", label: "Dopasuj kierunek" },
  { to: "/uczelnie", label: "Baza uczelni" },
  { to: "/porady", label: "Porady" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HandHeart className="size-5" />
          </span>
          <span className="font-display text-2xl leading-none text-primary">Helpful Hand</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary data-[status=active]:bg-secondary data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/dopasowanie"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Sprawdź szanse
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-secondary/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-display text-lg text-primary">Helpful Hand</span> — wyciągamy rękę do
          maturzystów wybierających studia.
        </p>
        <p className="max-w-md text-xs">
          Dane rekrutacyjne mają charakter poglądowy i opierają się na zasadach z ostatnich lat. Przed
          złożeniem dokumentów sprawdź aktualne uchwały rekrutacyjne wybranej uczelni.
        </p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col surface-sand">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}