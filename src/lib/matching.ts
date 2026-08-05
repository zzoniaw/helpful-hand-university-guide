import {
  ALL_PROGRAMS,
  SUBJECT_LABEL,
  type Field,
  type Level,
  type Program,
  type SubjectId,
  type University,
} from "@/data/universities";

export type ScoreEntry = { subject: SubjectId; level: Level; score: number };

export type Achievement = { id: string; label: string; points: number; guaranteed?: boolean };

export const ACHIEVEMENTS: Achievement[] = [
  { id: "olimpiada-laureat", label: "Laureat olimpiady przedmiotowej (etap centralny)", points: 15, guaranteed: true },
  { id: "olimpiada-finalista", label: "Finalista olimpiady przedmiotowej (etap centralny)", points: 12, guaranteed: true },
  { id: "olimpiada-woj", label: "Finalista olimpiady na etapie wojewódzkim", points: 6 },
  { id: "certyfikat-c1", label: "Certyfikat językowy C1/C2 (np. CAE, CPE, DELF)", points: 5 },
  { id: "projekt-naukowy", label: "Projekt naukowy lub badawczy (np. E(x)plory, Zwolnieni z Teorii)", points: 5 },
  { id: "konkurs-branzowy", label: "Nagroda w konkursie branżowym lub artystycznym", points: 4 },
  { id: "wolontariat", label: "Wolontariat lub działalność społeczna", points: 3 },
  { id: "sport", label: "Osiągnięcia sportowe na poziomie krajowym", points: 3 },
  { id: "portfolio", label: "Portfolio prac (rysunek, design, programowanie)", points: 4 },
];

export type CandidateProfile = {
  scores: ScoreEntry[];
  achievements: string[];
  careerGoal: string;
  fields: Field[];
  interests: string;
  countries: ("Polska" | "zagranica")[];
  types: ("publiczna" | "niepubliczna")[];
};

export const EMPTY_PROFILE: CandidateProfile = {
  scores: [],
  achievements: [],
  careerGoal: "",
  fields: [],
  interests: "",
  countries: ["Polska", "zagranica"],
  types: ["publiczna", "niepubliczna"],
};

export const DEMO_PROFILE: CandidateProfile = {
  scores: [
    { subject: "biologia", level: "rozszerzony", score: 88 },
    { subject: "chemia", level: "rozszerzony", score: 85 },
    { subject: "matematyka", level: "rozszerzony", score: 78 },
    { subject: "angielski", level: "rozszerzony", score: 92 },
    { subject: "polski", level: "podstawowy", score: 70 },
  ],
  achievements: ["olimpiada-finalista", "certyfikat-c1", "wolontariat"],
  careerGoal: "lekarz",
  fields: ["medyczny"],
  interests: "biologia, pomaganie ludziom, medycyna, zdrowie",
  countries: ["Polska", "zagranica"],
  types: ["publiczna", "niepubliczna"],
};

export type Chance = "wysoka" | "dobra" | "graniczna" | "niska";

export const CHANCE_LABEL: Record<Chance, string> = {
  wysoka: "Bardzo duże szanse",
  dobra: "Dobre szanse",
  graniczna: "Szanse graniczne",
  niska: "Małe szanse",
};

export type MatchResult = {
  program: Program;
  university: University;
  points: number;
  bonus: number;
  chance: Chance;
  reasons: string[];
  warnings: string[];
  missing: string[];
  careerHit: boolean;
  rank: number;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/ą/g, "a")
    .replace(/ć/g, "c")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o")
    .replace(/ś/g, "s")
    .replace(/[żź]/g, "z");

function bestValue(entries: ScoreEntry[], subjects: SubjectId[], level: Level) {
  let best: { value: number; entry: ScoreEntry; penalised: boolean } | null = null;
  for (const entry of entries) {
    if (!subjects.includes(entry.subject) || entry.score <= 0) continue;
    const penalised = level === "rozszerzony" && entry.level === "podstawowy";
    const value = penalised ? entry.score * 0.5 : entry.score;
    if (!best || value > best.value) best = { value, entry, penalised };
  }
  return best;
}

