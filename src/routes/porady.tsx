import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Calendar, Compass, ShieldCheck, TrendingUp } from "lucide-react";
import { PageShell } from "@/components/site-layout";

export const Route = createFileRoute("/porady")({
  head: () => ({
    meta: [
      { title: "Porady maturalne i rekrutacyjne | Helpful Hand" },
      {
        name: "description",
        content:
          "Jakie rozszerzenia wybrać na maturę, jak zwiększyć szanse na wymarzony kierunek i jak ułożyć bezpieczną listę wniosków rekrutacyjnych.",
      },
      { property: "og:title", content: "Porady maturalne i rekrutacyjne" },
      {
        property: "og:description",
        content: "Konkretne wskazówki: wybór rozszerzeń, olimpiady, progi punktowe i strategia składania dokumentów.",
      },
    ],
  }),
  component: AdvicePage,
});

const subjectAdvice = [
  {
    goal: "Medycyna, farmacja, weterynaria",
    subjects: "biologia + chemia (rozszerzone), opcjonalnie fizyka lub matematyka",
    note: "Bez biologii i chemii rozszerzonej rekrutacja jest niemożliwa. Progi to zwykle 80–90%.",
  },
  {
    goal: "Informatyka, IT, data science",
    subjects: "matematyka (rozszerzona) + informatyka lub fizyka + angielski",
    note: "Matematyka ma najwyższą wagę. Informatyka rozszerzona daje przewagę, ale rzadko jest obowiązkowa.",
  },
  {
    goal: "Kierunki inżynierskie",
    subjects: "matematyka + fizyka (rozszerzone), na architekturze dodatkowo egzamin z rysunku",
    note: "Fizyka rozszerzona otwiera najwięcej kierunków technicznych jednocześnie.",
  },
  {
    goal: "Prawo, administracja, stosunki międzynarodowe",
    subjects: "WOS lub historia (rozszerzone) + polski + język obcy",
    note: "Na czołowych wydziałach próg sięga 78–85%, warto mieć dwa mocne przedmioty humanistyczne.",
  },
  {
    goal: "Ekonomia, finanse, biznes",
    subjects: "matematyka (rozszerzona) + język obcy + geografia lub WOS",
    note: "Matematyka rozszerzona jest praktycznie obowiązkowa na najlepszych uczelniach ekonomicznych.",
  },
  {
    goal: "Psychologia i nauki społeczne",
    subjects: "biologia lub matematyka + WOS + polski i angielski",
    note: "Psychologia to kierunek mieszany — potrzebny jest przedmiot ścisły i społeczny.",
  },
];

const boosters = [
  {
    icon: TrendingUp,
    title: "Popraw przedmiot o najwyższej wadze",
    text: "Kilka procent z przedmiotu o wadze 0,5 daje więcej punktów niż duża poprawa tam, gdzie waga wynosi 0,15. Sprawdź wagi kierunku, zanim ułożysz plan powtórek.",
  },
  {
    icon: ShieldCheck,
    title: "Wystartuj w olimpiadzie",
    text: "Finalista lub laureat olimpiady przedmiotowej stopnia centralnego bywa przyjmowany z pominięciem postępowania kwalifikacyjnego — to najmocniejszy atut w całej rekrutacji.",
  },
  {
    icon: BookOpen,
    title: "Zdawaj rozszerzenia, nie tylko podstawę",
    text: "Wynik z poziomu podstawowego liczy się zwykle z połową wagi. Dwa lub trzy rozszerzenia to standard na kierunkach z progami.",
  },
  {
    icon: Compass,
    title: "Zbuduj listę: ambitna, realna, bezpieczna",
    text: "Złóż dokumenty na 3–5 kierunków: jeden powyżej Twoich punktów, dwa w progu i jeden zdecydowanie poniżej. Uczelnie niepubliczne to dobry plan B.",
  },
  {
    icon: Calendar,
    title: "Pilnuj terminów i drugiej tury",
    text: "Wiele kierunków ma rekrutację uzupełniającą w sierpniu i wrześniu z niższymi progami. Rejestracja w systemie uczelni jest zawsze osobna od zgłoszeń w innych miastach.",
  },
];

function AdvicePage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl text-primary md:text-5xl">Porady dla maturzystów</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Konkretne wskazówki, które przedmioty wybrać na maturze, jak podnieść liczbę punktów i jak
          zaplanować rekrutację bez stresu.
        </p>

        <section className="mt-10">
          <h2 className="text-3xl text-primary">Jakie rozszerzenia wybrać</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/70 text-xs uppercase tracking-wide text-secondary-foreground">
                <tr>
                  <th className="px-4 py-3">Plan zawodowy</th>
                  <th className="px-4 py-3">Rekomendowane przedmioty</th>
                  <th className="px-4 py-3">Na co uważać</th>
                </tr>
              </thead>
              <tbody>
                {subjectAdvice.map((row) => (
                  <tr key={row.goal} className="border-t border-border align-top">
                    <td className="px-4 py-3 font-semibold text-primary">{row.goal}</td>
                    <td className="px-4 py-3">{row.subjects}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl text-primary">Jak zwiększyć swoje szanse</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {boosters.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-xl text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-16">
          <h2 className="text-3xl md:text-4xl">Chcesz porady dopasowanej do siebie?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Uzupełnij profil maturalny, a wskazówki policzymy pod Twoje wyniki, zainteresowania i cel
            zawodowy.
          </p>
          <Link
            to="/dopasowanie"
            className="mt-7 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground"
          >
            Uzupełnij profil
          </Link>
        </section>
      </div>
    </PageShell>
  );
}