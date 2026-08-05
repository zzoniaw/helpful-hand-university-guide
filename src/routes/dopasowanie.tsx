import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lightbulb, RotateCcw, Sparkles, Wand2 } from "lucide-react";
import { MatchCard } from "@/components/match-card";
import { PageShell } from "@/components/site-layout";
import { FIELDS, SUBJECTS, type Field, type Level, type SubjectId } from "@/data/universities";
import {
  ACHIEVEMENTS,
  DEMO_PROFILE,
  EMPTY_PROFILE,
  adviceFor,
  matchProfile,
  type CandidateProfile,
} from "@/lib/matching";
import { useCandidateProfile } from "@/lib/profile-store";

export const Route = createFileRoute("/dopasowanie")({
  head: () => ({
    meta: [
      { title: "Dopasowanie kierunku do wyników matury | Helpful Hand" },
      {
        name: "description",
        content:
          "Wpisz wyniki matury, osiągnięcia i cel zawodowy, a Helpful Hand wyliczy punkty rekrutacyjne i pokaże kierunki, na które masz szansę.",
      },
      { property: "og:title", content: "Dopasowanie kierunku do wyników matury" },
      {
        property: "og:description",
        content: "Kalkulator punktów rekrutacyjnych i dopasowanie kierunków studiów w Polsce i za granicą.",
      },
    ],
  }),
  component: MatchPage,
});

