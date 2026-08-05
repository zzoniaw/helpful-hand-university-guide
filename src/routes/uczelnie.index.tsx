import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Search, Sparkles, Star } from "lucide-react";
import { PageShell } from "@/components/site-layout";
import { FIELDS, UNIVERSITIES, type Field } from "@/data/universities";

export const Route = createFileRoute("/uczelnie/")({
  head: () => ({
    meta: [
      { title: "Baza uczelni i wymagań rekrutacyjnych | Helpful Hand" },
      {
        name: "description",
        content:
          "Przeglądaj polskie i zagraniczne uczelnie publiczne oraz niepubliczne: wymagane przedmioty maturalne, progi punktowe i zasady rekrutacji.",
      },
      { property: "og:title", content: "Baza uczelni i wymagań rekrutacyjnych" },
      {
        property: "og:description",
        content: "Wyszukaj uczelnię lub kierunek i sprawdź wymagania rekrutacyjne krok po kroku.",
      },
    ],
  }),
  component: UniversitiesPage,
});

function UniversitiesPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | "publiczna" | "niepubliczna">("all");
  const [country, setCountry] = useState<"all" | "Polska" | "zagranica">("all");
  const [field, setField] = useState<Field | "all">("all");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UNIVERSITIES.filter((u) => {
      if (type !== "all" && u.type !== type) return false;
      if (country === "Polska" && u.country !== "Polska") return false;
      if (country === "zagranica" && u.country === "Polska") return false;
      if (field !== "all" && !u.programs.some((p) => p.field === field)) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.short.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.programs.some((p) => p.name.toLowerCase().includes(q))
      );
    });
  }, [query, type, country, field]);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl text-primary md:text-5xl">Baza uczelni</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Szukaj uczelni lub kierunku i sprawdź wymagane przedmioty maturalne, zasady rekrutacji oraz
          rekomendowane rozszerzenia.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              maxLength={80}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="np. Uniwersytet Warszawski, Kraków, informatyka…"
              aria-label="Szukaj uczelni lub kierunku"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
            />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Filter
              label="Typ uczelni"
              value={type}
              onChange={(v) => setType(v as typeof type)}
              options={[
                { value: "all", label: "wszystkie" },
                { value: "publiczna", label: "publiczne" },
                { value: "niepubliczna", label: "niepubliczne" },
              ]}
            />
            <Filter
              label="Lokalizacja"
              value={country}
              onChange={(v) => setCountry(v as typeof country)}
              options={[
                { value: "all", label: "wszystkie" },
                { value: "Polska", label: "Polska" },
                { value: "zagranica", label: "zagranica" },
              ]}
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Dziedzina
              </p>
              <select
                value={field}
                onChange={(e) => setField(e.target.value as Field | "all")}
                aria-label="Filtruj według dziedziny"
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
              >
                <option value="all">wszystkie dziedziny</option>
                {FIELDS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">Znaleziono {list.length} uczelni.</p>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {list.map((u) => (
            <Link
              key={u.id}
              to="/uczelnie/$uniId"
              params={{ uniId: u.id }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl leading-tight text-primary">{u.name}</h2>
                <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                  {u.short}
                </span>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" /> {u.city}, {u.country} · uczelnia {u.type}
              </p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{u.about}</p>
              {u.programs.some((p) => p.requirements.some((r) => r.subjects.includes("biznes"))) && (
                <span className="surface-gold mt-3 inline-flex items-center gap-1.5 self-start rounded-lg border px-2.5 py-1 text-xs font-semibold">
                  <Sparkles className="twinkle size-3.5" />
                  Przyjmuje biznes i zarządzanie
                  <Star className="twinkle size-3" style={{ animationDelay: "0.6s" }} />
                </span>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {u.programs.map((p) => (
                  <span key={p.id} className="rounded-md bg-secondary/70 px-2 py-1 text-xs">
                    {p.name}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Wymagania rekrutacyjne{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-8 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Brak wyników. Spróbuj innej nazwy uczelni, miasta lub zmień filtry.
          </p>
        )}
      </div>
    </PageShell>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              value === o.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:text-primary"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}