import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, GraduationCap, Info, MapPin, Sparkles, Star, Users } from "lucide-react";
import { PageShell } from "@/components/site-layout";
import { SUBJECT_LABEL, UNIVERSITIES, type University } from "@/data/universities";

export const Route = createFileRoute("/uczelnie/$uniId")({
  loader: ({ params }): { university: University } => {
    const university = UNIVERSITIES.find((u) => u.id === params.uniId);
    if (!university) throw notFound();
    return { university };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.university.name ?? "Uczelnia";
    const description = `${name} — wymagane przedmioty maturalne, progi punktowe, zasady rekrutacji i rekomendowane rozszerzenia.`;
    return {
      meta: [
        { title: `${name} — wymagania rekrutacyjne | Helpful Hand` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} — wymagania rekrutacyjne` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: UniversityPage,
});

function UniversityPage() {
  const { university }: { university: University } = Route.useLoaderData();
  const acceptsBusiness = (programId: string) =>
    university.programs
      .find((p) => p.id === programId)!
      .requirements.some((r) => r.subjects.includes("biznes"));
  const businessPrograms = university.programs.filter((p) => acceptsBusiness(p.id));

  return (
    <PageShell>
      <section className="surface-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Link
            to="/uczelnie"
            className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" /> Wróć do bazy uczelni
          </Link>
          <h1 className="mt-4 text-4xl md:text-5xl">{university.name}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/85">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" /> {university.city}, {university.country}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="size-4" /> uczelnia {university.type} · od {university.founded} r.
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4" /> {university.students} studentów
            </span>
          </p>
          <p className="mt-4 max-w-3xl text-primary-foreground/85">{university.about}</p>
          {businessPrograms.length > 0 && (
            <p className="surface-gold mt-5 inline-flex flex-wrap items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold">
              <Sparkles className="twinkle size-4" />
              <Star className="twinkle size-3" style={{ animationDelay: "0.5s" }} />
              Biznes i zarządzanie uznawany w rekrutacji na:{" "}
              {businessPrograms.map((p) => p.name).join(", ")}
            </p>
          )}
          <a
            href={university.website}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary"
          >
            System rekrutacyjny uczelni <ExternalLink className="size-4" />
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 text-2xl text-primary">
              <Info className="size-5 text-accent" /> Zasady rekrutacji
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{university.admissionRules}</p>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 text-2xl text-primary">
              <Star className="size-5 text-accent" /> Dodatkowe punkty i kryteria
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {university.extraPoints.map((point, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <h2 className="mt-12 text-3xl text-primary">Kierunki i wymagania</h2>
        <div className="mt-6 space-y-5">
          {university.programs.map((program) => (
            <article
              key={program.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl text-primary">{program.name}</h3>
                  {acceptsBusiness(program.id) && (
                    <span className="surface-gold mt-2 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold">
                      <Sparkles className="twinkle size-3.5" />
                      Biznes i zarządzanie (matura 2027/2028)
                      <Star className="twinkle size-3" style={{ animationDelay: "0.6s" }} />
                    </span>
                  )}
                  <p className="mt-1 text-sm text-muted-foreground">
                    {program.degree} · język: {program.language} · {program.tuition}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl leading-none text-accent">{program.threshold}</p>
                  <p className="text-xs text-muted-foreground">próg punktowy (ostatnia rekrutacja)</p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Wymagane przedmioty maturalne
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {program.requirements.map((r, i) => (
                      <li key={i}>
                        {r.label ?? r.subjects.map((s) => SUBJECT_LABEL[s]).join(" / ")}{" "}
                        <span className="text-muted-foreground">
                          — poziom {r.level}, waga {r.weight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Warto wybrać w liceum
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
                    {program.recommended.map((s) => (
                      <li key={s} className="rounded-md bg-secondary px-2 py-1">
                        {SUBJECT_LABEL[s]} (rozsz.)
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Dodatkowe kryteria
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {program.extras.map((e, i) => (
                      <li key={i}>· {e}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Zasady i zawody
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{program.rules}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold text-primary">Zawody: </span>
                    {program.careers.join(", ")}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground">
          <h2 className="text-3xl">Sprawdź, czy Twoje wyniki wystarczą</h2>
          <p className="mx-auto mt-2 max-w-lg text-primary-foreground/85">
            Uzupełnij profil maturalny, a policzymy Twoje punkty dla każdego kierunku tej uczelni.
          </p>
          <Link
            to="/dopasowanie"
            className="mt-6 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground"
          >
            Przejdź do dopasowania
          </Link>
        </div>
      </div>
    </PageShell>
  );
}