function MatchPage() {
  const { profile, update, loaded } = useCandidateProfile();
  const [showResults, setShowResults] = useState(false);

  const scoreFor = (subject: SubjectId) => profile.scores.find((s) => s.subject === subject);

  const setScore = (subject: SubjectId, score: number | null, level?: Level) => {
    const existing = scoreFor(subject);
    const rest = profile.scores.filter((s) => s.subject !== subject);
    if (score === null || Number.isNaN(score)) {
      update({ ...profile, scores: rest });
      return;
    }
    update({
      ...profile,
      scores: [
        ...rest,
        {
          subject,
          score: Math.max(0, Math.min(100, score)),
          level: level ?? existing?.level ?? "rozszerzony",
        },
      ],
    });
  };

  const toggle = <K extends keyof CandidateProfile>(key: K, value: string) => {
    const list = profile[key] as unknown as string[];
    const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
    update({ ...profile, [key]: next } as CandidateProfile);
  };

  const results = useMemo(() => matchProfile(profile), [profile]);
  const tips = useMemo(() => adviceFor(profile, results), [profile, results]);
  const filled = profile.scores.length > 0;
  const visible = showResults && filled;
  const recommended = results.filter((r) => r.chance !== "niska");
  const backup = results.filter((r) => r.chance === "niska").slice(0, 6);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl text-primary md:text-5xl">Twój profil maturalny</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Uzupełnij wyniki egzaminów, osiągnięcia i plany zawodowe. Na tej podstawie wyliczymy punkty
          rekrutacyjne i porównamy je z progami kierunków w naszej bazie. Dane zapisują się w Twojej
          przeglądarce.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-2xl text-primary">Wyniki matury</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Wpisz wynik w procentach i zaznacz poziom. Wypełnij tylko te przedmioty, które zdawałeś.
            </p>
            <div className="mt-5 space-y-2.5">
              {SUBJECTS.map((subject) => {
                const entry = scoreFor(subject.id);
                return (
                  <div
                    key={subject.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl bg-secondary/50 px-3 py-2"
                  >
                    <span className="min-w-40 flex-1 text-sm font-medium">{subject.label}</span>
                    <div className="flex items-center gap-1.5">
                      {(["podstawowy", "rozszerzony"] as Level[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setScore(subject.id, entry?.score ?? 50, level)}
                          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                            entry?.level === level
                              ? "bg-primary text-primary-foreground"
                              : "bg-background text-muted-foreground hover:text-primary"
                          }`}
                        >
                          {level === "podstawowy" ? "podst." : "rozsz."}
                        </button>
                      ))}
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="—"
                        aria-label={`Wynik z ${subject.label} w procentach`}
                        value={entry?.score ?? ""}
                        onChange={(e) =>
                          setScore(subject.id, e.target.value === "" ? null : Number(e.target.value))
                        }
                        className="w-20 rounded-md border border-input bg-background px-2 py-1 text-sm outline-none focus:border-ring"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-2xl text-primary">Osiągnięcia dodatkowe</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Olimpiady, konkursy, certyfikaty i projekty, które podnoszą Twoje szanse.
              </p>
              <div className="mt-4 space-y-2">
                {ACHIEVEMENTS.map((a) => (
                  <label
                    key={a.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl bg-secondary/50 px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={profile.achievements.includes(a.id)}
                      onChange={() => toggle("achievements", a.id)}
                      className="mt-0.5 size-4 accent-[var(--accent)]"
                    />
                    <span className="flex-1">{a.label}</span>
                    <span className="font-semibold text-accent">+{a.points}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-2xl text-primary">Plany i preferencje</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="goal" className="text-sm font-medium">
                    Kim chcesz zostać?
                  </label>
                  <input
                    id="goal"
                    value={profile.careerGoal}
                    maxLength={80}
                    onChange={(e) => update({ ...profile, careerGoal: e.target.value })}
                    placeholder="np. lekarz, prawnik, inżynier, psycholog"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                  />
                </div>
                <div>
                  <label htmlFor="interests" className="text-sm font-medium">
                    Twoje zainteresowania
                  </label>
                  <textarea
                    id="interests"
                    value={profile.interests}
                    maxLength={400}
                    rows={3}
                    onChange={(e) => update({ ...profile, interests: e.target.value })}
                    placeholder="np. programowanie, biologia, praca z ludźmi, projektowanie"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Preferowane dziedziny studiów</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {FIELDS.map((field) => (
                      <button
                        key={field.id}
                        type="button"
                        onClick={() => toggle("fields", field.id)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                          profile.fields.includes(field.id as Field)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:text-primary"
                        }`}
                      >
                        {field.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium">Lokalizacja</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Polska", "zagranica"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggle("countries", c)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            profile.countries.includes(c as "Polska")
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Typ uczelni</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["publiczna", "niepubliczna"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggle("types", t)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            profile.types.includes(t as "publiczna")
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!filled}
            onClick={() => setShowResults(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="size-4" /> Pokaż dopasowane kierunki
          </button>
          <button
            type="button"
            onClick={() => {
              update(DEMO_PROFILE);
              setShowResults(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-input px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Wand2 className="size-4" /> Tryb demo
          </button>
          <button
            type="button"
            onClick={() => {
              update(EMPTY_PROFILE);
              setShowResults(false);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-input px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <RotateCcw className="size-4" /> Wyczyść profil
          </button>
          {loaded && !filled && (
            <p className="text-sm text-muted-foreground">
              Wpisz przynajmniej jeden wynik maturalny, aby zobaczyć dopasowanie.
            </p>
          )}
        </div>

        {visible && (
          <div className="mt-14 space-y-10">
            <section>
              <h2 className="text-3xl text-primary">
                Kierunki dla Ciebie{" "}
                <span className="text-base text-muted-foreground">({recommended.length})</span>
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Lista uporządkowana według szans przyjęcia oraz zgodności z Twoim celem zawodowym i
                zainteresowaniami.
              </p>
              <div className="mt-6 space-y-5">
                {recommended.length === 0 && (
                  <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                    Przy tych wynikach żaden kierunek z bazy nie mieści się w progu. Zobacz poniżej
                    propozycje zapasowe i porady, jak podnieść szanse.
                  </p>
                )}
                {recommended.map((r) => (
                  <MatchCard key={r.program.id} result={r} />
                ))}
              </div>
            </section>

            {backup.length > 0 && (
              <section>
                <h2 className="text-3xl text-primary">Kierunki ambitne i zapasowe</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tutaj brakuje punktów albo wymaganego przedmiotu — warto wiedzieć, czego dokładnie.
                </p>
                <div className="mt-6 space-y-5">
                  {backup.map((r) => (
                    <MatchCard key={r.program.id} result={r} />
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="flex items-center gap-2 text-2xl text-primary">
                <Lightbulb className="size-5 text-accent" /> Wskazówki dla Twojego profilu
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {tips.map((tip, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </PageShell>
  );
}