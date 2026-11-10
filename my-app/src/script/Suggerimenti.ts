export type Film = {
  nome: string;
  paese: string;
  regista: string;
  anno: number;
  durata: number;
  piattaforma: string;
  generi: string[];
  id: number;
  trailer: string;
};
export const Generiammessi = [
  "Avventura",
  "Azione",
  "Romance",
  "Horror",
  "Crime",
  "Famiglia",
  "Fantascienza",
  "Musica",
  "Storia",
  "Fantasy",
  "Mistero",
  "Thriller",
  "Commedia",
  "Guerra",
  "Dramma",
  "Western",
  "Animazione",
];

export function converti(g: string[]): number[] {
  return Generiammessi.map((c) => (g.includes(c) ? 1 : 0));
}
function distanza(v1: number[], v2: number[]): number {
  const d2 = v1.map((f, i) => f - v2[i]);
  const d = Math.sqrt(d2.reduce((a, b) => a + b ** 2, 0));
  return d;
}
export default function Calcolo(
  film: Film[],
  preferenza: number[],
  filmvisti: Film[],
  piattaforme: string[],
): Film | undefined {
  const filmvistiid = filmvisti.map((f) => f.id);
  const filmnuovi = film.filter(
    (f) => !filmvistiid.includes(f.id) && piattaforme.includes(f.piattaforma),
  );
  if (filmnuovi.length === 0) {
    return undefined;
  }
  filmnuovi.sort(
    (a, b) =>
      distanza(converti(a.generi), preferenza) -
      distanza(converti(b.generi), preferenza),
  );
  return filmnuovi[0];
}

export function AggGusti(pref: number[], film: Film, mod: "+" | "-"): number[] {
  if (mod === "+") {
    return pref.map((n, i) => n + converti(film.generi)[i]);
  } else {
    return pref.map((n, i) => n - converti(film.generi)[i]);
  }
}
