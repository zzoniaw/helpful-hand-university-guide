export type SubjectId =
  | "polski"
  | "matematyka"
  | "angielski"
  | "biologia"
  | "chemia"
  | "fizyka"
  | "geografia"
  | "historia"
  | "wos"
  | "informatyka"
  | "niemiecki"
  | "hiszpanski"
  | "francuski"
  | "filozofia";

export const SUBJECTS: { id: SubjectId; label: string }[] = [
  { id: "polski", label: "Język polski" },
  { id: "matematyka", label: "Matematyka" },
  { id: "angielski", label: "Język angielski" },
  { id: "biologia", label: "Biologia" },
  { id: "chemia", label: "Chemia" },
  { id: "fizyka", label: "Fizyka" },
  { id: "geografia", label: "Geografia" },
  { id: "historia", label: "Historia" },
  { id: "wos", label: "Wiedza o społeczeństwie" },
  { id: "informatyka", label: "Informatyka" },
  { id: "niemiecki", label: "Język niemiecki" },
  { id: "hiszpanski", label: "Język hiszpański" },
  { id: "francuski", label: "Język francuski" },
  { id: "filozofia", label: "Filozofia" },
];

export const SUBJECT_LABEL: Record<SubjectId, string> = SUBJECTS.reduce(
  (acc, s) => ({ ...acc, [s.id]: s.label }),
  {} as Record<SubjectId, string>,
);

export type Level = "podstawowy" | "rozszerzony";

export type Requirement = {
  /** Główny przedmiot lub grupa przedmiotów do wyboru (liczy się najlepszy wynik). */
  subjects: SubjectId[];
  weight: number;
  level: Level;
  label?: string;
};

export type Field =
  | "medyczny"
  | "techniczny"
  | "informatyczny"
  | "prawny"
  | "ekonomiczny"
  | "spoleczny"
  | "humanistyczny"
  | "przyrodniczy"
  | "artystyczny";

export const FIELDS: { id: Field; label: string }[] = [
  { id: "medyczny", label: "Medyczny i o zdrowiu" },
  { id: "techniczny", label: "Techniczny i inżynieryjny" },
  { id: "informatyczny", label: "Informatyczny i IT" },
  { id: "prawny", label: "Prawo i administracja" },
  { id: "ekonomiczny", label: "Ekonomia i biznes" },
  { id: "spoleczny", label: "Nauki społeczne" },
  { id: "humanistyczny", label: "Humanistyczny" },
  { id: "przyrodniczy", label: "Przyrodniczy" },
  { id: "artystyczny", label: "Artystyczny i projektowy" },
];

export type Program = {
  id: string;
  name: string;
  field: Field;
  degree: string;
  language: string;
  /** Próg punktowy z ostatniej rekrutacji w skali 0–100. */
  threshold: number;
  requirements: Requirement[];
  careers: string[];
  interests: string[];
  recommended: SubjectId[];
  rules: string;
  extras: string[];
  tuition: string;
};

export type University = {
  id: string;
  name: string;
  short: string;
  city: string;
  country: string;
  type: "publiczna" | "niepubliczna";
  founded: number;
  students: string;
  website: string;
  about: string;
  admissionRules: string;
  extraPoints: string[];
  programs: Program[];
};

const req = (subjects: SubjectId[], weight: number, level: Level = "rozszerzony", label?: string): Requirement => ({
  subjects,
  weight,
  level,
  ...(label ? { label } : {}),
});