export function matchProfile(profile: CandidateProfile): MatchResult[] {
  const bonusList = ACHIEVEMENTS.filter((a) => profile.achievements.includes(a.id));
  const bonus = Math.min(
    18,
    bonusList.reduce((sum, a) => sum + a.points, 0),
  );
  const guaranteed = bonusList.some((a) => a.guaranteed);
  const goal = normalize(profile.careerGoal.trim());
  const interestWords = normalize(profile.interests)
    .split(/[\s,;.]+/)
    .filter((w) => w.length > 3);

  const results: MatchResult[] = [];

  for (const { program, university } of ALL_PROGRAMS) {
    const abroad = university.country !== "Polska";
    if (abroad && !profile.countries.includes("zagranica")) continue;
    if (!abroad && !profile.countries.includes("Polska")) continue;
    if (!profile.types.includes(university.type)) continue;

    const reasons: string[] = [];
    const warnings: string[] = [];
    const missing: string[] = [];
    const blocking: string[] = [];

    let weighted = 0;
    let weightSum = 0;
    for (const requirement of program.requirements) {
      weightSum += requirement.weight;
      const best = bestValue(profile.scores, requirement.subjects, requirement.level);
      const name =
        requirement.label ?? requirement.subjects.map((s) => SUBJECT_LABEL[s]).join(" / ");
      if (!best) {
        missing.push(name);
        if (requirement.weight >= 0.35) blocking.push(name);
        else
          warnings.push(
            `Brak wyniku z: ${name}. Ten składnik liczymy jako 0 pkt, co obniża Twój wynik rekrutacyjny.`,
          );
        continue;
      }
      weighted += best.value * requirement.weight;
      if (best.penalised) {
        warnings.push(
          `${SUBJECT_LABEL[best.entry.subject]} masz tylko na poziomie podstawowym – uczelnia liczy ten wynik z połową wagi.`,
        );
      }
      if (best.entry.score >= 80 && requirement.weight >= 0.3) {
        reasons.push(
          `Wysoki wynik z ${SUBJECT_LABEL[best.entry.subject]} (${best.entry.score}%) przy dużej wadze tego przedmiotu w rekrutacji.`,
        );
      }
    }

    const base = weightSum > 0 ? weighted / weightSum : 0;
    const points = Math.min(100, Math.round(base + bonus));

    let chance: Chance;
    if (guaranteed && points >= program.threshold - 20) chance = "wysoka";
    else if (points >= program.threshold + 7) chance = "wysoka";
    else if (points >= program.threshold) chance = "dobra";
    else if (points >= program.threshold - 8) chance = "graniczna";
    else chance = "niska";

    if (blocking.length > 0) {
      chance = "niska";
      blocking.forEach((m) =>
        warnings.push(`Brak wyniku z wymaganego przedmiotu: ${m}. Bez niego rekrutacja nie jest możliwa.`),
      );
    }

    let careerHit = false;
    if (goal.length > 2) {
      careerHit = program.careers.some((c) => {
        const cn = normalize(c);
        return cn.includes(goal) || goal.includes(cn);
      });
      if (careerHit) {
        reasons.push(`Kierunek prowadzi bezpośrednio do zawodu, który wpisałeś: „${profile.careerGoal}”.`);
      }
    }

    const fieldHit = profile.fields.length === 0 || profile.fields.includes(program.field);
    if (profile.fields.includes(program.field)) {
      reasons.push("Kierunek należy do wybranej przez Ciebie dziedziny studiów.");
    }

    const interestHit = interestWords.some((w) =>
      program.interests.some((i) => normalize(i).includes(w) || w.includes(normalize(i))),
    );
    if (interestHit) {
      reasons.push("Program pokrywa się z Twoimi zainteresowaniami.");
    }

    if (bonus > 0) {
      reasons.push(`Twoje osiągnięcia dodatkowe podnoszą wynik o ${bonus} pkt.`);
    }

    const chanceWeight = { wysoka: 40, dobra: 28, graniczna: 14, niska: 0 }[chance];
    const rank =
      chanceWeight +
      (careerHit ? 22 : 0) +
      (profile.fields.includes(program.field) ? 12 : 0) +
      (interestHit ? 8 : 0) +
      (fieldHit ? 2 : 0) +
      points / 10;

    results.push({
      program,
      university,
      points,
      bonus,
      chance,
      reasons,
      warnings,
      missing,
      careerHit,
      rank,
    });
  }

  return results.sort((a, b) => b.rank - a.rank);
}

export function adviceFor(profile: CandidateProfile, results: MatchResult[]): string[] {
  const tips: string[] = [];
  const has = (s: SubjectId) => profile.scores.some((e) => e.subject === s && e.score > 0);
  const extended = profile.scores.filter((e) => e.level === "rozszerzony" && e.score > 0);

  if (extended.length < 2) {
    tips.push(
      "Zdawaj co najmniej dwa przedmioty na poziomie rozszerzonym – większość kierunków liczy tylko rozszerzenia z pełną wagą.",
    );
  }
  if (profile.fields.includes("medyczny") && (!has("biologia") || !has("chemia"))) {
    tips.push(
      "Na kierunki medyczne potrzebujesz biologii i chemii rozszerzonej. Bez tego zestawu żadna uczelnia medyczna Cię nie zakwalifikuje.",
    );
  }
  if ((profile.fields.includes("techniczny") || profile.fields.includes("informatyczny")) && !has("matematyka")) {
    tips.push("Dodaj matematykę rozszerzoną – to przedmiot o największej wadze na politechnikach.");
  }
  if (profile.fields.includes("prawny") && !has("wos") && !has("historia")) {
    tips.push("Na prawo najlepiej działa WOS lub historia rozszerzona – warto wybrać jeden z tych przedmiotów.");
  }
  if (!has("angielski")) {
    tips.push(
      "Język angielski rozszerzony liczy się w rekrutacji na prawie każdym kierunku i otwiera studia za granicą.",
    );
  }
  if (profile.achievements.length === 0) {
    tips.push(
      "Weź udział w olimpiadzie przedmiotowej lub konkursie – finał na poziomie centralnym często oznacza przyjęcie bez rekrutacji.",
    );
  }
  const borderline = results.filter((r) => r.chance === "graniczna").length;
  if (borderline > 0) {
    tips.push(
      `Masz ${borderline} kierunków w strefie granicznej – poprawa o kilka procent z przedmiotu o najwyższej wadze może przesunąć Cię nad próg.`,
    );
  }
  if (results.some((r) => r.chance === "niska") && !profile.types.includes("niepubliczna")) {
    tips.push(
      "Rozważ dodanie uczelni niepublicznych jako planu B – wiele z nich rekrutuje bez progów punktowych i oferuje stypendia za wyniki matury.",
    );
  }
  tips.push("Składaj dokumenty na 3–5 kierunków o różnych progach: ambitny, realny i bezpieczny.");
  return tips;
}