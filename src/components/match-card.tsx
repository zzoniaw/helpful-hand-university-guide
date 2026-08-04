import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CheckCircle2, GraduationCap, MapPin } from "lucide-react";
import { SUBJECT_LABEL } from "@/data/universities";
import { CHANCE_LABEL, type MatchResult } from "@/lib/matching";

const chanceStyles: Record<MatchResult["chance"], string> = {
  wysoka: "bg-primary text-primary-foreground",
  dobra: "bg-plum-soft/20 text-primary",
  graniczna: "bg-gold/25 text-foreground",
  niska: "bg-accent/12 text-accent",
};

export function MatchCard({ result }: { result: MatchResult }) {
  const { program, university, points, chance } = result;
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl leading-tight text-primary">{program.name}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <GraduationCap className="size-4" /> {university.name}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-4" /> {university.city}, {university.country}
            </span>
          </p>
        </div>
        <div className="text-right">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${chanceStyles[chance]}`}>
            {CHANCE_LABEL[chance]}
          </span>
          <p className="mt-2 font-display text-3xl leading-none text-accent">{points} pkt</p>
          <p className="text-xs text-muted-foreground">próg w ostatniej rekrutacji: {program.threshold}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          uczelnia {university.type}
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">{program.degree}</span>
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
          język: {program.language}
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">{program.tuition}</span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Przedmioty liczone w rekrutacji
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {program.requirements.map((r, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span>
                  {r.label ?? r.subjects.map((s) => SUBJECT_LABEL[s]).join(" / ")}{" "}
                  <span className="text-muted-foreground">({r.level})</span>
                </span>
                <span className="font-semibold text-primary">waga {r.weight}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Dlaczego ten kierunek
          </p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {(result.reasons.length > 0
              ? result.reasons.slice(0, 3)
              : ["Kierunek mieści się w Twoich kryteriach wyszukiwania."]
            ).map((reason, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {result.warnings.length > 0 && (
        <ul className="mt-4 space-y-1.5 rounded-xl bg-accent/8 p-3 text-sm text-accent">
          {result.warnings.slice(0, 3).map((w, i) => (
            <li key={i} className="flex gap-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-sm text-muted-foreground">{program.rules}</p>
        <Link
          to="/uczelnie/$uniId"
          params={{ uniId: university.id }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Zasady rekrutacji <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}