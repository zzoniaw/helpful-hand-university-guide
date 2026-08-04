import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  GraduationCap,
  Lightbulb,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import heroImage from "@/assets/hero-helpful-hand.jpg";
import { PageShell } from "@/components/site-layout";
import { ALL_PROGRAMS, UNIVERSITIES } from "@/data/universities";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Helpful Hand — dopasuj studia do wyników matury" },
      {
        name: "description",
        content:
          "Wpisz wyniki matury, zainteresowania i wymarzony zawód, a Helpful Hand wskaże uczelnie i kierunki w Polsce i za granicą, na które masz szansę się dostać.",
      },
      { property: "og:title", content: "Helpful Hand — pomocna dłoń w rekrutacji na studia" },
      {
        property: "og:description",
        content:
          "Inteligentna wyszukiwarka rekrutacji: progi punktowe, wymagane przedmioty i zasady kwalifikacji polskich i zagranicznych uczelni.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  {
    icon: BookOpenCheck,
    title: "Wpisz wyniki matury",
    text: "Podaj przedmioty, poziom i procenty. Dodaj olimpiady, certyfikaty i projekty, które dają dodatkowe punkty.",
  },
  {
    icon: Target,
    title: "Określ cel zawodowy",
    text: "Napisz, kim chcesz zostać — lekarzem, prawnikiem, inżynierem, psychologiem — i jaka dziedzina Cię interesuje.",
  },
  {
    icon: Sparkles,
    title: "Otrzymaj dopasowanie",
    text: "Zobacz kierunki, na które masz szansę, z wyliczonymi punktami, progami i wyjaśnieniem, dlaczego pasują.",
  },
];

const features = [
  {
    icon: Search,
    title: "Wyszukiwarka uczelni",
    text: "Uczelnie publiczne i niepubliczne z Polski oraz zagranicy, z wymaganiami rekrutacyjnymi w jednym miejscu.",
  },
  {
    icon: GraduationCap,
    title: "Zasady kwalifikacji",
    text: "Wymagane przedmioty maturalne, wagi, progi punktowe, egzaminy dodatkowe i kryteria dodatkowych punktów.",
  },
  {
    icon: Compass,
    title: "Kierunek pod Twój zawód",
    text: "System tłumaczy, dlaczego dany program prowadzi do zawodu, o którym myślisz.",
  },
  {
    icon: Lightbulb,
    title: "Praktyczne porady",
    text: "Jakie rozszerzenia wybrać, jak podnieść szanse i jak ułożyć bezpieczną listę kierunków.",
  },
];

function Index() {
  const uniCount = UNIVERSITIES.length;
  const programCount = ALL_PROGRAMS.length;
  const countries = new Set(UNIVERSITIES.map((u) => u.country)).size;

  return (
    <PageShell>
      <section className="surface-hero text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="size-3.5" /> Inteligentna wyszukiwarka rekrutacji
            </p>
            <h1 className="mt-5 text-5xl leading-[1.05] md:text-6xl">
              Pomocna dłoń w wyborze studiów
            </h1>
            <p className="mt-5 max-w-lg text-base/relaxed text-primary-foreground/85">
              Helpful Hand zamienia Twoje wyniki matury, zainteresowania i plany zawodowe w konkretną
              listę uczelni i kierunków — z progami punktowymi, wymaganymi przedmiotami i wyjaśnieniem
              każdego dopasowania.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dopasowanie"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-5 py-3 font-semibold text-primary transition-transform hover:-translate-y-0.5"
              >
                Dopasuj kierunek do matury <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/uczelnie"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/40 px-5 py-3 font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                Przeglądaj bazę uczelni
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-primary-foreground/20 pt-6 text-sm">
              <div>
                <dt className="text-primary-foreground/70">Uczelnie</dt>
                <dd className="font-display text-3xl">{uniCount}</dd>
              </div>
              <div>
                <dt className="text-primary-foreground/70">Kierunki</dt>
                <dd className="font-display text-3xl">{programCount}</dd>
              </div>
              <div>
                <dt className="text-primary-foreground/70">Kraje</dt>
                <dd className="font-display text-3xl">{countries}</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Dłoń wyciągnięta do maturzystki z książkami — symbol wsparcia w rekrutacji na studia"
              width={1200}
              height={1200}
              className="w-full rounded-3xl shadow-lift"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl text-primary md:text-4xl">Jak to działa</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Trzy kroki od arkusza z wynikami matury do listy kierunków, na które realnie masz szansę.
        </p>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <step.icon className="size-5" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
                Krok {i + 1}
              </p>
              <h3 className="mt-1 text-2xl text-primary">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-2xl border border-border bg-card/70 p-6 shadow-soft"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <feature.icon className="size-5" />
              </span>
              <div>
                <h3 className="text-xl text-primary">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-16">
          <h2 className="text-3xl md:text-4xl">Nie zgaduj. Sprawdź swoje szanse.</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Wypełnienie profilu maturalnego zajmuje dwie minuty, a wynik pokazuje kierunki ambitne,
            realne i bezpieczne.
          </p>
          <Link
            to="/dopasowanie"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Zacznij dopasowanie <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