export const UNIVERSITIES: University[] = [
  {
    id: "uw",
    name: "Uniwersytet Warszawski",
    short: "UW",
    city: "Warszawa",
    country: "Polska",
    type: "publiczna",
    founded: 1816,
    students: "ok. 40 000",
    website: "https://irk.uw.edu.pl",
    about:
      "Największy uniwersytet w Polsce, regularnie na czele krajowych rankingów. Bardzo szeroka oferta kierunków humanistycznych, społecznych i ścisłych.",
    admissionRules:
      "Rekrutacja odbywa się w systemie IRK. Wynik kandydata to suma procentów z przedmiotów maturalnych pomnożonych przez wagi kierunku. Wynik z poziomu podstawowego przelicza się z niższą wagą niż rozszerzony.",
    extraPoints: [
      "Laureaci i finaliści olimpiad przedmiotowych stopnia centralnego – przyjęcie z pominięciem postępowania kwalifikacyjnego.",
      "Matura międzynarodowa (IB) i europejska (EB) – przeliczanie wyników według osobnej tabeli.",
      "Certyfikaty językowe na poziomie C1/C2 mogą zastąpić egzamin z języka na części kierunków.",
    ],
    programs: [
      {
        id: "uw-prawo",
        name: "Prawo",
        field: "prawny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 78,
        requirements: [
          req(["polski"], 0.2),
          req(["historia", "wos", "matematyka", "geografia"], 0.5, "rozszerzony", "historia / WOS / matematyka / geografia"),
          req(["angielski", "niemiecki", "francuski", "hiszpanski"], 0.3, "rozszerzony", "język obcy nowożytny"),
        ],
        careers: ["prawnik", "adwokat", "radca prawny", "sędzia", "prokurator", "notariusz", "urzędnik"],
        interests: ["prawo", "polityka", "debata", "sprawiedliwość", "administracja"],
        recommended: ["historia", "wos", "polski"],
        rules:
          "Kierunek bardzo oblegany – decyduje ranking punktów. Warto mieć dwa mocne przedmioty rozszerzone o wysokiej wadze.",
        extras: ["Olimpiada Wiedzy o Polsce i Świecie Współczesnym", "Olimpiada Historyczna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "uw-psychologia",
        name: "Psychologia",
        field: "spoleczny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 82,
        requirements: [
          req(["polski"], 0.15),
          req(["biologia", "matematyka", "fizyka", "chemia"], 0.45, "rozszerzony", "biologia / matematyka / fizyka / chemia"),
          req(["angielski"], 0.2),
          req(["wos", "historia", "filozofia"], 0.2, "rozszerzony", "WOS / historia / filozofia"),
        ],
        careers: ["psycholog", "psychoterapeuta", "HR", "badacz", "coach"],
        interests: ["człowiek", "psychika", "badania", "pomaganie", "relacje"],
        recommended: ["biologia", "wos", "angielski"],
        rules: "Jeden z najtrudniejszych kierunków na UW. Liczy się kombinacja przedmiotu ścisłego i społecznego.",
        extras: ["Olimpiada Biologiczna", "Olimpiada Filozoficzna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "uw-informatyka",
        name: "Informatyka",
        field: "informatyczny",
        degree: "licencjackie",
        language: "polski",
        threshold: 80,
        requirements: [
          req(["matematyka"], 0.55),
          req(["informatyka", "fizyka"], 0.3, "rozszerzony", "informatyka / fizyka"),
          req(["angielski"], 0.15),
        ],
        careers: ["programista", "informatyk", "data scientist", "analityk", "badacz AI"],
        interests: ["programowanie", "algorytmy", "matematyka", "technologia", "AI"],
        recommended: ["matematyka", "informatyka", "angielski"],
        rules: "Bardzo silny nacisk na matematykę rozszerzoną – to ona decyduje o miejscu w rankingu.",
        extras: ["Olimpiada Informatyczna", "Olimpiada Matematyczna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "uj",
    name: "Uniwersytet Jagielloński",
    short: "UJ",
    city: "Kraków",
    country: "Polska",
    type: "publiczna",
    founded: 1364,
    students: "ok. 35 000",
    website: "https://irk.uj.edu.pl",
    about:
      "Najstarsza polska uczelnia z bardzo mocnym Collegium Medicum oraz silnymi kierunkami humanistycznymi i przyrodniczymi.",
    admissionRules:
      "Kwalifikacja opiera się na wskaźniku rekrutacyjnym liczonym z wyników matury (poziom rozszerzony liczony z wagą 1, podstawowy z niższą). Część kierunków wymaga dodatkowego egzaminu.",
    extraPoints: [
      "Laureaci olimpiad centralnych przyjmowani poza kolejnością.",
      "Dyplom IB/EB przeliczany według oddzielnej tabeli.",
      "Udokumentowana działalność naukowa w kołach – atut w rekrutacji na studia II stopnia.",
    ],
    programs: [
      {
        id: "uj-lekarski",
        name: "Kierunek lekarski",
        field: "medyczny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 88,
        requirements: [
          req(["biologia"], 0.4),
          req(["chemia"], 0.4),
          req(["fizyka", "matematyka"], 0.2, "rozszerzony", "fizyka / matematyka"),
        ],
        careers: ["lekarz", "chirurg", "pediatra", "naukowiec medyczny"],
        interests: ["medycyna", "zdrowie", "biologia", "pomaganie", "nauka"],
        recommended: ["biologia", "chemia", "matematyka"],
        rules:
          "Bardzo wysokie progi – zwykle wymagane ponad 85% z biologii i chemii rozszerzonej. Brak jednego z tych przedmiotów uniemożliwia rekrutację.",
        extras: ["Olimpiada Biologiczna", "Olimpiada Chemiczna", "Olimpiada Wiedzy Ekologicznej"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "uj-filologia-ang",
        name: "Filologia angielska",
        field: "humanistyczny",
        degree: "licencjackie",
        language: "polski / angielski",
        threshold: 74,
        requirements: [req(["angielski"], 0.6), req(["polski"], 0.25), req(["historia", "wos", "filozofia"], 0.15, "rozszerzony", "przedmiot humanistyczny")],
        careers: ["tłumacz", "nauczyciel", "redaktor", "specjalista ds. komunikacji"],
        interests: ["języki", "literatura", "kultura", "pisanie"],
        recommended: ["angielski", "polski"],
        rules: "Kluczowy jest bardzo wysoki wynik z języka angielskiego na poziomie rozszerzonym.",
        extras: ["Olimpiada Języka Angielskiego", "Certyfikat CAE / CPE"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "uj-biotechnologia",
        name: "Biotechnologia",
        field: "przyrodniczy",
        degree: "licencjackie",
        language: "polski",
        threshold: 72,
        requirements: [req(["biologia", "chemia"], 0.5, "rozszerzony", "biologia / chemia"), req(["matematyka", "fizyka"], 0.3, "rozszerzony", "matematyka / fizyka"), req(["angielski"], 0.2)],
        careers: ["biotechnolog", "naukowiec", "specjalista laboratoryjny", "farmacja"],
        interests: ["laboratorium", "biologia", "badania", "nauka", "innowacje"],
        recommended: ["biologia", "chemia"],
        rules: "Kierunek eksperymentalny – dużo zajęć laboratoryjnych od pierwszego roku.",
        extras: ["Olimpiada Biologiczna", "Projekty badawcze w konkursach E(x)plory"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "pw",
    name: "Politechnika Warszawska",
    short: "PW",
    city: "Warszawa",
    country: "Polska",
    type: "publiczna",
    founded: 1915,
    students: "ok. 26 000",
    website: "https://rekrutacja.pw.edu.pl",
    about: "Najlepsza polska uczelnia techniczna, ceniona przez pracodawców z branży inżynieryjnej i IT.",
    admissionRules:
      "Liczba punktów rekrutacyjnych = 0,75 × M + 0,25 × (J), gdzie M to przedmiot kierunkowy i matematyka. Poziom rozszerzony jest wymagany na większości kierunków.",
    extraPoints: [
      "Laureaci i finaliści olimpiad technicznych, matematycznych, fizycznych i informatycznych – maksymalna liczba punktów.",
      "Laureaci konkursów PW dla uczniów szkół średnich.",
    ],
    programs: [
      {
        id: "pw-informatyka",
        name: "Informatyka i systemy informacyjne",
        field: "informatyczny",
        degree: "inżynierskie",
        language: "polski",
        threshold: 84,
        requirements: [req(["matematyka"], 0.5), req(["fizyka", "informatyka"], 0.35, "rozszerzony", "fizyka / informatyka"), req(["angielski"], 0.15)],
        careers: ["programista", "inżynier oprogramowania", "architekt systemów", "data engineer"],
        interests: ["programowanie", "technologia", "algorytmy", "AI", "systemy"],
        recommended: ["matematyka", "fizyka", "informatyka"],
        rules: "Najwyższe progi na uczelni. Matematyka rozszerzona to podstawa kwalifikacji.",
        extras: ["Olimpiada Informatyczna", "Olimpiada Matematyczna", "Olimpiada Fizyczna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "pw-mechatronika",
        name: "Mechatronika",
        field: "techniczny",
        degree: "inżynierskie",
        language: "polski",
        threshold: 68,
        requirements: [req(["matematyka"], 0.5), req(["fizyka"], 0.35), req(["angielski"], 0.15)],
        careers: ["inżynier", "konstruktor", "automatyk", "robotyk"],
        interests: ["robotyka", "maszyny", "fizyka", "projektowanie", "technologia"],
        recommended: ["matematyka", "fizyka"],
        rules: "Fizyka rozszerzona daje wyraźną przewagę. Sporo zajęć projektowych i laboratoryjnych.",
        extras: ["Olimpiada Fizyczna", "Olimpiada Wiedzy Technicznej", "Zawody robotyczne"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "pw-architektura",
        name: "Architektura",
        field: "artystyczny",
        degree: "inżynierskie",
        language: "polski",
        threshold: 70,
        requirements: [req(["matematyka"], 0.35), req(["fizyka", "historia"], 0.15, "rozszerzony", "fizyka / historia"), req(["angielski"], 0.1)],
        careers: ["architekt", "urbanista", "projektant wnętrz"],
        interests: ["rysunek", "projektowanie", "sztuka", "przestrzeń", "budownictwo"],
        recommended: ["matematyka", "historia"],
        rules:
          "Oprócz matury obowiązuje egzamin z rysunku odręcznego, który ma decydujący udział w wyniku końcowym. Warto zacząć kurs rysunku w klasie maturalnej.",
        extras: ["Portfolio prac rysunkowych", "Olimpiada Wiedzy o Architekturze"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "agh",
    name: "Akademia Górniczo-Hutnicza im. Stanisława Staszica",
    short: "AGH",
    city: "Kraków",
    country: "Polska",
    type: "publiczna",
    founded: 1919,
    students: "ok. 20 000",
    website: "https://rekrutacja.agh.edu.pl",
    about: "Uczelnia techniczna łącząca inżynierię, informatykę i nowe technologie z bardzo silnymi kontaktami z przemysłem.",
    admissionRules:
      "Wskaźnik rekrutacyjny W = 4 × M + P, gdzie M to matematyka, a P przedmiot kierunkowy (fizyka, informatyka lub chemia) na poziomie rozszerzonym.",
    extraPoints: [
      "Laureaci i finaliści olimpiad przedmiotowych – maksymalny wskaźnik rekrutacyjny.",
      "Laureaci konkursu „O Złoty Indeks AGH”.",
    ],
    programs: [
      {
        id: "agh-automatyka",
        name: "Automatyka i robotyka",
        field: "techniczny",
        degree: "inżynierskie",
        language: "polski",
        threshold: 72,
        requirements: [req(["matematyka"], 0.55), req(["fizyka", "informatyka"], 0.3, "rozszerzony", "fizyka / informatyka"), req(["angielski"], 0.15)],
        careers: ["inżynier", "robotyk", "automatyk", "programista systemów"],
        interests: ["robotyka", "automatyka", "programowanie", "maszyny"],
        recommended: ["matematyka", "fizyka", "informatyka"],
        rules: "Kierunek z wysokim zapotrzebowaniem na rynku pracy, silny nacisk na matematykę.",
        extras: ["Olimpiada Wiedzy Technicznej", "Zawody robotyczne"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "agh-inz-mat",
        name: "Inżynieria materiałowa",
        field: "techniczny",
        degree: "inżynierskie",
        language: "polski",
        threshold: 55,
        requirements: [req(["matematyka"], 0.5), req(["chemia", "fizyka"], 0.35, "rozszerzony", "chemia / fizyka"), req(["angielski"], 0.15)],
        careers: ["inżynier materiałowy", "technolog", "specjalista R&D"],
        interests: ["chemia", "materiały", "laboratorium", "przemysł"],
        recommended: ["chemia", "matematyka"],
        rules: "Umiarkowane progi – dobra opcja przy mocnej chemii i średniej matematyce.",
        extras: ["Olimpiada Chemiczna", "Olimpiada Innowacji Technicznych"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "wum",
    name: "Warszawski Uniwersytet Medyczny",
    short: "WUM",
    city: "Warszawa",
    country: "Polska",
    type: "publiczna",
    founded: 1950,
    students: "ok. 9 000",
    website: "https://rekrutacja.wum.edu.pl",
    about: "Największa polska uczelnia medyczna z rozbudowaną bazą kliniczną i kierunkami anglojęzycznymi.",
    admissionRules:
      "O przyjęciu decyduje suma punktów z biologii i chemii na poziomie rozszerzonym (na części kierunków także fizyki lub matematyki). Nie ma egzaminów wstępnych.",
    extraPoints: [
      "Laureaci i finaliści Olimpiady Biologicznej oraz Chemicznej – przyjęcie w pierwszej kolejności.",
      "Wolontariat medyczny nie daje punktów, ale liczy się przy stypendiach i kołach naukowych.",
    ],
    programs: [
      {
        id: "wum-lekarski",
        name: "Kierunek lekarski",
        field: "medyczny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 90,
        requirements: [req(["biologia"], 0.4), req(["chemia"], 0.4), req(["fizyka", "matematyka"], 0.2, "rozszerzony", "fizyka / matematyka")],
        careers: ["lekarz", "chirurg", "kardiolog", "naukowiec medyczny"],
        interests: ["medycyna", "zdrowie", "biologia", "pomaganie"],
        recommended: ["biologia", "chemia", "fizyka"],
        rules: "Najwyższe progi w Polsce – zwykle powyżej 88%. Bez biologii i chemii rozszerzonej rekrutacja jest niemożliwa.",
        extras: ["Olimpiada Biologiczna", "Olimpiada Chemiczna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "wum-farmacja",
        name: "Farmacja",
        field: "medyczny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 74,
        requirements: [req(["chemia"], 0.5), req(["biologia", "matematyka", "fizyka"], 0.35, "rozszerzony", "biologia / matematyka / fizyka"), req(["angielski"], 0.15)],
        careers: ["farmaceuta", "analityk leków", "specjalista badań klinicznych"],
        interests: ["chemia", "leki", "zdrowie", "laboratorium"],
        recommended: ["chemia", "biologia"],
        rules: "Chemia rozszerzona jest obowiązkowa i ma największą wagę.",
        extras: ["Olimpiada Chemiczna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "wum-fizjoterapia",
        name: "Fizjoterapia",
        field: "medyczny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 62,
        requirements: [req(["biologia"], 0.6), req(["chemia", "fizyka", "matematyka"], 0.25, "rozszerzony", "chemia / fizyka / matematyka"), req(["angielski"], 0.15)],
        careers: ["fizjoterapeuta", "trener medyczny", "rehabilitant"],
        interests: ["sport", "zdrowie", "anatomia", "pomaganie"],
        recommended: ["biologia"],
        rules: "Realna alternatywa dla kandydatów na medycynę z mocną biologią.",
        extras: ["Olimpiada Biologiczna", "Osiągnięcia sportowe"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "sgh",
    name: "Szkoła Główna Handlowa w Warszawie",
    short: "SGH",
    city: "Warszawa",
    country: "Polska",
    type: "publiczna",
    founded: 1906,
    students: "ok. 10 000",
    website: "https://rekrutacja.sgh.waw.pl",
    about: "Najlepsza polska uczelnia ekonomiczna. Rekrutacja odbywa się na kierunek wybierany dopiero po pierwszym roku.",
    admissionRules:
      "Kandydat wskazuje trzy przedmioty: matematykę (obowiązkowo), język obcy oraz jeden do wyboru. Za wynik rozszerzony przyznaje się do 100 punktów za przedmiot.",
    extraPoints: [
      "Laureaci Olimpiady Wiedzy Ekonomicznej, Matematycznej i Przedsiębiorczości – przyjęcie bez postępowania kwalifikacyjnego.",
      "Certyfikaty językowe honorowane zamiast wyniku z języka obcego.",
    ],
    programs: [
      {
        id: "sgh-ekonomia",
        name: "Ekonomia / Finanse i rachunkowość",
        field: "ekonomiczny",
        degree: "licencjackie",
        language: "polski",
        threshold: 76,
        requirements: [req(["matematyka"], 0.45), req(["angielski", "niemiecki", "hiszpanski", "francuski"], 0.3, "rozszerzony", "język obcy"), req(["geografia", "wos", "informatyka", "historia"], 0.25, "rozszerzony", "geografia / WOS / informatyka / historia")],
        careers: ["ekonomista", "analityk finansowy", "doradca", "bankowiec", "konsultant"],
        interests: ["biznes", "finanse", "analiza danych", "rynek", "przedsiębiorczość"],
        recommended: ["matematyka", "geografia", "angielski"],
        rules: "Matematyka rozszerzona jest obowiązkowa. Silny nacisk na język obcy.",
        extras: ["Olimpiada Wiedzy Ekonomicznej", "Olimpiada Przedsiębiorczości"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "sgh-analityka",
        name: "Analityka gospodarcza",
        field: "ekonomiczny",
        degree: "licencjackie",
        language: "polski",
        threshold: 79,
        requirements: [req(["matematyka"], 0.5), req(["informatyka", "geografia", "wos"], 0.3, "rozszerzony", "informatyka / geografia / WOS"), req(["angielski"], 0.2)],
        careers: ["analityk danych", "data scientist", "konsultant", "ekonomista"],
        interests: ["dane", "statystyka", "biznes", "programowanie"],
        recommended: ["matematyka", "informatyka"],
        rules: "Kierunek łączący ekonomię ze statystyką i programowaniem.",
        extras: ["Olimpiada Statystyczna", "Olimpiada Matematyczna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "uam",
    name: "Uniwersytet im. Adama Mickiewicza",
    short: "UAM",
    city: "Poznań",
    country: "Polska",
    type: "publiczna",
    founded: 1919,
    students: "ok. 33 000",
    website: "https://rekrutacja.amu.edu.pl",
    about: "Jeden z największych uniwersytetów w Polsce, ceniony za filologie, kierunki społeczne i geografię.",
    admissionRules:
      "Wynik rekrutacyjny to suma punktów z przedmiotów kierunkowych; poziom podstawowy przelicza się z wagą 0,5 wartości rozszerzenia.",
    extraPoints: ["Laureaci olimpiad centralnych – przyjęcie poza kolejnością.", "Matura IB i EB przeliczana według osobnej tabeli."],
    programs: [
      {
        id: "uam-dziennikarstwo",
        name: "Dziennikarstwo i komunikacja społeczna",
        field: "spoleczny",
        degree: "licencjackie",
        language: "polski",
        threshold: 60,
        requirements: [req(["polski"], 0.4), req(["historia", "wos", "geografia", "filozofia"], 0.35, "rozszerzony", "przedmiot humanistyczny"), req(["angielski"], 0.25)],
        careers: ["dziennikarz", "specjalista PR", "content manager", "redaktor"],
        interests: ["media", "pisanie", "komunikacja", "społeczeństwo", "kultura"],
        recommended: ["polski", "wos", "angielski"],
        rules: "Liczy się przede wszystkim język polski rozszerzony.",
        extras: ["Olimpiada Literatury i Języka Polskiego", "Działalność w gazetce szkolnej lub podcaście"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "uam-geografia",
        name: "Gospodarka przestrzenna",
        field: "przyrodniczy",
        degree: "licencjackie",
        language: "polski",
        threshold: 52,
        requirements: [req(["geografia"], 0.5), req(["matematyka"], 0.3), req(["angielski"], 0.2)],
        careers: ["planista przestrzenny", "specjalista GIS", "urzędnik", "analityk"],
        interests: ["mapy", "miasta", "środowisko", "planowanie"],
        recommended: ["geografia", "matematyka"],
        rules: "Niski próg i praktyczna specjalizacja GIS.",
        extras: ["Olimpiada Geograficzna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "pg",
    name: "Politechnika Gdańska",
    short: "PG",
    city: "Gdańsk",
    country: "Polska",
    type: "publiczna",
    founded: 1904,
    students: "ok. 15 000",
    website: "https://rekrutacja.pg.edu.pl",
    about: "Nowoczesna uczelnia techniczna nad morzem, mocna w informatyce, elektronice i oceanotechnice.",
    admissionRules: "Wynik = 0,45 × przedmiot kierunkowy + 0,35 × matematyka + 0,2 × język obcy (poziom rozszerzony).",
    extraPoints: ["Finaliści olimpiad technicznych i informatycznych – 100% punktów z przedmiotu kierunkowego."],
    programs: [
      {
        id: "pg-informatyka",
        name: "Informatyka",
        field: "informatyczny",
        degree: "inżynierskie",
        language: "polski",
        threshold: 74,
        requirements: [req(["matematyka"], 0.45), req(["informatyka", "fizyka"], 0.35, "rozszerzony", "informatyka / fizyka"), req(["angielski"], 0.2)],
        careers: ["programista", "inżynier oprogramowania", "tester", "devops"],
        interests: ["programowanie", "technologia", "gry", "sieci"],
        recommended: ["matematyka", "informatyka"],
        rules: "Bardzo popularny kierunek, progi rosną co roku.",
        extras: ["Olimpiada Informatyczna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "pg-budownictwo",
        name: "Budownictwo",
        field: "techniczny",
        degree: "inżynierskie",
        language: "polski",
        threshold: 54,
        requirements: [req(["matematyka"], 0.5), req(["fizyka", "chemia", "geografia"], 0.3, "rozszerzony", "fizyka / chemia / geografia"), req(["angielski"], 0.2)],
        careers: ["inżynier budownictwa", "kierownik budowy", "projektant konstrukcji"],
        interests: ["budownictwo", "konstrukcje", "projektowanie", "fizyka"],
        recommended: ["matematyka", "fizyka"],
        rules: "Dostępny próg przy solidnej matematyce rozszerzonej.",
        extras: ["Olimpiada Wiedzy Technicznej"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "swps",
    name: "Uniwersytet SWPS",
    short: "SWPS",
    city: "Warszawa / Wrocław / Poznań",
    country: "Polska",
    type: "niepubliczna",
    founded: 1996,
    students: "ok. 19 000",
    website: "https://rekrutacja.swps.pl",
    about: "Największa niepubliczna uczelnia społeczno-humanistyczna, znana z psychologii, projektowania i prawa.",
    admissionRules:
      "Rekrutacja bez progów punktowych – decyduje kolejność zgłoszeń i spełnienie minimalnych wymagań maturalnych. Na psychologii obowiązuje ranking wyników.",
    extraPoints: ["Stypendia rektora za wysokie wyniki maturalne (nawet 100% zniżki w pierwszym semestrze).", "Zniżki dla laureatów olimpiad."],
    programs: [
      {
        id: "swps-psychologia",
        name: "Psychologia",
        field: "spoleczny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 45,
        requirements: [req(["biologia", "matematyka", "wos"], 0.5, "rozszerzony", "biologia / matematyka / WOS"), req(["polski"], 0.3, "podstawowy"), req(["angielski"], 0.2, "podstawowy")],
        careers: ["psycholog", "psychoterapeuta", "HR", "specjalista UX research"],
        interests: ["człowiek", "psychika", "relacje", "pomaganie", "badania"],
        recommended: ["biologia", "wos", "polski"],
        rules: "Alternatywa dla kandydatów, którym zabrakło punktów na uczelnie publiczne. Studia płatne.",
        extras: ["Stypendium za wynik matury powyżej 80%"],
        tuition: "ok. 9 500 zł / rok",
      },
      {
        id: "swps-ux",
        name: "Projektowanie / User Experience Design",
        field: "artystyczny",
        degree: "licencjackie",
        language: "polski",
        threshold: 40,
        requirements: [req(["polski"], 0.4, "podstawowy"), req(["angielski"], 0.3, "podstawowy"), req(["informatyka", "wos", "matematyka"], 0.3, "rozszerzony", "informatyka / WOS / matematyka")],
        careers: ["projektant UX", "product designer", "grafik", "badacz UX"],
        interests: ["design", "technologia", "kreatywność", "człowiek"],
        recommended: ["informatyka", "angielski"],
        rules: "Wymagane portfolio lub rozmowa kwalifikacyjna na części specjalności.",
        extras: ["Portfolio projektowe"],
        tuition: "ok. 11 000 zł / rok",
      },
    ],
  },
  {
    id: "alk",
    name: "Akademia Leona Koźmińskiego",
    short: "ALK",
    city: "Warszawa",
    country: "Polska",
    type: "niepubliczna",
    founded: 1993,
    students: "ok. 9 000",
    website: "https://www.kozminski.edu.pl",
    about: "Najlepsza niepubliczna uczelnia biznesowa w Polsce, wysoko notowana w rankingach Financial Times.",
    admissionRules:
      "Rekrutacja na podstawie wyników matury z trzech przedmiotów oraz testu z języka obcego. Obowiązuje ranking i limit miejsc.",
    extraPoints: ["Stypendia za wyniki maturalne powyżej 85%.", "Punkty za certyfikaty językowe i olimpiady ekonomiczne."],
    programs: [
      {
        id: "alk-zarzadzanie",
        name: "Zarządzanie",
        field: "ekonomiczny",
        degree: "licencjackie",
        language: "polski / angielski",
        threshold: 55,
        requirements: [req(["matematyka"], 0.35, "podstawowy"), req(["angielski"], 0.35), req(["geografia", "wos", "historia"], 0.3, "rozszerzony", "geografia / WOS / historia")],
        careers: ["manager", "przedsiębiorca", "konsultant", "marketingowiec"],
        interests: ["biznes", "przedsiębiorczość", "marketing", "zarządzanie"],
        recommended: ["matematyka", "angielski", "geografia"],
        rules: "Silny nacisk na język angielski i praktyczne projekty biznesowe.",
        extras: ["Olimpiada Przedsiębiorczości"],
        tuition: "ok. 16 000 zł / rok",
      },
      {
        id: "alk-prawo",
        name: "Prawo",
        field: "prawny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 50,
        requirements: [req(["polski"], 0.35), req(["historia", "wos"], 0.35, "rozszerzony", "historia / WOS"), req(["angielski"], 0.3, "podstawowy")],
        careers: ["prawnik", "radca prawny", "doradca podatkowy", "compliance"],
        interests: ["prawo", "biznes", "negocjacje", "administracja"],
        recommended: ["wos", "historia", "polski"],
        rules: "Program mocno powiązany z prawem gospodarczym i biznesem.",
        extras: ["Olimpiada Wiedzy o Prawie"],
        tuition: "ok. 15 000 zł / rok",
      },
    ],
  },
  {
    id: "umk",
    name: "Uniwersytet Mikołaja Kopernika",
    short: "UMK",
    city: "Toruń",
    country: "Polska",
    type: "publiczna",
    founded: 1945,
    students: "ok. 18 000",
    website: "https://irk.umk.pl",
    about: "Uniwersytet z pełną ofertą kierunków, w tym Collegium Medicum w Bydgoszczy.",
    admissionRules: "Kwalifikacja na podstawie wyników maturalnych z przedmiotów kierunkowych; poziom podstawowy z niższym mnożnikiem.",
    extraPoints: ["Laureaci olimpiad centralnych przyjmowani bez postępowania kwalifikacyjnego."],
    programs: [
      {
        id: "umk-lekarski",
        name: "Kierunek lekarski (Collegium Medicum)",
        field: "medyczny",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 80,
        requirements: [req(["biologia"], 0.45), req(["chemia"], 0.45), req(["fizyka", "matematyka"], 0.1, "rozszerzony", "fizyka / matematyka")],
        careers: ["lekarz", "diagnosta", "naukowiec medyczny"],
        interests: ["medycyna", "zdrowie", "biologia", "pomaganie"],
        recommended: ["biologia", "chemia"],
        rules: "Próg niższy niż w Warszawie i Krakowie – dobra opcja zapasowa dla kandydatów na medycynę.",
        extras: ["Olimpiada Biologiczna", "Olimpiada Chemiczna"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
      {
        id: "umk-weterynaria",
        name: "Weterynaria",
        field: "przyrodniczy",
        degree: "jednolite magisterskie",
        language: "polski",
        threshold: 70,
        requirements: [req(["biologia"], 0.5), req(["chemia"], 0.35), req(["angielski"], 0.15)],
        careers: ["lekarz weterynarii", "inspektor sanitarny", "badacz"],
        interests: ["zwierzęta", "biologia", "medycyna", "przyroda"],
        recommended: ["biologia", "chemia"],
        rules: "Wysokie zainteresowanie, ale progi niższe niż na kierunku lekarskim.",
        extras: ["Olimpiada Biologiczna", "Wolontariat w schronisku"],
        tuition: "bezpłatne (studia stacjonarne)",
      },
    ],
  },
  {
    id: "delft",
    name: "TU Delft",
    short: "TU Delft",
    city: "Delft",
    country: "Holandia",
    type: "publiczna",
    founded: 1842,
    students: "ok. 27 000",
    website: "https://www.tudelft.nl",
    about: "Czołowa europejska uczelnia techniczna z anglojęzycznymi kierunkami inżynieryjnymi.",
    admissionRules:
      "Wymagana matura z matematyki i fizyki na poziomie rozszerzonym oraz potwierdzona znajomość angielskiego (IELTS 6.5 lub odpowiednik). Obowiązuje numerus fixus na części kierunków.",
    extraPoints: ["Certyfikat IELTS/TOEFL wymagany.", "Motivation letter i wyniki testu matching."],
    programs: [
      {
        id: "delft-aero",
        name: "Aerospace Engineering",
        field: "techniczny",
        degree: "licencjackie (BSc)",
        language: "angielski",
        threshold: 82,
        requirements: [req(["matematyka"], 0.5), req(["fizyka"], 0.35), req(["angielski"], 0.15)],
        careers: ["inżynier lotniczy", "konstruktor", "inżynier kosmiczny"],
        interests: ["lotnictwo", "kosmos", "fizyka", "konstrukcje"],
        recommended: ["matematyka", "fizyka", "angielski"],
        rules: "Numerus fixus – ograniczona liczba miejsc, obowiązuje test kwalifikacyjny z matematyki i fizyki.",
        extras: ["IELTS 6.5+", "List motywacyjny"],
        tuition: "ok. 2 600 EUR / rok (UE)",
      },
    ],
  },
  {
    id: "maastricht",
    name: "Maastricht University",
    short: "UM",
    city: "Maastricht",
    country: "Holandia",
    type: "publiczna",
    founded: 1976,
    students: "ok. 22 000",
    website: "https://www.maastrichtuniversity.nl",
    about: "Międzynarodowa uczelnia ucząca metodą Problem-Based Learning, popularna wśród Polaków.",
    admissionRules: "Wymagana matura z wybranymi przedmiotami rozszerzonymi i certyfikat językowy. Selekcja obejmuje list motywacyjny.",
    extraPoints: ["Certyfikat językowy (IELTS 6.5).", "Doświadczenie międzynarodowe i wolontariat."],
    programs: [
      {
        id: "maastricht-ibe",
        name: "International Business",
        field: "ekonomiczny",
        degree: "licencjackie (BSc)",
        language: "angielski",
        threshold: 65,
        requirements: [req(["matematyka"], 0.4), req(["angielski"], 0.4), req(["geografia", "wos", "historia"], 0.2, "rozszerzony", "przedmiot społeczny")],
        careers: ["manager", "konsultant", "analityk", "przedsiębiorca"],
        interests: ["biznes", "międzynarodowe", "języki", "ekonomia"],
        recommended: ["matematyka", "angielski"],
        rules: "Studia w całości po angielsku, silnie międzynarodowe środowisko.",
        extras: ["IELTS 6.5+", "List motywacyjny"],
        tuition: "ok. 2 600 EUR / rok (UE)",
      },
      {
        id: "maastricht-psych",
        name: "Psychology",
        field: "spoleczny",
        degree: "licencjackie (BSc)",
        language: "angielski",
        threshold: 62,
        requirements: [req(["angielski"], 0.4), req(["biologia", "matematyka"], 0.35, "rozszerzony", "biologia / matematyka"), req(["polski"], 0.25, "podstawowy")],
        careers: ["psycholog", "badacz", "specjalista HR"],
        interests: ["psychika", "badania", "człowiek", "statystyka"],
        recommended: ["biologia", "angielski"],
        rules: "Program anglojęzyczny z dużym udziałem statystyki i metodologii badań.",
        extras: ["IELTS 6.5+"],
        tuition: "ok. 2 600 EUR / rok (UE)",
      },
    ],
  },
  {
    id: "charles",
    name: "Uniwersytet Karola w Pradze",
    short: "UK Praha",
    city: "Praga",
    country: "Czechy",
    type: "publiczna",
    founded: 1348,
    students: "ok. 50 000",
    website: "https://cuni.cz",
    about: "Renomowana uczelnia w Czechach z anglojęzycznym kierunkiem lekarskim chętnie wybieranym przez Polaków.",
    admissionRules:
      "Rekrutacja na kierunek lekarski odbywa się na podstawie egzaminów wstępnych z biologii, chemii i fizyki – matura nie jest jedynym kryterium.",
    extraPoints: ["Zwolnienie z egzaminu przy bardzo wysokiej średniej ocen z przedmiotów przyrodniczych."],
    programs: [
      {
        id: "charles-med",
        name: "General Medicine",
        field: "medyczny",
        degree: "jednolite magisterskie (MD)",
        language: "angielski",
        threshold: 70,
        requirements: [req(["biologia"], 0.4), req(["chemia"], 0.35), req(["fizyka", "matematyka"], 0.25, "rozszerzony", "fizyka / matematyka")],
        careers: ["lekarz", "chirurg", "naukowiec medyczny"],
        interests: ["medycyna", "zdrowie", "biologia"],
        recommended: ["biologia", "chemia", "fizyka"],
        rules: "Obowiązkowy egzamin wstępny (test wyboru z biologii, chemii i fizyki) w języku angielskim.",
        extras: ["Egzamin wstępny", "Znajomość angielskiego na poziomie B2/C1"],
        tuition: "ok. 12 000 EUR / rok",
      },
    ],
  },
];

export const ALL_PROGRAMS = UNIVERSITIES.flatMap((u) =>
  u.programs.map((p) => ({ program: p, university: u })),
);