type Film = {
  nome: string;
  regista: string;
  tipologia: "film" | "serie"| "corto";
  generi: number[];
  piattaforma: string;
  id: number;
  url: string;
  anno: number;
  lingua: string;
};

export const generi: string[] = [
    "Azione", "Commedia", "Drammatico", "Fantascienza", "Horror", "Thriller",
    "Animazione", "Romantico", "Avventura", "Documentario", "Fantasy", "Giallo", "Western",
    "Biografico", "Storico", "Musical", "Crime", "Noir", "Post-apocalittico",
    "Spionaggio", "Famiglia", "Catastrofico", "Mockumentary"
  ];

  export function creaVettorePreferenze(generiSelezionati: string[]): number[] {
  return generi.map((genere) => (generiSelezionati.includes(genere) ? 1 : 0));
}

export const LISTA_FILM: Film[] = [
  {
    id: 1,
    nome: "I Don't Feel at Home in This World Anymore",
    regista: "Macon Blair",
    tipologia: "film",
    url: "https://www.netflix.com/title/80100937",
    piattaforma: "Netflix",
    anno: 2017,
    lingua: "inglese",
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0]

    }
];


